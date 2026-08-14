import { z } from "zod";

import { worldFormSchemaEn } from "../../../convex/lib/worlds/worldFormSchema";
import type { Id } from "../../../convex/_generated/dataModel";

export const worldFormSchema = worldFormSchemaEn;

export type WorldFormValues = z.infer<typeof worldFormSchema>;

export type WorldFormValuesWithImage = WorldFormValues & {
  imageFileId?: Id<"files">;
};

export { deleteConfirmationPhrase } from "../../../convex/lib/worlds/worldFormSchema";
