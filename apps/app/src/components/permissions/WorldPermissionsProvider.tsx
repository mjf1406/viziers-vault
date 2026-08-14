import { useMemo, type ReactNode } from "react";

import {
  WorldPermissionsContext,
  type WorldPermissionsContextValue,
} from "@/components/permissions/worldPermissionsContext";
import { useWorldPermissions } from "@/hooks/permissions/useWorldPermissions";
import {
  createPermissionChecker,
  permissionsFromRole,
  type WorldRole,
} from "@/lib/permissions/worldPermissions";
import type { Id } from "../../../convex/_generated/dataModel";

type WorldPermissionsProviderProps = {
  children: ReactNode;
  worldId?: Id<"worlds">;
  role?: WorldRole | "party_player" | null;
};

export function WorldPermissionsProvider({
  children,
  worldId,
  role = null,
}: WorldPermissionsProviderProps) {
  if (worldId !== undefined) {
    return <WorldPermissionsFromQuery worldId={worldId}>{children}</WorldPermissionsFromQuery>;
  }

  return <WorldPermissionsFromRole role={role}>{children}</WorldPermissionsFromRole>;
}

function WorldPermissionsFromQuery({
  worldId,
  children,
}: {
  worldId: Id<"worlds">;
  children: ReactNode;
}) {
  const { data, isPending, isError } = useWorldPermissions(worldId);

  const value = useMemo<WorldPermissionsContextValue>(() => {
    const permissions = data?.permissions ?? [];
    return {
      role: (data?.role as WorldRole | null | undefined) ?? null,
      permissions,
      can: createPermissionChecker(permissions),
      isPending: isPending || isError,
    };
  }, [data, isPending, isError]);

  return (
    <WorldPermissionsContext.Provider value={value}>{children}</WorldPermissionsContext.Provider>
  );
}

function WorldPermissionsFromRole({
  role,
  children,
}: {
  role: WorldRole | "party_player" | null;
  children: ReactNode;
}) {
  const value = useMemo<WorldPermissionsContextValue>(() => {
    const worldRole = role === "party_player" ? null : role;
    const permissions = permissionsFromRole(worldRole);
    return {
      role: worldRole,
      permissions,
      can: createPermissionChecker(permissions),
      isPending: false,
    };
  }, [role]);

  return (
    <WorldPermissionsContext.Provider value={value}>{children}</WorldPermissionsContext.Provider>
  );
}
