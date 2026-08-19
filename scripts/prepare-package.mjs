import {
    copyFile,
    readFile,
    writeFile,
    access
} from "node:fs/promises";

const rootPackage = JSON.parse(
    await readFile(
        new URL("../package.json", import.meta.url),
        "utf8"
    )
);

const packageJson = {
    name: rootPackage.name,
    version: rootPackage.version,
    description: rootPackage.description,
    license: rootPackage.license,
    author: rootPackage.author,
    repository: rootPackage.repository,
    keywords: rootPackage.keywords,

    types: "index.d.ts"
};

for (const key of Object.keys(packageJson)) {
    if (packageJson[key] === undefined) {
        delete packageJson[key];
    }
}

await writeFile(
    new URL("../dist/package.json", import.meta.url),
    JSON.stringify(packageJson, null, 2) + "\n"
);

await copyFile(
    new URL("../ui5-package.yaml", import.meta.url),
    new URL("../dist/ui5.yaml", import.meta.url)
);

for (const file of ["README.md", "LICENSE"]) {
    const source = new URL(`../${file}`, import.meta.url);
    const destination = new URL(`../dist/${file}`, import.meta.url);

    try {
        await access(source);
        await copyFile(source, destination);
    } catch {}
}

console.log("Distribution package prepared in dist/");