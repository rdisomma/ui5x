/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Button from "sap/m/Button";
import { ButtonType } from "sap/m/library";
import Localization from "sap/base/i18n/Localization";
import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import Lib from "sap/ui/core/Lib";
import { ValueState } from "sap/ui/core/library";

import SegmentedInputRenderer from "./renderer/SegmentedInputRenderer";
import SegmentedInputSize from "./SegmentedInputSize";
import SegmentedInputType from "./SegmentedInputType";

/**
 * Collects a numeric or alphanumeric value in separate fields.
 *
 * @extends sap.ui.core.Control
 * @public
 * @name ui5x.input.SegmentedInput
 */
export default class SegmentedInput extends Control {

    constructor(idOrSettings?: string | $SegmentedInputSettings);
    constructor(id?: string, settings?: $SegmentedInputSettings);
    constructor(id?: string, settings?: $SegmentedInputSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        properties: {
            /**
             * Defines the number of digit fields.
             *
             * Values are constrained between 1 and 34.
             */
            digits: {
                type: "int",
                defaultValue: 6
            },
            /**
             * Defines which characters can be entered.
             */
            inputType: {
                type: "ui5x.input.SegmentedInputType",
                defaultValue: SegmentedInputType.Numeric
            },
            /**
             * Defines the size of each field.
             *
             * The Medium size matches the standard sap.m.Input height.
             */
            size: {
                type: "ui5x.input.SegmentedInputSize",
                defaultValue: SegmentedInputSize.Medium
            },
            /**
             * Defines whether visual separators are displayed between groups
             * of digit fields.
             */
            showSeparators: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines the number of digits displayed between separators.
             *
             * Values lower than 1 are normalized to 1.
             */
            separatorInterval: {
                type: "int",
                defaultValue: 3
            },
            /**
             * Defines the value.
             *
             * Unsupported characters are removed according to inputType and
             * the value is limited to the configured number of fields.
             */
            value: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines the visual state of the control.
             */
            valueState: {
                type: "sap.ui.core.ValueState",
                defaultValue: ValueState.None
            },
            /**
             * Defines the message associated with the current value state.
             *
             * When empty, the standard text for the configured value state is
             * used.
             */
            valueStateText: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines whether a clear icon is shown when the control has a
             * value.
             */
            showClearIcon: {
                type: "boolean",
                defaultValue: false
            }
        },

        aggregations: {
            _clearButton: {
                type: "sap.m.Button",
                multiple: false,
                visibility: "hidden"
            }
        },

        events: {
            /**
             * Fired whenever the value changes through user input.
             */
            liveChange: {
                parameters: {
                    /**
                     * The current value.
                     */
                    value: {
                        type: "string"
                    }
                }
            },
            /**
             * Fired when every digit field contains a value.
             */
            complete: {
                parameters: {
                    /**
                     * The completed value.
                     */
                    value: {
                        type: "string"
                    }
                }
            }
        }
    };

    static renderer: typeof SegmentedInputRenderer = SegmentedInputRenderer;

    /*
     * UI5 invokes init() from the base Control constructor. These fields must
     * therefore be type-only declarations: emitted class-field initializers
     * would run after init() and applySettings() and overwrite the state
     * created there.
     */
    private declare lastCompletedValue: string;
    private declare digitValues: string[];

    init(): void {
        this.lastCompletedValue = "";
        this.digitValues = this.createDigitValues("");

        const clearText = Lib.getResourceBundleFor("sap.m")?.getText(
            "INPUT_CLEAR_ICON_ALT"
        );

        this.setAggregation(
            "_clearButton",
            new Button(`${this.getId()}-clear`, {
                icon: "sap-icon://decline",
                tooltip: clearText,
                type: ButtonType.Transparent,
                press: () => this.handleClearPress()
            }).addStyleClass("ui5xSegmentedInputClearButton"),
            true
        );
    }

    onBeforeRendering(): void {
        const value = this.normalizeValue(this.getValue());

        if (value !== this.getValue()) {
            this.setProperty("value", value, true);
        }

        if (
            this.digitValues.length !== this.getDigits()
            || this.digitValues.join("") !== value
        ) {
            this.digitValues = this.createDigitValues(value);
        }
    }

    onAfterRendering(): void {
        this.syncDigitInputs();
    }

