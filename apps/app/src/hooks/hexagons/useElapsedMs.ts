import { useEffect, useState } from "react";

const TICK_MS = 100;

/** Elapsed milliseconds while `running`; freezes at the last value when it stops. */
export function useElapsedMs(running: boolean): number {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (!running) return;

    const startedAt = performance.now();
    setElapsedMs(0);

    const id = window.setInterval(() => {
      setElapsedMs(performance.now() - startedAt);
    }, TICK_MS);

    return () => {
      window.clearInterval(id);
      setElapsedMs(performance.now() - startedAt);
    };
  }, [running]);

  return elapsedMs;
}
