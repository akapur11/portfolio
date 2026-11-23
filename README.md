# Aryan Kapur — Personal Portfolio

A responsive, accessible portfolio website based on my updated 2026 resume. The project is **static and dependency-free**: no build step, no npm install, and no API keys.

## What's inside

- `index.html` — page content, sections, and SEO metadata
- `styles.css` — responsive layout, light/dark themes, and illustrations
- `script.js` — project filters, mobile menu, light/dark preference, copy email, and scroll progress
- `assets/Aryan_Kapur_Resume.pdf` — downloadable ATS-friendly resume
- `assets/favicon.svg` — browser icon

## Preview locally

Open `index.html` in a web browser, or run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## How I Update The Portfolio

- Edit your introduction in the `.hero-copy` section of `index.html`.
- Update project copy and tags in the `.project-card` elements.
- To add a project, copy a project card and add `data-category` keywords used by the filters (`web`, `java`, `ai`, `python`). Update project totals accordingly.
- Replace `assets/Aryan_Kapur_Resume.pdf` after updating your CV.
- Update theme colors in the `:root` CSS variables in `styles.css`.

## Notes

- Decorative project graphics are conceptual illustrations built with CSS; they are **not screenshots** of the actual applications.
- The WesternClubs project uses a known public source repository. No repository URLs were invented for other projects.
- The email copy button requires HTTPS or localhost for clipboard access; elsewhere it falls back to opening the email app.
- The content is based on the supplied updated resume and does not imply employment, inflated metrics, or unverified results.
