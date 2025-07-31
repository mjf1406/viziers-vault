/** @format */

import Image from "next/image";
import Link from "next/link";
import FullLogo from "@/public/img/Vizier's Vault Logo - Full.png";

export default function HeaderLogo() {
    return (
        <div className="h-16 flex items-center justify-center">
            <Link href="/">
                <Image
                    alt="Vizier's Vault Logo"
                    src={FullLogo}
                    width={75}
                    height={75}
                    blurDataURL={FullLogo.blurDataURL}
                />
            </Link>
        </div>
    );
}
