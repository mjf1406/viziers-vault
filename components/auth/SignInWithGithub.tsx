/** @format */

// SignInWithGithub.tsx
"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "../ui/button";
import { Github, Loader2 } from "lucide-react";

export function SignInWithGithub() {
    const { signIn } = useAuthActions();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("github");
        } catch (error) {
            // Optionally handle the error here
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
                <Github className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Signing in…" : "GitHub"}
        </Button>
    );
}
