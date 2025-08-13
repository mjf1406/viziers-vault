/** @format */

// SignInWithGoogle.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export function SignInWithGoogle() {
    const { signIn } = useAuthActions();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("google");
            router.push("/dashboard");
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handleSignIn}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
                <FaGoogle className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Signing in…" : "Google"}
        </Button>
    );
}
