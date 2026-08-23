/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import RenderManager from "sap/ui/core/RenderManager";

import type Accordion from "../Accordion";

const AccordionRenderer = {
    apiVersion: 2,

    render(rm: RenderManager, control: Accordion): void {
        const width = control.getWidth();

        rm.openStart("div", control);
        rm.class("ui5xAccordion");

        if (width)
            rm.style("width", width);

        rm.openEnd();

        control.getItems().forEach((item) => {
            rm.renderControl(item);
        });

        rm.close("div");
    }
};

export default AccordionRenderer;