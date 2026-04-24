
"use client"

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronRight, Search } from "lucide-react";
import Image from "next/image";

const MOCK_ORDERS = [
  {
    id: "ORD-9283-XJ",
    date: "May 12, 2024",
    status: "Delivered",
    total: 310.00,
    items: [
      { name: "L'Essence de Médard", price: 185.00, qty: 1, image: "https://picsum.photos/seed/medard1/200/200" },
      { name: "Nuit Sereine Cream", price: 125.00, qty: 1, image: "https://picsum.photos/seed/medard2/200/200" }
    ]
  },
  {
    id: "ORD-1102-AQ",
    date: "April 05, 2024",
    status: "Delivered",
    total: 65.00,
    items: [
      { name: "Bougie d'Or", price: 65.00, qty: 1, image: "https://picsum.photos/seed/medard3/200/200" }
    ]
  }
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-24 max-w-5xl">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline italic">Your Orders</h1>
            <p className="text-muted-foreground">Manage and track your Médard Ligne purchases.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full bg-card border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </header>

        <div className="space-y-8">
          {MOCK_ORDERS.map((order) => (
            <Card key={order.id} className="bg-card border-none shadow-lg animate-fade-in overflow-hidden">
              <CardHeader className="bg-secondary/20 p-6 flex flex-row items-center justify-between border-b border-white/5">
                <div className="flex gap-12 text-sm">
                  <div>
                    <p className="text-muted-foreground uppercase tracking-widest text-[10px] mb-1">Order Placed</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground uppercase tracking-widest text-[10px] mb-1">Total</p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-muted-foreground uppercase tracking-widest text-[10px] mb-1">Status</p>
                    <Badge className="bg-primary/20 text-primary border-none">{order.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-muted-foreground uppercase tracking-widest text-[10px] mb-1">Order #</p>
                   <p className="font-mono text-xs">{order.id}</p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-6 items-center">
                      <div className="relative h-20 w-16 flex-shrink-0 rounded overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.qty} | ${item.price.toFixed(2)}</p>
                      </div>
                      <button className="text-primary hover:underline text-sm hidden sm:block">Buy it again</button>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-primary font-medium cursor-pointer hover:opacity-80 transition-opacity">
                    <Package className="h-4 w-4" />
                    <span>Track Shipment</span>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                    View Order Details <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
