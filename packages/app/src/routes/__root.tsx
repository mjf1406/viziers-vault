import { Link, createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar, Footer } from "shared";
import type { NavbarLinkComponentProps } from "shared";
import { ThemeToggle } from "@/components/theme-toggle";

const appRoutes = [
	{ href: "/", label: "Home" },
	{ href: "/dashboard", label: "Dashboard" },
];

function AppNavLink({ href, className, onClick, children }: NavbarLinkComponentProps) {
	return (
		<Link to={href} className={className} onClick={onClick}>
			{children}
		</Link>
	);
}

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="min-h-screen flex flex-col">
				<Navbar
					routes={appRoutes}
					LinkComponent={AppNavLink}
					themeToggle={<ThemeToggle />}
					logoHref="/"
				/>
				<main className="flex-1">
					<Outlet />
				</main>
				<Footer />
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
