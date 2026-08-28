/*
 * Turns the demo application into a static site that needs no UI5 CLI server.
 *
 * During development the application is served by the local tooling: UI5 comes
 * from /resources and the library from the dependency graph. Neither exists on
 * a static host, so the bootstrap is pointed at the OpenUI5 CDN and the built
 * library is copied next to the application and reached through resource roots.
 */

import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const app = new URL("test/ui5x/app/", root);
const library = new URL("dist/resources/ui5x/", root);
const out = new URL("demo-site/", root);

const UI5_VERSION = "1.151.0";
const CDN = `https://sdk.openui5.org/${UI5_VERSION}/resources/sap-ui-core.js`;

/*
 * The application sits at the root of the site and the library beside it, so
 * both namespaces are remapped. The longer prefix wins, which keeps
 * ui5x/test/app/… pointing at the application rather than at the library.
 */
const RESOURCE_ROOTS = JSON.stringify({
    "ui5x": "./resources/ui5x/",
    "ui5x.test.app": "./"
});

await rm(out, { force: true, recursive: true });
await mkdir(out, { recursive: true });

await cp(app, out, {
    recursive: true,
    filter: (source) => !source.endsWith("index.html")
});

const index = (await readFile(new URL("index.html", app), "utf8"))
    .replace('src="/resources/sap-ui-core.js"', `src="${CDN}"`)
    .replace(
        /data-sap-ui-resource-roots='[^']*'/,
        `data-sap-ui-resource-roots='${RESOURCE_ROOTS}'`
    );

await writeFile(new URL("index.html", out), index);
await cp(library, new URL("resources/ui5x/", out), { recursive: true });

console.log("Demo site built in demo-site/");
