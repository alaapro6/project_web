import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import GiftForm from '../components/features/GiftForm';
import GiftCard from '../components/features/GiftCard';
import { getRecommendations, Recommendation } from '../lib/api';

export default function HomePage() {
  const { t } = useI18n();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (
    age: number,
    budget: number,
    interests: string[],
    gender?: string,
    occasion?: string,
    personality?: string,
    relationship?: string
  ) => {
    setLoading(true);
    setSearched(true);
    try {
      const results = await getRecommendations({
        age,
        budget,
        interests,
        gender,
        occasion,
        personality_type: personality,
        relationship
      });
      setRecommendations(results);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-3 mb-4">
          <Sparkles className="w-12 h-12 text-primary animate-pulse" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t('landing.hero.title')}
          </h1>
          <Sparkles className="w-12 h-12 text-accent animate-pulse" />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('landing.hero.subtitle')}
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-3xl mx-auto mb-12">
        <GiftForm onSubmit={handleSearch} loading={loading} />
      </div>

      {/* Results Section */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="flex items-center gap-3 text-primary">
              <Search className="w-6 h-6" />
              <span className="text-lg font-medium">{t('form.searching')}</span>
            </div>
          </div>
        </div>
      )}

      {!loading && searched && recommendations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t('results.noResults')}
          </p>
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              {t('results.found').replace('{count}', recommendations.length.toString())}
            </h2>
            <p className="text-muted-foreground">
              {t('results.sortedBy')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={rec.gift.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <GiftCard
                  gift={rec.gift}
                  score={rec.score}
                  matchDetails={rec.match_details}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
