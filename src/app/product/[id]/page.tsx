
"use client"

import { useParams } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Check, ShoppingBag, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { Recommendations } from "@/components/products/Recommendations";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Success",
      description: `${product.name} added to your shopping bag.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint="luxury product photo"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                   <Image
                    src={`https://picsum.photos/seed/medard-detail-${i}/400/400`}
                    alt={`${product.name} detail ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary rounded-full px-4">{product.category}</Badge>
              <h1 className="text-5xl font-headline italic">{product.name}</h1>
              <p className="text-3xl font-light text-primary">${product.price.toFixed(2)}</p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                {product.description}
              </p>
              
              <ul className="space-y-3">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 space-y-4 border-t">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-white h-14 text-lg rounded-full"
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Add to Bag
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-xs uppercase tracking-widest font-bold text-muted-foreground text-center">
              <div className="space-y-2">
                <Truck className="h-6 w-6 mx-auto text-primary" />
                <p>Free Express Shipping</p>
              </div>
              <div className="space-y-2">
                <ShieldCheck className="h-6 w-6 mx-auto text-primary" />
                <p>Secure Payments</p>
              </div>
              <div className="space-y-2">
                <RefreshCcw className="h-6 w-6 mx-auto text-primary" />
                <p>30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-32">
          <Recommendations browsingHistory={[product.name]} />
        </div>
      </main>
    </div>
  );
}
