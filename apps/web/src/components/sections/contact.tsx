import { Mail, MessageCircle } from "lucide-react";

import { GithubMark } from "@/components/brand/github";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">Contact & Support</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get Help & Provide Feedback</h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Have questions about Vizier&apos;s Vault or suggestions for new features? We&apos;d love
          to hear from you.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Get Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              I&apos;m one person, the sole developer, so I rely on the community to provide support
              if I am not available. Please join the Discord for support.
            </p>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<a href={SITE.discordUrl} rel="noopener noreferrer" target="_blank" />}
            >
              Join the Discord
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Suggest new features or improvements for future releases via Discord.
            </p>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<a href={SITE.discordUrl} rel="noopener noreferrer" target="_blank" />}
            >
              Join the Discord
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <GithubMark className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              View the source code or contribute to the project. Please note that the project is
              licensed under{" "}
              <a
                className="underline"
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"
                rel="noopener noreferrer"
                target="_blank"
              >
                CC BY-NC-SA 4.0
              </a>
              .
            </p>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<a href={SITE.githubUrl} rel="noopener noreferrer" target="_blank" />}
            >
              View on GitHub
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
