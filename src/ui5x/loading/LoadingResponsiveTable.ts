/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

import "../library";

import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";

import Table from "sap/m/Table";
import Column from "sap/m/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import type Toolbar from "sap/m/Toolbar";

import Skeleton from "../loading/Skeleton";
import SkeletonType from "../loading/SkeletonType";
import SkeletonRowMode from "./SkeletonRowMode";
import clampInt from "../util/clampInt";

import LoadingResponsiveTableRenderer from "./renderer/LoadingResponsiveTableRenderer";

/**
 * Displays a responsive table with skeleton rows while data is loading.
 *
 * @extends sap.ui.core.Control
 * @public
 * @name ui5x.loading.LoadingResponsiveTable
 */
export default class LoadingResponsiveTable extends Control {

    constructor(idOrSettings?: string | $LoadingResponsiveTableSettings);
    constructor(id?: string, settings?: $LoadingResponsiveTableSettings);
    constructor(id?: string, settings?: $LoadingResponsiveTableSettings) {
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
             * Defines the height of every skeleton row.
             *
             * sap.m.Table sizes its rows on their content, so skeleton rows
             * are shorter than rows carrying real data and the table grows
             * when the data arrives. Set this to the height the application
             * rows end up with to keep the two identical. An empty value
             * leaves the rows content-driven.
             */
            skeletonRowHeight: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
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
             * The responsive table containing the actual application data.
             */
            table: {
                type: "sap.m.Table",
                multiple: false
            },

            /**
             * Internal table used to render skeleton rows.
             */
            _skeletonTable: {
                type: "sap.m.Table",
                multiple: false,
                visibility: "hidden"
            }
        }
    };

    static renderer: typeof LoadingResponsiveTableRenderer =
        LoadingResponsiveTableRenderer;

    /*
     * UI5 invokes init() from the base Control constructor. These fields must
     * therefore be type-only declarations: emitted class-field initializers
     * would run after init() and overwrite the state created there.
     */
    private declare _calculatedSkeletonRows: number;
    private declare _skeletonSignature: string;
    private declare _onWindowResize: () => void;

    init(): void {
        this._calculatedSkeletonRows = 0;
        this._skeletonSignature = "";

        this._onWindowResize = (): void => {
            if (
                this.getLoading() &&
                this.getSkeletonRowsMode() === SkeletonRowMode.Fill
            ) {
                this._updateCalculatedSkeletonRows();
            }
        };

        this.setAggregation(
            "_skeletonTable",
            new Table({
                showNoData: false
            }),
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
    }

    onBeforeRendering(): void {
        if (this.getLoading()) {
            this._syncSkeletonTable();
        }
    }

    onAfterRendering(): void {
        if (
            this.getLoading() &&
            this.getSkeletonRowsMode() === SkeletonRowMode.Fill
        ) {
            this._updateCalculatedSkeletonRows();
        }
    }

    setSkeletonRows(rows: number): this {
        return this.setProperty(
            "skeletonRows",
            clampInt(rows, 1)
        );
    }

    setMaxSkeletonRows(rows: number): this {
        const normalizedRows = clampInt(rows, 1);

        if (this._calculatedSkeletonRows > normalizedRows) {
            this._calculatedSkeletonRows = normalizedRows;
        }

        return this.setProperty(
            "maxSkeletonRows",
            normalizedRows
        );
    }

    _getSkeletonTable(): Table | null {
        return this.getAggregation("_skeletonTable") as Table | null;
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
                this._calculatedSkeletonRows || this.getSkeletonRows()
            );
        }

        return this.getSkeletonRows();
    }

    private _syncSkeletonTable(): void {
        const sourceTable = this.getTable();
        const skeletonTable = this._getSkeletonTable();

        if (!sourceTable || !skeletonTable) {
            return;
        }

        const signature = this._getSkeletonSignature(sourceTable);

        if (signature === this._skeletonSignature) {
            /*
             * onBeforeRendering runs for every invalidation, including those
             * coming from an ancestor. Rebuilding would destroy and recreate
             * one Skeleton per cell, so nothing is done while the structure
             * and the row count are unchanged.
             */
            return;
        }

        this._skeletonSignature = signature;

        skeletonTable.destroyColumns();
        skeletonTable.destroyItems();

        skeletonTable.setWidth(
            sourceTable.getWidth()
        );

        skeletonTable.setFixedLayout(
            sourceTable.getFixedLayout()
        );

        skeletonTable.setBackgroundDesign(
            sourceTable.getBackgroundDesign()
        );

        skeletonTable.setInset(
            sourceTable.getInset()
        );

        skeletonTable.setShowSeparators(
            sourceTable.getShowSeparators()
        );

        this._syncSkeletonToolbars(sourceTable, skeletonTable);

        const columns = sourceTable.getColumns();

        columns.forEach(
            (column: Column, index: number) => {
                skeletonTable.addColumn(
                    column.clone(
                        `-ui5xSkeleton-${index}`
                    )
                );
            }
        );

        const rows = this._getEffectiveSkeletonRows();

        for (let row = 0; row < rows; row++) {
            skeletonTable.addItem(
                new ColumnListItem({
                    cells: columns.map(
                        (_column, columnIndex) =>
                            new Skeleton({
                                type: SkeletonType.Line,
                                width: this.getDynamicSkeletonWidths()
                                    ? this._getSkeletonWidth(row, columnIndex)
                                    : "100%",
                                animated: this.getAnimated()
                            })
                    )
                }).addStyleClass("ui5xLoadingResponsiveTableRow")
            );
        }
    }

    /*
     * The toolbars sit above the rows and take vertical space, so leaving them
     * out makes the table grow when the data arrives. They are cloned rather
     * than shared: the application keeps its own, and the renderer marks the
     * whole skeleton inert, so the copies cannot be interacted with.
     */
    private _syncSkeletonToolbars(
        sourceTable: Table,
        skeletonTable: Table
    ): void {
        const headerToolbar = sourceTable.getHeaderToolbar();
        const infoToolbar = sourceTable.getInfoToolbar();

        if (headerToolbar) {
            skeletonTable.setHeaderToolbar(headerToolbar.clone() as Toolbar);
        } else {
            skeletonTable.destroyHeaderToolbar();
        }

        if (infoToolbar) {
            skeletonTable.setInfoToolbar(infoToolbar.clone() as Toolbar);
        } else {
            skeletonTable.destroyInfoToolbar();
        }
    }

    /*
     * Everything the skeleton reproduces: the source columns, the number of
     * rows and the two properties baked into the generated cells.
     */
    private _getSkeletonSignature(sourceTable: Table): string {
        return [
            this._getEffectiveSkeletonRows(),
            this.getAnimated(),
            this.getDynamicSkeletonWidths(),
            sourceTable.getHeaderToolbar()?.getId() ?? "",
            sourceTable.getInfoToolbar()?.getId() ?? "",
            ...sourceTable.getColumns().map(
                (column: Column) => [
                    column.getId(),
                    column.getWidth(),
                    column.getVisible(),
                    column.getHAlign()
                ].join(",")
            )
        ].join("|");
    }

    private _updateCalculatedSkeletonRows(): void {
        const root = this.getDomRef();
        const skeletonTable = this._getSkeletonTable();

        if (!root || !skeletonTable) {
            return;
        }

        const tableDomRef = skeletonTable.getDomRef();

        const items = skeletonTable.getItems();

        if (!tableDomRef || items.length === 0) {
            return;
        }

        const firstRowDomRef = items[0].getDomRef();

        if (!firstRowDomRef) {
            return;
        }

        const rootRect = root.getBoundingClientRect();

        const tableRect = tableDomRef.getBoundingClientRect();

        const rowHeight = firstRowDomRef.getBoundingClientRect().height;

        if (rowHeight <= 0) {
            return;
        }

        /*
         * Everything belonging to the table except its rows:
         * header, borders and other structural elements.
         */
        const chromeHeight = Math.max(
            0,
            tableRect.height -
            rowHeight * items.length
        );

        /*
         * Space between the top of this control and the bottom
         * of the viewport.
         */
        const availableHeight = window.innerHeight - rootRect.top;

        const availableRowsHeight = Math.max(
            0,
            availableHeight - chromeHeight
        );

        /*
         * floor() avoids producing an additional row that would
         * overflow the viewport and create a scrollbar.
         */
        const calculatedRows = Math.max(
            1,
            Math.min(
                this.getMaxSkeletonRows(),
                Math.floor(
                    availableRowsHeight / rowHeight
                )
            )
        );

        if (calculatedRows === this._calculatedSkeletonRows) {
            return;
        }

        this._calculatedSkeletonRows = calculatedRows;

        /*
         * Re-render once with the newly calculated number
         * of rows.
         */
        this.invalidate();
    }

    private _getSkeletonWidth(rowIndex: number, columnIndex: number): string {
        const widths = ["72%", "88%", "64%", "80%", "55%"];

        return widths[
            (rowIndex + columnIndex) % widths.length
        ];
    }
}