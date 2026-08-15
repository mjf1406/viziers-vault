import { Mail, MessageCircle } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

import { GithubMark } from "@/components/brand/github";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/lib/site";

export function ContactSection() {
  const { t } = useTranslation("contact");

  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">{t("eyebrow")}</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t("description")}</p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t("supportTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{t("supportDescription")}</p>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<a href={SITE.discordUrl} rel="noopener noreferrer" target="_blank" />}
            >
              {t("joinDiscord")}
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t("feedbackTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{t("feedbackDescription")}</p>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<a href={SITE.discordUrl} rel="noopener noreferrer" target="_blank" />}
            >
              {t("joinDiscord")}
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <GithubMark className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t("developmentTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              <Trans
                i18nKey="developmentDescription"
                ns="contact"
                components={{
                  licenseLink: (
                    <a
                      className="underline"
                      href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  ),
                }}
              />
            </p>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<a href={SITE.githubUrl} rel="noopener noreferrer" target="_blank" />}
            >
              {t("viewGithub")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
