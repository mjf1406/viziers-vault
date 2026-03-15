/** @format */

"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar as SharedNavbar } from "shared";
import type { NavbarRoute } from "shared";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const routeList: NavbarRoute[] = [
    { href: "/web/about", label: "About" },
    { href: "/app/dashboard", label: "App" },
    { href: "/blog", label: "Blog" },
    { href: "/web/contact", label: "Contact" },
    { href: "/docs", label: "Docs" },
    { href: "/web/faq", label: "FAQ" },
    { href: "/web/pricing", label: "Pricing" },
    { href: "/web/team", label: "Team" },
];

function NextLink({
    href,
    className,
    onClick,
    children,
}: {
    href: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}) {
    return (
        <Link href={href} className={className} onClick={onClick} prefetch={false}>
            {children}
        </Link>
    );
}

export const Navbar = () => (
    <SharedNavbar
        routes={routeList}
        LinkComponent={NextLink}
        themeToggle={<ThemeToggle />}
        logoHref="/"
    />
);
