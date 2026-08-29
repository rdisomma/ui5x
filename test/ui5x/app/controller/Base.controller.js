sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";

    /*
     * Every demo drives its control through two-way binding against the shared
     * settings model, so a controller only answers the events of its control
     * and never reads or writes a property itself.
     */
    return Controller.extend("ui5x.test.app.controller.Base", {});
});
