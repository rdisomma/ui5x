sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.ChatFeed", {
        settings: {
            loading: false,
            composerPosition: "Bottom",
            messageAlignment: "Bottom",
            ownMessageAppearance: "Bubble",
            incomingMessageAppearance: "Conversation",
            messageTimestampFormat: "Time",
            groupByDate: true,
            highlightOwnMessage: false,
            value: ""
        },

        data: {
            messages: [
                {
                    id: "1", sender: "Anna", ownMessage: false, editable: false, deletable: false,
                    text: "Hi! Could you check the latest order status?",
                    timestamp: "2026-08-26T16:42:00"
                },
                {
                    id: "2", sender: "You", ownMessage: true, editable: true, deletable: true,
                    text: "Of course. I'm checking it now.",
                    timestamp: "2026-08-26T16:45:00"
                },
                {
                    id: "3", sender: "Anna", ownMessage: false, editable: false, deletable: false,
                    text: "It was shipped this morning.",
                    timestamp: "2026-08-27T09:10:00"
                }
            ]
        },

        onSend: function (event) {
            var model = this.getView().getModel("data");
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

        onMessageDelete: function (event) {
            var context = event.getParameter("message").getBindingContext("data");
            var model = this.getView().getModel("data");
            var messages = model.getProperty("/messages");

            messages.splice(Number(context.getPath().split("/").pop()), 1);
            model.refresh(true);
        },

        onMessageEdit: function (event) {
            var context = event.getParameter("message").getBindingContext("data");

            this.getView().getModel("data").setProperty(
                context.getPath() + "/text",
                event.getParameter("value")
            );
        }
    });
});
