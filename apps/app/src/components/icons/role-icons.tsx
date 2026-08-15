/** @format */

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons/faCrown";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons/faHatWizard";
import { faHelmetUn } from "@fortawesome/free-solid-svg-icons/faHelmetUn";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faUserShield } from "@fortawesome/free-solid-svg-icons/faUserShield";
import { Crown, GraduationCap, Heart, User, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { badgeVariants } from "@/components/ui/badge-variants";
import { Badge } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";

type FaRoleIconProps = Omit<React.ComponentProps<typeof FontAwesomeIcon>, "icon">;

function FaRoleIcon({
  icon,
  colorClassName,
  className,
  ...props
}: FaRoleIconProps & { icon: IconDefinition; colorClassName: string }) {
  return <FontAwesomeIcon icon={icon} className={cn(colorClassName, className)} {...props} />;
}

export function OwnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Crown {...props} className={cn("text-amber-600 dark:text-amber-400", props.className)} />;
}

export function TeacherIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <User {...props} className={cn("text-purple-600 dark:text-purple-400", props.className)} />
  );
}

export function AssistantTeacherIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <UserCheck {...props} className={cn("text-cyan-600 dark:text-cyan-400", props.className)} />
  );
}

export function GuardianIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Heart {...props} className={cn("text-pink-600 dark:text-pink-400", props.className)} />;
}

export function StudentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <GraduationCap
      {...props}
      className={cn("text-green-600 dark:text-green-400", props.className)}
    />
  );
}

// Role Badge Components
interface RoleBadgeProps extends Omit<React.ComponentProps<"span">, "variant"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  className?: string;
  children: React.ReactNode;
}

export function OwnerBadge({ className, variant = "outline", children, ...props }: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400",
        className,
      )}
      {...props}
    >
      <OwnerIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function TeacherBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400",
        className,
      )}
      {...props}
    >
      <TeacherIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function AssistantTeacherBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400",
        className,
      )}
      {...props}
    >
      <AssistantTeacherIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function StudentBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400",
        className,
      )}
      {...props}
    >
      <StudentIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function GuardianBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400",
        className,
      )}
      {...props}
    >
      <GuardianIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function WorldOwnerIcon(props: FaRoleIconProps) {
  return (
    <FaRoleIcon icon={faCrown} colorClassName="text-amber-600 dark:text-amber-400" {...props} />
  );
}

export function GameMasterIcon(props: FaRoleIconProps) {
  return (
    <FaRoleIcon
      icon={faHatWizard}
      colorClassName="text-purple-600 dark:text-purple-400"
      {...props}
    />
  );
}

export function AssistantGameMasterIcon(props: FaRoleIconProps) {
  return (
    <FaRoleIcon icon={faUserShield} colorClassName="text-cyan-600 dark:text-cyan-400" {...props} />
  );
}

export function PartyLeaderIcon(props: FaRoleIconProps) {
  return (
    <FaRoleIcon icon={faHelmetUn} colorClassName="text-rose-600 dark:text-rose-400" {...props} />
  );
}

export function MemberIcon(props: FaRoleIconProps) {
  return (
    <FaRoleIcon icon={faUser} colorClassName="text-green-600 dark:text-green-400" {...props} />
  );
}

export function WorldOwnerBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400",
        className,
      )}
      {...props}
    >
      <WorldOwnerIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function GameMasterBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400",
        className,
      )}
      {...props}
    >
      <GameMasterIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function AssistantGameMasterBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400",
        className,
      )}
      {...props}
    >
      <AssistantGameMasterIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function PartyLeaderBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400",
        className,
      )}
      {...props}
    >
      <PartyLeaderIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}

export function MemberBadge({
  className,
  variant = "outline",
  children,
  ...props
}: RoleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400",
        className,
      )}
      {...props}
    >
      <MemberIcon className="size-3" aria-hidden />
      {children}
    </Badge>
  );
}
