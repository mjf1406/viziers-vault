/** @format */

import { SignOutButton } from "@/components/auth/SignOutButton";
import { ThemeSelector } from "@/components/theme/theme-selector";
import HeaderLogo from "@/components/brand/HeaderLogo";

export default function Header() {
    return (
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 backdrop-blur-sm bg-secondary">
            <div className="flex items-center gap-6">
                <HeaderLogo />
            </div>
            <div className="justify-center flex items-center gap-2">
                <SignOutButton />
                <ThemeSelector />
            </div>
        </header>
    );
}
