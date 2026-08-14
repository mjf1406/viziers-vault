import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";

import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import { FontAwesomeIconPickerLazy } from "@/components/icons/FontAwesomeIconPickerLazy";
import { iconDefinitionToId, resolveIconId } from "@/components/icons/fontawesome-icon-catalog";
import { FileDropzone } from "@/components/upload/FileDropzone";
import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isEmojiIcon, isFontAwesomeIconId } from "@/lib/entity/entityIcon";
import { partyFormSchema, type PartyFormValues } from "@/lib/parties/partyFormSchema";
import type { Id } from "../../../convex/_generated/dataModel";

type VisualMode = "fontawesome" | "emoji" | "image";

export type PartyFormCredenzaMode = "create" | "edit";

export type PartyFormInitialValues = {
  name: string;
  description?: string;
  icon?: string;
  imageFileId?: Id<"files">;
};

type PartyFormCredenzaProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: PartyFormCredenzaMode;
  initialValues?: PartyFormInitialValues;
  onSubmit: (values: PartyFormValues) => Promise<void>;
};

type FormDefaults = {
  name: string;
  description: string;
  icon: string;
  imageFileId: string;
};

function resolveVisualMode(
  values: Pick<PartyFormInitialValues, "icon" | "imageFileId">,
): VisualMode {
  if (values.imageFileId) return "image";
  if (values.icon && isEmojiIcon(values.icon)) return "emoji";
  return "fontawesome";
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

export function PartyFormCredenza({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
}: PartyFormCredenzaProps) {
  const { t } = useTranslation("parties");
  const { t: tCommon } = useTranslation("common");
  const [visualMode, setVisualMode] = useState<VisualMode>("fontawesome");
  const [faIcon, setFaIcon] = useState<IconDefinition | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const skipNextResetRef = useRef(false);

  const defaults = useMemo(
    (): FormDefaults => ({
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      icon: initialValues?.icon ?? "",
      imageFileId: initialValues?.imageFileId ?? "",
    }),
    [initialValues],
  );
  const defaultsRef = useRef(defaults);
  defaultsRef.current = defaults;

  const applyVisualState = useCallback((values: FormDefaults) => {
    const modeForVisual = resolveVisualMode({
      icon: values.icon || undefined,
      imageFileId: (values.imageFileId || undefined) as Id<"files"> | undefined,
    });
    setVisualMode(modeForVisual);
    if (values.icon && isFontAwesomeIconId(values.icon)) {
      void resolveIconId(values.icon).then((resolved) => {
        setFaIcon(resolved);
      });
    } else {
      setFaIcon(null);
    }
  }, []);

  const form = useForm({
    defaultValues: defaults,
    onSubmit: async ({ value }) => {
      setSubmitError(null);
      const parsed = partyFormSchema.parse({
        ...value,
        icon: value.icon.trim() || undefined,
        description: value.description.trim() || undefined,
        imageFileId: value.imageFileId.trim() || undefined,
      });
      skipNextResetRef.current = true;
      onOpenChange(false);
      try {
        await onSubmit(parsed);
        skipNextResetRef.current = false;
        const values = defaultsRef.current;
        form.reset(values);
        setSubmitError(null);
        applyVisualState(values);
      } catch (error) {
        onOpenChange(true);
        setSubmitError(error instanceof Error ? error.message : t("saveFailed"));
      }
    },
  });

  const resetForm = useCallback(
    (values: FormDefaults) => {
      form.reset(values);
      setSubmitError(null);
      applyVisualState(values);
    },
    [applyVisualState, form],
  );

  useEffect(() => {
    if (!open) {
      if (!skipNextResetRef.current) {
        resetForm(defaults);
      }
      return;
    }
    if (skipNextResetRef.current) {
      skipNextResetRef.current = false;
      return;
    }
    resetForm(defaults);
  }, [open, defaults, resetForm]);

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="sm:max-w-lg">
        <CredenzaHeader>
          <CredenzaTitle>{mode === "create" ? t("createTitle") : t("editTitle")}</CredenzaTitle>
          <CredenzaDescription>
            {mode === "create" ? t("createDescription") : t("editDescription")}
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form
            id="party-form"
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-4">
              <form.Field name="name">
                {(field) => {
                  const error = fieldErrorMessage(field.state.meta.errors);
                  return (
                    <Field data-invalid={error ? true : undefined}>
                      <FieldLabel htmlFor="party-name">
                        {t("nameLabel")}
                        <span aria-hidden="true">*</span>
                      </FieldLabel>
                      <Input
                        id="party-name"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        aria-invalid={error ? true : undefined}
                        aria-required={true}
                        placeholder={t("namePlaceholder")}
                        autoComplete="off"
                      />
                      {error ? <FieldError>{error}</FieldError> : null}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="description">
                {(field) => {
                  const error = fieldErrorMessage(field.state.meta.errors);
                  return (
                    <Field data-invalid={error ? true : undefined}>
                      <FieldLabel htmlFor="party-description">
                        {t("descriptionLabel")}
                        <span className="font-normal text-muted-foreground">
                          ({tCommon("optional")})
                        </span>
                      </FieldLabel>
                      <Textarea
                        id="party-description"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        onKeyDown={(event) => {
                          if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                            event.preventDefault();
                            void form.handleSubmit();
                          }
                        }}
                        aria-invalid={error ? true : undefined}
                        placeholder={t("descriptionPlaceholder")}
                        rows={3}
                      />
                      {error ? <FieldError>{error}</FieldError> : null}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="icon">
                {(iconField) => (
                  <form.Field name="imageFileId">
                    {(imageField) => {
                      const iconError = fieldErrorMessage(iconField.state.meta.errors);
                      const imageError = fieldErrorMessage(imageField.state.meta.errors);
                      const error = iconError ?? imageError;
                      const imageFileId = (imageField.state.value || undefined) as
                        | Id<"files">
                        | undefined;

                      return (
                        <Field data-invalid={error ? true : undefined}>
                          <FieldLabel>
                            {t("iconLabel")}
                            <span className="font-normal text-muted-foreground">
                              ({tCommon("optional")})
                            </span>
                          </FieldLabel>
                          <ToggleGroup
                            variant="outline"
                            spacing={0}
                            value={[visualMode]}
                            onValueChange={(values) => {
                              const next = values[0] as VisualMode | undefined;
                              if (!next || next === visualMode) return;
                              setVisualMode(next);
                              setFaIcon(null);
                              iconField.handleChange("");
                              imageField.handleChange("");
                            }}
                          >
                            <ToggleGroupItem value="fontawesome">
                              {t("visualModeIcon")}
                            </ToggleGroupItem>
                            <ToggleGroupItem value="emoji">{t("visualModeEmoji")}</ToggleGroupItem>
                            <ToggleGroupItem value="image">{t("visualModeImage")}</ToggleGroupItem>
                          </ToggleGroup>
                          {visualMode === "fontawesome" ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <FontAwesomeIconPickerLazy
                                value={faIcon}
                                onChange={(icon) => {
                                  setFaIcon(icon);
                                  iconField.handleChange(iconDefinitionToId(icon));
                                }}
                                placeholder={t("iconPickerPlaceholder")}
                                className="w-full max-w-[280px]"
                              />
                              {iconField.state.value ? (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setFaIcon(null);
                                    iconField.handleChange("");
                                  }}
                                >
                                  {t("clearIcon")}
                                </Button>
                              ) : null}
                            </div>
                          ) : null}
                          {visualMode === "emoji" ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <Input
                                id="party-emoji"
                                value={iconField.state.value}
                                onBlur={iconField.handleBlur}
                                onChange={(event) => iconField.handleChange(event.target.value)}
                                aria-invalid={error ? true : undefined}
                                placeholder={t("emojiPlaceholder")}
                                autoComplete="off"
                                className="max-w-[12rem]"
                              />
                              {iconField.state.value ? (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => iconField.handleChange("")}
                                >
                                  {t("clearIcon")}
                                </Button>
                              ) : null}
                            </div>
                          ) : null}
                          {visualMode === "image" ? (
                            <div className="flex flex-col gap-3">
                              {imageFileId ? (
                                <div className="flex items-center gap-3">
                                  <EntityIconDisplay
                                    imageFileId={imageFileId}
                                    alt={t("imageLabel")}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => imageField.handleChange("")}
                                  >
                                    {t("clearImage")}
                                  </Button>
                                </div>
                              ) : (
                                <FileDropzone
                                  presetKey="images"
                                  variant="compact"
                                  multiple={false}
                                  title={t("imageLabel")}
                                  onUploaded={(fileId) => imageField.handleChange(fileId)}
                                />
                              )}
                            </div>
                          ) : null}
                          {error ? <FieldError>{error}</FieldError> : null}
                        </Field>
                      );
                    }}
                  </form.Field>
                )}
              </form.Field>
            </FieldGroup>
            {submitError ? (
              <p className="text-sm text-destructive" role="alert">
                {submitError}
              </p>
            ) : null}
          </form>
        </CredenzaBody>
        <CredenzaFooter className="flex-row justify-between gap-2">
          <CredenzaClose render={<Button type="button" variant="outline" className="flex-1" />}>
            {t("cancel")}
          </CredenzaClose>
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="party-form"
                className="flex-1"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting
                  ? t("saving")
                  : mode === "create"
                    ? t("createSubmit")
                    : t("editSubmit")}
              </Button>
            )}
          </form.Subscribe>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
