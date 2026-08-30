import Library from "sap/ui/core/Lib";

QUnit.module("ui5x");

/*
 * The libraries UI5X depends on are written twice: in the .library descriptor,
 * which the build turns into manifest.json, and in the Lib.init call, which is
 * what makes the UI5 runtime load them. Only the second one has an effect at
 * run time, so a change made to one and not the other ships two files that
 * contradict each other and is invisible until an application fails to load a
 * library the manifest promised.
 */
QUnit.test("The descriptor and Lib.init declare the same libraries", async function (assert) {
    const response = await fetch(
        sap.ui.require.toUrl("ui5x/manifest.json")
    );

    const manifest = await response.json() as {
        "sap.ui5": { dependencies: { libs: Record<string, unknown> } };
    };

    const declaredInDescriptor = Object
        .keys(manifest["sap.ui5"].dependencies.libs)
        .sort();

    const libraries = Library as unknown as {
        all(): Record<string, { dependencies?: string[] }>;
    };

    const declaredInInit = (libraries.all()["ui5x"].dependencies ?? [])
        .slice()
        .sort();

    assert.deepEqual(
        declaredInInit,
        declaredInDescriptor,
        "manifest.json and Lib.init agree"
    );
});
