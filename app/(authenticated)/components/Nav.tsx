/** @format */

"use client";
/** @format */

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Home,
    Users,
    ShoppingBag,
    Swords,
    Globe,
    MapPinned,
    Map,
} from "lucide-react";
import Link from "next/link";

export default function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { path: "/parties", icon: Users, label: "Parties" },
        // { path: "/magic-shops", icon: ShoppingBag, label: "Magic Shops" },
        // { path: "/encounters", icon: Swords, label: "Encounters" },
        { path: "/worlds", icon: Globe, label: "Worlds" },
        { path: "/battle-maps", icon: MapPinned, label: "Battle Maps" },
    ];

    return (
        <nav className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = pathname === path;
                return (
                    <Button
                        asChild
                        key={path}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className="flex items-center gap-1.5 px-3"
                    >
                        <Link
                            href={path}
                            passHref
                        >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{label}</span>
                        </Link>
                    </Button>
                );
            })}
        </nav>
    );
}
