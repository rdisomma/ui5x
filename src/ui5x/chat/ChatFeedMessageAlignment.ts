/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import DataType from "sap/ui/base/DataType";

enum ChatFeedMessageAlignment {
    Top = "Top",
    Bottom = "Bottom"
}

DataType.registerEnum(
    "ui5x.chat.ChatFeedMessageAlignment",
    ChatFeedMessageAlignment
);

export default ChatFeedMessageAlignment;
