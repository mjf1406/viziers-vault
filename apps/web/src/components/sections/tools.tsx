import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { getToolsInOrder, isToolAvailable } from "@/lib/tools";

export function ToolsSection() {
  const tools = getToolsInOrder();
  const toolsByTitle = Object.fromEntries(tools.map((t) => [t.title, t])) as Record<
    string,
    (typeof tools)[number] | undefined
  >;

  return (
    <section id="features" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">Tools</h2>
      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">D&D 5e Content Generators</h2>
      <h3 className="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2">
        Tools for game masters to generate various things in their D&D 5e 2024 campaigns and then to
        share with their players.
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const available = isToolAvailable(tool);
          return (
            <Card key={tool.id} className="h-full border-0 shadow-none">
              <CardHeader className="flex items-center justify-center">
                <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
                  <Icon
                    name={tool.icon}
                    size={24}
                    color="var(--primary)"
                    className="text-primary"
                  />
                </div>
                <div className="flex-1 text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    {tool.title}
                    {!available ? <Badge variant="secondary">Coming soon</Badge> : null}
                  </CardTitle>
                  <div className="text-sm font-medium text-primary">{tool.status}</div>
                </div>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p className="mb-3">{tool.description}</p>
                {tool.integrations?.length ? (
                  <div className="mt-2">
                    <div className="flex flex-wrap justify-center gap-2">
                      {tool.integrations.map((intName) => (
                        <span
                          key={intName}
                          className="inline-block rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                        >
                          {intName}
                          {toolsByTitle[intName] && !isToolAvailable(toolsByTitle[intName]!)
                            ? " · soon"
                            : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
