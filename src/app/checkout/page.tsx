"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, formatMoney } from "@/lib/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: replace with Shopify cart create + checkoutUrl redirect
    setTimeout(() => {
      const orderId = `MFS-${Date.now().toString(36).toUpperCase()}`;
      clear();
      router.push(`/order/complete?id=${orderId}`);
    }, 600);
  };

  return (
    <>
      <Navbar />
      <main className="bg-ink min-h-screen pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-[clamp(24px,5vw,60px)]">
          <p className="text-[12px] tracking-[5px] uppercase text-gold/65 mb-3">Checkout</p>
          <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-light text-off-white mb-12">
            Secure <em className="italic text-gold-lt">Order</em>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16">
            <form onSubmit={onSubmit} className="space-y-12">
              <Section title="Contact">
                <Input label="Email" type="email" name="email" required autoComplete="email" />
                <Input label="Phone" type="tel" name="phone" autoComplete="tel" />
              </Section>

              <Section title="Shipping Address">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" name="firstName" required autoComplete="given-name" />
                  <Input label="Last Name" name="lastName" required autoComplete="family-name" />
                </div>
                <Input label="Address" name="address1" required autoComplete="address-line1" />
                <Input label="Apartment / Suite" name="address2" autoComplete="address-line2" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" name="city" required autoComplete="address-level2" />
                  <Input label="Postal Code" name="postalCode" required autoComplete="postal-code" />
                </div>
                <Input label="Country" name="country" defaultValue="Japan" required autoComplete="country-name" />
              </Section>

              <Section title="Payment">
                <p className="text-[12px] text-off-white/45 mb-4">
                  Payment will be processed securely via Shopify Checkout.
                </p>
                <div className="border border-gold/20 p-5 text-[13px] text-off-white/55 italic">
                  Card details collected on next step (placeholder)
                </div>
              </Section>

              <label className="flex items-start gap-3 text-[12px] text-off-white/55 leading-[1.7]">
                <input type="checkbox" required className="mt-1 accent-gold" />
                <span>
                  I confirm I am of legal drinking age and have read the
                  <a href="#" className="text-gold/80 underline-offset-4 hover:underline ml-1">terms of sale</a>.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="w-full py-5 bg-gold/90 hover:bg-gold disabled:bg-gold/30 disabled:cursor-not-allowed text-ink text-[13px] tracking-[5px] uppercase transition-colors"
              >
                {submitting ? "Processing…" : "Place Order"}
              </button>
            </form>

            {/* Summary */}
            <aside className="border border-gold/15 p-8 bg-ink2/50 h-fit lg:sticky lg:top-32">
              <p className="text-[12px] tracking-[4px] uppercase text-gold/65 mb-5">Order</p>
              {items.length === 0 ? (
                <p className="text-[14px] text-off-white/55">Cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-4 mb-6">
                    {items.map((i) => (
                      <li key={i.variantId} className="flex justify-between text-[13px] text-off-white/75">
                        <span>
                          {i.title}
                          <span className="text-off-white/40"> × {i.quantity}</span>
                        </span>
                        <span>
                          {formatMoney({
                            amount: i.price.amount * i.quantity,
                            currencyCode: i.price.currencyCode,
                          })}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between text-[13px] text-off-white/60 py-3 border-t border-gold/10">
                    <span>Subtotal</span>
                    <span>{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-off-white/60 py-3 border-t border-gold/10">
                    <span>Shipping</span>
                    <span className="text-off-white/40">Calculated</span>
                  </div>
                  <div className="flex justify-between font-serif text-[20px] text-off-white py-4 border-t border-gold/15">
                    <span>Total</span>
                    <span>{formatMoney(subtotal)}</span>
                  </div>
                </>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-[11px] tracking-[4px] uppercase text-gold/65 mb-5 pb-3 border-b border-gold/10">
        {title}
      </p>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Input({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[3px] uppercase text-off-white/45 mb-1.5">
        {label}
      </span>
      <input
        {...rest}
        className="w-full bg-transparent border border-gold/15 focus:border-gold/60 px-4 py-3 text-[14px] text-off-white outline-none transition-colors"
      />
    </label>
  );
}
