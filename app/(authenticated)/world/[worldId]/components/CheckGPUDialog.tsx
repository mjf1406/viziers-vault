/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, Monitor, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useWebGPUInfo from "@/hooks/useWebGPUInfo";
import useGPUInfo from "@/hooks/useGPUInfo";

const GPU_CHECK_STORAGE_KEY = "gpu-check-dismissed";

interface GPUCheckDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

// Extend Navigator interface to include userAgentData
interface NavigatorWithUserAgentData extends Navigator {
    userAgentData?: {
        brands: Array<{ brand: string; version: string }>;
    };
}

const CheckGPUDialog: React.FC<GPUCheckDialogProps> = ({ isOpen, onClose }) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const { supported, adapterName, loading, error } = useWebGPUInfo();
    const { name } = useGPUInfo();

    // Detect Chromium-based browsers
    const isChromiumBased =
        typeof navigator !== "undefined" &&
        (/Chrom(e|ium)|Edg|OPR/.test(navigator.userAgent) ||
            (
                navigator as NavigatorWithUserAgentData
            ).userAgentData?.brands.some(
                (b: { brand: string; version: string }) =>
                    /(Chromium|Google Chrome|Microsoft Edge|Opera)/.test(
                        b.brand
                    )
            ));

    const handleClose = () => {
        if (dontShowAgain) {
            localStorage.setItem(GPU_CHECK_STORAGE_KEY, "true");
        }
        onClose();
    };

    const isIntegrated = adapterName
        ? /(intel|iris|apple)/i.test(adapterName)
        : false;

    const getGPUStatus = () => {
        if (loading) {
            return { status: "loading", message: "Detecting GPU..." };
        }
        if (error || !supported) {
            return {
                status: "error",
                message: "WebGPU not supported or inaccessible",
            };
        }
        if (isIntegrated) {
            return {
                status: "warning",
                message: `Integrated GPU detected: ${name}`,
            };
        }
        return {
            status: "success",
            message: `Dedicated GPU detected: ${name}`,
        };
    };

    const { status, message } = getGPUStatus();

    const getStatusIcon = () => {
        switch (status) {
            case "success":
                return <CheckCircle2 className="w-24 h-24 text-green-500" />;
            case "warning":
                return <AlertTriangle className="w-24 h-24 text-yellow-500" />;
            case "error":
                return <X className="w-24 h-24 text-red-500" />;
            default:
                return <Monitor className="w-24 h-24 text-blue-500" />;
        }
    };

    const handleCheckboxChange = (checked: boolean | "indeterminate") => {
        setDontShowAgain(checked === true);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleClose}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Monitor className="w-5 h-5" />
                        WebGPU Configuration Check
                    </DialogTitle>
                    <DialogDescription>
                        Ensure WebGPU is enabled and using your dedicated GPU
                        for best performance.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Experimental support warning for non-Chromium */}
                    {!isChromiumBased && (
                        <div className="text-sm text-blue-700 bg-blue-300 p-2 rounded">
                            WebGPU support in this browser is experimental. For
                            the smoothest experience, use a Chromium-based
                            browser, like Chrome, Edge, or Brave.
                        </div>
                    )}

                    <Card className="bg-background transition-colors">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center justify-between text-base">
                                <span className="flex items-center gap-2">
                                    {getStatusIcon()}
                                    {message}
                                </span>
                                <Badge
                                    variant={
                                        status === "success"
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {status.toUpperCase()}
                                </Badge>
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3 text-background">
                            {status === "warning" && (
                                <div className="text-sm text-yellow-700 bg-yellow-100 p-2 rounded">
                                    <p>
                                        For optimal performance, please switch
                                        to your dedicated GPU.{" "}
                                        <a
                                            href="https://www.reddit.com/r/chrome/comments/bysdyn/comment/eqmg1s3/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-yellow-800"
                                        >
                                            View instructions
                                        </a>
                                        .
                                    </p>
                                </div>
                            )}

                            {status === "error" && (
                                <div className="text-sm text-red-700 bg-red-100 p-2 rounded">
                                    <p>
                                        WebGPU is not available in your browser.
                                        Please enable the flag or update to a
                                        compatible browser.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="dont-show-again"
                            checked={dontShowAgain}
                            onCheckedChange={handleCheckboxChange}
                        />
                        <label
                            htmlFor="dont-show-again"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Don't show this dialog again
                        </label>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={handleClose}
                            className="w-full"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CheckGPUDialog;

export function useGPUCheckDialog() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(GPU_CHECK_STORAGE_KEY);
        if (!dismissed) {
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const close = () => setIsOpen(false);

    return { isOpen, close };
}
