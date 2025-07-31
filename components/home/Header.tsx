/** @format */

import Link from "next/link";
import { ThemeSelector } from "../theme/theme-selector";
import HeaderLogo from "../brand/HeaderLogo";
import NavHome from "./NavHome";

export default function Header() {
    return (
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b shadow-sm backdrop-blur-sm">
            <HeaderLogo />
            <div className="flex items-center space-x-4">
                <NavHome />
                <ThemeSelector />
            </div>
        </header>
    );
}
