import * as React from "react";

export interface LogoTextOnlyProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href?: string;
}

export function LogoTextOnly({ href = "/", className, ...props }: LogoTextOnlyProps) {
	return (
		<a
			href={href}
			className={
				className ??
				"text-lg font-bold text-primary hover:text-primary/80 transition-colors"
			}
			{...props}
		>
			Vizier&apos;s Vault
		</a>
	);
}
