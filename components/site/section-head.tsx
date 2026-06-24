import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";

export function SectionHead({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <Badge className="mb-4">{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold sm:text-4xl">
        {title}{" "}
        {accent ? (
          <span className="text-[var(--brand)] italic">{accent}</span>
        ) : null}
      </h2>
      {children ? (
        <p className="mt-4 text-pretty text-muted-foreground">{children}</p>
      ) : null}
    </Reveal>
  );
}
