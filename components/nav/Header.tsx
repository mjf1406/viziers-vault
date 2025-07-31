/** @format */

import FullLogo from "@/public/img/Vizier's Vault Logo - Full.png";
import Image from "next/image";
import Link from "next/link";
import { ThemeSelector } from "../theme/theme-selector";

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full h-16 bg-gray-100 dark:bg-gray-800 px-4">
            <div className="flex justify-center items-center">
                <Link href={"/"}>
                    <Image
                        alt="Vizier's Vault Logo"
                        src={FullLogo}
                        width={100}
                        height={100}
                        blurDataURL={FullLogo.blurDataURL}
                    />
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <nav className="flex space-x-4">
                    <Link
                        href="/about"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        About
                    </Link>
                </nav>
                <ThemeSelector />
            </div>
        </header>
    );
}
