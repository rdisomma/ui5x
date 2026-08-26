import Accordion from "ui5x/layout/Accordion";
import AccordionItem from "ui5x/layout/AccordionItem";

QUnit.module("ui5x.layout.Accordion");

QUnit.test("Default properties", function (assert) {
    const accordion = new Accordion();

    assert.notOk(accordion.getMultipleExpansion(), "Single expansion is the default");
    assert.deepEqual(accordion.getExpandedKeys(), [], "No expanded keys are configured");
    assert.strictEqual(accordion.getWidth(), "", "Width is unset by default");
    assert.deepEqual(accordion.getItems(), [], "The default aggregation starts empty");

    accordion.destroy();
});

QUnit.test("Expanding an item collapses the previous item", function (assert) {
    const done = assert.async();
    const firstItem = new AccordionItem({ title: "First", expanded: true });
    const secondItem = new AccordionItem({ title: "Second" });
    const accordion = new Accordion({
        width: "20rem",
        items: [firstItem, secondItem]
    });
    let toggledItem: AccordionItem | undefined;
    let toggledExpanded: boolean | undefined;

    accordion.attachItemToggle((event) => {
        toggledItem = event.getParameter("item");
        toggledExpanded = event.getParameter("expanded");
    });

    accordion.addEventDelegate({
        onAfterRendering: () => {
            const secondHeader = document.getElementById(
                `${secondItem.getId()}-header`
            ) as HTMLButtonElement;

            assert.strictEqual(
                (accordion.getDomRef() as HTMLElement).style.width,
                "20rem",
                "Configured width is rendered"
            );

            secondHeader.dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            }));

            assert.notOk(firstItem.getExpanded(), "The previously expanded item is collapsed");
            assert.ok(secondItem.getExpanded(), "The selected item is expanded");
            assert.strictEqual(toggledItem, secondItem, "itemToggle reports the selected item");
            assert.strictEqual(toggledExpanded, true, "itemToggle reports the new state");

            accordion.destroy();
            done();
        }
    });

    accordion.placeAt("qunit-fixture");
});

QUnit.test("Multiple expansion keeps existing items open", function (assert) {
    const done = assert.async();
    const firstItem = new AccordionItem({ title: "First", expanded: true });
    const secondItem = new AccordionItem({ title: "Second" });
    const accordion = new Accordion({
        multipleExpansion: true,
        items: [firstItem, secondItem]
    });

    accordion.addEventDelegate({
        onAfterRendering: () => {
            const secondHeader = document.getElementById(
                `${secondItem.getId()}-header`
            ) as HTMLButtonElement;

            secondHeader.dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            }));

            assert.ok(firstItem.getExpanded(), "The first item remains expanded");
            assert.ok(secondItem.getExpanded(), "The second item is also expanded");

            accordion.destroy();
            done();
        }
    });

    accordion.placeAt("qunit-fixture");
});

QUnit.test("Single expansion preserves non-toggleable expanded items", function (assert) {
    const done = assert.async();
    const fixedItem = new AccordionItem({
        title: "Fixed",
        expanded: true,
        toggleable: false
    });
    const extraItem = new AccordionItem({ title: "Extra", expanded: true });
    const accordion = new Accordion({ items: [fixedItem, extraItem] });

    accordion.addEventDelegate({
        onAfterRendering: () => {
            assert.ok(fixedItem.getExpanded(), "The non-toggleable item remains expanded");
            assert.notOk(extraItem.getExpanded(), "The additional toggleable item is collapsed");

            accordion.destroy();
            done();
        }
    });

    accordion.placeAt("qunit-fixture");
});
