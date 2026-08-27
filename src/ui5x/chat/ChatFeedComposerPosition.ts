/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import DataType from "sap/ui/base/DataType";

enum ChatFeedComposerPosition {
    Top = "Top",
    Bottom = "Bottom"
}

DataType.registerEnum(
    "ui5x.chat.ChatFeedComposerPosition",
    ChatFeedComposerPosition
);

export default ChatFeedComposerPosition;
