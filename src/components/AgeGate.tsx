"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "amachi.ageVerified.v1";

export default function AgeGate() {
  const [verified, setVerified] = useState(true); // default true to avoid SSR flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVerified(window.localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  if (!mounted || verified) return null;

  const enter = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVerified(true);
  };

  const exit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink/95 backdrop-blur-md px-6">
      <div className="max-w-[480px] text-center">
        <p className="font-jp text-xs tracking-[6px] uppercase text-gold/70 mb-4">
          Age Verification
        </p>
        <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-light text-off-white leading-[1.05] mb-3">
          Enter <em className="italic text-gold-lt">Mt. Fuji Sake</em>
        </h1>
        <p className="text-[13px] tracking-[1px] text-off-white/60 mb-8 leading-[1.8]">
          You must be of legal drinking age in your country to enter this site.
          <br />
          日本では20歳以上の方のみご入場いただけます。
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={enter}
            className="px-8 py-3 bg-gold/90 hover:bg-gold text-ink text-[12px] tracking-[3px] uppercase font-normal transition-colors"
          >
            Enter
          </button>
          <button
            onClick={exit}
            className="px-8 py-3 border border-off-white/20 text-off-white/50 hover:text-off-white text-[12px] tracking-[3px] uppercase font-light transition-colors"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
