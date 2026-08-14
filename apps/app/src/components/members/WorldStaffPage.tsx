import { SearchIcon, UsersIcon, UserMinusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { WorldRoleBadge } from "@/components/badges/WorldRoleBadges";
import { CanWorld } from "@/components/permissions/CanWorld";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useRemoveWorldMember } from "@/hooks/members/useRemoveWorldMember";
import { useWorldStaffByRole } from "@/hooks/members/useWorldStaffByRole";
import { useWorldCan } from "@/hooks/permissions/useWorldCan";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { removePermissionForStaff, type WorldStaffMember } from "@/lib/members/worldMembers";
import type { MemberListRole } from "@/lib/permissions/worldPermissions";
import { getDisplayName, getInitials } from "@/lib/user/userDisplay";
import { sanitizeAvatarUrl } from "../../../convex/lib/avatarUrl";
import type { Id } from "../../../convex/_generated/dataModel";

type WorldStaffPageProps = {
  worldId: Id<"worlds">;
  role: MemberListRole;
  titleKey: "navGameMasters" | "navAssistantGameMasters";
};

function StaffSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton key={index} className="h-40 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function WorldStaffPage({ worldId, role, titleKey }: WorldStaffPageProps) {
  const { t } = useTranslation("worlds");
  const { data: currentUser } = useCurrentUser();
  const { can } = useWorldCan();
  const { data, isPending, isError, refetch, isAuthLoading } = useWorldStaffByRole(worldId, role);
  const removeMutation = useRemoveWorldMember(role);
  const [searchQuery, setSearchQuery] = useState("");
  const members = data ?? [];
  const query = searchQuery.trim().toLowerCase();
  const filtered = query
    ? members.filter((member) => {
        const label = (member.name ?? member.email ?? member.userId).toLowerCase();
        return label.includes(query);
      })
    : members;

  const handleRemove = useCallback(
    async (member: WorldStaffMember) => {
      await removeMutation.mutateAsync({ worldId, userId: member.userId });
    },
    [removeMutation, worldId],
  );

  const showSkeleton = (isPending || isAuthLoading) && data == null;

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t(titleKey)}</h1>
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

      {showSkeleton ? <StaffSkeleton /> : null}
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
          {filtered.map((member) => {
            const isSelf = member.userId === currentUser?._id;
            const removePerm = removePermissionForStaff(member.role);
            const canRemove = removePerm !== null && can(removePerm) && !isSelf;
            return (
              <Card key={member.userId} size="sm">
                <CardHeader className="flex flex-row items-start gap-3">
                  <Avatar>
                    <AvatarImage src={sanitizeAvatarUrl(member.image) ?? undefined} alt="" />
                    <AvatarFallback>
                      {getInitials({
                        _id: member.userId,
                        name: member.name,
                        email: member.email,
                      })}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {getDisplayName(
                        { _id: member.userId, name: member.name, email: member.email },
                        t("unnamedMember"),
                      )}
                    </p>
                    <WorldRoleBadge role={member.role} className="mt-1" />
                  </div>
                </CardHeader>
                {canRemove ? (
                  <CardContent>
                    <CanWorld permission={removePerm!}>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => void handleRemove(member)}
                      >
                        <UserMinusIcon data-icon="inline-start" />
                        {t("removeMember")}
                      </Button>
                    </CanWorld>
                  </CardContent>
                ) : null}
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
