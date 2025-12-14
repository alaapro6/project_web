import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminStores,
  createStore,
  updateStore,
  deleteStore,
  Store,
} from "../lib/api";
import { Plus, Trash2, Edit, Store as StoreIcon, ArrowLeft } from "lucide-react";

export default function AdminStores() {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  const [formData, setFormData] = useState<Partial<Store>>({
    name_ar: "",
    name_en: "",
    location_url: "",
    description_ar: "",
    description_en: "",
    image_url: "",
  });

  // ================= LOAD STORES =================
  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const data = await getAdminStores();
      setStores(data);
    } catch (error) {
      console.error("Failed to load stores", error);
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORM HANDLERS =================
  const openCreateForm = () => {
    setEditingStore(null);
    setFormData({
      name_ar: "",
      name_en: "",
      location_url: "",
      description_ar: "",
      description_en: "",
      image_url: "",
    });
    setFormOpen(true);
  };

  const openEditForm = (store: Store) => {
    setEditingStore(store);
    setFormData(store);
    setFormOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingStore) {
        await updateStore(editingStore.id, formData);
      } else {
        await createStore(formData);
      }
      setFormOpen(false);
      loadStores();
    } catch (error) {
      alert("Error saving store");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this store?")) return;
    await deleteStore(id);
    loadStores();
  };

  // ================= UI =================
  if (loading) {
    return <div className="p-10 text-center">Loading stores...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="p-2 rounded hover:bg-muted"
          >
            <ArrowLeft />
          </button>
          <StoreIcon className="text-primary" />
          <h1 className="text-2xl font-bold">Manage Stores</h1>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Store
        </button>
      </div>

      {/* Stores List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-card border rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-bold mb-1">{store.name_en}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {store.name_ar}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEditForm(store)}
                className="flex-1 flex items-center justify-center gap-1 border rounded py-1 hover:bg-muted"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(store.id)}
                className="flex-1 flex items-center justify-center gap-1 border border-destructive text-destructive rounded py-1 hover:bg-destructive/10"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingStore ? "Edit Store" : "Add Store"}
            </h2>

            <div className="space-y-3">
              <input name="name_en" placeholder="Name (EN)" className="input" value={formData.name_en || ""} onChange={handleChange} />
              <input name="name_ar" placeholder="Name (AR)" className="input" value={formData.name_ar || ""} onChange={handleChange} />
              <input name="location_url" placeholder="Google Maps URL" className="input" value={formData.location_url || ""} onChange={handleChange} />
              <input name="image_url" placeholder="Image URL" className="input" value={formData.image_url || ""} onChange={handleChange} />
              <textarea name="description_en" placeholder="Description (EN)" className="input" value={formData.description_en || ""} onChange={handleChange} />
              <textarea name="description_ar" placeholder="Description (AR)" className="input" value={formData.description_ar || ""} onChange={handleChange} />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setFormOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
