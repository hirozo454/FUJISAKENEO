import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderId from "./OrderId";

export default function OrderCompletePage() {
  return (
    <>
      <Navbar />
      <main className="bg-ink min-h-screen pt-32 pb-24 flex items-center">
        <div className="max-w-[640px] mx-auto px-[clamp(24px,5vw,60px)] text-center">
          <p className="text-[12px] tracking-[5px] uppercase text-gold/65 mb-4">
            Order Confirmed
          </p>
          <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-light text-off-white leading-[1.05] mb-6">
            Thank <em className="italic text-gold-lt">You</em>
          </h1>
          <div className="mx-auto h-px w-[48px] bg-gold/40 mb-8" />
          <p className="text-[15px] text-off-white/65 leading-[1.9] mb-3">
            Your order has been received. A confirmation email is on its way.
          </p>
          <p className="text-[13px] text-off-white/45 mb-10">
            Order ID:{" "}
            <Suspense fallback={<span className="text-off-white/30">…</span>}>
              <OrderId />
            </Suspense>
          </p>
          <p className="font-jp text-[14px] text-off-white/55 leading-[2] mb-12">
            ご注文ありがとうございました。
            <br />
            富士の麓から、心を込めてお届けいたします。
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-3 border border-gold/40 text-gold text-[12px] tracking-[3px] uppercase no-underline hover:bg-gold/10 transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/account"
              className="px-8 py-3 bg-gold/90 hover:bg-gold text-ink text-[12px] tracking-[3px] uppercase no-underline transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
