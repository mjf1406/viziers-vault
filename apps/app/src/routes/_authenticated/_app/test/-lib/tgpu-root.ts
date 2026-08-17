import { tgpu } from "typegpu";

export const root = await tgpu.init();

let canvasContext: GPUCanvasContext | null = null;

export function configureCanvas(canvas: HTMLCanvasElement): GPUCanvasContext {
  canvasContext = root.configureContext({ canvas });
  return canvasContext;
}

export function getContext(): GPUCanvasContext {
  if (!canvasContext) {
    throw new Error("WebGPU canvas is not configured yet");
  }
  return canvasContext;
}

export function disposeCanvasContext(): void {
  canvasContext?.unconfigure();
  canvasContext = null;
}
