sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("ui5x.test.app.controller.Base", {

        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        getRoute: function (sRouteName) {
            return this.getRouter().getRoute(sRouteName);
        },

        navTo: function (sRouteName, oParameters) {
            this.getRouter().navTo(sRouteName, oParameters);

            return this;
        },

        getModel: function (sModelName) {
            return this.getView().getModel(sModelName);
        },

        setModel: function (oModel, sModelName) {
            this.getView().setModel(oModel, sModelName);

            return this;
        }
    });
});
