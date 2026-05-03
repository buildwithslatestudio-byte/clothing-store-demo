export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  slug: string;
}

export const WHATSAPP_NUMBER = "923001234567";

export const categories = [
  { name: "Chiffon", slug: "chiffon", image: "/images/products/chiffon1.webp", description: "Lightweight elegance for every occasion" },
  { name: "Cotton", slug: "cotton", image: "/images/products/cotton1.jpg", description: "Comfortable everyday luxury" },
  { name: "Lawn", slug: "lawn", image: "/images/products/lawn1.jpg", description: "Breezy summer essentials" },
  { name: "Organza", slug: "organza", image: "/images/products/organza1.webp", description: "Sheer sophistication and grace" },
  { name: "Silk", slug: "silk", image: "/images/products/silk1.jpg", description: "Premium silk craftsmanship" },
];

export const products: Product[] = [
  // Chiffon
  { id: "chiffon-1", name: "Emerald Chiffon Ensemble", category: "Chiffon", price: "Rs. 8,500", image: "/images/products/chiffon1.webp", slug: "emerald-chiffon-ensemble" },
  { id: "chiffon-2", name: "Rose Gold Chiffon Dupatta", category: "Chiffon", price: "Rs. 6,200", image: "/images/products/chiffon2.webp", slug: "rose-gold-chiffon-dupatta" },
  { id: "chiffon-3", name: "Ivory Chiffon Suit", category: "Chiffon", price: "Rs. 7,800", image: "/images/products/chiffon3.webp", slug: "ivory-chiffon-suit" },
  { id: "chiffon-4", name: "Midnight Chiffon Collection", category: "Chiffon", price: "Rs. 9,100", image: "/images/products/chiffon4.webp", slug: "midnight-chiffon-collection" },
  { id: "chiffon-5", name: "Pearl Chiffon Dress", category: "Chiffon", price: "Rs. 7,400", image: "/images/products/chiffon5.webp", slug: "pearl-chiffon-dress" },

  // Cotton
  { id: "cotton-1", name: "Classic White Cotton Kurta", category: "Cotton", price: "Rs. 3,500", image: "/images/products/cotton1.jpg", slug: "classic-white-cotton-kurta" },
  { id: "cotton-2", name: "Embroidered Cotton Suit", category: "Cotton", price: "Rs. 4,200", image: "/images/products/cotton2.jpg", slug: "embroidered-cotton-suit" },
  { id: "cotton-3", name: "Printed Cotton Collection", category: "Cotton", price: "Rs. 3,800", image: "/images/products/cotton3.jpg", slug: "printed-cotton-collection" },
  { id: "cotton-4", name: "Premium Cotton Three-Piece", category: "Cotton", price: "Rs. 5,500", image: "/images/products/cotton4.jpg", slug: "premium-cotton-three-piece" },

  // Lawn
  { id: "lawn-1", name: "Spring Blossom Lawn", category: "Lawn", price: "Rs. 4,800", image: "/images/products/lawn1.jpg", slug: "spring-blossom-lawn" },
  { id: "lawn-2", name: "Digital Print Lawn Suit", category: "Lawn", price: "Rs. 5,200", image: "/images/products/lawn2.jpg", slug: "digital-print-lawn-suit" },
  { id: "lawn-3", name: "Embroidered Lawn Collection", category: "Lawn", price: "Rs. 6,100", image: "/images/products/lawn3.jpg", slug: "embroidered-lawn-collection" },
  { id: "lawn-4", name: "Summer Breeze Lawn", category: "Lawn", price: "Rs. 4,500", image: "/images/products/lawn4.jpg", slug: "summer-breeze-lawn" },
  { id: "lawn-5", name: "Luxury Lawn Three-Piece", category: "Lawn", price: "Rs. 7,000", image: "/images/products/lawn5.jpg", slug: "luxury-lawn-three-piece" },

  // Organza
  { id: "organza-1", name: "Bridal Organza Ensemble", category: "Organza", price: "Rs. 12,500", image: "/images/products/organza1.webp", slug: "bridal-organza-ensemble" },
  { id: "organza-2", name: "Festive Organza Dress", category: "Organza", price: "Rs. 11,000", image: "/images/products/organza2.webp", slug: "festive-organza-dress" },
  { id: "organza-3", name: "Hand-Embroidered Organza", category: "Organza", price: "Rs. 15,800", image: "/images/products/organza3.webp", slug: "hand-embroidered-organza" },
  { id: "organza-4", name: "Gold Dust Organza Suit", category: "Organza", price: "Rs. 13,200", image: "/images/products/organza4.png", slug: "gold-dust-organza-suit" },
  { id: "organza-5", name: "Royal Organza Collection", category: "Organza", price: "Rs. 14,500", image: "/images/products/organza5.webp", slug: "royal-organza-collection" },

  // Silk
  { id: "silk-1", name: "Pure Silk Formal Wear", category: "Silk", price: "Rs. 18,000", image: "/images/products/silk1.jpg", slug: "pure-silk-formal-wear" },
  { id: "silk-2", name: "Silk Banarasi Dupatta Set", category: "Silk", price: "Rs. 16,500", image: "/images/products/silk2.jpg", slug: "silk-banarasi-dupatta-set" },
  { id: "silk-3", name: "Traditional Silk Suit", category: "Silk", price: "Rs. 14,000", image: "/images/products/silk3.jpg", slug: "traditional-silk-suit" },
  { id: "silk-4", name: "Luxury Silk Three-Piece", category: "Silk", price: "Rs. 20,000", image: "/images/products/silk4.jpg", slug: "luxury-silk-three-piece" },
];

export const testimonials = [
  {
    name: "Ayesha Khan",
    location: "Lahore",
    text: "Absolutely love the quality! The chiffon collection is stunning and the stitching is flawless. Will definitely order again.",
    rating: 5,
  },
  {
    name: "Fatima Noor",
    location: "Karachi",
    text: "Best online clothing experience. The fabric quality exceeded my expectations. Their WhatsApp support is super responsive!",
    rating: 5,
  },
  {
    name: "Sana Malik",
    location: "Islamabad",
    text: "Beautiful designs at reasonable prices. The lawn collection is perfect for summer. Highly recommended!",
    rating: 4,
  },
];

export function getWhatsAppLink(productName?: string): string {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (productName) {
    return `${baseUrl}?text=${encodeURIComponent(`Hi! I'm interested in "${productName}". Please share the details.`)}`;
  }
  return `${baseUrl}?text=${encodeURIComponent("Hi! I'm interested in your clothing collection. Please share the details.")}`;
}
