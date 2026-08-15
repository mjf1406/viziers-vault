import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

const DISCLOSURE_ITEMS = [
  {
    icon: "Palette",
    titleKey: "disclosureUiTitle",
    descriptionKey: "disclosureUiDescription",
    type: "ai" as const,
  },
  {
    icon: "Brush",
    titleKey: "disclosureArtTitle",
    descriptionKey: "disclosureArtDescription",
    type: "human" as const,
  },
  {
    icon: "Code",
    titleKey: "disclosureAlgosTitle",
    descriptionKey: "disclosureAlgosDescription",
    type: "human" as const,
  },
] as const;

export function DisclosureSection() {
  const { t } = useTranslation("about");

  return (
    <section
      id="disclosure"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">{t("disclosureEyebrow")}</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("disclosureTitle")}</h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          {t("disclosureDescription")}
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {DISCLOSURE_ITEMS.map((item) => (
          <Card key={item.titleKey} className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon name={item.icon} size={24} color="var(--primary)" className="text-primary" />
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                {t(item.titleKey)}
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    item.type === "ai"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {item.type === "ai" ? t("disclosureAiAssisted") : t("disclosureHumanCreated")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t(item.descriptionKey)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
