import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordéon accessible basé sur <details>/<summary> :
 * navigable au clavier et utilisable sans JavaScript par nature.
 */
export function Accordion({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("divide-y divide-line rounded-2xl border border-line bg-paper", className)}>
      {children}
    </div>
  );
}

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group px-5 md:px-6" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-medium text-ink marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 focus-visible:ring-offset-paper [&::-webkit-details-marker]:hidden">
        <span className="text-base md:text-lg">{question}</span>
        <ChevronDown
          className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="pb-5 pr-8 text-muted leading-relaxed">{children}</div>
    </details>
  );
}
