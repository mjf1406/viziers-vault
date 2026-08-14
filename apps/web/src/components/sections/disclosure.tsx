import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

const disclosureItems = [
  {
    icon: "Palette",
    title: "UI",
    description: "AI was used to help with the UI because I hate coding UI.",
    type: "ai" as const,
  },
  {
    icon: "Brush",
    title: "Art",
    description: "AI was not and will never be used for the art.",
    type: "human" as const,
  },
  {
    icon: "Code",
    title: "Algos",
    description:
      "AI was not and will never be used for the algorithms because I love coding algorithms. Algorithms are my jam!",
    type: "human" as const,
  },
];

export function DisclosureSection() {
  return (
    <section
      id="disclosure"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">Disclosure</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Development Philosophy</h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Transparency about how Vizier&apos;s Vault was built and our commitment to human
          creativity.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {disclosureItems.map((item) => (
          <Card key={item.title} className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon name={item.icon} size={24} color="var(--primary)" className="text-primary" />
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                {item.title}
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    item.type === "ai"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {item.type === "ai" ? "AI Assisted" : "Human Created"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
