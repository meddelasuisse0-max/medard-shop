
import { PlaceHolderImages } from "./placeholder-images";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Fragrance" | "Skincare" | "Home";
  image: string;
  details: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "fragrance-1",
    name: "L'Essence de Médard",
    description: "A signature fragrance that blends midnight jasmine with velvet musk.",
    price: 185.00,
    category: "Fragrance",
    image: PlaceHolderImages.find(img => img.id === 'fragrance-1')?.imageUrl || '',
    details: [
      "Top notes: Midnight Jasmine, Saffron",
      "Heart notes: Amberwood, Ambergris",
      "Base notes: Fir Resin, Cedar",
      "Volume: 100ml / 3.4 fl.oz."
    ]
  },
  {
    id: "skincare-1",
    name: "Nuit Sereine Cream",
    description: "An intensive overnight treatment designed to restore skin's natural radiance.",
    price: 125.00,
    category: "Skincare",
    image: PlaceHolderImages.find(img => img.id === 'skincare-1')?.imageUrl || '',
    details: [
      "Deep hydration technology",
      "Anti-aging complex",
      "Natural botanical extracts",
      "Size: 50ml"
    ]
  },
  {
    id: "home-1",
    name: "Bougie d'Or",
    description: "A hand-poured soy candle infused with notes of sandalwood and white linen.",
    price: 65.00,
    category: "Home",
    image: PlaceHolderImages.find(img => img.id === 'home-1')?.imageUrl || '',
    details: [
      "Burn time: 60 hours",
      "Hand-blown glass vessel",
      "Sustainable soy wax",
      "Signature scent"
    ]
  },
  {
    id: "fragrance-2",
    name: "Bleu Infini",
    description: "A crisp, aquatic scent that evokes the serenity of the Mediterranean coast.",
    price: 155.00,
    category: "Fragrance",
    image: PlaceHolderImages.find(img => img.id === 'fragrance-2')?.imageUrl || '',
    details: [
      "Top notes: Sea Salt, Bergamot",
      "Heart notes: Sage, Driftwood",
      "Base notes: Vetiver, Musk",
      "Volume: 50ml / 1.7 fl.oz."
    ]
  },
  {
    id: "skincare-2",
    name: "Éclat du Jour Serum",
    description: "A lightweight vitamin-rich serum for daily skin revitalization.",
    price: 95.00,
    category: "Skincare",
    image: PlaceHolderImages.find(img => img.id === 'skincare-2')?.imageUrl || '',
    details: [
      "Brightening Vitamin C",
      "Hyaluronic acid for plumping",
      "Non-greasy finish",
      "Size: 30ml"
    ]
  },
  {
    id: "home-2",
    name: "Diffuseur de Soie",
    description: "An elegant reed diffuser that provides a continuous, subtle fragrance for any room.",
    price: 85.00,
    category: "Home",
    image: PlaceHolderImages.find(img => img.id === 'home-2')?.imageUrl || '',
    details: [
      "Lasts up to 6 months",
      "8 high-absorbency reeds",
      "Alcohol-free formula",
      "Refillable bottle"
    ]
  }
];
