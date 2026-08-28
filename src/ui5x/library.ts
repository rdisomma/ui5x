/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "./loading/SkeletonType";
import "./loading/SkeletonRowMode";
import "./input/SegmentedInputSize";
import "./input/SegmentedInputType";
import "./chat/ChatFeedComposerPosition";
import "./chat/ChatFeedMessageAlignment";
import "./chat/ChatMessageAppearance";
import "./chat/ChatMessageTimestampFormat";
import Lib from "sap/ui/core/Lib";

const UI5X = Lib.init({
    name: "ui5x",
    version: "${version}",
    dependencies: [
        "sap.ui.core",
        "sap.m",
        "sap.ui.table"
    ],
    types: [
        "ui5x.loading.SkeletonType",
        "ui5x.loading.SkeletonRowMode",
        "ui5x.input.SegmentedInputSize",
        "ui5x.input.SegmentedInputType",
        "ui5x.chat.ChatFeedComposerPosition",
        "ui5x.chat.ChatFeedMessageAlignment",
        "ui5x.chat.ChatMessageAppearance",
        "ui5x.chat.ChatMessageTimestampFormat",
    ],
    interfaces: [],
    controls: [
        "ui5x.loading.Skeleton",
        "ui5x.loading.LoadingContainer",
        "ui5x.loading.LoadingResponsiveTable",
        "ui5x.loading.LoadingTable",
        "ui5x.layout.Accordion",
        "ui5x.layout.AccordionItem",
        "ui5x.button.CopyButton",
        "ui5x.input.SegmentedInput",
        "ui5x.chat.ChatFeed",
        "ui5x.chat.ChatMessage"
    ],
    elements: [],
    noLibraryCSS: false
});

export default UI5X;
