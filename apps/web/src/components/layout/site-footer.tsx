import { Link } from "@tanstack/react-router";
import { Footer, type FooterLinkComponentProps } from "@vv/ui";
import { useTranslation } from "react-i18next";

import { LanguageSelect } from "@/components/i18n/LanguageSelect";
import { useAppLanguage } from "@/i18n/language-context";
import { SITE } from "@/lib/site";

function RouterLink({ href, className, children }: FooterLinkComponentProps) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

export function SiteFooter() {
  const { t } = useTranslation("footer");
  const { t: tCommon } = useTranslation("common");
  const { language, setLanguage, isSaving } = useAppLanguage();
  const year = new Date().getFullYear();

  return (
    <Footer
      LinkComponent={RouterLink}
      appUrl={SITE.appUrl}
      githubUrl={SITE.githubUrl}
      discordUrl={SITE.discordUrl}
      languageSelect={
        <LanguageSelect
          value={language}
          onValueChange={setLanguage}
          disabled={isSaving}
          triggerClassName="w-auto min-w-40"
        />
      }
      labels={{
        tagline: t("tagline"),
        resources: t("resources"),
        home: t("home"),
        app: t("app"),
        support: t("support"),
        contactUs: t("contactUs"),
        faq: t("faq"),
        feedback: t("feedback"),
        community: t("community"),
        github: tCommon("github"),
        joinDiscord: t("joinDiscord"),
        legal: t("legal"),
        privacyPolicy: t("privacyPolicy"),
        termsOfService: t("termsOfService"),
        cookiePolicy: t("cookiePolicy"),
        copyright: tCommon("copyright", { year }),
      }}
    />
  );
}
