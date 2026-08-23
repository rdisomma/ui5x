import AccordionItem from "ui5x/layout/AccordionItem";
import Event from "sap/ui/base/Event";
import { CSSSize } from "sap/ui/core/library";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./Accordion" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $AccordionSettings extends $ControlSettings {

        /**
         * Defines whether multiple items can be expanded
        at the same time.
         */
        multipleExpansion?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the keys of the currently expanded items.
         */
        expandedKeys?: string[] | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the width of the accordion.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         */
        width?: CSSSize | PropertyBindingInfo | `{${string}}`;

        /**
         * Items displayed by the accordion.
         */
        items?: AccordionItem[] | AccordionItem | AggregationBindingInfo | `{${string}}`;

        /**
         * Fired when an item is expanded or collapsed
        through user interaction.
         */
        itemToggle?: (event: Accordion$ItemToggleEvent) => void;
    }

    export default interface Accordion {

        // property: multipleExpansion

        /**
         * Gets current value of property "multipleExpansion".
         *
         * Defines whether multiple items can be expanded
        at the same time.
         *
         * Default value is: false
         * @returns Value of property "multipleExpansion"
         */
        getMultipleExpansion(): boolean;

        /**
         * Sets a new value for property "multipleExpansion".
         *
         * Defines whether multiple items can be expanded
        at the same time.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [multipleExpansion=false] New value for property "multipleExpansion"
         * @returns Reference to "this" in order to allow method chaining
         */
        setMultipleExpansion(multipleExpansion: boolean): this;

        // property: expandedKeys

        /**
         * Gets current value of property "expandedKeys".
         *
         * Defines the keys of the currently expanded items.
         *
         * Default value is: []
         * @returns Value of property "expandedKeys"
         */
        getExpandedKeys(): string[];

        /**
         * Sets a new value for property "expandedKeys".
         *
         * Defines the keys of the currently expanded items.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: []
         * @param [expandedKeys=[]] New value for property "expandedKeys"
         * @returns Reference to "this" in order to allow method chaining
         */
        setExpandedKeys(expandedKeys: string[]): this;

        // property: width

        /**
         * Gets current value of property "width".
         *
         * Defines the width of the accordion.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         *
         * @returns Value of property "width"
         */
        getWidth(): CSSSize;

        /**
         * Sets a new value for property "width".
         *
         * Defines the width of the accordion.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param width New value for property "width"
         * @returns Reference to "this" in order to allow method chaining
         */
        setWidth(width: CSSSize): this;

        // aggregation: items

        /**
         * Gets content of aggregation "items".
         *
         * Items displayed by the accordion.
         */
        getItems(): AccordionItem[];

        /**
         * Adds some item to the aggregation "items".
         *
         * Items displayed by the accordion.
         *
         * @param item The item to add; if empty, nothing is inserted
         * @returns Reference to "this" in order to allow method chaining
         */
        addItem(items: AccordionItem): this;

        /**
         * Inserts a item into the aggregation "items".
         *
         * Items displayed by the accordion.
         *
         * @param item The item to insert; if empty, nothing is inserted
         * @param index The "0"-based index the item should be inserted at; for
         *              a negative value of "iIndex", the item is inserted at position 0; for a value
         *              greater than the current size of the aggregation, the item is inserted at
         *              the last position
         * @returns Reference to "this" in order to allow method chaining
         */
        insertItem(items: AccordionItem, index: number): this;

        /**
         * Removes a item from the aggregation "items".
         *
         * Items displayed by the accordion.
         *
         * @param item The item to remove or its index or id
         * @returns The removed item or "null"
         */
        removeItem(items: number | string | AccordionItem): AccordionItem | null;

        /**
         * Removes all the controls from the aggregation "items".
         * Additionally, it unregisters them from the hosting UIArea.
         *
         * Items displayed by the accordion.
         *
         * @returns  An array of the removed elements (might be empty)
         */
        removeAllItems(): AccordionItem[];

        /**
         * Checks for the provided "ui5x.layout.AccordionItem" in the aggregation "items".
         * and returns its index if found or -1 otherwise.
         *
         * Items displayed by the accordion.
         *
         * @param item The item whose index is looked for
         * @returns The index of the provided control in the aggregation if found, or -1 otherwise
         */
        indexOfItem(items: AccordionItem): number;

        /**
         * Destroys all the items in the aggregation "items".
         *
         * Items displayed by the accordion.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        destroyItems(): this;

        // event: itemToggle

        /**
         * Attaches event handler "fn" to the "itemToggle" event of this "Accordion".
         *
         * Fired when an item is expanded or collapsed
        through user interaction.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "Accordion" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "Accordion" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachItemToggle(fn: (event: Accordion$ItemToggleEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "itemToggle" event of this "Accordion".
         *
         * Fired when an item is expanded or collapsed
        through user interaction.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "Accordion" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "Accordion" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachItemToggle<CustomDataType extends object>(data: CustomDataType, fn: (event: Accordion$ItemToggleEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "itemToggle" event of this "Accordion".
         *
         * Fired when an item is expanded or collapsed
        through user interaction.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachItemToggle(fn: (event: Accordion$ItemToggleEvent) => void, listener?: object): this;

        /**
         * Fires event "itemToggle" to attached listeners.
         *
         * Fired when an item is expanded or collapsed
        through user interaction.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.item] Fired when an item is expanded or collapsed
        through user interaction.
         * @param [mParameters.expanded] Fired when an item is expanded or collapsed
        through user interaction.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireItemToggle(parameters?: Accordion$ItemToggleEventParameters): this;
    }

    /**
     * Interface describing the parameters of Accordion's 'itemToggle' event.
     * Fired when an item is expanded or collapsed
    through user interaction.
     */
    export interface Accordion$ItemToggleEventParameters {
        item?: AccordionItem;
        expanded?: boolean;
    }

    /**
     * Type describing the Accordion's 'itemToggle' event.
     * Fired when an item is expanded or collapsed
    through user interaction.
     */
    export type Accordion$ItemToggleEvent = Event<Accordion$ItemToggleEventParameters>;
}
