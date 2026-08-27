import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./ChatMessage" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $ChatMessageSettings extends $ControlSettings {

        /**
         * Defines a stable application key for the message.
         */
        key?: string | PropertyBindingInfo;

        /**
         * Defines the message text.
         */
        text?: string | PropertyBindingInfo;

        /**
         * Defines the displayed sender name.
         */
        sender?: string | PropertyBindingInfo;

        /**
         * Defines whether this message belongs to the current user.
        
        Own messages are aligned to the end of the feed.
         */
        ownMessage?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether an edit action is displayed.
         */
        editable?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether a delete action is displayed.
         */
        deletable?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the message date and time.
        
        Date instances, ISO strings and numeric timestamps are
        supported.
         */
        timestamp?: any | PropertyBindingInfo | `{${string}}`;

        /**
         * Fired when an inline edit is confirmed.
         */
        editPress?: (event: ChatMessage$EditPressEvent) => void;

        /**
         * Fired when the delete action is pressed.
         */
        deletePress?: (event: ChatMessage$DeletePressEvent) => void;
    }

    export default interface ChatMessage {

        // property: key

        /**
         * Defines a stable application key for the message.
         */
        getKey(): string;

        /**
         * Defines a stable application key for the message.
         */
        setKey(key: string): this;

        // property: text

        /**
         * Defines the message text.
         */
        getText(): string;

        /**
         * Defines the message text.
         */
        setText(text: string): this;

        // property: sender

        /**
         * Defines the displayed sender name.
         */
        getSender(): string;

        /**
         * Defines the displayed sender name.
         */
        setSender(sender: string): this;

        // property: ownMessage

        /**
         * Defines whether this message belongs to the current user.
        
        Own messages are aligned to the end of the feed.
         */
        getOwnMessage(): boolean;

        /**
         * Defines whether this message belongs to the current user.
        
        Own messages are aligned to the end of the feed.
         */
        setOwnMessage(ownMessage: boolean): this;

        // property: editable

        /**
         * Defines whether an edit action is displayed.
         */
        getEditable(): boolean;

        /**
         * Defines whether an edit action is displayed.
         */
        setEditable(editable: boolean): this;

        // property: deletable

        /**
         * Defines whether a delete action is displayed.
         */
        getDeletable(): boolean;

        /**
         * Defines whether a delete action is displayed.
         */
        setDeletable(deletable: boolean): this;

        // property: timestamp

        /**
         * Defines the message date and time.
        
        Date instances, ISO strings and numeric timestamps are
        supported.
         */
        getTimestamp(): any;

        /**
         * Defines the message date and time.
        
        Date instances, ISO strings and numeric timestamps are
        supported.
         */
        setTimestamp(timestamp: any): this;

        // event: editPress

        /**
         * Fired when an inline edit is confirmed.
         */
        attachEditPress(fn: (event: ChatMessage$EditPressEvent) => void, listener?: object): this;

        /**
         * Fired when an inline edit is confirmed.
         */
        attachEditPress<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatMessage$EditPressEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when an inline edit is confirmed.
         */
        detachEditPress(fn: (event: ChatMessage$EditPressEvent) => void, listener?: object): this;

        /**
         * Fired when an inline edit is confirmed.
         */
        fireEditPress(parameters?: ChatMessage$EditPressEventParameters): this;

        // event: deletePress

        /**
         * Fired when the delete action is pressed.
         */
        attachDeletePress(fn: (event: ChatMessage$DeletePressEvent) => void, listener?: object): this;

        /**
         * Fired when the delete action is pressed.
         */
        attachDeletePress<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatMessage$DeletePressEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when the delete action is pressed.
         */
        detachDeletePress(fn: (event: ChatMessage$DeletePressEvent) => void, listener?: object): this;

        /**
         * Fired when the delete action is pressed.
         */
        fireDeletePress(parameters?: ChatMessage$DeletePressEventParameters): this;
    }

    /**
     * Interface describing the parameters of ChatMessage's 'editPress' event.
     * Fired when an inline edit is confirmed.
     */
    export interface ChatMessage$EditPressEventParameters {
        value?: string;
    }

    /**
     * Interface describing the parameters of ChatMessage's 'deletePress' event.
     * Fired when the delete action is pressed.
     */
    // eslint-disable-next-line
    export interface ChatMessage$DeletePressEventParameters {
    }

    /**
     * Type describing the ChatMessage's 'editPress' event.
     * Fired when an inline edit is confirmed.
     */
    export type ChatMessage$EditPressEvent = Event<ChatMessage$EditPressEventParameters>;

    /**
     * Type describing the ChatMessage's 'deletePress' event.
     * Fired when the delete action is pressed.
     */
    export type ChatMessage$DeletePressEvent = Event<ChatMessage$DeletePressEventParameters>;
}
