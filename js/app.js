/* ==========================================================================
   MINDFULNESS HANDBOOK — behaviour
   Runs both pages. Renders js/content.js (and js/theories.js on the Happiness
   at Work page) and handles the interactions: header + menu, scroll reveals,
   chapter reader, worksheets, breathing guide, guided practice player,
   quizzes and the on-device journal. No dependencies.
   ========================================================================== */
(() => {
  "use strict";

  const C = window.HANDBOOK;
  const T = window.THEORIES || null;
  const ART = window.ART;
  if (!C || !ART) {
    console.error("content.js and art.js must load before app.js");
    return;
  }

  /* ---------- helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const root = document.documentElement;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  // calm mode is decided in <head> (OS setting or the footer switch) as html.reduce-motion
  const reduced = () => root.classList.contains("reduce-motion");

  // one script serves both pages; these say which one we're on
  const isHandbook = !!$("[data-reader]");
  const isTheories = !!T && !!$("[data-theories]");

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const rich = (s) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  const plain = (s) => String(s ?? "").replace(/\*+/g, "");
  const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  const pad2 = (n) => String(n).padStart(2, "0");
  const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
  const fmtTime = (sec) => {
    const s = Math.max(0, Math.ceil(sec));
    return `${Math.floor(s / 60)}:${pad2(s % 60)}`;
  };

  const chapters = [...C.chapters].sort((a, b) => a.number - b.number);
  const byNum = (n) => chapters.find((c) => c.number === n);
  const sectionOf = (ch) => C.sections.find((s) => s.id === ch.section);
  const inSection = (sec) => chapters.filter((c) => c.section === sec.id);

  const toastEl = $("[data-toast]");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  }

  function scrollToEl(el, offset = 24) {
    if (!el) return;
    const header = $("[data-header]");
    const y = el.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: reduced() ? "auto" : "smooth" });
  }

  /* ---------- journal storage (per-browser convenience only) ---------- */
  const STORE_KEY = "mindfulness-handbook-journal-v1";
  const store = {
    read() {
      try {
        return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
      } catch {
        return {};
      }
    },
    write(data) {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
        return true;
      } catch {
        return false;
      }
    }
  };
  let journal = store.read();

  const allPrompts = () => [
    ...chapters.flatMap((ch) =>
      ch.blocks
        .filter((b) => b.type === "prompt")
        .map((b) => ({ key: b.key, text: b.text, label: `Chapter ${pad2(ch.number)} · ${ch.title}`, group: ch.section }))
    ),
    ...(C.prompts || []).map((p) => ({ key: p.key, text: p.text, label: p.label || "Everyday", group: "E" }))
  ];

  /* ==========================================================================
     RENDER
     ========================================================================== */
  function bindText() {
    const data = { ...C, theories: T };
    $$("[data-bind]").forEach((el) => {
      const v = get(data, el.dataset.bind);
      if (v != null && v !== "") el.textContent = v;
    });
    $$("[data-bind-rich]").forEach((el) => {
      const v = get(data, el.dataset.bindRich);
      if (v != null && v !== "") el.innerHTML = rich(v);
    });
    const meta = isTheories ? T.meta : C.meta;
    document.title = meta.title;
    const desc = $('meta[name="description"]');
    if (desc && meta.description) desc.setAttribute("content", meta.description);
  }

  function renderHero(hero = C.hero) {
    $("[data-hero-title]").innerHTML = hero.headline
      .map((line, i) => `<span class="line"><span style="--i:${i}">${rich(line)}</span></span>`)
      .join("");
    $("[data-hero-scene]").innerHTML = ART.heroScene();
  }

  function renderTicker(list = C.ticker) {
    const words = Array(4).fill(list).flat();
    const group = words.map((w) => `<span>${esc(w)}</span>`).join("");
    $("[data-ticker]").innerHTML = `<div class="ticker__group">${group}</div><div class="ticker__group">${group}</div>`;
  }

  function renderWelcome() {
    $("[data-art='welcome']").innerHTML = ART.render("welcome");
    $("[data-welcome-paragraphs]").innerHTML = C.welcome.paragraphs.map((p) => `<p>${rich(p)}</p>`).join("");
    const cta = $("[data-welcome-cta]");
    cta.href = C.welcome.cta.href;
    cta.innerHTML = `${esc(C.welcome.cta.label)} <span class="arrow" aria-hidden="true">→</span>`;
  }

  function renderStats() {
    const items = [
      [C.sections.length, "Sections"],
      [chapters.length, "Chapters"],
      [C.practices.length, "Guided practices"]
    ];
    $("[data-stats]").innerHTML = items
      .map(([n, label], i) => `<li class="stat" data-reveal style="--i:${i}"><strong>${n}</strong><span>${esc(label)}</span></li>`)
      .join("");
  }

  function chapterCardHTML(ch, i) {
    return `
      <li class="ch-card" data-reveal style="--i:${i % 3}">
        <a class="has-art" href="#chapter-${ch.number}">
          <span class="ch-card__art grain">${ART.render(ch.art)}</span>
          <span class="ch-card__eyebrow">Chapter ${pad2(ch.number)} · ${esc(ch.minutes)} min read</span>
          <h4 class="ch-card__title">${esc(plain(ch.title))}</h4>
          <span class="ch-card__summary">${rich(ch.summary)}</span>
          <span class="pill pill--sm">Read chapter <span class="arrow" aria-hidden="true">→</span></span>
        </a>
      </li>`;
  }

  function renderChapterGrid() {
    $("[data-chapter-grid]").innerHTML = C.sections
      .map(
        (sec) => `
      <section class="ch-group" aria-labelledby="sec-${sec.id}">
        <header class="ch-group__head" data-reveal>
          <p class="eyebrow">Section ${esc(sec.id)}</p>
          <h3 class="ch-group__title" id="sec-${sec.id}">${esc(sec.title)}</h3>
          <p class="ch-group__blurb">${rich(sec.blurb)}</p>
        </header>
        <ol class="chapter-grid">${inSection(sec).map(chapterCardHTML).join("")}</ol>
      </section>`
      )
      .join("");
  }

  function renderNavLists() {
    $("[data-menu-chapters]").innerHTML = chapters
      .map((ch) => `<li><a href="#chapter-${ch.number}">${esc(plain(ch.title))}</a></li>`)
      .join("");
    $("[data-footer-chapters]").innerHTML = C.sections
      .map((sec) => `<li><a href="#chapter-${inSection(sec)[0].number}">Section ${esc(sec.id)} · ${esc(sec.title)}</a></li>`)
      .join("");
    const railBtn = (ch) =>
      `<li><button type="button" class="rail-btn" data-chapter="${ch.number}"><span class="rail-btn__num">${pad2(
        ch.number
      )}</span><span>${esc(plain(ch.title))}</span></button></li>`;
    $("[data-rail]").innerHTML = C.sections
      .map(
        (sec) =>
          `<li class="rail-group" role="presentation">Section ${esc(sec.id)} · ${esc(sec.title)}</li>${inSection(sec).map(railBtn).join("")}`
      )
      .join("");
  }

  function promptHTML(p, variant, i = 0) {
    const fieldId = `note-${variant}-${p.key}`;
    const card = variant === "journal";
    return `<div class="prompt ${card ? "j-card" : "prompt--inline"}"${card ? ` data-reveal style="--i:${i % 2}"` : ""}>
      <p class="eyebrow">${esc(card ? p.label : "Reflect")}</p>
      <label class="prompt__q" for="${fieldId}">${rich(p.text)}</label>
      <textarea class="lined" id="${fieldId}" rows="4" data-journal-key="${esc(p.key)}" placeholder="Write freely…"></textarea>
      <div class="prompt__foot"><span>Saved in this browser only</span><span class="saved" aria-live="polite"></span></div>
      <div class="print-only" data-print-for="${esc(p.key)}"></div>
    </div>`;
  }

  /* ---------- worksheets (answers saved in the journal store) ---------- */
  function choicesHTML(b, forPrint) {
    if (forPrint) return `<h4>${rich(b.title)}</h4><p>${b.options.map((o) => esc(o)).join(" · ")}</p>`;
    return `<div class="ws" role="group" aria-labelledby="ws-${esc(b.key)}" data-ws="choices" data-key="${esc(b.key)}" data-max="${b.max}">
      <p class="ws__title" id="ws-${esc(b.key)}">${rich(b.title)}</p>
      <div class="ws-chips">${b.options
        .map((o) => `<label class="ws-chip"><input type="checkbox" value="${esc(o)}"><span>${esc(o)}</span></label>`)
        .join("")}</div>
      <div class="ws__foot"><p class="ws__status" data-ws-status aria-live="polite"></p></div>
    </div>`;
  }

  function ratingHTML(b, forPrint) {
    if (forPrint)
      return `<h4>${rich(b.title)}</h4><p>${rich(b.hint)}</p><ul class="dots">${b.items
        .map((it) => `<li>${esc(it.label)}: A &nbsp; B &nbsp; C &nbsp; D</li>`)
        .join("")}</ul>`;
    const rows = b.items
      .map((it, i) => {
        const name = `${b.key}.${i}`;
        const labelId = `ws-${b.key}-${i}`;
        return `<div class="ws-rate">
          <div class="ws-rate__label" id="${esc(labelId)}"><strong>${esc(it.label)}</strong><small>${esc(it.hint)}</small></div>
          <div class="ws-rate__opts" role="radiogroup" aria-labelledby="${esc(labelId)}">${["A", "B", "C", "D"]
            .map((v) => `<label class="ws-opt"><input type="radio" name="${esc(name)}" value="${v}"><span>${v}</span></label>`)
            .join("")}</div>
        </div>`;
      })
      .join("");
    return `<div class="ws" data-ws="rating" data-key="${esc(b.key)}">
      <p class="ws__title">${rich(b.title)}</p>
      <p class="ws__hint">${rich(b.hint)}</p>
      ${rows}
      <div class="ws__foot"><p class="ws__status" data-ws-status aria-live="polite"></p></div>
    </div>`;
  }

  function checklistHTML(b, forPrint) {
    if (forPrint)
      return `<h4>${rich(b.title)}</h4>${b.groups
        .map((g) => `<p><strong>${esc(g.title)}</strong></p><ul class="dots">${g.items.map((it) => `<li>${rich(it)}</li>`).join("")}</ul>`)
        .join("")}`;
    const groups = b.groups
      .map(
        (g, gi) => `<div class="ws-group">
        <p class="ws-group__head"><strong>${esc(g.title)}</strong><span>${esc(g.note)}</span></p>
        ${g.items
          .map(
            (it, ii) =>
              `<label class="ws-check"><input type="checkbox" data-item="${esc(`${b.key}.${gi}.${ii}`)}"><span class="ws-check__box" aria-hidden="true"></span><span>${rich(it)}</span></label>`
          )
          .join("")}
      </div>`
      )
      .join("");
    return `<div class="ws" data-ws="checklist" data-key="${esc(b.key)}">
      <p class="ws__title">${rich(b.title)}</p>
      ${groups}
      <div class="ws__foot">
        <p class="ws__status" data-ws-status aria-live="polite"></p>
        <button type="button" class="text-btn" data-ws-reset>${esc(b.reset)}</button>
      </div>
    </div>`;
  }

  function matrixHTML(b, forPrint) {
    if (forPrint) return `<h4>${rich(b.title)}</h4><ul class="dots">${b.cells.map((c) => `<li><strong>${esc(c.label)}:</strong> ${esc(c.hint)}</li>`).join("")}</ul>`;
    return `<div class="ws">
      <p class="ws__title">${rich(b.title)}</p>
      <div class="matrix">${b.cells
        .map((c) => {
          const key = `${b.key}.${c.key}`;
          const id = `note-${key.replace(/\W/g, "-")}`;
          return `<div class="prompt matrix__cell">
            <label class="matrix__label" for="${esc(id)}"><strong>${esc(c.label)}</strong><span>${esc(c.hint)}</span></label>
            <textarea class="lined" id="${esc(id)}" rows="3" data-journal-key="${esc(key)}"></textarea>
            <div class="prompt__foot"><span class="saved" aria-live="polite"></span></div>
          </div>`;
        })
        .join("")}</div>
    </div>`;
  }

  /* ---------- information blocks ---------- */
  function compareColHTML(col, forPrint) {
    const details = (col.details || [])
      .map((d) =>
        forPrint
          ? `<p><strong>${rich(d.title)}.</strong> ${rich(d.text)}</p>`
          : `<details class="factor"><summary>${rich(d.title)}</summary><p>${rich(d.text)}</p></details>`
      )
      .join("");
    return `<div class="compare__col">
      ${col.tag ? `<p class="eyebrow">${esc(col.tag)}</p>` : ""}
      <h4 class="compare__title">${rich(col.title)}</h4>
      ${col.text ? `<p>${rich(col.text)}</p>` : ""}
      ${details}
    </div>`;
  }

  function quizHTML(b) {
    const questions = b.questions
      .map(
        (q) => `<div class="quiz__q" data-q data-answer="${q.answer}">
        <p class="quiz__text">${rich(q.q)}</p>
        <div class="quiz__opts">${q.options
          .map((o, i) => `<button type="button" class="quiz__opt" data-opt="${i}">${esc(o)}</button>`)
          .join("")}</div>
        <p class="quiz__why" aria-live="polite" hidden>${rich(q.why)}</p>
      </div>`
      )
      .join("");
    return `<div class="quiz" data-quiz>
      <p class="eyebrow">${esc(b.title)}</p>
      ${questions}
      <div class="quiz__foot" hidden>
        <p class="quiz__score" data-quiz-score aria-live="polite"></p>
        <button type="button" class="pill pill--light pill--sm" data-quiz-reset>Try again</button>
      </div>
    </div>`;
  }

  function blockHTML(b, forPrint = false) {
    switch (b.type) {
      case "lead":
        return `<p class="lead">${rich(b.text)}</p>`;
      case "p":
        return `<p>${rich(b.text)}</p>`;
      case "h3":
        return `<h4>${rich(b.text)}</h4>`;
      case "list":
        return `${b.title ? `<h4>${rich(b.title)}</h4>` : ""}<ul class="dots">${b.items.map((it) => `<li>${rich(it)}</li>`).join("")}</ul>`;
      case "callout":
        return `<aside class="callout"><p class="eyebrow">${esc(b.title || "Note")}</p><p>${rich(b.text)}</p>${
          b.action ? `<a class="text-link" href="${esc(b.action.href)}">${esc(b.action.label)} →</a>` : ""
        }</aside>`;
      case "practice":
        return `<div class="practice-box"><p class="eyebrow">${esc(b.title)}</p><ol>${b.steps
          .map((s) => `<li>${rich(s)}</li>`)
          .join("")}</ol>${
          b.practiceId
            ? `<button type="button" class="pill pill--sm" data-open-practice="${esc(b.practiceId)}">Open the guided version</button>`
            : ""
        }</div>`;
      case "prompt":
        return promptHTML({ key: b.key, text: b.text }, "inline");
      case "quote":
        return `<blockquote class="pull"><p>${rich(b.text)}</p>${b.cite ? `<footer>${esc(b.cite)}</footer>` : ""}</blockquote>`;
      case "cards":
        return `<div class="cards${b.cols ? ` cards--${b.cols}` : ""}">${b.items
          .map(
            (c) => `<div class="info-card">
              <p class="info-card__title">${rich(c.title)}</p>
              <p>${rich(c.text)}</p>
              ${c.note ? `<p class="info-card__note">${rich(c.note)}</p>` : ""}
            </div>`
          )
          .join("")}</div>`;
      case "table":
        return `${b.title ? `<h4>${rich(b.title)}</h4>` : ""}<div class="table-wrap" tabindex="0" role="region" aria-label="${esc(
          plain(b.title || "Table")
        )}"><table class="data-table"><thead><tr>${b.head
          .map((h, i) => (h ? `<th scope="col">${esc(h)}</th>` : `<td${i ? "" : ' class="data-table__blank"'}></td>`))
          .join("")}</tr></thead><tbody>${b.rows
          .map((r) => `<tr>${r.map((cell, i) => (i ? `<td>${rich(cell)}</td>` : `<th scope="row">${rich(cell)}</th>`)).join("")}</tr>`)
          .join("")}</tbody></table></div>`;
      case "chips":
        return `${b.title ? `<h4>${rich(b.title)}</h4>` : ""}<ul class="chips${b.words ? " chips--words" : ""}">${b.items
          .map((it) =>
            typeof it === "string" ? `<li class="chip">${esc(it)}</li>` : `<li class="chip" lang="${esc(it.lang)}">${esc(it.text)}</li>`
          )
          .join("")}</ul>`;
      case "compare":
        return `<div class="compare">${compareColHTML(b.left, forPrint)}${compareColHTML(b.right, forPrint)}</div>`;
      case "formula":
        return `<div class="formula">${b.terms
          .map(
            (t, i) =>
              `${i ? '<span class="formula__op" aria-hidden="true">+</span>' : ""}<div class="formula__term"><strong>${rich(
                t.label
              )}</strong><span>${rich(t.note)}</span></div>`
          )
          .join("")}<div class="formula__result">${rich(b.result)}</div></div>`;
      case "quiz":
        return forPrint ? "" : quizHTML(b);
      case "choices":
        return choicesHTML(b, forPrint);
      case "rating":
        return ratingHTML(b, forPrint);
      case "checklist":
        return checklistHTML(b, forPrint);
      case "matrix":
        return matrixHTML(b, forPrint);
      default:
        return "";
    }
  }

  function chapterHTML(ch, forPrint = false) {
    const sec = sectionOf(ch);
    const body = ch.blocks
      .map((b) =>
        forPrint && b.type === "prompt" ? `<p class="print-prompt"><em>Reflect:</em> ${rich(b.text)}</p>` : blockHTML(b, forPrint)
      )
      .join("");
    return `<header class="chapter__head">
        <span class="chapter__numeral" aria-hidden="true">${pad2(ch.number)}</span>
        <div>
          <p class="eyebrow">Section ${esc(sec.id)} · ${esc(sec.title)} · ${esc(ch.minutes)} min read</p>
          <h3 class="chapter__title"${forPrint ? "" : ' tabindex="-1" data-chapter-title'}>${rich(ch.title)}</h3>
        </div>
      </header>
      <div class="chapter__body">${body}</div>`;
  }

  function renderPrintChapters() {
    $("[data-print-chapters]").innerHTML = chapters
      .map((ch) => `<div class="chapter__inner">${chapterHTML(ch, true)}</div>`)
      .join("");
  }

  function renderPracticeCards() {
    $("[data-practice-cards]").innerHTML = C.practices
      .map(
        (p, i) => `
      <li class="p-card has-art" data-reveal style="--i:${i}">
        <span class="p-card__art grain">${ART.render(p.art)}</span>
        <div class="p-card__body">
          <p class="p-card__meta">${esc(p.duration)} · ${esc(p.when)}</p>
          <h3 class="p-card__title">${esc(plain(p.title))}</h3>
          <p class="p-card__text">${rich(p.description)}</p>
          <button type="button" class="pill pill--light" data-open-practice="${esc(p.id)}">Begin <span class="arrow" aria-hidden="true">→</span></button>
        </div>
      </li>`
      )
      .join("");
  }

  function renderJournal() {
    const prompts = allPrompts();
    const groups = [...C.sections.map((s) => ({ id: s.id, label: s.title })), { id: "E", label: "Everyday" }].map((g) => ({
      ...g,
      prompts: prompts.filter((p) => p.group === g.id)
    }));
    const tabs = groups
      .map(
        (g, i) =>
          `<button type="button" role="tab" class="tab-pill tab-pill--ink" id="jt-${g.id}" aria-controls="jp-${g.id}" aria-selected="${i === 0}" tabindex="${
            i === 0 ? 0 : -1
          }">${esc(g.label)}<small>${g.prompts.length}</small></button>`
      )
      .join("");
    const panels = groups
      .map(
        (g, i) =>
          `<div class="journal" role="tabpanel" id="jp-${g.id}" aria-labelledby="jt-${g.id}"${i === 0 ? "" : " hidden"}>${g.prompts
            .map((p, j) => promptHTML(p, "journal", j))
            .join("")}</div>`
      )
      .join("");
    $("[data-journal]").innerHTML = `<div class="journal-tabs" role="tablist" aria-label="Journal sections">${tabs}</div>${panels}`;
  }

  function setupJournalTabs() {
    const list = $(".journal-tabs");
    const tabs = $$("[role='tab']", list);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        $(`#${t.getAttribute("aria-controls")}`).hidden = !on;
      });
      if (focus) tab.focus();
    };
    list.addEventListener("click", (e) => {
      const tab = e.target.closest("[role='tab']");
      if (tab) select(tab);
    });
    list.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const step = e.key === "ArrowRight" ? 1 : -1;
      const now = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      select(tabs[(now + step + tabs.length) % tabs.length], true);
    });
  }

  function renderAbout() {
    $("[data-author-note]").innerHTML = C.author.note.map((p) => `<p>${rich(p)}</p>`).join("");
    const media = C.author.image
      ? `<img src="${esc(C.author.image)}" alt="${esc(C.author.name)}" loading="lazy">`
      : ART.render("arches");
    $("[data-author-media]").innerHTML = `<figure class="portrait grain has-art" data-reveal>${media}</figure>`;
  }

  function renderFooter() {
    $("[data-copyright]").textContent =
      C.footer.copyright || `© ${C.meta.year} ${C.meta.author}. All rights reserved.`;
  }

  /* ==========================================================================
     JOURNAL (textareas in chapters and the journal share one store)
     ========================================================================== */
  function hydrateNotes(root = document) {
    $$("textarea[data-journal-key]", root).forEach((t) => {
      t.value = journal[t.dataset.journalKey] || "";
    });
    $$("[data-print-for]", root).forEach((el) => {
      el.textContent = journal[el.dataset.printFor] || "";
    });
    $$("[data-ws]", root).forEach((ws) => {
      const key = ws.dataset.key;
      const kind = ws.dataset.ws;
      const chosen = kind === "choices" ? (journal[key] || "").split(", ") : [];
      $$("input", ws).forEach((i) => {
        if (kind === "choices") i.checked = chosen.includes(i.value);
        else if (kind === "rating") i.checked = journal[i.name] === i.value;
        else i.checked = journal[i.dataset.item] === "1";
      });
      updateWorksheet(ws);
    });
  }

  function updateWorksheet(ws) {
    const status = $("[data-ws-status]", ws);
    if (ws.dataset.ws === "choices") {
      status.textContent = `${$$("input:checked", ws).length} of ${ws.dataset.max} chosen`;
    } else if (ws.dataset.ws === "rating") {
      const date = journal[`${ws.dataset.key}.date`];
      status.textContent = date ? `Last rated ${date}` : "Not rated yet";
    } else {
      const boxes = $$("input", ws);
      status.textContent = `${boxes.filter((i) => i.checked).length} of ${boxes.length} done`;
    }
  }

  document.addEventListener("change", (e) => {
    if (!(e.target instanceof Element)) return;
    const ws = e.target.closest("[data-ws]");
    if (!ws) return;
    const key = ws.dataset.key;
    if (ws.dataset.ws === "choices") {
      const chosen = $$("input:checked", ws).map((i) => i.value);
      const max = Number(ws.dataset.max);
      if (chosen.length > max) {
        e.target.checked = false;
        toast(`Choose up to ${WORDS[max].toLowerCase()}. Untick one to swap it.`);
        return;
      }
      journal[key] = chosen.join(", ");
    } else if (ws.dataset.ws === "rating") {
      journal[e.target.name] = e.target.value;
      journal[`${key}.date`] = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    } else if (e.target.checked) {
      journal[e.target.dataset.item] = "1";
    } else {
      delete journal[e.target.dataset.item];
    }
    store.write(journal);
    updateWorksheet(ws);
  });

  function resetChecklist(ws) {
    Object.keys(journal)
      .filter((k) => k.startsWith(`${ws.dataset.key}.`))
      .forEach((k) => delete journal[k]);
    store.write(journal);
    hydrateNotes(ws.parentElement);
    toast("Checklist cleared for a new week");
  }

  // Worksheet answers, as plain lines for the downloaded notes.
  function worksheetLines() {
    const out = [];
    const add = (title, rows) => {
      if (rows.length) out.push(plain(title).toUpperCase(), ...rows, "");
    };
    chapters.forEach((ch) =>
      ch.blocks.forEach((b) => {
        if (b.type === "choices" && journal[b.key]) add(b.title, [journal[b.key]]);
        if (b.type === "rating") {
          add(
            b.title,
            b.items.flatMap((it, i) => (journal[`${b.key}.${i}`] ? [`${it.label}: ${journal[`${b.key}.${i}`]}`] : []))
          );
        }
        if (b.type === "checklist") {
          add(
            b.title,
            b.groups.flatMap((g, gi) =>
              g.items.flatMap((it, ii) => (journal[`${b.key}.${gi}.${ii}`] ? [`${g.title}: ${plain(it)}`] : []))
            )
          );
        }
        if (b.type === "matrix") {
          add(
            b.title,
            b.cells.flatMap((c) => {
              const v = (journal[`${b.key}.${c.key}`] || "").trim();
              return v ? [`${c.label}: ${v}`] : [];
            })
          );
        }
      })
    );
    return out;
  }

  let saveTimer;
  document.addEventListener("input", (e) => {
    const t = e.target.closest && e.target.closest("textarea[data-journal-key]");
    if (!t) return;
    const key = t.dataset.journalKey;
    journal[key] = t.value;
    $$("textarea[data-journal-key]").forEach((other) => {
      if (other !== t && other.dataset.journalKey === key) other.value = t.value;
    });
    $$("[data-print-for]").forEach((el) => {
      if (el.dataset.printFor === key) el.textContent = t.value;
    });
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const ok = store.write(journal);
      const badge = t.closest(".prompt")?.querySelector(".saved");
      if (!badge) return;
      badge.textContent = ok ? "Saved ✓" : "Couldn't save in this browser";
      badge.classList.add("is-on");
      clearTimeout(badge._t);
      badge._t = setTimeout(() => badge.classList.remove("is-on"), 1800);
    }, 450);
  });

  function setupJournalActions() {
    $("[data-journal-download]").addEventListener("click", () => {
      const lines = [`${C.meta.title} — my reflections`, new Date().toLocaleDateString(), ""];
      allPrompts().forEach((p) => {
        lines.push(plain(p.label).toUpperCase(), plain(p.text), (journal[p.key] || "—").trim(), "");
      });
      lines.push(...worksheetLines());
      const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "my-reflections.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
      toast("Your reflections were saved as a text file");
    });

    $("[data-journal-print]").addEventListener("click", () => {
      document.body.classList.add("print-journal");
      window.print();
    });
    window.addEventListener("afterprint", () => document.body.classList.remove("print-journal"));

    // Two-step clear: the first press asks, a second press within 5 seconds clears.
    // Built into the page because some viewers (like the shared preview link) block confirm() dialogs.
    const clearBtn = $("[data-journal-clear]");
    const clearLabel = clearBtn.textContent;
    let clearTimer = null;
    const disarmClear = () => {
      clearTimeout(clearTimer);
      clearTimer = null;
      clearBtn.textContent = clearLabel;
      clearBtn.classList.remove("is-armed");
    };
    clearBtn.addEventListener("click", () => {
      if (!Object.values(journal).some((v) => v && v.trim())) {
        toast("There's nothing to clear yet");
        return;
      }
      if (!clearTimer) {
        clearBtn.textContent = "Yes, delete all notes";
        clearBtn.classList.add("is-armed");
        toast("Press again to delete every note in this browser. This can't be undone.");
        clearTimer = setTimeout(disarmClear, 5000);
        return;
      }
      disarmClear();
      journal = {};
      store.write(journal);
      hydrateNotes();
      toast("Your reflections were cleared");
    });
    clearBtn.addEventListener("blur", () => {
      if (clearTimer) disarmClear();
    });
  }

  /* ==========================================================================
     CHAPTER READER
     ========================================================================== */
  const pane = $("[data-reader-pane]");
  let current = 0;
  let swapTimer;

  function updateReaderChrome(n) {
    const total = chapters.length;
    const index = chapters.findIndex((c) => c.number === n);
    $$(".rail-btn").forEach((b) => {
      const on = Number(b.dataset.chapter) === n;
      b.setAttribute("aria-current", on ? "true" : "false");
      if (on && window.matchMedia("(max-width: 860px)").matches) {
        const rail = b.closest(".reader__rail");
        rail.scrollTo({ left: b.offsetLeft - 16, behavior: reduced() ? "auto" : "smooth" });
      }
    });
    $("[data-reader-count]").textContent = `Chapter ${index + 1} of ${total}`;
    $("[data-reader-bar]").style.transform = `scaleX(${(index + 1) / total})`;

    const prev = chapters[index - 1];
    const next = chapters[index + 1];
    $("[data-pager]").innerHTML =
      (prev
        ? `<button type="button" class="pager__btn" data-chapter="${prev.number}"><small>← Previous</small><span>${esc(plain(prev.title))}</span></button>`
        : `<a class="pager__btn" href="#inside"><small>← Overview</small><span>All chapters</span></a>`) +
      (next
        ? `<button type="button" class="pager__btn pager__btn--next" data-chapter="${next.number}"><small>Next →</small><span>${esc(plain(next.title))}</span></button>`
        : `<a class="pager__btn pager__btn--next" href="#practice"><small>Up next →</small><span>Practise what you've read</span></a>`);
  }

  // Slide new content in. Reading offsetWidth applies the start position straight away,
  // so the content can't get stuck hidden if the browser isn't drawing frames.
  function playIn(el, dir) {
    el.classList.add(`is-in-${dir}`);
    void el.offsetWidth;
    el.classList.remove(`is-in-${dir}`);
  }

  function setChapter(n, { scroll = false, focus = false, animate = true } = {}) {
    const ch = byNum(n);
    if (!ch) return;
    if (n === current && pane.firstElementChild) {
      if (scroll) scrollToEl($("[data-reader-layout]"));
      return;
    }
    const dir = n > current ? "next" : "prev";
    const old = pane.firstElementChild;
    const motion = animate && !reduced();
    current = n;
    updateReaderChrome(n);

    const swapIn = () => {
      pane.innerHTML = `<div class="chapter__inner">${chapterHTML(ch)}</div>`;
      hydrateNotes(pane);
      const inner = pane.firstElementChild;
      if (motion) playIn(inner, dir);
      if (focus) $("[data-chapter-title]", pane)?.focus({ preventScroll: true });
    };

    clearTimeout(swapTimer);
    if (old && motion) {
      old.classList.add(`is-out-${dir}`);
      swapTimer = setTimeout(swapIn, 360);
    } else {
      swapIn();
    }
    if (scroll) scrollToEl($("[data-reader-layout]"));
  }

  const chapterFromHash = (hash) => {
    const m = /^#chapter-(\d+)$/.exec(hash || "");
    return m ? Number(m[1]) : null;
  };

  // Keep the address in step with the open chapter. Some viewers refuse URL changes; the chapter still opens.
  const setChapterHash = (n) => {
    try {
      history.replaceState(null, "", `#chapter-${n}`);
    } catch {
      /* ignore */
    }
  };

  function goToChapter(n, opts = {}) {
    if (!byNum(n)) return;
    setChapterHash(n);
    setChapter(n, { scroll: true, focus: true, ...opts });
  }

  function setupReader() {
    const fromHash = chapterFromHash(location.hash);
    setChapter(fromHash && byNum(fromHash) ? fromHash : chapters[0].number, { animate: false });
    if (fromHash) setTimeout(() => scrollToEl($("[data-reader-layout]")), 80);

    window.addEventListener("hashchange", () => {
      const n = chapterFromHash(location.hash);
      if (n) setChapter(n, { scroll: true, focus: true });
    });

    // arrow keys turn pages while the reader is on screen
    let readerVisible = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => entries.forEach((e) => (readerVisible = e.isIntersecting)), {
        threshold: 0.2
      }).observe($("[data-reader]"));
    }
    document.addEventListener("keydown", (e) => {
      if (!readerVisible || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const target = e.target instanceof Element ? e.target : document.body;
      if (target.closest("input, textarea, select, [contenteditable], [role='radiogroup']")) return;
      if (document.body.classList.contains("menu-open") || document.body.classList.contains("overlay-open")) return;
      const index = chapters.findIndex((c) => c.number === current);
      const next = chapters[index + (e.key === "ArrowRight" ? 1 : -1)];
      if (next) {
        e.preventDefault();
        setChapterHash(next.number);
        setChapter(next.number, { focus: false });
      }
    });
  }

  /* ==========================================================================
     BREATHING GUIDE
     ========================================================================== */
  const PATTERNS = (C.breathing && C.breathing.patterns) || [{ label: "Calm", hint: "4 · 6", phases: [["in", 4], ["out", 6]] }];
  const PHASE_LABEL = { in: "Breathe in", hold: "Hold", out: "Breathe out", rest: "Rest" };
  const pacer = { pattern: 0, phase: 0, running: false, breaths: 0, timer: 0, tick: 0 };

  function pacerScale(scale, seconds) {
    [$("[data-pacer-orb]"), $("[data-pacer-halo]")].forEach((el) => {
      el.style.setProperty("--dur", `${seconds}s`);
      el.style.setProperty("--s", scale);
    });
  }

  function pacerStep() {
    const [type, seconds] = PATTERNS[pacer.pattern].phases[pacer.phase];
    if (type === "in") pacerScale(1, seconds);
    if (type === "out") pacerScale(0.55, seconds);
    $("[data-pacer-label]").textContent = PHASE_LABEL[type] || type;
    const countEl = $("[data-pacer-count]");
    let left = seconds;
    countEl.textContent = left;
    clearInterval(pacer.tick);
    pacer.tick = setInterval(() => {
      left -= 1;
      if (left > 0) countEl.textContent = left;
    }, 1000);
    pacer.timer = setTimeout(() => {
      pacer.phase = (pacer.phase + 1) % PATTERNS[pacer.pattern].phases.length;
      if (pacer.phase === 0) {
        pacer.breaths += 1;
        $("[data-pacer-breaths]").textContent = `${pacer.breaths} ${pacer.breaths === 1 ? "breath" : "breaths"}`;
      }
      pacerStep();
    }, seconds * 1000);
  }

  function pacerStart() {
    pacer.running = true;
    pacer.phase = 0;
    pacer.breaths = 0;
    $("[data-pacer-breaths]").textContent = "";
    $("[data-pacer-toggle]").textContent = "Stop";
    $("[data-pacer-stage]").classList.remove("is-idle");
    pacerStep();
  }

  function pacerStop() {
    if (!isHandbook) return;
    if (!pacer.running && $("[data-pacer-stage]").classList.contains("is-idle")) return;
    pacer.running = false;
    clearTimeout(pacer.timer);
    clearInterval(pacer.tick);
    pacerScale(0.55, 1.2);
    $("[data-pacer-label]").textContent = "Ready when you are";
    $("[data-pacer-count]").textContent = "";
    $("[data-pacer-toggle]").textContent = "Start";
    $("[data-pacer-stage]").classList.add("is-idle");
  }

  function setupPacer() {
    const tabs = $("[data-pacer-tabs]");
    tabs.innerHTML = PATTERNS.map(
      (p, i) =>
        `<button type="button" role="radio" class="tab-pill" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-pattern="${i}">${esc(
          p.label
        )}<small>${esc(p.hint || "")}</small></button>`
    ).join("");

    const select = (i, focus) => {
      pacer.pattern = i;
      $$(".tab-pill", tabs).forEach((b, j) => {
        b.setAttribute("aria-checked", String(j === i));
        b.tabIndex = j === i ? 0 : -1;
        if (focus && j === i) b.focus();
      });
      if (pacer.running) {
        clearTimeout(pacer.timer);
        clearInterval(pacer.tick);
        pacerStart();
      }
    };
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest(".tab-pill");
      if (b) select(Number(b.dataset.pattern));
    });
    tabs.addEventListener("keydown", (e) => {
      if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
      select((pacer.pattern + step + PATTERNS.length) % PATTERNS.length, true);
    });

    $("[data-pacer-toggle]").addEventListener("click", () => (pacer.running ? pacerStop() : pacerStart()));
    $("[data-pacer-stage]").classList.add("is-idle");
    pacerScale(0.55, 1.2);

    // stop quietly when the guide scrolls out of view
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => entries.forEach((e) => !e.isIntersecting && pacer.running && pacerStop()),
        { threshold: 0 }
      ).observe($("[data-pacer]"));
    }
  }

  /* ==========================================================================
     GUIDED PRACTICE PLAYER
     ========================================================================== */
  const CIRC = 2 * Math.PI * 56;
  const ov = {
    el: $("[data-overlay]"),
    practice: null,
    total: 0,
    elapsed: 0,
    running: false,
    done: false,
    raf: 0,
    last: 0,
    step: -1,
    audio: null,
    returnFocus: null
  };

  function setStepText(html) {
    const el = $("[data-ov-step]");
    if (reduced()) {
      el.innerHTML = html;
      return;
    }
    el.classList.add("is-swapping");
    clearTimeout(el._t);
    el._t = setTimeout(() => {
      el.innerHTML = html;
      el.classList.remove("is-swapping");
    }, 320);
  }

  function ovFrame(t) {
    if (!ov.running) return;
    const dt = Math.min(0.25, (t - ov.last) / 1000);
    ov.last = t;
    ov.elapsed = Math.min(ov.total, ov.elapsed + dt);

    let acc = 0;
    let idx = ov.practice.steps.length - 1;
    for (let i = 0; i < ov.practice.steps.length; i++) {
      acc += ov.practice.steps[i].seconds;
      if (ov.elapsed < acc) {
        idx = i;
        break;
      }
    }
    if (idx !== ov.step) {
      ov.step = idx;
      setStepText(rich(ov.practice.steps[idx].text));
    }
    $("[data-ov-ring]").style.strokeDashoffset = String(CIRC * (1 - ov.elapsed / ov.total));
    $("[data-ov-time]").textContent = fmtTime(ov.total - ov.elapsed);

    if (ov.elapsed >= ov.total) {
      ovFinish();
      return;
    }
    ov.raf = requestAnimationFrame(ovFrame);
  }

  function ovPlay() {
    if (!ov.el.classList.contains("is-open")) return;
    ov.running = true;
    ov.done = false;
    ov.el.classList.remove("is-paused");
    $("[data-ov-toggle]").textContent = "Pause";
    ov.last = performance.now();
    cancelAnimationFrame(ov.raf);
    ov.raf = requestAnimationFrame(ovFrame);
    if (ov.audio) ov.audio.play().catch(() => {});
  }

  function ovPause() {
    ov.running = false;
    cancelAnimationFrame(ov.raf);
    ov.el.classList.add("is-paused");
    $("[data-ov-toggle]").textContent = "Resume";
    if (ov.audio) ov.audio.pause();
  }

  function ovFinish() {
    ov.running = false;
    ov.done = true;
    ov.el.classList.add("is-paused");
    setStepText(rich(C.practiceOutro || "Well done."));
    $("[data-ov-toggle]").textContent = "Begin again";
    $("[data-ov-time]").textContent = "0:00";
  }

  function ovRestart() {
    ov.elapsed = 0;
    ov.step = -1;
    $("[data-ov-ring]").style.strokeDashoffset = String(CIRC);
    if (ov.audio) ov.audio.currentTime = 0;
    ovPlay();
  }

  function openPractice(id) {
    const p = C.practices.find((x) => x.id === id);
    if (!p) return;
    if (document.body.classList.contains("menu-open")) closeMenu(false);
    pacerStop();
    ov.practice = p;
    ov.total = p.steps.reduce((sum, s) => sum + s.seconds, 0);
    ov.elapsed = 0;
    ov.step = -1;
    ov.returnFocus = document.activeElement;
    $("[data-ov-title]").textContent = plain(p.title);
    $("[data-ov-meta]").textContent = `${p.duration} · Guided practice`;
    $("[data-ov-step]").innerHTML = "";
    $("[data-ov-time]").textContent = fmtTime(ov.total);
    $("[data-ov-ring]").style.strokeDashoffset = String(CIRC);
    ov.audio = p.audio ? new Audio(p.audio) : null;

    ov.el.inert = false;
    ov.el.classList.add("is-open");
    document.body.classList.add("overlay-open");
    setTimeout(() => $("[data-ov-close]").focus(), 60);
    clearTimeout(ov.startTimer);
    ov.startTimer = setTimeout(ovPlay, reduced() ? 0 : 650);
  }

  function closePractice() {
    if (!ov.el.classList.contains("is-open")) return;
    clearTimeout(ov.startTimer);
    ovPause();
    if (ov.audio) {
      ov.audio.pause();
      ov.audio = null;
    }
    ov.el.classList.remove("is-open");
    ov.el.inert = true;
    document.body.classList.remove("overlay-open");
    if (ov.returnFocus && ov.returnFocus.focus) ov.returnFocus.focus({ preventScroll: true });
  }

  function setupOverlay() {
    $("[data-ov-close]").addEventListener("click", closePractice);
    $("[data-ov-restart]").addEventListener("click", ovRestart);
    $("[data-ov-toggle]").addEventListener("click", () => {
      if (ov.done) ovRestart();
      else if (ov.running) ovPause();
      else ovPlay();
    });
    // keep keyboard focus inside the dialog
    ov.el.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusable = $$("button, [href]", ov.el).filter((el) => !el.disabled && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ==========================================================================
     HAPPINESS AT WORK PAGE (one part at a time, like the chapter reader)
     ========================================================================== */
  const partPane = $("[data-part-pane]");
  let currentPart = 0;
  let partTimer;

  const partFromHash = (hash) => {
    const m = /^#part-(\d+)$/.exec(hash || "");
    return m ? Number(m[1]) : null;
  };

  function topicHTML(t, forPrint) {
    return `<section class="topic" id="${esc(t.id)}"${forPrint ? "" : " data-reveal"}>
      <div class="topic__head">
        <h3 class="topic__title">${rich(t.title)}</h3>
        ${t.byline ? `<p class="topic__by">${esc(t.byline)}</p>` : ""}
      </div>
      <div class="chapter__body">${t.blocks
        .map((b) =>
          forPrint && b.type === "prompt" ? `<p class="print-prompt"><em>Reflect:</em> ${rich(b.text)}</p>` : blockHTML(b, forPrint)
        )
        .join("")}</div>
    </section>`;
  }

  function partHTML(p, i, forPrint = false) {
    return `<header class="chapter__head">
        <span class="chapter__numeral" aria-hidden="true">${pad2(i + 1)}</span>
        <div>
          <p class="eyebrow">Part ${WORDS[i + 1]} · ${esc(p.eyebrow)}</p>
          <h2 class="chapter__title"${forPrint ? "" : ' tabindex="-1" data-chapter-title'}>${rich(p.title)}</h2>
        </div>
      </header>
      <p class="part__lead">${rich(p.lead)}</p>
      ${p.topics.map((t) => topicHTML(t, forPrint)).join("")}`;
  }

  function renderTheories() {
    renderHero(T.hero);
    renderTicker(T.ticker);
    const links = T.parts.map((p, i) => `<li><a href="#part-${i + 1}">${esc(plain(p.short))}</a></li>`).join("");
    $("[data-menu-chapters]").innerHTML = links;
    $("[data-footer-chapters]").innerHTML = links;
    $("[data-parts]").innerHTML = T.parts
      .map(
        (p, i) =>
          `<button type="button" class="part-tab" data-part="${i + 1}" aria-current="false"><span class="part-tab__num">${pad2(
            i + 1
          )}</span><span>${esc(plain(p.short))}</span></button>`
      )
      .join("");
    $("[data-print-chapters]").innerHTML = T.parts
      .map((p, i) => `<div class="chapter__inner">${partHTML(p, i, true)}</div>`)
      .join("");
  }

  function updatePartChrome(n) {
    $$(".part-tab").forEach((b) => {
      const on = Number(b.dataset.part) === n;
      b.setAttribute("aria-current", on ? "true" : "false");
      if (on && window.matchMedia("(max-width: 860px)").matches) {
        b.parentElement.scrollTo({ left: b.offsetLeft - 16, behavior: reduced() ? "auto" : "smooth" });
      }
    });
    const prev = T.parts[n - 2];
    const next = T.parts[n];
    $("[data-part-pager]").innerHTML =
      (prev
        ? `<button type="button" class="pager__btn" data-part="${n - 1}"><small>← Previous</small><span>${esc(plain(prev.short))}</span></button>`
        : `<a class="pager__btn" href="index.html"><small>← Back</small><span>The handbook</span></a>`) +
      (next
        ? `<button type="button" class="pager__btn pager__btn--next" data-part="${n + 1}"><small>Next →</small><span>${esc(plain(next.short))}</span></button>`
        : `<a class="pager__btn pager__btn--next" href="index.html#chapter-1"><small>Now try it →</small><span>Start the handbook</span></a>`);
  }

  function setPart(n, { scroll = false, focus = false, animate = true } = {}) {
    const part = T.parts[n - 1];
    if (!part) return;
    const scrollToStage = () => scrollToEl($("[data-parts-anchor]"), 96);
    if (n === currentPart && partPane.firstElementChild) {
      if (scroll) scrollToStage();
      return;
    }
    const dir = n > currentPart ? "next" : "prev";
    const old = partPane.firstElementChild;
    const motion = animate && !reduced();
    currentPart = n;
    updatePartChrome(n);

    const swapIn = () => {
      partPane.innerHTML = `<div class="chapter__inner">${partHTML(part, n - 1)}</div>`;
      hydrateNotes(partPane);
      observeReveals(partPane);
      const inner = partPane.firstElementChild;
      if (motion) playIn(inner, dir);
      if (focus) $("[data-chapter-title]", partPane)?.focus({ preventScroll: true });
    };

    clearTimeout(partTimer);
    if (old && motion) {
      old.classList.add(`is-out-${dir}`);
      partTimer = setTimeout(swapIn, 360);
    } else {
      swapIn();
    }
    if (scroll) scrollToStage();
  }

  function goToPart(n) {
    if (!T.parts[n - 1]) return;
    try {
      history.replaceState(null, "", `#part-${n}`);
    } catch {
      /* the part still opens */
    }
    setPart(n, { scroll: true, focus: true });
  }

  function setupParts() {
    const fromHash = partFromHash(location.hash);
    setPart(fromHash && T.parts[fromHash - 1] ? fromHash : 1, { animate: false });
    if (fromHash) setTimeout(() => scrollToEl($("[data-parts-anchor]"), 96), 80);
    window.addEventListener("hashchange", () => {
      const n = partFromHash(location.hash);
      if (n) setPart(n, { scroll: true, focus: true });
    });
  }

  /* ---------- quizzes ---------- */
  function answerQuiz(opt) {
    const q = opt.closest("[data-q]");
    const answer = Number(q.dataset.answer);
    const chosen = Number(opt.dataset.opt);
    const buttons = $$(".quiz__opt", q);
    buttons.forEach((b) => (b.disabled = true));
    buttons[answer].classList.add("is-right");
    if (chosen !== answer) opt.classList.add("is-wrong");
    q.dataset.correct = String(chosen === answer);
    $(".quiz__why", q).hidden = false;

    const quiz = q.closest("[data-quiz]");
    const all = $$("[data-q]", quiz);
    if (all.every((x) => x.dataset.correct)) {
      const right = all.filter((x) => x.dataset.correct === "true").length;
      $("[data-quiz-score]", quiz).textContent = `You got ${right} of ${all.length}.`;
      $(".quiz__foot", quiz).hidden = false;
    }
  }

  function resetQuiz(quiz) {
    $$("[data-q]", quiz).forEach((q) => {
      delete q.dataset.correct;
      $(".quiz__why", q).hidden = true;
      $$(".quiz__opt", q).forEach((b) => {
        b.disabled = false;
        b.classList.remove("is-right", "is-wrong");
      });
    });
    $(".quiz__foot", quiz).hidden = true;
    $(".quiz__opt", quiz).focus({ preventScroll: true });
  }

  /* ==========================================================================
     HEADER, MENU, PROGRESS, PARALLAX
     ========================================================================== */
  const header = $("[data-header]");
  const menu = $("[data-menu]");
  const toggleBtn = $("[data-menu-toggle]");

  function openMenu() {
    document.body.classList.add("menu-open");
    menu.inert = false;
    menu.classList.add("is-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Close menu");
    header.classList.remove("is-hidden");
    setTimeout(() => $("a", menu)?.focus({ preventScroll: true }), 80);
  }

  function closeMenu(restoreFocus = true) {
    document.body.classList.remove("menu-open");
    menu.classList.remove("is-open");
    menu.inert = true;
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open menu");
    if (restoreFocus) toggleBtn.focus({ preventScroll: true });
  }

  function setupHeader() {
    toggleBtn.addEventListener("click", () =>
      document.body.classList.contains("menu-open") ? closeMenu() : openMenu()
    );

    const hero = $("[data-hero]");
    const bar = $("[data-progress]");
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 24);
      if (Math.abs(y - lastY) > 6) {
        const hide = y > lastY && y > window.innerHeight * 0.7 && !document.body.classList.contains("menu-open");
        header.classList.toggle("is-hidden", hide);
        document.documentElement.classList.toggle("header-hidden", hide);
        lastY = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (hero && !reduced() && y < window.innerHeight * 1.3) hero.style.setProperty("--hero-shift", y.toFixed(1));
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", update);
    update();
  }

  /* ==========================================================================
     SCROLL REVEALS
     ========================================================================== */
  let revealObserver = null;
  function observeReveals(root = document) {
    const els = $$("[data-reveal]:not(.is-in)", root);
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              revealObserver.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
    }
    els.forEach((el) => revealObserver.observe(el));
  }

  /* ==========================================================================
     ANIMATIONS SWITCH (footer) — follows the OS setting until the visitor picks
     ========================================================================== */
  const MOTION_KEY = "mindfulness-handbook-motion";

  function applyMotion(calm) {
    root.classList.toggle("reduce-motion", calm);
    const sw = $("[data-motion-toggle]");
    if (sw) sw.setAttribute("aria-checked", String(!calm));
    const hero = $("[data-hero]");
    if (calm && hero) hero.style.removeProperty("--hero-shift");
  }

  function setupMotionToggle() {
    applyMotion(reduced());
    $("[data-motion-toggle]").addEventListener("click", () => {
      const calm = !reduced();
      applyMotion(calm);
      try {
        localStorage.setItem(MOTION_KEY, calm ? "reduced" : "full");
      } catch {
        /* storage blocked: the switch still works for this visit */
      }
      toast(calm ? "Calm mode: animations reduced" : "Animations on");
    });
    const follow = () => {
      let pref = null;
      try {
        pref = localStorage.getItem(MOTION_KEY);
      } catch {
        /* ignore */
      }
      if (!pref) applyMotion(motionQuery.matches);
    };
    if (motionQuery.addEventListener) motionQuery.addEventListener("change", follow);
  }

  /* ==========================================================================
     GLOBAL EVENTS
     ========================================================================== */
  function setupGlobalEvents() {
    document.addEventListener("click", (e) => {
      const practiceBtn = e.target.closest("[data-open-practice]");
      if (practiceBtn) {
        e.preventDefault();
        openPractice(practiceBtn.dataset.openPractice);
        return;
      }
      const quizOpt = e.target.closest(".quiz__opt");
      if (quizOpt) {
        answerQuiz(quizOpt);
        return;
      }
      const quizReset = e.target.closest("[data-quiz-reset]");
      if (quizReset) {
        resetQuiz(quizReset.closest("[data-quiz]"));
        return;
      }
      const wsReset = e.target.closest("[data-ws-reset]");
      if (wsReset) {
        resetChecklist(wsReset.closest("[data-ws]"));
        return;
      }
      const partBtn = e.target.closest("[data-part]");
      if (partBtn) {
        goToPart(Number(partBtn.dataset.part));
        return;
      }
      if (e.target.closest("[data-hero-breath]")) {
        openPractice(C.hero.practiceId);
        return;
      }
      const chapterBtn = e.target.closest("[data-chapter]");
      if (chapterBtn) {
        goToChapter(Number(chapterBtn.dataset.chapter));
        return;
      }
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      if (document.body.classList.contains("menu-open")) closeMenu(false);
      const href = link.getAttribute("href");
      const n = isHandbook ? chapterFromHash(href) : null;
      if (n) {
        e.preventDefault();
        goToChapter(n);
        return;
      }
      const part = isTheories ? partFromHash(href) : null;
      if (part) {
        e.preventDefault();
        goToPart(part);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (ov.el.classList.contains("is-open")) closePractice();
      else if (document.body.classList.contains("menu-open")) closeMenu();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && pacer.running) pacerStop();
    });
  }

  /* ==========================================================================
     BOOT
     ========================================================================== */
  bindText();
  renderFooter();

  if (isHandbook) {
    renderHero();
    renderTicker();
    renderWelcome();
    renderStats();
    renderChapterGrid();
    renderNavLists();
    renderPracticeCards();
    renderJournal();
    renderAbout();
    renderPrintChapters();
    hydrateNotes();
    setupJournalTabs();
    setupReader();
    setupPacer();
    setupJournalActions();
  }
  if (isTheories) {
    renderTheories();
    setupParts();
  }

  setupHeader();
  setupOverlay();
  setupMotionToggle();
  setupGlobalEvents();
  observeReveals();
})();
