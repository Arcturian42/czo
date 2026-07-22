import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { GoldSeam } from "./gold-seam";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
};

/** Conteneur éditorial centré, avec des largeurs cohérentes. */
export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "container-edge",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-[86rem]",
        className,
      )}
      {...props}
    />
  );
}

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  surface?: "paper" | "surface" | "ink";
  spacing?: "default" | "tight" | "loose";
};

/** Bloc de section vertical avec fond et espacement réglables. */
export function Section({
  as: Tag = "section",
  surface = "paper",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        surface === "surface" && "bg-surface",
        surface === "ink" && "bg-ink text-white",
        spacing === "default" && "py-16 md:py-24",
        spacing === "tight" && "py-12 md:py-16",
        spacing === "loose" && "py-20 md:py-32",
        className,
      )}
      {...props}
    />
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
  onDark?: boolean;
};

/** En-tête de section : sur-titre technique + titre + intro. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Heading = "h2",
  className,
  onDark = false,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-3", onDark && "text-primary-300")}>{eyebrow}</p>
      ) : null}
      <Heading
        className={cn(
          "text-balance text-3xl font-semibold sm:text-4xl",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {/* Signature « fil d'or » sous chaque titre de section. */}
      <GoldSeam
        bold
        length="short"
        glow={onDark}
        className={cn("mt-5", align === "center" && "mx-auto")}
      />
      {intro ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            onDark ? "text-white/70" : "text-muted",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
