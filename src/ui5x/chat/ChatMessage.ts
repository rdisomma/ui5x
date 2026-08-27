/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Button from "sap/m/Button";
import { ButtonType } from "sap/m/library";
import TextArea from "sap/m/TextArea";
import type { TextArea$LiveChangeEvent } from "sap/m/TextArea";
import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import DateFormat from "sap/ui/core/format/DateFormat";
import Lib from "sap/ui/core/Lib";

import ChatMessageRenderer from "./renderer/ChatMessageRenderer";

/**
 * Displays a message inside a ChatFeed.
 *
 * @extends sap.ui.core.Control
 * @public
 * @name ui5x.chat.ChatMessage
 */
export default class ChatMessage extends Control {

    constructor(idOrSettings?: string | $ChatMessageSettings);
    constructor(id?: string, settings?: $ChatMessageSettings);
    constructor(id?: string, settings?: $ChatMessageSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        properties: {
            /**
             * Defines a stable application key for the message.
             */
            key: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines the message text.
             */
            text: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines the displayed sender name.
             */
            sender: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines whether this message belongs to the current user.
             *
             * Own messages are aligned to the end of the feed.
             */
            ownMessage: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines whether an edit action is displayed.
             */
            editable: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines whether a delete action is displayed.
             */
            deletable: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines the message date and time.
             *
             * Date instances, ISO strings and numeric timestamps are
             * supported.
             */
            timestamp: {
                type: "any",
                defaultValue: null
            }
        },

        aggregations: {
            _editButton: {
                type: "sap.m.Button",
                multiple: false,
                visibility: "hidden"
            },
            _deleteButton: {
                type: "sap.m.Button",
                multiple: false,
                visibility: "hidden"
            },
            _editor: {
                type: "sap.m.TextArea",
                multiple: false,
                visibility: "hidden"
            },
            _saveButton: {
                type: "sap.m.Button",
                multiple: false,
                visibility: "hidden"
            },
            _cancelButton: {
                type: "sap.m.Button",
                multiple: false,
                visibility: "hidden"
            }
        },

        events: {
            /**
             * Fired when an inline edit is confirmed.
             */
            editPress: {
                parameters: {
                    value: {
                        type: "string"
                    }
                }
            },
            /**
             * Fired when the delete action is pressed.
             */
            deletePress: {}
        }
    };

    static renderer: typeof ChatMessageRenderer = ChatMessageRenderer;

    private editing = false;
    private draftText = "";

    init(): void {
        const resourceBundle = Lib.getResourceBundleFor("sap.m");
        const editText = resourceBundle?.getText("LIST_ITEM_EDIT") ?? "";
        const deleteText = resourceBundle?.getText("LIST_ITEM_DELETE") ?? "";
        const saveText = resourceBundle?.getText("SEMANTIC_CONTROL_SAVE") ?? "";
        const cancelText = resourceBundle?.getText("SEMANTIC_CONTROL_CANCEL") ?? "";

        this.setAggregation(
            "_editButton",
            new Button(`${this.getId()}-edit`, {
                icon: "sap-icon://edit",
                tooltip: editText,
                type: ButtonType.Transparent,
                press: () => this.beginEdit()
            }).addStyleClass("ui5xChatMessageAction"),
            true
        );

        this.setAggregation(
            "_deleteButton",
            new Button(`${this.getId()}-delete`, {
                icon: "sap-icon://delete",
                tooltip: deleteText,
                type: ButtonType.Reject,
                press: () => this.fireEvent("deletePress")
            }).addStyleClass("ui5xChatMessageAction"),
            true
        );

        this.setAggregation(
            "_editor",
            new TextArea(`${this.getId()}-editor`, {
                width: "100%",
                rows: 1,
                growing: true,
                growingMaxLines: 5,
                tooltip: editText,
                liveChange: (event) => this.handleEditorLiveChange(event)
            }).addStyleClass("ui5xChatMessageEditor"),
            true
        );

        this.setAggregation(
            "_saveButton",
            new Button(`${this.getId()}-save`, {
                icon: "sap-icon://accept",
                tooltip: saveText,
                type: ButtonType.Emphasized,
                press: () => this.confirmEdit()
            }).addStyleClass("ui5xChatMessageAction"),
            true
        );

        this.setAggregation(
            "_cancelButton",
            new Button(`${this.getId()}-cancel`, {
                icon: "sap-icon://decline",
                tooltip: cancelText,
                type: ButtonType.Transparent,
                press: () => this.cancelEdit()
            }).addStyleClass("ui5xChatMessageAction"),
            true
        );
    }

    onAfterRendering(): void {
        if (!this._isEditing()) {
            return;
        }

        const editor = this._getEditor();

        editor.focus();

        const inner = editor.getDomRef("inner") as HTMLTextAreaElement | null;
        inner?.setSelectionRange(inner.value.length, inner.value.length);
    }

    _getEditButton(): Button {
        return this.getAggregation("_editButton") as Button;
    }

    _getDeleteButton(): Button {
        return this.getAggregation("_deleteButton") as Button;
    }

    _getEditor(): TextArea {
        return this.getAggregation("_editor") as TextArea;
    }

    _getSaveButton(): Button {
        return this.getAggregation("_saveButton") as Button;
    }

    _getCancelButton(): Button {
        return this.getAggregation("_cancelButton") as Button;
    }

    _isEditing(): boolean {
        return this.editing && this.getEditable();
    }

    private beginEdit(): void {
        if (!this.getEditable()) {
            return;
        }

        this.editing = true;
        this.draftText = this.getText();
        this._getEditor().setValue(this.draftText);
        this.updateSaveButtonEnabled();
        this.invalidate();
    }

    private handleEditorLiveChange(event: TextArea$LiveChangeEvent): void {
        this.draftText = String(event.getParameter("value") ?? "");
        this.updateSaveButtonEnabled();
    }

    private updateSaveButtonEnabled(): void {
        const value = this.draftText.trim();

        this._getSaveButton().setEnabled(
            Boolean(value) && value !== this.getText()
        );
    }

    private confirmEdit(): void {
        const value = this.draftText.trim();

        if (!value || value === this.getText()) {
            return;
        }

        this.editing = false;
        this.draftText = "";
        this.fireEvent("editPress", { value });
        this.invalidate();
    }

    private cancelEdit(): void {
        this.editing = false;
        this.draftText = "";
        this._getEditor().setValue("");
        this.invalidate();
    }

    _getTimestampDate(): Date | null {
        const timestamp = this.getTimestamp();

        if (timestamp === null || timestamp === undefined || timestamp === "") {
            return null;
        }

        const date = timestamp instanceof Date
            ? timestamp
            : new Date(timestamp as string | number);

        return Number.isNaN(date.getTime()) ? null : date;
    }

    _getFormattedTime(): string {
        const timestamp = this.getTimestamp();
        const date = this._getTimestampDate();

        if (date) {
            return DateFormat.getTimeInstance({ style: "short" }).format(date);
        }

        return timestamp === null || timestamp === undefined
            ? ""
            : String(timestamp);
    }

    _getDateKey(): string {
        const date = this._getTimestampDate();

        if (!date) {
            return "";
        }

        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    }

    _getFormattedDate(): string {
        const date = this._getTimestampDate();

        return date
            ? DateFormat.getDateInstance({ style: "medium" }).format(date)
            : "";
    }
}
