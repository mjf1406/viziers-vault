import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const BENEFITS = [
  {
    id: "save-prep-time",
    titleKey: "benefitSavePrepTitle",
    descriptionKey: "benefitSavePrepDescription",
    icon: "Clock",
  },
  {
    id: "balanced-content",
    titleKey: "benefitBalancedTitle",
    descriptionKey: "benefitBalancedDescription",
    icon: "Scale",
  },
  {
    id: "seamless-ux",
    titleKey: "benefitSeamlessTitle",
    descriptionKey: "benefitSeamlessDescription",
    icon: "Sparkles",
  },
  {
    id: "share-and-reuse",
    titleKey: "benefitShareTitle",
    descriptionKey: "benefitShareDescription",
    icon: "Share2",
  },
] as const;

export function BenefitsSection() {
  const { t } = useTranslation("home");
  const { t: tCta } = useTranslation("cta");

  return (
    <section id="benefits" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid place-items-center lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="mb-2 text-lg tracking-wider text-primary">{t("benefitsEyebrow")}</h2>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("benefitsTitle")}</h2>
          <p className="mb-8 text-xl text-muted-foreground">{t("benefitsDescription")}</p>
        </div>

        <div className="grid w-full gap-4 lg:grid-cols-2">
          {BENEFITS.map((b, index) => (
            <Card
              key={b.id}
              className="group/number bg-muted/50 transition-all delay-75 hover:bg-background dark:bg-card"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={b.icon}
                    size={32}
                    color="var(--primary)"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl font-medium text-muted-foreground/15 transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>
                <CardTitle>{t(b.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{t(b.descriptionKey)}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full justify-center gap-4">
        <Button nativeButton={false} render={<a href={`${SITE.appUrl}/account`} />}>
          {tCta("signUpNow")}
        </Button>
        <Button variant="outline" nativeButton={false} render={<a href={SITE.appUrl} />}>
          {tCta("goToApp")}
        </Button>
      </div>
    </section>
  );
}
