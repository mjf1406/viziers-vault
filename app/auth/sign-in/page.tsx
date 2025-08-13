/** @format */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SignInWithGithub } from "@/components/auth/SignInWithGithub";
import { SignInWithGoogle } from "@/components/auth/SignInWithGoogle";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
    const router = useRouter();
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
            // Redirect on success:
            router.push("/dashboard");
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
            // Redirect on success:
            router.push("/dashboard");
        } finally {
            setLoading((s) => ({ ...s, anonymous: false }));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">
                Sign in to Vizier&apos;s Vault
            </h1>
            <div className="w-full flex gap-4 items-center justify-center mb-6">
                <SignInWithGithub />
                <SignInWithGoogle />
            </div>
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
                    <hr className="flex-1 border-border" />
                    <span className="mx-4 text-sm text-muted-foreground">
                        or
                    </span>
                    <hr className="flex-1 border-border" />
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
