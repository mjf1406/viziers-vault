import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export function NameExplanationSection() {
  return (
    <section
      id="name-explanation"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">About the Name</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Why &quot;Vizier&apos;s Vault&quot;?
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          The name is an intentional reference to the Vizier card from the{" "}
          <a
            href="https://www.dndbeyond.com/magic-items/4617-deck-of-many-things"
            className="underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Deck of Many Things
          </a>
          : a card that grants a single truthful answer and practical insight when asked.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon name="Book" size={20} color="var(--primary)" className="text-primary" />
              </div>
              <CardTitle className="text-xl">Vizier</CardTitle>
            </div>
            <p className="text-muted-foreground">
              An ode to the Vizier card: every generation is an answer.
            </p>
          </CardHeader>
          <CardContent>
            <h4 className="mb-1 text-sm font-semibold text-primary">In Practice</h4>
            <p className="text-sm text-muted-foreground">
              The site offers clear, practical information paired with context or guidance for
              implementation.
            </p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon name="Archive" size={20} color="var(--primary)" className="text-primary" />
              </div>
              <CardTitle className="text-xl">Vault</CardTitle>
            </div>
            <p className="text-muted-foreground">
              With each question, you reach into the vault of tools to grab an answer and then
              return that now known answer back to the vault for safe-keeping.
            </p>
          </CardHeader>
          <CardContent>
            <h4 className="mb-1 text-sm font-semibold text-primary">In Practice</h4>
            <p className="text-sm text-muted-foreground">
              Every answer is stored for future reuse and/or reference.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
