/**
 * Regular hexagon geometry.
 *
 * Labels (https://www.omnicalculator.com/math/hexagon):
 * https://uploads-cdn.omnicalculator.com/images/geometry/area/hexagon-calc-r2.svg?width=350&enlarge=0&format=webp
 *   a - side length
 *   P - perimeter
 *   d - long diagonal   (vertex to opposite vertex)
 *   s - short diagonal   (vertex to vertex with one vertex between them)
 *   R - circumradius     (center to vertex) — equals side length `a`
 *   r - apothem / inradius (center to midpoint of a side)
 *   A - area
 *   t - perpendicular distance from the "middle vertex" of a short
 *       diagonal down to that diagonal itself. The short diagonal `s`
 *       and the two hexagon sides meeting at the vertex between its
 *       endpoints form an isosceles (right-split, so two right
 *       scalene) triangle with legs `a`, `a` and base `s`; `t` is
 *       that triangle's height.
 *
 * Base relations (all derived from side `a`):
 *   P = 6a
 *   d = 2a
 *   s = √3 · a
 *   R = a
 *   r = (√3 / 2) · a
 *   A = (3√3 / 2) · a²
 *   t = a / 2
 */

const SQRT3 = Math.sqrt(3);

export interface HexagonMetrics {
  a: number; // side
  P: number; // perimeter
  d: number; // long diagonal
  s: number; // short diagonal
  R: number; // circumradius
  r: number; // apothem / inradius
  A: number; // area
  t: number; // middle-vertex-to-short-diagonal height (= a / 2)
}

/** Build every metric from the side length. */
export function fromSide(a: number): HexagonMetrics {
  return {
    a,
    P: 6 * a,
    d: 2 * a,
    s: SQRT3 * a,
    R: a,
    r: (SQRT3 / 2) * a,
    A: ((3 * SQRT3) / 2) * a * a,
    t: a / 2,
  };
}

export function fromPerimeter(P: number): HexagonMetrics {
  return fromSide(P / 6);
}

export function fromLongDiagonal(d: number): HexagonMetrics {
  return fromSide(d / 2);
}

export function fromShortDiagonal(s: number): HexagonMetrics {
  return fromSide(s / SQRT3);
}

export function fromCircumradius(R: number): HexagonMetrics {
  return fromSide(R); // R === a for a regular hexagon
}

export function fromApothem(r: number): HexagonMetrics {
  return fromSide((2 * r) / SQRT3);
}

export function fromArea(A: number): HexagonMetrics {
  return fromSide(Math.sqrt((2 * A) / (3 * SQRT3)));
}

/**
 * VTT-style "grid size" input (FoundryVTT, Fantasy Grounds, etc).
 *
 * These tools define the size a user types in as the flat-to-flat
 * distance across the hexagon (top-to-bottom on a flat-topped hex,
 * or left-to-right on a pointy-topped hex) — i.e. twice the apothem.
 * That value is numerically identical to the short diagonal `s`.
 *
 * FoundryVTT docs: "We set the 'size' of a hexagon (the distance
 * from a hexagon's centre to a vertex) to be equal to the grid size
 * divided by √3." -> a = gridSize / √3
 *
 * So this is just an aliased, more discoverable entry point to
 * fromShortDiagonal — use it when working with VTT grid-size values
 * so the intent is clear at the call site.
 */
export function fromGridSize(gridSize: number): HexagonMetrics {
  return fromShortDiagonal(gridSize);
}

/** Direct pairwise conversions, no need to round-trip through `a`. */
export const convert = {
  dToS: (d: number): number => d * (SQRT3 / 2), // ≈ d * 0.866
  sToD: (s: number): number => s * (2 / SQRT3), // ≈ s * 1.155
  rToS: (r: number): number => r * 2,
  sToR: (s: number): number => s / 2,
  rToD: (r: number): number => r * (4 / SQRT3), // ≈ r * 2.309
  dToR: (d: number): number => d * (SQRT3 / 4), // ≈ d * 0.433
  aToR: (a: number): number => a, // circumradius === side
  rToA_side: (r: number): number => (2 * r) / SQRT3, // apothem -> side
  aToApothem: (a: number): number => (SQRT3 / 2) * a, // ≈ a * 0.866
  aToT: (a: number): number => a / 2,
  tToA: (t: number): number => t * 2,
};

/**
 * Compute every metric from a single known value.
 * Example: solveHexagon('d', 4) -> full HexagonMetrics
 */
export function solveHexagon(
  knownParam: keyof HexagonMetrics | "gridSize",
  value: number,
): HexagonMetrics {
  switch (knownParam) {
    case "a":
      return fromSide(value);
    case "P":
      return fromPerimeter(value);
    case "d":
      return fromLongDiagonal(value);
    case "s":
      return fromShortDiagonal(value);
    case "R":
      return fromCircumradius(value);
    case "r":
      return fromApothem(value);
    case "A":
      return fromArea(value);
    case "gridSize":
      return fromGridSize(value);
    default:
      throw new Error(`Unknown hexagon parameter: ${String(knownParam)}`);
  }
}

// --- Example usage ---
// const hex = fromSide(2);
// console.log(hex);
// -> { a: 2, P: 12, d: 4, s: 3.464..., R: 2, r: 1.732..., A: 10.392..., t: 1 }
