import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Placeholder mock orders — to be replaced with Shopify Customer API
const mockOrders = [
  {
    id: "MFS-2026-001",
    date: "2026-04-15",
    total: "¥48,000",
    status: "Shipped",
    items: 2,
  },
  {
    id: "MFS-2026-002",
    date: "2026-04-22",
    total: "¥12,000",
    status: "Processing",
    items: 1,
  },
];

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ink min-h-screen pt-32 pb-24">
        <div className="max-w-[1100px] mx-auto px-[clamp(24px,5vw,60px)]">
          <p className="text-[12px] tracking-[5px] uppercase text-gold/65 mb-3">Account</p>
          <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-light text-off-white mb-12">
            My <em className="italic text-gold-lt">Cellar</em>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
            {/* Sidebar */}
            <nav className="border-t border-gold/15 lg:border-t-0 lg:border-r lg:border-gold/15 lg:pr-8 pt-8 lg:pt-0">
              <ul className="space-y-1">
                {[
                  { label: "Orders", active: true },
                  { label: "Profile" },
                  { label: "Addresses" },
                  { label: "Wishlist" },
                  { label: "Sign Out" },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      className={`w-full text-left px-4 py-3 text-[12px] tracking-[3px] uppercase transition-colors ${
                        item.active
                          ? "text-gold border-l-2 border-gold bg-gold/5"
                          : "text-off-white/55 hover:text-gold hover:bg-gold/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Orders list */}
            <section>
              <p className="text-[11px] tracking-[4px] uppercase text-gold/65 mb-5">
                Recent Orders
              </p>
              <ul className="border-t border-gold/15">
                {mockOrders.map((order) => (
                  <li
                    key={order.id}
                    className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-4 py-6 border-b border-gold/10 items-center text-[13px]"
                  >
                    <span className="font-mono text-gold/80">{order.id}</span>
                    <span className="text-off-white/55">{order.date}</span>
                    <span className="text-off-white/70">
                      {order.items} item{order.items > 1 ? "s" : ""}
                    </span>
                    <span className="text-off-white">{order.total}</span>
                    <span
                      className={`text-[10px] tracking-[2px] uppercase px-3 py-1 ${
                        order.status === "Shipped"
                          ? "border border-gold/40 text-gold"
                          : "border border-off-white/20 text-off-white/55"
                      }`}
                    >
                      {order.status}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/collection"
                className="inline-block mt-10 px-8 py-3 border border-gold/40 text-gold text-[12px] tracking-[3px] uppercase no-underline hover:bg-gold/10 transition-colors"
              >
                Order Again
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
