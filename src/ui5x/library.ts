/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "./loading/SkeletonType";
import "./loading/SkeletonRowMode";
import Lib from "sap/ui/core/Lib";

const UI5X = Lib.init({
    name: "ui5x",
    version: "${version}",
    dependencies: [
        "sap.ui.core",
        "sap.m",
        "sap.ui.table"
    ],
    types: [
        "ui5x.loading.SkeletonType",
        "ui5x.loading.SkeletonRowMode",
    ],
    interfaces: [],
    controls: [
        "ui5x.loading.Skeleton",
        "ui5x.loading.LoadingContainer",
        "ui5x.loading.LoadingResponsiveTable",
        "ui5x.loading.LoadingTable",
        "ui5x.layout.Accordion",
        "ui5x.layout.AccordionItem"
    ],
    elements: [],
    noLibraryCSS: false
});

export default UI5X;
