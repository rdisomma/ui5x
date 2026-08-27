/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import type { AccessibilityInfo } from "sap/ui/core/library";

import AccordionItemRenderer from "./renderer/AccordionItemRenderer";

/**
 * Represents an expandable section of an Accordion.
 *
 * @extends sap.ui.core.Control
 * @public
 * @name ui5x.layout.AccordionItem
 */
export default class AccordionItem extends Control {
    constructor(idOrSettings?: string | $AccordionItemSettings);
    constructor(id?: string, settings?: $AccordionItemSettings);
    constructor(
        id?: string,
        settings?: $AccordionItemSettings
    ) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        defaultAggregation: "content",

        properties: {
            /**
             * Defines the text displayed in the item header.
             */
            title: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines whether the item content is expanded.
             */
            expanded: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines whether the expanded state of the item can be changed.
             *
             * When set to false, the item keeps its current expanded state and
             * overrides the parent Accordion's expansion-selection behavior.
             * The item cannot be expanded or collapsed through user interaction
             * or by Accordion coordination logic.
             */
            toggleable: {
                type: "boolean",
                defaultValue: true
            },
            /**
             * Defines a stable key identifying the item within its Accordion.
             */
            key: {
                type: "string",
                defaultValue: ""
            },
            /**
             * Defines whether the item can be expanded or collapsed.
             */
            enabled: {
                type: "boolean",
                defaultValue: true
            }
        },

        aggregations: {
            /**
             * Controls displayed inside the expandable content area.
             */
            content: {
                type: "sap.ui.core.Control",
                multiple: true,
                singularName: "content"
            }
        },

        events: {
            /**
             * Fired when the expanded state changes through user interaction.
             */
            toggle: {
                parameters: {
                    /**
                     * The new expanded state.
                     */
                    expanded: {
                        type: "boolean"
                    }
                }
            }
        }
    };

    static renderer: typeof AccordionItemRenderer = AccordionItemRenderer;

    /**
     * Toggles the expanded state of the item.
     *
     * @private
     */
    private toggle(): void {
        if (!this.getEnabled() || !this.getToggleable()) {
            return;
        }

        const expanded = !this.getExpanded();

        this.setExpanded(expanded);
        this.fireEvent("toggle", { expanded });
    }

    getFocusDomRef(): Element | null {
        /*
         * The header button is the only focusable part of the item, and the
         * section element around it is not.
         */
        return this.getDomRef(`header`) ?? null;
    }

    getAccessibilityInfo(): AccessibilityInfo {
        return {
            role: "button",
            type: this.getTitle(),
            focusable: this.getEnabled() && this.getToggleable(),
            enabled: this.getEnabled(),
            children: this.getExpanded()
                ? this.getContent()
                : []
        };
    }

    onclick(event: MouseEvent): void {
        const target = event.target as HTMLElement | null;

        const header = target?.closest(".ui5xAccordionItemHeader") as HTMLElement | null;

        if (
            header?.id === `${this.getId()}-header`
        ) {
            this.toggle();
        }
    }
}