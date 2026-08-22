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
         * Defines the width of the skeleton.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         */
        getWidth(): CSSSize;

        /**
         * Defines the width of the skeleton.
        
        Accepts any valid UI5 CSSSize value, such as
        "100%", "20rem" or "320px".
         */
        setWidth(width: CSSSize): this;

        // property: type

        /**
         * Defines the visual shape of the skeleton.
         */
        getType(): SkeletonType;

        /**
         * Defines the visual shape of the skeleton.
         */
        setType(type: SkeletonType): this;

        // property: lines

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
        getLines(): number;

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
        setLines(lines: number): this;

        // property: animated

        /**
         * Defines whether the loading animation is enabled.
        
        The animation is automatically disabled when the user's
        operating system requests reduced motion.
         */
        getAnimated(): boolean;

        /**
         * Defines whether the loading animation is enabled.
        
        The animation is automatically disabled when the user's
        operating system requests reduced motion.
         */
        setAnimated(animated: boolean): this;
    }
}
