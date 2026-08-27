/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

/*
 * Toolbar helpers shared by the manual demo pages.
 *
 * The pages are interactive: every control property worth seeing is exposed
 * as a toolbar item instead of being driven by a timer.
 */
sap.ui.define([
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/OverflowToolbar",
    "sap/m/SegmentedButton",
    "sap/m/SegmentedButtonItem",
    "sap/m/StepInput",
    "sap/m/Title",
    "sap/m/ToggleButton",
    "sap/m/ToolbarSeparator",
    "sap/m/ToolbarSpacer"
], function (
    Button,
    Label,
    OverflowToolbar,
    SegmentedButton,
    SegmentedButtonItem,
    StepInput,
    Title,
    ToggleButton,
    ToolbarSeparator,
    ToolbarSpacer
) {
    "use strict";

    function label(text) {
        return new Label({ text: text });
    }

    function choice(keys, selectedKey, onChange) {
        return new SegmentedButton({
            selectedKey: String(selectedKey),

            items: keys.map(function (key) {
                return new SegmentedButtonItem({
                    key: String(key),
                    text: String(key)
                });
            }),

            selectionChange: function (event) {
                onChange(event.getParameter("item").getKey());
            }
        });
    }

    function toggle(text, pressed, onChange) {
        return new ToggleButton({
            text: text,
            pressed: pressed,

            press: function (event) {
                onChange(event.getParameter("pressed"));
            }
        });
    }

    function number(value, min, max, onChange) {
        return new StepInput({
            value: value,
            min: min,
            max: max,
            width: "5.5rem",

            change: function (event) {
                onChange(event.getParameter("value"));
            }
        });
    }

    function action(text, onPress) {
        return new Button({
            text: text,
            press: onPress
        });
    }

    /*
     * Density is a layout knob every page shares, so it is appended
     * automatically at the end of the toolbar.
     */
    function density() {
        var body = document.body;

        return choice(
            ["Cozy", "Compact"],
            body.classList.contains("sapUiSizeCompact") ? "Compact" : "Cozy",
            function (key) {
                body.classList.toggle("sapUiSizeCompact", key === "Compact");
                body.classList.toggle("sapUiSizeCozy", key === "Cozy");
            }
        );
    }

    function place(title, items) {
        return new OverflowToolbar({
            width: "100%",

            content: [new Title({ text: title })]
                .concat(items)
                .concat([
                    new ToolbarSpacer(),
                    new ToolbarSeparator(),
                    label("Density"),
                    density()
                ])
        }).placeAt("toolbar");
    }

    return {
        label: label,
        choice: choice,
        toggle: toggle,
        number: number,
        action: action,
        separator: function () {
            return new ToolbarSeparator();
        },
        place: place
    };
});
