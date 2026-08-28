/*
 * Turns the demo pages into a static site that needs no UI5 CLI server.
 *
 * The pages are served by the local tooling during development: UI5 comes from
 * /resources and the library from the dependency graph. Neither exists on a
 * static host, so the bootstrap is pointed at the OpenUI5 CDN and the library
 * is copied next to the pages and reached through resource roots.
 */

import {
    cp,
    mkdir,
    readFile,
    readdir,
    rm,
    writeFile
} from "node:fs/promises";

const root = new URL("../", import.meta.url);
const pages = new URL("test/ui5x/", root);
const library = new URL("dist/resources/ui5x/", root);
const out = new URL("demo-site/", root);

const UI5_VERSION = "1.151.0";
const CDN = `https://sdk.openui5.org/${UI5_VERSION}/resources/sap-ui-core.js`;

/*
 * ui5x resolves to the copied library, and ui5x.test to the site root so the
 * pages keep requiring ui5x/test/demo/DemoToolbar unchanged.
 */
const RESOURCE_ROOTS = JSON.stringify({
    "ui5x": "./resources/ui5x/",
    "ui5x.test": "./"
});

function rewrite(html) {
    return html
        .replace('src="/resources/sap-ui-core.js"', `src="${CDN}"`)
        .replace(
            'data-sap-ui-compat-version="edge">',
            `data-sap-ui-compat-version="edge"\n        data-sap-ui-resource-roots='${RESOURCE_ROOTS}'>`
        )
        .replace(/"ui5x\/test": "\/test-resources\/ui5x"/, '"ui5x/test": "."');
}

function shellPage(demos) {
    const items = demos
        .map((name) => {
            const control = name.replace(/\.html$/, "");

            return `      <a href="#${control}" data-page="${name}">${control}</a>`;
        })
        .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>UI5X demos</title>
  <style>
    :root {
      color-scheme: light dark;
      --line: rgba(127, 127, 127, .28);
      --nav: 15rem;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; height: 100vh; display: grid; grid-template-columns: var(--nav) 1fr;
      font: .9375rem/1.5 -apple-system, "Segoe UI", Roboto, sans-serif;
    }
    nav {
      display: flex; flex-direction: column; min-height: 0;
      border-inline-end: 1px solid var(--line);
    }
    header { padding: 1.25rem 1.25rem 1rem; border-bottom: 1px solid var(--line); }
    header b { display: block; font-size: 1.0625rem; }
    header span { font-size: .8125rem; opacity: .7; }
    .links { overflow-y: auto; padding: .5rem; flex: 1; }
    nav a {
      display: block; padding: .5rem .75rem; border-radius: .375rem;
      color: inherit; text-decoration: none;
    }
    nav a:hover { background: rgba(127, 127, 127, .14); }
    nav a[aria-current="page"] { background: rgba(127, 127, 127, .22); font-weight: 600; }
    footer { padding: 1rem 1.25rem; border-top: 1px solid var(--line); font-size: .8125rem; }
    footer a { color: inherit; }
    iframe { border: 0; width: 100%; height: 100vh; }
    @media (max-width: 48rem) {
      body { grid-template-columns: 1fr; grid-template-rows: auto 1fr; height: auto; }
      nav { border-inline-end: 0; border-bottom: 1px solid var(--line); }
      .links { display: flex; flex-wrap: wrap; gap: .25rem; overflow: visible; }
      iframe { height: 75vh; }
    }
  </style>
</head>
<body>
  <nav>
    <header><b>UI5X</b><span>Advanced controls for OpenUI5</span></header>
    <div class="links">
${items}
    </div>
    <footer><a href="https://github.com/rdisomma/ui5x">Source on GitHub</a></footer>
  </nav>

  <iframe id="demo" title="Demo"></iframe>

  <script>
    var links = [].slice.call(document.querySelectorAll(".links a"));
    var frame = document.getElementById("demo");

    function show() {
      var wanted = location.hash.slice(1);
      var link = links.filter(function (a) {
        return a.getAttribute("href") === "#" + wanted;
      })[0] || links[0];

      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      link.setAttribute("aria-current", "page");

      var page = link.dataset.page;

      if (!frame.src || frame.src.indexOf(page) === -1) {
        frame.src = page;
      }
    }

    addEventListener("hashchange", show);
    show();
  </script>
</body>
</html>
`;
}

await rm(out, { force: true, recursive: true });
await mkdir(out, { recursive: true });

const demos = (await readdir(pages))
    .filter((name) => name.endsWith(".html"))
    .sort();

for (const name of demos) {
    const html = await readFile(new URL(name, pages), "utf8");

    await writeFile(new URL(name, out), rewrite(html));
}

await cp(new URL("demo/", pages), new URL("demo/", out), { recursive: true });
await cp(library, new URL("resources/ui5x/", out), { recursive: true });
await writeFile(new URL("index.html", out), shellPage(demos));

console.log(`Demo site built in demo-site/ with ${demos.length} pages`);
