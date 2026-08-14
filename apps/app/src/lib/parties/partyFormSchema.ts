import { z } from "zod";

import { partyFormSchemaEn } from "../../../convex/lib/parties/partyFormSchema";
import type { Id } from "../../../convex/_generated/dataModel";

export const partyFormSchema = partyFormSchemaEn;

export type PartyFormValues = z.infer<typeof partyFormSchema>;

export type PartyFormValuesWithImage = PartyFormValues & {
  imageFileId?: Id<"files">;
};

export function deleteConfirmationPhrase(name: string): string {
  return `delete ${name}`;
}
