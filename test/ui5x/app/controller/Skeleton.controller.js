sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.Skeleton", {
        settings: {
            type: "Line",
            lines: 3,
            width: "24rem",
            animated: true
        }
    });
});
