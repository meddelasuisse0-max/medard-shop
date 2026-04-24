
"use client"

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { total, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast({
        title: "Order Placed",
        description: "Your Médard Ligne order is being prepared.",
      });
      clearCart();
      router.push("/account/orders");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-headline italic">Complete Your Order</h1>
            <div className="flex justify-center items-center gap-4 max-w-sm mx-auto">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && <div className={`h-px w-8 ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card className="bg-card border-none shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleNextStep} className="space-y-8">
                    {step === 1 && (
                      <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-headline">Shipping Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="Jean" required className="bg-background" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Médard" required className="bg-background" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="123 Luxury Lane" required className="bg-background" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Paris" required className="bg-background" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">Postal Code</Label>
                            <Input id="zip" placeholder="75001" required className="bg-background" />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-headline">Payment Method</h2>
                        <div className="space-y-4">
                          <div className="p-4 border border-primary bg-primary/5 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                              <span>Credit Card ending in 4242</span>
                            </div>
                            <CheckCircle2 className="text-primary" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input id="cardName" placeholder="Jean Médard" required className="bg-background" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="0000 0000 0000 0000" required className="bg-background" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" required className="bg-background" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" required className="bg-background" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-headline">Order Confirmation</h2>
                        <div className="space-y-4 text-muted-foreground font-light">
                          <p>Please review your details before placing your order. By clicking "Place Order", you agree to our terms of service.</p>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="font-medium text-foreground mb-2">Shipping to:</p>
                            <p>Jean Médard</p>
                            <p>123 Luxury Lane, Paris 75001</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-8">
                      {step > 1 ? (
                        <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                          Back
                        </Button>
                      ) : <div />}
                      <Button type="submit" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 h-12">
                        {step === 3 ? "Place Order" : "Continue"} <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-card/50 border-none p-6 space-y-4">
                <h3 className="font-headline text-lg italic">Summary</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-accent">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-foreground font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest pt-4">
                  <Lock className="h-3 w-3" /> Secure Checkout
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
