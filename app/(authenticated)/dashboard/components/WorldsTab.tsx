/** @format */

// app/worlds/page.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2, Edit, Globe, MapPin } from "lucide-react";
import { usePersistedQuery } from "@/app/hooks/usePersistedQuery";

type WorldWithOptimistic = (
    | Doc<"worlds">
    | {
          _id: string;
          name: string;
          description: string;
          setting: string;
          locations: { name: string; type: string; description: string }[];
          _creationTime: number;
          isOptimistic: true;
      }
) & { isOptimistic?: boolean };

export default function WorldsTab() {
    const { data: serverWorlds = [] }: { data: Doc<"worlds">[] } =
        usePersistedQuery(api.worlds.list, "worlds-list");
    const createWorld = useMutation(api.worlds.create);
    const updateWorld = useMutation(api.worlds.update);
    const deleteWorld = useMutation(api.worlds.remove);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingWorld, setEditingWorld] = useState<Doc<"worlds"> | null>(
        null
    );
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [setting, setSetting] = useState("");
    const [locations, setLocations] = useState<
        { name: string; type: string; description: string }[]
    >([]);
    const [optimisticWorlds, setOptimisticWorlds] = useState<
        Array<{
            _id: string;
            name: string;
            description: string;
            setting: string;
            locations: { name: string; type: string; description: string }[];
            _creationTime: number;
            isOptimistic: true;
        }>
    >([]);
    const [optimisticEdits, setOptimisticEdits] = useState<Set<string>>(
        new Set()
    );

    // remove optimistic items that match server
    useEffect(() => {
        if (serverWorlds.length && optimisticWorlds.length) {
            const filtered = optimisticWorlds.filter(
                (opt) =>
                    !serverWorlds.some(
                        (srv) =>
                            srv.name === opt.name &&
                            srv.description === opt.description &&
                            srv.setting === opt.setting
                    )
            );
            if (filtered.length !== optimisticWorlds.length) {
                setOptimisticWorlds(filtered);
            }
        }
    }, [serverWorlds, optimisticWorlds]);

    const worlds = useMemo<WorldWithOptimistic[]>(() => {
        const fromServer = serverWorlds
            .filter((w) => !optimisticEdits.has(w._id))
            .map((w) => ({ ...w, isOptimistic: false as const }));
        return [...fromServer, ...optimisticWorlds].sort(
            (a, b) => b._creationTime - a._creationTime
        );
    }, [serverWorlds, optimisticWorlds, optimisticEdits]);

    const clearForm = () => {
        setName("");
        setDescription("");
        setSetting("");
        setLocations([]);
    };

    const addLocation = () =>
        setLocations((locs) => [
            ...locs,
            { name: "", type: "", description: "" },
        ]);

    const removeLocation = (i: number) =>
        setLocations((locs) => locs.filter((_, idx) => idx !== i));

    const updateLocation = (
        i: number,
        field: keyof (typeof locations)[0],
        value: string
    ) => {
        setLocations((locs) => {
            const copy = [...locs];
            copy[i] = { ...copy[i], [field]: value };
            return copy;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("World name is required");
            return;
        }
        if (!setting) {
            toast.error("Setting is required");
            return;
        }

        const filtered = locations.filter((l) => l.name.trim());
        const payload = {
            name: name.trim(),
            description: description.trim(),
            setting,
            locations: filtered,
        };
        const temp: WorldWithOptimistic = {
            _id: `temp-${Date.now()}`,
            ...payload,
            _creationTime: Date.now(),
            isOptimistic: true,
        };
        setOptimisticWorlds((prev) => [temp, ...prev]);
        clearForm();
        setOpen(false);
        toast.success("World created successfully!");

        try {
            await createWorld(payload);
        } catch {
            setOptimisticWorlds((prev) =>
                prev.filter((w) => w._id !== temp._id)
            );
            toast.error("Failed to create world");
            setName(payload.name);
            setDescription(payload.description);
            setSetting(payload.setting);
            setLocations(payload.locations);
            setOpen(true);
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingWorld) return;
        if (!name.trim()) {
            toast.error("World name is required");
            return;
        }
        if (!setting) {
            toast.error("Setting is required");
            return;
        }

        const filtered = locations.filter((l) => l.name.trim());
        const updated = {
            name: name.trim(),
            description: description.trim(),
            setting,
            locations: filtered,
        };

        const original = editingWorld;
        const temp: WorldWithOptimistic = {
            _id: `temp-edit-${original._id}-${Date.now()}`,
            _creationTime: original._creationTime,
            ...updated,
            isOptimistic: true,
        };

        setOptimisticEdits((s) => new Set(s).add(original._id));
        setOptimisticWorlds((prev) => [temp, ...prev]);
        clearForm();
        setEditingWorld(null);
        setEditOpen(false);
        toast.success("World updated successfully!");

        try {
            await updateWorld({ id: original._id, ...updated });
            setOptimisticWorlds((prev) =>
                prev.filter((w) => w._id !== temp._id)
            );
            setOptimisticEdits((s) => {
                const clone = new Set(s);
                clone.delete(original._id);
                return clone;
            });
        } catch {
            setOptimisticWorlds((prev) =>
                prev.filter((w) => w._id !== temp._id)
            );
            setOptimisticEdits((s) => {
                const clone = new Set(s);
                clone.delete(original._id);
                return clone;
            });
            toast.error("Failed to update world");
            setEditingWorld(original);
            setName(updated.name);
            setDescription(updated.description);
            setSetting(updated.setting);
            setLocations(updated.locations);
            setEditOpen(true);
        }
    };

    const handleEdit = (w: Doc<"worlds">) => {
        setEditingWorld(w);
        setName(w.name);
        setDescription(w.description);
        setSetting(w.setting);
        setLocations(w.locations);
        setEditOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteWorld({ id: id as any });
            toast.success("World deleted successfully!");
        } catch {
            toast.error("Failed to delete world");
        }
    };

    const getSettingColor = (s: string) => {
        switch (s) {
            case "Fantasy":
                return "bg-purple-100 text-purple-800";
            case "Sci-Fi":
                return "bg-blue-100 text-blue-800";
            case "Modern":
                return "bg-green-100 text-green-800";
            case "Historical":
                return "bg-yellow-100 text-yellow-800";
            case "Post-Apocalyptic":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Worlds</h1>
                <Dialog
                    open={open}
                    onOpenChange={setOpen}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" /> Add World
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New World</DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name">World Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter world name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe the world..."
                                    rows={3}
                                />
                            </div>
                            <div>
                                <Label htmlFor="setting">Setting</Label>
                                <Select
                                    value={setting}
                                    onValueChange={setSetting}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select setting" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[
                                            "Fantasy",
                                            "Sci-Fi",
                                            "Modern",
                                            "Historical",
                                            "Post-Apocalyptic",
                                            "Other",
                                        ].map((opt) => (
                                            <SelectItem
                                                key={opt}
                                                value={opt}
                                            >
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <Label>Locations</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addLocation}
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add
                                        Location
                                    </Button>
                                </div>
                                <div className="space-y-2 overflow-y-auto max-h-48">
                                    {locations.map((loc, i) => (
                                        <div
                                            key={i}
                                            className="p-3 space-y-2 border rounded"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    placeholder="Location name"
                                                    value={loc.name}
                                                    onChange={(e) =>
                                                        updateLocation(
                                                            i,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="flex-1"
                                                />
                                                <Select
                                                    value={loc.type}
                                                    onValueChange={(v) =>
                                                        updateLocation(
                                                            i,
                                                            "type",
                                                            v
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[
                                                            "City",
                                                            "Town",
                                                            "Village",
                                                            "Dungeon",
                                                            "Wilderness",
                                                            "Landmark",
                                                        ].map((t) => (
                                                            <SelectItem
                                                                key={t}
                                                                value={t}
                                                            >
                                                                {t}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeLocation(i)
                                                    }
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <Textarea
                                                placeholder="Location description"
                                                value={loc.description}
                                                onChange={(e) =>
                                                    updateLocation(
                                                        i,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                rows={2}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                >
                                    Create World
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={editOpen}
                    onOpenChange={setEditOpen}
                >
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit World</DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={handleEditSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="editName">World Name</Label>
                                <Input
                                    id="editName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter world name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="editDescription">
                                    Description
                                </Label>
                                <Textarea
                                    id="editDescription"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe the world..."
                                    rows={3}
                                />
                            </div>
                            <div>
                                <Label htmlFor="editSetting">Setting</Label>
                                <Select
                                    value={setting}
                                    onValueChange={setSetting}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select setting" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[
                                            "Fantasy",
                                            "Sci-Fi",
                                            "Modern",
                                            "Historical",
                                            "Post-Apocalyptic",
                                            "Other",
                                        ].map((opt) => (
                                            <SelectItem
                                                key={opt}
                                                value={opt}
                                            >
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <Label>Locations</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addLocation}
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add
                                        Location
                                    </Button>
                                </div>
                                <div className="space-y-2 overflow-y-auto max-h-48">
                                    {locations.map((loc, i) => (
                                        <div
                                            key={i}
                                            className="p-3 space-y-2 border rounded"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    placeholder="Location name"
                                                    value={loc.name}
                                                    onChange={(e) =>
                                                        updateLocation(
                                                            i,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="flex-1"
                                                />
                                                <Select
                                                    value={loc.type}
                                                    onValueChange={(v) =>
                                                        updateLocation(
                                                            i,
                                                            "type",
                                                            v
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[
                                                            "City",
                                                            "Town",
                                                            "Village",
                                                            "Dungeon",
                                                            "Wilderness",
                                                            "Landmark",
                                                        ].map((t) => (
                                                            <SelectItem
                                                                key={t}
                                                                value={t}
                                                            >
                                                                {t}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeLocation(i)
                                                    }
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <Textarea
                                                placeholder="Location description"
                                                value={loc.description}
                                                onChange={(e) =>
                                                    updateLocation(
                                                        i,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                rows={2}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditOpen(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                >
                                    Update World
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {worlds.length === 0 ? (
                <div className="py-12 text-center">
                    <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg text-gray-500">
                        No worlds created yet
                    </p>
                    <p className="text-gray-400">
                        Click "Add World" to get started
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {worlds.map((world) => (
                        <Card
                            key={world._id}
                            className={`hover:shadow-md transition-shadow ${
                                world.isOptimistic
                                    ? "opacity-70 animate-pulse"
                                    : ""
                            }`}
                        >
                            <CardHeader className="relative">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="flex items-center gap-2 pr-8 text-lg">
                                        {world.name}
                                        {world.isOptimistic && (
                                            <span className="px-2 py-1 text-xs rounded text-muted-foreground bg-muted">
                                                Saving...
                                            </span>
                                        )}
                                    </CardTitle>
                                    {!world.isOptimistic && (
                                        <div className="absolute flex gap-1 top-4 right-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleEdit(
                                                        world as Doc<"worlds">
                                                    )
                                                }
                                                className="w-8 h-8 p-0 hover:bg-gray-100"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-8 h-8 p-0 hover:bg-red-100 hover:text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete World
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you
                                                            want to delete "
                                                            {world.name}
                                                            "? This action
                                                            cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                void handleDelete(
                                                                    world._id
                                                                )
                                                            }
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    )}
                                </div>
                                <Badge
                                    className={getSettingColor(world.setting)}
                                >
                                    {world.setting}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {world.description && (
                                        <p className="text-sm text-gray-600">
                                            {world.description}
                                        </p>
                                    )}
                                    {world.locations.length > 0 && (
                                        <div>
                                            <p className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-600">
                                                <MapPin className="w-3 h-3" />{" "}
                                                Locations (
                                                {world.locations.length})
                                            </p>
                                            <div className="space-y-1 overflow-y-auto max-h-32">
                                                {world.locations
                                                    .slice(0, 3)
                                                    .map((loc, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex justify-between text-xs text-gray-500"
                                                        >
                                                            <span>
                                                                {loc.name}
                                                            </span>
                                                            <Badge
                                                                variant="outline"
                                                                className="px-1 py-0 text-xs"
                                                            >
                                                                {loc.type}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                {world.locations.length > 3 && (
                                                    <p className="text-xs text-gray-400">
                                                        +
                                                        {world.locations
                                                            .length - 3}{" "}
                                                        more…
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
