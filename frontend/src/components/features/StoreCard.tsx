import { MapPin, Package } from 'lucide-react';
import { Store } from '../../lib/api';

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-1">{store.name_ar}</h3>
          <p className="text-sm text-muted-foreground">{store.name_en}</p>
        </div>
        <div className="bg-primary/10 p-3 rounded-lg">
          <Package className="w-6 h-6 text-primary" />
        </div>
      </div>

      {store.description_ar && (
        <p className="text-muted-foreground mb-4 line-clamp-2">{store.description_ar}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="w-4 h-4" />
          <span>{store.gifts_count} هدية</span>
        </div>
        
        <a
          href={store.location_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">الموقع</span>
        </a>
      </div>
    </div>
  );
}
