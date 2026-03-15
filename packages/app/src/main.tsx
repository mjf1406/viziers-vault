import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
	RouterProvider,
	createRouter,
	createHashHistory,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import sharedFaviconUrl from "../../shared/src/favicon.ico";

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Use hash history so routing works with file:// in Electron
const router = createRouter({ routeTree, history: createHashHistory() });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");

const faviconLink =
	document.querySelector<HTMLLinkElement>('link[rel~="icon"]') ||
	document.createElement("link");
faviconLink.rel = "icon";
faviconLink.type = "image/x-icon";
faviconLink.href = sharedFaviconUrl;
if (!faviconLink.parentElement) {
	document.head.appendChild(faviconLink);
}

if (!rootElement) {
	throw new Error(
		"Root element not found. Check if it's in your index.html or if the id is correct.",
	);
}

// Render the app
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>,
	);
}
