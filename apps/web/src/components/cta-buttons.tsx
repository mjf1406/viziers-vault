import { ArrowRight, Monitor, Server } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
type ButtonSize = "default" | "xs" | "sm" | "lg";

export function DesktopAppButton({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  const { t } = useTranslation("cta");

  return (
    <Button
      variant={variant}
      className={className}
      nativeButton={false}
      render={<a href={SITE.downloadUrl} rel="noopener noreferrer" target="_blank" />}
    >
      <Monitor className="mr-2 size-5" />
      {t("desktopApp")}
    </Button>
  );
}

export function SelfHostButton({
  className,
  variant = "outline",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  const { t } = useTranslation("cta");

  return (
    <Button
      variant={variant}
      className={className}
      nativeButton={false}
      render={<a href={SITE.selfHostUrl} rel="noopener noreferrer" target="_blank" />}
    >
      <Server className="mr-2 size-5" />
      {t("selfHost")}
    </Button>
  );
}

export function GetStartedButton({
  className,
  variant = "secondary",
  size = "default",
}: {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  const { t } = useTranslation("cta");

  return (
    <Button
      variant={variant}
      size={size}
      className={`group/arrow font-bold ${className ?? ""}`}
      nativeButton={false}
      render={<a href={SITE.appUrl} />}
    >
      {t("getStarted")}
      <ArrowRight
        className={`${size === "sm" || size === "xs" ? "size-4" : "size-5"} transition-transform group-hover/arrow:translate-x-1`}
      />
    </Button>
  );
}

export function LearnMoreButton({
  className,
  variant = "outline",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  const { t } = useTranslation("cta");

  return (
    <Button
      variant={variant}
      className={className}
      nativeButton={false}
      render={<a href="#features" />}
    >
      {t("learnMore")}
    </Button>
  );
}

export function SubscribeNowButton({
  className,
  variant = "ghost",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  const { t } = useTranslation("cta");

  return (
    <Button
      variant={variant}
      className={`group/arrow font-bold ${className ?? ""}`}
      nativeButton={false}
      render={<a href={`${SITE.appUrl}/account`} />}
    >
      {t("subscribeNow")}
      <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
    </Button>
  );
}
