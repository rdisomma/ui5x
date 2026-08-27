/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import SkeletonRenderer from "./renderer/SkeletonRenderer";
import SkeletonType from "./SkeletonType";
import clampInt from "../util/clampInt";

/**
 * A placeholder control representing content while it is loading.
 *
 * @extends sap.ui.core.Control
 *
 * @public
 * @name ui5x.loading.Skeleton
 */

export default class Skeleton extends Control {

    // The following three lines were generated and should remain as-is
    // to make TypeScript aware of the constructor signatures
    constructor(idOrSettings?: string | $SkeletonSettings);
    constructor(id?: string, settings?: $SkeletonSettings);
    constructor(id?: string, settings?: $SkeletonSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        properties: {
            /**
             * Defines the width of the skeleton.
             *
             * Accepts any valid UI5 CSSSize value, such as
             * "100%", "20rem" or "320px".
             */
            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: null
            },
            /**
             * Defines the visual shape of the skeleton.
             *
             * @defaultValue ui5x.loading.SkeletonType.Line
             */
            type: {
                type: "ui5x.loading.SkeletonType",
                defaultValue: SkeletonType.Line
            },
            /**
             * Defines the number of placeholder lines.
             *
             * This property only affects skeletons of type
             * {@link ui5x.loading.SkeletonType.Line}.
             *
             * Valid values are between 1 and 3.
             */
            lines: {
                type: "int",
                defaultValue: 1
            },
            /**
             * Defines whether the loading animation is enabled.
             *
             * The animation is automatically disabled when the user's
             * operating system requests reduced motion.
             */
            animated: {
                type: "boolean",
                defaultValue: true
            }
        }
    };


    static renderer: typeof SkeletonRenderer = SkeletonRenderer;

    setLines(lines: number): this {
        return this.setProperty("lines", clampInt(lines, 1, 3));
    }
}