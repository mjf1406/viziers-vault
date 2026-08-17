import { useCallback, useEffect, useRef, useState } from "react";

import type { HexGridFormValues } from "@/lib/hexagons/hexGridFormSchema";
import {
  isHexGridWorkerOutMessage,
  type HexGridWorkerInMessage,
  type HexGridWorkerOutMessage,
} from "@/lib/hexagons/hexGridWorkerMessages";

export type HexGridProgress = {
  drawn: number;
  total: number;
};

export type HexGridImage = {
  url: string;
  width: number;
  height: number;
};

type UseHexGridWorkerResult = {
  render: (value: HexGridFormValues) => void;
  cancel: () => void;
  progress: HexGridProgress | null;
  image: HexGridImage | null;
  isGenerating: boolean;
  isReady: boolean;
  error: string | null;
};

export function useHexGridWorker(): UseHexGridWorkerResult {
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const imageUrlRef = useRef<string | null>(null);
  const isGeneratingRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<HexGridProgress | null>(null);
  const [image, setImage] = useState<HexGridImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setGenerating = useCallback((next: boolean) => {
    isGeneratingRef.current = next;
    setIsGenerating(next);
  }, []);

  useEffect(() => {
    if (typeof Worker === "undefined") {
      setError("Hex grid worker is unavailable");
      return;
    }

    const worker = new Worker(new URL("../../workers/hexGrid.worker.ts", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<unknown>) => {
      if (!isHexGridWorkerOutMessage(event.data)) return;
      handleWorkerMessage(event.data);
    };

    worker.onerror = () => {
      isGeneratingRef.current = false;
      setIsGenerating(false);
      setIsReady(false);
      setError("Hex grid worker is unavailable");
    };

    const initMessage: HexGridWorkerInMessage = { type: "init" };
    worker.postMessage(initMessage);

    function revokeImageUrl() {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
        imageUrlRef.current = null;
      }
    }

    function handleWorkerMessage(message: HexGridWorkerOutMessage) {
      if (message.type === "ready") {
        setIsReady(true);
        setError(null);
        return;
      }
      if (message.type === "progress") {
        if (message.requestId !== requestIdRef.current) return;
        setProgress({ drawn: message.drawn, total: message.total });
        isGeneratingRef.current = true;
        setIsGenerating(true);
        return;
      }
      if (message.type === "done") {
        if (message.requestId !== requestIdRef.current) return;
        setProgress({ drawn: message.drawn, total: message.total });
        revokeImageUrl();
        const url = URL.createObjectURL(new Blob([message.png], { type: "image/png" }));
        imageUrlRef.current = url;
        setImage({ url, width: message.width, height: message.height });
        isGeneratingRef.current = false;
        setIsGenerating(false);
        return;
      }
      if (message.requestId !== null && message.requestId !== requestIdRef.current) return;
      isGeneratingRef.current = false;
      setIsGenerating(false);
      setError(message.message);
    }

    return () => {
      worker.terminate();
      workerRef.current = null;
      revokeImageUrl();
      setImage(null);
      setIsReady(false);
      isGeneratingRef.current = false;
      setIsGenerating(false);
    };
  }, []);

  const render = useCallback(
    (value: HexGridFormValues) => {
      const worker = workerRef.current;
      if (!worker) return;

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setError(null);
      setGenerating(true);
      setProgress({ drawn: 0, total: 0 });

      const message: HexGridWorkerInMessage = { type: "render", requestId, value };
      worker.postMessage(message);
    },
    [setGenerating],
  );

  const cancel = useCallback(() => {
    const worker = workerRef.current;
    if (!worker || !isGeneratingRef.current) return;

    const requestId = requestIdRef.current;
    const message: HexGridWorkerInMessage = { type: "cancel", requestId };
    worker.postMessage(message);
    requestIdRef.current = requestId + 1;
    setGenerating(false);
  }, [setGenerating]);

  return { render, cancel, progress, image, isGenerating, isReady, error };
}
