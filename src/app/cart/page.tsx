"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, formatMoney } from "@/lib/cart";

export default function CartPage() {
  const { items, setQuantity, remove, subtotal } = useCart();
  const empty = items.length === 0;

  return (
    <>
      <Navbar />
      <main className="bg-ink min-h-screen pt-32 pb-24">
        <div className="max-w-[1100px] mx-auto px-[clamp(24px,5vw,60px)]">
          <p className="text-[12px] tracking-[5px] uppercase text-gold/65 mb-3">Cart</p>
          <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-light text-off-white mb-12">
            Your <em className="italic text-gold-lt">Selection</em>
          </h1>

          {empty ? (
            <div className="border-t border-gold/15 py-24 text-center">
              <p className="text-[15px] text-off-white/60 mb-6">
                Your cart is empty.
              </p>
              <Link
                href="/collection"
                className="inline-block px-8 py-3 border border-gold/40 text-gold text-[12px] tracking-[3px] uppercase hover:bg-gold/10 transition-colors no-underline"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
              {/* Items */}
              <ul className="border-t border-gold/15">
                {items.map((item) => (
                  <li
                    key={item.variantId}
                    className="grid grid-cols-[120px_1fr_auto] gap-6 py-8 border-b border-gold/10 items-center"
                  >
                    <div className="relative aspect-[3/5] bg-ink2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="120px"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-[20px] text-off-white mb-1">
                        {item.title}
                      </p>
                      {item.variantTitle && (
                        <p className="text-[12px] tracking-[2px] uppercase text-off-white/45 mb-3">
                          {item.variantTitle}
                        </p>
                      )}
                      <p className="text-[14px] text-gold/80 mb-4">
                        {formatMoney(item.price)}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gold/20">
                          <button
                            onClick={() =>
                              setQuantity(item.variantId, item.quantity - 1)
                            }
                            className="px-3 py-1 text-off-white/60 hover:text-gold"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 text-off-white text-[13px] min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              setQuantity(item.variantId, item.quantity + 1)
                            }
                            className="px-3 py-1 text-off-white/60 hover:text-gold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remove(item.variantId)}
                          className="text-[11px] tracking-[2px] uppercase text-off-white/40 hover:text-gold transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="font-serif text-[18px] text-off-white">
                      {formatMoney({
                        amount: item.price.amount * item.quantity,
                        currencyCode: item.price.currencyCode,
                      })}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Summary */}
              <aside className="border border-gold/15 p-8 bg-ink2/50 h-fit lg:sticky lg:top-32">
                <p className="text-[12px] tracking-[4px] uppercase text-gold/65 mb-5">
                  Order Summary
                </p>
                <div className="flex justify-between text-[14px] text-off-white/70 py-3 border-b border-gold/10">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-off-white/70 py-3 border-b border-gold/10">
                  <span>Shipping</span>
                  <span className="text-off-white/40">Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-serif text-[20px] text-off-white py-4">
                  <span>Total</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="block mt-4 py-4 bg-gold/90 hover:bg-gold text-center text-ink text-[12px] tracking-[4px] uppercase no-underline transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/collection"
                  className="block mt-3 py-3 border border-gold/30 text-center text-gold text-[11px] tracking-[3px] uppercase no-underline hover:bg-gold/5 transition-colors"
                >
                  Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
