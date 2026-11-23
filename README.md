# Ali Younus — Portfolio 2.0

A buildless, GitHub Pages compatible portfolio. No dependency installation is needed.

## Preview

Run `npm start` in this folder, then visit http://127.0.0.1:4173.
You can also open `index.html` directly. Google Fonts require an internet connection; system fonts are used when unavailable.

## Check

Run `npm run check` to validate JavaScript, project records, screenshot paths and navigation anchors.

## Files

- `index.html`: page structure and contact links.
- `styles.css`: responsive layouts, a dimensional laptop scene, motion and accessibility styles.
- `app.js`: code-to-product animation, project filters and accessible galleries.
- `projects.js`: the original published case studies, screenshots, engineering stories and additional work.
- `archive/portfolio-v1.html`: preserved original portfolio, including its existing unpublished project comment.

## Interactions

- **See what I build** moves into selected work.
- The laptop types illustrative code, shows a build transition, then reveals real screenshots from three featured projects.
- Laptop project selectors, the next-project button and **Replay the build** let visitors control the sequence. Click a finished screen to open its case study. The preview holds while a visitor hovers or focuses the screen.
- Filters switch between systems, AI and websites.
- Service Portal and Attendance & HR show desktop-and-phone compositions. Their case studies include explicit **Desktop / Mobile views** controls using the original mobile screenshots, and the Service Portal laptop preview includes a clickable phone.
- Project galleries support thumbnails, left/right arrow keys and Escape. Full-size images open from the main screenshot.
- **Pause motion** pauses animations for the session and shows a finished project. Reduced-motion preferences are respected; the sequence also stops offscreen, in background tabs and while a project dialog is open.
- Original section anchors, including `#more`, remain available.

## Deploy to the existing GitHub Pages site

Copy the contents of this folder into the existing `Myportfolio` repository's Pages publishing folder, retaining `.nojekyll`, and commit/push through the repository's normal workflow. No build step, root-relative asset paths or server configuration is required.

This local folder is an extracted archive, not a Git checkout. The rebuild does not publish to the live GitHub Pages URL automatically.

Project screenshots retain their demo/redacted-data labels. The Fotile case study was commented out in the original pending launch; it remains outside the published collection.
