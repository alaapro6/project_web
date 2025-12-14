import { useEffect, useState } from 'react';
import { Search, Filter, Store, Tag, DollarSign } from 'lucide-react';
import { getCategories, getStores } from '../../lib/api';

interface Props {
  onSearch: (filters: {
    name?: string;
    category?: string;
    store_id?: number;
    min_budget?: number;
    max_budget?: number;
  }) => void;
  loading: boolean;
}

export default function ManualSearchForm({ onSearch, loading }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [storeId, setStoreId] = useState<number | ''>('');
  const [minBudget, setMinBudget] = useState<number | ''>('');
  const [maxBudget, setMaxBudget] = useState<number | ''>('');

  const [categories, setCategories] = useState<string[]>([]);
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    getStores().then(setStores).catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      name: name || undefined,
      category: category || undefined,
      store_id: storeId || undefined,
      min_budget: minBudget || undefined,
      max_budget: maxBudget || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative
        backdrop-blur-2xl
        bg-white/70
        border border-white/30
        rounded-3xl
        p-8
        space-y-6
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        animate-fade-in
      "
    >
      {/* ===== Header ===== */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-3">
          <Filter className="w-4 h-4" />
          بحث يدوي ذكي
        </div>
        <p className="text-sm text-muted-foreground">
          ابحث عن الهدية حسب الاسم، الفئة، المتجر أو الميزانية
        </p>
      </div>

      {/* ===== اسم الهدية ===== */}
      <Field label="اسم الهدية" icon={<Search className="w-4 h-4" />}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="مثال: ساعة، سماعة، لعبة"
          className="glass-input"
        />
      </Field>

      {/* ===== الفئة ===== */}
      <Field label="الفئة" icon={<Tag className="w-4 h-4" />}>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="glass-input"
        >
          <option value="">كل الفئات</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </Field>

      {/* ===== المتجر ===== */}
      <Field label="المتجر" icon={<Store className="w-4 h-4" />}>
        <select
          value={storeId}
          onChange={e => setStoreId(Number(e.target.value))}
          className="glass-input"
        >
          <option value="">كل المتاجر</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>
              {store.name_ar}
            </option>
          ))}
        </select>
      </Field>

      {/* ===== الميزانية ===== */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="من" icon={<DollarSign className="w-4 h-4" />}>
          <input
            type="number"
            value={minBudget}
            onChange={e => setMinBudget(Number(e.target.value))}
            className="glass-input"
          />
        </Field>

        <Field label="إلى" icon={<DollarSign className="w-4 h-4" />}>
          <input
            type="number"
            value={maxBudget}
            onChange={e => setMaxBudget(Number(e.target.value))}
            className="glass-input"
          />
        </Field>
      </div>

      {/* ===== زر البحث ===== */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          flex items-center justify-center gap-2
          bg-gradient-to-r from-primary to-secondary
          text-white
          py-4
          rounded-2xl
          font-bold
          text-lg
          shadow-lg
          hover:scale-[1.02]
          transition-all
          disabled:opacity-60
        "
      >
        <Search className="w-5 h-5" />
        {loading ? 'جاري البحث...' : 'بحث ذكي'}
      </button>

      {/* ===== Styles ===== */}
      <style jsx="true">{`
        .glass-input {
          width: 100%;
          padding: 0.9rem 1.1rem;
          border-radius: 1.2rem;
          border: 1px solid rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          transition: all 0.25s ease;
        }
        .glass-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.25);
          background: #fff;
        }
      `}</style>
    </form>
  );
}

/* ================= Sub Component ================= */

const Field = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
      {icon}
      {label}
    </label>
    {children}
  </div>
);