    setDigits(digits: number): this {
        const normalizedDigits = Number.isFinite(digits)
            ? Math.min(34, Math.max(1, Math.round(digits)))
            : 1;

        this.setProperty("digits", normalizedDigits);
        const value = this.normalizeValue(this.getValue());

        this.setProperty("value", value, true);
        this.digitValues = this.createDigitValues(value);
        this.lastCompletedValue = "";

        return this;
    }

    setInputType(inputType: SegmentedInputType): this {
        this.setProperty("inputType", inputType);
        const value = this.normalizeValue(this.getValue());

        this.setProperty("value", value, true);
        this.digitValues = this.createDigitValues(value);
        this.lastCompletedValue = "";

        return this;
    }

    setSeparatorInterval(separatorInterval: number): this {
        const normalizedInterval = Number.isFinite(separatorInterval)
            ? Math.max(1, Math.round(separatorInterval))
            : 1;

        this.setProperty("separatorInterval", normalizedInterval);

        return this;
    }

    setValue(value: string): this {
        const normalizedValue = this.normalizeValue(String(value ?? ""));

        this.setProperty("value", normalizedValue);
        this.digitValues = this.createDigitValues(normalizedValue);
        this.lastCompletedValue = "";

        return this;
    }

    /**
     * Clears every field without firing user-interaction events.
     */
    clear(): this {
        this.setProperty("value", "", true);
        this.digitValues = this.createDigitValues("");
        this.lastCompletedValue = "";
        this.syncDigitInputs();

        return this;
    }

    oninput(event: InputEvent): void {
        const input = this.getDigitInput(event.target);
        const originalEvent = (
            event as InputEvent & { originalEvent?: InputEvent }
        ).originalEvent;

        if (!input || event.isComposing || originalEvent?.isComposing) {
            return;
        }

        const index = this.getDigitIndex(input);
        const nativeInputType = event.inputType || originalEvent?.inputType || "";
        const inputCharacters = this.sanitizeValue(input.value);
        const eventCharacters = this.sanitizeValue(
            event.data ?? originalEvent?.data ?? ""
        );
        const caretCharacter = nativeInputType === "insertText"
            && !eventCharacters
            && input.selectionStart
            ? this.sanitizeValue(input.value[input.selectionStart - 1] ?? "")
            : "";
        const insertedCharacters = nativeInputType === "insertText"
            ? eventCharacters || caretCharacter
            : inputCharacters;

        if (!insertedCharacters) {
            this.removeDigit(index, index);

            return;
        }

        this.insertCharacters(index, insertedCharacters);
    }

    onkeydown(event: KeyboardEvent): void {
        const input = this.getDigitInput(event.target);
        const originalEvent = (
            event as KeyboardEvent & { originalEvent?: KeyboardEvent }
        ).originalEvent;

        if (!input) {
            return;
        }

        const index = this.getDigitIndex(input);
        const key = event.key || originalEvent?.key || "";
        const hasModifier = event.ctrlKey
            || event.metaKey
            || event.altKey
            || originalEvent?.ctrlKey
            || originalEvent?.metaKey
            || originalEvent?.altKey;

        switch (key) {
            case "Backspace": {
                event.preventDefault();

                const removeIndex = this.digitValues[index]
                    ? index
                    : index - 1;

                if (removeIndex >= 0) {
                    this.removeDigit(removeIndex, removeIndex);
                }

                break;
            }

            case "Delete":
                event.preventDefault();

                if (this.digitValues[index]) {
                    this.removeDigit(index, index);
                }

                break;

            case "ArrowLeft":
                event.preventDefault();
                this.focusDigit(index - this.getNavigationStep());
                break;

            case "ArrowRight":
                event.preventDefault();
                this.focusDigit(index + this.getNavigationStep());
                break;

            case "Home":
                event.preventDefault();
                this.focusDigit(0);
                break;

            case "End":
                event.preventDefault();
                this.focusDigit(this.getDigits() - 1);
                break;

            default:
                if (
                    !hasModifier
                    && key.length === 1
                    && !this.isAllowedCharacter(key)
                ) {
                    event.preventDefault();
                }
        }
    }

