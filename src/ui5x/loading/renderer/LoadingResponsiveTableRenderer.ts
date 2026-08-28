/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";
import type LoadingResponsiveTable from "../LoadingResponsiveTable";

const LoadingResponsiveTableRenderer = {
    apiVersion: 2,

    render(
        rm: RenderManager,
        control: LoadingResponsiveTable
    ): void {
        rm.openStart("div", control);
        rm.class("ui5xLoadingResponsiveTable");
        rm.attr(
            "aria-busy",
            control.getLoading() ? "true" : "false"
        );
        rm.openEnd();

        if (control.getLoading()) {
            const skeletonTable = control._getSkeletonTable();

            if (skeletonTable) {
                /*
                 * The internal table only reproduces the visual geometry of the
                 * application table while data is loading. It must therefore remain
                 * outside the accessibility tree and must not receive keyboard or
                 * pointer interaction.
                 */
                rm.openStart("div");
                rm.class("ui5xLoadingResponsiveTableSkeleton");

                const rowHeight = control.getSkeletonRowHeight();

                if (rowHeight) {
                    rm.style("--ui5xSkeletonRowHeight", rowHeight);
                }

                rm.attr("aria-hidden", "true");
                rm.attr("inert", "");
                rm.openEnd();
                rm.renderControl(skeletonTable);
                rm.close("div");
            }
        } else {
            const table = control.getTable();

            if (table) {
                rm.renderControl(table);
            }
        }

        rm.close("div");
    }
};

export default LoadingResponsiveTableRenderer;