sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "../model/models"
], function (Controller, Fragment, UIComponent, MessageToast, models) {
    "use strict";

    return Controller.extend("ui5x.test.app.controller.App", {

        onInit: function () {
            this._mPopovers = {};

            UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
                this.getView().getModel("app").setProperty(
                    "/control",
                    oEvent.getParameter("config").target
                );
            }, this);
        },

        onNavigate: function (oEvent) {
            UIComponent.getRouterFor(this).navTo(
                oEvent.getParameter("item").getKey()
            );
        },

        onOpenSettings: function (oEvent) {
            const sName = this.getView().getModel("app").getProperty("/control");
            const oButton = oEvent.getSource();

            if (!this._mPopovers[sName]) {
                this._mPopovers[sName] = Fragment.load({
                    id: this.getView().createId(sName),
                    name: "ui5x.test.app.view.settings." + sName,
                    controller: this
                }).then(function (oPopover) {
                    this.getView().addDependent(oPopover);

                    return oPopover;
                }.bind(this));
            }

            this._mPopovers[sName]
                .then(function (oPopover) {
                    oPopover.openBy(oButton);
                })
                .catch(function () {
                    delete this._mPopovers[sName];
                    MessageToast.show(sName + " has no settings yet");
                }.bind(this));
        },

        onResetSettings: function () {
            const sName = this.getView().getModel("app").getProperty("/control");
            const sSection = sName.charAt(0).toLowerCase() + sName.slice(1);

            this.getOwnerComponent().getModel("settings").setProperty(
                "/" + sSection,
                models.getDefaultSettings()[sSection]
            );
        }
    });
});
