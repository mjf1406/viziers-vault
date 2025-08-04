/** @format */

import { useEffect, useState } from "react";

interface WebGPUInfo {
    supported: boolean;
    adapterName: string | null;
    adapter: GPUAdapter | null;
    navigator: (Navigator & { gpu?: GPU }) | null;
    loading: boolean;
    error: boolean;
}

export default function useWebGPUInfo(): WebGPUInfo {
    const [supported, setSupported] = useState(false);
    const [adapterName, setAdapterName] = useState<string | null>(null);
    const [adapter, setAdapter] = useState<GPUAdapter | null>(null);
    const [gpuNavigator, setGpuNavigator] = useState<
        (Navigator & { gpu?: GPU }) | null
    >(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Capture navigator once
        const nav = navigator as Navigator & { gpu?: GPU };
        setGpuNavigator(nav);

        if (!("gpu" in nav)) {
            setSupported(false);
            setLoading(false);
            return;
        }

        nav.gpu!.requestAdapter()
            .then((adpt) => {
                if (!adpt) {
                    setSupported(false);
                } else {
                    setSupported(true);
                    setAdapter(adpt);
                    const name = (adpt as any).name || "Unknown GPU";
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

    return {
        supported,
        adapterName,
        adapter,
        navigator: gpuNavigator,
        loading,
        error,
    };
}
