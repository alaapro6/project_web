import { useEffect, useState } from 'react';
import { Store as Building, Loader2 } from 'lucide-react';
import StoreCard from '../components/features/StoreCard';
import { getStores, Store } from '../lib/api';

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const data = await getStores();
      setStores(data);
    } catch (error) {
      console.error('Error loading stores:', error);
      alert('حدث خطأ أثناء تحميل المتاجر');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">جاري تحميل المتاجر...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <Building className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold">المتاجر المتاحة</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          اكتشف أفضل المتاجر للعثور على الهدايا 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store, index) => (
          <div key={store.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <StoreCard store={store} />
          </div>
        ))}
      </div>
    </div>
  );
}
