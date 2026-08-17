import { useEffect, useMemo, useState, type ReactNode, type SyntheticEvent } from "react";
import { useForm } from "@tanstack/react-form";
import {
  ChevronRightIcon,
  CircleQuestionMarkIcon,
  ExternalLinkIcon,
  HexagonIcon,
  InfoIcon,
} from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { NumberInput } from "@/components/ui/number-input";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useElapsedMs } from "@/hooks/hexagons/useElapsedMs";
import { useHexGridWorker } from "@/hooks/hexagons/useHexGridWorker";
import { formatElapsed } from "@/lib/hexagons/formatElapsed";
import {
  createHexGridFormSchema,
  emptyHexGridFormValues,
  HEX_OFFSET_PARITIES,
  HEX_ORIENTATIONS,
  HEX_UNITS,
  MAX_HEX_GRID_SIZE_PX,
  MAX_HEX_SIZE,
  MAX_PLANET_RADIUS,
  MIN_HEX_GRID_SIZE_PX,
  MIN_HEX_SIZE,
  MIN_PLANET_RADIUS,
  type HexOffsetParity,
  type HexOrientation,
  type HexUnit,
} from "@/lib/hexagons/hexGridFormSchema";
import {
  convertLength,
  lengthFromKm,
  lengthToKm,
  planetHexGridLayoutFromValues,
} from "@/lib/hexagons/planetHexGrid";
import {
  formatEquatorialRadiusEarthRadii,
  getMoonsOf,
  getPlanetPreset,
  isPlanetPresetId,
  matchPlanetPresetId,
  PLANET_HOST_PRESETS_BY_SUN_DISTANCE,
  type MoonPreset,
  type PlanetHostId,
  type PlanetHostPreset,
  type PlanetPreset,
  type PlanetPresetId,
  snapRadiusToHexSize,
  snappedRadiusMax,
  snappedRadiusMin,
} from "@/lib/hexagons/planetPresets";
import { cn } from "@/lib/utils";

const PLANET_NAME_KEYS = {
  mercury: "planetMercury",
  venus: "planetVenus",
  earth: "planetEarth",
  mars: "planetMars",
  jupiter: "planetJupiter",
  saturn: "planetSaturn",
  uranus: "planetUranus",
  neptune: "planetNeptune",
  ceres: "planetCeres",
  pluto: "planetPluto",
  haumea: "planetHaumea",
  makemake: "planetMakemake",
  eris: "planetEris",
  moon: "planetMoon",
  phobos: "planetPhobos",
  deimos: "planetDeimos",
  ganymede: "planetGanymede",
  callisto: "planetCallisto",
  io: "planetIo",
  europa: "planetEuropa",
  carme: "planetCarme",
  titan: "planetTitan",
  rhea: "planetRhea",
  iapetus: "planetIapetus",
  dione: "planetDione",
  tethys: "planetTethys",
  enceladus: "planetEnceladus",
  titania: "planetTitania",
  oberon: "planetOberon",
  umbriel: "planetUmbriel",
  ariel: "planetAriel",
  miranda: "planetMiranda",
  triton: "planetTriton",
  proteus: "planetProteus",
  nereid: "planetNereid",
  galatea: "planetGalatea",
  despina: "planetDespina",
} as const satisfies Record<PlanetPresetId, string>;

function PlanetPresetLabel({ presetId }: { presetId: PlanetPresetId | "custom" }) {
  const { t } = useTranslation("test");
  if (presetId === "custom") {
    return t("planetPresetCustom");
  }
  const preset = getPlanetPreset(presetId);
  return (
    <span className="flex w-full min-w-0 items-center gap-2">
      <span className="min-w-0 truncate">{t(PLANET_NAME_KEYS[presetId])}</span>
      <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">
        {formatEquatorialRadiusEarthRadii(preset.equatorialRadiusKm)}
        {"\u00A0R⊕"}
      </span>
    </span>
  );
}

