"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { bushidoDesigns } from "@/data/bushido-data";
import { notFound } from "next/navigation";

export default function BushidoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const design = bushidoDesigns.find((d) => d.slug === slug);
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  if (!design) {
    notFound();
  }

  const currentIndex = bushidoDesigns.findIndex((d) => d.slug === slug);
  const prevDesign =
    bushidoDesigns[
      (currentIndex - 1 + bushidoDesigns.length) % bushidoDesigns.length
    ];
  const nextDesign =
    bushidoDesigns[(currentIndex + 1) % bushidoDesigns.length];

  return (
    <main ref={sectionRef} className="bg-ink min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 bg-ink/80 backdrop-blur-[16px] border-b border-gold/8">
        <Link
          href="/#bushido"
          className="font-serif text-xs tracking-[5px] uppercase text-gold no-underline hover:text-gold-lt transition-colors"
        >
          Amachi Hoshisora
        </Link>
        <div className="flex gap-8 items-center">
          <Link
            href={`/bushido/${prevDesign.slug}`}
            className="text-[10px] tracking-[3px] uppercase text-off-white/40 no-underline hover:text-gold transition-colors"
          >
            ← {prevDesign.letter}
          </Link>
          <span className="text-[10px] tracking-[3px] uppercase text-gold/80">
            Design {design.letter}
          </span>
          <Link
            href={`/bushido/${nextDesign.slug}`}
            className="text-[10px] tracking-[3px] uppercase text-off-white/40 no-underline hover:text-gold transition-colors"
          >
            {nextDesign.letter} →
          </Link>
        </div>
      </nav>

      {/* ===== HERO — Opus One style cinematic bottle reveal ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Pitch black base with subtle radial spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_35%_55%,rgba(30,26,20,1)_0%,rgba(14,12,10,1)_70%)]" />

        {/* Background kanji — very subtle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-jp text-[clamp(220px,42vw,550px)] font-extralight text-off-white kanji-breathe">
            {design.virtueJp}
          </span>
        </div>

        {/* Content grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 w-full min-h-screen">

          {/* LEFT — Cinematic bottle presentation */}
          <div className="relative flex items-center justify-center min-h-[80vh] lg:min-h-screen max-lg:order-1">

            {/* Spotlight cone from above */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[45%] h-[70%] transition-opacity duration-[3s] delay-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}>
              <div className="w-full h-full bg-[conic-gradient(from_180deg,transparent_35%,rgba(201,168,76,0.04)_45%,rgba(248,245,238,0.06)_50%,rgba(201,168,76,0.04)_55%,transparent_65%)]" />
            </div>

            {/* Floor reflection pool */}
            <div className={`absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[55%] h-[18%] rounded-full transition-all duration-[2.5s] delay-700 ${
              loaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-50"
            }`}>
              <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.10)_0%,rgba(201,168,76,0.04)_40%,transparent_70%)] blur-[8px]" />
            </div>

            {/* The bottle — emerges from darkness */}
            <div className={`opus-float relative transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
              loaded
                ? "opacity-100 translate-y-0 scale-100 duration-[2s] delay-200"
                : "opacity-0 translate-y-16 scale-[0.92] duration-[0s]"
            }`}
              style={{ width: "clamp(280px,48vw,520px)", aspectRatio: "3/5" }}
            >
              <Image
                src={design.image}
                alt={design.name}
                fill
                priority
                className="object-contain opus-shadow"
                sizes="(max-width: 1024px) 85vw, 48vw"
              />
            </div>

            {/* Warm rim light — left edge */}
            <div className={`absolute left-[15%] top-[20%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-gold/15 to-transparent transition-opacity duration-[3s] delay-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`} />

            {/* Cool rim light — right edge */}
            <div className={`absolute right-[18%] top-[25%] w-[1px] h-[35%] bg-gradient-to-b from-transparent via-off-white/8 to-transparent transition-opacity duration-[3s] delay-1200 ${
              loaded ? "opacity-100" : "opacity-0"
            }`} />

            {/* Bottom info — fades in late */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-center transition-all duration-[1.5s] delay-[2s] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <p className="text-[9px] tracking-[5px] uppercase text-gold/40">
                {design.bottle} · {design.capSeal} Seal
              </p>
            </div>
          </div>

          {/* RIGHT — Text content */}
          <div className="flex flex-col justify-center px-[clamp(40px,6vw,100px)] py-[clamp(60px,5vw,100px)] lg:pr-[clamp(60px,8vw,140px)] max-lg:order-2">

            <div className="reveal">
              <p className="text-[10px] tracking-[5px] uppercase text-crimson/80 mb-8">
                The Bushido Edition
              </p>
            </div>

            <div className="reveal d1">
              <p className="text-[10px] tracking-[6px] uppercase text-gold/60 font-normal mb-3">
                Design {design.letter} · 300ml
              </p>
            </div>

            <h1 className="reveal d1 font-serif text-[clamp(40px,5.5vw,80px)] font-light leading-[1.02] mb-5 tracking-[-0.02em]">
              {design.name.split("\n").map((line, i) => (
                <span key={i}>
                  {i === 0 ? line : <><br />{line}</>}
                </span>
              ))}
            </h1>

            <div className="reveal d1 w-[40px] h-px bg-gold/40 mb-8" />

            <p className="reveal d2 font-serif text-[clamp(17px,2.2vw,24px)] italic text-gold-lt/60 mb-10 leading-[1.6]">
              &ldquo;{design.subtitle}&rdquo;
            </p>

            <div className="reveal d2 flex items-center gap-5 mb-12">
              <span className="font-jp text-[clamp(36px,4vw,52px)] font-extralight text-gold/70">
                {design.virtueJp}
              </span>
              <div className="h-10 w-px bg-gold/15" />
              <div>
                <p className="text-[9px] tracking-[4px] uppercase text-off-white/30 mb-1">
                  Bushido Virtue
                </p>
                <p className="font-serif text-[clamp(16px,1.8vw,20px)] italic text-off-white/70">
                  {design.virtue}
                </p>
              </div>
            </div>

            {/* Tasting Note */}
            <div className="reveal d3 border-t border-gold/10 pt-8 mb-12">
              <p className="text-[9px] tracking-[4px] uppercase text-gold/40 mb-3">
                Tasting Notes
              </p>
              <p className="font-serif text-[clamp(15px,1.6vw,18px)] italic text-off-white/55 leading-[1.8]">
                {design.tastingNote}
              </p>
            </div>

            {/* Specs row */}
            <div className="reveal d3 flex gap-10 text-off-white/40">
              {[
                ["Volume", "300ml"],
                ["Cap Seal", design.capSeal],
                ["Class", "純米大吟醸"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[8px] tracking-[3px] uppercase text-off-white/25 mb-1">
                    {label}
                  </p>
                  <p className="font-serif text-[13px] text-off-white/60">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-[25%] flex flex-col items-center gap-2 transition-all duration-[1.5s] delay-[2.5s] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}>
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-gold/30 animate-scroll-pulse" />
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="border-t border-gold/6">
        <div className="max-w-[1100px] mx-auto px-[clamp(32px,5vw,80px)] py-[clamp(80px,10vw,140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(48px,7vw,120px)]">
            {/* English */}
            <div>
              <p className="reveal text-[9px] tracking-[5px] uppercase text-gold/50 font-normal mb-6">
                The Story
              </p>
              <div className="reveal d1 w-[32px] h-px bg-gold/30 mb-10" />
              {design.descriptionEn.map((p, i) => (
                <p
                  key={i}
                  className={`reveal ${i > 0 ? "d1" : ""} text-[clamp(15px,1.7vw,17px)] leading-[2.1] text-off-white/55 mb-7 font-serif`}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Japanese */}
            <div className="lg:border-l lg:border-gold/8 lg:pl-[clamp(36px,5vw,72px)]">
              <p className="reveal text-[9px] tracking-[5px] uppercase text-gold/50 font-normal mb-6 font-jp">
                物語
              </p>
              <div className="reveal d1 w-[32px] h-px bg-gold/30 mb-10" />
              {design.descriptionJp.map((p, i) => (
                <p
                  key={i}
                  className={`reveal ${i > 0 ? "d1" : ""} text-[clamp(14px,1.5vw,16px)] leading-[2.3] text-off-white/45 mb-7 font-jp font-extralight`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== COLLECTION NAV ===== */}
      <section className="border-t border-gold/6">
        <div className="max-w-[1240px] mx-auto px-[clamp(24px,5vw,60px)] py-[clamp(56px,7vw,90px)]">
          <p className="reveal text-[9px] tracking-[5px] uppercase text-gold/40 font-normal mb-10 text-center">
            Explore the Collection
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-5">
            {bushidoDesigns.map((d) => (
              <Link
                href={`/bushido/${d.slug}`}
                key={d.letter}
                className={`reveal group no-underline block transition-all duration-500 ${
                  d.slug === slug
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-90"
                }`}
              >
                <div className="relative aspect-[3/5] overflow-hidden mb-2">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    className={`object-contain transition-all duration-700 ${
                      d.slug === slug
                        ? "scale-100 opus-shadow"
                        : "scale-[0.8] group-hover:scale-[0.95]"
                    }`}
                    sizes="120px"
                  />
                  {d.slug === slug && (
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gold/50" />
                  )}
                </div>
                <p
                  className={`text-[7px] tracking-[2px] uppercase text-center ${
                    d.slug === slug
                      ? "text-gold/70"
                      : "text-off-white/25 group-hover:text-off-white/50"
                  } transition-colors duration-500`}
                >
                  {d.letter} · {d.name.replace("\n", " ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PREV / NEXT ===== */}
      <section className="border-t border-gold/6">
        <div className="grid grid-cols-2">
          <Link
            href={`/bushido/${prevDesign.slug}`}
            className="group no-underline relative overflow-hidden py-20 px-[clamp(32px,5vw,72px)] border-r border-gold/6 hover:bg-ink3/30 transition-colors duration-700"
          >
            <p className="text-[9px] tracking-[3px] uppercase text-off-white/25 mb-3">
              ← Previous
            </p>
            <p className="font-serif text-[clamp(22px,3.5vw,36px)] font-light text-off-white/50 group-hover:text-gold/80 transition-colors duration-500">
              {prevDesign.name.replace("\n", " ")}
            </p>
            <p className="text-[11px] text-off-white/20 mt-2 font-jp">
              Design {prevDesign.letter} · {prevDesign.virtueJp}
            </p>
          </Link>
          <Link
            href={`/bushido/${nextDesign.slug}`}
            className="group no-underline relative overflow-hidden py-20 px-[clamp(32px,5vw,72px)] text-right hover:bg-ink3/30 transition-colors duration-700"
          >
            <p className="text-[9px] tracking-[3px] uppercase text-off-white/25 mb-3">
              Next →
            </p>
            <p className="font-serif text-[clamp(22px,3.5vw,36px)] font-light text-off-white/50 group-hover:text-gold/80 transition-colors duration-500">
              {nextDesign.name.replace("\n", " ")}
            </p>
            <p className="text-[11px] text-off-white/20 mt-2 font-jp">
              Design {nextDesign.letter} · {nextDesign.virtueJp}
            </p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/6 py-12 text-center">
        <Link
          href="/#bushido"
          className="text-[9px] tracking-[4px] uppercase text-off-white/30 no-underline hover:text-gold/60 transition-colors"
        >
          ← Back to Full Collection
        </Link>
        <p className="text-[9px] text-off-white/15 mt-5 tracking-[3px]">
          AMACHI HOSHISORA · Mt. Fuji Sake Project
        </p>
      </footer>
    </main>
  );
}
