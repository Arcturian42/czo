import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Encart « à compléter » — signale honnêtement les contenus qui dépendent
 * du document source non fourni. À retirer une fois la donnée renseignée.
 */
export function PendingNote({
  title = "Éléments à compléter depuis le document source",
  items,
  className,
}: {
  title?: string;
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-accent-400/60 bg-accent-500/[0.04] p-4 text-sm",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-medium text-accent-600">
        <FileText className="size-4" aria-hidden="true" />
        {title}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** Pastille inline « à compléter » pour une valeur placeholder isolée. */
export function PendingPill({ label = "à compléter" }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-accent-400/70 bg-accent-500/[0.06] px-2 py-0.5 text-xs font-medium text-accent-600">
      {label}
    </span>
  );
}
