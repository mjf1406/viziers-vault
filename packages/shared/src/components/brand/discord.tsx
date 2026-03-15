import { Button } from "../ui/button";
import { IconBrandDiscord } from "@tabler/icons-react";

const DISCORD_URL = "#";

export function DiscordIcon() {
	return (
		<Button variant="ghost" asChild size="icon" className="hidden sm:flex">
			<a href={DISCORD_URL} rel="noopener noreferrer" target="_blank">
				<IconBrandDiscord />
			</a>
		</Button>
	);
}

export function Discord() {
	return (
		<a href={DISCORD_URL} target="_blank"
		rel="noopener noreferrer"
		className="opacity-60 hover:opacity-100">
			Join the Discord
		</a>
	);
}
