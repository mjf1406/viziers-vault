/** @format */
// app\(authenticated)\world\[worldId]\components\WebGPUValidator.tsx
"use client";

import React from "react";

interface WebGPUValidatorProps {
    children: React.ReactNode;
}

const WebGPUValidator: React.FC<WebGPUValidatorProps> = ({ children }) => {
    if (!("gpu" in navigator)) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-destructive text-center max-w-md">
                    <h2 className="text-xl font-semibold mb-2">
                        WebGPU Not Supported
                    </h2>
                    <p className="mb-4">
                        Your browser doesn't support WebGPU, which is required
                        for this application.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please use a modern browser that supports WebGPU, such
                        as Chrome 113+ or Edge 113+.
                    </p>
                </div>
            </div>
        );
    }

    console.log("WebGPU is supported, proceeding with initialization.");
    console.log(navigator.gpu);

    return <>{children}</>;
};

export default WebGPUValidator;
