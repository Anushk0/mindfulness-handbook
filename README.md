# Mindfulness Handbook — web edition (template)

A single-page website that turns a handbook into chapters, guided practices and a private journal. Plain HTML, CSS and JavaScript, with no build step and no dependencies apart from Google Fonts.

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
- While the site holds sample text, `index.html` asks search engines not to list it (`<meta name="robots" content="noindex">`). Remove that line at launch.
- GitHub Pages sites are public, and so is this repository. Anyone can read what is added here. If the handbook must stay limited to study participants, launch it on a host that can restrict access.

## Edit the content

Everything the page says lives in **`js/content.js`**: titles, chapters, practices, prompts, the author's note, the disclaimer, the feedback link and the footer.

- Chapters are lists of blocks (`lead`, `p`, `h3`, `list`, `callout`, `practice`, `prompt`, `quote`). The types are documented at the top of the file.
- Write `*word*` to get the italic serif accent and `**word**` for bold.
- Every `prompt` needs its own `key`. Notes are saved under that key in the visitor's browser.
- A practice's step `seconds` add up to its length. Set `audio: "audio/your-file.mp3"` to play a recording during it.
- Set `feedback.url` to your form link to switch on the feedback button.
- Set `author.image` to a photo path to replace the illustration.

**About the sample text:** all of the copy in `content.js` was written for this template. None of it comes from the original flipbook. That handbook's notice says it may not be reproduced, adapted or turned into other versions without the author's prior written permission. Only put its content here if you are the author or have that permission.

## Files

| File | What it does |
|---|---|
| `index.html` | Page structure |
| `css/styles.css` | Design tokens, components, motion, responsive and print styles |
| `js/content.js` | All copy and data |
| `js/art.js` | Generated SVG illustrations, used in place of photos |
| `js/app.js` | Rendering, header and menu, reader, breathing guide, guided player, journal |
| `DESIGN.md` | The design system, and where each idea came from |

## Built in

- The **Animations** switch in the footer follows the visitor's "reduce motion" setting until they choose otherwise.
- The journal is stored only in the visitor's browser. Nothing is sent anywhere. Visitors can download or print their notes.
- Printing the page gives a clean copy of every chapter. "Print worksheet" prints only the journal.
- Keyboard support: Esc closes the menu or player, arrow keys turn chapters, and focus stays inside the open player.
