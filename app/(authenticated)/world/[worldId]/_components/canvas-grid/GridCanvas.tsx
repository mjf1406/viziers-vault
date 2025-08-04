/** @format */

import React, { useRef, useEffect, useCallback } from "react";
import { calculateGridDimensions } from "@/utils/gridCoordinates";
import { drawSquareGrid } from "@/utils/square";
import { drawHexGrid } from "@/utils/hexagon";
import { GridType } from "../../_hooks/useGridState";

interface GridCanvasProps {
    gridType: GridType;
    cols: number;
    rows: number;
    tileSize: number;
    borderWidth: number;
    borderColor: string;
    biomeGrid: (string | null)[][];
    panOffset: { x: number; y: number };
    zoomLevel: number;
    onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseLeave: () => void;
    onWheel: (e: React.WheelEvent<HTMLCanvasElement>) => void;
    onContextMenu: (e: React.MouseEvent) => void;
    cursorStyle: React.CSSProperties;
}

export const GridCanvas: React.FC<GridCanvasProps> = ({
    gridType,
    cols,
    rows,
    tileSize,
    borderWidth,
    borderColor,
    biomeGrid,
    panOffset,
    zoomLevel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onWheel,
    onContextMenu,
    cursorStyle,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Get the container's actual dimensions
        const rect = container.getBoundingClientRect();
        const { width, height } = rect;

        // Set canvas internal resolution to match container size
        // Use device pixel ratio for crisp rendering on high-DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        // Scale the canvas back down using CSS
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Scale the drawing context to account for device pixel ratio
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
    }, []);

    const drawGrid = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { scale } = calculateGridDimensions(
            gridType,
            cols,
            rows,
            tileSize,
            borderWidth
        );

        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();

        // Apply pan and zoom transforms
        ctx.translate(panOffset.x, panOffset.y);
        ctx.scale(zoomLevel, zoomLevel);

        if (scale < 1) {
            ctx.scale(scale, scale);
        }

        if (gridType === "square") {
            drawSquareGrid(
                ctx,
                cols,
                rows,
                tileSize,
                biomeGrid,
                borderWidth,
                borderColor
            );
        } else {
            drawHexGrid(
                ctx,
                gridType,
                cols,
                rows,
                tileSize,
                biomeGrid,
                borderWidth,
                borderColor
            );
        }

        ctx.restore();
    }, [
        gridType,
        cols,
        rows,
        tileSize,
        borderWidth,
        borderColor,
        biomeGrid,
        panOffset,
        zoomLevel,
    ]);

    useEffect(() => {
        // initial sizing
        updateCanvasSize();
        drawGrid();

        // observe container size changes
        const ro = new ResizeObserver(() => {
            updateCanvasSize();
            drawGrid();
        });
        if (containerRef.current) {
            ro.observe(containerRef.current);
        }

        // cleanup
        return () => {
            ro.disconnect();
        };
    }, [updateCanvasSize, drawGrid]);

    useEffect(() => {
        drawGrid();
    }, [drawGrid]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden"
            style={{ minWidth: 0, minHeight: 0 }}
        >
            <canvas
                ref={canvasRef}
                className="block dark:bg-background/80 bg-gray-200"
                style={{
                    ...cursorStyle,
                    maxWidth: "100%",
                    maxHeight: "100%",
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onWheel={onWheel}
                onContextMenu={onContextMenu}
            />
        </div>
    );
};
