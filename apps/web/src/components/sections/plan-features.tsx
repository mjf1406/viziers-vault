import { Check, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/features";
import { plans, type TierId } from "@/lib/plans";

const tierOrder: Record<TierId, number> = {
  free: 0,
  basic: 1,
};

export function PlanFeaturesSection() {
  return (
    <section
      id="plan-details"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">Details</h2>
        <h3 className="text-2xl font-bold md:text-3xl">
          A feature-by-feature breakdown of each plan
        </h3>
        <p className="mt-3 text-muted-foreground md:mx-auto md:w-1/2">
          A thorough breakdown of every feature and which plan includes it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.id} className="h-full">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <div className="mt-1 text-sm text-muted-foreground">{plan.description}</div>
              <div className="mt-4">
                {plan.id === "basic" && plan.priceYearly ? (
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <div className="text-2xl font-semibold">${plan.priceYearly}</div>
                      <div className="text-xs text-muted-foreground">/year</div>
                    </div>
                    <div className="text-xs text-muted-foreground">${plan.priceMonthly}/month</div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <div className="text-2xl font-semibold">${plan.priceMonthly}</div>
                    <div className="text-xs text-muted-foreground">/month</div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2">
                {features.map((f) => {
                  const included = tierOrder[f.minTier] <= tierOrder[plan.id];
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
                          {f.title}
                        </div>
                        {f.description ? (
                          <div className="max-w-md text-xs text-muted-foreground">
                            {f.description}
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
