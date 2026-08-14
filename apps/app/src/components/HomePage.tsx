import { useMemo, useState } from "react";
import { GlobeIcon, UsersIcon } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { PartyCard } from "@/components/parties/PartyCard";
import {
  PartyFormCredenza,
  type PartyFormInitialValues,
} from "@/components/parties/PartyFormCredenza";
import { PartiesToolbar } from "@/components/parties/PartiesToolbar";
import { DeletePartyCredenza } from "@/components/parties/DeletePartyCredenza";
import { WorldCard } from "@/components/worlds/WorldCard";
import {
  WorldFormCredenza,
  type WorldFormInitialValues,
} from "@/components/worlds/WorldFormCredenza";
import { WorldsToolbar } from "@/components/worlds/WorldsToolbar";
import { DeleteWorldCredenza } from "@/components/worlds/DeleteWorldCredenza";
import { WorldPermissionsProvider } from "@/components/permissions/WorldPermissionsProvider";
import { ErrorState } from "@/components/ui/error-state";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEntitlement } from "@/hooks/billing/useEntitlement";
import { useWorlds } from "@/hooks/worlds/useWorlds";
import { useWorldSearch } from "@/hooks/worlds/useWorldSearch";
import { useCreateWorld } from "@/hooks/worlds/useCreateWorld";
import { useDeleteWorld } from "@/hooks/worlds/useDeleteWorld";
import { useSetWorldArchived } from "@/hooks/worlds/useSetWorldArchived";
import { useUpdateWorld } from "@/hooks/worlds/useUpdateWorld";
import { useParties } from "@/hooks/parties/useParties";
import { usePartySearch } from "@/hooks/parties/usePartySearch";
import { useCreateParty } from "@/hooks/parties/useCreateParty";
import { useDeleteParty } from "@/hooks/parties/useDeleteParty";
import { useSetPartyArchived } from "@/hooks/parties/useSetPartyArchived";
import { useUpdateParty } from "@/hooks/parties/useUpdateParty";
import type { PartyPublic } from "@/lib/parties/parties";
import type { WorldPublic } from "@/lib/worlds/worlds";
import { optionalFileId } from "@/lib/files/optionalFileId";
import type { PartyFormValues } from "@/lib/parties/partyFormSchema";
import type { WorldFormValues } from "@/lib/worlds/worldFormSchema";
import {
  nextSortState,
  partitionByArchive,
  sortEntities,
  type EntitySortDirection,
  type EntitySortKey,
  type EntityViewMode,
} from "@/lib/worlds/worldSort";
import { cn } from "@/lib/utils";

type WorldFormTarget = { mode: "create" } | { mode: "edit"; world: WorldPublic };
type PartyFormTarget = { mode: "create" } | { mode: "edit"; party: PartyPublic };

