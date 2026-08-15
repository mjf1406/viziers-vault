import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import {
  getToolsInOrder,
  isToolAvailable,
  TOOL_DESCRIPTION_KEYS,
  TOOL_PHILOSOPHY_KEYS,
  TOOL_TITLE_KEYS,
} from "@/lib/tools";

export function PhilosophySection() {
  const { t } = useTranslation("about");
  const { t: tTools } = useTranslation("tools");
  const { t: tCommon } = useTranslation("common");

  return (
    <section
      id="philosophy"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">{t("philosophyEyebrow")}</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("philosophyTitle")}</h2>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          {t("philosophyDescription")}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        {getToolsInOrder().map((tool) => {
          const titleKey = TOOL_TITLE_KEYS[tool.id];
          const descriptionKey = TOOL_DESCRIPTION_KEYS[tool.id];
          const philosophyKey = TOOL_PHILOSOPHY_KEYS[tool.id];
          return (
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
                    {titleKey ? tTools(titleKey) : tool.title}
                    {!isToolAvailable(tool) ? (
                      <Badge variant="secondary">{tCommon("comingSoon")}</Badge>
                    ) : null}
                  </CardTitle>
                </div>
                <p className="text-muted-foreground">
                  {descriptionKey ? tTools(descriptionKey) : tool.description}
                </p>
              </CardHeader>
              <CardContent>
                <h4 className="mb-1 text-sm font-semibold text-primary">
                  {t("toolPhilosophyHeading")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {philosophyKey ? tTools(philosophyKey) : tool.philosophy}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
