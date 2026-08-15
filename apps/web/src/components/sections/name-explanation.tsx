import { Trans, useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export function NameExplanationSection() {
  const { t } = useTranslation("about");

  return (
    <section
      id="name-explanation"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">{t("nameEyebrow")}</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("nameTitle")}</h2>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          <Trans
            i18nKey="nameIntro"
            ns="about"
            components={{
              deckLink: (
                <a
                  href="https://www.dndbeyond.com/magic-items/4617-deck-of-many-things"
                  className="underline"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              ),
            }}
          />
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon name="Book" size={20} color="var(--primary)" className="text-primary" />
              </div>
              <CardTitle className="text-xl">{t("vizierTitle")}</CardTitle>
            </div>
            <p className="text-muted-foreground">{t("vizierDescription")}</p>
          </CardHeader>
          <CardContent>
            <h4 className="mb-1 text-sm font-semibold text-primary">{t("vizierPracticeTitle")}</h4>
            <p className="text-sm text-muted-foreground">{t("vizierPractice")}</p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon name="Archive" size={20} color="var(--primary)" className="text-primary" />
              </div>
              <CardTitle className="text-xl">{t("vaultTitle")}</CardTitle>
            </div>
            <p className="text-muted-foreground">{t("vaultDescription")}</p>
          </CardHeader>
          <CardContent>
            <h4 className="mb-1 text-sm font-semibold text-primary">{t("vaultPracticeTitle")}</h4>
            <p className="text-sm text-muted-foreground">{t("vaultPractice")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
