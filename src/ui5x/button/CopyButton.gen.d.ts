import Event from "sap/ui/base/Event";
import { URI } from "sap/ui/core/library";
import { ButtonType } from "sap/m/library";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ButtonSettings } from "sap/m/Button";

declare module "./CopyButton" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $CopyButtonSettings extends $ButtonSettings {

        /**
         * Defines the value copied to the system clipboard
        when the button is pressed.
         */
        value?: string | PropertyBindingInfo;

        /**
         * Defines the icon temporarily displayed after the value has been
        successfully copied to the system clipboard.
        
        When empty, the button icon is not changed.
         */
        successIcon?: URI | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the temporary text displayed after the value has been
        successfully copied to the system clipboard.
        
        The success text is shown only when the button already has a
        non-empty text value. For icon-only buttons, this property is
        ignored and only the success icon is displayed.
        
        When empty, the button text is not changed.
         */
        successText?: string | PropertyBindingInfo;

        /**
         * Defines the button type temporarily applied after the value has been
        successfully copied to the system clipboard.
        
        When not explicitly set, the current button type is preserved.
         */
        successType?: ButtonType | PropertyBindingInfo | `{${string}}`;

        /**
         * Fired after the value has reached the system clipboard.
        
        The press event only says the button was pressed. The write that
        follows is asynchronous and can fail, so an application that
        reports the outcome listens here instead.
         */
        copySuccess?: (event: CopyButton$CopySuccessEvent) => void;

