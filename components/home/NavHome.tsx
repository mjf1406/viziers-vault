/** @format */

import { IdCardIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function NavHome() {
    const navItems = [{ path: "/about", icon: IdCardIcon, label: "About" }];

    return (
        <nav className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                    key={path}
                    href={path}
                >
                    <Button
                        size="sm"
                        className="flex items-center gap-1.5 px-3"
                        variant={"ghost"}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{label}</span>
                    </Button>
                </Link>
            ))}
        </nav>
    );
}
