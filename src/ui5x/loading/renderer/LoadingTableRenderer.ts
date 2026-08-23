/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";

import type LoadingTable from "../LoadingTable";

const LoadingTableRenderer = {
    apiVersion: 2,

    render(rm: RenderManager, control: LoadingTable): void {
        const loading = control.getLoading();

        rm.openStart("div", control);
        rm.class("ui5xLoadingTable");
        rm.attr("aria-busy", loading ? "true" : "false");
        rm.openEnd();

        if (loading) {
            const skeletonTable = control._getSkeletonTable();

            if (skeletonTable) {
                /*
                 * The internal table only reproduces the visual geometry of the application table
                 * while data is loading. It must therefore remain outside the accessibility tree
                 * and must not receive keyboard or pointer interaction.
                 */
                rm.openStart("div");
                rm.class("ui5xLoadingTableSkeleton");
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

export default LoadingTableRenderer;
