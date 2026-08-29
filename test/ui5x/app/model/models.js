sap.ui.define([
    "sap/ui/model/BindingMode",
    "sap/ui/model/json/JSONModel"
], function (BindingMode, JSONModel) {
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
                    itemsEnabled: true,
                    itemsToggleable: true,
                    width: "35rem"
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
                    width: "100%",
                    ownSenderName: "You",
                    messagesEditable: true,
                    messagesDeletable: true
                },
                copyButton: {
                    value: "npm i @raffaeledisomma/ui5x",
                    text: "npm i @raffaeledisomma/ui5x",
                    icon: "sap-icon://copy",
                    type: "Default",
                    successText: "",
                    successIcon: "sap-icon://accept",
                    successType: "Accept",
                    iconFirst: true
                },
                loadingContainer: {
                    loading: true,
                    customPlaceholder: true,
                    skeletonType: "Line",
                    skeletonLines: 3,
                    animated: true,
                    width: "24rem"
                },
                loadingResponsiveTable: {
                    loading: true,
                    skeletonRows: 4,
                    maxSkeletonRows: 20,
                    skeletonRowsMode: "Fixed",
                    skeletonRowHeight: "3rem",
                    dynamicSkeletonWidths: true,
                    animated: true
                },
                loadingTable: {
                    loading: true,
                    skeletonRows: 5,
                    maxSkeletonRows: 20,
                    skeletonRowsMode: "Fixed",
                    dynamicSkeletonWidths: true,
                    animated: true
                },
                segmentedInput: {
                    digits: 6,
                    inputType: "Numeric",
                    size: "Medium",
                    showSeparators: true,
                    separatorInterval: 3,
                    value: "",
                    valueState: "None",
                    valueStateText: "Enter the code you received",
                    showClearIcon: true,
                    enabled: true,
                    editable: true,
                    required: false
                },
                skeleton: {
                    composite: true,
                    type: "Line",
                    lines: 3,
                    width: "24rem",
                    animated: true
                }
            };
        },

        /*
         * Every JSON model the application uses is created here rather than in
         * the manifest, so there is one place to look for what is loaded and
         * under which name.
         */
        setModels(oComponent) {
            const oSettings = new JSONModel(this.defaults());

            oSettings.setDefaultBindingMode(BindingMode.TwoWay);
            oComponent.setModel(oSettings, "settings");

            // the route the shell is showing, so the navigation follows it
            oComponent.setModel(new JSONModel({ control: "" }), "app");

            ["accordion", "chatFeed", "customers"].forEach(function (sName) {
                oComponent.setModel(
                    new JSONModel(
                        sap.ui.require.toUrl("ui5x/test/app/mock/" + sName + ".json")
                    ),
                    sName
                );
            });
        }
    };
});
