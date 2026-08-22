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

        const table = control.getLoading()
            ? control._getSkeletonTable()
            : control.getTable();

        if (table) {
            rm.renderControl(table);
        }

        rm.close("div");
    }
};

export default LoadingResponsiveTableRenderer;