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
         * Defines a stable key identifying the item within its Accordion.
         */
        key?: string | PropertyBindingInfo;

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
         * Defines the text displayed in the item header.
         */
        getTitle(): string;

        /**
         * Defines the text displayed in the item header.
         */
        setTitle(title: string): this;

        // property: expanded

        /**
         * Defines whether the item content is expanded.
         */
        getExpanded(): boolean;

        /**
         * Defines whether the item content is expanded.
         */
        setExpanded(expanded: boolean): this;

        // property: toggleable

        /**
         * Defines whether the expanded state of the item can be changed.
        
        When set to false, the item keeps its current expanded state and
        overrides the parent Accordion's expansion-selection behavior.
        The item cannot be expanded or collapsed through user interaction
        or by Accordion coordination logic.
         */
        getToggleable(): boolean;

        /**
         * Defines whether the expanded state of the item can be changed.
        
        When set to false, the item keeps its current expanded state and
        overrides the parent Accordion's expansion-selection behavior.
        The item cannot be expanded or collapsed through user interaction
        or by Accordion coordination logic.
         */
        setToggleable(toggleable: boolean): this;

        // property: key

        /**
         * Defines a stable key identifying the item within its Accordion.
         */
        getKey(): string;

        /**
         * Defines a stable key identifying the item within its Accordion.
         */
        setKey(key: string): this;

        // property: enabled

        /**
         * Defines whether the item can be expanded or collapsed.
         */
        getEnabled(): boolean;

        /**
         * Defines whether the item can be expanded or collapsed.
         */
        setEnabled(enabled: boolean): this;

        // aggregation: content

        /**
         * Controls displayed inside the expandable content area.
         */
        getContent(): Control[];

        /**
         * Controls displayed inside the expandable content area.
         */
        addContent(content: Control): this;

        /**
         * Controls displayed inside the expandable content area.
         */
        insertContent(content: Control, index: number): this;

        /**
         * Controls displayed inside the expandable content area.
         */
        removeContent(content: number | string | Control): Control | null;

        /**
         * Controls displayed inside the expandable content area.
         */
        removeAllContent(): Control[];

        /**
         * Controls displayed inside the expandable content area.
         */
        indexOfContent(content: Control): number;

        /**
         * Controls displayed inside the expandable content area.
         */
        destroyContent(): this;

        // event: toggle

        /**
         * Fired when the expanded state changes through user interaction.
         */
        attachToggle(fn: (event: AccordionItem$ToggleEvent) => void, listener?: object): this;

        /**
         * Fired when the expanded state changes through user interaction.
         */
        attachToggle<CustomDataType extends object>(data: CustomDataType, fn: (event: AccordionItem$ToggleEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when the expanded state changes through user interaction.
         */
        detachToggle(fn: (event: AccordionItem$ToggleEvent) => void, listener?: object): this;

        /**
         * Fired when the expanded state changes through user interaction.
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
