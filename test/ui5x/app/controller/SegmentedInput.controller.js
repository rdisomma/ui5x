sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.SegmentedInput", {
        settings: {
            digits: 6,
            inputType: "Numeric",
            size: "Medium",
            showSeparators: true,
            separatorInterval: 3,
            showClearIcon: true,
            enabled: true,
            editable: true
        }
    });
});
