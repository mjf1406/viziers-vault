const HOUR_MS = 3_600_000;

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/** Stopwatch text: `00:12.4`, or `1:02:03.4` once hours elapse. */
export function formatElapsed(ms: number): string {
  const elapsed = Number.isFinite(ms) ? Math.max(0, Math.floor(ms)) : 0;
  const tenthsTotal = Math.floor(elapsed / 100);
  const tenths = tenthsTotal % 10;
  const totalSeconds = Math.floor(tenthsTotal / 10);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);

  if (elapsed < HOUR_MS) {
    return `${pad2(totalMinutes)}:${pad2(seconds)}.${tenths}`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${pad2(minutes)}:${pad2(seconds)}.${tenths}`;
}
