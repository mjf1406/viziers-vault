/** @format */

import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { hcWithType } from "server/client";
import type { Client } from "server/client";
import beaver from "@/assets/beaver.svg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: Index,
});

const WEB_SERVER_URL =
	import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

function Index() {
	const [client, setClient] = useState<Client | null>(() =>
		typeof window !== "undefined" && !window.__IS_ELECTRON__
			? hcWithType(WEB_SERVER_URL)
			: null,
	);
	const [data, setData] = useState<{ message: string; success: boolean } | undefined>();

	useEffect(() => {
		if (typeof window === "undefined" || !window.__IS_ELECTRON__ || !window.getApiPort) return;
		window.getApiPort().then((port) => {
			setClient(hcWithType(`http://localhost:${port}`));
		});
	}, []);

	const { mutate: sendRequest } = useMutation({
		mutationFn: async () => {
			if (!client) return;
			try {
				const res = await client.hello.$get();
				if (!res.ok) {
					console.log("Error fetching data");
					return;
				}
				const data = await res.json();
				setData(data);
			} catch (error) {
				console.log(error);
			}
		},
	});

	const { mutate: sendHealthRequest } = useMutation({
		mutationFn: async () => {
			if (!client) return;
			try {
				const res = await client.health.$get();
				if (!res.ok) {
					console.log("Error fetching data");
					return;
				}
				const data = await res.json();
				setData(data);
			} catch (error) {
				console.log(error);
			}
		},
	});

    return (
        <div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
            <a
                href="https://github.com/stevedylandev/bhvr"
                target="_blank"
                rel="noopener"
            >
                <img
                    src={beaver}
                    className="w-16 h-16 cursor-pointer"
                    alt="beaver logo"
                />
            </a>
            <h1 className="text-5xl font-black">bhvr</h1>
            <h2 className="text-2xl font-bold">Bun + Hono + Vite + React</h2>
            <p>A typesafe fullstack monorepo</p>
            <div className="flex items-center gap-4">
                <Button
                    onClick={() => sendRequest()}
                    disabled={!client}
                >
                    Call API
                </Button>
                <Button
                    onClick={() => sendHealthRequest()}
                    disabled={!client}
                >
                    Check Health
                </Button>
                <Button
                    variant="secondary"
                    asChild
                >
                    <a
                        target="_blank"
                        href="https://bhvr.dev"
                        rel="noopener"
                    >
                        Docs
                    </a>
                </Button>
            </div>
            {data && (
                <pre className="bg-gray-100 p-4 rounded-md">
                    <code>
                        Message: {data.message} <br />
                        Success: {data.success.toString()}
                    </code>
                </pre>
            )}
        </div>
    );
}

export default Index;
