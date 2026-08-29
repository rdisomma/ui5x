sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.ChatFeed", {

        onSend: function (oEvent) {
            const oModel = this.getView().getModel("chatFeed");
            const aMessages = oModel.getProperty("/messages");

            aMessages.push({
                id: String(aMessages.length + 1),
                ownMessage: true,
                text: oEvent.getParameter("value"),
                timestamp: new Date().toISOString()
            });

            oModel.refresh(true);
        },

        onMessageEdit: function (oEvent) {
            const oContext = oEvent.getParameter("message").getBindingContext("chatFeed");

            this.getView().getModel("chatFeed").setProperty(
                oContext.getPath() + "/text",
                oEvent.getParameter("value")
            );
        },

        onMessageDelete: function (oEvent) {
            const oContext = oEvent.getParameter("message").getBindingContext("chatFeed");
            const oModel = this.getView().getModel("chatFeed");
            const aMessages = oModel.getProperty("/messages");
            const iIndex = Number(oContext.getPath().split("/").pop());

            aMessages.splice(iIndex, 1);
            oModel.refresh(true);
        }
    });
});
