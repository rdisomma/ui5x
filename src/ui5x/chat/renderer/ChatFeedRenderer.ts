/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";

import ChatFeedComposerPosition from "../ChatFeedComposerPosition";
import type ChatFeed from "../ChatFeed";

const ChatFeedRenderer = {
    apiVersion: 2,

    render(rm: RenderManager, feed: ChatFeed): void {
        rm.openStart("section", feed);
        rm.class("ui5xChatFeed");
        rm.class(`ui5xChatFeedOwnMessages${feed.getOwnMessageAppearance()}`);
        rm.class(`ui5xChatFeedIncomingMessages${feed.getIncomingMessageAppearance()}`);

        if (feed.getHighlightOwnMessage()) {
            rm.class("ui5xChatFeedHighlightOwnMessage");
        }

        rm.style("width", feed.getWidth());

        if (feed.getChatMaxHeight()) {
            rm.style("height", feed.getChatMaxHeight());
            rm.style("max-height", feed.getChatMaxHeight());
        }

        rm.openEnd();

        const composerAtBottom = feed.getComposerPosition()
            === ChatFeedComposerPosition.Bottom;

        if (!composerAtBottom) {
            this.renderComposer(rm, feed);
        }

        this.renderMessagesViewport(rm, feed);

        if (composerAtBottom) {
            this.renderComposer(rm, feed);
        }

        rm.close("section");
    },

    renderComposer(rm: RenderManager, feed: ChatFeed): void {
        rm.openStart("div", `${feed.getId()}-composer`);
        rm.class("ui5xChatFeedComposer");
        rm.class(`ui5xChatFeedComposer${feed.getComposerPosition()}`);
        rm.openEnd();

        const textArea = feed._getTextArea();

        if (textArea) {
            rm.openStart("div", `${feed.getId()}-text-area-wrapper`);
            rm.class("ui5xChatFeedTextAreaWrapper");
            rm.openEnd();
            rm.renderControl(textArea);
            rm.close("div");
        }

        if (feed.getShowSendButton()) {
            const sendButton = feed._getSendButton();

            if (sendButton) {
                rm.renderControl(sendButton);
            }
        }

        rm.close("div");
    },

    renderMessagesViewport(rm: RenderManager, feed: ChatFeed): void {
        rm.openStart("div", `${feed.getId()}-messages`);
        rm.class("ui5xChatFeedMessages");
        rm.class(`ui5xChatFeedMessages${feed.getMessageAlignment()}`);

        rm.attr("role", "log");
        rm.attr("aria-live", "polite");
        rm.attr("aria-relevant", "additions text");
        rm.attr("aria-busy", feed.getLoading() ? "true" : "false");
        rm.openEnd();

        rm.openStart("div", `${feed.getId()}-messages-content`);
        rm.class("ui5xChatFeedMessagesContent");
        rm.openEnd();

        if (feed.getLoading()) {
            this.renderLoadingPlaceholders(rm, feed);
        } else {
            this.renderMessages(rm, feed);
        }

        rm.close("div");
        rm.close("div");
    },

    renderLoadingPlaceholders(rm: RenderManager, feed: ChatFeed): void {
        feed._getLoadingPlaceholders().forEach((placeholder, index) => {
            rm.openStart("div", `${feed.getId()}-loading-message-${index}`);
            rm.class("ui5xChatMessage");
            rm.class("ui5xChatMessageLoading");
            rm.class(index === 1
                ? "ui5xChatMessageOwn"
                : "ui5xChatMessageIncoming");
            rm.attr("aria-hidden", "true");
            rm.openEnd();

            rm.openStart("div");
            rm.class("ui5xChatMessageBubble");
            rm.class("ui5xChatMessageLoadingBubble");
            rm.class(index === 1
                ? "ui5xChatMessageLoadingBubbleWide"
                : index === 2
                    ? "ui5xChatMessageLoadingBubbleShort"
                    : "ui5xChatMessageLoadingBubbleMedium");
            rm.openEnd();
            rm.renderControl(placeholder);
            rm.close("div");

            rm.close("div");
        });
    },

    renderMessages(rm: RenderManager, feed: ChatFeed): void {
        let previousDateKey = "";

        feed.getMessages().forEach((message) => {
            const dateKey = message._getDateKey();

            if (
                feed.getGroupByDate()
                && dateKey
                && dateKey !== previousDateKey
            ) {
                rm.openStart("div");
                rm.class("ui5xChatFeedDateSeparator");
                rm.attr("role", "separator");
                rm.openEnd();
                rm.text(message._getFormattedDate());
                rm.close("div");
            }

            rm.renderControl(message);
            previousDateKey = dateKey;
        });
    }
};

export default ChatFeedRenderer;
