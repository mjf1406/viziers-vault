/** @format */

"use client";

import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartiesTab from "./components/PartiesTab";
import WorldsTab from "./components/WorldsTab";
import { Globe, MapPinned, ShoppingBag, Swords, Users } from "lucide-react";

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab") ?? "battle-maps";
    const [tab, setTab] = useQueryState("tab");

    return (
        <div className="w-full">
            <Tabs
                value={tabParam}
                onValueChange={setTab}
            >
                <TabsList className="mb-3 border-none w-full grow-0 rounded-none pb-0 pl-5 md:pl-10 fixed z-10">
                    <TabsTrigger
                        value="battle-maps"
                        className="border-b-none rounded-b-none data-[state=active]:shadow-none
                       data-[state=active]:dark:border-none data-[state=active]:dark:bg-background"
                    >
                        <MapPinned />
                        <span className="hidden md:inline">Battle Maps</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="encounters"
                        className="border-b-none rounded-b-none data-[state=active]:shadow-none
                       data-[state=active]:dark:border-none data-[state=active]:dark:bg-background"
                    >
                        <Swords />
                        <span className="hidden md:inline">Encounters</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="magic-shops"
                        className="border-b-none rounded-b-none data-[state=active]:shadow-none
                       data-[state=active]:dark:border-none data-[state=active]:dark:bg-background"
                    >
                        <ShoppingBag />
                        <span className="hidden md:inline">Magic Shops</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="parties"
                        className="border-b-none rounded-b-none data-[state=active]:shadow-none
                       data-[state=active]:dark:border-none data-[state=active]:dark:bg-background"
                    >
                        <Users />
                        <span className="hidden md:inline">Parties</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="worlds"
                        className="border-b-none rounded-b-none data-[state=active]:shadow-none
                       data-[state=active]:dark:border-none data-[state=active]:dark:bg-background"
                    >
                        <Globe />
                        <span className="hidden md:inline">Worlds</span>
                    </TabsTrigger>
                </TabsList>

                <div className="px-5 mt-12">
                    <TabsContent value="battle-maps">
                        {/* Battle Maps content here */}
                    </TabsContent>
                    <TabsContent value="encounters">
                        {/* Encounters content here */}
                    </TabsContent>
                    <TabsContent value="magic-shops">
                        {/* Magic Shops content here */}
                    </TabsContent>
                    <TabsContent value="parties">
                        <PartiesTab />
                    </TabsContent>
                    <TabsContent value="worlds">
                        <WorldsTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
