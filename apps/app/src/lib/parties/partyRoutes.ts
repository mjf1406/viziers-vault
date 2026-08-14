import type { Id } from "../../../convex/_generated/dataModel";

export type PartyNavTo =
  | "/party/$partyId"
  | "/party/$partyId/settings"
  | "/party/$partyId/members"
  | "/party/$partyId/invitations"
  | "/party/$partyId/connected-worlds";

export function partyPathFor(to: PartyNavTo, partyId: Id<"parties">): string {
  return to.replace("$partyId", partyId);
}

const REST_TO_ROUTE: Record<string, PartyNavTo> = {
  "": "/party/$partyId",
  "/settings": "/party/$partyId/settings",
  "/members": "/party/$partyId/members",
  "/invitations": "/party/$partyId/invitations",
  "/connected-worlds": "/party/$partyId/connected-worlds",
};

export function partyRouteFromPathname(pathname: string, partyId: string): PartyNavTo {
  const prefix = `/party/${partyId}`;
  if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) {
    return "/party/$partyId";
  }
  const rest = pathname.slice(prefix.length);
  return REST_TO_ROUTE[rest] ?? "/party/$partyId";
}
