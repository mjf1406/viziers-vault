/** @format */

import CanvasGrid from "./components/CanvasGrid";
import WorldHeader from "./components/WorldHeader.";

type PageProps = {
    // Next.js now passes params as a Promise
    params: Promise<{
        worldId: string;
    }>;
};

export default async function WorldPage({ params }: PageProps) {
    const { worldId } = await params;

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <WorldHeader />
            <div className="flex-1 min-h-0">
                <CanvasGrid worldId={worldId} />
            </div>
        </div>
    );
}
