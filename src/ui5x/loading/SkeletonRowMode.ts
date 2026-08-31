/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import DataType from "sap/ui/base/DataType";

enum SkeletonRowMode {
    Fill = "Fill",
    Fixed = "Fixed"
}

DataType.registerEnum(
    "ui5x.loading.SkeletonRowMode",
    SkeletonRowMode
);

export default SkeletonRowMode;