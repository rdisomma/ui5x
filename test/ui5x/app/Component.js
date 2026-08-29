sap.ui.define([
    "sap/ui/core/UIComponent",
    "./model/models"
], function (UIComponent, models) {
    "use strict";

    return UIComponent.extend("ui5x.test.app.Component", {
        metadata: {
            manifest: "json",
            interfaces: ["sap.ui.core.IAsyncContentCreation"]
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            /*
             * The settings dialog lives in the shell while the controls live in
             * the routed views, so the model has to be owned by the component
             * for both sides to write to the same instance.
             */
            this.setModel(models.createSettingsModel(), "settings");

            this.getRouter().initialize();
        }
    });
});
