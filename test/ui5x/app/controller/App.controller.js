sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, Fragment, UIComponent, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("ui5x.test.app.controller.App", {

        onInit: function () {
            this.getView().setModel(new JSONModel({ control: "" }), "app");
            this._dialogs = {};

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
        onOpenSettings: function () {
            var name = this.getView().getModel("app").getProperty("/control");

            if (!this._dialogs[name]) {
                this._dialogs[name] = Fragment.load({
                    id: this.getView().createId(name),
                    name: "ui5x.test.app.view.settings." + name,
                    controller: this
                }).then(function (dialog) {
                    this.getView().addDependent(dialog);
                    return dialog;
                }.bind(this));
            }

            this._dialogs[name]
                .then(function (dialog) {
                    dialog.open();
                })
                .catch(function () {
                    delete this._dialogs[name];
                    MessageToast.show(name + " has no settings yet");
                }.bind(this));
        },

        onCloseSettings: function (event) {
            event.getSource().getParent().close();
        }
    });
});
