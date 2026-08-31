import Text from "sap/m/Text";

import AccordionItem from "ui5x/layout/AccordionItem";

QUnit.module("ui5x.layout.AccordionItem");

QUnit.test("Default properties and aggregation", function (assert) {
    const item = new AccordionItem();
    const content = new Text({ text: "Details" });

    item.addContent(content);

    assert.strictEqual(item.getTitle(), "", "The title is empty by default");
    assert.notOk(item.getExpanded(), "The item is collapsed by default");
    assert.ok(item.getToggleable(), "The item is toggleable by default");
    assert.ok(item.getEnabled(), "The item is enabled by default");
    assert.deepEqual(item.getContent(), [content], "Content uses the default aggregation");

    item.destroy();
});

QUnit.test("Header click expands the item and fires toggle", function (assert) {
    const done = assert.async();
    const item = new AccordionItem({
        title: "General",
        content: [new Text({ text: "Content" })]
    });
    let renderingCount = 0;
    let toggledExpanded: boolean | undefined;

    item.attachToggle((event) => {
        toggledExpanded = event.getParameter("expanded");
    });

    item.addEventDelegate({
        onAfterRendering: () => {
            renderingCount += 1;

            const header = document.getElementById(
                `${item.getId()}-header`
            ) as HTMLButtonElement;
            const content = document.getElementById(
                `${item.getId()}-content`
            ) as HTMLElement;

            if (renderingCount === 1) {
                assert.strictEqual(header.getAttribute("aria-expanded"), "false", "Header starts collapsed");
                assert.strictEqual(content.getAttribute("aria-hidden"), "true", "Content starts hidden");

                header.dispatchEvent(new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true
                }));

                assert.strictEqual(toggledExpanded, true, "Toggle reports the expanded state");
                return;
            }

            assert.ok(item.getExpanded(), "The item is expanded");
            assert.strictEqual(header.getAttribute("aria-expanded"), "true", "Header exposes the expanded state");
            assert.strictEqual(content.getAttribute("aria-hidden"), "false", "Content is exposed to assistive technology");

            item.destroy();
            done();
        }
    });

    item.placeAt("qunit-fixture");
});

QUnit.test("Non-toggleable items render an inert header", function (assert) {
    const done = assert.async();
    const item = new AccordionItem({
        title: "Always open",
        expanded: true,
        toggleable: false
    });

    item.addEventDelegate({
        onAfterRendering: () => {
            const header = document.getElementById(
                `${item.getId()}-header`
            ) as HTMLButtonElement;

            assert.ok(header.disabled, "The header button is disabled");
            assert.notOk(
                item.getDomRef()?.querySelector(".ui5xAccordionItemIndicator"),
                "No toggle indicator is rendered"
            );
            assert.ok(item.getExpanded(), "The configured expanded state is preserved");

            item.destroy();
            done();
        }
    });

    item.placeAt("qunit-fixture");
});
