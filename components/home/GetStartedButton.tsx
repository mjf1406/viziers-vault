/** @format */

"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function GetStartedButton() {
    return (
        <>
            <Authenticated>
                <Button asChild>
                    <Link href="/parties">Get started</Link>
                </Button>
            </Authenticated>
            <Unauthenticated>
                <Button asChild>
                    <Link href="/auth/sign-in">Get started</Link>
                </Button>
            </Unauthenticated>
        </>
    );
}
