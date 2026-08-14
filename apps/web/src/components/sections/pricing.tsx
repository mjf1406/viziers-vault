import { Check, CheckCircle } from "lucide-react";

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
import { features } from "@/lib/features";
import { plans, type TierId } from "@/lib/plans";

const tierOrder: Record<TierId, number> = {
  free: 0,
  basic: 1,
};

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">Pricing</h2>
      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Simple, transparent pricing
      </h2>
      <h3 className="mx-auto pb-14 text-center text-xl text-muted-foreground md:w-1/2">
        Choose the plan that fits your D&amp;D campaign needs.
      </h3>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:gap-4">
        {plans.map((plan) => {
          const included = features.filter((f) => f.minTier === plan.id);
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
                  <CardTitle className="flex items-center gap-2">{plan.title}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.id === "basic" && plan.priceYearly ? (
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <div className="text-3xl font-semibold">${plan.priceYearly}</div>
                      <div className="text-sm text-muted-foreground">/year</div>
                    </div>
                    <div className="text-sm text-muted-foreground">${plan.priceMonthly}/month</div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <div className="text-3xl font-semibold">${plan.priceMonthly}</div>
                    <div className="text-sm text-muted-foreground">/month</div>
                  </div>
                )}

                <ul className="space-y-2">
                  {tierOrder[plan.id] > 0 && (
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        Everything in {Object.keys(tierOrder)[tierOrder[plan.id] - 1]} and...
                      </span>
                    </li>
                  )}
                  {included.map((f) => (
                    <li key={f.id} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-green-600" />
                      <span className="text-sm">{f.title}</span>
                    </li>
                  ))}
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
