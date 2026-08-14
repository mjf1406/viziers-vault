import { Button } from "../ui/button";

const DEFAULT_DISCORD_URL = "https://discord.gg/";

function DiscordMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.36-.76-.54-1.09A.1.1 0 0 0 9 4c-1.5.26-2.94.71-4.27 1.33a.09.09 0 0 0-.04.03C2.43 9.05 1.74 12.67 2.09 16.24c0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65a.1.1 0 0 0 .11-.03c.4-.55.76-1.13 1.07-1.74a.1.1 0 0 0-.05-.13 10.7 10.7 0 0 1-1.52-.73.1.1 0 0 1-.01-.16c.1-.08.2-.16.3-.24a.1.1 0 0 1 .1-.01c3.18 1.45 6.63 1.45 9.77 0a.1.1 0 0 1 .1.01c.1.08.2.16.3.24a.1.1 0 0 1-.01.16c-.49.28-.99.52-1.52.73a.1.1 0 0 0-.05.13c.31.61.67 1.19 1.07 1.74a.1.1 0 0 0 .11.03c1.72-.53 3.45-1.33 5.25-2.65a.1.1 0 0 0 .03-.05c.4-4.13-.68-7.72-2.87-10.88a.07.07 0 0 0-.03-.03ZM8.52 14.37c-.96 0-1.75-.88-1.75-1.96s.78-1.96 1.75-1.96 1.77.89 1.75 1.96c0 1.08-.78 1.96-1.75 1.96Zm6.97 0c-.96 0-1.75-.88-1.75-1.96s.78-1.96 1.75-1.96 1.77.89 1.75 1.96c0 1.08-.79 1.96-1.75 1.96Z" />
    </svg>
  );
}

export function DiscordIcon({ href = DEFAULT_DISCORD_URL }: { href?: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      nativeButton={false}
      className="hidden sm:flex"
      render={<a href={href} rel="noopener noreferrer" target="_blank" />}
    >
      <DiscordMark className="size-4" />
      <span className="sr-only">Discord</span>
    </Button>
  );
}

export function Discord({ href = DEFAULT_DISCORD_URL }: { href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-60 hover:opacity-100"
    >
      Join the Discord
    </a>
  );
}
