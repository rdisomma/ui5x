/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import type UI5Event from "sap/ui/base/Event";

import AccordionItem from "./AccordionItem";
import AccordionRenderer from "./renderer/AccordionRenderer";
import type { AccordionItem$ToggleEvent } from "./AccordionItem";

/**
 * Displays a collection of expandable sections.
 *
 * @extends sap.ui.core.Control
 * @public
 * @name ui5x.layout.Accordion
 */
export default class Accordion extends Control {

    constructor(idOrSettings?: string | $AccordionSettings);
    constructor(id?: string, settings?: $AccordionSettings);
    constructor(id?: string, settings?: $AccordionSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        defaultAggregation: "items",

        properties: {
            /**
             * Defines whether multiple items can be expanded
             * at the same time.
             */
            multipleExpansion: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines the keys of the currently expanded items.
             */
            expandedKeys: {
                type: "string[]",
                defaultValue: []
            },
            /**
             * Defines the width of the accordion.
             *
             * Accepts any valid UI5 CSSSize value, such as
             * "100%", "20rem" or "320px".
             */
            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: null
            },
        },

        aggregations: {
            /**
             * Items displayed by the accordion.
             */
            items: {
                type: "ui5x.layout.AccordionItem",
                multiple: true,
                singularName: "item"
            }
        },

        events: {
            /**
             * Fired when an item is expanded or collapsed
             * through user interaction.
             */
            itemToggle: {
                parameters: {
                    /**
                     * The item whose state changed.
                     */
                    item: {
                        type: "ui5x.layout.AccordionItem"
                    },

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

    static renderer: typeof AccordionRenderer = AccordionRenderer;

    private attachedItems = new Set<AccordionItem>();

    onBeforeRendering(): void {
        this.syncItemHandlers();
        this.normalizeExpandedItems();
    }

    exit(): void {
        this.detachItemHandlers();
    }

    setMultipleExpansion(multipleExpansion: boolean): this {
        this.setProperty("multipleExpansion", multipleExpansion);

        if (!multipleExpansion) {
            this.normalizeExpandedItems();
        }

        return this;
    }

    private syncItemHandlers(): void {
        this.detachItemHandlers();

        const items = this.getItems();

        for (const item of items) {
            item.attachEvent(
                "toggle",
                this.onItemToggle,
                this
            );

            this.attachedItems.add(item);
        }
    }

    private detachItemHandlers(): void {
        for (const item of this.attachedItems) {
            item.detachEvent(
                "toggle",
                this.onItemToggle,
                this
            );
        }

        this.attachedItems.clear();
    }

    private onItemToggle(event: AccordionItem$ToggleEvent): void {
        const item = event.getSource() as AccordionItem;
        const expanded = event.getParameter("expanded");

        if (expanded && !this.getMultipleExpansion()) {
            for (const otherItem of this.getItems()) {
                if (otherItem !== item && otherItem.getExpanded()) {
                    otherItem.setExpanded(false);
                }
            }
        }

        this.fireEvent("itemToggle", {
            item,
            expanded
        });
    }

    private normalizeExpandedItems(): void {
        if (this.getMultipleExpansion()) {
            return;
        }

        const expandedItems = this.getItems().filter(item => item.getExpanded());

        if (expandedItems.length > 1) {
            for (let i = 1; i < expandedItems.length; i++) {
                const item = expandedItems[i];

                if (item.getToggleable()) {
                    item.setExpanded(false);
                }
            }
        }
    }
}