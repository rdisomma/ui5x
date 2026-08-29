/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";
import type LoadingContainer from "../LoadingContainer";

/**
 * Renderer for the UI5X LoadingContainer control.
 *
 * @namespace
 */

const LoadingContainerRenderer = {
    apiVersion: 2,

    render(
        rm: RenderManager,
        control: LoadingContainer
    ): void {

        rm.openStart("div", control);
        rm.class("ui5xLoadingContainer");

        const width = control.getWidth();

        if (width) {
            rm.style("width", width);
        }

        rm.attr(
            "aria-busy",
            control.getLoading() ? "true" : "false"
        );

        rm.openEnd();

        if (control.getLoading()) {
            const placeholder = control._getEffectivePlaceholder();

            if (placeholder) {
                rm.renderControl(placeholder);
            }
        } else {
            const content = control.getContent();

            if (content) {
                rm.renderControl(content);
            }
        }

        rm.close("div");
    }
};

export default LoadingContainerRenderer;