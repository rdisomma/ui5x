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

    private feedbackActive!: boolean;
    private feedbackTimer!: number | null;
    private iconAnimationFrame!: number | null;
    private iconAnimationTimer!: number | null;

    init(): void | undefined {
        super.init();

        this.feedbackTimer = null;
        this.iconAnimationFrame = null;
        this.iconAnimationTimer = null;
        this.feedbackActive = false;

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
        this.feedbackActive = false;

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

            this.showSuccessFeedback();
            this.fireEvent("copySuccess", { value });
        } catch (e) {
            const reason = e instanceof Error ? e.message : String(e);

            Log.error(
                "Failed to copy value to the clipboard.",
                reason,
                "ui5x.button.CopyButton"
            );

            if (!this.isDestroyed()) {
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
        const successText = this.getSuccessText();

        return this.feedbackActive && text && successText
            ? successText
            : text;
    }

    getIcon(): string {
        const successIcon = this.getSuccessIcon();

        return this.feedbackActive && successIcon
            ? successIcon
            : this.getProperty("icon") as string;
    }

    getType(): ButtonType {
        /*
         * getSuccessType() falls back to getType() when successType was never
         * set, so the fallback has to be resolved here rather than delegated.
         */
        return this.feedbackActive && !this.isPropertyInitial("successType")
            ? this.getProperty("successType") as ButtonType
            : this.getProperty("type") as ButtonType;
    }

    private showSuccessFeedback(): void {
        if (this.feedbackTimer !== null) {
            window.clearTimeout(this.feedbackTimer);
        }

        this.feedbackActive = true;
        this.invalidate();

        if (this.getSuccessIcon()) {
            this.playIconAnimation();
        }

        this.feedbackTimer = window.setTimeout(() => {
            this.restoreFeedback();
        }, 2000);
    }

    private restoreFeedback(): void {
        this.feedbackActive = false;
        this.feedbackTimer = null;
        this.invalidate();

        if (this.getSuccessIcon()) {
            this.playIconAnimation();
        }
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
