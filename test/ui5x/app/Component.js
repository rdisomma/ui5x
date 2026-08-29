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

            const mModels = models.createModels();

            Object.keys(mModels).forEach(function (sName) {
                this.setModel(mModels[sName], sName);
            }, this);

            this.getRouter().initialize();
        }
    });
});
