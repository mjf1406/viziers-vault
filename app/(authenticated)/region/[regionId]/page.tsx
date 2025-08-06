/** @format */

// app/(authenticated)/region/[regionId]/page.tsx

type PageProps = {
    params: Promise<{ regionId: string }>;
};

export default async function RegionIdPage({ params }: PageProps) {
    const { regionId } = await params;
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* <RegionHeader />
            <div className="flex-1 min-h-0">
                <CanvasGridNoSSR regionId={regionId} />
            </div> */}
        </div>
    );
}
