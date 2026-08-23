import { CSSSize } from "sap/ui/core/library";
import SkeletonType from "ui5x/loading/SkeletonType";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./Skeleton" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $SkeletonSettings extends $ControlSettings {

        /**
         * Defines the width of the skeleton.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         */
        width?: CSSSize | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the visual shape of the skeleton.
         */
        type?: SkeletonType | PropertyBindingInfo | `{${string}}`;

        /**
         * /**
                     * Defines the number of placeholder lines.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Line}
        .
                     *
                     * Valid values are between 1 and 3.
         */
        lines?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the loading animation is enabled.
        
        The animation is automatically disabled when the user's
        operating system requests reduced motion.
         */
        animated?: boolean | PropertyBindingInfo | `{${string}}`;
    }

    export default interface Skeleton {

        // property: width

        /**
         * Gets current value of property "width".
         *
         * Defines the width of the skeleton.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         *
         * @returns Value of property "width"
         */
        getWidth(): CSSSize;

        /**
         * Sets a new value for property "width".
         *
         * Defines the width of the skeleton.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param width New value for property "width"
         * @returns Reference to "this" in order to allow method chaining
         */
        setWidth(width: CSSSize): this;

        // property: type

        /**
         * Gets current value of property "type".
         *
         * Defines the visual shape of the skeleton.
         *
         * Default value is: "SkeletonType.Line"
         * @returns Value of property "type"
         */
        getType(): SkeletonType;

        /**
         * Sets a new value for property "type".
         *
         * Defines the visual shape of the skeleton.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "SkeletonType.Line"
         * @param [type="SkeletonType.Line"] New value for property "type"
         * @returns Reference to "this" in order to allow method chaining
         */
        setType(type: SkeletonType): this;

        // property: lines

        /**
         * Gets current value of property "lines".
         *
         * /**
                     * Defines the number of placeholder lines.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Line}
        .
                     *
                     * Valid values are between 1 and 3.
         *
         * Default value is: 1
         * @returns Value of property "lines"
         */
        getLines(): number;

        /**
         * Sets a new value for property "lines".
         *
         * /**
                     * Defines the number of placeholder lines.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Line}
        .
                     *
                     * Valid values are between 1 and 3.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: 1
         * @param [lines=1] New value for property "lines"
         * @returns Reference to "this" in order to allow method chaining
         */
        setLines(lines: number): this;

        // property: animated

        /**
         * Gets current value of property "animated".
         *
         * Defines whether the loading animation is enabled.
        
        The animation is automatically disabled when the user's
        operating system requests reduced motion.
         *
         * Default value is: true
         * @returns Value of property "animated"
         */
        getAnimated(): boolean;

        /**
         * Sets a new value for property "animated".
         *
         * Defines whether the loading animation is enabled.
        
        The animation is automatically disabled when the user's
        operating system requests reduced motion.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [animated=true] New value for property "animated"
         * @returns Reference to "this" in order to allow method chaining
         */
        setAnimated(animated: boolean): this;
    }
}
