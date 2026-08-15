export type TierId = "free" | "basic";

/** Shared Polar prices with ClassClarus: $0 / $3 month / $30 year. */
export const PLAN_PRICES = {
  free: 0,
  monthly: 3,
  yearly: 30,
} as const;
