import Skeleton from "ui5x/loading/Skeleton";
import SkeletonType from "ui5x/loading/SkeletonType";

QUnit.module("ui5x.loading.Skeleton");

QUnit.test("Default properties", function (assert) {
    const skeleton = new Skeleton();

    assert.strictEqual(
        skeleton.getType(),
        SkeletonType.Line,
        "Default type is Line"
    );

    assert.strictEqual(
        skeleton.getLines(),
        1,
        "Default number of lines is 1"
    );

    assert.strictEqual(
        skeleton.getAnimated(),
        true,
        "Animation is enabled by default"
    );

    skeleton.destroy();
});

QUnit.test("Lines are constrained between 1 and 3", function (assert) {
    const skeleton = new Skeleton({
        type: SkeletonType.Line,
        lines: 10
    });

    assert.strictEqual(
        skeleton.getLines(),
        3,
        "Values greater than 3 are normalized to 3"
    );

    skeleton.setLines(0);

    assert.strictEqual(
        skeleton.getLines(),
        1,
        "Values lower than 1 are normalized to 1"
    );

    skeleton.destroy();
});

QUnit.test("Line skeleton renders the requested number of lines", function (assert) {
    const done = assert.async();

    const target = document.createElement("div");
    target.id = "skeleton-test-area";

    document
        .getElementById("qunit-fixture")!
        .appendChild(target);

    const skeleton = new Skeleton({
        type: SkeletonType.Line,
        lines: 3,
        width: "20rem"
    });

    skeleton.addEventDelegate({
        onAfterRendering: () => {
            const domRef = skeleton.getDomRef() as HTMLElement;

            assert.ok(
                domRef.classList.contains("ui5xSkeleton"),
                "Root element has the Skeleton class"
            );

            assert.strictEqual(
                domRef.querySelectorAll(".ui5xSkeletonLineItem").length,
                3,
                "Three line elements are rendered"
            );

            skeleton.destroy();
            done();
        }
    });

    skeleton.placeAt("skeleton-test-area");
});
QUnit.test("The height applies to a rectangle and to nothing else", function (assert) {
    const done = assert.async();

    const target = document.createElement("div");
    target.id = "skeleton-height-test-area";

    document
        .getElementById("qunit-fixture")!
        .appendChild(target);

    const rectangle = new Skeleton({ type: SkeletonType.Rectangle, height: "5rem" });
    const circle = new Skeleton({ type: SkeletonType.Circle, height: "5rem" });

    circle.addEventDelegate({
        onAfterRendering: () => {
            assert.strictEqual(
                (rectangle.getDomRef("shape") as HTMLElement).style.height,
                "5rem",
                "The rectangle takes the configured height"
            );

            assert.strictEqual(
                (circle.getDomRef("shape") as HTMLElement).style.height,
                "",
                "The circle keeps the height its aspect ratio gives it"
            );

            rectangle.destroy();
            circle.destroy();
            done();
        }
    });

    rectangle.placeAt("skeleton-height-test-area");
    circle.placeAt("skeleton-height-test-area");
});
