/** @format */
"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
    const { signIn } = useAuthActions();
    const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
    const [loading, setLoading] = useState({
        credential: false,
        anonymous: false,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading((s) => ({ ...s, credential: true }));
        const formData = new FormData(e.currentTarget);
        formData.set("flow", flow);
        try {
            await signIn("password", formData);
        } catch (err: any) {
            const msg = err.message.includes("Invalid password")
                ? "Invalid password. Please try again."
                : flow === "signIn"
                  ? "Could not sign in, did you mean to sign up?"
                  : "Could not sign up, did you mean to sign in?";
            toast.error(msg);
        } finally {
            setLoading((s) => ({ ...s, credential: false }));
        }
    };

    const handleAnonymous = async () => {
        setLoading((s) => ({ ...s, anonymous: true }));
        try {
            await signIn("anonymous");
        } finally {
            setLoading((s) => ({ ...s, anonymous: false }));
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen
      bg-gray-50 dark:bg-gray-900"
        >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Sign In
            </h1>
            <div className="w-full max-w-sm mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4"
                >
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <Button
                        type="submit"
                        disabled={loading.credential}
                    >
                        {loading.credential && (
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        )}
                        {flow === "signIn" ? "Sign in" : "Sign up"}
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                        <span>
                            {flow === "signIn"
                                ? "Don't have an account? "
                                : "Already have an account? "}
                        </span>
                        <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() =>
                                setFlow((f) =>
                                    f === "signIn" ? "signUp" : "signIn"
                                )
                            }
                        >
                            {flow === "signIn"
                                ? "Sign up instead"
                                : "Sign in instead"}
                        </button>
                    </div>
                </form>
                <div className="flex items-center my-6">
                    <Separator />
                    <span className="px-2 text-sm text-muted-foreground">
                        or
                    </span>
                    <Separator />
                </div>
                <Button
                    variant="outline"
                    onClick={handleAnonymous}
                    disabled={loading.anonymous}
                    className="w-full"
                >
                    {loading.anonymous && (
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    )}
                    Sign in anonymously
                </Button>
            </div>
        </div>
    );
}
