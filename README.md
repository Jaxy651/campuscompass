# Campus Compass

A responsive student-facing campus guide prototype. Students can ask everyday questions and get practical steps with links to source material. The interface is a static site; its demo knowledge base and source links are easy to replace with verified information for your university.

## Run locally

No installation or build step is needed. Open `index.html` in a browser, or serve this folder with any static web server (for example, VS Code Live Server or `python -m http.server`).

## Customize the campus content

Open `src/app.js` and edit the `knowledgeBase` array. Each entry contains:

- `title`: the question shown above the response
- `keywords`: terms that help match common ways students ask
- `summary` and `steps`: the answer
- `sources`: official URLs students can verify
- `confidence`: a note about freshness or limitations

The current Northstar University content is demonstration data. Replace the `example.edu` links and confirm every policy, location, and service detail before presenting this as a real campus guide.

## GitHub Pages

1. Create a GitHub repository and add these files at its root.
2. In the repository, open **Settings → Pages**.
3. Select **Deploy from a branch**, choose your main branch and `/ (root)`, then save.
4. GitHub will publish the static site. Since all asset paths are relative, it also works from a repository subpath.

## Project structure

```text
campus-compass/
├── index.html
├── README.md
├── .gitignore
└── src/
    ├── app.js
    └── styles.css
```

## Next step for a production version

This prototype uses keyword matching in the browser and a small curated data set. For a multi-campus deployment, put verified documents into a campus-managed content store, retrieve relevant passages for each question, return their source links with the answer, and show a clear fallback when retrieved sources do not support an answer. Keep campus policy ownership and review dates visible to students.

