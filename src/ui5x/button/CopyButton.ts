/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import '../library';

import type { MetadataOptions } from 'sap/ui/core/Element';
import type Event from 'sap/ui/base/Event';

import Log from "sap/base/Log";
import Button from "sap/m/Button";
import { ButtonType } from 'sap/m/library';

/**
 * A button that copies a value to the system clipboard.
 *
 * @extends sap.m.Button
 * @public
 * @name ui5x.button.CopyButton
 */
export default class CopyButton extends Button {

    constructor(idOrSettings?: string | $CopyButtonSettings);
    constructor(id?: string, settings?: $CopyButtonSettings);
    constructor(id?: string, settings?: $CopyButtonSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        properties: {
            /**
             * Defines the value copied to the system clipboard
             * when the button is pressed.
             */
            value: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines the icon temporarily displayed after the value has been
             * successfully copied to the system clipboard.
             *
             * When empty, the button icon is not changed.
             */
            successIcon: {
                type: "sap.ui.core.URI",
                defaultValue: "sap-icon://accept"
            },
            /**
             * Defines the temporary text displayed after the value has been
             * successfully copied to the system clipboard.
             *
             * The success text is shown only when the button already has a
             * non-empty text value. For icon-only buttons, this property is
             * ignored and only the success icon is displayed.
             *
             * When empty, the button text is not changed.
             */
            successText: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines the button type temporarily applied after the value has been
             * successfully copied to the system clipboard.
             *
             * When not explicitly set, the current button type is preserved.
             */
            successType: {
                type: "sap.m.ButtonType",
                defaultValue: ButtonType.Default
            },
            /**
             * Defines the icon temporarily displayed when the value could not
             * be written to the system clipboard.
             *
             * Unlike the other feedback properties this one is set by default:
             * a failed copy is otherwise indistinguishable from a successful
             * one, since nothing on screen changes and the value the user
             * expects is simply not there.
             *
             * When empty, the button icon is not changed.
             */
            errorIcon: {
                type: "sap.ui.core.URI",
                defaultValue: "sap-icon://error"
            },
            /**
             * Defines the temporary text displayed when the value could not be
             * written to the system clipboard.
             *
             * As with successText, it is shown only when the button already
             * has a non-empty text value, and ignored for icon-only buttons.
             *
             * When empty, the button text is not changed.
             */
            errorText: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines the button type temporarily applied when the value could
             * not be written to the system clipboard.
             *
             * When not explicitly set, the current button type is preserved.
             */
            errorType: {
                type: "sap.m.ButtonType",
                defaultValue: ButtonType.Default
            }
        },

        events: {
            /**
             * Fired after the value has reached the system clipboard.
             *
             * The press event only says the button was pressed. The write that
             * follows is asynchronous and can fail, so an application that
             * reports the outcome listens here instead.
             */
            copySuccess: {
                parameters: {
                    /**
                     * The value written to the clipboard.
                     */
                    value: { type: "string" }
                }
            },

            /**
             * Fired when the value could not be written to the clipboard,
             * which happens on an insecure origin, without permission, or
             * where the browser exposes no Clipboard API at all.
             */
            copyError: {
                parameters: {
                    /**
                     * The value that was not written.
                     */
                    value: { type: "string" },

                    /**
                     * The reason the write failed.
                     */
                    reason: { type: "string" }
                }
            }
        }
    }

    static renderer = "sap.m.ButtonRenderer";

    private feedback!: "" | "success" | "error";
    private feedbackTimer!: number | null;
    private iconAnimationFrame!: number | null;
    private iconAnimationTimer!: number | null;

    init(): void | undefined {
        super.init();

        this.feedbackTimer = null;
        this.iconAnimationFrame = null;
        this.iconAnimationTimer = null;
        this.feedback = "";

        this.setIcon("sap-icon://copy");

        this.attachPress(this.onPress, this);
    }

    exit(): void {
        this.detachPress(this.onPress, this);

        if (this.feedbackTimer !== null) {
            window.clearTimeout(this.feedbackTimer);
        }

        if (this.iconAnimationTimer !== null) {
            window.clearTimeout(this.iconAnimationTimer);
        }

        if (this.iconAnimationFrame !== null) {
            window.cancelAnimationFrame(this.iconAnimationFrame);
        }

        this.feedbackTimer = null;
        this.iconAnimationFrame = null;
        this.iconAnimationTimer = null;
        this.feedback = "";

        super.exit();
    }

