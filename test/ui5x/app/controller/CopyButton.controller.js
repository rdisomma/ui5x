sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.CopyButton", {
        settings: {
            type: "Default",
            successType: "Accept",
            successText: "Copied",
            iconFirst: true
        }
    });
});
