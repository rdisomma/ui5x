/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import Skeleton from "./Skeleton";
import SkeletonType from "./SkeletonType";
import LoadingContainerRenderer from "./renderer/LoadingContainerRenderer";
import clampInt from "../util/clampInt";

/**
 * Displays either a loading placeholder or its content.
 *
 * @extends sap.ui.core.Control
 *
 * @public
 * @name ui5x.loading.LoadingContainer
 */
export default class LoadingContainer extends Control {

    // The following three lines were generated and should remain as-is
    // to make TypeScript aware of the constructor signatures
    constructor(idOrSettings?: string | $LoadingContainerSettings);
    constructor(id?: string, settings?: $LoadingContainerSettings);
    constructor(id?: string, settings?: $LoadingContainerSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        defaultAggregation: "content",

        properties: {
            /**
             * Defines whether the container displays its loading placeholder
             * instead of the content.
             */
            loading: {
                type: "boolean",
                defaultValue: false
            },
            /**
             * Defines the type of the default skeleton placeholder.
             *
             * This property has no effect when a custom placeholder is provided.
             */
            skeletonType: {
                type: "ui5x.loading.SkeletonType",
                defaultValue: SkeletonType.Line
            },
            /**
             * Defines the number of lines displayed by the default skeleton placeholder.
             *
             * This property only affects skeletons of type
             * {@link ui5x.loading.SkeletonType.Line} and has no effect when a custom
             * placeholder is provided.
             *
             * Valid values are between 1 and 3.
             */
            skeletonLines: {
                type: "int",
                defaultValue: 1
            },
            /**
             * Defines the width of the container.
             *
             * Accepts any valid UI5 CSSSize value, such as
             * "100%", "20rem" or "320px".
             */
            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: null
            },
            /**
             * Defines the height of the default skeleton placeholder.
             *
             * This property only affects skeletons of type
             * {@link ui5x.loading.SkeletonType.Rectangle} and has no effect
             * when a custom placeholder is provided: a line takes its height
             * from skeletonLines, and a circle from its width.
             */
            skeletonHeight: {
                type: "sap.ui.core.CSSSize",
                defaultValue: null
            },
            /**
             * Defines whether the default skeleton placeholder animates.
             *
             * The animation is automatically disabled when the user's
             * operating system requests reduced motion, and this property has
             * no effect when a custom placeholder is provided.
             */
            animated: {
                type: "boolean",
                defaultValue: true
            }
        },

        aggregations: {
            /**
             * The actual content displayed when loading is false.
             */
            content: {
                type: "sap.ui.core.Control",
                multiple: false
            },
            /**
             * Optional custom placeholder displayed while loading.
             *
             * When omitted, LoadingContainer uses its default Skeleton.
             */
            placeholder: {
                type: "sap.ui.core.Control",
                multiple: false
            },

            _defaultPlaceholder: {
                type: "ui5x.loading.Skeleton",
                multiple: false,
                visibility: "hidden"
            }
        }
    };

    static renderer: typeof LoadingContainerRenderer = LoadingContainerRenderer;

    init(): void {
        this.setAggregation("_defaultPlaceholder", new Skeleton({
            type: this.getSkeletonType(),
            lines: this.getSkeletonLines(),
            height: this.getSkeletonHeight(),
            animated: this.getAnimated()
        }), true);
    }

    setSkeletonType(type: SkeletonType): this {
        this.setProperty("skeletonType", type);

        const skeleton = this.getAggregation("_defaultPlaceholder") as Skeleton | null;
        skeleton?.setType(type);

        return this;
    }

    setSkeletonLines(lines: number): this {
        const normalizedLines = clampInt(lines, 1, 3);

        this.setProperty("skeletonLines", normalizedLines);

        const skeleton = this.getAggregation("_defaultPlaceholder") as Skeleton | null;
        skeleton?.setLines(normalizedLines);

        return this;
    }

    setSkeletonHeight(height: string): this {
        this.setProperty("skeletonHeight", height);

        const skeleton = this.getAggregation("_defaultPlaceholder") as Skeleton | null;
        skeleton?.setHeight(height);

        return this;
    }

    setAnimated(animated: boolean): this {
        this.setProperty("animated", animated);

        const skeleton = this.getAggregation("_defaultPlaceholder") as Skeleton | null;
        skeleton?.setAnimated(animated);

        return this;
    }

    _getEffectivePlaceholder(): Control | null {
        return (this.getPlaceholder() ?? this.getAggregation("_defaultPlaceholder") as Control | null);
    }
}