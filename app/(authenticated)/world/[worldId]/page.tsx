/** @format */

// app/(authenticated)/world/[worldId]/page.tsx
/** @format */

import CanvasGridNoSSR from "./components/CanvasGridNoSSR";
import WorldHeader from "./components/WorldHeader.";

type PageProps = { params: { worldId: string } };

export default async function WorldPage({ params }: PageProps) {
    const { worldId } = await params;

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <WorldHeader />
            <div className="flex-1 min-h-0">
                <CanvasGridNoSSR worldId={worldId} />
            </div>
        </div>
    );
}
