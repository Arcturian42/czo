"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * GoldSeamCanvas — le geste kintsugi, rendu vivant.
 *
 * Une jointure d'or dentelée se dessine sur un « substrat » sombre façon carte
 * électronique : des pistes de circuit rompues sont *reconnectées* par l'or en
 * fusion à mesure qu'il s'écoule. C'est « réparer » rendu littéralement en tech
 * — le motif identitaire de Kinto (金継ぎ), le métal réuni par l'or.
 *
 * Amélioration progressive : purement décoratif (`aria-hidden`), sans aucune
 * dépendance. Sous `prefers-reduced-motion` la jointure est tracée d'un coup,
 * sans animation. Le composant peut être omis sans casser la mise en page.
 */
export function GoldSeamCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    // Alias non-null : le narrowing est conservé dans les closures.
    const cv = el;
    const context = cv.getContext("2d");
    if (!context) return;
    // Alias non-null : le narrowing est ainsi conservé dans les closures.
    const c = context;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Point = { x: number; y: number };
    type Trace = { y: number; index: number };

    let width = 0;
    let height = 0;
    let seam: Point[] = [];
    let traces: Trace[] = [];
    let raf = 0;
    let progress = 0; // 0 → 1 : la jointure se dessine
    let shimmer = 0; // reflet en fusion qui parcourt la jointure formée

    // PRNG déterministe : la fêlure reste stable d'un rendu à l'autre.
    function makeRand(seed: number): () => number {
      let s = seed % 233280;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    }

    function build(): void {
      width = cv.clientWidth;
      height = cv.clientHeight;
      cv.width = Math.max(1, Math.round(width * dpr));
      cv.height = Math.max(1, Math.round(height * dpr));
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = makeRand(20260722);
      const n = 90;
      const cx = width * 0.44;
      seam = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        const drift = Math.sin(t * Math.PI * 2.2) * width * 0.06;
        const jitter = Math.sin(t * 34) * 5 + (rand() - 0.5) * 10;
        seam.push({ x: cx + drift + jitter, y: t * height });
      }

      // Pistes de circuit rompues, chacune traversée par la jointure.
      const rows = 5;
      traces = [];
      for (let r = 0; r < rows; r++) {
        const t = (r + 0.5) / rows + (rand() - 0.5) * 0.05;
        const index = Math.max(0, Math.min(n, Math.round(t * n)));
        traces.push({ y: seam[index].y, index });
      }
    }

    function strokeSeam(upTo: number, lineWidth: number, glow: boolean): void {
      if (upTo < 1) return;
      c.save();
      if (glow) {
        c.shadowColor = "rgba(219, 138, 82, 0.85)";
        c.shadowBlur = 16;
      }
      c.beginPath();
      c.moveTo(seam[0].x, seam[0].y);
      for (let i = 1; i <= upTo; i++) c.lineTo(seam[i].x, seam[i].y);
      const g = c.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "#a85a2b");
      g.addColorStop(0.5, "#f2ba8b");
      g.addColorStop(1, "#c26a34");
      c.strokeStyle = g;
      c.lineWidth = lineWidth;
      c.lineCap = "round";
      c.lineJoin = "round";
      c.stroke();
      c.restore();
    }

    function moltenDot(p: Point, radius: number): void {
      const rg = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
      rg.addColorStop(0, "rgba(255, 231, 196, 0.95)");
      rg.addColorStop(0.4, "rgba(242, 186, 139, 0.6)");
      rg.addColorStop(1, "rgba(219, 138, 82, 0)");
      c.fillStyle = rg;
      c.beginPath();
      c.arc(p.x, p.y, radius, 0, Math.PI * 2);
      c.fill();
    }

    function render(): void {
      c.clearRect(0, 0, width, height);

      // Substrat : trame de points façon carte électronique.
      const gap = 26;
      c.fillStyle = "rgba(146, 154, 165, 0.10)";
      for (let y = gap; y < height; y += gap) {
        for (let x = gap; x < width; x += gap) {
          c.fillRect(x, y, 1.4, 1.4);
        }
      }

      const count = Math.floor(progress * (seam.length - 1));

      // Pistes rompues : segments d'acier interrompus au niveau de la fêlure.
      c.strokeStyle = "rgba(146, 154, 165, 0.30)";
      c.lineWidth = 1;
      for (const tr of traces) {
        const cross = seam[tr.index];
        c.beginPath();
        c.moveTo(0, tr.y);
        c.lineTo(cross.x - 9, tr.y);
        c.moveTo(cross.x + 9, tr.y);
        c.lineTo(width, tr.y);
        c.stroke();
        c.fillStyle = "rgba(146, 154, 165, 0.45)";
        c.fillRect(3, tr.y - 2, 4, 4);
        c.fillRect(width - 7, tr.y - 2, 4, 4);
      }

      // La jointure d'or : halo puis cœur net.
      strokeSeam(count, 2.6, true);
      strokeSeam(count, 1.1, false);

      // Nœuds d'or : chaque piste franchie par la coulée est reconnectée.
      for (const tr of traces) {
        if (tr.index <= count) {
          const cross = seam[tr.index];
          c.save();
          c.shadowColor = "rgba(219, 138, 82, 0.9)";
          c.shadowBlur = 8;
          c.fillStyle = "#f2ba8b";
          c.beginPath();
          c.arc(cross.x, cross.y, 2.6, 0, Math.PI * 2);
          c.fill();
          c.restore();
        }
      }

      // Tête en fusion pendant le tracé.
      if (progress < 1 && count > 0 && count < seam.length - 1) {
        moltenDot(seam[count], 15);
      }

      // Une fois formée : un reflet en fusion parcourt lentement la jointure.
      if (progress >= 1 && !reduce) {
        const pos = Math.floor(shimmer * (seam.length - 1));
        moltenDot(seam[pos], 10);
      }
    }

    function loop(): void {
      if (progress < 1) progress = Math.min(1, progress + 0.012);
      else shimmer = (shimmer + 0.005) % 1;
      render();
      raf = requestAnimationFrame(loop);
    }

    build();
    if (reduce) {
      progress = 1;
      render();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(() => {
      build();
      if (reduce) render();
    });
    observer.observe(cv);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    />
  );
}
