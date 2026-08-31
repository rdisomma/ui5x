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
        edit?: (event: ChatMessage$EditEvent) => void;

        /**
         * Fired when the delete action is pressed.
         */
        delete?: (event: ChatMessage$DeleteEvent) => void;
    }

    export default interface ChatMessage {

        // property: key

        /**
         * Gets current value of property "key".
         *
         * Defines a stable application key for the message.
         *
         * Default value is: ""
         * @returns Value of property "key"
         */
        getKey(): string;

        /**
         * Sets a new value for property "key".
         *
         * Defines a stable application key for the message.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [key=""] New value for property "key"
         * @returns Reference to "this" in order to allow method chaining
         */
        setKey(key: string): this;

        // property: text

        /**
         * Gets current value of property "text".
         *
         * Defines the message text.
         *
         * Default value is: ""
         * @returns Value of property "text"
         */
        getText(): string;

        /**
         * Sets a new value for property "text".
         *
         * Defines the message text.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [text=""] New value for property "text"
         * @returns Reference to "this" in order to allow method chaining
         */
        setText(text: string): this;

        // property: sender

        /**
         * Gets current value of property "sender".
         *
         * Defines the displayed sender name.
         *
         * Default value is: ""
         * @returns Value of property "sender"
         */
        getSender(): string;

        /**
         * Sets a new value for property "sender".
         *
         * Defines the displayed sender name.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [sender=""] New value for property "sender"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSender(sender: string): this;

        // property: ownMessage

        /**
         * Gets current value of property "ownMessage".
         *
         * Defines whether this message belongs to the current user.
        
        Own messages are aligned to the end of the feed.
         *
         * Default value is: false
         * @returns Value of property "ownMessage"
         */
        getOwnMessage(): boolean;

        /**
         * Sets a new value for property "ownMessage".
         *
         * Defines whether this message belongs to the current user.
        
        Own messages are aligned to the end of the feed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [ownMessage=false] New value for property "ownMessage"
         * @returns Reference to "this" in order to allow method chaining
         */
        setOwnMessage(ownMessage: boolean): this;

        // property: editable

        /**
         * Gets current value of property "editable".
         *
         * Defines whether an edit action is displayed.
         *
         * Default value is: false
         * @returns Value of property "editable"
         */
        getEditable(): boolean;

        /**
         * Sets a new value for property "editable".
         *
         * Defines whether an edit action is displayed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [editable=false] New value for property "editable"
         * @returns Reference to "this" in order to allow method chaining
         */
        setEditable(editable: boolean): this;

        // property: deletable

        /**
         * Gets current value of property "deletable".
         *
         * Defines whether a delete action is displayed.
         *
         * Default value is: false
         * @returns Value of property "deletable"
         */
        getDeletable(): boolean;

        /**
         * Sets a new value for property "deletable".
         *
         * Defines whether a delete action is displayed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [deletable=false] New value for property "deletable"
         * @returns Reference to "this" in order to allow method chaining
         */
        setDeletable(deletable: boolean): this;

        // property: timestamp

        /**
         * Gets current value of property "timestamp".
         *
         * Defines the message date and time.
        
        Date instances, ISO strings and numeric timestamps are
        supported.
         *
         * @returns Value of property "timestamp"
         */
        getTimestamp(): any;

        /**
         * Sets a new value for property "timestamp".
         *
         * Defines the message date and time.
        
        Date instances, ISO strings and numeric timestamps are
        supported.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param timestamp New value for property "timestamp"
         * @returns Reference to "this" in order to allow method chaining
         */
        setTimestamp(timestamp: any): this;

        // event: edit

        /**
         * Attaches event handler "fn" to the "edit" event of this "ChatMessage".
         *
         * Fired when an inline edit is confirmed.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatMessage" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatMessage" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachEdit(fn: (event: ChatMessage$EditEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "edit" event of this "ChatMessage".
         *
         * Fired when an inline edit is confirmed.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatMessage" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatMessage" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachEdit<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatMessage$EditEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "edit" event of this "ChatMessage".
         *
         * Fired when an inline edit is confirmed.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachEdit(fn: (event: ChatMessage$EditEvent) => void, listener?: object): this;

        /**
         * Fires event "edit" to attached listeners.
         *
         * Fired when an inline edit is confirmed.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value] Fired when an inline edit is confirmed.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireEdit(parameters?: ChatMessage$EditEventParameters): this;

        // event: delete

        /**
         * Attaches event handler "fn" to the "delete" event of this "ChatMessage".
         *
         * Fired when the delete action is pressed.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatMessage" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatMessage" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachDelete(fn: (event: ChatMessage$DeleteEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "delete" event of this "ChatMessage".
         *
         * Fired when the delete action is pressed.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ChatMessage" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ChatMessage" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachDelete<CustomDataType extends object>(data: CustomDataType, fn: (event: ChatMessage$DeleteEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "delete" event of this "ChatMessage".
         *
         * Fired when the delete action is pressed.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachDelete(fn: (event: ChatMessage$DeleteEvent) => void, listener?: object): this;

        /**
         * Fires event "delete" to attached listeners.
         *
         * Fired when the delete action is pressed.
         *
         * @param parameters Parameters to pass along with the event
         * @returns Reference to "this" in order to allow method chaining
         */
        fireDelete(parameters?: ChatMessage$DeleteEventParameters): this;
    }

    /**
     * Interface describing the parameters of ChatMessage's 'edit' event.
     * Fired when an inline edit is confirmed.
     */
    export interface ChatMessage$EditEventParameters {
        value?: string;
    }

    /**
     * Interface describing the parameters of ChatMessage's 'delete' event.
     * Fired when the delete action is pressed.
     */
    // eslint-disable-next-line
    export interface ChatMessage$DeleteEventParameters {
    }

    /**
     * Type describing the ChatMessage's 'edit' event.
     * Fired when an inline edit is confirmed.
     */
    export type ChatMessage$EditEvent = Event<ChatMessage$EditEventParameters>;

    /**
     * Type describing the ChatMessage's 'delete' event.
     * Fired when the delete action is pressed.
     */
    export type ChatMessage$DeleteEvent = Event<ChatMessage$DeleteEventParameters>;
}
