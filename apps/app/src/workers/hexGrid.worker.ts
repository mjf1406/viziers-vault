import { createHexGridRenderer, type HexGridRenderer } from "../lib/hexagons/hexGridGpu";
import type {
  HexGridWorkerInMessage,
  HexGridWorkerRenderMessage,
} from "../lib/hexagons/hexGridWorkerMessages";

let renderer: HexGridRenderer | null = null;
let currentRequestId = 0;
let running = false;
let queued: HexGridWorkerRenderMessage | null = null;

function isInMessage(data: unknown): data is HexGridWorkerInMessage {
  if (typeof data !== "object" || data === null || !("type" in data)) {
    return false;
  }
  const type = (data as { type: unknown }).type;
  return type === "init" || type === "render" || type === "cancel";
}

self.onmessage = (event: MessageEvent<unknown>) => {
  if (!isInMessage(event.data)) return;
  void handleMessage(event.data);
};

async function handleMessage(message: HexGridWorkerInMessage) {
  try {
    if (message.type === "init") {
      renderer = await createHexGridRenderer();
      self.postMessage({ type: "ready" });
      return;
    }

    if (message.type === "cancel") {
      if (message.requestId === currentRequestId) {
        currentRequestId += 1;
        if (queued?.requestId === message.requestId) {
          queued = null;
        }
      }
      return;
    }

    currentRequestId = message.requestId;
    queued = message;
    if (running) return;

    running = true;
    try {
      while (queued) {
        const job = queued;
        queued = null;
        if (currentRequestId !== job.requestId) continue;
        await runRender(job);
      }
    } finally {
      running = false;
    }
  } catch (error) {
    running = false;
    const requestId = "requestId" in message ? message.requestId : null;
    self.postMessage({
      type: "error",
      requestId,
      message: error instanceof Error ? error.message : "Hex grid generation failed",
    });
  }
}

async function runRender(message: HexGridWorkerRenderMessage) {
  if (!renderer) {
    self.postMessage({
      type: "error",
      requestId: message.requestId,
      message: "Hex grid renderer is not ready",
    });
    return;
  }

  const requestId = message.requestId;
  const result = await renderer.executeHexGrid(message.value, {
    isCurrent: () => currentRequestId === requestId,
    onProgress: (drawn, total) => {
      if (currentRequestId !== requestId) return;
      self.postMessage({ type: "progress", requestId, drawn, total });
    },
  });

  if (result.cancelled || currentRequestId !== requestId) return;
  const png = result.png.buffer.slice(
    result.png.byteOffset,
    result.png.byteOffset + result.png.byteLength,
  ) as ArrayBuffer;
  self.postMessage(
    {
      type: "done",
      requestId,
      drawn: result.drawn,
      total: result.total,
      width: result.width,
      height: result.height,
      png,
    },
    { transfer: [png] },
  );
}
