import { Link } from "@tanstack/react-router";
import { Navbar, type NavbarLinkComponentProps, type NavbarRoute } from "@vv/ui";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SITE } from "@/lib/site";

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
  const { t } = useTranslation("nav");
  const { t: tCommon } = useTranslation("common");

  const routes: NavbarRoute[] = [
    { href: "/about", label: t("about") },
    { href: "/pricing", label: t("pricing") },
    { href: "/faq", label: t("faq") },
    { href: "/team", label: t("team") },
    { href: "/contact", label: t("contact") },
    { href: SITE.appUrl, label: t("openApp") },
  ];

  return (
    <Navbar
      routes={routes}
      LinkComponent={RouterLink}
      languageSwitcher={<LanguageSwitcher />}
      themeToggle={<ThemeToggle />}
      logoHref="/"
      githubUrl={SITE.githubUrl}
      discordUrl={SITE.discordUrl}
      labels={{
        openMenu: tCommon("openNavMenu"),
        github: tCommon("github"),
        discord: tCommon("discord"),
      }}
    />
  );
}
