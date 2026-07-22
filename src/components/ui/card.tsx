import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  surface?: "paper" | "surface";
};

/** Carte sobre : bordure fine, coins arrondis modérés, ombre douce. */
export function Card({
  className,
  interactive = false,
  surface = "paper",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line p-6 md:p-7",
        surface === "paper" ? "bg-paper" : "bg-surface",
        interactive &&
          "transition duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card",
        className,
      )}
      {...props}
    />
  );
}
