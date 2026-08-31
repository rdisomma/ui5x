/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Button from "sap/m/Button";
import { ButtonType } from "sap/m/library";
import TextArea from "sap/m/TextArea";
import type { TextArea$LiveChangeEvent } from "sap/m/TextArea";
import type UI5Event from "sap/ui/base/Event";
import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import type { AccessibilityInfo } from "sap/ui/core/library";
import Lib from "sap/ui/core/Lib";
import type ChangeReason from "sap/ui/model/ChangeReason";

import Skeleton from "../loading/Skeleton";
import ChatFeedComposerPosition from "./ChatFeedComposerPosition";
import ChatFeedMessageAlignment from "./ChatFeedMessageAlignment";
import ChatMessage from "./ChatMessage";
import ChatMessageAppearance from "./ChatMessageAppearance";
import ChatMessageTimestampFormat from "./ChatMessageTimestampFormat";
import ChatFeedRenderer from "./renderer/ChatFeedRenderer";

/**
 * Displays a bindable conversation and a message composer.
 *
 * @extends sap.ui.core.Control
 * @public
 * @name ui5x.chat.ChatFeed
 */
export default class ChatFeed extends Control {

    constructor(idOrSettings?: string | $ChatFeedSettings);
    constructor(id?: string, settings?: $ChatFeedSettings);
    constructor(id?: string, settings?: $ChatFeedSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        defaultAggregation: "messages",

        properties: {
            /**
             * Defines the current composer value.
             */
            value: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines the composer placeholder.
             */
            placeholder: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines whether the composer and send action are enabled.
             */
            enabled: {
                type: "boolean",
                defaultValue: true
            },
            /**
             * Defines whether the composer value can be changed.
             */
            editable: {
                type: "boolean",
                defaultValue: true
            },
            /**
             * Defines whether skeleton message placeholders are displayed
             * instead of the messages aggregation.
             */
            loading: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines whether pressing Enter sends the current value.
             */
            sendOnEnter: {
                type: "boolean",
                defaultValue: true
            },
            /**
             * Defines the send button text.
             */
            sendButtonText: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines the send button icon.
             */
            sendButtonIcon: {
                type: "sap.ui.core.URI",
                defaultValue: "sap-icon://paper-plane"
            },
            /**
             * Defines the send button type.
             */
            sendButtonType: {
                type: "sap.m.ButtonType",
                defaultValue: ButtonType.Emphasized
            },
            /**
             * Defines the send button tooltip.
             */
            sendButtonTooltip: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines whether the send button is displayed.
             */
            /**
             * Defines whether the composer is rendered.
             *
             * A read-only feed, such as a transcript or an audit trail, sets
             * this to false. The send action and its events are then
             * unreachable, so {@link #event:send} is never fired.
             */
            showComposer: {
                type: "boolean",
                defaultValue: true
            },
            showSendButton: {
                type: "boolean",
                defaultValue: true
            },
            /**
             * Defines whether the send button can be pressed.
             */
            sendButtonEnabled: {
                type: "boolean",
                defaultValue: true
            },
            /**
             * Defines whether consecutive messages are grouped by date.
             */
            groupByDate: {
                type: "boolean",
                defaultValue: true
            },
            /**
             * Defines how the timestamp of each message is displayed.
             *
             * Time alone relies on the date being clear from elsewhere, so a
             * feed without date separators is usually better served by
             * {@link ui5x.chat.ChatMessageTimestampFormat.DateTime}.
             */
            messageTimestampFormat: {
                type: "ui5x.chat.ChatMessageTimestampFormat",
                defaultValue: ChatMessageTimestampFormat.Time
            },
            /**
             * Defines whether messages marked as ownMessage use a highlighted
             * bubble appearance.
             */
            highlightOwnMessage: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines the appearance of messages that belong to the current
             * user.
             */
            ownMessageAppearance: {
                type: "ui5x.chat.ChatMessageAppearance",
                defaultValue: ChatMessageAppearance.Bubble
            },
            /**
             * Defines the appearance of incoming messages.
             */
            incomingMessageAppearance: {
                type: "ui5x.chat.ChatMessageAppearance",
                defaultValue: ChatMessageAppearance.Conversation
            },
            /**
             * Defines whether the composer is rendered before or after the
             * messages viewport.
             */
            composerPosition: {
                type: "ui5x.chat.ChatFeedComposerPosition",
                defaultValue: ChatFeedComposerPosition.Top
            },
            /**
             * Defines whether a short conversation is aligned to the top or
             * bottom of the messages viewport.
             *
             * Message order is never reversed.
             */
            messageAlignment: {
                type: "ui5x.chat.ChatFeedMessageAlignment",
                defaultValue: ChatFeedMessageAlignment.Top
            },
            /**
             * Defines the reserved height and maximum height of the chat,
             * keeping the composer position stable as the conversation grows.
             *
             * Percentage values require a parent with an explicit height.
             * Set an empty value to let the chat follow its content.
             */
            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: "32rem"
            },
            /**
             * Defines the width of the feed.
             */
            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: "100%"
            }
        },

        aggregations: {
            /**
             * Messages displayed by the feed.
             */
            messages: {
                type: "ui5x.chat.ChatMessage",
                multiple: true,
                singularName: "message"
            },
            _textArea: {
                type: "sap.m.TextArea",
                multiple: false,
                visibility: "hidden"
            },
            _sendButton: {
                type: "sap.m.Button",
                multiple: false,
                visibility: "hidden"
            },
            _loadingPlaceholders: {
                type: "ui5x.loading.Skeleton",
                multiple: true,
                visibility: "hidden"
            }
        },

        events: {
            /**
             * Fired whenever the composer value changes through user input.
             */
            liveChange: {
                parameters: {
                    value: {
                        type: "string"
                    }
                }
            },
            /**
             * Fired when the current value is sent.
             *
             * The composer is cleared after the event is fired.
             */
            send: {
                parameters: {
                    value: {
                        type: "string"
                    }
                }
            },
            /**
             * Fired when an inline message edit is confirmed.
             */
            messageEdit: {
                parameters: {
                    message: {
                        type: "ui5x.chat.ChatMessage"
                    },
                    value: {
                        type: "string"
                    }
                }
            },
            /**
             * Fired when a message delete action is pressed.
             */
            messageDelete: {
                parameters: {
                    message: {
                        type: "ui5x.chat.ChatMessage"
                    }
                }
            }
        }
    };

    static renderer: typeof ChatFeedRenderer = ChatFeedRenderer;

    /*
     * UI5 invokes init() from the base Control constructor and applySettings()
     * right after it. These fields must therefore be type-only declarations:
     * emitted class-field initializers would run later and overwrite the state
     * created by init() or by an aggregation binding applied from settings.
     */
    private declare attachedMessages: Set<ChatMessage>;
    private declare wasBottomAligned: boolean;
    private declare shouldScrollToBottom: boolean;
    private declare forceScrollToBottom: boolean;
    private declare hasRenderedMessages: boolean;
    private declare renderedMessageCount: number;
    private declare renderedLastMessage: ChatMessage | null;
    private declare renderedLastMessageKey: string;
    private declare pendingEditKey: string;
    private declare pendingEditDraft: string;

    init(): void {
        this.attachedMessages = new Set<ChatMessage>();
        this.wasBottomAligned = false;
        this.shouldScrollToBottom = false;
        this.forceScrollToBottom = false;
        this.hasRenderedMessages = false;
        this.renderedMessageCount = 0;
        this.renderedLastMessage = null;
        this.renderedLastMessageKey = "";
        this.pendingEditKey = "";
        this.pendingEditDraft = "";

        const textArea = new TextArea(`${this.getId()}-text-area`, {
            width: "100%",
            rows: 1,
            growing: true,
            growingMaxLines: 5,
            liveChange: (event) => this.handleLiveChange(event)
        });

        textArea.addEventDelegate({
            onkeydown: (event: KeyboardEvent) => this.handleKeyDown(event)
        });

        this.setAggregation(
            "_textArea",
            textArea,
            true
        );

        this.setAggregation(
            "_sendButton",
            new Button(`${this.getId()}-send`, {
                press: () => this.submitValue(true)
            }).addStyleClass("ui5xChatFeedSendButton"),
            true
        );

        for (let index = 0; index < 3; index++) {
            this.addAggregation(
                "_loadingPlaceholders",
                new Skeleton(`${this.getId()}-loading-${index}`, {
                    width: "100%",
                    lines: 2
                }),
                true
            );
        }
    }

    onBeforeRendering(): void {
        const messagesDomRef = this.getDomRef("messages");
        const bottomAligned = this.getMessageAlignment()
            === ChatFeedMessageAlignment.Bottom;
        const hasNewMessage = this.hasNewMessage();

        this.shouldScrollToBottom = this.forceScrollToBottom
            || hasNewMessage
            || (bottomAligned && (
                !this.wasBottomAligned
                || !messagesDomRef
                || this.isScrolledToBottom(messagesDomRef)
            ));

        this.syncComposer();
        this.syncMessageHandlers();
        this.restorePendingEdit();
    }

    /**
     * Keeps an unconfirmed edit alive across an aggregation binding update.
     *
     * A model refresh destroys and recreates the bound ChatMessage controls, so
     * the draft is captured here and handed back to the message carrying the
     * same key.
     */
    updateMessages(changeReason: ChangeReason, eventInfo: {
        detailedReason?: string;
    }): void {
        const editingMessage = this.getMessages().find(
            (message) => message._isEditing() && message.getKey()
        );

        if (editingMessage) {
            this.pendingEditKey = editingMessage.getKey();
            this.pendingEditDraft = editingMessage._getDraft();
        }

        this.updateAggregation("messages", changeReason, eventInfo);
    }

    onAfterRendering(): void {
        const bottomAligned = this.getMessageAlignment()
            === ChatFeedMessageAlignment.Bottom;

        if (this.shouldScrollToBottom) {
            const messagesDomRef = this.getDomRef("messages");

            if (messagesDomRef) {
                messagesDomRef.scrollTop = messagesDomRef.scrollHeight;
            }
        }

        this.wasBottomAligned = bottomAligned;
        this.shouldScrollToBottom = false;
        this.forceScrollToBottom = false;
        this.rememberRenderedMessages();
    }

    exit(): void {
        this.detachMessageHandlers();
    }

    setValue(value: string): this {
        const normalizedValue = String(value ?? "");

        this.setProperty("value", normalizedValue, true);
        this._getTextArea()?.setValue(normalizedValue);
        this.syncSendButtonEnabled();

        return this;
    }

    getSendButtonTooltip(): string {
        if (this.isPropertyInitial("sendButtonTooltip")) {
            return Lib.getResourceBundleFor("sap.m")?.getText(
                "SEMANTIC_CONTROL_SEND_MESSAGE"
            ) ?? "";
        }

        return this.getProperty("sendButtonTooltip") as string;
    }

    getFocusDomRef(): Element | null {
        /*
         * The root section is not focusable, so focus() would be swallowed.
         * The composer is what a caller means by focusing the feed.
         */
        return this._getTextArea()?.getFocusDomRef() ?? null;
    }

    getIdForLabel(): string {
        const textArea = this._getTextArea();

        return textArea
            ? textArea.getIdForLabel()
            : this.getId();
    }

    getAccessibilityInfo(): AccessibilityInfo {
        return {
            role: "log",
            type: Lib.getResourceBundleFor("sap.m")?.getText(
                "ACC_CTR_TYPE_INPUT"
            ) ?? "Chat",
            description: this.getValue(),
            focusable: this.getEnabled(),
            enabled: this.getEnabled(),
            editable: this.getEnabled() && this.getEditable(),
            children: this.getMessages()
        };
    }

    _getTextArea(): TextArea | null {
        return this.getAggregation("_textArea") as TextArea | null;
    }

    _getSendButton(): Button | null {
        return this.getAggregation("_sendButton") as Button | null;
    }

    _getLoadingPlaceholders(): Skeleton[] {
        return this.getAggregation("_loadingPlaceholders") as Skeleton[];
    }

    private syncComposer(): void {
        const textArea = this._getTextArea();
        const button = this._getSendButton();

        textArea?.setValue(this.getValue());
        textArea?.setPlaceholder(this.getPlaceholder());
        textArea?.setEnabled(this.getEnabled());
        textArea?.setEditable(this.getEditable());

        button?.setText(this.getSendButtonText());
        button?.setIcon(this.getSendButtonIcon());
        button?.setType(this.getSendButtonType());
        button?.setTooltip(this.getSendButtonTooltip());

        this.syncSendButtonEnabled();
    }

    private isScrolledToBottom(element: Element): boolean {
        return element.scrollHeight - element.scrollTop - element.clientHeight
            <= 1;
    }

    private hasNewMessage(): boolean {
        if (!this.hasRenderedMessages || this.getLoading()) {
            return false;
        }

        const messages = this.getMessages();

        if (messages.length > this.renderedMessageCount) {
            return true;
        }

        if (messages.length === 0 || messages.length < this.renderedMessageCount) {
            return false;
        }

        const lastMessage = messages[messages.length - 1];
        const lastMessageKey = lastMessage.getKey();

        return lastMessageKey
            ? lastMessageKey !== this.renderedLastMessageKey
            : lastMessage !== this.renderedLastMessage;
    }

    private rememberRenderedMessages(): void {
        if (this.getLoading()) {
            return;
        }

        const messages = this.getMessages();
        const lastMessage = messages[messages.length - 1] ?? null;

        this.hasRenderedMessages = true;
        this.renderedMessageCount = messages.length;
        this.renderedLastMessage = lastMessage;
        this.renderedLastMessageKey = lastMessage?.getKey() ?? "";
    }

    private syncSendButtonEnabled(): void {
        this._getSendButton()?.setEnabled(
            this.getEnabled()
            && this.getEditable()
            && this.getSendButtonEnabled()
            && Boolean(this.getValue().trim())
        );
    }

    private handleLiveChange(event: TextArea$LiveChangeEvent): void {
        const value = String(event.getParameter("value") ?? "");

        this.setProperty("value", value, true);
        this.syncSendButtonEnabled();
        this.fireEvent("liveChange", { value });
    }

    private handleKeyDown(
        event: KeyboardEvent & { originalEvent?: KeyboardEvent }
    ): void {
        const keyboardEvent = event.originalEvent ?? event;

        if (
            keyboardEvent.key !== "Enter"
            || keyboardEvent.shiftKey
            || keyboardEvent.isComposing
            || !this.getSendOnEnter()
        ) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.submitValue(false);
    }

    private submitValue(requireEnabledButton: boolean): void {
        const value = this.getValue().trim();

        if (
            !value
            || !this.getEnabled()
            || !this.getEditable()
            || (requireEnabledButton && !this.getSendButtonEnabled())
        ) {
            return;
        }

        this.forceScrollToBottom = true;
        this.fireEvent("send", { value });
        this.setValue("");
    }

    private restorePendingEdit(): void {
        if (!this.pendingEditKey) {
            return;
        }

        const draft = this.pendingEditDraft;
        const message = this.getMessages().find(
            (candidate) => candidate.getKey() === this.pendingEditKey
        );

        this.pendingEditKey = "";
        this.pendingEditDraft = "";

        message?._restoreDraft(draft);
    }

    private syncMessageHandlers(): void {
        this.detachMessageHandlers();

        this.getMessages().forEach((message) => {
            message.attachEvent("edit", this.handleMessageEdit, this);
            message.attachEvent("delete", this.handleMessageDelete, this);
            this.attachedMessages.add(message);
        });
    }

    private detachMessageHandlers(): void {
        this.attachedMessages.forEach((message) => {
            message.detachEvent("edit", this.handleMessageEdit, this);
            message.detachEvent("delete", this.handleMessageDelete, this);
        });

        this.attachedMessages.clear();
    }

    private handleMessageEdit(event: UI5Event): void {
        const parameters = event.getParameters() as { value?: string };

        this.fireEvent("messageEdit", {
            message: event.getSource() as ChatMessage,
            value: String(parameters.value ?? "")
        });
    }

    private handleMessageDelete(event: UI5Event): void {
        this.fireEvent("messageDelete", {
            message: event.getSource() as ChatMessage
        });
    }
}
