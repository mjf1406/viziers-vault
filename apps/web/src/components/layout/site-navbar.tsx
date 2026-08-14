import { Link } from "@tanstack/react-router";
import { Navbar, type NavbarLinkComponentProps, type NavbarRoute } from "@vv/ui";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SITE } from "@/lib/site";

const routes: NavbarRoute[] = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
  { href: SITE.appUrl, label: "Open App" },
];

function RouterLink({ href, className, onClick, children }: NavbarLinkComponentProps) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function SiteNavbar() {
  return (
    <Navbar
      routes={routes}
      LinkComponent={RouterLink}
      themeToggle={<ThemeToggle />}
      logoHref="/"
      githubUrl={SITE.githubUrl}
      discordUrl={SITE.discordUrl}
    />
  );
}
