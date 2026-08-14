import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DesktopAppButton, SelfHostButton, SubscribeNowButton } from "@/components/cta-buttons";

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl">
        <div className="space-y-8 text-center">
          <Badge variant="outline" className="py-2 text-sm">
            <span className="mr-2 text-primary">
              <Badge>Alpha 1</Badge>
            </span>
            <span>Magic Shop &amp; Spellbook Generators Available</span>
          </Badge>

          <div className="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
            <h1>
              Generate D&D 5e content with
              <span className="bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text px-2 text-transparent">
                Vizier&apos;s Vault
              </span>
            </h1>
          </div>

          <p className="mx-auto max-w-screen-sm text-xl text-muted-foreground">
            Create magic shops, encounters, spellbooks, battle maps, and worlds for your D&D 5e 2024
            campaigns. Built for game masters to create and then share with their players.
          </p>

          <div className="flex flex-wrap justify-center gap-4 space-x-0">
            <DesktopAppButton className="w-5/6 font-bold md:w-1/4" />
            <SelfHostButton className="w-5/6 font-bold md:w-1/4" />
            <Button
              variant="secondary"
              className="w-5/6 font-bold md:w-1/4"
              nativeButton={false}
              render={<a href="#features" />}
            >
              Learn more
            </Button>
            <SubscribeNowButton className="w-5/6 md:w-1/4" />
          </div>
          <p className="-mt-3 text-sm text-muted-foreground">
            Download the Desktop App to try it locally for free first.
          </p>
        </div>

        <div className="group relative mt-14">
          <div className="absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80"></div>
          <div className="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28"></div>
        </div>
      </div>
    </section>
  );
}
