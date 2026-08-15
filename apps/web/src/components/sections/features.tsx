import { useTranslation } from "react-i18next";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FEATURE_DESCRIPTION_KEYS, FEATURE_TITLE_KEYS, features } from "@/lib/features";

const serviceCardFeatureIds = [
  "customizable-settings",
  "permalinks",
  "image-export",
  "vtt-export",
  "csv-export",
  "custom-worlds-and-cities",
];

export function FeaturesSection() {
  const { t } = useTranslation("home");
  const { t: tFeatures } = useTranslation("features");
  const cards = serviceCardFeatureIds
    .map((id) => features.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
        {t("featuresEyebrow")}
      </h2>
      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{t("featuresTitle")}</h2>
      <h3 className="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2">
        {t("featuresDescription")}
      </h3>

      <div className="mx-auto grid w-full gap-4 sm:grid-cols-2 lg:w-[60%] lg:grid-cols-2">
        {cards.map((f) => {
          const titleKey = FEATURE_TITLE_KEYS[f.id];
          const descriptionKey = FEATURE_DESCRIPTION_KEYS[f.id];
          return (
            <Card key={f.id} className="h-full bg-muted/60 dark:bg-card">
              <CardHeader>
                <CardTitle>{titleKey ? tFeatures(titleKey) : f.title}</CardTitle>
                <CardDescription>
                  {descriptionKey ? tFeatures(descriptionKey) : f.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
