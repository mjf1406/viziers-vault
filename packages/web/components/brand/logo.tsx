/** @format */

import Link from "next/link";

export function LogoTextOnly(_props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Link
            href="/"
            className="text-lg font-bold text-primary hover:text-primary/80 transition-colors"
        >
            Vizier's Vault
        </Link>
    );
}
