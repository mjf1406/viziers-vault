/** @format */

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export function SignInWithGoogle() {
    const { signIn } = useAuthActions();
    return (
        <Button
            variant={"outline"}
            onClick={() => void signIn("google")}
        >
            <FaGoogle /> Google
        </Button>
    );
}
