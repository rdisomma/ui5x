/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Control from "sap/ui/core/Control";
import Table from "sap/ui/table/Table";
import Column from "sap/ui/table/Column";
import RowAction from "sap/ui/table/RowAction";
import JSONModel from "sap/ui/model/json/JSONModel";
import {
    SelectionMode,
    VisibleRowCountMode
} from "sap/ui/table/library";

import type { MetadataOptions } from "sap/ui/core/Element";

import LoadingTableRenderer from "./renderer/LoadingTableRenderer";
import Skeleton from "./Skeleton";
import SkeletonRowMode from "./SkeletonRowMode";
import SkeletonType from "./SkeletonType";
import clampInt from "../util/clampInt";

/**
 * Displays a grid table with skeleton rows while data is loading.
 *
 * The control keeps the application table untouched and renders an internal
 * presentation-only sap.ui.table.Table while loading.
 *
 * @extends sap.ui.core.Control
 * @public
 * @name ui5x.loading.LoadingTable
 */
export default class LoadingTable extends Control {

    constructor(idOrSettings?: string | $LoadingTableSettings);
    constructor(id?: string, settings?: $LoadingTableSettings);
    constructor(id?: string, settings?: $LoadingTableSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        library: "ui5x",

        defaultAggregation: "table",

        properties: {
            /**
             * Defines whether skeleton rows are displayed instead of
             * the actual table.
             */
            loading: {
                type: "boolean",
                defaultValue: false
            },

            /**
             * Defines the number of skeleton rows displayed while loading.
             *
             * In Fill mode, this value is used as the initial fallback before
             * the available space can be measured.
             */
            skeletonRows: {
                type: "int",
                defaultValue: 5
            },

            /**
             * Defines the maximum number of skeleton rows rendered when
             * skeletonRowsMode is Fill.
             */
            maxSkeletonRows: {
                type: "int",
                defaultValue: 10
            },

            /**
             * Defines how the number of skeleton rows is determined.
             */
            skeletonRowsMode: {
                type: "ui5x.loading.SkeletonRowMode",
                defaultValue: SkeletonRowMode.Fixed
            },

            /**
             * Defines whether skeleton cells use varying widths
             * to produce a more natural loading appearance.
             */
            dynamicSkeletonWidths: {
                type: "boolean",
                defaultValue: false
            },

            /**
             * Defines whether skeleton animations are enabled.
             */
            animated: {
                type: "boolean",
                defaultValue: true
            }
        },

        aggregations: {
            /**
             * The table containing the actual application data.
             */
            table: {
                type: "sap.ui.table.Table",
                multiple: false
            },

            /**
             * Internal table used to render skeleton rows.
             */
            _skeletonTable: {
                type: "sap.ui.table.Table",
                multiple: false,
                visibility: "hidden"
            }
        }
    };

    static renderer: typeof LoadingTableRenderer = LoadingTableRenderer;

    /*
     * UI5 invokes init() from the base Control constructor. These fields must
     * therefore be type-only declarations: emitted class-field initializers
     * would run after init() and overwrite the state created there.
     */
    private declare _calculatedSkeletonRows: number;
    private declare _previousSkeletonRows: number;
    private declare _skeletonColumnSignature: string;
    private declare _observedRoot: Element | null;
    private declare _skeletonModel: JSONModel | null;

    private declare _fillUpdateFrame: number | null;
    private declare _resizeObserver: ResizeObserver | null;

    private declare _skeletonTableDelegate: {
        onAfterRendering: () => void;
    };

    private declare _onWindowResize: () => void;

