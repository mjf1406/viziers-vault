const STEP_EPS = 1e-8;

function stepDecimalPlaces(step: number): number {
  if (!Number.isFinite(step) || Number.isInteger(step)) return 0;
  const text = step.toString().toLowerCase();
  const scientific = /^(-?\d+(?:\.\d+)?)e-(\d+)$/.exec(text);
  if (scientific) {
    const fraction = scientific[1]?.split(".")[1] ?? "";
    return Math.min(8, Number(scientific[2]) + fraction.length);
  }
  const dot = text.indexOf(".");
  return dot === -1 ? 0 : Math.min(8, text.length - dot - 1);
}

/** Avoid float drift like `0.1 + 0.1 + 0.1 === 0.30000000000000004`. */
function roundToStepPrecision(value: number, step: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(step) || step <= 0) return value;
  return Number(value.toFixed(stepDecimalPlaces(step)));
}

/** HTML number inputs use `min` as the step origin (`min + n * step`). */
function stepOrigin(min: number): number {
  return Number.isFinite(min) ? min : 0;
}

/** Collapse binary error so 2.95 / 0.1 is 29.5, not 29.499999999996. */
function stepIndex(value: number, origin: number, step: number): number {
  return Number(((value - origin) / step).toPrecision(12));
}

export function nearestStepValue(value: number, step: number, min: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(step) || step <= 0) return value;
  const origin = stepOrigin(min);
  const n = Math.round(stepIndex(value, origin, step));
  return roundToStepPrecision(origin + n * step, step);
}

export function adjacentStepValue(
  value: number,
  step: number,
  min: number,
  direction: 1 | -1,
): number {
  if (!Number.isFinite(step) || step <= 0) return value + direction;
  const origin = stepOrigin(min);
  const k = stepIndex(value, origin, step);
  const n = direction > 0 ? Math.floor(k + STEP_EPS) + 1 : Math.ceil(k - STEP_EPS) - 1;
  return roundToStepPrecision(origin + n * step, step);
}
