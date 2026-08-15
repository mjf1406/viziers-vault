import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import { DownloadMenu } from "@/components/download-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PLAN_PRICES } from "@/lib/plans";
import { SITE } from "@/lib/site";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanConfig {
  titleKey: "planFreeTitle" | "planMonthlyTitle" | "planYearlyTitle";
  popular: PopularPlan;
  price: number;
  periodKey: "perMonth" | "perYear";
  descriptionKey: "planFreeDescription" | "planMonthlyDescription" | "planYearlyDescription";
  buttonKey?: "planMonthlyButton" | "planYearlyButton";
  benefitKeys: Array<
    | "planFreeBenefit1"
    | "planFreeBenefit2"
    | "planFreeBenefit3"
    | "planFreeBenefit4"
    | "planFreeBenefit5"
    | "planFreeBenefit6"
    | "planMonthlyBenefit1"
    | "planMonthlyBenefit2"
    | "planMonthlyBenefit3"
    | "planMonthlyBenefit4"
    | "planMonthlyBenefit5"
    | "planMonthlyBenefit6"
    | "planYearlyBenefit1"
    | "planYearlyBenefit2"
    | "planYearlyBenefit3"
    | "planYearlyBenefit4"
    | "planYearlyBenefit5"
    | "planYearlyBenefit6"
  >;
  href: string;
  dualActions?: boolean;
}

const plans: PlanConfig[] = [
  {
    titleKey: "planFreeTitle",
    popular: PopularPlan.NO,
    price: PLAN_PRICES.free,
    periodKey: "perMonth",
    descriptionKey: "planFreeDescription",
    benefitKeys: [
      "planFreeBenefit1",
      "planFreeBenefit2",
      "planFreeBenefit3",
      "planFreeBenefit4",
      "planFreeBenefit5",
      "planFreeBenefit6",
    ],
    href: SITE.selfHostUrl,
    dualActions: true,
  },
  {
    titleKey: "planMonthlyTitle",
    popular: PopularPlan.NO,
    price: PLAN_PRICES.monthly,
    periodKey: "perMonth",
    descriptionKey: "planMonthlyDescription",
    buttonKey: "planMonthlyButton",
    benefitKeys: [
      "planMonthlyBenefit1",
      "planMonthlyBenefit2",
      "planMonthlyBenefit3",
      "planMonthlyBenefit4",
      "planMonthlyBenefit5",
      "planMonthlyBenefit6",
    ],
    href: SITE.appUrl,
  },
  {
    titleKey: "planYearlyTitle",
    popular: PopularPlan.YES,
    price: PLAN_PRICES.yearly,
    periodKey: "perYear",
    descriptionKey: "planYearlyDescription",
    buttonKey: "planYearlyButton",
    benefitKeys: [
      "planYearlyBenefit1",
      "planYearlyBenefit2",
      "planYearlyBenefit3",
      "planYearlyBenefit4",
      "planYearlyBenefit5",
      "planYearlyBenefit6",
    ],
    href: SITE.appUrl,
  },
];

export function PricingSection() {
  const { t } = useTranslation("pricing");
  const { t: tCommon } = useTranslation("common");
  const { t: tCta } = useTranslation("cta");

  return (
    <section id="pricing" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{t("title")}</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map(
            ({
              titleKey,
              popular,
              price,
              periodKey,
              descriptionKey,
              buttonKey,
              benefitKeys,
              href,
              dualActions,
            }) => (
              <Card
                key={titleKey}
                className={
                  popular === PopularPlan.YES
                    ? "border-[1.5px] border-primary shadow-black/10 drop-shadow-xl lg:scale-[1.05] dark:shadow-white/10"
                    : ""
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{t(titleKey)}</CardTitle>
                    {popular === PopularPlan.YES ? (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        {tCommon("twoMonthsFree")}
                      </span>
                    ) : null}
                  </div>

                  <CardDescription className="min-h-[48px] pt-2">
                    {t(descriptionKey)}
                  </CardDescription>

                  <div className="pt-4">
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="text-muted-foreground">{t(periodKey)}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {benefitKeys.map((benefitKey) => (
                      <span key={benefitKey} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span className="text-sm">{t(benefitKey)}</span>
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  {dualActions ? (
                    <div className="flex w-full items-center gap-4">
                      <DownloadMenu
                        variant="default"
                        containerClassName="flex-1"
                        className="w-full font-semibold"
                      />
                      <Button
                        variant="link"
                        className="h-auto px-0 text-foreground"
                        nativeButton={false}
                        render={
                          <a
                            href={SITE.selfHostUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-col items-start leading-tight"
                          />
                        }
                      >
                        <span>{tCta("selfHost")}</span>
                        <span className="text-xs font-normal text-muted-foreground">
                          {tCta("selfHostExperts")}
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      className="w-full"
                      nativeButton={false}
                      render={<a href={href} />}
                    >
                      {t(buttonKey!)}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ),
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-muted-foreground">{t("questionsPrompt")}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/faq"
              className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {tCommon("viewFaq")}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {tCommon("contactSupport")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
