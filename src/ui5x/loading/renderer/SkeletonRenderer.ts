/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";
import Skeleton from "../Skeleton";
import SkeletonType from "../SkeletonType";

/**
 * Renderer for the UI5X Skeleton control.
 *
 * @namespace
 */

const SkeletonRenderer = {
    apiVersion: 2,

    render(rm: RenderManager, control: Skeleton): void {
        const width = control.getWidth();
        const type = control.getType();
        const animated = control.getAnimated();

        rm.openStart("div", control);
        rm.class("ui5xSkeleton");
        rm.class(`ui5xSkeleton${type}`);

        if (!animated)
            rm.class("ui5xSkeletonNoAnimation");

        if (width)
            rm.style("width", width);

        rm.attr("aria-hidden", "true");
        rm.openEnd();

        if (type === SkeletonType.Line) {
            this.renderLines(rm, control);
        } else {
            this.renderShape(rm, control);
        }

        rm.close("div");
    },

    renderShape(rm: RenderManager, control: Skeleton): void {
        rm.openStart(
            "span",
            `${control.getId()}-shape`
        );

        rm.class("ui5xSkeletonItem");
        rm.class("ui5xSkeletonShape");

        /*
         * The style goes on the shape rather than the root: the rectangle's
         * height lives in the shape's own rule, and a circle takes its height
         * from the aspect ratio of the root, which an explicit height would
         * fight.
         */
        const height = control.getHeight();

        if (height && control.getType() === SkeletonType.Rectangle) {
            rm.style("height", height);
        }

        rm.openEnd();
        rm.close("span");
    },

    renderLines(rm: RenderManager, control: Skeleton): void {
        const lines = control.getLines();

        for (let i = 0; i < lines; i++) {
            rm.openStart(
                "span",
                `${control.getId()}-line-${i}`
            );

            rm.class("ui5xSkeletonItem");
            rm.class("ui5xSkeletonLineItem");

            rm.openEnd();
            rm.close("span");
        }
    },
};

export default SkeletonRenderer;