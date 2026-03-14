/** @format */

export type TierId = "free" | "basic";

export interface Plan {
    id: TierId;
    title: string;
    priceMonthly: number;
    priceYearly?: number;
    billingPeriod?: "monthly" | "yearly";
    description: string;
    ctaText: string;
    ctaHref: string;
    popular?: boolean;
    footnote?: string;
}

export const plans: Plan[] = [
    { id: "free", title: "Free", priceMonthly: 0, description: "Basic access to core generators with limited features and no data persistence.", ctaText: "Start Using Free", ctaHref: "/app/account" },
    { id: "basic", title: "Basic", priceMonthly: 3, priceYearly: 30, description: "Full access to all features with data persistence and advanced capabilities.", ctaText: "Sign up for Basic", ctaHref: "/app/account", popular: true, footnote: "No credit card required" },
];
