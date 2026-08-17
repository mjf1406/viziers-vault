import { useEffect, useState, type ComponentProps, type ReactNode } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adjacentStepValue, nearestStepValue } from "@/components/ui/number-input-step";
import { cn } from "@/lib/utils";

type NumberInputProps = Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "prefix"
> & {
  /** Pass `null` to show an empty field (optional scores). */
  value: number | null;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Decorative text shown inside the field before the value (e.g. "×"). */
  prefix?: ReactNode;
  /** Decorative text shown inside the field after the value (e.g. "%"). */
  suffix?: ReactNode;
  /** Extra classes for the numeric input element. */
  inputClassName?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function NumberInput({
  value,
  onValueChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  disabled,
  className,
  id,
  prefix,
  suffix,
  inputClassName,
  onBlur,
  ...props
}: NumberInputProps) {
  const { t } = useTranslation("common");
  /** `null` = show committed `value`; otherwise the in-progress input text (may be empty). */
  const [draft, setDraft] = useState<string | null>(null);

  useEffect(() => {
    setDraft(null);
  }, [value]);

  const setClamped = (next: number, snap: "none" | "nearest" = "none") => {
    if (!Number.isFinite(next)) return;
    const clamped = clamp(next, min, max);
    const snapped = snap === "nearest" ? nearestStepValue(clamped, step, min) : clamped;
    onValueChange(clamp(snapped, min, max));
  };

  const commitDraftOrRevert = (): number | null => {
    if (draft === null) return value;
    if (draft === "" || draft === "-") {
      setDraft(null);
      return value;
    }
    const next = Number(draft);
    setDraft(null);
    return Number.isFinite(next) ? next : value;
  };

  const displayValue = draft ?? (value === null ? "" : value);

  return (
    <div data-slot="number-input" className={cn("flex w-fit items-stretch", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        tabIndex={-1}
        disabled={disabled || (value !== null && value <= min)}
        aria-label={t("decreaseValue")}
        aria-controls={id}
        className="shrink-0 rounded-r-none focus-visible:z-10"
        onClick={() => {
          setDraft(null);
          if (value === null) {
            setClamped(Number.isFinite(min) ? min : 0, "nearest");
            return;
          }
          setClamped(adjacentStepValue(value, step, min, -1), "nearest");
        }}
      >
        <MinusIcon />
      </Button>
      <div className="relative -ml-px">
        {prefix != null ? (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-2 z-10 -translate-y-1/2 text-sm text-muted-foreground select-none"
          >
            {prefix}
          </span>
        ) : null}
        <Input
          id={id}
          type="number"
          inputMode="numeric"
          disabled={disabled}
          min={Number.isFinite(min) ? min : undefined}
          max={Number.isFinite(max) ? max : undefined}
          step={step}
          value={displayValue}
          onChange={(event) => {
            const raw = event.target.value;
            if (raw === "") {
              setDraft("");
              return;
            }
            // Allow typing a leading minus when negatives are in range.
            if (raw === "-" && min < 0) {
              setDraft("-");
              return;
            }
            const next = event.target.valueAsNumber;
            if (!Number.isFinite(next)) {
              setDraft(raw);
              return;
            }
            setDraft(null);
            setClamped(next);
          }}
          onBlur={(event) => {
            const current = commitDraftOrRevert();
            if (current !== null) setClamped(current, "nearest");
            onBlur?.(event);
          }}
          className={cn(
            "rounded-none tabular-nums focus-visible:z-10",
            suffix != null || prefix != null ? "w-28" : "w-16",
            prefix != null && suffix != null
              ? "pr-5 pl-5 text-center"
              : prefix != null
                ? "pr-2 pl-5 text-left"
                : suffix != null
                  ? "pr-8 pl-2 text-right"
                  : "text-center",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            inputClassName,
          )}
          {...props}
        />
        {suffix != null ? (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-2 z-10 -translate-y-1/2 text-sm text-muted-foreground select-none"
          >
            {suffix}
          </span>
        ) : null}
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        tabIndex={-1}
        disabled={disabled || (value !== null && value >= max)}
        aria-label={t("increaseValue")}
        aria-controls={id}
        className="-ml-px shrink-0 rounded-l-none focus-visible:z-10"
        onClick={() => {
          setDraft(null);
          if (value === null) {
            setClamped(Number.isFinite(min) ? min : 0, "nearest");
            return;
          }
          setClamped(adjacentStepValue(value, step, min, 1), "nearest");
        }}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}

export { NumberInput };
