import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { getToolsInOrder, isToolAvailable } from "@/lib/tools";

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">Philosophy</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Design Philosophy</h2>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          Each tool in Vizier&apos;s Vault was created to solve a specific problem in D&D campaign
          preparation. While you can use them for other purposes, these are the main reasons each
          tool exists and how I envisioned they would be used.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        {getToolsInOrder().map((tool) => (
          <Card key={tool.id} className="h-full">
            <CardHeader>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Icon
                    name={tool.icon}
                    size={20}
                    color="var(--primary)"
                    className="text-primary"
                  />
                </div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  {tool.title}
                  {!isToolAvailable(tool) ? <Badge variant="secondary">Coming soon</Badge> : null}
                </CardTitle>
              </div>
              <p className="text-muted-foreground">{tool.description}</p>
            </CardHeader>
            <CardContent>
              <h4 className="mb-1 text-sm font-semibold text-primary">Philosophy</h4>
              <p className="text-sm text-muted-foreground">{tool.philosophy}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