    init(): void {
        this._calculatedSkeletonRows = 0;
        this._previousSkeletonRows = 0;
        this._skeletonColumnSignature = "";
        this._observedRoot = null;
        this._fillUpdateFrame = null;
        this._resizeObserver = null;

        this._skeletonTableDelegate = {
            onAfterRendering: (): void => {
                this._makeSkeletonTablePresentationOnly();
            }
        };

        this._onWindowResize = (): void => {
            this._scheduleFillUpdate();
        };

        this._skeletonModel = new JSONModel({
            rows: []
        });

        const skeletonTable = new Table({
            showNoData: false,
            selectionMode: SelectionMode.None,
            visibleRowCountMode: VisibleRowCountMode.Fixed,
            enableColumnReordering: false,
            threshold: 0
        });

        /*
         * A named model keeps the application's default model propagating into
         * the skeleton table. Setting the row data as the default model would
         * shadow it, and the cloned columns carry their bindings along: any
         * binding against the anonymous model would resolve to undefined and
         * the column would change or disappear while loading.
         */
        skeletonTable.setModel(this._skeletonModel, "ui5xSkeleton");

        skeletonTable.addEventDelegate(
            this._skeletonTableDelegate
        );

        this.setAggregation(
            "_skeletonTable",
            skeletonTable,
            true
        );

        window.addEventListener(
            "resize",
            this._onWindowResize
        );
    }

    exit(): void {
        window.removeEventListener(
            "resize",
            this._onWindowResize
        );

        if (this._fillUpdateFrame !== null) {
            window.cancelAnimationFrame(
                this._fillUpdateFrame
            );

            this._fillUpdateFrame = null;
        }

        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
        this._observedRoot = null;

        const skeletonTable = this._getSkeletonTable();

        skeletonTable?.removeEventDelegate(
            this._skeletonTableDelegate
        );

        skeletonTable?.unbindRows();

        this._skeletonModel?.destroy();
        this._skeletonModel = null;
    }

    onBeforeRendering(): void {
        if (!this.getLoading()) {
            return;
        }

        this._syncSkeletonTable();
    }

    onAfterRendering(): void {
        this._syncAccessibility();
        this._updateResizeObservation();

        if (
            this.getLoading() &&
            this.getSkeletonRowsMode() === SkeletonRowMode.Fill
        ) {
            this._scheduleFillUpdate();
        }
    }

    setLoading(loading: boolean): this {
        if (loading && !this.getLoading()) {
            /*
             * The geometry may have changed since the previous loading cycle.
             * Force Fill mode to measure the available space again.
             */
            this._calculatedSkeletonRows = 0;
            this._previousSkeletonRows = 0;
        }

        return this.setProperty(
            "loading",
            loading
        );
    }

    setSkeletonRows(rows: number): this {
        return this.setProperty(
            "skeletonRows",
            clampInt(rows, 1)
        );
    }

    setMaxSkeletonRows(rows: number): this {
        const normalizedRows =
            clampInt(rows, 1);

        if (
            this._calculatedSkeletonRows >
            normalizedRows
        ) {
            this._calculatedSkeletonRows =
                normalizedRows;
        }

        return this.setProperty(
            "maxSkeletonRows",
            normalizedRows
        );
    }

    setSkeletonRowsMode(
        mode: SkeletonRowMode
    ): this {
        if (
            mode !== this.getSkeletonRowsMode()
        ) {
            this._calculatedSkeletonRows = 0;
            this._previousSkeletonRows = 0;
        }

        return this.setProperty(
            "skeletonRowsMode",
            mode
        );
    }

    _getSkeletonTable(): Table | null {
        return this.getAggregation(
            "_skeletonTable"
        ) as Table | null;
    }

    private _getEffectiveSkeletonRows(): number {
        if (
            this.getSkeletonRowsMode() ===
            SkeletonRowMode.Fill
        ) {
            /*
             * Before the first DOM measurement, skeletonRows is the fallback.
             * maxSkeletonRows also applies to this initial render so Fill mode
             * never creates an unnecessarily large first layout.
             */
            return Math.min(
                this.getMaxSkeletonRows(),
                this._calculatedSkeletonRows ||
                    this.getSkeletonRows()
            );
        }

        return this.getSkeletonRows();
    }

