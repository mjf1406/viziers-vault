import type { HexGridFormValues } from "./hexGridFormSchema";

export type HexGridWorkerInitMessage = {
  type: "init";
};

export type HexGridWorkerRenderMessage = {
  type: "render";
  requestId: number;
  value: HexGridFormValues;
};

export type HexGridWorkerCancelMessage = {
  type: "cancel";
  requestId: number;
};

export type HexGridWorkerInMessage =
  | HexGridWorkerInitMessage
  | HexGridWorkerRenderMessage
  | HexGridWorkerCancelMessage;

export type HexGridWorkerReadyMessage = {
  type: "ready";
};

export type HexGridWorkerProgressMessage = {
  type: "progress";
  requestId: number;
  drawn: number;
  total: number;
};

export type HexGridWorkerDoneMessage = {
  type: "done";
  requestId: number;
  drawn: number;
  total: number;
  width: number;
  height: number;
  png: ArrayBuffer;
};

export type HexGridWorkerErrorMessage = {
  type: "error";
  requestId: number | null;
  message: string;
};

export type HexGridWorkerOutMessage =
  | HexGridWorkerReadyMessage
  | HexGridWorkerProgressMessage
  | HexGridWorkerDoneMessage
  | HexGridWorkerErrorMessage;

export function isHexGridWorkerOutMessage(data: unknown): data is HexGridWorkerOutMessage {
  if (typeof data !== "object" || data === null || !("type" in data)) {
    return false;
  }
  const type = (data as { type: unknown }).type;
  return type === "ready" || type === "progress" || type === "done" || type === "error";
}
