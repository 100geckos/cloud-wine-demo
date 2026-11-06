import { readFile, access, readdir, stat } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';
import { parse } from 'parse5';

const root = resolve('dist');
const failures = [];
const titles = new Set();
let pages = 0,
  links = 0,
  total = 0;
const htmlFiles = [];
async function walk(dir) {
  for (const name of await readdir(dir)) {
    const file = join(dir, name);
    if ((await stat(file)).isDirectory()) await walk(file);
    else {
      total += (await stat(file)).size;
      if (extname(file) === '.html') htmlFiles.push(file);
    }
  }
}
await walk(root);
const attr = (n, name) => n.attrs?.find((a) => a.name === name)?.value;
const all = (n) => [n, ...(n.childNodes || []).flatMap(all)];
const text = (n) =>
  n.nodeName === '#text' ? n.value : (n.childNodes || []).map(text).join('');
const docs = new Map();
for (const file of htmlFiles)
  docs.set(file, all(parse(await readFile(file, 'utf8'))));
async function targetFile(path) {
  let file = resolve(root, `.${path}`);
  if (!file.startsWith(root)) throw new Error('Outside build');
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    await access(file);
    return file;
  } catch {
    if (!extname(file)) {
      await access(`${file}/index.html`);
      return `${file}/index.html`;
    }
    throw new Error('Missing');
  }
}
for (const [file, nodes] of docs) {
  pages++;
  const label = file.slice(root.length);
  const fail = (message) => failures.push(`${label}: ${message}`);
  const title = text(nodes.find((n) => n.tagName === 'title') || {});
  if (!title || titles.has(title)) fail('missing or duplicate title');
  titles.add(title);
  if (nodes.filter((n) => n.tagName === 'h1').length !== 1)
    fail('expected exactly one H1');
  if (
    !nodes.some(
      (n) =>
        n.tagName === 'meta' &&
        attr(n, 'name') === 'description' &&
        attr(n, 'content'),
    )
  )
    fail('missing description');
  if (
    !nodes.some(
      (n) =>
        n.tagName === 'meta' &&
        attr(n, 'name') === 'robots' &&
        attr(n, 'content') === 'noindex, nofollow',
    )
  )
    fail('demo is indexable');
  const ids = nodes.map((n) => attr(n, 'id')).filter(Boolean);
  if (new Set(ids).size !== ids.length) fail('duplicate IDs');
  if (!nodes.some((n) => n.tagName === 'main')) fail('missing main landmark');
  for (const n of nodes) {
    if (
      n.tagName === 'img' &&
      (!attr(n, 'alt') || !attr(n, 'width') || !attr(n, 'height'))
    )
      fail('image lacks alt or dimensions');
    if (n.tagName === 'script' && attr(n, 'type') === 'application/ld+json') {
      try {
        JSON.parse(text(n));
      } catch {
        fail('invalid JSON-LD');
      }
    }
    for (const key of ['href', 'src']) {
      const value = attr(n, key);
      if (!value || /^(https?:|mailto:|tel:|data:)/.test(value)) continue;
      links++;
      const url = new URL(
        value,
        `https://audit.invalid${label.replaceAll('\\', '/').replace(/index.html$/, '')}`,
      );
      try {
        const target = await targetFile(url.pathname);
        if (url.hash && target.endsWith('.html')) {
          const targetNodes = docs.get(target);
          if (
            targetNodes &&
            !targetNodes.some(
              (x) => attr(x, 'id') === decodeURIComponent(url.hash.slice(1)),
            )
          )
            fail(`missing anchor ${value}`);
        }
      } catch {
        fail(`missing local asset/link ${value}`);
      }
    }
  }
}
if (pages < 7)
  failures.push(
    'Expected at least 7 built HTML pages. Run npm run build first.',
  );
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `PASS: ${pages} HTML pages; ${links} local links/assets; metadata, noindex, headings, image dimensions, anchors, JSON-LD. Build total ${(total / 1024 / 1024).toFixed(2)} MiB.`,
  );
