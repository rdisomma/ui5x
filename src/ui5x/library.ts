/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "./loading/SkeletonType";
import Lib from "sap/ui/core/Lib";

const UI5X = Lib.init({
    name: "ui5x",
    version: "${version}",
    dependencies: [
        "sap.ui.core"
    ],
    types: [
        "ui5x.loading.SkeletonType",
    ],
    interfaces: [],
    controls: [
        "ui5x.loading.Skeleton",
        "ui5x.loading.LoadingContainer"
    ],
    elements: [],
    noLibraryCSS: false
});

export default UI5X;