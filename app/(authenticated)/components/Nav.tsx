/** @format */

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
    const navItems = [
        { path: "/parties", icon: Users, label: "Parties" },
        // { path: "/magic-shops", icon: ShoppingBag, label: "Magic Shops" },
        // { path: "/encounters", icon: Swords, label: "Encounters" },
        { path: "/worlds", icon: Globe, label: "Worlds" },
        { path: "/battle-maps", icon: MapPinned, label: "Battle Maps" },
    ];

    return (
        <nav className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                    key={path}
                    href={path}
                >
                    <Button
                        variant={
                            location.pathname === path ? "default" : "ghost"
                        }
                        size="sm"
                        className="flex items-center gap-1.5 px-3"
                    >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{label}</span>
                    </Button>
                </Link>
            ))}
        </nav>
    );
}
