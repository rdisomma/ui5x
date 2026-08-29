sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.ChatFeed", {

        onSend: function (event) {
            var model = this.getView().getModel("chatFeed");
            var messages = model.getProperty("/messages");

            messages.push({
                id: String(messages.length + 1),
                sender: "You",
                ownMessage: true,
                editable: true,
                deletable: true,
                text: event.getParameter("value"),
                timestamp: new Date().toISOString()
            });

            model.refresh(true);
        },

        onMessageEdit: function (event) {
            var context = event.getParameter("message").getBindingContext("chatFeed");

            this.getView().getModel("chatFeed").setProperty(
                context.getPath() + "/text",
                event.getParameter("value")
            );
        },

        onMessageDelete: function (event) {
            var context = event.getParameter("message").getBindingContext("chatFeed");
            var model = this.getView().getModel("chatFeed");
            var messages = model.getProperty("/messages");

            messages.splice(Number(context.getPath().split("/").pop()), 1);
            model.refresh(true);
        }
    });
});
