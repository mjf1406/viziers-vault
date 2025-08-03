/** @format */

"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ChevronRight, ChevronLeft, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarProvider,
    useSidebar,
} from "@/components/ui/sidebar";
import { detectWebGL } from "@/lib/utils";
import { exportImage, exportMap } from "@/utils/exportMap";
import { useGridState } from "../hooks/useGridState";
import { useCanvasInteraction } from "../hooks/useCanvasInteraction";
import { useViewState } from "../hooks/useViewState";
import { BiomeBrush } from "./canvas-grid/BiomeBrush";
import { BorderControls } from "./canvas-grid/BorderControls";
import { DimensionControls } from "./canvas-grid/DimensionControls";
import { DisplayPresets } from "./canvas-grid/DisplayPresets";
import { GridCanvas } from "./canvas-grid/GridCanvas";
import { GridTypeSelector } from "./canvas-grid/GridTypeSelector";
import { TileSizeControls } from "./canvas-grid/TileSizeControls";
import ToolPalette, { Tool } from "./canvas-grid/ToolPalette";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { usePersistedQuery } from "@/app/hooks/usePersistedQuery";
import Loading from "@/app/loading";

export const MIN_TILE_SIZE = 20;
export const MAX_TILE_SIZE = 200;
export const MIN_PPI = 10;
export const MAX_PPI = 300;
export const MAX_TILES_NO_WEBGL = 100;
export const MAX_TILES_WEBGL = 50000;

interface CanvasGridProps {
    worldId: string;
}

