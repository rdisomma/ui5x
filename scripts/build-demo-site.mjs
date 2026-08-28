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

function landingPage(demos) {
    const links = demos
        .map((name) => {
            const control = name.replace(/\.html$/, "");

            return `      <li><a href="${name}">${control}</a></li>`;
        })
        .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>UI5X demos</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      margin: 0 auto; padding: 3rem 1.5rem; max-width: 42rem;
      font: 1rem/1.6 -apple-system, "Segoe UI", Roboto, sans-serif;
    }
    h1 { margin: 0 0 .25rem; font-size: 1.6rem; }
    p  { margin: 0 0 2rem; opacity: .75; }
    ul { list-style: none; margin: 0; padding: 0; }
    li + li { margin-top: .5rem; }
    a  { display: block; padding: .75rem 1rem; border: 1px solid; border-radius: .5rem;
         text-decoration: none; color: inherit; }
    a:hover { background: rgba(127,127,127,.12); }
    footer { margin-top: 2.5rem; font-size: .875rem; opacity: .75; }
  </style>
</head>
<body>
  <h1>UI5X demos</h1>
  <p>Every page carries a toolbar that changes the layout and the behaviour of its control,
     and a selector for each theme the library ships.</p>
  <ul>
${links}
  </ul>
  <footer><a href="https://github.com/rdisomma/ui5x">Source on GitHub</a></footer>
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
await writeFile(new URL("index.html", out), landingPage(demos));

console.log(`Demo site built in demo-site/ with ${demos.length} pages`);
