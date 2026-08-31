import Label from "sap/m/Label";
import Text from "sap/m/Text";
import Column from "sap/ui/table/Column";
import Table from "sap/ui/table/Table";

import LoadingTable from "ui5x/loading/LoadingTable";
import SkeletonRowMode from "ui5x/loading/SkeletonRowMode";

QUnit.module("ui5x.loading.LoadingTable");

QUnit.test("Default properties and row constraints", function (assert) {
    const loadingTable = new LoadingTable();

    assert.notOk(loadingTable.getLoading(), "Loading is disabled by default");
    assert.strictEqual(loadingTable.getSkeletonRows(), 5, "Five skeleton rows are shown by default");
    assert.strictEqual(loadingTable.getMaxSkeletonRows(), 20, "Twenty rows are allowed in Fill mode");
    assert.strictEqual(loadingTable.getSkeletonRowsMode(), SkeletonRowMode.Fixed, "Fixed row mode is the default");
    assert.notOk(loadingTable.getDynamicSkeletonWidths(), "Dynamic widths are disabled by default");
    assert.ok(loadingTable.getAnimated(), "Skeleton animation is enabled by default");
    assert.ok(loadingTable._getSkeletonTable(), "The internal grid table is created");

    loadingTable.setSkeletonRows(0);
    loadingTable.setMaxSkeletonRows(Number.POSITIVE_INFINITY);

    assert.strictEqual(loadingTable.getSkeletonRows(), 1, "At least one skeleton row is retained");
    assert.strictEqual(loadingTable.getMaxSkeletonRows(), 1, "Non-finite limits are normalized");

    loadingTable.destroy();
});

QUnit.test("Skeleton table mirrors grid geometry and remains presentation-only", function (assert) {
    const done = assert.async();
    const sourceTable = new Table({
        width: "32rem",
        rowHeight: 40,
        visibleRowCount: 2,
        columns: [
            new Column({
                width: "12rem",
                label: new Label({ text: "Customer" }),
                template: new Text({ text: "{name}" })
            }),
            new Column({
                width: "10rem",
                label: new Label({ text: "Company" }),
                template: new Text({ text: "{company}" })
            })
        ]
    });
    const loadingTable = new LoadingTable({
        loading: true,
        skeletonRows: 2,
        dynamicSkeletonWidths: true,
        animated: false,
        table: sourceTable
    });
    let renderingCount = 0;

    loadingTable.addEventDelegate({
        onAfterRendering: () => {
            renderingCount += 1;
            const root = loadingTable.getDomRef() as HTMLElement;
            const skeletonTable = loadingTable._getSkeletonTable()!;

            if (renderingCount === 1) {
                const rows = skeletonTable
                    .getModel("ui5xSkeleton")
                    ?.getProperty("/rows") as Array<{
                        widths: string[];
                    }>;
                const skeletonWrapper = root.querySelector(
                    ".ui5xLoadingTableSkeleton"
                ) as HTMLElement;

                assert.strictEqual(root.getAttribute("aria-busy"), "true", "The wrapper reports its loading state");
                assert.strictEqual(skeletonTable.getColumns().length, 2, "Source columns are cloned");
                assert.strictEqual(skeletonTable.getVisibleRowCount(), 2, "The requested row count is used");
                assert.deepEqual(
                    rows.map((row) => row.widths),
                    [["72%", "88%"], ["88%", "64%"]],
                    "Dynamic cell widths are stored for every row"
                );
                assert.strictEqual(skeletonTable.getWidth(), "32rem", "Table width is mirrored");
                assert.strictEqual(skeletonTable.getRowHeight(), 40, "Row height is mirrored");
                assert.strictEqual(skeletonWrapper.getAttribute("aria-hidden"), "true", "Skeleton content is hidden from assistive technology");
                assert.ok(skeletonWrapper.hasAttribute("inert"), "Skeleton content cannot receive interaction");
                assert.notOk(sourceTable.getDomRef(), "The application table is not rendered while loading");

                loadingTable.setLoading(false);
                return;
            }

            assert.strictEqual(root.getAttribute("aria-busy"), "false", "The wrapper reports completion");
            assert.ok(sourceTable.getDomRef(), "The application table is rendered after loading");
            assert.notOk(root.querySelector(".ui5xLoadingTableSkeleton"), "The skeleton wrapper is removed");

            loadingTable.destroy();
            done();
        }
    });

    loadingTable.placeAt("qunit-fixture");
});
