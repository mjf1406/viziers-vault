/** @format */

import { useState, useCallback } from "react";
import {
    calculateGridDimensions,
    getGridCoordinates,
} from "@/utils/gridCoordinates";
import { GridType } from "./useGridState";
import { Tool } from "../_components/canvas-grid/ToolPalette";

interface UseCanvasInteractionProps {
    gridType: GridType;
    cols: number;
    rows: number;
    tileSize: number;
    borderWidth: number;
    panOffset: { x: number; y: number };
    zoomLevel: number;
    selectedBiome: string | null;
    selectedTool: Tool;
    setBiomeGrid: React.Dispatch<React.SetStateAction<(string | null)[][]>>;
    updatePan: (deltaX: number, deltaY: number) => void;
    updateZoom: (newZoom: number, mouseX: number, mouseY: number) => void;
}

export const useCanvasInteraction = ({
    gridType,
    cols,
    rows,
    tileSize,
    borderWidth,
    panOffset,
    zoomLevel,
    selectedBiome,
    selectedTool,
    setBiomeGrid,
    updatePan,
    updateZoom,
}: UseCanvasInteractionProps) => {
    const [isPainting, setIsPainting] = useState(false);
    const [isPanning, setIsPanning] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

    const paintTile = useCallback(
        (mouseX: number, mouseY: number) => {
            if (!selectedBiome) return;

            const { scale } = calculateGridDimensions(
                gridType,
                cols,
                rows,
                tileSize,
                borderWidth
            );

            const coords = getGridCoordinates(
                mouseX,
                mouseY,
                gridType,
                cols,
                rows,
                tileSize,
                borderWidth,
                scale,
                panOffset,
                zoomLevel
            );

            if (coords) {
                setBiomeGrid((prev) => {
                    const newGrid = [...prev];
                    if (!newGrid[coords.row]) newGrid[coords.row] = [];
                    newGrid[coords.row][coords.col] = selectedBiome;
                    return newGrid;
                });
            }
        },
        [
            selectedBiome,
            gridType,
            cols,
            rows,
            tileSize,
            borderWidth,
            panOffset,
            zoomLevel,
            setBiomeGrid,
        ]
    );

    const handleMouseDown = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (e.button === 0) {
                // Left click - paint
                if (selectedBiome) {
                    setIsPainting(true);
                    paintTile(mouseX, mouseY);
                }
            } else if (e.button === 2) {
                // Right click - pan
                e.preventDefault();
                setIsPanning(true);
                setLastPanPoint({ x: mouseX, y: mouseY });
            }
        },
        [selectedBiome, paintTile]
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (isPainting && selectedBiome && e.buttons === 1) {
                // Left button held - continue painting
                paintTile(mouseX, mouseY);
            } else if (isPanning && e.buttons === 2) {
                // Right button held - pan
                const deltaX = mouseX - lastPanPoint.x;
                const deltaY = mouseY - lastPanPoint.y;

                updatePan(deltaX, deltaY);
                setLastPanPoint({ x: mouseX, y: mouseY });
            }
        },
        [
            isPainting,
            isPanning,
            selectedBiome,
            lastPanPoint,
            paintTile,
            updatePan,
        ]
    );

    const handleMouseUp = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            if (e.button === 0) {
                // Left button
                setIsPainting(false);
            } else if (e.button === 2) {
                // Right button
                setIsPanning(false);
            }
        },
        []
    );

    const handleMouseLeave = useCallback(() => {
        setIsPainting(false);
        setIsPanning(false);
    }, []);

    const handleWheel = useCallback(
        (e: React.WheelEvent<HTMLCanvasElement>) => {
            e.preventDefault();

            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = zoomLevel * zoomFactor;

            updateZoom(newZoom, mouseX, mouseY);
        },
        [zoomLevel, updateZoom]
    );

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
    }, []);

    const getCursorStyle = useCallback(() => {
        if (isPanning) return { cursor: "grabbing" };
        if (!selectedBiome) return { cursor: "not-allowed" };

        return {
            cursor: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='8' fill='${encodeURIComponent(
                selectedBiome
            )}' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") 10 10, crosshair`,
        };
    }, [isPanning, selectedBiome]);

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
        handleWheel,
        handleContextMenu,
        getCursorStyle,
    };
};
