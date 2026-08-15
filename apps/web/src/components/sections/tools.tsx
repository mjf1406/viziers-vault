import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import {
  getToolById,
  getToolsInOrder,
  isToolAvailable,
  TOOL_DESCRIPTION_KEYS,
  TOOL_STATUS_KEYS,
  TOOL_TITLE_KEYS,
} from "@/lib/tools";
import { cn } from "@/lib/utils";

export function ToolsSection() {
  const { t } = useTranslation("home");
  const { t: tTools } = useTranslation("tools");
  const { t: tCommon } = useTranslation("common");
  const tools = getToolsInOrder();

  return (
    <section id="features" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">{t("toolsEyebrow")}</h2>
      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{t("toolsTitle")}</h2>
      <h3 className="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2">
        {t("toolsDescription")}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const available = isToolAvailable(tool);
          const isNew = tool.released === "new";
          const comingSoon = !available && !isNew;
          const titleKey = TOOL_TITLE_KEYS[tool.id];
          const descriptionKey = TOOL_DESCRIPTION_KEYS[tool.id];
          return (
            <Card
              key={tool.id}
              className={cn(
                "h-full shadow-none",
                isNew ? "border border-primary ring-0" : "border-0",
              )}
            >
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
                    {titleKey ? tTools(titleKey) : tool.title}
                    {isNew ? (
                      <Badge>{tCommon("new")}</Badge>
                    ) : comingSoon ? (
                      <Badge variant="secondary">{tCommon("comingSoon")}</Badge>
                    ) : null}
                  </CardTitle>
                  <div className="text-sm font-medium text-primary">
                    {tTools(TOOL_STATUS_KEYS[tool.status])}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p className="mb-3">{descriptionKey ? tTools(descriptionKey) : tool.description}</p>
                {tool.integrations?.length ? (
                  <div className="mt-2">
                    <div className="flex flex-wrap justify-center gap-2">
                      {tool.integrations.map((intId) => {
                        const integrated = getToolById(intId);
                        const intTitleKey = TOOL_TITLE_KEYS[intId];
                        return (
                          <span
                            key={intId}
                            className="inline-block rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                          >
                            {intTitleKey ? tTools(intTitleKey) : intId}
                            {integrated && !isToolAvailable(integrated)
                              ? ` · ${tCommon("soon")}`
                              : ""}
                          </span>
                        );
                      })}
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
