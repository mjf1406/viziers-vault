import { Link } from "@tanstack/react-router";
import { Footer, type FooterLinkComponentProps } from "@vv/ui";

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
  return (
    <Footer
      LinkComponent={RouterLink}
      appUrl={SITE.appUrl}
      githubUrl={SITE.githubUrl}
      discordUrl={SITE.discordUrl}
    />
  );
}
