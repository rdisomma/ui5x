/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import DataType from "sap/ui/base/DataType";

enum SegmentedInputSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}

DataType.registerEnum(
    "ui5x.input.SegmentedInputSize",
    SegmentedInputSize
);

export default SegmentedInputSize;
