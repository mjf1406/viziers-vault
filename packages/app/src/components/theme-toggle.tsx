/** @format */

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "viziers-vault-theme";

function getInitialTheme(): "light" | "dark" {
	if (typeof document === "undefined") return "light";
	const stored = document.documentElement.getAttribute("data-theme") as
		| "light"
		| "dark"
		| null;
	if (stored === "dark" || stored === "light") return stored;
	const fromStorage = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
	if (fromStorage === "dark" || fromStorage === "light") return fromStorage;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
	const root = document.documentElement;
	if (theme === "dark") {
		root.classList.add("dark");
		root.setAttribute("data-theme", "dark");
	} else {
		root.classList.remove("dark");
		root.setAttribute("data-theme", "light");
	}
	localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
	const [mounted, setMounted] = React.useState(false);
	const [isDark, setIsDark] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
		const theme = getInitialTheme();
		applyTheme(theme);
		setIsDark(theme === "dark");
	}, []);

	const toggle = React.useCallback(() => {
		const next = isDark ? "light" : "dark";
		applyTheme(next);
		setIsDark(next === "dark");
	}, [isDark]);

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggle}
			aria-pressed={mounted ? isDark : undefined}
			aria-label={
				mounted
					? isDark
						? "Switch to light theme"
						: "Switch to dark theme"
					: "Toggle theme"
			}
			title={
				mounted
					? isDark
						? "Switch to light theme"
						: "Switch to dark theme"
					: "Toggle theme"
			}
			className="relative"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">
				{mounted
					? isDark
						? "Switch to light theme"
						: "Switch to dark theme"
					: "Toggle theme"}
			</span>
		</Button>
	);
}