function EntityListSkeleton({ viewMode }: { viewMode: EntityViewMode }) {
  const items = Array.from({ length: 3 }, (_, index) => index);
  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-3">
        {items.map((index) => (
          <Skeleton key={index} className="h-16 w-full rounded-2xl" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((index) => (
        <Card key={index} size="sm">
          <CardHeader className="flex flex-row items-start gap-3">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function HomePage() {
  const { t: tWorlds } = useTranslation("worlds");
  const { t: tParties } = useTranslation("parties");
  const navigate = useNavigate();
  const { entitlement } = useEntitlement();

  const worldsQuery = useWorlds();
  const partiesQuery = useParties();
  const createWorld = useCreateWorld();
  const updateWorld = useUpdateWorld();
  const setWorldArchived = useSetWorldArchived();
  const deleteWorld = useDeleteWorld();
  const createParty = useCreateParty();
  const updateParty = useUpdateParty();
  const setPartyArchived = useSetPartyArchived();
  const deleteParty = useDeleteParty();

  const [worldSortKey, setWorldSortKey] = useState<EntitySortKey>("name");
  const [worldSortDirection, setWorldSortDirection] = useState<EntitySortDirection>("asc");
  const [worldViewMode, setWorldViewMode] = useState<EntityViewMode>("grid");
  const [worldShowArchived, setWorldShowArchived] = useState(false);
  const [worldSearchQuery, setWorldSearchQuery] = useState("");

  const [partySortKey, setPartySortKey] = useState<EntitySortKey>("name");
  const [partySortDirection, setPartySortDirection] = useState<EntitySortDirection>("asc");
  const [partyViewMode, setPartyViewMode] = useState<EntityViewMode>("grid");
  const [partyShowArchived, setPartyShowArchived] = useState(false);
  const [partySearchQuery, setPartySearchQuery] = useState("");

  const [worldFormOpen, setWorldFormOpen] = useState(false);
  const [worldFormTarget, setWorldFormTarget] = useState<WorldFormTarget>({ mode: "create" });
  const [worldDeleteOpen, setWorldDeleteOpen] = useState(false);
  const [worldDeleteTarget, setWorldDeleteTarget] = useState<WorldPublic | null>(null);

  const [partyFormOpen, setPartyFormOpen] = useState(false);
  const [partyFormTarget, setPartyFormTarget] = useState<PartyFormTarget>({ mode: "create" });
  const [partyDeleteOpen, setPartyDeleteOpen] = useState(false);
  const [partyDeleteTarget, setPartyDeleteTarget] = useState<PartyPublic | null>(null);

  const { filtered: filteredWorlds } = useWorldSearch({
    worlds: worldsQuery.data,
    query: worldSearchQuery,
  });
  const { filtered: filteredParties } = usePartySearch({
    parties: partiesQuery.data,
    query: partySearchQuery,
  });

  const worldLists = useMemo(() => {
    const partitioned = partitionByArchive(filteredWorlds);
    return {
      active: sortEntities(partitioned.active, worldSortKey, worldSortDirection),
      archived: sortEntities(partitioned.archived, worldSortKey, worldSortDirection),
    };
  }, [filteredWorlds, worldSortKey, worldSortDirection]);

  const partyLists = useMemo(() => {
    const partitioned = partitionByArchive(filteredParties);
    return {
      active: sortEntities(partitioned.active, partySortKey, partySortDirection),
      archived: sortEntities(partitioned.archived, partySortKey, partySortDirection),
    };
  }, [filteredParties, partySortKey, partySortDirection]);

  const listClassName = (viewMode: EntityViewMode) =>
    cn(viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3");

  const openCreateWorld = () => {
    if (entitlement?.status === "expired") {
      void navigate({ to: "/billing" });
      return;
    }
    setWorldFormTarget({ mode: "create" });
    setWorldFormOpen(true);
  };

  const openCreateParty = () => {
    if (entitlement?.status === "expired") {
      void navigate({ to: "/billing" });
      return;
    }
    setPartyFormTarget({ mode: "create" });
    setPartyFormOpen(true);
  };

  const worldFormInitial: WorldFormInitialValues | undefined =
    worldFormTarget.mode === "edit"
      ? {
          name: worldFormTarget.world.name,
          description: worldFormTarget.world.description,
          icon: worldFormTarget.world.icon,
          imageFileId: worldFormTarget.world.imageFileId,
        }
      : undefined;

  const partyFormInitial: PartyFormInitialValues | undefined =
    partyFormTarget.mode === "edit"
      ? {
          name: partyFormTarget.party.name,
          description: partyFormTarget.party.description,
          icon: partyFormTarget.party.icon,
          imageFileId: partyFormTarget.party.imageFileId,
        }
      : undefined;

  const handleWorldFormSubmit = async (values: WorldFormValues) => {
    if (worldFormTarget.mode === "edit") {
      await updateWorld.mutateAsync({
        worldId: worldFormTarget.world._id,
        name: values.name,
        description: values.description,
        icon: values.icon,
        imageFileId: optionalFileId(values.imageFileId),
      });
      return;
    }
    await createWorld.mutateAsync({
      name: values.name,
      description: values.description,
      icon: values.icon,
      imageFileId: optionalFileId(values.imageFileId),
    });
  };

  const handlePartyFormSubmit = async (values: PartyFormValues) => {
    if (partyFormTarget.mode === "edit") {
      await updateParty.mutateAsync({
        partyId: partyFormTarget.party._id,
        name: values.name,
        description: values.description,
        icon: values.icon,
        imageFileId: optionalFileId(values.imageFileId),
      });
      return;
    }
    await createParty.mutateAsync({
      name: values.name,
      description: values.description,
      icon: values.icon,
      imageFileId: optionalFileId(values.imageFileId),
    });
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-8 sm:px-8">
      <section className="flex flex-col gap-6">
        <WorldsToolbar
          compact
          sortKey={worldSortKey}
          sortDirection={worldSortDirection}
          viewMode={worldViewMode}
          showArchived={worldShowArchived}
          searchQuery={worldSearchQuery}
          resultCount={
            worldShowArchived
              ? worldLists.active.length + worldLists.archived.length
              : worldLists.active.length
          }
          onSearchChange={setWorldSearchQuery}
          onSortChange={(key) => {
            const next = nextSortState(worldSortKey, worldSortDirection, key);
            setWorldSortKey(next.sortKey);
            setWorldSortDirection(next.sortDirection);
          }}
          onViewModeChange={setWorldViewMode}
          onToggleArchived={() => setWorldShowArchived((v) => !v)}
          onCreate={openCreateWorld}
        />

        {worldsQuery.isPending ? <EntityListSkeleton viewMode={worldViewMode} /> : null}
        {worldsQuery.isError ? (
          <ErrorState
            card
            onRetry={() => void worldsQuery.refetch()}
            description={tWorlds("loadFailed")}
          />
        ) : null}

        {!worldsQuery.isPending && !worldsQuery.isError && (worldsQuery.data?.length ?? 0) === 0 ? (
          <Empty card>
            <EmptyHeader>
              <EmptyMedia variant="icon" size="20">
                <GlobeIcon aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>{tWorlds("emptyTitle")}</EmptyTitle>
              <EmptyDescription>{tWorlds("emptyDescription")}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex flex-row justify-center gap-2">
              <Button type="button" nativeButton={false} render={<Link to="/join" />}>
                {tWorlds("join")}
              </Button>
              <Button type="button" variant="secondary" onClick={openCreateWorld}>
                {tWorlds("createWorld")}
              </Button>
            </EmptyContent>
          </Empty>
        ) : null}

        {worldLists.active.length > 0 ? (
          <div className={listClassName(worldViewMode)}>
            {worldLists.active.map((world) => (
              <WorldPermissionsProvider key={world._id} role={world.role}>
                <WorldCard
                  world={world}
                  viewMode={worldViewMode}
                  onEdit={(doc) => {
                    setWorldFormTarget({ mode: "edit", world: doc });
                    setWorldFormOpen(true);
                  }}
                  onArchiveToggle={(doc) => {
                    void setWorldArchived.mutateAsync({
                      worldId: doc._id,
                      archived: doc.archivedAt === undefined,
                    });
                  }}
                  onDelete={(doc) => {
                    setWorldDeleteTarget(doc);
                    setWorldDeleteOpen(true);
                  }}
                />
              </WorldPermissionsProvider>
            ))}
          </div>
        ) : null}

        {worldShowArchived && worldLists.archived.length > 0 ? (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">{tWorlds("archivedSection")}</h3>
            <div className={listClassName(worldViewMode)}>
              {worldLists.archived.map((world) => (
                <WorldPermissionsProvider key={world._id} role={world.role}>
                  <WorldCard
                    world={world}
                    viewMode={worldViewMode}
                    onEdit={(doc) => {
                      setWorldFormTarget({ mode: "edit", world: doc });
                      setWorldFormOpen(true);
                    }}
                    onArchiveToggle={(doc) => {
                      void setWorldArchived.mutateAsync({ worldId: doc._id, archived: false });
                    }}
                    onDelete={(doc) => {
                      setWorldDeleteTarget(doc);
                      setWorldDeleteOpen(true);
                    }}
                  />
                </WorldPermissionsProvider>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="flex flex-col gap-6">
        <PartiesToolbar
          compact
          sortKey={partySortKey}
          sortDirection={partySortDirection}
          viewMode={partyViewMode}
          showArchived={partyShowArchived}
          searchQuery={partySearchQuery}
          resultCount={
            partyShowArchived
              ? partyLists.active.length + partyLists.archived.length
              : partyLists.active.length
          }
          onSearchChange={setPartySearchQuery}
          onSortChange={(key) => {
            const next = nextSortState(partySortKey, partySortDirection, key);
            setPartySortKey(next.sortKey);
            setPartySortDirection(next.sortDirection);
          }}
          onViewModeChange={setPartyViewMode}
          onToggleArchived={() => setPartyShowArchived((v) => !v)}
          onCreate={openCreateParty}
        />

        {partiesQuery.isPending ? <EntityListSkeleton viewMode={partyViewMode} /> : null}
        {partiesQuery.isError ? (
          <ErrorState
            card
            onRetry={() => void partiesQuery.refetch()}
            description={tParties("loadFailed")}
          />
        ) : null}

        {!partiesQuery.isPending &&
        !partiesQuery.isError &&
        (partiesQuery.data?.length ?? 0) === 0 ? (
          <Empty card>
            <EmptyHeader>
              <EmptyMedia variant="icon" size="20">
                <UsersIcon aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>{tParties("emptyTitle")}</EmptyTitle>
              <EmptyDescription>{tParties("emptyDescription")}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex flex-row justify-center gap-2">
              <Button type="button" nativeButton={false} render={<Link to="/join" />}>
                {tParties("join")}
              </Button>
              <Button type="button" variant="secondary" onClick={openCreateParty}>
                {tParties("createParty")}
              </Button>
            </EmptyContent>
          </Empty>
        ) : null}

        {partyLists.active.length > 0 ? (
          <div className={listClassName(partyViewMode)}>
            {partyLists.active.map((party) => (
              <PartyCard
                key={party._id}
                party={party}
                viewMode={partyViewMode}
                onEdit={(doc) => {
                  setPartyFormTarget({ mode: "edit", party: doc });
                  setPartyFormOpen(true);
                }}
                onArchiveToggle={(doc) => {
                  void setPartyArchived.mutateAsync({
                    partyId: doc._id,
                    archived: doc.archivedAt === undefined,
                  });
                }}
                onDelete={(doc) => {
                  setPartyDeleteTarget(doc);
                  setPartyDeleteOpen(true);
                }}
              />
            ))}
          </div>
        ) : null}

        {partyShowArchived && partyLists.archived.length > 0 ? (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">{tParties("archivedSection")}</h3>
            <div className={listClassName(partyViewMode)}>
              {partyLists.archived.map((party) => (
                <PartyCard
                  key={party._id}
                  party={party}
                  viewMode={partyViewMode}
                  onEdit={(doc) => {
                    setPartyFormTarget({ mode: "edit", party: doc });
                    setPartyFormOpen(true);
                  }}
                  onArchiveToggle={(doc) => {
                    void setPartyArchived.mutateAsync({ partyId: doc._id, archived: false });
                  }}
                  onDelete={(doc) => {
                    setPartyDeleteTarget(doc);
                    setPartyDeleteOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <WorldFormCredenza
        key={worldFormTarget.mode === "edit" ? `edit:${worldFormTarget.world._id}` : "create"}
        open={worldFormOpen}
        onOpenChange={setWorldFormOpen}
        mode={worldFormTarget.mode}
        initialValues={worldFormInitial}
        onSubmit={handleWorldFormSubmit}
      />

      <PartyFormCredenza
        key={partyFormTarget.mode === "edit" ? `edit:${partyFormTarget.party._id}` : "create"}
        open={partyFormOpen}
        onOpenChange={setPartyFormOpen}
        mode={partyFormTarget.mode}
        initialValues={partyFormInitial}
        onSubmit={handlePartyFormSubmit}
      />

      <DeleteWorldCredenza
        key={worldDeleteTarget ? `delete:${worldDeleteTarget._id}` : "delete"}
        open={worldDeleteOpen}
        onOpenChange={setWorldDeleteOpen}
        entityName={worldDeleteTarget?.name ?? ""}
        onConfirm={async (confirmation) => {
          if (!worldDeleteTarget) return;
          await deleteWorld.mutateAsync({ worldId: worldDeleteTarget._id, confirmation });
        }}
      />

      <DeletePartyCredenza
        key={partyDeleteTarget ? `delete:${partyDeleteTarget._id}` : "delete"}
        open={partyDeleteOpen}
        onOpenChange={setPartyDeleteOpen}
        entityName={partyDeleteTarget?.name ?? ""}
        onConfirm={async (confirmation) => {
          if (!partyDeleteTarget) return;
          await deleteParty.mutateAsync({ partyId: partyDeleteTarget._id, confirmation });
        }}
      />
    </main>
  );
}
