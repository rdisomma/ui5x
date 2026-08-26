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
         * Defines the value copied to the system clipboard
        when the button is pressed.
         */
        getValue(): string;

        /**
         * Defines the value copied to the system clipboard
        when the button is pressed.
         */
        setValue(value: string): this;

        // property: successIcon

        /**
         * Defines the icon temporarily displayed after the value has been
        successfully copied to the system clipboard.
        
        When empty, the button icon is not changed.
         */
        getSuccessIcon(): URI;

        /**
         * Defines the icon temporarily displayed after the value has been
        successfully copied to the system clipboard.
        
        When empty, the button icon is not changed.
         */
        setSuccessIcon(successIcon: URI): this;

        // property: successText

        /**
         * Defines the temporary text displayed after the value has been
        successfully copied to the system clipboard.
        
        The success text is shown only when the button already has a
        non-empty text value. For icon-only buttons, this property is
        ignored and only the success icon is displayed.
        
        When empty, the button text is not changed.
         */
        getSuccessText(): string;

        /**
         * Defines the temporary text displayed after the value has been
        successfully copied to the system clipboard.
        
        The success text is shown only when the button already has a
        non-empty text value. For icon-only buttons, this property is
        ignored and only the success icon is displayed.
        
        When empty, the button text is not changed.
         */
        setSuccessText(successText: string): this;

        // property: successType

        /**
         * Defines the button type temporarily applied after the value has been
        successfully copied to the system clipboard.
        
        When not explicitly set, the current button type is preserved.
         */
        getSuccessType(): ButtonType;

        /**
         * Defines the button type temporarily applied after the value has been
        successfully copied to the system clipboard.
        
        When not explicitly set, the current button type is preserved.
         */
        setSuccessType(successType: ButtonType): this;
    }
}
