import { createContext, useContext } from "react";

import type { WorldPermission, WorldRole } from "@/lib/permissions/worldPermissions";

export type WorldPermissionsContextValue = {
  role: WorldRole | null;
  permissions: ReadonlyArray<string>;
  can: (permission: WorldPermission | string) => boolean;
  isPending: boolean;
};

export const WorldPermissionsContext = createContext<WorldPermissionsContextValue | null>(null);

export function useWorldPermissionsContext(): WorldPermissionsContextValue {
  const context = useContext(WorldPermissionsContext);
  if (!context) {
    throw new Error("useWorldPermissionsContext must be used within a WorldPermissionsProvider.");
  }
  return context;
}

export function useOptionalWorldPermissionsContext(): WorldPermissionsContextValue | null {
  return useContext(WorldPermissionsContext);
}
