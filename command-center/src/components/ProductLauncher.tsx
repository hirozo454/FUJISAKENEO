import {
  Wine,
  Mail,
  Calendar,
  Sparkles,
  BarChart3,
  Palette,
  Zap,
  Users,
  Plus,
  ArrowUpRight,
  Play,
  type LucideIcon,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import type { Product, ProductStatus } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  wine: Wine,
  mail: Mail,
  'calendar-sync': Calendar,
  sparkles: Sparkles,
  'bar-chart': BarChart3,
  palette: Palette,
  zap: Zap,
  users: Users,
};

const statusBadge: Record<ProductStatus, { label: string; className: string; dot: string }> = {
  active: {
    label: '稼働中',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  development: {
    label: '開発中',
    className: 'bg-accent/15 text-accent border-accent/20',
    dot: 'bg-accent',
  },
  planned: {
    label: '計画中',
    className: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
    dot: 'bg-sky-400',
  },
  paused: {
    label: '保留',
    className: 'bg-ink-500/15 text-ink-300 border-ink-500/20',
    dot: 'bg-ink-400',
  },
};

function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const Icon = iconMap[product.icon] ?? Wine;
  const badge = statusBadge[product.status];

  return (
    <button
      onClick={onOpen}
      className="group relative text-left rounded-2xl border border-white/5 bg-white/[0.03]
                 hover:bg-white/[0.06] hover:border-white/10 transition-all p-5 overflow-hidden
                 hover:-translate-y-0.5 hover:shadow-2xl"
    >
      {/* Gradient header */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient}`}
      />

      {/* Status pill */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} shadow-lg`}
        >
          <Icon size={22} className="text-white" />
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full border ${badge.className}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot} animate-pulse`} />
          {badge.label}
        </span>
      </div>

      <h3 className="text-base font-semibold text-ink-100 mb-1 flex items-center gap-1.5">
        {product.name}
        <ArrowUpRight
          size={14}
          className="text-ink-500 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </h3>
      <p className="text-xs text-ink-400 leading-relaxed mb-4 line-clamp-2 min-h-[2.2em]">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        {product.stat && (
          <div className="text-xs">
            <span className="text-ink-400">{product.stat.label}</span>
            <span className="ml-2 text-ink-100 font-semibold tabular-nums">
              {product.stat.value}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1 text-[11px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={10} fill="currentColor" />
          開く
        </div>
      </div>
    </button>
  );
}

function AddProductCard({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      onClick={onAdd}
      className="group rounded-2xl border-2 border-dashed border-white/10 hover:border-accent/40
                 hover:bg-accent/5 transition-all p-5 flex flex-col items-center justify-center
                 min-h-[220px] text-ink-400 hover:text-accent"
    >
      <div className="w-12 h-12 rounded-xl border-2 border-dashed border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <Plus size={22} />
      </div>
      <div className="text-sm font-semibold">プロダクトを追加</div>
      <div className="text-xs mt-1 opacity-70">新しいツール・サービス</div>
    </button>
  );
}

export function ProductLauncher() {
  const { products, setSelectedNode, addProduct } = useStore();

  const handleOpen = (p: Product) => {
    setSelectedNode(`product:${p.id}`, 'product', p.id);
    if (p.url) {
      // In Electron the main process handles external URLs via shell.openExternal.
      window.open(p.url, '_blank');
    }
  };

  const handleAdd = () => {
    const name = prompt('プロダクト名を入力:');
    if (!name) return;
    const description = prompt('簡単な説明:') || '';
    addProduct({
      id: `custom-${Date.now()}`,
      name,
      description,
      status: 'planned',
      gradient: 'from-slate-500 to-zinc-700',
      icon: 'wine',
      category: 'ops',
    });
  };

  const counts = products.reduce<Record<ProductStatus, number>>(
    (acc, p) => ({ ...acc, [p.status]: (acc[p.status] ?? 0) + 1 }),
    { active: 0, development: 0, planned: 0, paused: 0 },
  );

  return (
    <section className="h-full flex flex-col overflow-hidden">
      {/* Hero header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4">
        <div className="flex items-end justify-between mb-1">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-accent mb-1">
              Command Center
            </div>
            <h1 className="text-3xl font-bold text-ink-100 tracking-tight">
              プロダクト ハブ
            </h1>
            <p className="text-sm text-ink-400 mt-1">
              すべてのツールをここから起動・管理
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-ink-300">稼働 {counts.active}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-ink-300">開発 {counts.development}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-ink-300">計画 {counts.planned}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={() => handleOpen(p)} />
          ))}
          <AddProductCard onAdd={handleAdd} />
        </div>
      </div>
    </section>
  );
}
