import type { Id } from "../../../convex/_generated/dataModel";

export function optionalFileId(value: string | undefined): Id<"files"> | undefined {
  const trimmed = value?.trim();
  return trimmed ? (trimmed as Id<"files">) : undefined;
}
