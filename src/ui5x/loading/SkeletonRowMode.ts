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