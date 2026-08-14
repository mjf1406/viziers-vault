import { Globe } from "lucide-react";

import { GithubMark } from "@/components/brand/github";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Michael Fitzgerald",
    role: "Founder & Lead Developer",
    description:
      "Elementary School Teacher, Web Developer, Programmer, Translator (Mandarin → English), D&D Forever DM, Cyclist, 3D Printer, 3D Modeler.",
    avatar: "https://a-z-animals.com/media/2021/04/shutterstock_634628570.jpg",
    fallback: "MF",
    links: {
      github: "https://github.com/mjf1406",
      portfolio: "https://mr-monkey-portfolio.vercel.app/",
    } as { github?: string; portfolio?: string; linkedin?: string },
    skills: ["Next.js", "TypeScript", "D&D 5e", "Teaching", "Translation", "3D Modeling"],
  },
];

export function TeamSection() {
  return (
    <section id="team" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">Team</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Meet the Developer</h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Built by a full-time teacher for the TTRPG community.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-1 lg:grid-cols-1">
        {teamMembers.map((member) => (
          <Card key={member.name} className="text-center">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <Avatar className="h-24 w-24" size="lg">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-lg">{member.fallback}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
              <CardDescription className="text-lg font-medium text-primary">
                {member.role}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed text-muted-foreground">{member.description}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-center gap-4 pt-4">
                {member.links.github ? (
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={
                      <a href={member.links.github} rel="noopener noreferrer" target="_blank" />
                    }
                  >
                    <GithubMark className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                ) : null}
                {member.links.portfolio ? (
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={
                      <a href={member.links.portfolio} rel="noopener noreferrer" target="_blank" />
                    }
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Portfolio
                  </Button>
                ) : null}
                {member.links.linkedin ? (
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={
                      <a href={member.links.linkedin} rel="noopener noreferrer" target="_blank" />
                    }
                  >
                    <span className="mr-2 inline-block h-4 w-4 rounded-sm bg-current" />
                    LinkedIn
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
