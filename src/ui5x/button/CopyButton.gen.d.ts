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
    }
}
