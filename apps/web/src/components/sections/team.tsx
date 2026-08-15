import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import { GithubMark } from "@/components/brand/github";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SKILLS = ["Next.js", "TypeScript", "D&D 5e", "Teaching", "Translation", "3D Modeling"];

export function TeamSection() {
  const { t } = useTranslation("team");
  const { t: tCommon } = useTranslation("common");

  return (
    <section id="team" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">{t("eyebrow")}</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t("description")}</p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-1 lg:grid-cols-1">
        <Card className="text-center">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <Avatar className="h-24 w-24" size="lg">
                <AvatarImage
                  src="https://a-z-animals.com/media/2021/04/shutterstock_634628570.jpg"
                  alt="Michael Fitzgerald"
                />
                <AvatarFallback className="text-lg">MF</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">Michael Fitzgerald</CardTitle>
            <CardDescription className="text-lg font-medium text-primary">
              {t("role")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="leading-relaxed text-muted-foreground">{t("bio")}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SKILLS.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={
                  <a href="https://github.com/mjf1406" rel="noopener noreferrer" target="_blank" />
                }
              >
                <GithubMark className="mr-2 h-4 w-4" />
                {tCommon("github")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={
                  <a
                    href="https://mr-monkey-portfolio.vercel.app/"
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                }
              >
                <Globe className="mr-2 h-4 w-4" />
                {t("portfolio")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
