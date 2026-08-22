import SkeletonType from "ui5x/loading/SkeletonType";
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
         * Defines whether the container displays its loading placeholder
        instead of the content.
         */
        getLoading(): boolean;

        /**
         * Defines whether the container displays its loading placeholder
        instead of the content.
         */
        setLoading(loading: boolean): this;

        // property: skeletonType

        /**
         * Defines the type of the default skeleton placeholder.
        
        This property has no effect when a custom placeholder is provided.
         */
        getSkeletonType(): SkeletonType;

        /**
         * Defines the type of the default skeleton placeholder.
        
        This property has no effect when a custom placeholder is provided.
         */
        setSkeletonType(skeletonType: SkeletonType): this;

        // property: skeletonLines

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
        getSkeletonLines(): number;

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
        setSkeletonLines(skeletonLines: number): this;

        // aggregation: content

        /**
         * The actual content displayed when loading is false.
         */
        getContent(): Control;

        /**
         * The actual content displayed when loading is false.
         */
        setContent(content: Control): this;

        /**
         * The actual content displayed when loading is false.
         */
        destroyContent(): this;

        // aggregation: placeholder

        /**
         * Optional custom placeholder displayed while loading.
        
        When omitted, LoadingContainer uses its default Skeleton.
         */
        getPlaceholder(): Control;

        /**
         * Optional custom placeholder displayed while loading.
        
        When omitted, LoadingContainer uses its default Skeleton.
         */
        setPlaceholder(placeholder: Control): this;

        /**
         * Optional custom placeholder displayed while loading.
        
        When omitted, LoadingContainer uses its default Skeleton.
         */
        destroyPlaceholder(): this;
    }
}
