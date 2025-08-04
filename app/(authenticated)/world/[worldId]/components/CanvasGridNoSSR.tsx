/** @format */

"use client";

import dynamic from "next/dynamic";

const DynamicCanvasGrid = dynamic(() => import("./CanvasGrid"), { ssr: false });

type CanvasGridNoSSRProps = {
    worldId: string;
};

export default function CanvasGridNoSSR({ worldId }: CanvasGridNoSSRProps) {
    return <DynamicCanvasGrid worldId={worldId} />;
}
