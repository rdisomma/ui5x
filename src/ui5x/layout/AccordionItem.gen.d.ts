import Event from "sap/ui/base/Event";
import Control from "sap/ui/core/Control";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./AccordionItem" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $AccordionItemSettings extends $ControlSettings {

        /**
         * Defines the text displayed in the item header.
         */
        title?: string | PropertyBindingInfo;

        /**
         * Defines whether the item content is expanded.
         */
        expanded?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the expanded state of the item can be changed.
        
        When set to false, the item keeps its current expanded state and
        overrides the parent Accordion's expansion-selection behavior.
        The item cannot be expanded or collapsed through user interaction
        or by Accordion coordination logic.
         */
        toggleable?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the item can be expanded or collapsed.
         */
        enabled?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Controls displayed inside the expandable content area.
         */
        content?: Control[] | Control | AggregationBindingInfo | `{${string}}`;

        /**
         * Fired when the expanded state changes through user interaction.
         */
        toggle?: (event: AccordionItem$ToggleEvent) => void;
    }

    export default interface AccordionItem {

        // property: title

        /**
         * Gets current value of property "title".
         *
         * Defines the text displayed in the item header.
         *
         * Default value is: ""
         * @returns Value of property "title"
         */
        getTitle(): string;

        /**
         * Sets a new value for property "title".
         *
         * Defines the text displayed in the item header.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [title=""] New value for property "title"
         * @returns Reference to "this" in order to allow method chaining
         */
        setTitle(title: string): this;

        // property: expanded

        /**
         * Gets current value of property "expanded".
         *
         * Defines whether the item content is expanded.
         *
         * Default value is: false
         * @returns Value of property "expanded"
         */
        getExpanded(): boolean;

        /**
         * Sets a new value for property "expanded".
         *
         * Defines whether the item content is expanded.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [expanded=false] New value for property "expanded"
         * @returns Reference to "this" in order to allow method chaining
         */
        setExpanded(expanded: boolean): this;

        // property: toggleable

        /**
         * Gets current value of property "toggleable".
         *
         * Defines whether the expanded state of the item can be changed.
        
        When set to false, the item keeps its current expanded state and
        overrides the parent Accordion's expansion-selection behavior.
        The item cannot be expanded or collapsed through user interaction
        or by Accordion coordination logic.
         *
         * Default value is: true
         * @returns Value of property "toggleable"
         */
        getToggleable(): boolean;

        /**
         * Sets a new value for property "toggleable".
         *
         * Defines whether the expanded state of the item can be changed.
        
        When set to false, the item keeps its current expanded state and
        overrides the parent Accordion's expansion-selection behavior.
        The item cannot be expanded or collapsed through user interaction
        or by Accordion coordination logic.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [toggleable=true] New value for property "toggleable"
         * @returns Reference to "this" in order to allow method chaining
         */
        setToggleable(toggleable: boolean): this;

        // property: enabled

        /**
         * Gets current value of property "enabled".
         *
         * Defines whether the item can be expanded or collapsed.
         *
         * Default value is: true
         * @returns Value of property "enabled"
         */
        getEnabled(): boolean;

        /**
         * Sets a new value for property "enabled".
         *
         * Defines whether the item can be expanded or collapsed.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [enabled=true] New value for property "enabled"
         * @returns Reference to "this" in order to allow method chaining
         */
        setEnabled(enabled: boolean): this;

        // aggregation: content

        /**
         * Gets content of aggregation "content".
         *
         * Controls displayed inside the expandable content area.
         */
        getContent(): Control[];

        /**
         * Adds some content to the aggregation "content".
         *
         * Controls displayed inside the expandable content area.
         *
         * @param content The content to add; if empty, nothing is inserted
         * @returns Reference to "this" in order to allow method chaining
         */
        addContent(content: Control): this;

        /**
         * Inserts a content into the aggregation "content".
         *
         * Controls displayed inside the expandable content area.
         *
         * @param content The content to insert; if empty, nothing is inserted
         * @param index The "0"-based index the content should be inserted at; for
         *              a negative value of "iIndex", the content is inserted at position 0; for a value
         *              greater than the current size of the aggregation, the content is inserted at
         *              the last position
         * @returns Reference to "this" in order to allow method chaining
         */
        insertContent(content: Control, index: number): this;

        /**
         * Removes a content from the aggregation "content".
         *
         * Controls displayed inside the expandable content area.
         *
         * @param content The content to remove or its index or id
         * @returns The removed content or "null"
         */
        removeContent(content: number | string | Control): Control | null;

        /**
         * Removes all the controls from the aggregation "content".
         * Additionally, it unregisters them from the hosting UIArea.
         *
         * Controls displayed inside the expandable content area.
         *
         * @returns  An array of the removed elements (might be empty)
         */
        removeAllContent(): Control[];

        /**
         * Checks for the provided "sap.ui.core.Control" in the aggregation "content".
         * and returns its index if found or -1 otherwise.
         *
         * Controls displayed inside the expandable content area.
         *
         * @param content The content whose index is looked for
         * @returns The index of the provided control in the aggregation if found, or -1 otherwise
         */
        indexOfContent(content: Control): number;

        /**
         * Destroys all the content in the aggregation "content".
         *
         * Controls displayed inside the expandable content area.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        destroyContent(): this;

        // event: toggle

        /**
         * Attaches event handler "fn" to the "toggle" event of this "AccordionItem".
         *
         * Fired when the expanded state changes through user interaction.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "AccordionItem" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "AccordionItem" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachToggle(fn: (event: AccordionItem$ToggleEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "toggle" event of this "AccordionItem".
         *
         * Fired when the expanded state changes through user interaction.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "AccordionItem" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "AccordionItem" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachToggle<CustomDataType extends object>(data: CustomDataType, fn: (event: AccordionItem$ToggleEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "toggle" event of this "AccordionItem".
         *
         * Fired when the expanded state changes through user interaction.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachToggle(fn: (event: AccordionItem$ToggleEvent) => void, listener?: object): this;

        /**
         * Fires event "toggle" to attached listeners.
         *
         * Fired when the expanded state changes through user interaction.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.expanded] Fired when the expanded state changes through user interaction.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireToggle(parameters?: AccordionItem$ToggleEventParameters): this;
    }

    /**
     * Interface describing the parameters of AccordionItem's 'toggle' event.
     * Fired when the expanded state changes through user interaction.
     */
    export interface AccordionItem$ToggleEventParameters {
        expanded?: boolean;
    }

    /**
     * Type describing the AccordionItem's 'toggle' event.
     * Fired when the expanded state changes through user interaction.
     */
    export type AccordionItem$ToggleEvent = Event<AccordionItem$ToggleEventParameters>;
}
