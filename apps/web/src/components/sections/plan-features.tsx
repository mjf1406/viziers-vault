import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FEATURE_DESCRIPTION_KEYS, FEATURE_TITLE_KEYS, features } from "@/lib/features";
import { PLAN_DESCRIPTION_KEYS, PLAN_TITLE_KEYS, plans, type TierId } from "@/lib/plans";

const tierOrder: Record<TierId, number> = {
  free: 0,
  basic: 1,
};

export function PlanFeaturesSection() {
  const { t } = useTranslation("pricing");
  const { t: tPlans } = useTranslation("plans");
  const { t: tFeatures } = useTranslation("features");

  return (
    <section
      id="plan-details"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">{t("detailsEyebrow")}</h2>
        <h3 className="text-2xl font-bold md:text-3xl">{t("detailsTitle")}</h3>
        <p className="mt-3 text-muted-foreground md:mx-auto md:w-1/2">{t("detailsDescription")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.id} className="h-full">
            <CardHeader>
              <CardTitle>{tPlans(PLAN_TITLE_KEYS[plan.id])}</CardTitle>
              <div className="mt-1 text-sm text-muted-foreground">
                {tPlans(PLAN_DESCRIPTION_KEYS[plan.id])}
              </div>
              <div className="mt-4">
                {plan.id === "basic" && plan.priceYearly ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-1">
                      <div className="text-2xl font-semibold">${plan.priceYearly}</div>
                      <div className="text-xs text-muted-foreground">{t("perYear")}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${plan.priceMonthly}
                      {t("perMonth")}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <div className="text-2xl font-semibold">${plan.priceMonthly}</div>
                    <div className="text-xs text-muted-foreground">{t("perMonth")}</div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <ul className="flex flex-col gap-2">
                {features.map((f) => {
                  const included = tierOrder[f.minTier] <= tierOrder[plan.id];
                  const titleKey = FEATURE_TITLE_KEYS[f.id];
                  const descriptionKey = FEATURE_DESCRIPTION_KEYS[f.id];
                  return (
                    <li key={f.id} className="flex items-start gap-3">
                      {included ? (
                        <Check className="mt-1 h-4 w-4 text-green-600" />
                      ) : (
                        <X className="mt-1 h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <div
                          className={
                            included ? "text-sm font-medium" : "text-sm text-muted-foreground"
                          }
                        >
                          {titleKey ? tFeatures(titleKey) : f.title}
                        </div>
                        {descriptionKey ? (
                          <div className="max-w-md text-xs text-muted-foreground">
                            {tFeatures(descriptionKey)}
                          </div>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
