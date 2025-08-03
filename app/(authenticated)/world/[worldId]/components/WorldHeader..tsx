/** @format */

import { SignOutButton } from "@/components/auth/SignOutButton";
import { ThemeSelector } from "@/components/theme/theme-selector";
import HeaderLogo from "@/components/brand/HeaderLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorldHeader() {
    return (
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 backdrop-blur-sm">
            <div className="flex items-center gap-6">
                <HeaderLogo />
                <Button
                    asChild
                    variant={"ghost"}
                    size="sm"
                    className="hover:bg-primary dark:hover:bg-primary/80"
                >
                    <Link href={"/dashboard"}>Dashboard</Link>
                </Button>
            </div>
            <div className="justify-center flex items-center gap-2">
                <SignOutButton />
                <ThemeSelector />
            </div>
        </header>
    );
}
