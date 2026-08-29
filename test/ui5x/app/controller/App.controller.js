sap.ui.define([
    "./Base.controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "../model/models"
], function (Base, Fragment, MessageToast, models) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.App", {

        onInit: function () {
            this._mPopovers = {};

            this.getRouter().attachRouteMatched(function (oEvent) {
                this.getModel("app").setProperty(
                    "/control",
                    oEvent.getParameter("config").target
                );
            }, this);
        },

        onNavigate: function (oEvent) {
            this.navTo(oEvent.getParameter("item").getKey());
        },

        onOpenSettings: function (oEvent) {
            const sName = this.getModel("app").getProperty("/control");
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
            const sName = this.getModel("app").getProperty("/control");
            const sSection = sName.charAt(0).toLowerCase() + sName.slice(1);

            this.getModel("settings").setProperty(
                "/" + sSection,
                models.getDefaultSettings()[sSection]
            );
        }
    });
});
