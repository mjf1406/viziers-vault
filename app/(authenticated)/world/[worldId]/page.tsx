/** @format */

// app/(authenticated)/world/[worldId]/page.tsx
import CanvasGridNoSSR from "./_components/CanvasGridNoSSR";
import WorldHeader from "./_components/WorldHeader";

type PageProps = {
    params: Promise<{ worldId: string }>;
};

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
