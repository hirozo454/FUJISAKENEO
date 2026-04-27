"use client";

import { useSearchParams } from "next/navigation";

export default function OrderId() {
  const params = useSearchParams();
  const id = params.get("id") ?? "—";
  return <span className="font-mono text-gold/70 tracking-wider">{id}</span>;
}