    private _syncSkeletonTable(): void {
        const sourceTable = this.getTable();
        const skeletonTable =
            this._getSkeletonTable();

        if (!sourceTable || !skeletonTable) {
            return;
        }

        this._syncSkeletonTableGeometry(
            sourceTable,
            skeletonTable
        );

        const signature =
            this._getSkeletonColumnSignature(sourceTable);

        if (signature === this._skeletonColumnSignature) {
            /*
             * onBeforeRendering runs for every invalidation, including those
             * coming from an ancestor. Rebuilding the columns each time would
             * destroy and recreate one Skeleton per cell, so only the row data
             * is refreshed while the column structure is unchanged.
             */
            this._syncSkeletonRows();

            return;
        }

        this._skeletonColumnSignature = signature;

        this._syncSkeletonExtensions(sourceTable, skeletonTable);

        /*
         * sap.ui.table.Table creates its reusable row and cell pool when the
         * rows binding is initialized. Rebind only after the skeleton columns
         * and their templates have been created.
         */
        if (skeletonTable.isBound("rows")) {
            skeletonTable.unbindRows();
        }

        this._syncSkeletonColumns(
            sourceTable,
            skeletonTable
        );

        this._syncSkeletonRows();

        skeletonTable.bindRows({
            path: "ui5xSkeleton>/rows"
        });
    }

    /*
     * An extension is where a grid table carries its toolbar, and both it and
     * the footer take vertical space, so leaving them out makes the table grow
     * once the data arrives. They are cloned rather than shared: the
     * application keeps its own, and the renderer marks the whole skeleton
     * inert, so the copies cannot be interacted with.
     *
     * The deprecated title and toolbar aggregations are not reproduced.
     */
    private _syncSkeletonExtensions(
        sourceTable: Table,
        skeletonTable: Table
    ): void {
        skeletonTable.destroyExtension();

        sourceTable.getExtension().forEach((extension) => {
            skeletonTable.addExtension(extension.clone());
        });

        const footer = sourceTable.getFooter();

        if (footer) {
            skeletonTable.setFooter(
                typeof footer === "string" ? footer : footer.clone()
            );
        } else {
            skeletonTable.destroyFooter();
        }
    }

    /*
     * Everything about the source columns that the skeleton reproduces. The
     * animated property is part of it because it is baked into the cell
     * template; dynamicSkeletonWidths is not, it only affects the row data.
     */
    private _getSkeletonColumnSignature(
        sourceTable: Table
    ): string {
        const footer = sourceTable.getFooter();

        return [
            String(this.getAnimated()),
            sourceTable.getExtension()
                .map((extension) => extension.getId())
                .join(","),
            typeof footer === "string" ? footer : footer?.getId() ?? "",
            ...sourceTable.getColumns().map(
                (column: Column) => [
                    column.getId(),
                    column.getWidth(),
                    column.getMinWidth(),
                    column.getVisible(),
                    column.getHAlign(),
                    column.getHeaderSpan()
                ].join(",")
            )
        ].join("|");
    }

    private _syncSkeletonTableGeometry(
        sourceTable: Table,
        skeletonTable: Table
    ): void {
        skeletonTable.setWidth(
            sourceTable.getWidth()
        );

        skeletonTable.setRowHeight(
            sourceTable.getRowHeight()
        );

        skeletonTable.setColumnHeaderHeight(
            sourceTable.getColumnHeaderHeight()
        );

        skeletonTable.setColumnHeaderVisible(
            sourceTable.getColumnHeaderVisible()
        );

        skeletonTable.setFixedColumnCount(
            sourceTable.getFixedColumnCount()
        );

        skeletonTable.setAlternateRowColors(
            sourceTable.getAlternateRowColors()
        );

        /*
         * Preserve structural areas that affect column geometry.
         * The skeleton table is made inert after rendering, so these
         * controls remain visual only.
         */
        skeletonTable.setSelectionMode(
            sourceTable.getSelectionMode()
        );

        skeletonTable.setSelectionBehavior(
            sourceTable.getSelectionBehavior()
        );

        /*
         * sap.ui.table reserves the row action area only when a template is
         * set. Copying rowActionCount alone lets the skeleton columns take the
         * space the real table gives to row actions, so the columns shift when
         * the data arrives. The template stays empty: row actions must remain
         * unavailable while loading.
         */
        const rowActionCount = sourceTable.getRowActionTemplate()
            ? sourceTable.getRowActionCount()
            : 0;

        skeletonTable.setRowActionCount(rowActionCount);

        if (rowActionCount > 0 && !skeletonTable.getRowActionTemplate()) {
            skeletonTable.setRowActionTemplate(new RowAction());
        }

        skeletonTable.clearSelection();
    }

