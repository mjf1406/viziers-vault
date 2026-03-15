/** @format */

import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { hcWithType } from "server/client";
import type { Client } from "server/client";
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
	const [data, setData] = useState<
		{ message: string; success: boolean } | undefined
	>();

	useEffect(() => {
		if (
			typeof window === "undefined" ||
			!window.__IS_ELECTRON__ ||
			!window.getApiPort
		)
			return;
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
		<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center py-16 px-4">
			<h1 className="text-4xl font-bold text-primary">Vizier&apos;s Vault</h1>
			<p className="text-muted-foreground">D&D 5e Tools — Desktop App</p>
			<div className="flex items-center gap-4">
				<Button onClick={() => sendRequest()} disabled={!client}>
					Call API
				</Button>
				<Button onClick={() => sendHealthRequest()} disabled={!client}>
					Check Health
				</Button>
			</div>
			{data && (
				<pre className="bg-muted p-4 rounded-md w-full overflow-auto">
					<code className="text-sm">
						Message: {data.message}
						{"\n"}
						Success: {data.success.toString()}
					</code>
				</pre>
			)}
		</div>
	);
}

export default Index;
