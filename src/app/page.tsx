
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Recommendations } from "@/components/products/Recommendations";

export default function Home() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/medard-hero/1920/1080"
          alt="Médard Ligne Luxury"
          fill
          priority
          className="object-cover opacity-60"
          data-ai-hint="luxury lifestyle"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="container relative z-10 px-4 text-center space-y-8 animate-fade-in">
          <p className="text-primary uppercase tracking-[0.3em] font-medium">L'Art de Vivre</p>
          <h1 className="text-5xl md:text-8xl font-headline italic">Médard Ligne</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Where timeless elegance meets modern sophistication. Discover our curated collection of fragrances, skincare, and home essentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/catalog">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full">
                Shop Collection
              </Button>
            </Link>
            <Link href="/catalog?category=Fragrance">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-full">
                Explore Fragrance
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline">The Signature Edit</h2>
            <p className="text-muted-foreground">Our most coveted pieces, hand-selected for excellence.</p>
          </div>
          <Link href="/catalog">
            <Button variant="link" className="text-primary p-0 h-auto text-lg group">
              View All Products <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square">
            <Image
              src="https://picsum.photos/seed/medard-story/800/800"
              alt="Craftsmanship"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              data-ai-hint="luxury craftsmanship"
            />
          </div>
          <div className="space-y-8">
            <p className="text-accent uppercase tracking-widest font-bold">Our Heritage</p>
            <h2 className="text-4xl md:text-5xl font-headline">Designed for the Discerning.</h2>
            <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
              <p>
                Founded on the principles of purity and aesthetic harmony, Médard Ligne represents the pinnacle of premium lifestyle products. Every item in our collection is a testament to the artisans who dedicate their lives to perfection.
              </p>
              <p>
                From the sustainably sourced ingredients in our skincare to the complex olfactive profiles of our fragrances, we invite you to experience a world where quality knows no compromise.
              </p>
            </div>
            <Button className="bg-accent hover:bg-accent/90 px-8 py-6 rounded-full">Learn More</Button>
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-24 container mx-auto px-4">
        <Recommendations />
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-headline text-primary">MÉDARD LIGNE</h3>
            <p className="text-muted-foreground text-sm font-light">
              Elevating the everyday through sophisticated design and unparalleled quality.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs">Collections</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-light">
              <li><Link href="/catalog?category=Fragrance" className="hover:text-primary">Fragrance</Link></li>
              <li><Link href="/catalog?category=Skincare" className="hover:text-primary">Skincare</Link></li>
              <li><Link href="/catalog?category=Home" className="hover:text-primary">Home Decor</Link></li>
              <li><Link href="/catalog" className="hover:text-primary">New Arrivals</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-light">
              <li><Link href="#" className="hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">FAQs</Link></li>
              <li><Link href="#" className="hover:text-primary">Sustainability</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-sm text-muted-foreground font-light">Join for exclusive updates and early access.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email Address" className="bg-background border px-4 py-2 w-full rounded-md" />
              <Button className="bg-primary text-primary-foreground">Join</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>© 2024 Médard Ligne Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
