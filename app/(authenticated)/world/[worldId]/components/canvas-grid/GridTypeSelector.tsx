/** @format */

// components/grid/GridTypeSelector.tsx
import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Grid2X2 } from "lucide-react";

type GridType =
    | "square"
    | "hex-flat-odd"
    | "hex-flat-even"
    | "hex-pointy-odd"
    | "hex-pointy-even";

const gridTypeOptions = [
    {
        value: "square",
        icon: Grid2X2,
        label: "Square",
    },
    {
        value: "hex-flat-odd",
        imageSrc: "/icons/hex-flat-odd.svg",
        label: "Flat Odd",
    },
    {
        value: "hex-flat-even",
        imageSrc: "/icons/hex-flat-even.svg",
        label: "Flat Even",
    },
    {
        value: "hex-pointy-odd",
        imageSrc: "/icons/hex-pointy-odd.svg",
        label: "Pointy Odd",
    },
    {
        value: "hex-pointy-even",
        imageSrc: "/icons/hex-pointy-even.svg",
        label: "Pointy Even",
    },
] as const;

interface GridTypeSelectorProps {
    gridType: GridType;
    onGridTypeChange: (gridType: GridType) => void;
}

export const GridTypeSelector: React.FC<GridTypeSelectorProps> = ({
    gridType,
    onGridTypeChange,
}) => {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium">Grid Type</Label>
            <Tabs
                value={gridType}
                onValueChange={(v) => onGridTypeChange(v as GridType)}
                className="w-full"
            >
                <TabsList className="w-full gap-1 p-1 bg-transparent">
                    {gridTypeOptions.map((option) => {
                        const isActive = gridType === option.value;
                        return (
                            <TabsTrigger
                                key={option.value}
                                value={option.value}
                                className="
                  flex items-center justify-center gap-2
                  px-3 py-2 h-auto text-xs
                  data-[state=active]:bg-primary
                  text-foreground dark:text-foreground
                  data-[state=active]:text-primary-foreground
                  w-full
                "
                            >
                                {"icon" in option ? (
                                    <option.icon className="flex-shrink-0 w-5 h-5" />
                                ) : (
                                    <img
                                        src={option.imageSrc}
                                        alt={option.label}
                                        className={`
                      flex-shrink-0 w-6 h-6
                      filter transition-all duration-200
                      dark:invert
                      ${isActive ? "invert" : ""}
                    `}
                                    />
                                )}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
            </Tabs>
        </div>
    );
};