function preventSelectActivation(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function selectedMoonParentId(presetId: PlanetPresetId | "custom"): PlanetHostId | null {
  if (presetId === "custom") return null;
  const preset = getPlanetPreset(presetId);
  return preset.kind === "moon" ? preset.parentId : null;
}

function PlanetPresetMoonToggle({
  host,
  expanded,
  onToggle,
}: {
  host: PlanetHostPreset;
  expanded: boolean;
  onToggle: (hostId: PlanetHostId) => void;
}) {
  const { t } = useTranslation("test");
  const name = t(PLANET_NAME_KEYS[host.id]);
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-expanded={expanded}
      aria-label={
        expanded
          ? t("planetPresetHideSatellites", { name })
          : t("planetPresetShowSatellites", { name })
      }
      className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      onPointerDown={preventSelectActivation}
      onMouseDown={preventSelectActivation}
      onClick={(event) => {
        preventSelectActivation(event);
        onToggle(host.id);
      }}
    >
      <ChevronRightIcon
        aria-hidden
        className={cn("size-3.5 transition-transform", expanded && "rotate-90")}
      />
    </button>
  );
}

function PlanetPresetHostItems({
  host,
  expanded,
  onToggleMoons,
}: {
  host: PlanetHostPreset;
  expanded: boolean;
  onToggleMoons: (hostId: PlanetHostId) => void;
}) {
  const moons: readonly MoonPreset[] = getMoonsOf(host.id);
  const hasMoons = moons.length > 0;
  return (
    <>
      <div className="relative">
        {hasMoons ? (
          <div className="absolute top-1/2 left-1 z-10 -translate-y-1/2">
            <PlanetPresetMoonToggle host={host} expanded={expanded} onToggle={onToggleMoons} />
          </div>
        ) : null}
        <SelectItem value={host.id} className="pl-10">
          <PlanetPresetLabel presetId={host.id} />
        </SelectItem>
      </div>
      {expanded
        ? moons.map((moon) => (
            <SelectItem key={moon.id} value={moon.id} className="pl-14">
              <PlanetPresetLabel presetId={moon.id} />
            </SelectItem>
          ))
        : null}
    </>
  );
}

function PlanetPresetSelect({
  id,
  value,
  onValueChange,
}: {
  id: string;
  value: PlanetPresetId | "custom";
  onValueChange: (presetId: PlanetPresetId) => void;
}) {
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<PlanetHostId>>(() => {
    const parentId = selectedMoonParentId(value);
    return parentId ? new Set([parentId]) : new Set();
  });

  useEffect(() => {
    const parentId = selectedMoonParentId(value);
    if (!parentId) return;
    setExpandedIds((prev) => {
      if (prev.has(parentId)) return prev;
      const next = new Set(prev);
      next.add(parentId);
      return next;
    });
  }, [value]);

  function toggleMoons(hostId: PlanetHostId) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(hostId)) next.delete(hostId);
      else next.add(hostId);
      return next;
    });
  }

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next == null || next === "custom" || !isPlanetPresetId(next)) return;
        onValueChange(next);
      }}
    >
      <SelectTrigger id={id} className="w-full">
        <SelectValue>
          <PlanetPresetLabel presetId={value} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false} className="min-w-72">
        {value === "custom" ? (
          <SelectItem value="custom">
            <PlanetPresetLabel presetId="custom" />
          </SelectItem>
        ) : null}
        {PLANET_HOST_PRESETS_BY_SUN_DISTANCE.map((host) => (
          <PlanetPresetHostItems
            key={host.id}
            host={host}
            expanded={expandedIds.has(host.id)}
            onToggleMoons={toggleMoons}
          />
        ))}
      </SelectContent>
    </Select>
  );
}

function snappedPresetRadii(preset: PlanetPreset, unit: HexUnit, hexSize: number) {
  return {
    equatorialRadius: snapRadiusToHexSize(lengthFromKm(preset.equatorialRadiusKm, unit), hexSize),
    polarRadius: snapRadiusToHexSize(lengthFromKm(preset.polarRadiusKm, unit), hexSize),
  };
}

