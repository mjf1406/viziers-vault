import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqList: { question: string; answer: ReactNode; value: string }[] = [
  {
    question: "What D&D edition does Vizier's Vault support?",
    answer: "Vizier's Vault is designed specifically for D&D 5e 2024.",
    value: "item-1",
  },
  {
    question: "Can I use the free version for my campaigns?",
    answer:
      "Yes, the free version includes all generators with premade cities and worlds, but no data persistence, so once you leave the page, everything will be lost. You can export generations as CSV/Image files, though.",
    value: "item-2",
  },
  {
    question: "What's included in the Premium subscription plans?",
    answer: (
      <>
        Premium plans include all current and future generators, custom world/city creation, party
        creation, data persistence, permalink and generation. Logging in gives you a free trial. You
        can read more about it on the{" "}
        <Link to="/pricing" className="text-primary underline">
          pricing page
        </Link>
        .
      </>
    ),
    value: "item-3",
  },
  {
    question: "Can I export generated content to my VTT?",
    answer:
      "Yes, battle maps can be exported in formats compatible with popular virtual tabletop platforms. Other generated content can be exported as CSV files for easy integration.",
    value: "item-4",
  },
  {
    question: "How accurate is the encounter balancing?",
    answer:
      "Encounters are balanced using official D&D 5e 2024 guidelines, taking into account the number of PCs in the party and their levels.",
    value: "item-5",
  },
  {
    question: "Can I create custom content or modify the generators?",
    answer:
      "Currently, the generators use official D&D 5e data. Custom world and city creation is available in all Premium plans. Creating custom spells, monsters, and magic items is planned for future updates. You can customize the generator settings to your heart's content.",
    value: "item-6",
  },
  {
    question: "What about other systems?",
    answer:
      "I want to support other systems as I play and learn them, but I'll have to look at licensing agreements to ensure they allow the creation of digital tools. I would also like to make it easy for open source contributions of additional systems.",
    value: "item-7",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">FAQ</h2>
        <h2 className="text-center text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
      </div>
      <Accordion className="AccordionRoot">
        {faqList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
