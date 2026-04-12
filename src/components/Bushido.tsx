"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";
import { bushidoDesigns } from "@/data/bushido-data";

export default function Bushido() {
  const ref = useReveal<HTMLElement>();
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [phase, setPhase] = useState<"show" | "crossfade">("show");
  const [hoveredDesign, setHoveredDesign] = useState<number | null>(null);

  const cycleImage = useCallback(() => {
    if (hoveredDesign !== null) return;
    setPhase("crossfade");
    let next: number;
    do {
      next = Math.floor(Math.random() * bushidoDesigns.length);
    } while (next === currentImage);
    setNextImage(next);

    setTimeout(() => {
      setCurrentImage(next);
      setPhase("show");
    }, 900);
  }, [currentImage, hoveredDesign]);

  useEffect(() => {
    const interval = setInterval(cycleImage, 5000);
    return () => clearInterval(interval);
  }, [cycleImage]);

  const activeDesign = hoveredDesign !== null ? hoveredDesign : currentImage;

  return (
    <section id="bushido" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Text */}
        <div className="bg-ink3 px-[clamp(32px,5vw,90px)] py-[clamp(56px,7vw,120px)] flex flex-col justify-center border-r border-gold/12 max-md:border-r-0 max-md:border-t max-md:border-gold/12 max-md:order-2">
          <span className="reveal inline-block text-[10px] tracking-[4px] uppercase text-crimson border border-crimson/50 px-3.5 py-1.5 mb-8 w-fit">
            The Bushido Edition
          </span>
          <p className="reveal text-[10px] tracking-[5px] uppercase text-gold font-normal mb-[18px]">
            300ml · 7 Designs
          </p>
          <div className="reveal d1 w-[52px] h-px bg-gold mb-9" />
          <h2 className="reveal d1 font-serif text-[clamp(32px,4.5vw,60px)] font-light leading-[1.05] mb-7">
            The Spirit of<br />the <em className="italic text-gold-lt">Samurai</em><br />in every sip
          </h2>
          <p className="reveal d2 text-[clamp(15px,2vw,17px)] leading-[1.85] text-off-white/72 max-w-[540px]">
            Seven distinct expressions of Bushido — each bottle a different warrior archetype,
            a different chapter of Japan&apos;s timeless code of honor.
            From the White Peak to the Black Snow, each design encapsulates a virtue.
          </p>

          {/* Design Grid */}
          <div className="reveal d3 grid grid-cols-4 gap-3 mt-10 border-t border-gold/15 pt-9">
            {bushidoDesigns.map((d, i) => (
              <Link
                href={`/bushido/${d.slug}`}
                key={d.letter}
                className="text-center group no-underline"
                onMouseEnter={() => setHoveredDesign(i)}
                onMouseLeave={() => setHoveredDesign(null)}
              >
                <div className="relative w-11 h-14 mx-auto mb-2 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    className="object-contain scale-[1.3] group-hover:scale-[1.5] transition-transform duration-500 drop-shadow-[0_2px_8px_rgba(201,168,76,0.2)]"
                    sizes="44px"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-0.5">
                    <span className="font-serif text-[11px] font-light text-gold/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {d.letter}
                    </span>
                  </div>
                </div>
                <div className="text-[9px] tracking-[2px] uppercase text-off-white/40 leading-[1.5] group-hover:text-gold transition-colors duration-300">
                  {d.name.replace("\n", " ")}
                </div>
              </Link>
            ))}
            <div className="flex items-center justify-center">
              <div className="text-[10px] text-gold whitespace-pre-line text-center font-jp">
                武士道<br />Complete
              </div>
            </div>
          </div>
        </div>

        {/* Opus One style — cinematic bottle showcase */}
        <div className="relative overflow-hidden min-h-[clamp(360px,55vw,800px)] max-md:order-1 bg-ink">
          {/* Spotlight from above */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[65%] bg-[conic-gradient(from_180deg,transparent_35%,rgba(201,168,76,0.03)_45%,rgba(248,245,238,0.05)_50%,rgba(201,168,76,0.03)_55%,transparent_65%)]" />

          {/* Current bottle — crossfade A */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1.2s] ease-in-out ${
              phase === "crossfade" ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="opus-float relative w-[85%] max-w-[440px] aspect-[3/5]">
              <Image
                src={bushidoDesigns[currentImage].image}
                alt={bushidoDesigns[currentImage].name}
                fill
                className="object-contain opus-shadow"
                sizes="(max-width: 768px) 85vw, 42vw"
                priority
              />
            </div>
          </div>

          {/* Next bottle — crossfade B */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1.2s] ease-in-out ${
              phase === "crossfade" ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="opus-float relative w-[85%] max-w-[440px] aspect-[3/5]">
              <Image
                src={bushidoDesigns[nextImage].image}
                alt={bushidoDesigns[nextImage].name}
                fill
                className="object-contain opus-shadow"
                sizes="(max-width: 768px) 85vw, 42vw"
              />
            </div>
          </div>

          {/* Hovered bottle */}
          {hoveredDesign !== null && (
            <div className="absolute inset-0 flex items-center justify-center z-10 animate-[bottleReveal_0.6s_ease-out_both]">
              <div className="opus-float relative w-[85%] max-w-[440px] aspect-[3/5]">
                <Image
                  src={bushidoDesigns[hoveredDesign].image}
                  alt={bushidoDesigns[hoveredDesign].name}
                  fill
                  className="object-contain opus-shadow"
                  sizes="(max-width: 768px) 85vw, 42vw"
                />
              </div>
            </div>
          )}

          {/* Floor reflection */}
          <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[50%] h-[15%] pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.08)_0%,rgba(201,168,76,0.03)_40%,transparent_70%)] blur-[6px] bottle-glow" />
          </div>

          {/* Design info — minimal */}
          <div className={`absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-all duration-700 ${
            phase === "crossfade" && hoveredDesign === null ? "opacity-0" : "opacity-100"
          }`}>
            <p className="text-[9px] tracking-[4px] uppercase text-gold/50 mb-1">
              Design {bushidoDesigns[activeDesign].letter} · {bushidoDesigns[activeDesign].virtue}
            </p>
            <h3 className="font-serif text-xl font-light text-off-white/80 mb-0.5">
              {bushidoDesigns[activeDesign].name.replace("\n", " ")}
            </h3>
            <p className="text-[11px] text-off-white/30 font-jp">
              {bushidoDesigns[activeDesign].virtueJp}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