    private onPress(_event: Event): void {
        void this.handleCopyRequest();
    }

    private async handleCopyRequest(): Promise<void> {
        const value = this.getValue();

        if (!navigator.clipboard) {
            const reason = "Clipboard API is not available.";

            Log.error(reason, undefined, "ui5x.button.CopyButton");
            this.showFeedback("error");
            this.fireEvent("copyError", { value, reason });

            return;
        }

        try {
            await navigator.clipboard.writeText(value);

            /*
             * The button can be destroyed while the clipboard write is pending.
             * exit() has already cleared the timers at that point, so the
             * feedback must not schedule a new one.
             */
            if (this.isDestroyed()) {
                return;
            }

            this.showFeedback("success");
            this.fireEvent("copySuccess", { value });
        } catch (e) {
            const reason = e instanceof Error ? e.message : String(e);

            Log.error(
                "Failed to copy value to the clipboard.",
                reason,
                "ui5x.button.CopyButton"
            );

            if (!this.isDestroyed()) {
                this.showFeedback("error");
                this.fireEvent("copyError", { value, reason });
            }
        }
    }

    /*
     * The feedback is read through the getters rather than written to the
     * properties: text, type and icon can all be bound, and a two-way binding
     * would push two seconds of decoration into the application's data.
     */
    getText(): string {
        const text = this.getProperty("text") as string;

        if (!this.feedback || !text) {
            return text;
        }

        const feedbackText = this.feedback === "success"
            ? this.getSuccessText()
            : this.getErrorText();

        return feedbackText || text;
    }

    getIcon(): string {
        const icon = this.getProperty("icon") as string;

        if (!this.feedback) {
            return icon;
        }

        const feedbackIcon = this.feedback === "success"
            ? this.getSuccessIcon()
            : this.getErrorIcon();

        return feedbackIcon || icon;
    }

    getType(): ButtonType {
        const type = this.getProperty("type") as ButtonType;

        /*
         * getSuccessType() falls back to getType() when successType was never
         * set, so the fallback has to be resolved here rather than delegated.
         * errorType behaves the same way.
         */
        const property = this.feedback === "success" ? "successType" : "errorType";

        return this.feedback && !this.isPropertyInitial(property)
            ? this.getProperty(property) as ButtonType
            : type;
    }

    private showFeedback(outcome: "success" | "error"): void {
        if (this.feedbackTimer !== null) {
            window.clearTimeout(this.feedbackTimer);
        }

        this.feedback = outcome;
        this.invalidate();

        if (this.feedbackIcon()) {
            this.playIconAnimation();
        }

        this.feedbackTimer = window.setTimeout(() => {
            this.restoreFeedback();
        }, 2000);
    }

    private restoreFeedback(): void {
        const changesIcon = Boolean(this.feedbackIcon());

        this.feedback = "";
        this.feedbackTimer = null;
        this.invalidate();

        if (changesIcon) {
            this.playIconAnimation();
        }
    }

    private feedbackIcon(): string {
        return this.feedback === "error"
            ? this.getErrorIcon()
            : this.getSuccessIcon();
    }

    private playIconAnimation(): void {
        if (this.iconAnimationFrame !== null) {
            window.cancelAnimationFrame(this.iconAnimationFrame);
        }

        if (this.iconAnimationTimer !== null) {
            window.clearTimeout(this.iconAnimationTimer);
        }

        this.removeStyleClass("ui5xCopyButtonIconChange");

        this.iconAnimationFrame = window.requestAnimationFrame(() => {
            this.addStyleClass("ui5xCopyButtonIconChange");
            this.iconAnimationFrame = null;

            this.iconAnimationTimer = window.setTimeout(() => {
                this.removeStyleClass("ui5xCopyButtonIconChange");
                this.iconAnimationTimer = null;
            }, 180);
        });
    }

    getSuccessType(): ButtonType {
        if (this.isPropertyInitial("successType")) {
            return this.getType();
        }

        return this.getProperty("successType") as ButtonType;
    }
}
