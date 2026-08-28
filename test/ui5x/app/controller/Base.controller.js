sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    /*
     * Every demo drives its control through two-way binding against a settings
     * model, so the toolbar in the view needs no wiring in the controller and
     * the XML shows the control configured the way an application would.
     */
    return Controller.extend("ui5x.test.app.controller.Base", {

        settings: {},

        data: null,

        onInit: function () {
            this.getView().setModel(
                new JSONModel(Object.assign({}, this.settings)),
                "settings"
            );

            if (this.data) {
                this.getView().setModel(
                    new JSONModel(JSON.parse(JSON.stringify(this.data))),
                    "data"
                );
            }
        }
    });
});
