/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import DataType from "sap/ui/base/DataType";

enum ChatMessageTimestampFormat {
    /**
     * No timestamp is displayed.
     */
    None = "None",

    /**
     * Only the time of day, which relies on the date being clear from
     * elsewhere, such as the date separators of a grouped feed.
     */
    Time = "Time",

    /**
     * The date and the time of day.
     */
    DateTime = "DateTime"
}

DataType.registerEnum(
    "ui5x.chat.ChatMessageTimestampFormat",
    ChatMessageTimestampFormat
);

export default ChatMessageTimestampFormat;
