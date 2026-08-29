sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "../model/models"
], function (Controller, Fragment, UIComponent, JSONModel, MessageToast, models) {
    "use strict";

    const APP_MODEL_NAME = "app";
    const SETTINGS_MODEL_NAME = "settings";
    const SETTINGS_FRAGMENT_NAMESPACE = "ui5x.test.app.view.settings.";
    const CONTROL_PATH = "/control";

    return Controller.extend("ui5x.test.app.controller.App", {

        onInit: function () {
            this.getView().setModel(new JSONModel({ control: "" }), APP_MODEL_NAME);
            this._mPopovers = {};

            /*
             * The navigation follows the route rather than the click, so a
             * bookmarked control is selected in the list as well.
             */
            UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
                this.getView().getModel(APP_MODEL_NAME).setProperty(
                    CONTROL_PATH,
                    oEvent.getParameter("config").target
                );
            }, this);
        },

        onNavigate: function (oEvent) {
            UIComponent.getRouterFor(this).navTo(
                oEvent.getParameter("item").getKey()
            );
        },

        /*
         * Each control keeps its settings in a fragment named after its route,
         * so the shell needs no table mapping one to the other.
         */
        onOpenSettings: function (oEvent) {
            const sName = this.getView().getModel(APP_MODEL_NAME).getProperty(CONTROL_PATH);
            const oButton = oEvent.getSource();

            if (!this._mPopovers[sName]) {
                this._mPopovers[sName] = Fragment.load({
                    id: this.getView().createId(sName),
                    name: SETTINGS_FRAGMENT_NAMESPACE + sName,
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

        /*
         * Writing the whole section back at once lets every bound control
         * refresh from one change, so the reset needs no list of properties.
         */
        onResetSettings: function () {
            const sName = this.getView().getModel(APP_MODEL_NAME).getProperty(CONTROL_PATH);
            const sSection = sName.charAt(0).toLowerCase() + sName.slice(1);

            this.getOwnerComponent().getModel(SETTINGS_MODEL_NAME).setProperty(
                "/" + sSection,
                models.defaults()[sSection]
            );
        }
    });
});
