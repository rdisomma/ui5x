import ChatMessage from "ui5x/chat/ChatMessage";
import Event from "sap/ui/base/Event";
import { URI } from "sap/ui/core/library";
import { ButtonType } from "sap/m/library";
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
         * Defines the current composer value.
         */
        getValue(): string;

        /**
         * Defines the current composer value.
         */
        setValue(value: string): this;

        // property: placeholder

        /**
         * Defines the composer placeholder.
         */
        getPlaceholder(): string;

        /**
         * Defines the composer placeholder.
         */
        setPlaceholder(placeholder: string): this;

        // property: enabled

        /**
         * Defines whether the composer and send action are enabled.
         */
        getEnabled(): boolean;

        /**
         * Defines whether the composer and send action are enabled.
         */
        setEnabled(enabled: boolean): this;

        // property: editable

        /**
         * Defines whether the composer value can be changed.
         */
        getEditable(): boolean;

        /**
         * Defines whether the composer value can be changed.
         */
        setEditable(editable: boolean): this;

        // property: loading

        /**
         * Defines whether skeleton message placeholders are displayed
        instead of the messages aggregation.
         */
        getLoading(): boolean;

        /**
         * Defines whether skeleton message placeholders are displayed
        instead of the messages aggregation.
         */
        setLoading(loading: boolean): this;

        // property: sendOnEnter

        /**
         * Defines whether pressing Enter sends the current value.
         */
        getSendOnEnter(): boolean;

        /**
         * Defines whether pressing Enter sends the current value.
         */
        setSendOnEnter(sendOnEnter: boolean): this;

        // property: sendButtonText

        /**
         * Defines the send button text.
         */
        getSendButtonText(): string;

        /**
         * Defines the send button text.
         */
        setSendButtonText(sendButtonText: string): this;

        // property: sendButtonIcon

        /**
         * Defines the send button icon.
         */
        getSendButtonIcon(): URI;

        /**
         * Defines the send button icon.
         */
        setSendButtonIcon(sendButtonIcon: URI): this;

        // property: sendButtonType

        /**
         * Defines the send button type.
         */
        getSendButtonType(): ButtonType;

        /**
         * Defines the send button type.
         */
        setSendButtonType(sendButtonType: ButtonType): this;

        // property: sendButtonTooltip

        /**
         * Defines the send button tooltip.
         */
        getSendButtonTooltip(): string;

        /**
         * Defines the send button tooltip.
         */
        setSendButtonTooltip(sendButtonTooltip: string): this;

        // property: showSendButton

        /**
         * Defines whether the send button is displayed.
         */
        getShowSendButton(): boolean;

        /**
         * Defines whether the send button is displayed.
         */
        setShowSendButton(showSendButton: boolean): this;

        // property: sendButtonEnabled

        /**
         * Defines whether the send button can be pressed.
         */
        getSendButtonEnabled(): boolean;

        /**
         * Defines whether the send button can be pressed.
         */
        setSendButtonEnabled(sendButtonEnabled: boolean): this;

        // property: groupByDate

        /**
         * Defines whether consecutive messages are grouped by date.
         */
        getGroupByDate(): boolean;

        /**
         * Defines whether consecutive messages are grouped by date.
         */
        setGroupByDate(groupByDate: boolean): this;

        // property: highlightOwnMessage

        /**
         * Defines whether messages marked as ownMessage use a highlighted
        bubble appearance.
         */
        getHighlightOwnMessage(): boolean;

        /**
         * Defines whether messages marked as ownMessage use a highlighted
        bubble appearance.
         */
        setHighlightOwnMessage(highlightOwnMessage: boolean): this;

        // property: ownMessageAppearance

        /**
         * Defines the appearance of messages that belong to the current
        user.
         */
        getOwnMessageAppearance(): ChatMessageAppearance;

        /**
         * Defines the appearance of messages that belong to the current
        user.
         */
        setOwnMessageAppearance(ownMessageAppearance: ChatMessageAppearance): this;

        // property: incomingMessageAppearance

        /**
         * Defines the appearance of incoming messages.
         */
        getIncomingMessageAppearance(): ChatMessageAppearance;

        /**
         * Defines the appearance of incoming messages.
         */
        setIncomingMessageAppearance(incomingMessageAppearance: ChatMessageAppearance): this;

        // property: composerPosition

        /**
         * Defines whether the composer is rendered before or after the
        messages viewport.
         */
        getComposerPosition(): ChatFeedComposerPosition;

        /**
         * Defines whether the composer is rendered before or after the
        messages viewport.
         */
        setComposerPosition(composerPosition: ChatFeedComposerPosition): this;

        // property: messageAlignment

        /**
         * Defines whether a short conversation is aligned to the top or
        bottom of the messages viewport.
        
        Message order is never reversed.
         */
        getMessageAlignment(): ChatFeedMessageAlignment;

        /**
         * Defines whether a short conversation is aligned to the top or
        bottom of the messages viewport.
        
        Message order is never reversed.
         */
        setMessageAlignment(messageAlignment: ChatFeedMessageAlignment): this;

        // property: chatMaxHeight

        /**
         * Defines the reserved height and maximum height of the chat,
        keeping the composer position stable as the conversation grows.
        
        Percentage values require a parent with an explicit height.
        Set an empty value to let the chat follow its content.
         */
        getChatMaxHeight(): CSSSize;

        /**
         * Defines the reserved height and maximum height of the chat,
        keeping the composer position stable as the conversation grows.
        
        Percentage values require a parent with an explicit height.
        Set an empty value to let the chat follow its content.
         */
        setChatMaxHeight(chatMaxHeight: CSSSize): this;

        // property: width

        /**
         * Defines the width of the feed.
         */
        getWidth(): CSSSize;

        /**
         * Defines the width of the feed.
         */
        setWidth(width: CSSSize): this;

        // aggregation: messages

        /**
         * Messages displayed by the feed.
         */
        getMessages(): ChatMessage[];

        /**
         * Messages displayed by the feed.
         */
        addMessage(messages: ChatMessage): this;

        /**
         * Messages displayed by the feed.
         */
        insertMessage(messages: ChatMessage, index: number): this;

        /**
         * Messages displayed by the feed.
         */
        removeMessage(messages: number | string | ChatMessage): ChatMessage | null;

        /**
         * Messages displayed by the feed.
         */
        removeAllMessages(): ChatMessage[];

        /**
         * Messages displayed by the feed.
         */
        indexOfMessage(messages: ChatMessage): number;

        /**
         * Messages displayed by the feed.
         */
        destroyMessages(): this;

        // event: liveChange

        /**
         * Fired whenever the composer value changes through user input.
         */
        attachLiveChange(fn: (event: ChatFeed$LiveChangeEvent) => void, listener?: object): this;

        /**
         * Fired whenever the composer value changes through user input.
         */
        attachLiveChange<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatFeed$LiveChangeEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired whenever the composer value changes through user input.
         */
        detachLiveChange(fn: (event: ChatFeed$LiveChangeEvent) => void, listener?: object): this;

        /**
         * Fired whenever the composer value changes through user input.
         */
        fireLiveChange(parameters?: ChatFeed$LiveChangeEventParameters): this;

        // event: send

        /**
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         */
        attachSend(fn: (event: ChatFeed$SendEvent) => void, listener?: object): this;

        /**
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         */
        attachSend<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatFeed$SendEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         */
        detachSend(fn: (event: ChatFeed$SendEvent) => void, listener?: object): this;

        /**
         * Fired when the current value is sent.
        
        The composer is cleared after the event is fired.
         */
        fireSend(parameters?: ChatFeed$SendEventParameters): this;

        // event: messageEdit

        /**
         * Fired when an inline message edit is confirmed.
         */
        attachMessageEdit(fn: (event: ChatFeed$MessageEditEvent) => void, listener?: object): this;

        /**
         * Fired when an inline message edit is confirmed.
         */
        attachMessageEdit<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatFeed$MessageEditEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when an inline message edit is confirmed.
         */
        detachMessageEdit(fn: (event: ChatFeed$MessageEditEvent) => void, listener?: object): this;

        /**
         * Fired when an inline message edit is confirmed.
         */
        fireMessageEdit(parameters?: ChatFeed$MessageEditEventParameters): this;

        // event: messageDelete

        /**
         * Fired when a message delete action is pressed.
         */
        attachMessageDelete(fn: (event: ChatFeed$MessageDeleteEvent) => void, listener?: object): this;

        /**
         * Fired when a message delete action is pressed.
         */
        attachMessageDelete<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatFeed$MessageDeleteEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when a message delete action is pressed.
         */
        detachMessageDelete(fn: (event: ChatFeed$MessageDeleteEvent) => void, listener?: object): this;

        /**
         * Fired when a message delete action is pressed.
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
