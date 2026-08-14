import { Apple, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { DESKTOP_DOWNLOADS } from "@/lib/site";

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13L10.5 19.6v-7.1H3v6zm8.2 1.2L21 21V12.5h-9.8v7.2ZM12.2 11.5H21V3l-8.8 1.2v7.3Z" />
    </svg>
  );
}

function UbuntuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 1.8a8.2 8.2 0 0 1 5.7 2.3l-1.4 1.4A6.2 6.2 0 0 0 12 5.6c-.7 0-1.4.1-2 .4L9.2 4.4A8.2 8.2 0 0 1 12 3.8Zm-7.4 5.3 1.7.7A6.2 6.2 0 0 0 5.8 12c0 .9.2 1.7.5 2.4l-1.7.7A8.2 8.2 0 0 1 4.6 9.1Zm3.5 8.4 1.1-1.5c.8.6 1.8 1 2.8 1 .9 0 1.8-.3 2.5-.8l1.2 1.5A8.2 8.2 0 0 1 12 20.2a8.2 8.2 0 0 1-5-1.7Zm11.7-3.4-1.7-.7c.3-.7.5-1.5.5-2.4s-.2-1.7-.5-2.4l1.7-.7a8.2 8.2 0 0 1 0 6.2ZM9.5 12a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" />
    </svg>
  );
}

type DownloadMenuProps = {
  className?: string;
  containerClassName?: string;
  variant?: "default" | "secondary" | "ghost";
};

export function DownloadMenu({
  className,
  containerClassName = "w-5/6 md:w-1/4",
  variant = "secondary",
}: DownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative inline-block ${containerClassName}`}>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={() => setOpen((value) => !value)}
      >
        Download free
        <ChevronDown className="ml-2 size-4" />
      </Button>
      {open ? (
        <div className="absolute right-0 left-0 z-50 mt-2 rounded-md border border-secondary bg-card p-1 shadow-md">
          <a
            href={DESKTOP_DOWNLOADS.windows}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            <WindowsIcon />
            Windows
          </a>
          <a
            href={DESKTOP_DOWNLOADS.mac}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            <Apple className="size-4" />
            Mac
          </a>
          <a
            href={DESKTOP_DOWNLOADS.ubuntu}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            <UbuntuIcon />
            Ubuntu
          </a>
        </div>
      ) : null}
    </div>
  );
}
