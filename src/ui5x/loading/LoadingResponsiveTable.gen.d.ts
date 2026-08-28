import SkeletonRowMode from "ui5x/loading/SkeletonRowMode";
import { CSSSize } from "sap/ui/core/library";
import Table from "sap/m/Table";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./LoadingResponsiveTable" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $LoadingResponsiveTableSettings extends $ControlSettings {

        /**
         * Defines whether skeleton rows are displayed instead of
        the actual table.
         */
        loading?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the number of skeleton rows displayed while loading.
         */
        skeletonRows?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the maximum number of skeleton rows rendered when
        skeletonRowsMode is Fill.
         */
        maxSkeletonRows?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines how the number of skeleton rows is determined.
         */
        skeletonRowsMode?: SkeletonRowMode | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether skeleton cells use varying widths
        to produce a more natural loading appearance.
         */
        dynamicSkeletonWidths?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the height of every skeleton row.
        
        sap.m.Table sizes its rows on their content, so skeleton rows
        are shorter than rows carrying real data and the table grows
        when the data arrives. Set this to the height the application
        rows end up with to keep the two identical. An empty value
        leaves the rows content-driven.
         */
        skeletonRowHeight?: CSSSize | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether skeleton animations are enabled.
         */
        animated?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * The responsive table containing the actual application data.
         */
        table?: Table;
    }

    export default interface LoadingResponsiveTable {

        // property: loading

        /**
         * Gets current value of property "loading".
         *
         * Defines whether skeleton rows are displayed instead of
        the actual table.
         *
         * Default value is: false
         * @returns Value of property "loading"
         */
        getLoading(): boolean;

        /**
         * Sets a new value for property "loading".
         *
         * Defines whether skeleton rows are displayed instead of
        the actual table.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [loading=false] New value for property "loading"
         * @returns Reference to "this" in order to allow method chaining
         */
        setLoading(loading: boolean): this;

        // property: skeletonRows

        /**
         * Gets current value of property "skeletonRows".
         *
         * Defines the number of skeleton rows displayed while loading.
         *
         * Default value is: 5
         * @returns Value of property "skeletonRows"
         */
        getSkeletonRows(): number;

        /**
         * Sets a new value for property "skeletonRows".
         *
         * Defines the number of skeleton rows displayed while loading.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: 5
         * @param [skeletonRows=5] New value for property "skeletonRows"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSkeletonRows(skeletonRows: number): this;

        // property: maxSkeletonRows

        /**
         * Gets current value of property "maxSkeletonRows".
         *
         * Defines the maximum number of skeleton rows rendered when
        skeletonRowsMode is Fill.
         *
         * Default value is: 10
         * @returns Value of property "maxSkeletonRows"
         */
        getMaxSkeletonRows(): number;

        /**
         * Sets a new value for property "maxSkeletonRows".
         *
         * Defines the maximum number of skeleton rows rendered when
        skeletonRowsMode is Fill.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: 10
         * @param [maxSkeletonRows=10] New value for property "maxSkeletonRows"
         * @returns Reference to "this" in order to allow method chaining
         */
        setMaxSkeletonRows(maxSkeletonRows: number): this;

        // property: skeletonRowsMode

        /**
         * Gets current value of property "skeletonRowsMode".
         *
         * Defines how the number of skeleton rows is determined.
         *
         * Default value is: "SkeletonRowMode.Fixed"
         * @returns Value of property "skeletonRowsMode"
         */
        getSkeletonRowsMode(): SkeletonRowMode;

        /**
         * Sets a new value for property "skeletonRowsMode".
         *
         * Defines how the number of skeleton rows is determined.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "SkeletonRowMode.Fixed"
         * @param [skeletonRowsMode="SkeletonRowMode.Fixed"] New value for property "skeletonRowsMode"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSkeletonRowsMode(skeletonRowsMode: SkeletonRowMode): this;

        // property: dynamicSkeletonWidths

        /**
         * Gets current value of property "dynamicSkeletonWidths".
         *
         * Defines whether skeleton cells use varying widths
        to produce a more natural loading appearance.
         *
         * Default value is: false
         * @returns Value of property "dynamicSkeletonWidths"
         */
        getDynamicSkeletonWidths(): boolean;

        /**
         * Sets a new value for property "dynamicSkeletonWidths".
         *
         * Defines whether skeleton cells use varying widths
        to produce a more natural loading appearance.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [dynamicSkeletonWidths=false] New value for property "dynamicSkeletonWidths"
         * @returns Reference to "this" in order to allow method chaining
         */
        setDynamicSkeletonWidths(dynamicSkeletonWidths: boolean): this;

        // property: skeletonRowHeight

        /**
         * Gets current value of property "skeletonRowHeight".
         *
         * Defines the height of every skeleton row.
        
        sap.m.Table sizes its rows on their content, so skeleton rows
        are shorter than rows carrying real data and the table grows
        when the data arrives. Set this to the height the application
        rows end up with to keep the two identical. An empty value
        leaves the rows content-driven.
         *
         * Default value is: ""
         * @returns Value of property "skeletonRowHeight"
         */
        getSkeletonRowHeight(): CSSSize;

        /**
         * Sets a new value for property "skeletonRowHeight".
         *
         * Defines the height of every skeleton row.
        
        sap.m.Table sizes its rows on their content, so skeleton rows
        are shorter than rows carrying real data and the table grows
        when the data arrives. Set this to the height the application
        rows end up with to keep the two identical. An empty value
        leaves the rows content-driven.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [skeletonRowHeight=""] New value for property "skeletonRowHeight"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSkeletonRowHeight(skeletonRowHeight: CSSSize): this;

        // property: animated

        /**
         * Gets current value of property "animated".
         *
         * Defines whether skeleton animations are enabled.
         *
         * Default value is: true
         * @returns Value of property "animated"
         */
        getAnimated(): boolean;

        /**
         * Sets a new value for property "animated".
         *
         * Defines whether skeleton animations are enabled.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [animated=true] New value for property "animated"
         * @returns Reference to "this" in order to allow method chaining
         */
        setAnimated(animated: boolean): this;

        // aggregation: table

        /**
         * Gets content of aggregation "table".
         *
         * The responsive table containing the actual application data.
         */
        getTable(): Table;

        /**
         * Sets the aggregated table.
         *
         * The responsive table containing the actual application data.
         *
         * @param table The table to set
         * @returns Reference to "this" in order to allow method chaining
         */
        setTable(table: Table): this;

        /**
         * Destroys the table in the aggregation "table".
         *
         * The responsive table containing the actual application data.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        destroyTable(): this;
    }
}
