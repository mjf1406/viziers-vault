/** @format */

"use client";

import dynamic from "next/dynamic";

const WebGPUTest = dynamic(() => import("./WebGPUTest"), { ssr: false });

export default function WebGPUTestClient() {
    return <WebGPUTest />;
}
