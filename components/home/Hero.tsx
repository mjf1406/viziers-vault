/** @format */

import Image from "next/image";
import FullLogo from "@/public/img/Vizier's Vault Logo - Full.png";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="flex flex-row gap-2 items-center justify-between">
            <div className="flex flex-col justify-between items-center gap-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Welcome to Vizier's Vault
                </h1>
                <p className=" max-w-lg text-lg text-gray-600 dark:text-gray-400">
                    Randomly generate lots of things for your TTRPGs. Track
                    parties on your world/region maps.
                </p>
                <p>
                    <Button asChild>
                        <Link href={"/sign-in"}>Get started</Link>
                    </Button>{" "}
                    <Button
                        asChild
                        variant={"outline"}
                    >
                        <Link href={"#features"}>Learn more</Link>
                    </Button>
                </p>
            </div>
            <div className="col-span-1 flex justify-center items-center">
                <Image
                    alt="Vizier's Vault Logo"
                    src={FullLogo}
                    width={500}
                    height={500}
                    blurDataURL={FullLogo.blurDataURL}
                />
            </div>
        </div>
    );
}
