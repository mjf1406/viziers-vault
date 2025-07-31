/** @format */

"use client";

import { Authenticated } from "convex/react";
import Navigation from "./Nav";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { ThemeSelector } from "@/components/theme/theme-selector";
import HeaderLogo from "@/components/brand/HeaderLogo";

export default function Header() {
    return (
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-6">
                <HeaderLogo />
                <Authenticated>
                    <Navigation />
                </Authenticated>
            </div>
            <div className="justify-center flex items-center gap-2">
                <ThemeSelector />
                <SignOutButton />
            </div>
        </header>
    );
}
