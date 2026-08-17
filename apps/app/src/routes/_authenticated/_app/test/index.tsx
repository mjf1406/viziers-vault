import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { incrementByOneFunction } from "./-lib/computations/increment-by-one";
import { execute } from "./-lib/computations/increment-by-custom";
import { executeArray } from "./-lib/computations/multi-threading";
import { executeRectangle } from "./-lib/computations/rectangle";
import { executeTriangleVertices } from "./-lib/rendering/render-test";
import { executeTriangleAnimated, stopTriangleAnimated } from "./-lib/rendering/animated-triangle";
import { configureCanvas, disposeCanvasContext } from "./-lib/tgpu-root";

export const Route = createFileRoute("/_authenticated/_app/test/")({
  component: function TestPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      configureCanvas(canvas);
      return () => {
        stopTriangleAnimated();
        disposeCanvasContext();
      };
    }, []);

    return (
      <div className="p-8">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-bold">Computations</div>
          <div className="flex flex-row gap-2">
            <Button onClick={incrementByOneFunction}>Increment by 1</Button>
            <Button onClick={execute}>Increment Custom</Button>
            <Button onClick={executeArray}>Increment Array</Button>
            <Button onClick={executeRectangle}>Increment Rectangle</Button>
          </div>
          <p className="text-muted-foreground text-sm">Need to see the console.</p>
          <div className="text-lg font-bold">Rendering</div>
          <div className="flex flex-row flex-wrap items-end gap-2">
            <Button onClick={executeTriangleVertices}>Draw Triangle</Button>
            <Button onClick={executeTriangleAnimated}>Draw Animated Triangle</Button>
          </div>
          <div>
            <canvas ref={canvasRef} width={300} height={300} className="image-pixelated" />
          </div>
          <p className="text-muted-foreground text-sm">See the canvas above.</p>
        </div>
      </div>
    );
  },
});
