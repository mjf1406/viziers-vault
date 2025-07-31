/** @format */

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

export function SignInWithGithub() {
    const { signIn } = useAuthActions();
    return (
        <Button
            variant={"outline"}
            onClick={() => void signIn("github")}
        >
            <Github /> GitHub
        </Button>
    );
}
