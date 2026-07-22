import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "neutral" | "accent" | "onDark";
};

/** Petite pastille / étiquette. */
export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        tone === "primary" && "bg-primary-50 text-primary-800",
        tone === "neutral" && "bg-surface-strong text-muted",
        tone === "accent" && "bg-accent-500/10 text-accent-600",
        tone === "onDark" && "bg-white/10 text-white",
        className,
      )}
      {...props}
    />
  );
}
