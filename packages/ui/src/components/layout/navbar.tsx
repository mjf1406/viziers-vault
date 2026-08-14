import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { Menu } from "lucide-react";

import { DiscordIcon } from "../brand/discord";
import { Logo } from "../brand/logo";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export interface NavbarRoute {
  href: string;
  label: string;
  icon?: ReactNode;
}

export interface NavbarLinkComponentProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export interface NavbarProps {
  routes: NavbarRoute[];
  LinkComponent?: ComponentType<NavbarLinkComponentProps>;
  themeToggle?: ReactNode;
  logoHref?: string;
  githubUrl?: string;
  discordUrl?: string;
}

function DefaultLink({ href, className, children, ...props }: NavbarLinkComponentProps) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

export function Navbar({
  routes,
  LinkComponent = DefaultLink,
  themeToggle,
  logoHref = "/",
  githubUrl = "https://github.com/mjf1406/viziers-vault-app",
  discordUrl,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-5 z-40 w-full border-b border-secondary bg-card bg-opacity-15 shadow-inner">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-2 px-4">
        <LinkComponent href={logoHref} className="flex items-center">
          <Logo className="h-10 w-auto object-contain" />
        </LinkComponent>
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
              <Menu />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl border-secondary bg-card"
            >
              <div>
                <SheetHeader className="mb-4 ml-4">
                  <SheetTitle className="flex items-center">
                    <LinkComponent href={logoHref} className="flex items-center">
                      <Logo className="h-10 w-auto object-contain" />
                    </LinkComponent>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 px-4">
                  {routes.map(({ href, label, icon }) => (
                    <Button
                      key={href}
                      variant="ghost"
                      nativeButton={false}
                      className="w-full justify-start text-base"
                      render={
                        <LinkComponent
                          href={href}
                          className="flex items-center"
                          onClick={() => setIsOpen(false)}
                        />
                      }
                    >
                      {icon ?? null}
                      <span>{label}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <SheetFooter className="flex-col items-start justify-start px-4 sm:flex-col">
                <Separator className="mb-2 w-full" />
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    nativeButton={false}
                    className="hidden sm:flex"
                    render={<a href={githubUrl} rel="noopener noreferrer" target="_blank" />}
                  >
                    <GithubMark className="size-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                  <DiscordIcon href={discordUrl} />
                  {themeToggle}
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="mx-auto hidden md:flex">
          <div className="flex">
            {routes.map(({ href, label, icon }) => (
              <LinkComponent
                key={href}
                href={href}
                className="flex items-center rounded-md px-2 py-1 text-base hover:bg-muted"
              >
                {icon}
                <span>{label}</span>
              </LinkComponent>
            ))}
          </div>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            className="hidden sm:flex"
            render={<a href={githubUrl} rel="noopener noreferrer" target="_blank" />}
          >
            <GithubMark className="size-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <DiscordIcon href={discordUrl} />
          {themeToggle}
        </div>
      </div>
    </header>
  );
}
