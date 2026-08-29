sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "../model/models"
], function (Controller, Fragment, UIComponent, JSONModel, MessageToast, models) {
    "use strict";

    return Controller.extend("ui5x.test.app.controller.App", {

        onInit: function () {
            this.getView().setModel(new JSONModel({ control: "" }), "app");
            this._popovers = {};

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
        },

        /*
         * Each control keeps its settings in a fragment named after its route,
         * so the shell needs no table mapping one to the other.
         */
        onOpenSettings: function (event) {
            var name = this.getView().getModel("app").getProperty("/control");

            if (!this._popovers[name]) {
                this._popovers[name] = Fragment.load({
                    id: this.getView().createId(name),
                    name: "ui5x.test.app.view.settings." + name,
                    controller: this
                }).then(function (popover) {
                    this.getView().addDependent(popover);
                    return popover;
                }.bind(this));
            }

            var button = event.getSource();

            this._popovers[name]
                .then(function (popover) {
                    popover.openBy(button);
                })
                .catch(function () {
                    delete this._popovers[name];
                    MessageToast.show(name + " has no settings yet");
                }.bind(this));
        },

        /*
         * Writing the whole section back at once lets every bound control
         * refresh from one change, so the reset needs no list of properties.
         */
        onResetSettings: function () {
            var name = this.getView().getModel("app").getProperty("/control");
            var section = name.charAt(0).toLowerCase() + name.slice(1);

            this.getOwnerComponent().getModel("settings").setProperty(
                "/" + section,
                models.defaults()[section]
            );
        }
    });
});
