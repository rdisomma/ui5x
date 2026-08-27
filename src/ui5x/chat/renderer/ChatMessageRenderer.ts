/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";

import type ChatMessage from "../ChatMessage";

const ChatMessageRenderer = {
    apiVersion: 2,

    render(rm: RenderManager, message: ChatMessage): void {
        const formattedTime = message._getFormattedTime();
        const hasActions = message.getEditable() || message.getDeletable();
        const isEditing = message._isEditing();

        rm.openStart("article", message);
        rm.class("ui5xChatMessage");
        rm.class(
            message.getOwnMessage()
                ? "ui5xChatMessageOwn"
                : "ui5xChatMessageIncoming"
        );

        if (hasActions) {
            rm.class("ui5xChatMessageHasActions");
        }

        if (isEditing) {
            rm.class("ui5xChatMessageEditing");
        }

        rm.openEnd();

        rm.openStart("div");
        rm.class("ui5xChatMessageBubble");
        rm.openEnd();

        if (message.getSender()) {
            rm.openStart("div");
            rm.class("ui5xChatMessageSender");
            rm.openEnd();
            rm.text(message.getSender());
            rm.close("div");
        }

        if (isEditing) {
            rm.renderControl(message._getEditor());
        } else {
            rm.openStart("div");
            rm.class("ui5xChatMessageText");
            rm.openEnd();
            rm.text(message.getText());
            rm.close("div");
        }

        if (formattedTime || hasActions) {
            rm.openStart("div");
            rm.class("ui5xChatMessageFooter");
            rm.openEnd();

            if (formattedTime) {
                rm.openStart("time");
                rm.class("ui5xChatMessageTime");

                const date = message._getTimestampDate();

                if (date) {
                    rm.attr("datetime", date.toISOString());
                }

                rm.openEnd();
                rm.text(formattedTime);
                rm.close("time");
            }

            if (hasActions) {
                rm.openStart("div");
                rm.class("ui5xChatMessageActions");
                rm.openEnd();

                if (isEditing) {
                    rm.renderControl(message._getCancelButton());
                    rm.renderControl(message._getSaveButton());
                } else {
                    if (message.getEditable()) {
                        rm.renderControl(message._getEditButton());
                    }

                    if (message.getDeletable()) {
                        rm.renderControl(message._getDeleteButton());
                    }
                }

                rm.close("div");
            }

            rm.close("div");
        }

        rm.close("div");
        rm.close("article");
    }
};

export default ChatMessageRenderer;