const CanvasGrid: React.FC<CanvasGridProps> = ({ worldId }) => {
    const { data: world }: { data: Doc<"worlds"> | null } = usePersistedQuery(
        api.worlds.get,
        `world-${worldId}`, // unique cache key
        { id: worldId } // argument passed to api.worlds.get
    );

    // Move all hooks before any conditional logic
    const [selectedBiome, setSelectedBiome] = useState<string | null>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("paint");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Detect WebGL support and set grid limits accordingly
    const { maxGridWidth, maxGridHeight, hasWebGL } = useMemo(() => {
        const webGLSupported = detectWebGL();
        return {
            maxGridWidth: webGLSupported ? MAX_TILES_WEBGL : MAX_TILES_NO_WEBGL,
            maxGridHeight: webGLSupported
                ? MAX_TILES_WEBGL
                : MAX_TILES_NO_WEBGL,
            hasWebGL: webGLSupported,
        };
    }, []);

    // Custom hooks
    const gridState = useGridState();
    const viewState = useViewState();

    const canvasInteraction = useCanvasInteraction({
        gridType: gridState.gridType,
        cols: gridState.cols,
        rows: gridState.rows,
        tileSize: gridState.tileSize,
        borderWidth: gridState.borderWidth,
        panOffset: viewState.panOffset,
        zoomLevel: viewState.zoomLevel,
        selectedBiome,
        selectedTool,
        setBiomeGrid: gridState.setBiomeGrid,
        updatePan: viewState.updatePan,
        updateZoom: viewState.updateZoom,
    });

    const handleExportImage = useCallback(
        async (format: "webp" | "png" | "jpeg") => {
            try {
                const canvas = document.querySelector(
                    "canvas"
                ) as HTMLCanvasElement;
                if (!canvas) {
                    throw new Error("Canvas not found");
                }
                await exportImage(format, gridState);
            } catch (error) {
                console.error("Export failed:", error);
            }
        },
        [gridState]
    );

    const handleExportData = useCallback(
        async (type: "json" | "uvtt" | "foundry") => {
            try {
                const canvas = document.querySelector(
                    "canvas"
                ) as HTMLCanvasElement;
                if (!canvas) {
                    throw new Error("Canvas not found");
                }
                await exportMap(type, gridState);
            } catch (error) {
                console.error("Export failed:", error);
            }
        },
        [gridState]
    );

    // Initialize grid based on world data
    // useEffect(() => {
    //     if (world) {
    //         // Initialize grid with world-specific data if available
    //         // This assumes your world object might have grid configuration
    //         if (world.gridConfig) {
    //             const { cols, rows, tileSize, gridType } = world.gridConfig;
    //             if (cols) gridState.updateCols(cols);
    //             if (rows) gridState.updateRows(rows);
    //             if (tileSize) gridState.updateTileSize(tileSize);
    //             if (gridType) gridState.setGridType(gridType);
    //         }

    //         // Load saved biome grid if available
    //         if (world.biomeGrid) {
    //             gridState.setBiomeGrid(world.biomeGrid);
    //         } else {
    //             gridState.generateBiomeGrid();
    //         }
    //     }
    // }, [world, gridState]);

    if (!world) {
        return <Loading />;
    }

    if (!worldId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-destructive text-center">
                    <p>World not found</p>
                    <p>Please try refreshing the page.</p>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <TooltipProvider>
                <div className="relative flex w-full overflow-y-hidden">
                    {/* Sidebar - positioned absolutely when collapsed */}
                    <div
                        className={`relative ${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 ease-in-out`}
                    >
                        <Sidebar
                            className={`transition-transform duration-300 ease-in-out ${
                                !sidebarOpen
                                    ? "-translate-x-full absolute left-0 top-0 z-40"
                                    : "translate-x-0 relative"
                            }`}
                        >
                            <SidebarHeader className="flex flex-row items-center justify-between gap-2 px-3 border-b">
                                <h2 className="text-lg font-semibold">
                                    {world.name ? world.name : "Grid Controls"}
                                </h2>
                                <div className="flex gap-1">
                                    <Button
                                        size={"icon"}
                                        variant={"outline"}
                                        onClick={gridState.generateBiomeGrid}
                                    >
                                        <Dices />
                                    </Button>
                                    <DisplayPresets
                                        currentGridType={gridState.gridType}
                                        onPresetSelect={
                                            gridState.handlePresetSelect
                                        }
                                    />
                                </div>
                            </SidebarHeader>
                            <SidebarContent className="p-4 space-y-3 overflow-y-auto">
                                <GridTypeSelector
                                    gridType={gridState.gridType}
                                    onGridTypeChange={gridState.setGridType}
                                />

                                <DimensionControls
                                    cols={gridState.cols}
                                    rows={gridState.rows}
                                    onColsChange={gridState.updateCols}
                                    onRowsChange={gridState.updateRows}
                                    maxCols={maxGridWidth}
                                    maxRows={maxGridHeight}
                                    hasWebGL={hasWebGL}
                                />

                                <TileSizeControls
                                    tileSize={gridState.tileSize}
                                    ppi={gridState.ppi}
                                    onTileSizeChange={gridState.updateTileSize}
                                    onPpiChange={gridState.updatePpi}
                                    minTileSize={MIN_TILE_SIZE}
                                    maxTileSize={MAX_TILE_SIZE}
                                    minPpi={MIN_PPI}
                                    maxPpi={MAX_PPI}
                                />

                                <BorderControls
                                    borderWidth={gridState.borderWidth}
                                    borderColor={gridState.borderColor}
                                    onBorderWidthChange={
                                        gridState.updateBorderWidth
                                    }
                                    onBorderColorChange={
                                        gridState.updateBorderColor
                                    }
                                />

                                <BiomeBrush
                                    selectedBiome={selectedBiome}
                                    onBiomeSelect={setSelectedBiome}
                                />
                            </SidebarContent>
                        </Sidebar>
                    </div>

                    {/* Toggle Button */}
                    <Button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`fixed top-1/2 transform -translate-y-1/2 w-8 h-16 p-0 rounded-r-md border-background border rounded-l-none z-50 transition-all duration-300 ease-in-out ${
                            sidebarOpen ? "left-64" : "left-0"
                        }`}
                        style={{ marginTop: "4rem" }}
                    >
                        {sidebarOpen ? (
                            <ChevronLeft className="w-4 h-4 " />
                        ) : (
                            <ChevronRight className="w-4 h-4 " />
                        )}
                    </Button>

                    {/* Main Content - now takes full width when sidebar is collapsed */}
                    <div className="flex flex-col flex-1 h-full overflow-hidden transition-all duration-300 ease-in-out">
                        <div className="flex items-center justify-center flex-1 overflow-hidden bg-gray-200">
                            <GridCanvas
                                gridType={gridState.gridType}
                                cols={gridState.cols}
                                rows={gridState.rows}
                                tileSize={gridState.tileSize}
                                borderWidth={gridState.borderWidth}
                                borderColor={gridState.borderColor}
                                biomeGrid={gridState.biomeGrid}
                                panOffset={viewState.panOffset}
                                zoomLevel={viewState.zoomLevel}
                                onMouseDown={canvasInteraction.handleMouseDown}
                                onMouseMove={canvasInteraction.handleMouseMove}
                                onMouseUp={canvasInteraction.handleMouseUp}
                                onMouseLeave={
                                    canvasInteraction.handleMouseLeave
                                }
                                onWheel={canvasInteraction.handleWheel}
                                onContextMenu={
                                    canvasInteraction.handleContextMenu
                                }
                                cursorStyle={canvasInteraction.getCursorStyle()}
                            />
                        </div>
                    </div>

                    {/* Tool Palette */}
                    <ToolPalette
                        selectedTool={selectedTool}
                        onToolSelect={setSelectedTool}
                        onZoomIn={viewState.zoomIn}
                        onZoomOut={viewState.zoomOut}
                        onResetView={viewState.resetView}
                        onResetCanvas={gridState.resetCanvas}
                        onExportImage={handleExportImage}
                        onExportData={handleExportData}
                        zoomLevel={viewState.zoomLevel}
                    />
                </div>
            </TooltipProvider>
        </SidebarProvider>
    );
};

export default CanvasGrid;
