sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, JSONModel) {
    "use strict";

    return Controller.extend("ui5x.test.app.controller.App", {

        onInit: function () {
            this.getView().setModel(new JSONModel({ control: "" }), "app");

            /*
             * The navigation follows the route rather than the click, so a
             * bookmarked control is selected in the list as well.
             */
            UIComponent.getRouterFor(this).attachRouteMatched(function (event) {
                this.getView().getModel("app").setProperty(
                    "/control",
                    event.getParameter("config").target
                );
            }, this);
        },

        onNavigate: function (event) {
            UIComponent.getRouterFor(this).navTo(
                event.getParameter("item").getKey()
            );
        }
    });
});
