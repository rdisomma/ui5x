/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";

import type AccordionItem from "../AccordionItem";

const AccordionItemRenderer = {
    apiVersion: 2,

    render(rm: RenderManager, control: AccordionItem): void {
        const id = control.getId();
        const headerId = `${id}-header`;
        const contentId = `${id}-content`;

        const expanded = control.getExpanded();
        const enabled = control.getEnabled();
        const toggleable = control.getToggleable();

        rm.openStart("section", control);
        rm.class("ui5xAccordionItem");

        if (expanded) {
            rm.class("ui5xAccordionItemExpanded");
        }

        if (!enabled) {
            rm.class("ui5xAccordionItemDisabled");
        }

        rm.openEnd();

        /*
         * Header
         */

        rm.openStart("button", headerId);
        rm.class("ui5xAccordionItemHeader");

        rm.attr("type", "button");
        rm.attr("aria-expanded", expanded ? "true" : "false");
        rm.attr("aria-controls", contentId);

        if (!enabled || !toggleable) {
            rm.attr("disabled", "disabled");
        }

        rm.openEnd();

        rm.openStart("span");
        rm.class("ui5xAccordionItemTitle");
        rm.openEnd();

        rm.text(control.getTitle());

        rm.close("span");

        if (toggleable) {
            rm.openStart("span");
            rm.class("ui5xAccordionItemIndicator");
            rm.attr("aria-hidden", "true");
            rm.openEnd();
            rm.close("span");
        }

        rm.close("button");

        /*
         * Content region
         */

        rm.openStart("div", contentId);
        rm.class("ui5xAccordionItemContent");
        rm.attr("role", "region");
        rm.attr("aria-labelledby", headerId);
        rm.attr("aria-hidden", expanded ? "false" : "true");
        rm.openEnd();

        rm.openStart("div");
        rm.class("ui5xAccordionItemContentInner");
        rm.openEnd();

        rm.openStart("div");
        rm.class("ui5xAccordionItemContentBody");
        rm.openEnd();

        control.getContent().forEach((content) => {
            rm.renderControl(content);
        });

        rm.close("div");
        rm.close("div");
        rm.close("div");

        rm.close("section");
    }
};

export default AccordionItemRenderer;