function publicImgSrc(filename: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}img/${filename}`;
}

function FieldDiagramHelp({
  ariaLabel,
  title,
  description,
  imageSrc,
  imageAlt,
  imageClassName,
}: {
  ariaLabel: string;
  title: string;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageClassName: string;
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button type="button" variant="ghost" size="icon-sm" aria-label={ariaLabel} />}
      >
        <CircleQuestionMarkIcon />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <PopoverHeader>
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
        </PopoverHeader>
        <img src={imageSrc} alt={imageAlt} className={imageClassName} />
      </PopoverContent>
    </Popover>
  );
}

function GridSizeHelp() {
  const { t } = useTranslation("test");
  return (
    <FieldDiagramHelp
      ariaLabel={t("gridSizeHelpAria")}
      title={t("gridSizeHelpTitle")}
      description={
        <Trans
          t={t}
          i18nKey="gridSizeHelpDescription"
          components={{ hexS: <span className="font-bold italic" /> }}
        />
      }
      imageSrc={publicImgSrc("hexagon-parameters.svg")}
      imageAlt={t("gridSizeHelpImageAlt")}
      imageClassName="aspect-[35432/41280] h-auto w-full bg-background"
    />
  );
}

const DND_TRAVEL_PACE_URL =
  "https://www.dndbeyond.com/sources/dnd/basic-rules-2014/adventuring#TravelPace";

function DndTravelPaceLink({ children }: { children?: ReactNode }) {
  return (
    <a
      href={DND_TRAVEL_PACE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 text-primary underline underline-offset-4"
    >
      {children}
      <ExternalLinkIcon className="size-3 shrink-0" aria-hidden />
    </a>
  );
}

function HexSizeInfo() {
  const { t } = useTranslation("test");
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button type="button" variant="ghost" size="icon-sm" aria-label={t("hexSizeInfoAria")} />
        }
      >
        <InfoIcon />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <PopoverHeader>
          <PopoverTitle>{t("hexSizeInfoTitle")}</PopoverTitle>
          <PopoverDescription>{t("hexSizeInfoIntro")}</PopoverDescription>
        </PopoverHeader>
        <ul className="flex list-disc flex-col gap-1 pl-4 text-muted-foreground">
          <li>{t("hexSizeInfoRegion")}</li>
          <li>{t("hexSizeInfoNation")}</li>
          <li>{t("hexSizeInfoContinent")}</li>
          <li>{t("hexSizeInfoWorld")}</li>
        </ul>
        <p className="text-muted-foreground">
          <Trans
            t={t}
            i18nKey="hexSizeInfoNote"
            components={{
              dndLink: <DndTravelPaceLink />,
            }}
          />
        </p>
      </PopoverContent>
    </Popover>
  );
}

function EquatorialRadiusHelp() {
  const { t } = useTranslation("test");
  return (
    <FieldDiagramHelp
      ariaLabel={t("equatorialRadiusHelpAria")}
      title={t("equatorialRadiusHelpTitle")}
      description={
        <Trans
          t={t}
          i18nKey="equatorialRadiusHelpDescription"
          components={{ radiusR: <span className="font-bold italic" /> }}
        />
      }
      imageSrc={publicImgSrc("equitorial-radius.svg")}
      imageAlt={t("equatorialRadiusHelpImageAlt")}
      imageClassName="aspect-square h-auto w-full bg-background"
    />
  );
}

function PolarRadiusHelp() {
  const { t } = useTranslation("test");
  return (
    <FieldDiagramHelp
      ariaLabel={t("polarRadiusHelpAria")}
      title={t("polarRadiusHelpTitle")}
      description={
        <Trans
          t={t}
          i18nKey="polarRadiusHelpDescription"
          components={{ radiusR: <span className="font-bold italic" /> }}
        />
      }
      imageSrc={publicImgSrc("polar-radius.svg")}
      imageAlt={t("polarRadiusHelpImageAlt")}
      imageClassName="aspect-square h-auto w-full bg-background"
    />
  );
}

function fieldErrorMessage(errors: unknown): string | undefined {
  if (!Array.isArray(errors) || errors.length === 0) return undefined;
  const first = errors[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object" && "message" in first) {
    const message = (first as { message?: unknown }).message;
    return typeof message === "string" ? message : undefined;
  }
  return undefined;
}

function HexagonTypeIcon({ orientation }: { orientation: HexOrientation }) {
  return (
    <HexagonIcon
      data-icon="inline-start"
      className={orientation === "flat" ? "rotate-30" : undefined}
    />
  );
}

const HEX_OFFSET_PREVIEW_ICON = 10;
const HEX_OFFSET_PREVIEW_STEP = 7;
const HEX_OFFSET_PREVIEW_STAGGER = 4;
const HEX_OFFSET_PREVIEW_SIZE =
  2 * HEX_OFFSET_PREVIEW_STEP + HEX_OFFSET_PREVIEW_STAGGER + HEX_OFFSET_PREVIEW_ICON;

const OFFSET_PARITY_LABEL_KEYS = [
  "offsetEvenRows",
  "offsetOddRows",
  "offsetEvenColumns",
  "offsetOddColumns",
] as const;

type OffsetParityLabelKey = (typeof OFFSET_PARITY_LABEL_KEYS)[number];

function HexOffsetPreview({
  orientation,
  offsetParity,
}: {
  orientation: HexOrientation;
  offsetParity: HexOffsetParity;
}) {
  const isFlat = orientation === "flat";
  const cols = isFlat ? 2 : 3;
  const rows = isFlat ? 3 : 2;
  const staggerIndex = offsetParity === "odd" ? 0 : 1;
  const width = isFlat
    ? (cols - 1) * HEX_OFFSET_PREVIEW_STEP + HEX_OFFSET_PREVIEW_ICON
    : (cols - 1) * HEX_OFFSET_PREVIEW_STEP + HEX_OFFSET_PREVIEW_STAGGER + HEX_OFFSET_PREVIEW_ICON;
  const height = isFlat
    ? (rows - 1) * HEX_OFFSET_PREVIEW_STEP + HEX_OFFSET_PREVIEW_STAGGER + HEX_OFFSET_PREVIEW_ICON
    : (rows - 1) * HEX_OFFSET_PREVIEW_STEP + HEX_OFFSET_PREVIEW_ICON;

  const cells: Array<{ col: number; row: number }> = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({ col, row });
    }
  }

  return (
    <span
      aria-hidden
      data-icon="inline-start"
      className="relative inline-block shrink-0"
      style={{ width: HEX_OFFSET_PREVIEW_SIZE, height: HEX_OFFSET_PREVIEW_SIZE }}
    >
      <span
        className="absolute"
        style={{
          width,
          height,
          left: (HEX_OFFSET_PREVIEW_SIZE - width) / 2,
          top: (HEX_OFFSET_PREVIEW_SIZE - height) / 2,
        }}
      >
        {cells.map(({ col, row }) => {
          const staggered = (isFlat ? col : row) % 2 === staggerIndex;
          const x = isFlat
            ? col * HEX_OFFSET_PREVIEW_STEP
            : col * HEX_OFFSET_PREVIEW_STEP + (staggered ? HEX_OFFSET_PREVIEW_STAGGER : 0);
          const y = isFlat
            ? row * HEX_OFFSET_PREVIEW_STEP + (staggered ? HEX_OFFSET_PREVIEW_STAGGER : 0)
            : row * HEX_OFFSET_PREVIEW_STEP;
          return (
            <HexagonIcon
              key={`${col}-${row}`}
              className={cn("absolute size-2.5", isFlat && "rotate-30")}
              style={{ left: x, top: y }}
            />
          );
        })}
      </span>
    </span>
  );
}

function OffsetParityLabel({
  visibleKey,
  labels,
}: {
  visibleKey: OffsetParityLabelKey;
  labels: Record<OffsetParityLabelKey, string>;
}) {
  return (
    <span className="grid justify-items-start">
      {OFFSET_PARITY_LABEL_KEYS.map((key) => (
        <span
          key={key}
          className={cn("col-start-1 row-start-1", key !== visibleKey && "invisible")}
          aria-hidden={key !== visibleKey}
        >
          {labels[key]}
        </span>
      ))}
    </span>
  );
}

export function HexGridForm() {
  const { t, i18n } = useTranslation("test");
  const {
    render,
    cancel,
    progress,
    image,
    isGenerating,
    isReady,
    error: workerError,
  } = useHexGridWorker();
  const elapsedMs = useElapsedMs(isGenerating);

  const schema = useMemo(
    () =>
      createHexGridFormSchema({
        planetRadiusNumber: t("planetRadiusNumber"),
        planetRadiusInteger: t("planetRadiusInteger"),
        planetRadiusMin: t("planetRadiusMin", { min: MIN_PLANET_RADIUS }),
        planetRadiusMax: t("planetRadiusMax", { max: MAX_PLANET_RADIUS }),
        hexSizeNumber: t("hexSizeNumber"),
        hexSizeInteger: t("hexSizeInteger"),
        hexSizeMin: t("hexSizeMin", { min: MIN_HEX_SIZE }),
        hexSizeMax: t("hexSizeMax", { max: MAX_HEX_SIZE }),
        gridSizeNumber: t("gridSizeNumber"),
        gridSizeInteger: t("gridSizeInteger"),
        gridSizeMin: t("gridSizeMin", { min: MIN_HEX_GRID_SIZE_PX }),
        gridSizeMax: t("gridSizeMax", { max: MAX_HEX_GRID_SIZE_PX }),
        unitRequired: t("unitRequired"),
        typeRequired: t("typeRequired"),
        offsetRequired: t("offsetRequired"),
      }),
    [t],
  );

  const form = useForm({
    defaultValues: emptyHexGridFormValues(),
    validators: { onSubmit: schema },
    onSubmit: ({ value }) => {
      render(schema.parse(value));
    },
  });

  const progressTotal = progress && progress.total > 0 ? progress.total : 1;
  const progressDrawn = progress?.drawn ?? 0;
  const progressPercent = Math.min(100, (progressDrawn / progressTotal) * 100);
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <form
        className="flex w-full max-w-md flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Subscribe selector={(state) => state.values}>
            {(values) => {
              const hexSizeKm = lengthToKm(values.hexSize, values.unit);
              const radiusMin = snappedRadiusMin(values.hexSize, MIN_PLANET_RADIUS);
              const radiusMax = snappedRadiusMax(values.hexSize, MAX_PLANET_RADIUS);
              const presetId = matchPlanetPresetId(
                lengthToKm(values.equatorialRadius, values.unit),
                lengthToKm(values.polarRadius, values.unit),
                hexSizeKm,
              );
              const unitSuffix = `\u00A0${values.unit === "kilometers" ? t("unitKm") : t("unitMi")}`;
              const layout = planetHexGridLayoutFromValues(values);
              return (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="hex-planet-preset">{t("planetPresetLabel")}</FieldLabel>
                      <PlanetPresetSelect
                        id="hex-planet-preset"
                        value={presetId}
                        onValueChange={(next) => {
                          const preset = getPlanetPreset(next);
                          form.reset({
                            ...values,
                            ...snappedPresetRadii(preset, values.unit, values.hexSize),
                          });
                        }}
                      />
                    </Field>

                    <form.Field name="unit">
                      {(field) => {
                        const error = fieldErrorMessage(field.state.meta.errors);
                        return (
                          <Field data-invalid={error ? true : undefined}>
                            <FieldLabel>{t("unitLabel")}</FieldLabel>
                            <ToggleGroup
                              variant="outline"
                              spacing={0}
                              className="w-full flex-nowrap"
                              value={[field.state.value]}
                              onValueChange={(nextValues) => {
                                const next = nextValues[0] as HexUnit | undefined;
                                if (!next || !HEX_UNITS.includes(next)) return;
                                if (next === values.unit) return;
                                const nextHexSize = Math.max(
                                  MIN_HEX_SIZE,
                                  convertLength(values.hexSize, values.unit, next),
                                );
                                form.reset({
                                  ...values,
                                  unit: next,
                                  hexSize: nextHexSize,
                                  equatorialRadius: snapRadiusToHexSize(
                                    convertLength(values.equatorialRadius, values.unit, next),
                                    nextHexSize,
                                  ),
                                  polarRadius: snapRadiusToHexSize(
                                    convertLength(values.polarRadius, values.unit, next),
                                    nextHexSize,
                                  ),
                                });
                              }}
                            >
                              <ToggleGroupItem value="kilometers" className="flex-1">
                                {t("unitKilometers")}
                              </ToggleGroupItem>
                              <ToggleGroupItem value="miles" className="flex-1">
                                {t("unitMiles")}
                              </ToggleGroupItem>
                            </ToggleGroup>
                            {error ? <FieldError>{error}</FieldError> : null}
                          </Field>
                        );
                      }}
                    </form.Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field name="hexSize">
                      {(field) => {
                        const error = fieldErrorMessage(field.state.meta.errors);
                        return (
                          <Field data-invalid={error ? true : undefined}>
                            <div className="flex items-center gap-1">
                              <FieldLabel htmlFor="hex-size">{t("hexSizeLabel")}</FieldLabel>
                              <HexSizeInfo />
                            </div>
                            <NumberInput
                              id="hex-size"
                              value={field.state.value}
                              min={MIN_HEX_SIZE}
                              max={MAX_HEX_SIZE}
                              step={1}
                              suffix={unitSuffix}
                              inputClassName="w-24"
                              onBlur={field.handleBlur}
                              onValueChange={(next) => {
                                const radii =
                                  presetId === "custom"
                                    ? {
                                        equatorialRadius: snapRadiusToHexSize(
                                          values.equatorialRadius,
                                          next,
                                        ),
                                        polarRadius: snapRadiusToHexSize(values.polarRadius, next),
                                      }
                                    : snappedPresetRadii(
                                        getPlanetPreset(presetId),
                                        values.unit,
                                        next,
                                      );
                                form.reset({
                                  ...values,
                                  hexSize: next,
                                  ...radii,
                                });
                              }}
                              aria-invalid={error ? true : undefined}
                            />
                            {error ? <FieldError>{error}</FieldError> : null}
                          </Field>
                        );
                      }}
                    </form.Field>

                    <form.Field name="gridSize">
                      {(field) => {
                        const error = fieldErrorMessage(field.state.meta.errors);
                        return (
                          <Field data-invalid={error ? true : undefined}>
                            <div className="flex items-center gap-1">
                              <FieldLabel htmlFor="hex-grid-size">{t("gridSizeLabel")}</FieldLabel>
                              <GridSizeHelp />
                            </div>
                            <NumberInput
                              id="hex-grid-size"
                              value={field.state.value}
                              min={MIN_HEX_GRID_SIZE_PX}
                              max={MAX_HEX_GRID_SIZE_PX}
                              step={1}
                              suffix={`\u00A0${t("unitPx")}`}
                              inputClassName="w-24"
                              onBlur={field.handleBlur}
                              onValueChange={(next) => field.handleChange(next)}
                              aria-invalid={error ? true : undefined}
                            />
                            {error ? <FieldError>{error}</FieldError> : null}
                          </Field>
                        );
                      }}
                    </form.Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field name="equatorialRadius">
                      {(field) => {
                        const error = fieldErrorMessage(field.state.meta.errors);
                        return (
                          <Field data-invalid={error ? true : undefined}>
                            <div className="flex items-center gap-1">
                              <FieldLabel htmlFor="hex-equatorial-radius">
                                {t("equatorialRadiusLabel")}
                              </FieldLabel>
                              <EquatorialRadiusHelp />
                            </div>
                            <NumberInput
                              id="hex-equatorial-radius"
                              value={field.state.value}
                              min={radiusMin}
                              max={radiusMax}
                              step={values.hexSize}
                              suffix={unitSuffix}
                              inputClassName="w-24"
                              onBlur={() => {
                                field.handleBlur();
                                field.handleChange(
                                  snapRadiusToHexSize(field.state.value, values.hexSize),
                                );
                              }}
                              onValueChange={(next) => field.handleChange(next)}
                              aria-invalid={error ? true : undefined}
                            />
                            {error ? <FieldError>{error}</FieldError> : null}
                          </Field>
                        );
                      }}
                    </form.Field>

                    <form.Field name="polarRadius">
                      {(field) => {
                        const error = fieldErrorMessage(field.state.meta.errors);
                        return (
                          <Field data-invalid={error ? true : undefined}>
                            <div className="flex items-center gap-1">
                              <FieldLabel htmlFor="hex-polar-radius">
                                {t("polarRadiusLabel")}
                              </FieldLabel>
                              <PolarRadiusHelp />
                            </div>
                            <NumberInput
                              id="hex-polar-radius"
                              value={field.state.value}
                              min={radiusMin}
                              max={radiusMax}
                              step={values.hexSize}
                              suffix={unitSuffix}
                              inputClassName="w-24"
                              onBlur={() => {
                                field.handleBlur();
                                field.handleChange(
                                  snapRadiusToHexSize(field.state.value, values.hexSize),
                                );
                              }}
                              onValueChange={(next) => field.handleChange(next)}
                              aria-invalid={error ? true : undefined}
                            />
                            {error ? <FieldError>{error}</FieldError> : null}
                          </Field>
                        );
                      }}
                    </form.Field>
                  </div>

                  <FieldDescription className="flex flex-col">
                    <span>
                      {t("hexGridCount", {
                        count: layout.instanceCount.toLocaleString(i18n.language),
                      })}
                    </span>
                    <span>
                      {t("hexGridImageSize", {
                        width: layout.canvasWidth.toLocaleString(i18n.language),
                        height: layout.canvasHeight.toLocaleString(i18n.language),
                      })}
                    </span>
                  </FieldDescription>
                </>
              );
            }}
          </form.Subscribe>

          <FieldSet>
            <FieldLegend>{t("typeLabel")}</FieldLegend>
            <form.Field name="orientation">
              {(field) => {
                const error = fieldErrorMessage(field.state.meta.errors);
                return (
                  <Field data-invalid={error ? true : undefined}>
                    <ToggleGroup
                      variant="outline"
                      spacing={0}
                      className="flex-wrap"
                      value={[field.state.value]}
                      onValueChange={(values) => {
                        const next = values[0] as HexOrientation | undefined;
                        if (!next || !HEX_ORIENTATIONS.includes(next)) return;
                        field.handleChange(next);
                      }}
                    >
                      <ToggleGroupItem value="pointy">
                        <HexagonTypeIcon orientation="pointy" />
                        {t("typePointy")}
                      </ToggleGroupItem>
                      <ToggleGroupItem value="flat">
                        <HexagonTypeIcon orientation="flat" />
                        {t("typeFlat")}
                      </ToggleGroupItem>
                    </ToggleGroup>
                    {error ? <FieldError>{error}</FieldError> : null}
                  </Field>
                );
              }}
            </form.Field>

            <form.Subscribe selector={(state) => state.values.orientation}>
              {(orientation) => (
                <form.Field name="offsetParity">
                  {(field) => {
                    const error = fieldErrorMessage(field.state.meta.errors);
                    const offsetLabels = {
                      offsetEvenRows: t("offsetEvenRows"),
                      offsetOddRows: t("offsetOddRows"),
                      offsetEvenColumns: t("offsetEvenColumns"),
                      offsetOddColumns: t("offsetOddColumns"),
                    };
                    const evenLabelKey =
                      orientation === "flat" ? "offsetEvenColumns" : "offsetEvenRows";
                    const oddLabelKey =
                      orientation === "flat" ? "offsetOddColumns" : "offsetOddRows";
                    return (
                      <Field data-invalid={error ? true : undefined}>
                        <FieldLabel>{t("offsetLabel")}</FieldLabel>
                        <ToggleGroup
                          variant="outline"
                          spacing={0}
                          className="flex-wrap"
                          value={[field.state.value]}
                          onValueChange={(values) => {
                            const next = values[0] as HexOffsetParity | undefined;
                            if (!next || !HEX_OFFSET_PARITIES.includes(next)) return;
                            field.handleChange(next);
                          }}
                        >
                          <ToggleGroupItem value="even" className="h-auto min-h-9 py-1">
                            <HexOffsetPreview orientation={orientation} offsetParity="even" />
                            <OffsetParityLabel visibleKey={evenLabelKey} labels={offsetLabels} />
                          </ToggleGroupItem>
                          <ToggleGroupItem value="odd" className="h-auto min-h-9 py-1">
                            <HexOffsetPreview orientation={orientation} offsetParity="odd" />
                            <OffsetParityLabel visibleKey={oddLabelKey} labels={offsetLabels} />
                          </ToggleGroupItem>
                        </ToggleGroup>
                        {error ? <FieldError>{error}</FieldError> : null}
                      </Field>
                    );
                  }}
                </form.Field>
              )}
            </form.Subscribe>
          </FieldSet>
        </FieldGroup>

        {workerError ? <p className="text-sm text-destructive">{t("hexGridFailed")}</p> : null}

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" disabled={!isGenerating} onClick={cancel}>
              {t("cancelGrid")}
            </Button>
            <Button type="submit" disabled={!isReady}>
              {isGenerating ? <Spinner data-icon="inline-start" /> : null}
              {isGenerating ? t("hexGridGenerating") : t("renderGrid")}
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <Progress
              value={progressDrawn}
              max={progressTotal}
              className="[&_[data-slot=progress-indicator]]:transition-none"
            >
              <ProgressLabel>
                {t("hexGridProgress")}{" "}
                <span className="font-normal text-muted-foreground tabular-nums">
                  ({formatElapsed(elapsedMs)})
                </span>
              </ProgressLabel>
              <ProgressValue>{() => `${Math.round(progressPercent)}%`}</ProgressValue>
            </Progress>
            <p className="text-sm text-muted-foreground">
              {t("hexGridProgressCount", {
                drawn: (progress?.drawn ?? 0).toLocaleString(i18n.language),
                total: (progress?.total ?? 0).toLocaleString(i18n.language),
              })}
            </p>
          </div>
        </div>
      </form>

      <div className="flex min-w-0 w-full flex-col gap-3">
        {image ? (
          <img
            src={image.url}
            alt={t("hexGridPreviewAlt")}
            width={image.width}
            height={image.height}
            className="image-pixelated h-auto max-w-full border border-border bg-background"
          />
        ) : (
          <form.Subscribe selector={(state) => state.values}>
            {(values) => {
              const layout = planetHexGridLayoutFromValues(values);
              return (
                <div
                  className="min-w-0 max-w-full border border-border bg-background"
                  style={{
                    width: layout.canvasWidth,
                    aspectRatio: `${layout.canvasWidth} / ${layout.canvasHeight}`,
                  }}
                />
              );
            }}
          </form.Subscribe>
        )}
      </div>
    </div>
  );
}
