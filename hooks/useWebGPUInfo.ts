/** @format */

import { useEffect, useState } from "react";

interface WebGPUInfo {
    supported: boolean;
    adapterName: string | null;
    loading: boolean;
    error: boolean;
}

export default function useWebGPUInfo(): WebGPUInfo {
    const [supported, setSupported] = useState(false);
    const [adapterName, setAdapterName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!("gpu" in navigator)) {
            setSupported(false);
            setLoading(false);
            return;
        }

        (navigator as any).gpu
            .requestAdapter()
            .then((adapter: GPUAdapter | null) => {
                if (!adapter) {
                    setSupported(false);
                } else {
                    setSupported(true);
                    // adapter.name is non‐standard but available in Chrome/Dawn builds
                    const name = (adapter as any).name || "Unknown GPU";
                    setAdapterName(name);
                }
            })
            .catch(() => {
                setSupported(false);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { supported, adapterName, loading, error };
}
