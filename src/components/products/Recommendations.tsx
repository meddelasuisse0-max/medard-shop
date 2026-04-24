
"use client"

import { useEffect, useState } from "react";
import { recommendProducts } from "@/ai/flows/ai-product-recommender-flow";
import { PRODUCTS, Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendationsProps {
  browsingHistory?: string[];
}

export function Recommendations({ browsingHistory = [] }: RecommendationsProps) {
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const popularItems = PRODUCTS.slice(0, 3).map(p => p.name);
        const result = await recommendProducts({
          browsingHistory,
          popularItems,
          existingProducts: PRODUCTS.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            category: p.category
          }))
        });

        const recs = PRODUCTS.filter(p => result.recommendedProducts.includes(p.name));
        setRecommended(recs.length > 0 ? recs : PRODUCTS.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
        setRecommended(PRODUCTS.slice(0, 3));
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [browsingHistory]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full rounded-lg" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-headline text-center">Curated For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommended.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
