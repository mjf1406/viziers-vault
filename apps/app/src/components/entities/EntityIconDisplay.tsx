import { FontAwesomeIconFromId } from "@/components/icons/FontAwesomeIconFromId";
import { useFileBytes } from "@/hooks/files/useFileBytes";
import { isEmojiIcon, isFontAwesomeIconId } from "@/lib/entity/entityIcon";
import type { Id } from "../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type EntityIconDisplayProps = {
  icon?: string | null;
  imageFileId?: Id<"files"> | null;
  className?: string;
  fallbackClassName?: string;
  alt?: string;
};

export function EntityIconDisplay({
  icon,
  imageFileId,
  className,
  fallbackClassName,
  alt = "",
}: EntityIconDisplayProps) {
  const { url: imageUrl } = useFileBytes(imageFileId ?? undefined);
  const trimmed = icon?.trim() ?? "";

  if (imageFileId && imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        className={cn("size-10 shrink-0 rounded-lg object-cover", className)}
      />
    );
  }

  if (trimmed && isEmojiIcon(trimmed)) {
    return (
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-lg",
          className,
        )}
        aria-hidden="true"
      >
        {trimmed}
      </span>
    );
  }

  if (trimmed && isFontAwesomeIconId(trimmed)) {
    return (
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary",
          className,
        )}
      >
        <FontAwesomeIconFromId
          id={trimmed}
          className="text-lg"
          fallback={<span className="size-4 rounded bg-muted" />}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted",
        fallbackClassName ?? className,
      )}
      aria-hidden="true"
    />
  );
}
