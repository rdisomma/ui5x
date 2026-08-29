import HTML from "sap/ui/core/HTML";

import LoadingContainer from "ui5x/loading/LoadingContainer";
import Skeleton from "ui5x/loading/Skeleton";
import SkeletonType from "ui5x/loading/SkeletonType";

QUnit.module("ui5x.loading.LoadingContainer");

QUnit.test("Default loading state is false", function (assert) {
    const container = new LoadingContainer();

    assert.strictEqual(
        container.getLoading(),
        false,
        "Loading is false by default"
    );

    container.destroy();
});

QUnit.test("Switches from placeholder to content", function (assert) {
    const done = assert.async();

    const target = document.createElement("div");
    target.id = "loading-container-test-area";

    document
        .getElementById("qunit-fixture")!
        .appendChild(target);

    const placeholder = new Skeleton({
        type: SkeletonType.Line,
        lines: 2
    });

    const content = new HTML({
        content: '<span class="testActualContent">Loaded</span>'
    });

    const container = new LoadingContainer({
        loading: true,
        placeholder,
        content
    });

    let renderingCount = 0;

    container.addEventDelegate({
        onAfterRendering: () => {
            renderingCount++;

            const domRef = container.getDomRef() as HTMLElement;

            if (renderingCount === 1) {
                assert.ok(
                    domRef.querySelector(".ui5xSkeleton"),
                    "Placeholder is rendered while loading"
                );

                assert.notOk(
                    domRef.querySelector(".testActualContent"),
                    "Actual content is not rendered while loading"
                );

                container.setLoading(false);
                return;
            }

            assert.ok(
                domRef.querySelector(".testActualContent"),
                "Actual content is rendered after loading"
            );

            assert.notOk(
                domRef.querySelector(".ui5xSkeleton"),
                "Placeholder is no longer rendered"
            );

            container.destroy();
            done();
        }
    });

    container.placeAt("loading-container-test-area");
});

QUnit.test("Creates the default skeleton placeholder", function (assert) {
    const done = assert.async();

    const target = document.createElement("div");
    target.id = "default-placeholder-test-area";

    document
        .getElementById("qunit-fixture")!
        .appendChild(target);

    const container = new LoadingContainer({
        loading: true,
        skeletonLines: 3,
        content: new HTML({
            content: "<span>Loaded</span>"
        })
    });

    container.addEventDelegate({
        onAfterRendering: () => {
            const domRef = container.getDomRef() as HTMLElement;

            assert.ok(
                domRef.querySelector(".ui5xSkeleton"),
                "Default Skeleton is rendered"
            );

            assert.strictEqual(
                domRef.querySelectorAll(".ui5xSkeletonLineItem").length,
                3,
                "Default Skeleton uses skeletonLines"
            );

            container.destroy();
            done();
        }
    });

    container.placeAt("default-placeholder-test-area");
});
QUnit.test("The default placeholder follows animated and the container follows width", function (assert) {
    const done = assert.async();

    const target = document.createElement("div");
    target.id = "animated-width-test-area";

    document
        .getElementById("qunit-fixture")!
        .appendChild(target);

    const container = new LoadingContainer({
        loading: true,
        width: "20rem",
        animated: false,
        content: new HTML({
            content: "<span>Loaded</span>"
        })
    });

    container.addEventDelegate({
        onAfterRendering: () => {
            const domRef = container.getDomRef() as HTMLElement;

            assert.strictEqual(
                domRef.style.width,
                "20rem",
                "The container renders its width"
            );

            assert.ok(
                domRef.querySelector(".ui5xSkeletonNoAnimation"),
                "The default placeholder is not animated"
            );

            container.setAnimated(true);

            assert.ok(
                (container.getAggregation("_defaultPlaceholder") as unknown as { getAnimated(): boolean }).getAnimated(),
                "A later change reaches the default placeholder"
            );

            container.destroy();
            done();
        }
    });

    container.placeAt("animated-width-test-area");
});
