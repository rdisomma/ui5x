import Column from "sap/m/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import Table from "sap/m/Table";
import Toolbar from "sap/m/Toolbar";
import Text from "sap/m/Text";

import LoadingResponsiveTable from "ui5x/loading/LoadingResponsiveTable";
import Skeleton from "ui5x/loading/Skeleton";
import SkeletonRowMode from "ui5x/loading/SkeletonRowMode";

QUnit.module("ui5x.loading.LoadingResponsiveTable");

QUnit.test("Default properties and row constraints", function (assert) {
    const loadingTable = new LoadingResponsiveTable();

    assert.notOk(loadingTable.getLoading(), "Loading is disabled by default");
    assert.strictEqual(loadingTable.getSkeletonRows(), 5, "Five skeleton rows are shown by default");
    assert.strictEqual(loadingTable.getMaxSkeletonRows(), 10, "Ten rows are allowed in Fill mode");
    assert.strictEqual(loadingTable.getSkeletonRowsMode(), SkeletonRowMode.Fixed, "Fixed row mode is the default");
    assert.notOk(loadingTable.getDynamicSkeletonWidths(), "Dynamic widths are disabled by default");
    assert.ok(loadingTable.getAnimated(), "Skeleton animation is enabled by default");
    assert.ok(loadingTable._getSkeletonTable(), "The internal responsive table is created");

    loadingTable.setSkeletonRows(0);
    assert.strictEqual(loadingTable.getSkeletonRows(), 1, "At least one skeleton row is retained");

    loadingTable.destroy();
});

QUnit.test("The resize handler exists when init registers it", function (assert) {
    const loadingTable = new LoadingResponsiveTable();
    const handler = (
        loadingTable as unknown as { _onWindowResize: unknown }
    )._onWindowResize;

    assert.strictEqual(
        typeof handler,
        "function",
        "A class-field initializer would run after init() and leave the listener undefined"
    );

    loadingTable.destroy();
});

QUnit.test("Skeleton cells follow the column alignment and the toolbars are mirrored", function (assert) {
    const done = assert.async();
    const sourceTable = new Table({
        headerToolbar: new Toolbar({ content: [new Text({ text: "Customers" })] }),
        columns: [
            new Column({ header: new Text({ text: "Name" }) }),
            new Column({ hAlign: "End", header: new Text({ text: "Revenue" }) })
        ]
    });
    const loadingTable = new LoadingResponsiveTable({
        loading: true,
        skeletonRows: 1,
        dynamicSkeletonWidths: true,
        table: sourceTable
    });

    loadingTable.addEventDelegate({
        onAfterRendering: () => {
            const skeletonTable = loadingTable._getSkeletonTable()!;
            const cells = (skeletonTable.getItems()[0] as ColumnListItem)
                .getCells();

            assert.ok(
                skeletonTable.getHeaderToolbar(),
                "The header toolbar is reproduced, so its height is reserved"
            );
            assert.notStrictEqual(
                skeletonTable.getHeaderToolbar(),
                sourceTable.getHeaderToolbar(),
                "It is a copy, the application keeps its own"
            );
            assert.notOk(
                cells[0].hasStyleClass("ui5xSkeletonAlignEnd"),
                "A column aligned at the start needs no alignment class"
            );
            assert.ok(
                cells[1].hasStyleClass("ui5xSkeletonAlignEnd"),
                "A column aligned at the end pushes its skeleton over"
            );

            loadingTable.destroy();
            done();
        }
    });

    loadingTable.placeAt("qunit-fixture");
});

QUnit.test("Skeleton table mirrors columns, rows and visual settings", function (assert) {
    const done = assert.async();
    const sourceTable = new Table({
        width: "30rem",
        fixedLayout: false,
        columns: [
            new Column({ header: new Text({ text: "Name" }) }),
            new Column({ header: new Text({ text: "Company" }) })
        ]
    });
    const loadingTable = new LoadingResponsiveTable({
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
                const items = skeletonTable.getItems() as ColumnListItem[];
                const firstRowCells = items[0].getCells() as Skeleton[];

                assert.strictEqual(root.getAttribute("aria-busy"), "true", "The wrapper reports its loading state");
                assert.strictEqual(skeletonTable.getColumns().length, 2, "Source columns are cloned");
                assert.strictEqual(items.length, 2, "The requested number of rows is created");
                assert.deepEqual(
                    firstRowCells.map((cell) => cell.getWidth()),
                    ["72%", "88%"],
                    "Dynamic widths are propagated to skeleton cells"
                );
                assert.ok(firstRowCells.every((cell) => !cell.getAnimated()), "Animation setting is propagated");
                assert.strictEqual(skeletonTable.getWidth(), "30rem", "Table width is mirrored");
                assert.notOk(sourceTable.getDomRef(), "The application table is not rendered while loading");

                loadingTable.setLoading(false);
                return;
            }

            assert.strictEqual(root.getAttribute("aria-busy"), "false", "The wrapper reports completion");
            assert.ok(sourceTable.getDomRef(), "The application table is rendered after loading");
            assert.notOk(root.contains(skeletonTable.getDomRef()), "The skeleton table is no longer rendered");

            loadingTable.destroy();
            done();
        }
    });

    loadingTable.placeAt("qunit-fixture");
});

QUnit.test("Fill mode observes the root element", function (assert) {
    const done = assert.async();
    const NativeResizeObserver = window.ResizeObserver;
    const observed: Element[] = [];

    window.ResizeObserver = class extends NativeResizeObserver {
        observe(target: Element, options?: ResizeObserverOptions): void {
            observed.push(target);
            super.observe(target, options);
        }
    };

    const loadingTable = new LoadingResponsiveTable({
        loading: true,
        skeletonRowsMode: SkeletonRowMode.Fill,
        table: new Table({
            columns: [new Column({ header: new Text({ text: "Name" }) })]
        })
    });

    loadingTable.addEventDelegate({
        onAfterRendering: function () {
            window.ResizeObserver = NativeResizeObserver;

            assert.ok(
                observed.includes(loadingTable.getDomRef() as Element),
                "Fill measures the DOM, so a control whose first render happens before it has a size needs the root watched to measure again"
            );

            loadingTable.destroy();
            done();
        }
    });

    loadingTable.placeAt("qunit-fixture");
});
