import type { ComponentType, ReactNode } from "react";

import { Discord } from "../brand/discord";
import { Logo, LogoAboveText } from "../brand/logo";
import { Separator } from "../ui/separator";

export interface FooterLinkComponentProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export interface FooterLabels {
  tagline: string;
  resources: string;
  home: string;
  app: string;
  support: string;
  contactUs: string;
  faq: string;
  feedback: string;
  community: string;
  github: string;
  joinDiscord: string;
  legal: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
  copyright: string;
}

export interface FooterProps {
  LinkComponent?: ComponentType<FooterLinkComponentProps>;
  appUrl: string;
  githubUrl?: string;
  discordUrl?: string;
  languageSelect?: ReactNode;
  labels: FooterLabels;
}

function DefaultLink({ href, className, children }: FooterLinkComponentProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

const mutedLink = "opacity-60 hover:opacity-100";

export function Footer({
  LinkComponent = DefaultLink,
  appUrl,
  githubUrl = "https://github.com/mjf1406/viziers-vault-app",
  discordUrl,
  languageSelect,
  labels,
}: FooterProps) {
  return (
    <footer id="footer" className="mx-auto w-full px-4 pt-24 pb-8 sm:pt-32 xl:px-10">
      <div className="rounded-2xl border border-secondary bg-card p-10">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4 xl:grid-cols-5">
          <div className="@container/footer-brand col-span-full xl:col-span-1">
            <LinkComponent href="/" className="inline-flex">
              <span className="hidden @[16rem]/footer-brand:block">
                <Logo />
              </span>
              <span className="@[16rem]/footer-brand:hidden">
                <LogoAboveText />
              </span>
            </LinkComponent>
            <p className="mt-2 text-muted-foreground">{labels.tagline}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{labels.resources}</h3>
            <div>
              <LinkComponent href="/" className={mutedLink}>
                {labels.home}
              </LinkComponent>
            </div>
            <div>
              <a href={appUrl} className={mutedLink}>
                {labels.app}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{labels.support}</h3>
            <div>
              <LinkComponent href="/contact" className={mutedLink}>
                {labels.contactUs}
              </LinkComponent>
            </div>
            <div>
              <LinkComponent href="/faq" className={mutedLink}>
                {labels.faq}
              </LinkComponent>
            </div>
            <div>
              <LinkComponent href="/contact" className={mutedLink}>
                {labels.feedback}
              </LinkComponent>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{labels.community}</h3>
            <div>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={mutedLink}>
                {labels.github}
              </a>
            </div>
            <div>
              <Discord href={discordUrl} label={labels.joinDiscord} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{labels.legal}</h3>
            <div>
              <LinkComponent href="/privacy-policy" className={mutedLink}>
                {labels.privacyPolicy}
              </LinkComponent>
            </div>
            <div>
              <LinkComponent href="/terms-of-service" className={mutedLink}>
                {labels.termsOfService}
              </LinkComponent>
            </div>
            <div>
              <LinkComponent href="/cookie-policy" className={mutedLink}>
                {labels.cookiePolicy}
              </LinkComponent>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground">{labels.copyright}</p>
          {languageSelect}
        </div>
      </div>
    </footer>
  );
}
