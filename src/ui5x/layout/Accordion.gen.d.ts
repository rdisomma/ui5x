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
         * Defines whether multiple items can be expanded
        at the same time.
         */
        getMultipleExpansion(): boolean;

        /**
         * Defines whether multiple items can be expanded
        at the same time.
         */
        setMultipleExpansion(multipleExpansion: boolean): this;

        // property: expandedKeys

        /**
         * Defines the keys of the currently expanded items.
         */
        getExpandedKeys(): string[];

        /**
         * Defines the keys of the currently expanded items.
         */
        setExpandedKeys(expandedKeys: string[]): this;

        // property: width

        /**
         * Defines the width of the accordion.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         */
        getWidth(): CSSSize;

        /**
         * Defines the width of the accordion.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         */
        setWidth(width: CSSSize): this;

        // aggregation: items

        /**
         * Items displayed by the accordion.
         */
        getItems(): AccordionItem[];

        /**
         * Items displayed by the accordion.
         */
        addItem(items: AccordionItem): this;

        /**
         * Items displayed by the accordion.
         */
        insertItem(items: AccordionItem, index: number): this;

        /**
         * Items displayed by the accordion.
         */
        removeItem(items: number | string | AccordionItem): AccordionItem | null;

        /**
         * Items displayed by the accordion.
         */
        removeAllItems(): AccordionItem[];

        /**
         * Items displayed by the accordion.
         */
        indexOfItem(items: AccordionItem): number;

        /**
         * Items displayed by the accordion.
         */
        destroyItems(): this;

        // event: itemToggle

        /**
         * Fired when an item is expanded or collapsed
        through user interaction.
         */
        attachItemToggle(fn: (event: Accordion$ItemToggleEvent) => void, listener?: object): this;

        /**
         * Fired when an item is expanded or collapsed
        through user interaction.
         */
        attachItemToggle<CustomDataType extends object>(data: CustomDataType, fn: (event: Accordion$ItemToggleEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when an item is expanded or collapsed
        through user interaction.
         */
        detachItemToggle(fn: (event: Accordion$ItemToggleEvent) => void, listener?: object): this;

        /**
         * Fired when an item is expanded or collapsed
        through user interaction.
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
