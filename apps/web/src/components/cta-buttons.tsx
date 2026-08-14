import { ArrowRight, Monitor, Server } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";

export function DesktopAppButton({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  return (
    <Button
      variant={variant}
      className={className}
      nativeButton={false}
      render={<a href={SITE.downloadUrl} rel="noopener noreferrer" target="_blank" />}
    >
      <Monitor className="mr-2 size-5" />
      Desktop App
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
  return (
    <Button
      variant={variant}
      className={className}
      nativeButton={false}
      render={<a href={SITE.selfHostUrl} rel="noopener noreferrer" target="_blank" />}
    >
      <Server className="mr-2 size-5" />
      Self-host
    </Button>
  );
}

export function GetStartedButton({
  className,
  variant = "secondary",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  return (
    <Button
      variant={variant}
      className={`group/arrow font-bold ${className ?? ""}`}
      nativeButton={false}
      render={<a href={SITE.appUrl} />}
    >
      Get Started
      <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
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
  return (
    <Button
      variant={variant}
      className={className}
      nativeButton={false}
      render={<a href="#features" />}
    >
      Learn more
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
  return (
    <Button
      variant={variant}
      className={`group/arrow font-bold ${className ?? ""}`}
      nativeButton={false}
      render={<a href={`${SITE.appUrl}/account`} />}
    >
      Subscribe Now
      <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
    </Button>
  );
}
