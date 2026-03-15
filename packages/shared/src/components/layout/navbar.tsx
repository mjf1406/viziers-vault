import * as React from "react";
import { ChevronsDown, Menu } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { IconBrandGithub } from "@tabler/icons-react";
import { LogoTextOnly } from "../brand/logo";
import { DiscordIcon } from "../brand/discord";

export interface NavbarRoute {
	href: string;
	label: string;
	icon?: React.ReactNode;
}

export interface NavbarLinkComponentProps {
	href: string;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

export interface NavbarProps {
	routes: NavbarRoute[];
	LinkComponent?: React.ComponentType<NavbarLinkComponentProps>;
	themeToggle?: React.ReactNode;
	logoHref?: string;
}

function DefaultLink({
	href,
	className,
	children,
	...props
}: NavbarLinkComponentProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a href={href} className={className} {...props}>
			{children}
		</a>
	);
}

export function Navbar({
	routes,
	LinkComponent = DefaultLink,
	themeToggle,
	logoHref = "/",
}: NavbarProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<header className="shadow-inner bg-opacity-15 w-full sticky top-5 z-40 border-b border-secondary bg-card">
			<div className="max-w-7xl mx-auto px-4 flex justify-between items-center p-2">
				<LogoTextOnly href={logoHref} />
				{/* Mobile */}
				<div className="flex items-center md:hidden">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Menu
								onClick={() => setIsOpen(!isOpen)}
								className="cursor-pointer lg:hidden"
							/>
						</SheetTrigger>

						<SheetContent
							side="left"
							className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
						>
							<div>
								<SheetHeader className="mb-4 ml-4">
									<SheetTitle className="flex items-center">
										<LinkComponent href={logoHref} className="flex items-center">
											<ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
											Vizier&apos;s Vault
										</LinkComponent>
									</SheetTitle>
								</SheetHeader>

								<div className="flex flex-col gap-2 px-4">
									{routes.map(({ href, label, icon }) => (
										<Button
											key={href}
											onClick={() => setIsOpen(false)}
											asChild
											variant="ghost"
											className="justify-start text-base w-full"
										>
											<LinkComponent href={href} className="flex items-center">
												{icon ?? null}
												<span>{label}</span>
											</LinkComponent>
										</Button>
									))}
								</div>
							</div>

							<SheetFooter className="flex-col sm:flex-col justify-start items-start px-4">
								<Separator className="mb-2 w-full" />
								<div className="flex items-center gap-2">
									<Button variant="ghost" asChild size="icon" className="hidden sm:flex">
										<a
											href="https://github.com/mjf1406/viziers-vault"
											rel="noopener noreferrer"
											target="_blank"
										>
											<IconBrandGithub />
										</a>
									</Button>
									<DiscordIcon />
									{themeToggle}
								</div>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>

				{/* Desktop */}
				<nav className="hidden md:flex mx-auto">
					<div className="flex">
						{routes.map(({ href, label, icon }) => (
							<LinkComponent
								key={href}
								href={href}
								className="text-base px-2 flex items-center hover:bg-muted py-1 rounded-md"
							>
								{icon}
								<span>{label}</span>
							</LinkComponent>
						))}
					</div>
				</nav>

				<div className="hidden md:flex items-center gap-2">
					<Button variant="ghost" asChild size="icon" className="hidden sm:flex">
						<a
							href="https://github.com/mjf1406/viziers-vault"
							rel="noopener noreferrer"
							target="_blank"
						>
							<IconBrandGithub />
						</a>
					</Button>
					<DiscordIcon />
					{themeToggle}
				</div>
			</div>
		</header>
	);
}
