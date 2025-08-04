/** @format */
import { useState, useEffect } from "react";

interface GPUAdapterExtended extends GPUAdapter {
    requestAdapterInfo?: () => Promise<GPUAdapterInfo>;
}

interface RendererInfo {
    supported: boolean;
    vendor?: string;
    renderer?: string;
}

interface GPUInfo {
    adapter: GPUAdapter | null;
    adapterInfo: GPUAdapterInfo | null;
    features: string[];
    limits: GPUSupportedLimits | null;
    webgpuInfo: RendererInfo;
    webglInfo: RendererInfo | null;
    name: string | null;
    loading: boolean;
    error: Error | null;
}

function useGPUInfo(): GPUInfo {
    const [gpuInfo, setGPUInfo] = useState<GPUInfo>({
        adapter: null,
        adapterInfo: null,
        features: [],
        limits: null,
        webgpuInfo: { supported: false },
        webglInfo: null,
        name: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let canceled = false;

        async function fetchWebGPUInfo(): Promise<{
            adapter: GPUAdapter | null;
            adapterInfo: GPUAdapterInfo | null;
            features: string[];
            limits: GPUSupportedLimits | null;
            webgpuInfo: RendererInfo;
        }> {
            const webgpuSupported = "gpu" in navigator;
            const webgpuInfo: RendererInfo = { supported: webgpuSupported };
            let adapter: GPUAdapter | null = null;
            let adapterInfo: GPUAdapterInfo | null = null;
            let features: string[] = [];
            let limits: GPUSupportedLimits | null = null;

            if (webgpuSupported) {
                try {
                    adapter = await navigator.gpu.requestAdapter();
                    if (adapter) {
                        features = Array.from(adapter.features).sort();
                        limits = adapter.limits;

                        const extendedAdapter = adapter as GPUAdapterExtended;
                        if (extendedAdapter.requestAdapterInfo) {
                            try {
                                adapterInfo =
                                    await extendedAdapter.requestAdapterInfo();
                                if (adapterInfo) {
                                    webgpuInfo.vendor = adapterInfo.vendor;
                                    webgpuInfo.renderer =
                                        adapterInfo.description;
                                }
                            } catch (error) {
                                console.warn(
                                    "Failed to get adapter info:",
                                    error
                                );
                            }
                        }
                    }
                } catch (error) {
                    console.warn("WebGPU adapter request failed:", error);
                    webgpuInfo.supported = false;
                }
            }

            return { adapter, adapterInfo, features, limits, webgpuInfo };
        }

        function fetchWebGLInfo(): RendererInfo | null {
            try {
                const canvas = document.createElement("canvas");
                const gl = (canvas.getContext("webgl") ||
                    canvas.getContext(
                        "experimental-webgl"
                    )) as WebGLRenderingContext | null;

                if (!gl) return null;

                const ext = gl.getExtension("WEBGL_debug_renderer_info");
                if (!ext) return { supported: true };

                const vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
                const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);

                return {
                    supported: true,
                    vendor: vendor || undefined,
                    renderer: renderer || undefined,
                };
            } catch (error) {
                console.warn("WebGL info fetch failed:", error);
                return null;
            }
        }

        async function fetchInfo() {
            try {
                const webgpuData = await fetchWebGPUInfo();
                const webglInfo = fetchWebGLInfo();

                const name =
                    webgpuData.adapterInfo?.description ||
                    webgpuData.adapterInfo?.vendor ||
                    webglInfo?.renderer ||
                    null;

                if (!canceled) {
                    setGPUInfo({
                        ...webgpuData,
                        webglInfo,
                        name,
                        loading: false,
                        error: null,
                    });
                }
            } catch (error) {
                if (!canceled) {
                    setGPUInfo((prev) => ({
                        ...prev,
                        loading: false,
                        error: error as Error,
                    }));
                }
            }
        }

        fetchInfo();
        return () => {
            canceled = true;
        };
    }, []);

    return gpuInfo;
}

export default useGPUInfo;
