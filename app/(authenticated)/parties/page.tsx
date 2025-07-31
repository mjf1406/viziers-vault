/** @format */

// pages/parties.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
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
import { usePersistedQuery } from "@/app/hooks/usePersistedQuery";

type PartyWithOptimistic = (
    | Doc<"parties">
    | {
          _id: string;
          name: string;
          levels: { level: number; quantity: number }[];
          _creationTime: number;
          isOptimistic: true;
      }
) & { isOptimistic?: boolean };

interface PartyFormProps {
    partyName: string;
    setPartyName: (name: string) => void;
    levels: { level: number; quantity: number }[];
    onSubmit: (e: React.FormEvent) => void | Promise<void>;
    onCancel: () => void;
    submitText: string;
    addLevel: () => void;
    removeLevel: (index: number) => void;
    updateLevel: (
        index: number,
        field: "level" | "quantity",
        value: number
    ) => void;
}

function PartyForm({
    partyName,
    setPartyName,
    levels,
    onSubmit,
    onCancel,
    submitText,
    addLevel,
    removeLevel,
    updateLevel,
}: PartyFormProps) {
    return (
        <form
            onSubmit={(e) => void onSubmit(e)}
            className="space-y-4"
        >
            <div>
                <Label htmlFor="partyName">Party Name</Label>
                <Input
                    id="partyName"
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    placeholder="Enter party name"
                    className="mt-1"
                />
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <Label>Character Levels</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addLevel}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Level
                    </Button>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-48">
                    {levels.map((levelData, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 p-2 border rounded"
                        >
                            <div className="flex-1">
                                <Label className="text-xs">Level</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={levelData.level}
                                    onChange={(e) =>
                                        updateLevel(
                                            idx,
                                            "level",
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                    className="mt-1"
                                />
                            </div>
                            <div className="flex-1">
                                <Label className="text-xs">Quantity</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={levelData.quantity}
                                    onChange={(e) =>
                                        updateLevel(
                                            idx,
                                            "quantity",
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                    className="mt-1"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeLevel(idx)}
                                className="mt-5"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                {levels.length === 0 && (
                    <p className="py-4 text-sm text-center text-gray-500">
                        No character levels added yet
                    </p>
                )}
            </div>

            <div className="flex gap-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="flex-1"
                >
                    {submitText}
                </Button>
            </div>
        </form>
    );
}

export default function PartiesPage() {
    const { data: serverParties = [] }: { data: Doc<"parties">[] } =
        usePersistedQuery(api.parties.list, "parties-list");
    const createParty = useMutation(api.parties.create);
    const updateParty = useMutation(api.parties.update);
    const deleteParty = useMutation(api.parties.remove);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingParty, setEditingParty] = useState<Doc<"parties"> | null>(
        null
    );
    const [partyName, setPartyName] = useState("");
    const [levels, setLevels] = useState<{ level: number; quantity: number }[]>(
        []
    );
    const [optimisticParties, setOptimisticParties] = useState<
        Array<{
            _id: string;
            name: string;
            levels: { level: number; quantity: number }[];
            _creationTime: number;
            isOptimistic: true;
        }>
    >([]);
    const [optimisticEdits, setOptimisticEdits] = useState<Set<string>>(
        new Set()
    );

    const optimisticJSON = useMemo(
        () => JSON.stringify(optimisticParties),
        [optimisticParties]
    );
    useEffect(() => {
        if (serverParties.length && optimisticParties.length) {
            const filtered = optimisticParties.filter(
                (opt) =>
                    !serverParties.some(
                        (srv) =>
                            srv.name === opt.name &&
                            JSON.stringify(srv.levels) ===
                                JSON.stringify(opt.levels)
                    )
            );
            if (filtered.length !== optimisticParties.length) {
                setOptimisticParties(filtered);
            }
        }
    }, [serverParties, optimisticJSON]);

    const parties: PartyWithOptimistic[] = useMemo(() => {
        const saved = serverParties
            .filter((p) => !optimisticEdits.has(p._id))
            .map((p) => ({ ...p, isOptimistic: false as const }));
        return [...saved, ...optimisticParties].sort(
            (a, b) => b._creationTime - a._creationTime
        );
    }, [serverParties, optimisticParties, optimisticEdits]);

    const addLevel = () =>
        setLevels((ls) => [...ls, { level: 1, quantity: 1 }]);
    const removeLevel = (i: number) =>
        setLevels((ls) => ls.filter((_, idx) => idx !== i));
    const updateLevel = (
        i: number,
        field: "level" | "quantity",
        val: number
    ) => {
        setLevels((ls) => {
            const nxt = [...ls];
            nxt[i][field] = val;
            return nxt;
        });
    };
    const clearForm = () => {
        setPartyName("");
        setLevels([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!partyName.trim()) {
            toast.error("Party name is required");
            return;
        }
        if (!levels.length) {
            toast.error("Add at least one level");
            return;
        }
        const filtered = levels.filter((l) => l.level > 0 && l.quantity > 0);
        const newParty = { name: partyName.trim(), levels: filtered };
        const temp = {
            _id: `temp-${Date.now()}`,
            name: newParty.name,
            levels: newParty.levels,
            _creationTime: Date.now(),
            isOptimistic: true as const,
        };
        setOptimisticParties((p) => [temp, ...p]);
        clearForm();
        setOpen(false);
        toast.success("Party created");
        try {
            await createParty(newParty);
        } catch {
            setOptimisticParties((p) => p.filter((x) => x._id !== temp._id));
            toast.error("Create failed");
            setPartyName(newParty.name);
            setLevels(newParty.levels);
            setOpen(true);
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingParty) {
            return;
        }
        if (!partyName.trim()) {
            toast.error("Party name is required");
            return;
        }
        if (!levels.length) {
            toast.error("Add at least one level");
            return;
        }
        const filtered = levels.filter((l) => l.level > 0 && l.quantity > 0);
        const updated = { name: partyName.trim(), levels: filtered };
        const orig = editingParty;
        const temp = {
            _id: `temp-edit-${orig._id}-${Date.now()}`,
            name: updated.name,
            levels: updated.levels,
            _creationTime: orig._creationTime,
            isOptimistic: true as const,
        };
        setOptimisticEdits((s) => new Set(s).add(orig._id));
        setOptimisticParties((p) => [temp, ...p]);
        clearForm();
        setEditingParty(null);
        setEditOpen(false);
        toast.success("Party updated");
        try {
            await updateParty({ id: orig._id, ...updated });
            setOptimisticParties((p) => p.filter((x) => x._id !== temp._id));
            setOptimisticEdits((s) => {
                s.delete(orig._id);
                return new Set(s);
            });
        } catch {
            setOptimisticParties((p) => p.filter((x) => x._id !== temp._id));
            setOptimisticEdits((s) => {
                s.delete(orig._id);
                return new Set(s);
            });
            toast.error("Update failed");
            setEditingParty(orig);
            setPartyName(updated.name);
            setLevels(updated.levels);
            setEditOpen(true);
        }
    };

    const handleEdit = (p: Doc<"parties">) => {
        setEditingParty(p);
        setPartyName(p.name);
        setLevels(p.levels);
        setEditOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteParty({ id: id as any });
            toast.success("Party deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Your Parties</h1>
                <Dialog
                    open={open}
                    onOpenChange={setOpen}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Party
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Party</DialogTitle>
                        </DialogHeader>
                        <PartyForm
                            partyName={partyName}
                            setPartyName={setPartyName}
                            levels={levels}
                            onSubmit={handleSubmit}
                            onCancel={() => setOpen(false)}
                            submitText="Create Party"
                            addLevel={addLevel}
                            removeLevel={removeLevel}
                            updateLevel={updateLevel}
                        />
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={editOpen}
                    onOpenChange={setEditOpen}
                >
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Party</DialogTitle>
                        </DialogHeader>
                        <PartyForm
                            partyName={partyName}
                            setPartyName={setPartyName}
                            levels={levels}
                            onSubmit={handleEditSubmit}
                            onCancel={() => setEditOpen(false)}
                            submitText="Update Party"
                            addLevel={addLevel}
                            removeLevel={removeLevel}
                            updateLevel={updateLevel}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {parties.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-lg text-gray-500">
                        No parties created yet
                    </p>
                    <p className="text-gray-400">
                        Click "Add Party" to get started
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {parties.map((p) => (
                        <Card
                            key={p._id}
                            className={`hover:shadow-md transition-shadow ${
                                p.isOptimistic ? "opacity-70 animate-pulse" : ""
                            }`}
                        >
                            <CardHeader className="relative">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="flex items-center gap-2 pr-8 text-lg">
                                        {p.name}
                                        {p.isOptimistic && (
                                            <span className="px-2 py-1 text-xs rounded text-muted-foreground bg-muted">
                                                Saving...
                                            </span>
                                        )}
                                    </CardTitle>
                                    {!p.isOptimistic && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleEdit(p as Doc<"parties">)
                                            }
                                            className="absolute w-8 h-8 p-0 top-4 right-12 hover:bg-gray-100"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    )}
                                    {!p.isOptimistic && (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute w-8 h-8 p-0 top-4 right-4 hover:bg-red-100 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Delete Party
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to
                                                        delete "{p.name}"? This
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
                                                                p._id
                                                            )
                                                        }
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600">
                                        Character Levels:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {p.levels
                                            .sort((a, b) => a.level - b.level)
                                            .map((lv, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    Level {lv.level} ×{" "}
                                                    {lv.quantity}
                                                </Badge>
                                            ))}
                                    </div>
                                    <div className="pt-2 text-xs text-gray-500">
                                        Total Characters:{" "}
                                        {p.levels.reduce(
                                            (sum, l) => sum + l.quantity,
                                            0
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
