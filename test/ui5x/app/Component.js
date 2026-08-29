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
             * The settings popover lives in the shell while the controls live
             * in the routed views, so the models have to be owned by the
             * component for both sides to read the same instance.
             */
            const mModels = models.createModels();

            Object.keys(mModels).forEach(function (sName) {
                this.setModel(mModels[sName], sName);
            }, this);

            this.getRouter().initialize();
        }
    });
});