        /**
         * Fired when the value could not be written to the clipboard,
        which happens on an insecure origin, without permission, or
        where the browser exposes no Clipboard API at all.
         */
        copyError?: (event: CopyButton$CopyErrorEvent) => void;
    }

    export default interface CopyButton {

        // property: value

        /**
         * Gets current value of property "value".
         *
         * Defines the value copied to the system clipboard
        when the button is pressed.
         *
         * Default value is: ""
         * @returns Value of property "value"
         */
        getValue(): string;

        /**
         * Sets a new value for property "value".
         *
         * Defines the value copied to the system clipboard
        when the button is pressed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [value=""] New value for property "value"
         * @returns Reference to "this" in order to allow method chaining
         */
        setValue(value: string): this;

        // property: successIcon

        /**
         * Gets current value of property "successIcon".
         *
         * Defines the icon temporarily displayed after the value has been
        successfully copied to the system clipboard.
        
        When empty, the button icon is not changed.
         *
         * Default value is: "sap-icon://accept"
         * @returns Value of property "successIcon"
         */
        getSuccessIcon(): URI;

        /**
         * Sets a new value for property "successIcon".
         *
         * Defines the icon temporarily displayed after the value has been
        successfully copied to the system clipboard.
        
        When empty, the button icon is not changed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "sap-icon://accept"
         * @param [successIcon="sap-icon://accept"] New value for property "successIcon"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSuccessIcon(successIcon: URI): this;

        // property: successText

        /**
         * Gets current value of property "successText".
         *
         * Defines the temporary text displayed after the value has been
        successfully copied to the system clipboard.
        
        The success text is shown only when the button already has a
        non-empty text value. For icon-only buttons, this property is
        ignored and only the success icon is displayed.
        
        When empty, the button text is not changed.
         *
         * Default value is: ""
         * @returns Value of property "successText"
         */
        getSuccessText(): string;

        /**
         * Sets a new value for property "successText".
         *
         * Defines the temporary text displayed after the value has been
        successfully copied to the system clipboard.
        
        The success text is shown only when the button already has a
        non-empty text value. For icon-only buttons, this property is
        ignored and only the success icon is displayed.
        
        When empty, the button text is not changed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [successText=""] New value for property "successText"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSuccessText(successText: string): this;

        // property: successType

        /**
         * Gets current value of property "successType".
         *
         * Defines the button type temporarily applied after the value has been
        successfully copied to the system clipboard.
        
        When not explicitly set, the current button type is preserved.
         *
         * Default value is: "ButtonType.Default"
         * @returns Value of property "successType"
         */
        getSuccessType(): ButtonType;

        /**
         * Sets a new value for property "successType".
         *
         * Defines the button type temporarily applied after the value has been
        successfully copied to the system clipboard.
        
        When not explicitly set, the current button type is preserved.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "ButtonType.Default"
         * @param [successType="ButtonType.Default"] New value for property "successType"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSuccessType(successType: ButtonType): this;

        // event: copySuccess

        /**
         * Attaches event handler "fn" to the "copySuccess" event of this "CopyButton".
         *
         * Fired after the value has reached the system clipboard.
        
        The press event only says the button was pressed. The write that
        follows is asynchronous and can fail, so an application that
        reports the outcome listens here instead.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "CopyButton" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "CopyButton" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachCopySuccess(fn: (event: CopyButton$CopySuccessEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "copySuccess" event of this "CopyButton".
         *
         * Fired after the value has reached the system clipboard.
        
        The press event only says the button was pressed. The write that
        follows is asynchronous and can fail, so an application that
        reports the outcome listens here instead.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "CopyButton" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "CopyButton" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachCopySuccess<CustomDataType extends object>(data: CustomDataType, fn: (event: CopyButton$CopySuccessEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "copySuccess" event of this "CopyButton".
         *
         * Fired after the value has reached the system clipboard.
        
        The press event only says the button was pressed. The write that
        follows is asynchronous and can fail, so an application that
        reports the outcome listens here instead.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachCopySuccess(fn: (event: CopyButton$CopySuccessEvent) => void, listener?: object): this;

        /**
         * Fires event "copySuccess" to attached listeners.
         *
         * Fired after the value has reached the system clipboard.
        
        The press event only says the button was pressed. The write that
        follows is asynchronous and can fail, so an application that
        reports the outcome listens here instead.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value] Fired after the value has reached the system clipboard.
        
        The press event only says the button was pressed. The write that
        follows is asynchronous and can fail, so an application that
        reports the outcome listens here instead.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireCopySuccess(parameters?: CopyButton$CopySuccessEventParameters): this;

        // event: copyError

        /**
         * Attaches event handler "fn" to the "copyError" event of this "CopyButton".
         *
         * Fired when the value could not be written to the clipboard,
        which happens on an insecure origin, without permission, or
        where the browser exposes no Clipboard API at all.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "CopyButton" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "CopyButton" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachCopyError(fn: (event: CopyButton$CopyErrorEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "copyError" event of this "CopyButton".
         *
         * Fired when the value could not be written to the clipboard,
        which happens on an insecure origin, without permission, or
        where the browser exposes no Clipboard API at all.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "CopyButton" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "CopyButton" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachCopyError<CustomDataType extends object>(data: CustomDataType, fn: (event: CopyButton$CopyErrorEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "copyError" event of this "CopyButton".
         *
         * Fired when the value could not be written to the clipboard,
        which happens on an insecure origin, without permission, or
        where the browser exposes no Clipboard API at all.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachCopyError(fn: (event: CopyButton$CopyErrorEvent) => void, listener?: object): this;

        /**
         * Fires event "copyError" to attached listeners.
         *
         * Fired when the value could not be written to the clipboard,
        which happens on an insecure origin, without permission, or
        where the browser exposes no Clipboard API at all.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value] Fired when the value could not be written to the clipboard,
        which happens on an insecure origin, without permission, or
        where the browser exposes no Clipboard API at all.
         * @param [mParameters.reason] Fired when the value could not be written to the clipboard,
        which happens on an insecure origin, without permission, or
        where the browser exposes no Clipboard API at all.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireCopyError(parameters?: CopyButton$CopyErrorEventParameters): this;
    }

    /**
     * Interface describing the parameters of CopyButton's 'copySuccess' event.
     * Fired after the value has reached the system clipboard.
    
    The press event only says the button was pressed. The write that
    follows is asynchronous and can fail, so an application that
    reports the outcome listens here instead.
     */
    export interface CopyButton$CopySuccessEventParameters {
        value?: string;
    }

    /**
     * Interface describing the parameters of CopyButton's 'copyError' event.
     * Fired when the value could not be written to the clipboard,
    which happens on an insecure origin, without permission, or
    where the browser exposes no Clipboard API at all.
     */
    export interface CopyButton$CopyErrorEventParameters {
        value?: string;
        reason?: string;
    }

    /**
     * Type describing the CopyButton's 'copySuccess' event.
     * Fired after the value has reached the system clipboard.
    
    The press event only says the button was pressed. The write that
    follows is asynchronous and can fail, so an application that
    reports the outcome listens here instead.
     */
    export type CopyButton$CopySuccessEvent = Event<CopyButton$CopySuccessEventParameters>;

    /**
     * Type describing the CopyButton's 'copyError' event.
     * Fired when the value could not be written to the clipboard,
    which happens on an insecure origin, without permission, or
    where the browser exposes no Clipboard API at all.
     */
    export type CopyButton$CopyErrorEvent = Event<CopyButton$CopyErrorEventParameters>;
}
