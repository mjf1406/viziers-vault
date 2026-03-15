import { Separator } from "../ui/separator";
import { LogoTextOnly } from "../brand/logo";
import { Discord } from "../brand/discord";

export function Footer() {
	return (
		<footer
			id="footer"
			className="w-full px-4 xl:px-10 mx-auto pt-24 sm:pt-32 pb-8"
		>
			<div className="p-10 bg-card border border-secondary rounded-2xl">
				<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-8">
					<div className="col-span-full xl:col-span-1">
						<LogoTextOnly />
						<p className="text-muted-foreground mt-2">
						A semi-OSS procedural hex world and battle map generator for TTRPGs.
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="font-bold text-lg">Resources</h3>
						<div>
							<a href="/" className="opacity-60 hover:opacity-100">
								Home
							</a>
						</div>
						<div>
							<a href="/app/dashboard" className="opacity-60 hover:opacity-100">
								App
							</a>
						</div>
						<div>
							<a
								href="/docs"
								target="_blank"
								rel="noopener noreferrer"
								className="opacity-60 hover:opacity-100"
							>
								Docs
							</a>
						</div>
						<div>
							<a
								href="/blog"
								target="_blank"
								rel="noopener noreferrer"
								className="opacity-60 hover:opacity-100"
							>
								Blog
							</a>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="font-bold text-lg">Support</h3>
						<div>
							<a href="/web/contact" className="opacity-60 hover:opacity-100">
								Contact Us
							</a>
						</div>
						<div>
							<a href="/web/faq" className="opacity-60 hover:opacity-100">
								FAQ
							</a>
						</div>
						<div>
							<a href="/web/contact" className="opacity-60 hover:opacity-100">
								Feedback
							</a>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="font-bold text-lg">Community</h3>
						<div>
							<a
								href="https://github.com/mjf1406/viziers-vault"
								target="_blank"
								rel="noopener noreferrer"
								className="opacity-60 hover:opacity-100"
							>
								GitHub
							</a>
						</div>
						<div>
							<Discord />
						</div>
						<div>
							<a href="#" className="opacity-60 hover:opacity-100">
								Reddit
							</a>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="font-bold text-lg">Legal</h3>
						<div>
							<a href="/web/privacy-policy" className="opacity-60 hover:opacity-100">
								Privacy Policy
							</a>
						</div>
						<div>
							<a
								href="/web/terms-of-service"
								className="opacity-60 hover:opacity-100"
							>
								Terms of Service
							</a>
						</div>
						<div>
							<a href="/web/cookie-policy" className="opacity-60 hover:opacity-100">
								Cookie Policy
							</a>
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-muted-foreground">
						© 2024 Vizier&apos;s Vault.
					</p>

				</div>
			</div>
		</footer>
	);
}
