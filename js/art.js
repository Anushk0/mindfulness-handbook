/* ==========================================================================
   GENERATED ART — calm, original SVG illustrations used in place of photos.
   Each piece is drawn in a 400 x 500 frame and fills its container
   (preserveAspectRatio slice). Elements with an "a-*" class animate on
   hover in styles.css. Swap any of these for real photography later.
   ========================================================================== */
(() => {
  "use strict";

  let uid = 0;
  const id = (prefix) => `${prefix}-${++uid}`;

  const svg = (inner, cls, vb = "0 0 400 500") =>
    `<svg class="art ${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;

  // Vertical linear gradient: stops = [[offset, color, opacity?], ...]
  const lin = (gid, stops) =>
    `<linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">${stops
      .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
      .join("")}</linearGradient>`;

  // A horizontal sine-like wave spanning -200..600 so it can slide sideways.
  const wave = (y, amp, color, opacity, cls) => {
    let d = `M-200 ${y}`;
    for (let x = -200; x < 600; x += 200) d += ` q50 ${-amp} 100 0 t100 0`;
    return `<path class="${cls}" d="${d} V500 H-200 Z" fill="${color}" fill-opacity="${opacity}"/>`;
  };

  const cloud = (x, y, s, cls, opacity) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}" fill="#fffcf7" fill-opacity="${opacity}">
      <rect x="-72" y="0" width="144" height="38" rx="19"/><circle cx="-26" cy="4" r="27"/><circle cx="18" cy="-6" r="36"/>
    </g></g>`;

  const pieces = {
    ripple() {
      const g = id("rp");
      const rings = [34, 72, 114, 160, 210, 262]
        .map((r, i) => `<circle cx="200" cy="300" r="${r}" stroke-opacity="${(0.62 - i * 0.09).toFixed(2)}"/>`)
        .join("");
      return svg(
        `<defs>${lin(g, [[0, "#f8ebe4"], [1, "#edc5b6"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <g class="a-rings" fill="none" stroke="#b65a4f" stroke-width="1.4">${rings}</g>
        <circle class="a-pebble" cx="200" cy="300" r="10" fill="#b65a4f"/>`,
        "art--ripple"
      );
    },

    waves() {
      const g = id("wv");
      return svg(
        `<defs>${lin(g, [[0, "#f7efe4"], [1, "#ead9c3"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <circle class="a-sun" cx="285" cy="160" r="44" fill="#d4a55a" fill-opacity=".85"/>
        ${wave(300, 18, "#c5cdb0", 0.9, "a-w a-w1")}
        ${wave(345, 16, "#9aa57a", 0.85, "a-w a-w2")}
        ${wave(392, 14, "#6f7a4a", 0.92, "a-w a-w3")}
        ${wave(440, 12, "#b65a4f", 0.6, "a-w a-w4")}`,
        "art--waves"
      );
    },

    stones() {
      const g = id("st");
      const stone = (cx, cy, rx, ry, fill) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>
         <ellipse cx="${cx - rx * 0.28}" cy="${cy - ry * 0.38}" rx="${rx * 0.42}" ry="${ry * 0.28}" fill="#fff" fill-opacity=".14"/>`;
      return svg(
        `<defs>${lin(g, [[0, "#f1f2e8"], [1, "#d7ddc4"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <circle cx="118" cy="128" r="34" fill="#fffcf7" fill-opacity=".75"/>
        <ellipse cx="200" cy="446" rx="132" ry="10" fill="#6f7a4a" fill-opacity=".16"/>
        ${stone(200, 408, 96, 34, "#6f7a4a")}
        ${stone(195, 350, 74, 27, "#9aa57a")}
        ${stone(205, 302, 55, 22, "#cdb08c")}
        <g class="a-top">${stone(198, 262, 38, 17, "#b65a4f")}</g>`,
        "art--stones"
      );
    },

    clouds() {
      const g = id("cl");
      return svg(
        `<defs>${lin(g, [[0, "#f3e6dc"], [1, "#e6cfc1"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <circle class="a-sun" cx="292" cy="330" r="62" fill="#e0a596" fill-opacity=".55"/>
        ${cloud(130, 150, 1, "a-c a-c1", 0.95)}
        ${cloud(292, 250, 0.8, "a-c a-c2", 0.85)}
        ${cloud(150, 372, 1.15, "a-c a-c3", 0.92)}`,
        "art--clouds"
      );
    },

    horizon() {
      const g = id("hz");
      const s = id("hzs");
      return svg(
        `<defs>${lin(g, [[0, "#f4cdbd"], [0.6, "#f8ebe4"], [1, "#f8ebe4"]])}
          <radialGradient id="${s}"><stop offset="0" stop-color="#eaa688"/><stop offset="1" stop-color="#d98b74"/></radialGradient></defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <g class="a-sun"><circle cx="200" cy="330" r="74" fill="url(#${s})"/></g>
        <path d="M0 340 Q 100 300 200 330 T 400 318 V500 H0Z" fill="#e3c3ad"/>
        <path d="M0 392 Q 120 352 232 386 T 400 372 V500 H0Z" fill="#c98c7b"/>
        <path d="M0 444 Q 140 414 262 444 T 400 432 V500 H0Z" fill="#a34a40"/>`,
        "art--horizon"
      );
    },

    leaf() {
      const g = id("lf");
      const veins = [170, 215, 260, 305, 350]
        .map(
          (y, i) =>
            `<path d="M200 ${y} Q 240 ${y - 22} ${262 - i * 6} ${y - 42}"/><path d="M200 ${y} Q 160 ${y - 22} ${138 + i * 6} ${y - 42}"/>`
        )
        .join("");
      return svg(
        `<defs>${lin(g, [[0, "#f1f2e8"], [1, "#dbe1c9"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <circle cx="300" cy="120" r="30" fill="#fffcf7" fill-opacity=".7"/>
        <g transform="rotate(-16 200 270)"><g class="a-leaf">
          <path d="M200 430 V 486" stroke="#6f7a4a" stroke-width="4" stroke-linecap="round"/>
          <path d="M200 92 C 300 160 306 318 200 430 C 94 318 100 160 200 92 Z" fill="#6f7a4a"/>
          <g fill="none" stroke="#dbe1c9" stroke-width="2" stroke-linecap="round">
            <path d="M200 118 V 428" stroke-width="3"/>${veins}
          </g>
        </g></g>`,
        "art--leaf"
      );
    },

    sunrise() {
      const g = id("sr");
      const s = id("srs");
      const reflections = [
        [300, 150],
        [322, 118],
        [344, 88],
        [366, 62],
        [388, 40]
      ]
        .map(
          ([y, w], i) =>
            `<rect class="a-ref" x="${200 - w / 2}" y="${y}" width="${w}" height="5" rx="2.5" fill="#e3a58e" fill-opacity="${(0.85 - i * 0.13).toFixed(2)}"/>`
        )
        .join("");
      return svg(
        `<defs>${lin(g, [[0, "#f6cdbb"], [1, "#fbeee6"]])}${lin(s, [[0, "#eaa287"], [1, "#d4a55a"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <g class="a-sun"><circle cx="200" cy="275" r="88" fill="url(#${s})"/></g>
        <rect x="0" y="275" width="400" height="225" fill="#f1d9cb"/>
        <g class="a-refs">${reflections}</g>`,
        "art--sunrise"
      );
    },

    moon() {
      const g = id("mn");
      const m = id("mnm");
      const stars = [
        [60, 80, 1.6],
        [120, 150, 1.2],
        [330, 90, 1.8],
        [300, 214, 1.1],
        [80, 250, 1.3],
        [360, 290, 1.4],
        [170, 60, 1],
        [250, 300, 1.2],
        [40, 340, 1]
      ]
        .map(([x, y, r], i) => `<circle class="a-star" style="--d:${(i * 0.37).toFixed(2)}s" cx="${x}" cy="${y}" r="${r}"/>`)
        .join("");
      return svg(
        `<defs>${lin(g, [[0, "#2f2522"], [1, "#5a4036"]])}
          <mask id="${m}"><rect width="400" height="500" fill="#fff"/><circle cx="254" cy="150" r="46" fill="#000"/></mask></defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <g fill="#f8ebe4">${stars}</g>
        <g class="a-moon"><circle cx="232" cy="164" r="52" fill="#f3dcd2" mask="url(#${m})"/></g>
        <path d="M0 400 Q 110 360 210 392 T 400 380 V500 H0Z" fill="#4a3a33"/>
        <path d="M0 446 Q 150 416 270 446 T 400 436 V500 H0Z" fill="#2b2522"/>`,
        "art--moon"
      );
    },

    path() {
      const g = id("pt");
      const d = "M210 -10 C 330 70, 70 150, 200 240 S 340 380, 190 510";
      return svg(
        `<defs>${lin(g, [[0, "#f7efe4"], [1, "#ecd9c4"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <circle cx="96" cy="96" r="26" fill="#fffcf7" fill-opacity=".8"/>
        <path d="${d}" fill="none" stroke="#e7c3b2" stroke-width="36" stroke-linecap="round"/>
        <path class="a-trail" d="${d}" fill="none" stroke="#b65a4f" stroke-width="2.2" stroke-dasharray="2 12" stroke-linecap="round"/>
        <g fill="#9aa57a"><circle cx="70" cy="330" r="7"/><circle cx="86" cy="342" r="4"/><circle cx="330" cy="150" r="6"/><circle cx="344" cy="162" r="3.5"/><circle cx="318" cy="440" r="5"/></g>`,
        "art--path"
      );
    },

    arches() {
      const g = id("ar");
      const arch = (w, h, color, opacity) => {
        const x = 200 - w / 2;
        const r = w / 2;
        const top = 500 - h + r;
        return `<path d="M${x} 500 V ${top} A ${r} ${r} 0 0 1 ${x + w} ${top} V 500 Z" fill="${color}" fill-opacity="${opacity}"/>`;
      };
      return svg(
        `<defs>${lin(g, [[0, "#f8ebe4"], [1, "#efd3c6"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <g class="a-arches">${arch(340, 440, "#e9bfae", 0.55)}${arch(260, 360, "#dc9d88", 0.6)}${arch(180, 280, "#c4705f", 0.78)}${arch(100, 200, "#a34a40", 0.92)}</g>
        <g class="a-sun"><circle cx="200" cy="196" r="20" fill="#d4a55a"/></g>`,
        "art--arches"
      );
    },

    quadrants() {
      const g = id("qd");
      const pane = (x, y, fill, opacity, cls = "") =>
        `<rect class="${cls}" x="${x}" y="${y}" width="128" height="148" rx="20" fill="${fill}" fill-opacity="${opacity}"/>`;
      return svg(
        `<defs>${lin(g, [[0, "#f7efe4"], [1, "#ecd9c4"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        ${pane(62, 96, "#b65a4f", 0.92, "a-pane")}${pane(210, 96, "#d4a55a", 0.72)}${pane(62, 254, "#9aa57a", 0.82)}${pane(210, 254, "#fffcf7", 0.8)}`,
        "art--quadrants"
      );
    },

    bridge() {
      const g = id("br");
      return svg(
        `<defs>${lin(g, [[0, "#f3e6dc"], [1, "#e6cfc1"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <circle class="a-sun" cx="200" cy="170" r="46" fill="#d4a55a" fill-opacity=".8"/>
        <g fill="none" stroke-linecap="round" stroke-width="16">
          <path class="a-span a-span--l" d="M34 392 Q 104 228 182 300" stroke="#a34a40"/>
          <path class="a-span a-span--r" d="M366 392 Q 296 228 218 300" stroke="#6f7a4a"/>
        </g>
        <path d="M0 404 Q 100 384 200 404 T 400 400 V500 H0Z" fill="#c98c7b"/>
        <path d="M0 448 Q 120 428 240 448 T 400 442 V500 H0Z" fill="#a34a40"/>`,
        "art--bridge"
      );
    },

    network() {
      const g = id("nw");
      const nodes = [
        [200, 262, 18],
        [108, 156, 11],
        [302, 146, 13],
        [326, 310, 10],
        [254, 412, 12],
        [104, 382, 13],
        [62, 270, 8],
        [204, 86, 8]
      ];
      const links = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [1, 7],
        [2, 7],
        [3, 4],
        [5, 6],
        [4, 5]
      ]
        .map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}"/>`)
        .join("");
      const dots = nodes
        .map(
          ([x, y, r], i) =>
            `<circle class="a-node" style="transform-origin:${x}px ${y}px" cx="${x}" cy="${y}" r="${r}" fill="${i ? "#f8ebe4" : "#d4a55a"}"/>`
        )
        .join("");
      return svg(
        `<defs>${lin(g, [[0, "#ad5246"], [1, "#6e3029"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <g stroke="#f3dcd2" stroke-opacity=".5" stroke-width="1.6">${links}</g>
        ${dots}`,
        "art--network"
      );
    },

    pages() {
      const g = id("pg");
      const lines = (x) =>
        [0, 1, 2, 3, 4]
          .map(
            (i) =>
              `<rect x="${x}" y="${238 + i * 26}" width="${(i % 2 ? 74 : 96)}" height="4" rx="2" fill="#b65a4f" fill-opacity=".35"/>`
          )
          .join("");
      return svg(
        `<defs>${lin(g, [[0, "#f1f2e8"], [1, "#d7ddc4"]])}</defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        <circle cx="312" cy="112" r="34" fill="#fffcf7" fill-opacity=".75"/>
        <ellipse cx="200" cy="436" rx="150" ry="10" fill="#6f7a4a" fill-opacity=".18"/>
        <path d="M200 208 C 160 186 96 186 56 202 V 418 C 96 402 160 402 200 424 Z" fill="#fffcf7"/>
        <path d="M200 208 C 240 186 304 186 344 202 V 418 C 304 402 240 402 200 424 Z" fill="#f8ebe4"/>
        ${lines(84)}${lines(224)}
        <path class="a-page" d="M200 208 C 236 192 286 190 330 200 V 412 C 286 402 236 404 200 424 Z" fill="#fffcf7" fill-opacity=".88" stroke="#e4d8c8"/>
        <path d="M200 208 V 424" stroke="#c9b9a6" stroke-width="2"/>`,
        "art--pages"
      );
    },

    welcome() {
      const g = id("wl");
      const sky = id("wls");
      const clip = id("wlc");
      const archD = "M196 456 V 236 A 82 82 0 0 1 360 236 V 456 Z";
      const dots = [
        [52, 92],
        [96, 150],
        [70, 212],
        [140, 104]
      ]
        .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${1.4 + (i % 2) * 0.6}" fill="#f8ebe4" fill-opacity=".55"/>`)
        .join("");
      return svg(
        `<defs>${lin(g, [[0, "#ad5246"], [1, "#6e3029"]])}${lin(sky, [[0, "#f6d6c7"], [1, "#f8ebe4"]])}
          <clipPath id="${clip}"><path d="${archD}"/></clipPath></defs>
        <rect width="400" height="500" fill="url(#${g})"/>
        ${dots}
        <g clip-path="url(#${clip})">
          <rect x="190" y="140" width="180" height="330" fill="url(#${sky})"/>
          <g class="a-sun"><circle cx="278" cy="344" r="42" fill="#e9a184"/></g>
          <path d="M190 366 Q 240 336 282 356 T 370 348 V470 H190Z" fill="#e3c3ad"/>
          <path d="M190 404 Q 252 378 306 400 T 370 394 V470 H190Z" fill="#c98c7b"/>
          <path d="M190 440 Q 262 420 320 440 T 370 436 V470 H190Z" fill="#a34a40"/>
        </g>
        <path d="${archD.replace(" Z", "")}" fill="none" stroke="#f3dcd2" stroke-opacity=".55" stroke-width="1.5"/>
        <rect x="170" y="456" width="216" height="5" rx="2.5" fill="#f3dcd2" fill-opacity=".35"/>`,
        "art--welcome"
      );
    }
  };

  // Full-width landscape for the hero (1440 x 420, anchored to the bottom).
  function heroScene() {
    const sun = id("hs");
    return `<svg class="hero-scene" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs><radialGradient id="${sun}"><stop offset="0" stop-color="#f3bfa6"/><stop offset=".62" stop-color="#e9a084"/><stop offset="1" stop-color="#e9a084" stop-opacity="0"/></radialGradient></defs>
      <g class="hs-sun"><circle cx="720" cy="262" r="168" fill="url(#${sun})"/></g>
      <path class="hs-hill hs-hill--1" d="M0 262 C 180 204 360 232 540 252 S 900 212 1080 236 S 1340 262 1440 240 V420 H0Z" fill="#edd5c5"/>
      <path class="hs-hill hs-hill--2" d="M0 304 C 220 262 420 302 640 292 S 1000 252 1200 286 S 1400 302 1440 296 V420 H0Z" fill="#dfbaa6"/>
      <path class="hs-hill hs-hill--3" d="M0 352 C 240 322 480 362 720 346 S 1120 316 1440 346 V420 H0Z" fill="#c98e7c"/>
      <path class="hs-hill hs-hill--4" d="M0 392 C 300 370 560 402 860 389 S 1260 372 1440 386 V420 H0Z" fill="#b65a4f"/>
    </svg>`;
  }

  window.ART = {
    render(name) {
      const piece = pieces[name] || pieces.ripple;
      return piece();
    },
    heroScene,
    names: Object.keys(pieces)
  };
})();
