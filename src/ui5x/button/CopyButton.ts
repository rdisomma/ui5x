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
        }
    }

    static renderer = "sap.m.ButtonRenderer";

    private originalIcon!: string;
    private originalText!: string;
    private originalType!: ButtonType;
    private iconFeedbackActive!: boolean;

    private feedbackTimer!: number | null;
    private iconAnimationFrame!: number | null;
    private iconAnimationTimer!: number | null;

    init(): void | undefined {
        super.init();

        this.feedbackTimer = null;
        this.iconAnimationFrame = null;
        this.iconAnimationTimer = null;
        this.originalIcon = "";
        this.originalText = "";
        this.originalType = this.getType();
        this.iconFeedbackActive = false;

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
        this.iconFeedbackActive = false;

        super.exit();
    }

    private onPress(_event: Event): void {
        void this.handleCopyRequest();
    }

    private async handleCopyRequest(): Promise<void> {
        const value = this.getValue();

        if (!navigator.clipboard) {
            return Log.error(
                "Clipboard API is not available.",
                undefined,
                "ui5x.button.CopyButton"
            );
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
        } catch (e) {
            Log.error(
                "Failed to copy value to the clipboard.",
                e instanceof Error
                    ? e.message
                    : String(e),
                "ui5x.button.CopyButton"
            );
        }
    }

    private showSuccessFeedback(): void {
        const buttonText = this.getText();
        const successText = this.getSuccessText();
        const successIcon = this.getSuccessIcon();
        const successType = this.getSuccessType();

        if (this.feedbackTimer === null) {
            this.originalIcon = this.getIcon();
            this.originalText = buttonText;
            this.originalType = this.getType();
            this.iconFeedbackActive = false;
        } else {
            window.clearTimeout(this.feedbackTimer);
        }

        if (successIcon) {
            this.iconFeedbackActive = true;
            this.setIconWithAnimation(successIcon);
        }

        if (buttonText && successText) {
            this.setText(successText);
        }

        this.setType(successType);

        this.feedbackTimer = window.setTimeout(() => {
            this.restoreFeedback();
        }, 2000);
    }

    private restoreFeedback(): void {
        if (this.iconFeedbackActive) {
            this.setIconWithAnimation(this.originalIcon);
            this.iconFeedbackActive = false;
        }

        this.setText(this.originalText);
        this.setType(this.originalType);

        this.feedbackTimer = null;
    }

    private setIconWithAnimation(icon: string): void {
        if (this.iconAnimationFrame !== null) {
            window.cancelAnimationFrame(this.iconAnimationFrame);
        }

        if (this.iconAnimationTimer !== null) {
            window.clearTimeout(this.iconAnimationTimer);
        }

        this.removeStyleClass("ui5xCopyButtonIconChange");
        this.setIcon(icon);

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
