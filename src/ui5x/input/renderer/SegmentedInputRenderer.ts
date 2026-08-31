/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";
import { ValueState } from "sap/ui/core/library";
import ValueStateSupport from "sap/ui/core/ValueStateSupport";

import type SegmentedInput from "../SegmentedInput";
import SegmentedInputType from "../SegmentedInputType";

const SegmentedInputRenderer = {
    apiVersion: 2,

    render(rm: RenderManager, control: SegmentedInput): void {
        const id = control.getId();
        const segmentCount = control.getSegmentCount();
        const showSeparators = control.getShowSeparators();
        const separatorInterval = control.getSeparatorInterval();
        const inputType = control.getInputType();
        const size = control.getSize();
        const isNumeric = inputType === SegmentedInputType.Numeric;
        const enabled = control.getEnabled();
        const editable = control.getEditable();
        const valueState = control.getValueState();
        const hasValueState = valueState !== ValueState.None;
        const valueStateText = hasValueState
            ? control.getValueStateText()
                || ValueStateSupport.getAdditionalText(control)
                || ""
            : "";
        const valueStateTextId = `${id}-valueStateText`;

        rm.openStart("div", control);
        rm.class("ui5xSegmentedInput");
        rm.class(`ui5xSegmentedInputSize${size}`);
        rm.attr("data-ui5x-segment-count", segmentCount);

        if (!enabled) {
            rm.class("ui5xSegmentedInputDisabled");
        }

        if (!editable) {
            rm.class("ui5xSegmentedInputReadOnly");
        }

        if (hasValueState) {
            rm.class(`ui5xSegmentedInput${valueState}`);
        }

        rm.openEnd();

        rm.openStart("div", `${id}-segments`);
        rm.class("ui5xSegmentedInputDigits");
        rm.attr("role", "group");
        rm.openEnd();

        for (let index = 0; index < segmentCount; index++) {
            rm.voidStart("input", `${id}-digit-${index}`);
            rm.class("ui5xSegmentedInputDigit");
            rm.attr("type", "text");
            rm.attr("inputmode", isNumeric ? "numeric" : "text");
            rm.attr("pattern", isNumeric ? "[0-9]*" : "[A-Za-z0-9]*");
            rm.attr("maxlength", segmentCount);
            rm.attr("aria-label", `${index + 1} / ${segmentCount}`);
            rm.attr("data-ui5x-digit-index", index);
            rm.attr("autocapitalize", "off");
            rm.attr("spellcheck", "false");

            if (!enabled) {
                rm.attr("disabled", "disabled");
            }

            if (!editable) {
                rm.attr("readonly", "readonly");
            }

            if (control.getRequired()) {
                rm.attr("aria-required", "true");
            }
            rm.attr(
                "autocomplete",
                isNumeric && index === 0 ? "one-time-code" : "off"
            );

            if (valueState === ValueState.Error) {
                rm.attr("aria-invalid", "true");
            }

            /*
             * The message element is only rendered for a non-empty text, so the
             * reference must not be written when there is nothing to point to.
             */
            if (valueStateText) {
                rm.attr(
                    valueState === ValueState.Error
                        ? "aria-errormessage"
                        : "aria-describedby",
                    valueStateTextId
                );
            }

            const digitValue = control._getDigitValue(index);

            if (digitValue) {
                rm.attr("value", digitValue);
            }

            rm.voidEnd();

            if (
                showSeparators
                && (index + 1) % separatorInterval === 0
                && index < segmentCount - 1
            ) {
                rm.openStart("span");
                rm.class("ui5xSegmentedInputSeparator");
                rm.attr("aria-hidden", "true");
                rm.openEnd();
                rm.text("–");
                rm.close("span");
            }
        }

        if (control.getShowClearIcon()) {
            rm.renderControl(control._getClearButton());
        }

        rm.close("div");

        if (valueStateText) {
            rm.openStart("div", valueStateTextId);
            rm.class("ui5xSegmentedInputValueStateText");
            rm.class(`ui5xSegmentedInputValueStateText${valueState}`);

            rm.openEnd();
            rm.text(valueStateText);
            rm.close("div");
        }

        rm.close("div");
    }
};

export default SegmentedInputRenderer;
