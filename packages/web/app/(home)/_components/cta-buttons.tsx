/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Server } from "lucide-react";
import Link from "next/link";

// URLs and copy derived from hero section
const DESKTOP_APP_URL =
    "https://github.com/mjf1406/viziers-vault/releases/latest";
const SELF_HOST_URL = "https://github.com/mjf1406/viziers-vault/docker.md";
const SUBSCRIBE_URL = "/app/dashboard";

type ButtonVariant =
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";

/** Desktop App CTA — matches hero: default variant, Monitor icon, releases link */
export function DesktopAppButton({
    className,
    variant = "default",
}: {
    className?: string;
    variant?: ButtonVariant;
}) {
    return (
        <Button asChild variant={variant} className={className}>
            <Link href={DESKTOP_APP_URL}>
                <Monitor className="size-5 mr-2" />
                Desktop App
            </Link>
        </Button>
    );
}

/** Self-host CTA — matches hero: outline variant, Server icon, docker link */
export function SelfHostButton({
    className,
    variant = "outline",
}: {
    className?: string;
    variant?: ButtonVariant;
}) {
    return (
        <Button asChild variant={variant} className={className}>
            <Link href={SELF_HOST_URL}>
                <Server className="size-5 mr-2" />
                Self-host
            </Link>
        </Button>
    );
}

/** Subscribe Now CTA — matches hero: ghost variant, ArrowRight icon, dashboard link */
export function SubscribeNowButton({
    className,
    variant = "ghost",
}: {
    className?: string;
    variant?: ButtonVariant;
}) {
    return (
        <Button
            asChild
            variant={variant}
            className={`group/arrow font-bold ${className ?? ""}`}
        >
            <Link href={SUBSCRIBE_URL}>
                Subscribe Now
                <ArrowRight className="size-5 ml-2 transition-transform group-hover/arrow:translate-x-1" />
            </Link>
        </Button>
    );
}
