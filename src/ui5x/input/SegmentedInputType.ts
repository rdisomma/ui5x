/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import DataType from "sap/ui/base/DataType";

enum SegmentedInputType {
    Numeric = "Numeric",
    Alphanumeric = "Alphanumeric"
}

DataType.registerEnum(
    "ui5x.input.SegmentedInputType",
    SegmentedInputType
);

export default SegmentedInputType;
