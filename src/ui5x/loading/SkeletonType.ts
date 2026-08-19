/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import DataType from "sap/ui/base/DataType";

enum SkeletonType {
    Line = "Line",
    Rectangle = "Rectangle",
    Circle = "Circle"
}

DataType.registerEnum(
    "ui5x.loading.SkeletonType",
    SkeletonType
);

export default SkeletonType;