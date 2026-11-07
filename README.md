# mishanyao.github.io

Static site built with Astro.

```
npm install
npm run dev
npm run build
npm test
```

## Writing and publishing articles

Articles are markdown files in `src/content/posts/`.

- Every article is a draft by default. Drafts show in `npm run dev` but are left out of the production site.
- To publish one, open the repo on GitHub, go to Actions, choose "Publish article", click "Run workflow" and enter the file name without `.md`. This sets `draft: false` (and, if ticked, the date to today) on `main`, then starts the normal build and deploy.
- Locally you can do the same with `npm run publish-article -- <slug>` (add `--keep-date` to keep the existing date), then commit and push.
