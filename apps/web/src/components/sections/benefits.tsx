import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

type Benefit = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

const benefits: Benefit[] = [
  {
    id: "save-prep-time",
    title: "Save Hours of Prep",
    description:
      "Spin up encounters, loot, and maps in minutes so you can spend more time on story and play.",
    icon: "Clock",
  },
  {
    id: "balanced-content",
    title: "Balanced, Ready-to-Run Content",
    description:
      "Auto-tuned difficulty and scalable recommendations reduce guesswork and keep sessions flowing.",
    icon: "Scale",
  },
  {
    id: "seamless-ux",
    title: "Frictionless Session Flow",
    description:
      "Fast, clean UI and smart defaults minimize clicks and context switching during the game.",
    icon: "Sparkles",
  },
  {
    id: "share-and-reuse",
    title: "Share and Reuse Easily",
    description:
      "One-click links and exports let you hand off content to players or reuse across campaigns.",
    icon: "Share2",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid place-items-center lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="mb-2 text-lg tracking-wider text-primary">Benefits</h2>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Streamline Your D&amp;D Campaign</h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Focus on storytelling and player engagement while our tools handle the mechanical
            aspects of preparation and play.
          </p>
        </div>

        <div className="grid w-full gap-4 lg:grid-cols-2">
          {benefits.map((b, index) => (
            <Card
              key={b.id}
              className="group/number bg-muted/50 transition-all delay-75 hover:bg-background dark:bg-card"
            >
              <CardHeader>
                <div className="flex justify-between">
                  {b.icon ? (
                    <Icon
                      name={b.icon}
                      size={32}
                      color="var(--primary)"
                      className="mb-6 text-primary"
                    />
                  ) : (
                    <span />
                  )}
                  <span className="text-5xl font-medium text-muted-foreground/15 transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>
                <CardTitle>{b.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{b.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full justify-center space-x-4">
        <Button nativeButton={false} render={<a href={`${SITE.appUrl}/account`} />}>
          Sign up now
        </Button>
        <Button variant="outline" nativeButton={false} render={<a href={SITE.appUrl} />}>
          Go to the app
        </Button>
      </div>
    </section>
  );
}
