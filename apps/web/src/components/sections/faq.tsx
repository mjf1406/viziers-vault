import { Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  { value: "item-1", q: "q1", a: "a1" },
  { value: "item-2", q: "q2", a: "a2" },
  { value: "item-3", q: "q3", a: "a3", hasPricingLink: true },
  { value: "item-4", q: "q4", a: "a4" },
  { value: "item-5", q: "q5", a: "a5" },
  { value: "item-6", q: "q6", a: "a6" },
  { value: "item-7", q: "q7", a: "a7" },
] as const;

export function FaqSection() {
  const { t } = useTranslation("faq");

  return (
    <section id="faq" className="mx-auto w-full max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">{t("eyebrow")}</h2>
        <h2 className="text-center text-3xl font-bold md:text-4xl">{t("title")}</h2>
      </div>
      <Accordion className="AccordionRoot">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="text-left">{t(item.q)}</AccordionTrigger>
            <AccordionContent>
              {"hasPricingLink" in item && item.hasPricingLink ? (
                <Trans
                  i18nKey={item.a}
                  ns="faq"
                  components={{
                    pricingLink: <Link to="/pricing" className="text-primary underline" />,
                  }}
                />
              ) : (
                t(item.a)
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
