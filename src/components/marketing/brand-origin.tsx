import { Section, Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

// Pile de polices avec repli CJK pour le kanji (Geist ne couvre pas le japonais).
const CJK_STACK =
  '"Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic","Noto Sans JP","Noto Sans CJK JP","Source Han Sans JP",Meiryo,sans-serif';

/**
 * Section « origine du nom » : Kinto s'inspire du kintsugi (金継ぎ), l'art
 * japonais de réparer à l'or. Le fond sombre + l'accent cuivre rendent la
 * « jointure d'or » littérale — cohérent avec la marque.
 */
export function BrandOrigin() {
  return (
    <Section surface="ink" id="origine">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-accent-400">L&apos;origine du nom</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Kinto, comme kintsugi.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-white/70">
              <p>
                Le <strong className="font-semibold text-white">kintsugi</strong>{" "}
                <span className="whitespace-nowrap">(金継ぎ, « jointure d&apos;or »)</span>{" "}
                est l&apos;art japonais de réparer les céramiques brisées avec une
                laque saupoudrée d&apos;or. Loin de masquer la cassure, il la met en
                lumière : la réparation devient une part visible — et précieuse — de
                l&apos;histoire de l&apos;objet.
              </p>
              <p>
                Kinto applique cette philosophie à l&apos;électronique. Là où l&apos;on
                remplace trop vite, nous réparons, et nous l&apos;assumons : diagnostic
                expliqué, pièces identifiées, geste maîtrisé. La transparence n&apos;est
                pas un supplément — c&apos;est la valeur.
              </p>
              <p>
                Dans la pensée japonaise, un objet n&apos;est pas inerte : il a une
                histoire, presque une vie. Le réparer, c&apos;est l&apos;accompagner —
                savoir ce qu&apos;il contient, ce qu&apos;on peut y faire évoluer, ce
                qu&apos;on y gagne et ce qu&apos;on y perd, pour décider en connaissance
                de cause. Remettre l&apos;objet au centre plutôt que le remplacer
                d&apos;un geste, c&apos;est prolonger sa vie utile — la manière la plus
                concrète de faire de l&apos;économie circulaire.
              </p>
              <p className="text-white/90">
                <span className="font-medium text-white">Réparer</span>, c&apos;est
                prolonger. <span className="font-medium text-white">Transmettre</span>,
                c&apos;est multiplier.{" "}
                <span className="font-medium text-white">Élever le geste</span>, c&apos;est
                notre fil d&apos;or.
              </p>
            </div>

            {/* Décider en connaissance de cause : les trois temps de l'accompagnement. */}
            <ul className="mt-7 space-y-2.5 text-white/85">
              {[
                "Savoir ce qu'il y a dedans",
                "Peser les options : avantages, limites, coût",
                "Décider avec vous, pas à votre place",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rotate-45 rounded-[1px] bg-[image:var(--seam-gold)]"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-7 font-serif text-lg italic text-accent-300">
              {siteConfig.companionLine}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              {/* La « jointure d'or » : une fêlure cuivre traversant la carte. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 400"
                fill="none"
                className="absolute inset-0 h-full w-full text-accent-400"
              >
                <path
                  d="M150 0 L172 92 L138 150 L196 214 L164 286 L214 400"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                <path d="M172 92 L226 70 M196 214 L150 236 M164 286 L226 300"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <g fill="currentColor">
                  <circle cx="172" cy="92" r="3.5" />
                  <circle cx="138" cy="150" r="3" />
                  <circle cx="196" cy="214" r="3.5" />
                  <circle cx="164" cy="286" r="3" />
                </g>
              </svg>

              <div className="relative px-6 text-center">
                <p
                  lang="ja"
                  style={{ fontFamily: CJK_STACK }}
                  className="text-6xl leading-none text-accent-400 sm:text-7xl"
                >
                  金継ぎ
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.32em] text-white/55">
                  kin · tsugi
                </p>
                <p className="mt-1.5 text-sm text-white/60">« jointure d&apos;or »</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
