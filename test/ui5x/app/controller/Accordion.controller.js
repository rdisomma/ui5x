sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.Accordion", {
        settings: {
            multipleExpansion: false,
            enabled: true
        }
    });
});
