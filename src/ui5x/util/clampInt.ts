/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

/**
 * Normalizes an integer property value.
 *
 * A property bound to a missing model field yields NaN, and a computed
 * binding can yield a fraction. Both would reach the renderers unchecked:
 * NaN silently produces an empty control, a fraction reaches loop counters
 * and sap.ui.table row counts.
 *
 * @param value the raw property value
 * @param min the lowest accepted value, also the fallback for a non-finite one
 * @param max the highest accepted value
 * @returns an integer within [min, max]
 */
export default function clampInt(
    value: number,
    min: number,
    max: number = Number.MAX_SAFE_INTEGER
): number {
    if (!Number.isFinite(value)) {
        return min;
    }

    return Math.min(max, Math.max(min, Math.floor(value)));
}