    private _syncSkeletonColumns(
        sourceTable: Table,
        skeletonTable: Table
    ): void {
        /*
         * Rebuilding columns keeps the loading representation in sync with
         * dynamic source-table changes. Row-count recalculations do not call
         * this method, so Fill mode no longer clones the columns twice.
         */
        skeletonTable.destroyColumns();

        const columns = sourceTable.getColumns();

        columns.forEach(
            (column: Column, index: number) => {
                skeletonTable.addColumn(
                    this._createSkeletonColumn(
                        column,
                        index
                    )
                );
            }
        );
    }

    private _createSkeletonColumn(
        sourceColumn: Column,
        index: number
    ): Column {
        const sourceLabel = sourceColumn.getLabel();
        const label = typeof sourceLabel === "string"
            ? sourceLabel
            : sourceLabel?.clone();

        /*
         * Only the geometry and the header are reproduced. Cloning the source
         * column would build its whole cell template just to destroy it right
         * after, and would carry the sorting, filtering and grouping state the
         * skeleton must not expose.
         */
        return new Column({
            label: label,

            width: sourceColumn.getWidth(),
            minWidth: sourceColumn.getMinWidth(),
            hAlign: sourceColumn.getHAlign(),
            visible: sourceColumn.getVisible(),
            headerSpan: sourceColumn.getHeaderSpan(),

            resizable: false,
            autoResizable: false,

            template: new Skeleton({
                type: SkeletonType.Line,
                width: `{ui5xSkeleton>widths/${index}}`,
                animated: this.getAnimated()
            })
        });
    }

    private _syncSkeletonRows(): void {
        const skeletonTable =
            this._getSkeletonTable();

        if (!skeletonTable) {
            return;
        }

        const columns =
            skeletonTable.getColumns();

        const rows =
            this._getEffectiveSkeletonRows();

        if (
            skeletonTable.getVisibleRowCount() !==
            rows
        ) {
            skeletonTable.setVisibleRowCount(
                rows
            );
        }

        if (
            skeletonTable.getFirstVisibleRow() !==
            0
        ) {
            skeletonTable.setFirstVisibleRow(0);
        }

        this._skeletonModel?.setData({
            rows: Array.from(
                { length: rows },
                (_value, rowIndex) => ({
                    widths: columns.map(
                        (_column, columnIndex) =>
                            this.getDynamicSkeletonWidths()
                                ? this._getSkeletonWidth(
                                    rowIndex,
                                    columnIndex
                                )
                                : "100%"
                    )
                })
            )
        });
    }

    private _scheduleFillUpdate(): void {
        if (
            !this.getLoading() ||
            this.getSkeletonRowsMode() !==
                SkeletonRowMode.Fill
        ) {
            return;
        }

        if (this._fillUpdateFrame !== null) {
            return;
        }

        this._fillUpdateFrame =
            window.requestAnimationFrame(
                () => {
                    this._fillUpdateFrame = null;
                    this._updateCalculatedSkeletonRows();
                }
            );
    }

