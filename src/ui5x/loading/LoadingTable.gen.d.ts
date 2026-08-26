import SkeletonRowMode from "ui5x/loading/SkeletonRowMode";
import Table from "sap/ui/table/Table";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./LoadingTable" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $LoadingTableSettings extends $ControlSettings {

        /**
         * Defines whether skeleton rows are displayed instead of
        the actual table.
         */
        loading?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the number of skeleton rows displayed while loading.
        
        In Fill mode, this value is used as the initial fallback before
        the available space can be measured.
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
         * Defines whether skeleton animations are enabled.
         */
        animated?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * The table containing the actual application data.
         */
        table?: Table;
    }

    export default interface LoadingTable {

        // property: loading

        /**
         * Defines whether skeleton rows are displayed instead of
        the actual table.
         */
        getLoading(): boolean;

        /**
         * Defines whether skeleton rows are displayed instead of
        the actual table.
         */
        setLoading(loading: boolean): this;

        // property: skeletonRows

        /**
         * Defines the number of skeleton rows displayed while loading.
        
        In Fill mode, this value is used as the initial fallback before
        the available space can be measured.
         */
        getSkeletonRows(): number;

        /**
         * Defines the number of skeleton rows displayed while loading.
        
        In Fill mode, this value is used as the initial fallback before
        the available space can be measured.
         */
        setSkeletonRows(skeletonRows: number): this;

        // property: maxSkeletonRows

        /**
         * Defines the maximum number of skeleton rows rendered when
        skeletonRowsMode is Fill.
         */
        getMaxSkeletonRows(): number;

        /**
         * Defines the maximum number of skeleton rows rendered when
        skeletonRowsMode is Fill.
         */
        setMaxSkeletonRows(maxSkeletonRows: number): this;

        // property: skeletonRowsMode

        /**
         * Defines how the number of skeleton rows is determined.
         */
        getSkeletonRowsMode(): SkeletonRowMode;

        /**
         * Defines how the number of skeleton rows is determined.
         */
        setSkeletonRowsMode(skeletonRowsMode: SkeletonRowMode): this;

        // property: dynamicSkeletonWidths

        /**
         * Defines whether skeleton cells use varying widths
        to produce a more natural loading appearance.
         */
        getDynamicSkeletonWidths(): boolean;

        /**
         * Defines whether skeleton cells use varying widths
        to produce a more natural loading appearance.
         */
        setDynamicSkeletonWidths(dynamicSkeletonWidths: boolean): this;

        // property: animated

        /**
         * Defines whether skeleton animations are enabled.
         */
        getAnimated(): boolean;

        /**
         * Defines whether skeleton animations are enabled.
         */
        setAnimated(animated: boolean): this;

        // aggregation: table

        /**
         * The table containing the actual application data.
         */
        getTable(): Table;

        /**
         * The table containing the actual application data.
         */
        setTable(table: Table): this;

        /**
         * The table containing the actual application data.
         */
        destroyTable(): this;
    }
}
