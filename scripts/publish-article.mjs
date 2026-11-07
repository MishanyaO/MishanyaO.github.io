// Publishes a draft article: sets `draft: false` in its front matter and,
// unless --keep-date is passed, sets `date` to today (Melbourne time).
//
// Usage: node scripts/publish-article.mjs <slug> [--keep-date]
// POSTS_DIR can override the posts folder (used for testing).

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const postsDir = process.env.POSTS_DIR ?? 'src/content/posts';
const args = process.argv.slice(2);
const keepDate = args.includes('--keep-date');
const slug = args.find((a) => !a.startsWith('--'));

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function listDrafts() {
  return readdirSync(postsDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.slice(0, -3))
    .filter((s) => !/^draft:\s*false\s*$/m.test(frontMatter(readFileSync(join(postsDir, `${s}.md`), 'utf8')) ?? ''));
}

function frontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : null;
}

if (!slug) fail('Give the article file name without .md, for example: i-stopped-coding-this-year');
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) fail(`"${slug}" is not a valid article name (use lowercase letters, numbers and hyphens).`);

const file = join(postsDir, `${slug}.md`);
if (!existsSync(file)) {
  const drafts = listDrafts();
  fail(`No article at ${file}. Drafts available: ${drafts.length ? drafts.join(', ') : 'none'}.`);
}

const text = readFileSync(file, 'utf8');
const m = text.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)/);
if (!m) fail(`${file} has no front matter.`);

let fm = m[2];
if (/^draft:\s*false\s*$/m.test(fm)) fail(`${slug} is already published (draft: false).`);

if (/^draft:.*$/m.test(fm)) {
  fm = fm.replace(/^draft:.*$/m, 'draft: false');
} else {
  fm = `${fm}\ndraft: false`;
}

let dateNote = 'date unchanged';
if (!keepDate) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  if (/^date:.*$/m.test(fm)) fm = fm.replace(/^date:.*$/m, `date: ${today}`);
  else fm = `${fm}\ndate: ${today}`;
  dateNote = `date set to ${today}`;
}

writeFileSync(file, text.replace(m[0], `${m[1]}${fm}${m[3]}`));
console.log(`Published ${slug}: draft set to false, ${dateNote}.`);