    private _updateCalculatedSkeletonRows(): void {
        const root = this.getDomRef();
        const skeletonTable =
            this._getSkeletonTable();

        if (!root || !skeletonTable) {
            return;
        }

        const tableDomRef =
            skeletonTable.getDomRef();

        const renderedRows =
            skeletonTable.getRows();

        if (
            !tableDomRef ||
            renderedRows.length === 0
        ) {
            return;
        }

        const firstRowDomRef =
            renderedRows[0].getDomRef();

        if (!firstRowDomRef) {
            return;
        }

        const rootRect =
            root.getBoundingClientRect();

        const tableRect =
            tableDomRef.getBoundingClientRect();

        const rowHeight =
            firstRowDomRef
                .getBoundingClientRect()
                .height;

        if (rowHeight <= 0) {
            return;
        }

        /*
         * Everything belonging to the table except its rows:
         * column headers, borders, scrollbars and other structural chrome.
         */
        const chromeHeight = Math.max(
            0,
            tableRect.height -
                rowHeight *
                    renderedRows.length
        );

        /*
         * Fill mode uses the viewport as the outer limit. ResizeObserver
         * additionally reacts when the rendered control or its direct
         * container changes size.
         */
        const availableHeight = Math.max(
            0,
            window.innerHeight -
                rootRect.top
        );

        const availableRowsHeight = Math.max(
            0,
            availableHeight -
                chromeHeight
        );

        /*
         * floor() avoids creating an additional row that would overflow
         * the available space and introduce an unnecessary scrollbar.
         */
        const calculatedRows = Math.max(
            1,
            Math.min(
                this.getMaxSkeletonRows(),
                Math.floor(
                    availableRowsHeight /
                        rowHeight
                )
            )
        );

        if (
            calculatedRows ===
            this._calculatedSkeletonRows
        ) {
            return;
        }

        /*
         * The new count is the one we just moved away from: the layout is
         * flipping between two values, typically a scrollbar appearing and
         * disappearing with the row that triggers it. Keep the current count
         * instead of measuring forever. This detects a two-value cycle, a
         * longer one would still need a settle counter.
         */
        if (
            calculatedRows ===
            this._previousSkeletonRows
        ) {
            return;
        }

        this._previousSkeletonRows =
            this._calculatedSkeletonRows;

        this._calculatedSkeletonRows =
            calculatedRows;

        /*
         * Update only the internal table instead of invalidating the whole
         * LoadingTable. This avoids cloning all source columns a second time
         * after the first Fill-mode measurement.
         */
        this._syncSkeletonRows();
    }

    private _updateResizeObservation(): void {
        const shouldObserve =
            this.getLoading() &&
            this.getSkeletonRowsMode() ===
                SkeletonRowMode.Fill &&
            typeof ResizeObserver !== "undefined";

        const root = shouldObserve
            ? this.getDomRef()
            : null;

        /*
         * observe() invokes the callback once on its own, so re-observing an
         * unchanged target would schedule a measurement for every rendering.
         * apiVersion 2 patches the root element in place, so an unchanged
         * reference here really means an unchanged target.
         */
        if (root === this._observedRoot) {
            return;
        }

        this._resizeObserver?.disconnect();
        this._observedRoot = root;

        if (!root) {
            return;
        }

        if (!this._resizeObserver) {
            this._resizeObserver =
                new ResizeObserver(
                    () => {
                        this._scheduleFillUpdate();
                    }
                );
        }

        this._resizeObserver.observe(root);

        if (root.parentElement) {
            this._resizeObserver.observe(
                root.parentElement
            );
        }
    }

    private _syncAccessibility(): void {
        const root = this.getDomRef();

        if (root) {
            root.setAttribute(
                "aria-busy",
                this.getLoading()
                    ? "true"
                    : "false"
            );
        }

        this._makeSkeletonTablePresentationOnly();
    }

    private _makeSkeletonTablePresentationOnly(): void {
        if (!this.getLoading()) {
            return;
        }

        const tableDomRef =
            this._getSkeletonTable()
                ?.getDomRef();

        if (!tableDomRef) {
            return;
        }

        /*
         * Skeleton rows are purely presentational. Keep the internal
         * sap.ui.table.Table out of the accessibility tree and prevent
         * keyboard/pointer interaction with its generated DOM.
         */
        tableDomRef.setAttribute(
            "aria-hidden",
            "true"
        );

        tableDomRef.setAttribute(
            "inert",
            ""
        );
    }

    private _getSkeletonWidth(
        rowIndex: number,
        columnIndex: number
    ): string {
        const widths = [
            "72%",
            "88%",
            "64%",
            "80%",
            "55%"
        ];

        return widths[
            (rowIndex + columnIndex) %
                widths.length
        ];
    }
}
