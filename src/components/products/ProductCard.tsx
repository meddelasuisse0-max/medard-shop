
"use client"

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your shopping bag.`,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden bg-card border-none hover:shadow-2xl transition-all duration-500 animate-fade-in">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint="luxury product"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute bottom-4 left-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-white" 
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Bag
            </Button>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-xs uppercase tracking-widest text-primary mb-2">{product.category}</p>
          <h3 className="text-xl font-headline group-hover:text-primary transition-colors">{product.name}</h3>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
