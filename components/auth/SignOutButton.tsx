/** @format */

"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function SignOutButton() {
    const { isAuthenticated } = useConvexAuth();
    const { signOut } = useAuthActions();
    const router = useRouter();

    if (!isAuthenticated) return null;

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <Button
            variant="ghost"
            onClick={handleSignOut}
            className="bg-background hover:bg-primary dark:hover:bg-primary"
        >
            Sign out
        </Button>
    );
}
