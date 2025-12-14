import { useEffect, useState } from 'react';
import {
  Gift as GiftIcon,
  Trash2,
  Plus,
  ArrowLeft,
  Pencil,
  Image as ImageIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  getAdminGifts,
  deleteGift,
  getAdminStores,
  createGift,
  updateGift,
  getCategories,
} from '../lib/api';

export default function AdminGifts() {
  const [gifts, setGifts] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const emptyForm = {
    name_ar: '',
    name_en: '',
    store_id: '',
    category: '',
    min_age: 0,
    max_age: 99,
    min_budget: 0,
    max_budget: 0,
    image_url: '',
  };

  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [giftsData, storesData, categoriesData] = await Promise.all([
        getAdminGifts(),
        getAdminStores(),
        getCategories(),
      ]);
      setGifts(giftsData);
      setStores(storesData);
      setCategories(categoriesData);
    } catch (e) {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image_url: reader.result });
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (gift: any) => {
    setForm({
      ...gift,
      store_id: gift.store_id.toString(),
    });
    setEditingId(gift.id);
    setShowForm(true);
    setImagePreview(gift.image_url || null);
    setImageMode(gift.image_url?.startsWith('data:') ? 'upload' : 'url');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف الهدية؟')) return;
    await deleteGift(id);
    loadData();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...form,
      store_id: Number(form.store_id),
    };

    if (editingId) {
      await updateGift(editingId, payload);
    } else {
      await createGift(payload);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setImagePreview(null);
    setImageMode('url');
    loadData();
  };

  if (loading) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-muted p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft />
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GiftIcon /> إدارة الهدايا
          </h1>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setImagePreview(null);
            setImageMode('url');
            setShowForm(!showForm);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus /> إضافة هدية
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-card p-6 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Field label="اسم الهدية (عربي)">
            <input className="input" value={form.name_ar}
              onChange={(e) => setForm({ ...form, name_ar: e.target.value })} />
          </Field>

          <Field label="اسم الهدية (English)">
            <input className="input" value={form.name_en}
              onChange={(e) => setForm({ ...form, name_en: e.target.value })} />
          </Field>

          <Field label="المتجر">
            <select className="input" value={form.store_id}
              onChange={(e) => setForm({ ...form, store_id: e.target.value })}>
              <option value="">اختر المتجر</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>{s.name_ar}</option>
              ))}
            </select>
          </Field>

          <Field label="الفئة">
            <select className="input" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="">اختر الفئة</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          {/* Image Field */}
          <div className="col-span-full">
            <label className="text-sm font-medium block mb-2">صورة الهدية</label>

            <div className="flex gap-4 mb-3">
              <label className="flex gap-2 items-center">
                <input type="radio" checked={imageMode === 'url'}
                  onChange={() => setImageMode('url')} />
                رابط صورة
              </label>
              <label className="flex gap-2 items-center">
                <input type="radio" checked={imageMode === 'upload'}
                  onChange={() => setImageMode('upload')} />
                رفع من الجهاز
              </label>
            </div>

            {imageMode === 'url' && (
              <input
                className="input w-full"
                placeholder="https://example.com/image.jpg"
                value={form.image_url || ''}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
              />
            )}

            {imageMode === 'upload' && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
            )}

            {(imagePreview || form.image_url) && (
              <img
                src={imagePreview || form.image_url}
                className="mt-3 w-24 h-24 rounded object-cover"
              />
            )}
          </div>

          <Field label="أقل عمر">
            <input type="number" className="input" value={form.min_age}
              onChange={(e) => setForm({ ...form, min_age: +e.target.value })} />
          </Field>

          <Field label="أعلى عمر">
            <input type="number" className="input" value={form.max_age}
              onChange={(e) => setForm({ ...form, max_age: +e.target.value })} />
          </Field>

          <Field label="أقل سعر">
            <input type="number" className="input" value={form.min_budget}
              onChange={(e) => setForm({ ...form, min_budget: +e.target.value })} />
          </Field>

          <Field label="أعلى سعر">
            <input type="number" className="input" value={form.max_budget}
              onChange={(e) => setForm({ ...form, max_budget: +e.target.value })} />
          </Field>

          <button className="bg-green-600 text-white py-2 rounded-lg col-span-full">
            {editingId ? 'تحديث الهدية' : 'حفظ الهدية'}
          </button>
        </form>
      )}

      {/* Table */}
      <div className="bg-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th>الصورة</th>
              <th>الاسم</th>
              <th>المتجر</th>
              <th>السعر</th>
              <th>تعديل</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="p-2">
                  {g.image_url ? (
                    <img src={g.image_url} className="w-12 h-12 rounded object-cover" />
                  ) : (
                    <ImageIcon className="mx-auto text-muted-foreground" />
                  )}
                </td>
                <td>{g.name_ar}</td>
                <td>{g.store?.name_ar}</td>
                <td>${g.min_budget} - ${g.max_budget}</td>
                <td>
                  <button onClick={() => handleEdit(g)}>
                    <Pencil />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(g.id)} className="text-red-600">
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Reusable */
function Field({ label, children }: any) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1">{label}</label>
      {children}
    </div>
  );
}
