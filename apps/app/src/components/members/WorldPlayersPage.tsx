import { SearchIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { PartyRoleBadge } from "@/components/badges/PartyRoleBadges";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ErrorState } from "@/components/ui/error-state";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorldPartyPlayers } from "@/hooks/members/useWorldPartyPlayers";
import { worldRoleLabelKey } from "@/lib/members/worldMembers";
import { getDisplayName, getInitials } from "@/lib/user/userDisplay";
import { sanitizeAvatarUrl } from "../../../convex/lib/avatarUrl";
import type { Id } from "../../../convex/_generated/dataModel";

type WorldPlayersPageProps = {
  worldId: Id<"worlds">;
};

function PlayersSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton key={index} className="h-40 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function WorldPlayersPage({ worldId }: WorldPlayersPageProps) {
  const { t } = useTranslation("worlds");
  const { data, isPending, isError, refetch, isAuthLoading } = useWorldPartyPlayers(worldId);
  const [searchQuery, setSearchQuery] = useState("");
  const players = data ?? [];
  const query = searchQuery.trim().toLowerCase();
  const filtered = query
    ? players.filter((player) => {
        const label = (player.name ?? player.email ?? player.userId).toLowerCase();
        return label.includes(query) || player.partyName.toLowerCase().includes(query);
      })
    : players;

  const showSkeleton = (isPending || isAuthLoading) && data == null;

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("navPlayers")}</h1>
        <p className="text-sm text-muted-foreground">{t("membersDescription")}</p>
      </div>

      <InputGroup className="max-w-md">
        <InputGroupAddon>
          <InputGroupText>
            <SearchIcon />
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={t("membersSearchPlaceholder")}
          aria-label={t("membersSearchLabel")}
        />
        {searchQuery ? (
          <InputGroupButton aria-label={t("membersSearchClear")} onClick={() => setSearchQuery("")}>
            ×
          </InputGroupButton>
        ) : null}
      </InputGroup>

      {showSkeleton ? <PlayersSkeleton /> : null}
      {!showSkeleton && isError ? (
        <ErrorState title={t("membersLoadFailed")} onRetry={() => void refetch()} />
      ) : null}
      {!showSkeleton && !isError && filtered.length === 0 ? (
        <Empty card>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UsersIcon />
            </EmptyMedia>
            <EmptyTitle>{t("membersEmptyTitle")}</EmptyTitle>
            <EmptyDescription>{t("membersEmptyDescription")}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : null}

      {!showSkeleton && !isError && filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((player) => (
            <Card key={`${player.partyId}:${player.userId}`} size="sm">
              <CardHeader className="flex flex-row items-start gap-3">
                <Avatar>
                  <AvatarImage src={sanitizeAvatarUrl(player.image) ?? undefined} alt="" />
                  <AvatarFallback>
                    {getInitials({
                      _id: player.userId,
                      name: player.name,
                      email: player.email,
                    })}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {getDisplayName(
                      { _id: player.userId, name: player.name, email: player.email },
                      t("unnamedMember"),
                    )}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{player.partyName}</p>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <PartyRoleBadge role={player.partyRole} />
                <span className="text-xs text-muted-foreground">
                  {t(worldRoleLabelKey("player"))}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
