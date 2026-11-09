# Mindfulness Handbook — web edition

A two-page website. Plain HTML, CSS and JavaScript, with no build step and no dependencies apart from Google Fonts.

| Page | What it covers |
|---|---|
| `index.html` | The handbook: Self, Emotions and Excellence, in 12 chapters with worksheets, guided practices and a private journal |
| `happiness-at-work.html` | The theories from the course slides, in four parts, with practice quizzes |

## Run it

Opening `index.html` directly works, but a local server is closer to real hosting:

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Hosting

The site is served by GitHub Pages from the `main` branch of [Anushk0/mindfulness-handbook](https://github.com/Anushk0/mindfulness-handbook):

**https://anushk0.github.io/mindfulness-handbook/**

- To update it, commit and push to `main`. GitHub rebuilds the site in about a minute.
- `.nojekyll` tells GitHub to serve the files exactly as they are.
- After changing any CSS or JS, raise the `?v=` number on those files in both HTML pages, so returning visitors get the new versions.
- While the site is a preview, both pages ask search engines not to list them (`<meta name="robots" content="noindex">`). Remove that line from both at launch.
- GitHub Pages sites are public, and so is this repository. Anyone can read what is added here. If the handbook must stay limited to study participants, launch it on a host that can restrict access.

## Edit the content

The handbook page's text lives in **`js/content.js`**: sections, chapters, practices, prompts, the note about the author, the disclaimer, the next-edition link and the footer. The Happiness at Work page's text lives in **`js/theories.js`**.

- Chapters are lists of blocks (text, lists, cards, callouts, practices, prompts and worksheets). The types are documented at the top of each file.
- Write `*word*` to get the italic serif accent and `**word**` for bold.
- Every `prompt` and worksheet needs its own `key`. Answers are saved under that key in the visitor's browser.
- A practice's step `seconds` add up to its length. Set `audio: "audio/your-file.mp3"` to play a recording during it.
- Set `feedback.url` to a link to switch on the next-edition button.
- Set `author.image` to a photo path to replace the illustration.

**About the text:** the topics and activities follow *Mindfulness Handbook: Embark Edition* and the *Happiness at Work* course slides, both by Dr Priyal Panchal. The wording was written for this site, and the practice scenarios are new. The one direct quotation is the short credited line in `quote`. That handbook's notice says it may not be reproduced, adapted or turned into other versions without the author's prior written permission, so keep that permission on record.

## Files

| File | What it does |
|---|---|
| `index.html` | Handbook page structure |
| `happiness-at-work.html` | Theories page structure |
| `css/styles.css` | Design tokens, components, motion, responsive and print styles |
| `js/content.js` | Handbook copy and data |
| `js/theories.js` | Happiness at Work copy and data |
| `js/art.js` | Generated SVG illustrations, used in place of photos |
| `js/app.js` | Rendering for both pages, header and menu, reader, worksheets, breathing guide, guided player, quizzes, journal |
| `DESIGN.md` | The design system, and where each idea came from |

## Built in

- The **Animations** switch in the footer follows the visitor's "reduce motion" setting until they choose otherwise.
- The journal and worksheets are stored only in the visitor's browser. Nothing is sent anywhere. Visitors can download their answers or print the journal.
- Printing either page gives a clean copy of everything on it. "Print worksheet" prints only the journal.
- Keyboard support: Esc closes the menu or player, arrow keys turn chapters, and focus stays inside the open player.
