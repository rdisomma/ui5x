import ChatMessage from "ui5x/chat/ChatMessage";
import Event from "sap/ui/base/Event";
import { URI } from "sap/ui/core/library";
import { ButtonType } from "sap/m/library";
import ChatMessageTimestampFormat from "ui5x/chat/ChatMessageTimestampFormat";
import ChatMessageAppearance from "ui5x/chat/ChatMessageAppearance";
import ChatFeedComposerPosition from "ui5x/chat/ChatFeedComposerPosition";
import ChatFeedMessageAlignment from "ui5x/chat/ChatFeedMessageAlignment";
import { CSSSize } from "sap/ui/core/library";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./ChatFeed" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $ChatFeedSettings extends $ControlSettings {

        /**
         * Defines the current composer value.
         */
        value?: string | PropertyBindingInfo;

        /**
         * Defines the composer placeholder.
         */
        placeholder?: string | PropertyBindingInfo;

        /**
         * Defines whether the composer and send action are enabled.
         */
        enabled?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the composer value can be changed.
         */
        editable?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether skeleton message placeholders are displayed
        instead of the messages aggregation.
         */
        loading?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether pressing Enter sends the current value.
         */
        sendOnEnter?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the send button text.
         */
        sendButtonText?: string | PropertyBindingInfo;

        /**
         * Defines the send button icon.
         */
        sendButtonIcon?: URI | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the send button type.
         */
        sendButtonType?: ButtonType | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the send button tooltip.
         */
        sendButtonTooltip?: string | PropertyBindingInfo;

        /**
         * Defines whether the send button is displayed.
         */
        showSendButton?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the send button can be pressed.
         */
        sendButtonEnabled?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether consecutive messages are grouped by date.
         */
        groupByDate?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * /**
                     * Defines how the timestamp of each message is displayed.
                     *
                     * Time alone relies on the date being clear from elsewhere, so a
                     * feed without date separators is usually better served by
                     *
        {@link ui5x.chat.ChatMessageTimestampFormat.DateTime}
        .
         */
        messageTimestampFormat?: ChatMessageTimestampFormat | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether messages marked as ownMessage use a highlighted
        bubble appearance.
         */
        highlightOwnMessage?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the appearance of messages that belong to the current
        user.
         */
        ownMessageAppearance?: ChatMessageAppearance | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the appearance of incoming messages.
         */
        incomingMessageAppearance?: ChatMessageAppearance | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the composer is rendered before or after the
        messages viewport.
         */
        composerPosition?: ChatFeedComposerPosition | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether a short conversation is aligned to the top or
        bottom of the messages viewport.
        
        Message order is never reversed.
         */
        messageAlignment?: ChatFeedMessageAlignment | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the reserved height and maximum height of the chat,
        keeping the composer position stable as the conversation grows.
        
        Percentage values require a parent with an explicit height.
        Set an empty value to let the chat follow its content.
         */
        chatMaxHeight?: CSSSize | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the width of the feed.
         */
        width?: CSSSize | PropertyBindingInfo | `{${string}}`;

        /**
         * Messages displayed by the feed.
         */
        messages?: ChatMessage[] | ChatMessage | AggregationBindingInfo | `{${string}}`;

        /**
         * Fired whenever the composer value changes through user input.
         */
        liveChange?: (event: ChatFeed$LiveChangeEvent) => void;

        /**
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         */
        send?: (event: ChatFeed$SendEvent) => void;

        /**
         * Fired when an inline message edit is confirmed.
         */
        messageEdit?: (event: ChatFeed$MessageEditEvent) => void;

        /**
         * Fired when a message delete action is pressed.
         */
        messageDelete?: (event: ChatFeed$MessageDeleteEvent) => void;
    }

    export default interface ChatFeed {

        // property: value

        /**
         * Gets current value of property "value".
         *
         * Defines the current composer value.
         *
         * Default value is: ""
         * @returns Value of property "value"
         */
        getValue(): string;

        /**
         * Sets a new value for property "value".
         *
         * Defines the current composer value.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [value=""] New value for property "value"
         * @returns Reference to "this" in order to allow method chaining
         */
        setValue(value: string): this;

        // property: placeholder

        /**
         * Gets current value of property "placeholder".
         *
         * Defines the composer placeholder.
         *
         * Default value is: ""
         * @returns Value of property "placeholder"
         */
        getPlaceholder(): string;

        /**
         * Sets a new value for property "placeholder".
         *
         * Defines the composer placeholder.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [placeholder=""] New value for property "placeholder"
         * @returns Reference to "this" in order to allow method chaining
         */
        setPlaceholder(placeholder: string): this;

        // property: enabled

        /**
         * Gets current value of property "enabled".
         *
         * Defines whether the composer and send action are enabled.
         *
         * Default value is: true
         * @returns Value of property "enabled"
         */
        getEnabled(): boolean;

        /**
         * Sets a new value for property "enabled".
         *
         * Defines whether the composer and send action are enabled.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [enabled=true] New value for property "enabled"
         * @returns Reference to "this" in order to allow method chaining
         */
        setEnabled(enabled: boolean): this;

        // property: editable

        /**
         * Gets current value of property "editable".
         *
         * Defines whether the composer value can be changed.
         *
         * Default value is: true
         * @returns Value of property "editable"
         */
        getEditable(): boolean;

        /**
         * Sets a new value for property "editable".
         *
         * Defines whether the composer value can be changed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [editable=true] New value for property "editable"
         * @returns Reference to "this" in order to allow method chaining
         */
        setEditable(editable: boolean): this;

        // property: loading

        /**
         * Gets current value of property "loading".
         *
         * Defines whether skeleton message placeholders are displayed
        instead of the messages aggregation.
         *
         * Default value is: false
         * @returns Value of property "loading"
         */
        getLoading(): boolean;

        /**
         * Sets a new value for property "loading".
         *
         * Defines whether skeleton message placeholders are displayed
        instead of the messages aggregation.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [loading=false] New value for property "loading"
         * @returns Reference to "this" in order to allow method chaining
         */
        setLoading(loading: boolean): this;

        // property: sendOnEnter

        /**
         * Gets current value of property "sendOnEnter".
         *
         * Defines whether pressing Enter sends the current value.
         *
         * Default value is: true
         * @returns Value of property "sendOnEnter"
         */
        getSendOnEnter(): boolean;

        /**
         * Sets a new value for property "sendOnEnter".
         *
         * Defines whether pressing Enter sends the current value.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [sendOnEnter=true] New value for property "sendOnEnter"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSendOnEnter(sendOnEnter: boolean): this;

        // property: sendButtonText

        /**
         * Gets current value of property "sendButtonText".
         *
         * Defines the send button text.
         *
         * Default value is: ""
         * @returns Value of property "sendButtonText"
         */
        getSendButtonText(): string;

        /**
         * Sets a new value for property "sendButtonText".
         *
         * Defines the send button text.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [sendButtonText=""] New value for property "sendButtonText"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSendButtonText(sendButtonText: string): this;

        // property: sendButtonIcon

        /**
         * Gets current value of property "sendButtonIcon".
         *
         * Defines the send button icon.
         *
         * Default value is: "sap-icon://paper-plane"
         * @returns Value of property "sendButtonIcon"
         */
        getSendButtonIcon(): URI;

        /**
         * Sets a new value for property "sendButtonIcon".
         *
         * Defines the send button icon.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "sap-icon://paper-plane"
         * @param [sendButtonIcon="sap-icon://paper-plane"] New value for property "sendButtonIcon"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSendButtonIcon(sendButtonIcon: URI): this;

        // property: sendButtonType

        /**
         * Gets current value of property "sendButtonType".
         *
         * Defines the send button type.
         *
         * Default value is: "ButtonType.Emphasized"
         * @returns Value of property "sendButtonType"
         */
        getSendButtonType(): ButtonType;

        /**
         * Sets a new value for property "sendButtonType".
         *
         * Defines the send button type.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "ButtonType.Emphasized"
         * @param [sendButtonType="ButtonType.Emphasized"] New value for property "sendButtonType"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSendButtonType(sendButtonType: ButtonType): this;

        // property: sendButtonTooltip

        /**
         * Gets current value of property "sendButtonTooltip".
         *
         * Defines the send button tooltip.
         *
         * Default value is: ""
         * @returns Value of property "sendButtonTooltip"
         */
        getSendButtonTooltip(): string;

        /**
         * Sets a new value for property "sendButtonTooltip".
         *
         * Defines the send button tooltip.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [sendButtonTooltip=""] New value for property "sendButtonTooltip"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSendButtonTooltip(sendButtonTooltip: string): this;

        // property: showSendButton

        /**
         * Gets current value of property "showSendButton".
         *
         * Defines whether the send button is displayed.
         *
         * Default value is: true
         * @returns Value of property "showSendButton"
         */
        getShowSendButton(): boolean;

        /**
         * Sets a new value for property "showSendButton".
         *
         * Defines whether the send button is displayed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [showSendButton=true] New value for property "showSendButton"
         * @returns Reference to "this" in order to allow method chaining
         */
        setShowSendButton(showSendButton: boolean): this;

        // property: sendButtonEnabled

        /**
         * Gets current value of property "sendButtonEnabled".
         *
         * Defines whether the send button can be pressed.
         *
         * Default value is: true
         * @returns Value of property "sendButtonEnabled"
         */
        getSendButtonEnabled(): boolean;

        /**
         * Sets a new value for property "sendButtonEnabled".
         *
         * Defines whether the send button can be pressed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [sendButtonEnabled=true] New value for property "sendButtonEnabled"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSendButtonEnabled(sendButtonEnabled: boolean): this;

        // property: groupByDate

        /**
         * Gets current value of property "groupByDate".
         *
         * Defines whether consecutive messages are grouped by date.
         *
         * Default value is: false
         * @returns Value of property "groupByDate"
         */
        getGroupByDate(): boolean;

        /**
         * Sets a new value for property "groupByDate".
         *
         * Defines whether consecutive messages are grouped by date.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [groupByDate=false] New value for property "groupByDate"
         * @returns Reference to "this" in order to allow method chaining
         */
        setGroupByDate(groupByDate: boolean): this;

        // property: messageTimestampFormat

        /**
         * Gets current value of property "messageTimestampFormat".
         *
         * /**
                     * Defines how the timestamp of each message is displayed.
                     *
                     * Time alone relies on the date being clear from elsewhere, so a
                     * feed without date separators is usually better served by
                     *
        {@link ui5x.chat.ChatMessageTimestampFormat.DateTime}
        .
         *
         * Default value is: "ChatMessageTimestampFormat.Time"
         * @returns Value of property "messageTimestampFormat"
         */
        getMessageTimestampFormat(): ChatMessageTimestampFormat;

        /**
         * Sets a new value for property "messageTimestampFormat".
         *
         * /**
                     * Defines how the timestamp of each message is displayed.
                     *
                     * Time alone relies on the date being clear from elsewhere, so a
                     * feed without date separators is usually better served by
                     *
        {@link ui5x.chat.ChatMessageTimestampFormat.DateTime}
        .
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "ChatMessageTimestampFormat.Time"
         * @param [messageTimestampFormat="ChatMessageTimestampFormat.Time"] New value for property "messageTimestampFormat"
         * @returns Reference to "this" in order to allow method chaining
         */
        setMessageTimestampFormat(messageTimestampFormat: ChatMessageTimestampFormat): this;

        // property: highlightOwnMessage

        /**
         * Gets current value of property "highlightOwnMessage".
         *
         * Defines whether messages marked as ownMessage use a highlighted
        bubble appearance.
         *
         * Default value is: false
         * @returns Value of property "highlightOwnMessage"
         */
        getHighlightOwnMessage(): boolean;

        /**
         * Sets a new value for property "highlightOwnMessage".
         *
         * Defines whether messages marked as ownMessage use a highlighted
        bubble appearance.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [highlightOwnMessage=false] New value for property "highlightOwnMessage"
         * @returns Reference to "this" in order to allow method chaining
         */
        setHighlightOwnMessage(highlightOwnMessage: boolean): this;

        // property: ownMessageAppearance

        /**
         * Gets current value of property "ownMessageAppearance".
         *
         * Defines the appearance of messages that belong to the current
        user.
         *
         * Default value is: "ChatMessageAppearance.Bubble"
         * @returns Value of property "ownMessageAppearance"
         */
        getOwnMessageAppearance(): ChatMessageAppearance;

        /**
         * Sets a new value for property "ownMessageAppearance".
         *
         * Defines the appearance of messages that belong to the current
        user.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "ChatMessageAppearance.Bubble"
         * @param [ownMessageAppearance="ChatMessageAppearance.Bubble"] New value for property "ownMessageAppearance"
         * @returns Reference to "this" in order to allow method chaining
         */
        setOwnMessageAppearance(ownMessageAppearance: ChatMessageAppearance): this;

        // property: incomingMessageAppearance

        /**
         * Gets current value of property "incomingMessageAppearance".
         *
         * Defines the appearance of incoming messages.
         *
         * Default value is: "ChatMessageAppearance.Conversation"
         * @returns Value of property "incomingMessageAppearance"
         */
        getIncomingMessageAppearance(): ChatMessageAppearance;

        /**
         * Sets a new value for property "incomingMessageAppearance".
         *
         * Defines the appearance of incoming messages.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "ChatMessageAppearance.Conversation"
         * @param [incomingMessageAppearance="ChatMessageAppearance.Conversation"] New value for property "incomingMessageAppearance"
         * @returns Reference to "this" in order to allow method chaining
         */
        setIncomingMessageAppearance(incomingMessageAppearance: ChatMessageAppearance): this;

        // property: composerPosition

        /**
         * Gets current value of property "composerPosition".
         *
         * Defines whether the composer is rendered before or after the
        messages viewport.
         *
         * Default value is: "ChatFeedComposerPosition.Top"
         * @returns Value of property "composerPosition"
         */
        getComposerPosition(): ChatFeedComposerPosition;

        /**
         * Sets a new value for property "composerPosition".
         *
         * Defines whether the composer is rendered before or after the
        messages viewport.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "ChatFeedComposerPosition.Top"
         * @param [composerPosition="ChatFeedComposerPosition.Top"] New value for property "composerPosition"
         * @returns Reference to "this" in order to allow method chaining
         */
        setComposerPosition(composerPosition: ChatFeedComposerPosition): this;

        // property: messageAlignment

        /**
         * Gets current value of property "messageAlignment".
         *
         * Defines whether a short conversation is aligned to the top or
        bottom of the messages viewport.
        
        Message order is never reversed.
         *
         * Default value is: "ChatFeedMessageAlignment.Top"
         * @returns Value of property "messageAlignment"
         */
        getMessageAlignment(): ChatFeedMessageAlignment;

        /**
         * Sets a new value for property "messageAlignment".
         *
         * Defines whether a short conversation is aligned to the top or
        bottom of the messages viewport.
        
        Message order is never reversed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "ChatFeedMessageAlignment.Top"
         * @param [messageAlignment="ChatFeedMessageAlignment.Top"] New value for property "messageAlignment"
         * @returns Reference to "this" in order to allow method chaining
         */
        setMessageAlignment(messageAlignment: ChatFeedMessageAlignment): this;

        // property: chatMaxHeight

        /**
         * Gets current value of property "chatMaxHeight".
         *
         * Defines the reserved height and maximum height of the chat,
        keeping the composer position stable as the conversation grows.
        
        Percentage values require a parent with an explicit height.
        Set an empty value to let the chat follow its content.
         *
         * Default value is: "32rem"
         * @returns Value of property "chatMaxHeight"
         */
        getChatMaxHeight(): CSSSize;

        /**
         * Sets a new value for property "chatMaxHeight".
         *
         * Defines the reserved height and maximum height of the chat,
        keeping the composer position stable as the conversation grows.
        
        Percentage values require a parent with an explicit height.
        Set an empty value to let the chat follow its content.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "32rem"
         * @param [chatMaxHeight="32rem"] New value for property "chatMaxHeight"
         * @returns Reference to "this" in order to allow method chaining
         */
        setChatMaxHeight(chatMaxHeight: CSSSize): this;

        // property: width

        /**
         * Gets current value of property "width".
         *
         * Defines the width of the feed.
         *
         * Default value is: "100%"
         * @returns Value of property "width"
         */
        getWidth(): CSSSize;

        /**
         * Sets a new value for property "width".
         *
         * Defines the width of the feed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "100%"
         * @param [width="100%"] New value for property "width"
         * @returns Reference to "this" in order to allow method chaining
         */
        setWidth(width: CSSSize): this;

        // aggregation: messages

        /**
         * Gets content of aggregation "messages".
         *
         * Messages displayed by the feed.
         */
        getMessages(): ChatMessage[];

        /**
         * Adds some message to the aggregation "messages".
         *
         * Messages displayed by the feed.
         *
         * @param message The message to add; if empty, nothing is inserted
         * @returns Reference to "this" in order to allow method chaining
         */
        addMessage(messages: ChatMessage): this;

        /**
         * Inserts a message into the aggregation "messages".
         *
         * Messages displayed by the feed.
         *
         * @param message The message to insert; if empty, nothing is inserted
         * @param index The "0"-based index the message should be inserted at; for
         *              a negative value of "iIndex", the message is inserted at position 0; for a value
         *              greater than the current size of the aggregation, the message is inserted at
         *              the last position
         * @returns Reference to "this" in order to allow method chaining
         */
        insertMessage(messages: ChatMessage, index: number): this;

        /**
         * Removes a message from the aggregation "messages".
         *
         * Messages displayed by the feed.
         *
         * @param message The message to remove or its index or id
         * @returns The removed message or "null"
         */
        removeMessage(messages: number | string | ChatMessage): ChatMessage | null;

        /**
         * Removes all the controls from the aggregation "messages".
         * Additionally, it unregisters them from the hosting UIArea.
         *
         * Messages displayed by the feed.
         *
         * @returns  An array of the removed elements (might be empty)
         */
        removeAllMessages(): ChatMessage[];

        /**
         * Checks for the provided "ui5x.chat.ChatMessage" in the aggregation "messages".
         * and returns its index if found or -1 otherwise.
         *
         * Messages displayed by the feed.
         *
         * @param message The message whose index is looked for
         * @returns The index of the provided control in the aggregation if found, or -1 otherwise
         */
        indexOfMessage(messages: ChatMessage): number;

        /**
         * Destroys all the messages in the aggregation "messages".
         *
         * Messages displayed by the feed.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        destroyMessages(): this;

        // event: liveChange

        /**
         * Attaches event handler "fn" to the "liveChange" event of this "ChatFeed".
         *
         * Fired whenever the composer value changes through user input.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatFeed" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatFeed" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachLiveChange(fn: (event: ChatFeed$LiveChangeEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "liveChange" event of this "ChatFeed".
         *
         * Fired whenever the composer value changes through user input.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatFeed" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatFeed" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachLiveChange<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatFeed$LiveChangeEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "liveChange" event of this "ChatFeed".
         *
         * Fired whenever the composer value changes through user input.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachLiveChange(fn: (event: ChatFeed$LiveChangeEvent) => void, listener?: object): this;

        /**
         * Fires event "liveChange" to attached listeners.
         *
         * Fired whenever the composer value changes through user input.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value] Fired whenever the composer value changes through user input.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireLiveChange(parameters?: ChatFeed$LiveChangeEventParameters): this;

        // event: send

        /**
         * Attaches event handler "fn" to the "send" event of this "ChatFeed".
         *
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatFeed" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatFeed" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachSend(fn: (event: ChatFeed$SendEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "send" event of this "ChatFeed".
         *
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatFeed" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatFeed" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachSend<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatFeed$SendEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "send" event of this "ChatFeed".
         *
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachSend(fn: (event: ChatFeed$SendEvent) => void, listener?: object): this;

        /**
         * Fires event "send" to attached listeners.
         *
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value] Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireSend(parameters?: ChatFeed$SendEventParameters): this;

        // event: messageEdit

        /**
         * Attaches event handler "fn" to the "messageEdit" event of this "ChatFeed".
         *
         * Fired when an inline message edit is confirmed.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatFeed" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatFeed" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachMessageEdit(fn: (event: ChatFeed$MessageEditEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "messageEdit" event of this "ChatFeed".
         *
         * Fired when an inline message edit is confirmed.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatFeed" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatFeed" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachMessageEdit<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatFeed$MessageEditEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "messageEdit" event of this "ChatFeed".
         *
         * Fired when an inline message edit is confirmed.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachMessageEdit(fn: (event: ChatFeed$MessageEditEvent) => void, listener?: object): this;

        /**
         * Fires event "messageEdit" to attached listeners.
         *
         * Fired when an inline message edit is confirmed.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.message] Fired when an inline message edit is confirmed.
         * @param [mParameters.value] Fired when an inline message edit is confirmed.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireMessageEdit(parameters?: ChatFeed$MessageEditEventParameters): this;

        // event: messageDelete

        /**
         * Attaches event handler "fn" to the "messageDelete" event of this "ChatFeed".
         *
         * Fired when a message delete action is pressed.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatFeed" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatFeed" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachMessageDelete(fn: (event: ChatFeed$MessageDeleteEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "messageDelete" event of this "ChatFeed".
         *
         * Fired when a message delete action is pressed.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatFeed" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatFeed" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachMessageDelete<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatFeed$MessageDeleteEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "messageDelete" event of this "ChatFeed".
         *
         * Fired when a message delete action is pressed.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachMessageDelete(fn: (event: ChatFeed$MessageDeleteEvent) => void, listener?: object): this;

        /**
         * Fires event "messageDelete" to attached listeners.
         *
         * Fired when a message delete action is pressed.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.message] Fired when a message delete action is pressed.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireMessageDelete(parameters?: ChatFeed$MessageDeleteEventParameters): this;
    }

    /**
     * Interface describing the parameters of ChatFeed's 'liveChange' event.
     * Fired whenever the composer value changes through user input.
     */
    export interface ChatFeed$LiveChangeEventParameters {
        value?: string;
    }

    /**
     * Interface describing the parameters of ChatFeed's 'send' event.
     * Fired when the current value is sent.
    
    The composer is cleared after the event is fired.
     */
    export interface ChatFeed$SendEventParameters {
        value?: string;
    }

    /**
     * Interface describing the parameters of ChatFeed's 'messageEdit' event.
     * Fired when an inline message edit is confirmed.
     */
    export interface ChatFeed$MessageEditEventParameters {
        message?: ChatMessage;
        value?: string;
    }

    /**
     * Interface describing the parameters of ChatFeed's 'messageDelete' event.
     * Fired when a message delete action is pressed.
     */
    export interface ChatFeed$MessageDeleteEventParameters {
        message?: ChatMessage;
    }

    /**
     * Type describing the ChatFeed's 'liveChange' event.
     * Fired whenever the composer value changes through user input.
     */
    export type ChatFeed$LiveChangeEvent = Event<ChatFeed$LiveChangeEventParameters>;

    /**
     * Type describing the ChatFeed's 'send' event.
     * Fired when the current value is sent.
    
    The composer is cleared after the event is fired.
     */
    export type ChatFeed$SendEvent = Event<ChatFeed$SendEventParameters>;

    /**
     * Type describing the ChatFeed's 'messageEdit' event.
     * Fired when an inline message edit is confirmed.
     */
    export type ChatFeed$MessageEditEvent = Event<ChatFeed$MessageEditEventParameters>;

    /**
     * Type describing the ChatFeed's 'messageDelete' event.
     * Fired when a message delete action is pressed.
     */
    export type ChatFeed$MessageDeleteEvent = Event<ChatFeed$MessageDeleteEventParameters>;
}
