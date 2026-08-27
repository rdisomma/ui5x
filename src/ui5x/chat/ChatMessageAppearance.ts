/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import DataType from "sap/ui/base/DataType";

enum ChatMessageAppearance {
    Bubble = "Bubble",
    Conversation = "Conversation"
}

DataType.registerEnum(
    "ui5x.chat.ChatMessageAppearance",
    ChatMessageAppearance
);

export default ChatMessageAppearance;
