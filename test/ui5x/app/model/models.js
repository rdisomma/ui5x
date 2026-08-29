sap.ui.define(["sap/ui/model/json/JSONModel"], function(JSONModel) {
    "use strict";

    return {
        /*
         * Kept apart from the model so the settings popover can put a section
         * back the way it started without rebuilding the whole model.
         */
        defaults() {
            return {
                accordion: {
                    multipleExpansion: false,
                    width: "100%"
                },
                chatFeed: {
                    value: "",
                    placeholder: "Write your message here",
                    enabled: true,
                    editable: true,
                    loading: false,
                    sendOnEnter: true,
                    sendButtonText: "",
                    sendButtonTooltip: "Send",
                    showSendButton: true,
                    sendButtonEnabled: true,
                    messageTimestampFormat: "Time",
                    groupByDate: true,
                    highlightOwnMessage: false,
                    ownMessageAppearance: "Bubble",
                    incomingMessageAppearance: "Conversation",
                    composerPosition: "Bottom",
                    messageAlignment: "Bottom",
                    chatMaxHeight: "100%",
                    width: "100%"
                },
                copyButton: {},
                loadingContainer: {},
                loadingResponsiveTable: {},
                loadingTable: {},
                segmentedInput: {},
                skeleton: {}
            };
        },

        createSettingsModel() {
            const oModel = new JSONModel(this.defaults());
            oModel.setDefaultBindingMode("TwoWay");

            return oModel;
        }
    };
});
