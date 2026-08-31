sap.ui.define([
    "sap/ui/model/BindingMode",
    "sap/ui/model/json/JSONModel"
], function (BindingMode, JSONModel) {
    "use strict";

    return {
        getDefaultSettings() {
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
                    showComposer: true,
                    showSendButton: true,
                    sendButtonEnabled: true,
                    messageTimestampFormat: "Time",
                    groupByDate: true,
                    highlightOwnMessage: false,
                    ownMessageAppearance: "Bubble",
                    incomingMessageAppearance: "Conversation",
                    composerPosition: "Bottom",
                    messageAlignment: "Bottom",
                    height: "100%",
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
                    errorIcon: "sap-icon://error",
                    errorText: "Not copied",
                    errorType: "Reject",
                    iconFirst: true
                },
                loadingContainer: {
                    loading: true,
                    customPlaceholder: true,
                    skeletonType: "Line",
                    skeletonLines: 3,
                    skeletonHeight: "3rem",
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
                    segmentCount: 6,
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
                    height: "3rem",
                    width: "24rem",
                    animated: true
                }
            };
        },

        createModels() {
            const oSettings = new JSONModel(this.getDefaultSettings());

            oSettings.setDefaultBindingMode(BindingMode.TwoWay);

            const mModels = {
                settings: oSettings,

                app: new JSONModel({ control: "" })
            };

            ["accordion", "chatFeed", "customers"].forEach(function (sName) {
                mModels[sName] = new JSONModel(
                    sap.ui.require.toUrl("ui5x/test/app/mock/" + sName + ".json")
                );
            });

            return mModels;
        }
    };
});
