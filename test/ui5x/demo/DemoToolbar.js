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
    "sap/m/Select",
    "sap/m/StepInput",
    "sap/m/Title",
    "sap/m/ToggleButton",
    "sap/m/ToolbarSeparator",
    "sap/m/ToolbarSpacer",
    "sap/ui/core/Item",
    "sap/ui/core/Theming"
], function (
    Button,
    Label,
    OverflowToolbar,
    SegmentedButton,
    SegmentedButtonItem,
    Select,
    StepInput,
    Title,
    ToggleButton,
    ToolbarSeparator,
    ToolbarSpacer,
    Item,
    Theming
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

    /*
     * Switching the theme at runtime is the only practical way to check the
     * dark and high contrast palettes, so every page carries the full list of
     * themes the library ships.
     */
    function theme() {
        var themes = [
            "sap_horizon",
            "sap_horizon_dark",
            "sap_horizon_hcb",
            "sap_horizon_hcw",
            "sap_fiori_3",
            "sap_fiori_3_dark",
            "sap_fiori_3_hcb",
            "sap_fiori_3_hcw"
        ];

        return new Select({
            selectedKey: Theming.getTheme(),
            autoAdjustWidth: true,

            items: themes.map(function (name) {
                return new Item({ key: name, text: name });
            }),

            change: function (event) {
                Theming.setTheme(
                    event.getParameter("selectedItem").getKey()
                );
            }
        });
    }

    function place(title, items) {
        return new OverflowToolbar({
            width: "100%",

            content: [new Title({ text: title })]
                .concat(items)
                .concat([
                    new ToolbarSpacer(),
                    new ToolbarSeparator(),
                    label("Theme"),
                    theme(),
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
