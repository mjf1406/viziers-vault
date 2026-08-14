import type { AnchorHTMLAttributes } from "react";

export interface LogoTextOnlyProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export function LogoTextOnly({ href = "/", className, ...props }: LogoTextOnlyProps) {
  return (
    <a
      href={href}
      className={
        className ?? "text-lg font-bold text-primary transition-colors hover:text-primary/80"
      }
      {...props}
    >
      Vizier's Vault
    </a>
  );
}
