/** @format */

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <Loader2 className="animate-spin h-32 w-32" />
                We're getting things ready for you...
            </div>
        </div>
    );
}
