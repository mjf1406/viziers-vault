import { Check, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { DesktopAppButton, SelfHostButton, SubscribeNowButton } from "@/components/cta-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FEATURE_TITLE_KEYS, features } from "@/lib/features";
import { PLAN_DESCRIPTION_KEYS, PLAN_TITLE_KEYS, plans, type TierId } from "@/lib/plans";

const tierOrder: Record<TierId, number> = {
  free: 0,
  basic: 1,
};

export function PricingSection() {
  const { t } = useTranslation("pricing");
  const { t: tPlans } = useTranslation("plans");
  const { t: tFeatures } = useTranslation("features");

  return (
    <section id="pricing" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">{t("eyebrow")}</h2>
      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{t("title")}</h2>
      <h3 className="mx-auto pb-14 text-center text-xl text-muted-foreground md:w-1/2">
        {t("description")}
      </h3>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:gap-4">
        {plans.map((plan) => {
          const included = features.filter((f) => f.minTier === plan.id);
          const previousTier = Object.keys(tierOrder)[tierOrder[plan.id] - 1] as TierId | undefined;
          const previousTitleKey = previousTier ? PLAN_TITLE_KEYS[previousTier] : undefined;
          return (
            <Card
              key={plan.id}
              className={
                plan.popular
                  ? "transform-gpu border-[1.5px] border-primary shadow-black/10 drop-shadow-xl transition-all lg:scale-[1.1] dark:shadow-white/10"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {tPlans(PLAN_TITLE_KEYS[plan.id])}
                  </CardTitle>
                </div>
                <CardDescription>{tPlans(PLAN_DESCRIPTION_KEYS[plan.id])}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.id === "basic" && plan.priceYearly ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-1">
                      <div className="text-3xl font-semibold">${plan.priceYearly}</div>
                      <div className="text-sm text-muted-foreground">{t("perYear")}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${plan.priceMonthly}
                      {t("perMonth")}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <div className="text-3xl font-semibold">${plan.priceMonthly}</div>
                    <div className="text-sm text-muted-foreground">{t("perMonth")}</div>
                  </div>
                )}

                <ul className="flex flex-col gap-2">
                  {previousTitleKey ? (
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        {t("everythingIn", { plan: tPlans(previousTitleKey) })}
                      </span>
                    </li>
                  ) : null}
                  {included.map((f) => {
                    const titleKey = FEATURE_TITLE_KEYS[f.id];
                    return (
                      <li key={f.id} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-green-600" />
                        <span className="text-sm">{titleKey ? tFeatures(titleKey) : f.title}</span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
              <CardFooter className="flex w-full flex-col items-center justify-center gap-2">
                {plan.id === "basic" ? (
                  <SubscribeNowButton className="w-full" variant="default" />
                ) : null}
                {plan.id === "free" ? (
                  <div className="flex w-full flex-col gap-2">
                    <DesktopAppButton className="w-full" variant="outline" />
                    <SelfHostButton className="w-full" variant="outline" />
                  </div>
                ) : null}
                {plan.id !== "free" && plan.id !== "basic" ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    nativeButton={false}
                    render={<a href={plan.ctaHref} />}
                  >
                    {plan.ctaText}
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
