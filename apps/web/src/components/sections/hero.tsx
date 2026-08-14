import { GetStartedButton, LearnMoreButton } from "@/components/cta-buttons";
import { DownloadMenu } from "@/components/download-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-7xl">
        <div className="space-y-8 text-center">
          <Badge variant="outline" className="py-2 text-sm">
            <span className="mr-2 text-primary">
              <Badge>Alpha 1</Badge>
            </span>
            <span>Magic Shop &amp; Spellbook Generators Available</span>
          </Badge>

          <div className="mx-auto max-w-3xl text-center text-4xl font-bold md:text-6xl">
            <h1>
              Your{" "}
              <span className="bg-linear-to-r from-[#D247BF] to-primary bg-clip-text px-2 text-transparent">
                hex-world manager{" "}
              </span>
              for all of your hex-crawling needs
            </h1>
          </div>

          <p className="mx-auto max-w-screen-sm text-xl text-muted-foreground">
            Create hex-worlds on which to crawl. Your players can join, too.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <DownloadMenu className="w-full font-bold" variant="default" />

            <GetStartedButton className="w-5/6 md:w-1/4" />

            <LearnMoreButton className="w-5/6 font-bold md:w-1/4" />

            <Button
              variant="ghost"
              className="h-auto w-5/6 py-2 font-bold md:w-1/4"
              nativeButton={false}
              render={
                <a
                  href={SITE.selfHostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center leading-tight"
                />
              }
            >
              <span>Self-host</span>
              <span className="text-xs font-normal text-muted-foreground">Experts only</span>
            </Button>
          </div>
        </div>

        <div className="group relative mt-14">
          <div className="absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80"></div>
          <div className="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-linear-to-b from-background/0 via-background/50 to-background md:h-28"></div>
        </div>
      </div>
    </section>
  );
}
