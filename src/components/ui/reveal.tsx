"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Délai d'apparition en ms (pour des cascades légères). */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
  id?: string;
};

/**
 * Apparition progressive au scroll via IntersectionObserver.
 * Léger (aucune dépendance) et respectueux de `prefers-reduced-motion`
 * grâce au style `.reveal` défini dans globals.css.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div", id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    // Sans IntersectionObserver, la classe `.js` n'est pas posée (voir layout) :
    // le CSS laisse alors le contenu visible. On ne fait donc rien ici.
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={cn("reveal", className)}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
