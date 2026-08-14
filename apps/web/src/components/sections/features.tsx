import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/features";

const serviceCardFeatureIds = [
  "customizable-settings",
  "permalinks",
  "image-export",
  "vtt-export",
  "csv-export",
  "custom-worlds-and-cities",
];

export function FeaturesSection() {
  const cards = serviceCardFeatureIds
    .map((id) => features.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">Features</h2>
      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Vizier&apos;s Vault Capabilities
      </h2>
      <h3 className="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2">
        Features designed to streamline your D&amp;D campaign preparation and management.
      </h3>

      <div className="mx-auto grid w-full gap-4 sm:grid-cols-2 lg:w-[60%] lg:grid-cols-2">
        {cards.map((f) => (
          <Card key={f.id} className="h-full bg-muted/60 dark:bg-card">
            <CardHeader>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
