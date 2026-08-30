import {
    copyFile,
    readFile,
    writeFile,
    access,
    readdir,
    rm
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

    homepage: rootPackage.homepage,
    bugs: rootPackage.bugs,

    types: "index.d.ts",

    /*
     * A scoped package is published as restricted unless this says otherwise,
     * which fails on an account without a paid plan.
     */
    publishConfig: {
        access: "public"
    }
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

/*
 * The declaration maps point at the TypeScript sources, which the build no
 * longer includes, so they resolve to nothing. Their reference is stripped
 * from the declarations as well, or an editor follows it and finds a 404.
 */
const resources = new URL("../dist/resources/", import.meta.url);

async function removeDeclarationMaps(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
        const target = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);

        if (entry.isDirectory()) {
            await removeDeclarationMaps(target);
        } else if (entry.name.endsWith(".d.ts.map")) {
            await rm(target);
        } else if (entry.name.endsWith(".d.ts")) {
            const declaration = await readFile(target, "utf8");

            await writeFile(
                target,
                declaration.replace(/\n?\/\/# sourceMappingURL=.*\.d\.ts\.map\n?/g, "\n")
            );
        }
    }
}

await removeDeclarationMaps(resources);

console.log("Distribution package prepared in dist/");