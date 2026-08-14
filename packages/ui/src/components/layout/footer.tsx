import type { ComponentType, ReactNode } from "react";

import { Discord } from "../brand/discord";
import { LogoTextOnly } from "../brand/logo";
import { Separator } from "../ui/separator";

export interface FooterLinkComponentProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export interface FooterProps {
  LinkComponent?: ComponentType<FooterLinkComponentProps>;
  appUrl: string;
  githubUrl?: string;
  discordUrl?: string;
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
}: FooterProps) {
  return (
    <footer id="footer" className="mx-auto w-full px-4 pt-24 pb-8 sm:pt-32 xl:px-10">
      <div className="rounded-2xl border border-secondary bg-card p-10">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4 xl:grid-cols-5">
          <div className="col-span-full xl:col-span-1">
            <LogoTextOnly />
            <p className="mt-2 text-muted-foreground">
              A semi-OSS procedural hex world and battle map generator for TTRPGs.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Resources</h3>
            <div>
              <LinkComponent href="/" className={mutedLink}>
                Home
              </LinkComponent>
            </div>
            <div>
              <a href={appUrl} className={mutedLink}>
                App
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Support</h3>
            <div>
              <LinkComponent href="/contact" className={mutedLink}>
                Contact Us
              </LinkComponent>
            </div>
            <div>
              <LinkComponent href="/faq" className={mutedLink}>
                FAQ
              </LinkComponent>
            </div>
            <div>
              <LinkComponent href="/contact" className={mutedLink}>
                Feedback
              </LinkComponent>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Community</h3>
            <div>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={mutedLink}>
                GitHub
              </a>
            </div>
            <div>
              <Discord href={discordUrl} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Legal</h3>
            <div>
              <LinkComponent href="/privacy-policy" className={mutedLink}>
                Privacy Policy
              </LinkComponent>
            </div>
            <div>
              <LinkComponent href="/terms-of-service" className={mutedLink}>
                Terms of Service
              </LinkComponent>
            </div>
            <div>
              <LinkComponent href="/cookie-policy" className={mutedLink}>
                Cookie Policy
              </LinkComponent>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Vizier's Vault.</p>
        </div>
      </div>
    </footer>
  );
}
