sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    const CHAT_MODEL_NAME = "chatFeed";
    const MESSAGES_PATH = "/messages";
    const TEXT_PATH = "/text";

    return Base.extend("ui5x.test.app.controller.ChatFeed", {

        onSend: function (oEvent) {
            const oModel = this.getView().getModel(CHAT_MODEL_NAME);
            const aMessages = oModel.getProperty(MESSAGES_PATH);

            /*
             * The sender and the two action flags are settings rather than
             * data, so the view reads them from there and a message carries
             * only what is its own.
             */
            aMessages.push({
                id: String(aMessages.length + 1),
                ownMessage: true,
                text: oEvent.getParameter("value"),
                timestamp: new Date().toISOString()
            });

            oModel.refresh(true);
        },

        onMessageEdit: function (oEvent) {
            const oContext = oEvent.getParameter("message").getBindingContext(CHAT_MODEL_NAME);

            this.getView().getModel(CHAT_MODEL_NAME).setProperty(
                oContext.getPath() + TEXT_PATH,
                oEvent.getParameter("value")
            );
        },

        onMessageDelete: function (oEvent) {
            const oContext = oEvent.getParameter("message").getBindingContext(CHAT_MODEL_NAME);
            const oModel = this.getView().getModel(CHAT_MODEL_NAME);
            const aMessages = oModel.getProperty(MESSAGES_PATH);
            const iIndex = Number(oContext.getPath().split("/").pop());

            aMessages.splice(iIndex, 1);
            oModel.refresh(true);
        }
    });
});
