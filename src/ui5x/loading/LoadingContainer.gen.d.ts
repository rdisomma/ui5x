import SkeletonType from "ui5x/loading/SkeletonType";
import { CSSSize } from "sap/ui/core/library";
import Control from "sap/ui/core/Control";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./LoadingContainer" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $LoadingContainerSettings extends $ControlSettings {

        /**
         * Defines whether the container displays its loading placeholder
        instead of the content.
         */
        loading?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the type of the default skeleton placeholder.
        
        This property has no effect when a custom placeholder is provided.
         */
        skeletonType?: SkeletonType | PropertyBindingInfo | `{${string}}`;

        /**
         * /**
                     * Defines the number of lines displayed by the default skeleton placeholder.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Line}
         and has no effect when a custom
                     * placeholder is provided.
                     *
                     * Valid values are between 1 and 3.
         */
        skeletonLines?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the width of the container.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         */
        width?: CSSSize | PropertyBindingInfo | `{${string}}`;

        /**
         * /**
                     * Defines the height of the default skeleton placeholder.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Rectangle}
         and has no effect
                     * when a custom placeholder is provided: a line takes its height
                     * from skeletonLines, and a circle from its width.
         */
        skeletonHeight?: CSSSize | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the default skeleton placeholder animates.
        
        The animation is automatically disabled when the user's
        operating system requests reduced motion, and this property has
        no effect when a custom placeholder is provided.
         */
        animated?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * The actual content displayed when loading is false.
         */
        content?: Control;

        /**
         * Optional custom placeholder displayed while loading.
        
        When omitted, LoadingContainer uses its default Skeleton.
         */
        placeholder?: Control;
    }

    export default interface LoadingContainer {

        // property: loading

        /**
         * Gets current value of property "loading".
         *
         * Defines whether the container displays its loading placeholder
        instead of the content.
         *
         * Default value is: false
         * @returns Value of property "loading"
         */
        getLoading(): boolean;

        /**
         * Sets a new value for property "loading".
         *
         * Defines whether the container displays its loading placeholder
        instead of the content.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [loading=false] New value for property "loading"
         * @returns Reference to "this" in order to allow method chaining
         */
        setLoading(loading: boolean): this;

        // property: skeletonType

        /**
         * Gets current value of property "skeletonType".
         *
         * Defines the type of the default skeleton placeholder.
        
        This property has no effect when a custom placeholder is provided.
         *
         * Default value is: "SkeletonType.Line"
         * @returns Value of property "skeletonType"
         */
        getSkeletonType(): SkeletonType;

        /**
         * Sets a new value for property "skeletonType".
         *
         * Defines the type of the default skeleton placeholder.
        
        This property has no effect when a custom placeholder is provided.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "SkeletonType.Line"
         * @param [skeletonType="SkeletonType.Line"] New value for property "skeletonType"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSkeletonType(skeletonType: SkeletonType): this;

        // property: skeletonLines

        /**
         * Gets current value of property "skeletonLines".
         *
         * /**
                     * Defines the number of lines displayed by the default skeleton placeholder.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Line}
         and has no effect when a custom
                     * placeholder is provided.
                     *
                     * Valid values are between 1 and 3.
         *
         * Default value is: 1
         * @returns Value of property "skeletonLines"
         */
        getSkeletonLines(): number;

        /**
         * Sets a new value for property "skeletonLines".
         *
         * /**
                     * Defines the number of lines displayed by the default skeleton placeholder.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Line}
         and has no effect when a custom
                     * placeholder is provided.
                     *
                     * Valid values are between 1 and 3.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: 1
         * @param [skeletonLines=1] New value for property "skeletonLines"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSkeletonLines(skeletonLines: number): this;

        // property: width

        /**
         * Gets current value of property "width".
         *
         * Defines the width of the container.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         *
         * @returns Value of property "width"
         */
        getWidth(): CSSSize;

        /**
         * Sets a new value for property "width".
         *
         * Defines the width of the container.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param width New value for property "width"
         * @returns Reference to "this" in order to allow method chaining
         */
        setWidth(width: CSSSize): this;

        // property: skeletonHeight

        /**
         * Gets current value of property "skeletonHeight".
         *
         * /**
                     * Defines the height of the default skeleton placeholder.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Rectangle}
         and has no effect
                     * when a custom placeholder is provided: a line takes its height
                     * from skeletonLines, and a circle from its width.
         *
         * @returns Value of property "skeletonHeight"
         */
        getSkeletonHeight(): CSSSize;

        /**
         * Sets a new value for property "skeletonHeight".
         *
         * /**
                     * Defines the height of the default skeleton placeholder.
                     *
                     * This property only affects skeletons of type
                     *
        {@link ui5x.loading.SkeletonType.Rectangle}
         and has no effect
                     * when a custom placeholder is provided: a line takes its height
                     * from skeletonLines, and a circle from its width.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param skeletonHeight New value for property "skeletonHeight"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSkeletonHeight(skeletonHeight: CSSSize): this;

        // property: animated

        /**
         * Gets current value of property "animated".
         *
         * Defines whether the default skeleton placeholder animates.
        
        The animation is automatically disabled when the user's
        operating system requests reduced motion, and this property has
        no effect when a custom placeholder is provided.
         *
         * Default value is: true
         * @returns Value of property "animated"
         */
        getAnimated(): boolean;

        /**
         * Sets a new value for property "animated".
         *
         * Defines whether the default skeleton placeholder animates.
        
        The animation is automatically disabled when the user's
        operating system requests reduced motion, and this property has
        no effect when a custom placeholder is provided.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [animated=true] New value for property "animated"
         * @returns Reference to "this" in order to allow method chaining
         */
        setAnimated(animated: boolean): this;

        // aggregation: content

        /**
         * Gets content of aggregation "content".
         *
         * The actual content displayed when loading is false.
         */
        getContent(): Control;

        /**
         * Sets the aggregated content.
         *
         * The actual content displayed when loading is false.
         *
         * @param content The content to set
         * @returns Reference to "this" in order to allow method chaining
         */
        setContent(content: Control): this;

        /**
         * Destroys the content in the aggregation "content".
         *
         * The actual content displayed when loading is false.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        destroyContent(): this;

        // aggregation: placeholder

        /**
         * Gets content of aggregation "placeholder".
         *
         * Optional custom placeholder displayed while loading.
        
        When omitted, LoadingContainer uses its default Skeleton.
         */
        getPlaceholder(): Control;

        /**
         * Sets the aggregated placeholder.
         *
         * Optional custom placeholder displayed while loading.
        
        When omitted, LoadingContainer uses its default Skeleton.
         *
         * @param placeholder The placeholder to set
         * @returns Reference to "this" in order to allow method chaining
         */
        setPlaceholder(placeholder: Control): this;

        /**
         * Destroys the placeholder in the aggregation "placeholder".
         *
         * Optional custom placeholder displayed while loading.
        
        When omitted, LoadingContainer uses its default Skeleton.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        destroyPlaceholder(): this;
    }
}