    onpaste(event: ClipboardEvent): void {
        const input = this.getDigitInput(event.target);
        const originalEvent = (
            event as ClipboardEvent & { originalEvent?: ClipboardEvent }
        ).originalEvent;

        const clipboardValue = event.clipboardData?.getData("text")
            ?? originalEvent?.clipboardData?.getData("text")
            ?? "";
        const characters = this.sanitizeValue(clipboardValue);

        if (!input) {
            return;
        }

        event.preventDefault();
        originalEvent?.preventDefault();

        if (!characters) {
            this.syncDigitInputs();
            return;
        }

        this.insertCharacters(this.getDigitIndex(input), characters);
    }

    onfocusin(event: FocusEvent): void {
        this.getDigitInput(event.target)?.select();
    }

    _getDigitValue(index: number): string {
        return this.digitValues[index] ?? "";
    }

    _getClearButton(): Button {
        return this.getAggregation("_clearButton") as Button;
    }

    private handleClearPress(): void {
        this.clear();
        this.fireEvent("liveChange", {
            value: ""
        });
        this.focusDigit(0);
    }

    private insertCharacters(index: number, insertedCharacters: string): void {
        const insertion = insertedCharacters
            .slice(0, this.getDigits() - index)
            .split("");

        insertion.forEach((digit, offset) => {
            this.digitValues[index + offset] = digit;
        });

        this.applyUserValue(Math.min(
            index + insertion.length,
            this.getDigits() - 1
        ));
    }

    private removeDigit(index: number, focusIndex: number): void {
        if (index < 0 || index >= this.getDigits()) {
            this.syncDigitInputs();
            return;
        }

        this.digitValues[index] = "";
        this.applyUserValue(focusIndex);
    }

    private applyUserValue(focusIndex: number): void {
        const value = this.digitValues.join("");

        this.setProperty("value", value, true);
        this.syncDigitInputs();

        this.fireEvent("liveChange", {
            value
        });

        if (this.digitValues.every(Boolean)) {
            if (value !== this.lastCompletedValue) {
                this.lastCompletedValue = value;

                this.fireEvent("complete", {
                    value
                });
            }
        } else {
            this.lastCompletedValue = "";
        }

        this.focusDigit(focusIndex);
    }

    private normalizeValue(value: string): string {
        return this.sanitizeValue(value)
            .slice(0, this.getDigits());
    }

    private sanitizeValue(value: string): string {
        return this.getInputType() === SegmentedInputType.Alphanumeric
            ? value.replace(/[^a-z0-9]/gi, "")
            : value.replace(/\D/g, "");
    }

    private isAllowedCharacter(character: string): boolean {
        return this.getInputType() === SegmentedInputType.Alphanumeric
            ? /^[a-z0-9]$/i.test(character)
            : /^\d$/.test(character);
    }

    private createDigitValues(value: string): string[] {
        return Array.from(
            { length: this.getDigits() },
            (_, index) => value[index] ?? ""
        );
    }

    private syncDigitInputs(): void {
        const inputs = this.getDomRef()?.querySelectorAll<HTMLInputElement>(
            ".ui5xSegmentedInputDigit"
        );

        inputs?.forEach((input, index) => {
            input.value = this.digitValues[index] ?? "";
        });

        const clearButton = this.getDomRef()?.querySelector<HTMLButtonElement>(
            ".ui5xSegmentedInputClearButton"
        );

        if (clearButton) {
            clearButton.hidden = !this.digitValues.some(Boolean);
        }
    }

    /*
     * The fields are laid out in text direction, so in right-to-left the arrow
     * keys must move in the opposite direction of the logical index.
     */
    private getNavigationStep(): number {
        return Localization.getRTL() ? -1 : 1;
    }

    private focusDigit(index: number): void {
        const normalizedIndex = Math.min(
            this.getDigits() - 1,
            Math.max(0, index)
        );

        const input = document.getElementById(
            `${this.getId()}-digit-${normalizedIndex}`
        ) as HTMLInputElement | null;

        input?.focus();
        input?.select();
    }

    private getDigitInput(target: EventTarget | null): HTMLInputElement | null {
        if (
            target instanceof HTMLInputElement &&
            target.classList.contains("ui5xSegmentedInputDigit")
        ) {
            return target;
        }

        return null;
    }

    private getDigitIndex(input: HTMLInputElement): number {
        return Number(input.dataset.ui5xDigitIndex);
    }
}
