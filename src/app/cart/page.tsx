
"use client"

import { Navbar } from "@/components/layout/Navbar";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-headline">Your bag is empty</h1>
            <p className="text-muted-foreground">Discover something special to fill it with.</p>
          </div>
          <Link href="/catalog">
            <Button size="lg" className="bg-primary text-primary-foreground rounded-full px-8">
              Explore Collection
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-24">
        <h1 className="text-4xl font-headline italic mb-12">Your Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <Card key={item.product.id} className="bg-card border-none overflow-hidden animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-24 h-32 sm:w-32 sm:h-40 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-primary mb-1">{item.product.category}</p>
                          <h3 className="text-xl font-headline">{item.product.name}</h3>
                        </div>
                        <p className="text-lg font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-full px-2 py-1 bg-background">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-none p-8 space-y-6 sticky top-32 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-headline border-b pb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground font-light">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-light">
                  <span>Shipping</span>
                  <span className="text-accent">Complimentary</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-light">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full bg-accent hover:bg-accent/90 text-white h-14 rounded-full text-lg mt-4">
                  Checkout Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-tighter">
                Secure SSL Encrypted Checkout
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
