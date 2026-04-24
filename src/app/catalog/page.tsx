
"use client"

import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { ProductCard } from "@/components/products/ProductCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, Suspense } from "react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryFilter || "All");

  useEffect(() => {
    setActiveCategory(categoryFilter || "All");
  }, [categoryFilter]);

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-24">
        <header className="mb-16 text-center space-y-4">
          <h1 className="text-5xl font-headline italic">The Collection</h1>
          <p className="text-muted-foreground max-w-xl mx-auto font-light">
            Explore our meticulously crafted range of personal care and ambient products.
          </p>
        </header>

        <div className="flex justify-center mb-12">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-auto">
            <TabsList className="bg-card/50 border h-auto p-1 rounded-full px-2">
              <TabsTrigger value="All" className="rounded-full px-8 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All</TabsTrigger>
              <TabsTrigger value="Fragrance" className="rounded-full px-8 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Fragrance</TabsTrigger>
              <TabsTrigger value="Skincare" className="rounded-full px-8 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Skincare</TabsTrigger>
              <TabsTrigger value="Home" className="rounded-full px-8 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Home</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading collection...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
