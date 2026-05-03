"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getProductBySlug, getWhatsAppLink, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug as string);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showCare, setShowCare] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-light text-charcoal mb-4">Product Not Found</h1>
        <Link href="/collection" className="text-beige hover:underline">Back to Collection</Link>
      </div>
    );
  }

  const discountedPrice = product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, selectedSize, selectedColor || product.colors[0], quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream/50 py-3 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-charcoal transition-colors">Collection</Link>
            <span>/</span>
            <Link href={`/collection?category=${product.category.toLowerCase()}`} className="hover:text-charcoal transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main PDP */}
      <section className="py-8 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream">
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold uppercase tracking-wider rounded-full">{product.discount}% Off</div>
                )}
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                {/* Wishlist button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm" aria-label="Add to wishlist">
                  <svg className="w-5 h-5 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>
            </AnimatedSection>

            {/* Details */}
            <AnimatedSection direction="right">
              <div className="flex flex-col">
                <p className="text-beige text-xs uppercase tracking-[0.2em] mb-1">{product.category} | {product.fabric}</p>
                <h1 className="text-2xl md:text-3xl font-light text-charcoal tracking-wide">{product.name}</h1>

                {/* Price */}
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-beige-dark text-xl font-semibold">PKR {discountedPrice.toLocaleString()}</span>
                  {product.discount > 0 && (
                    <span className="text-muted line-through text-sm">PKR {product.price.toLocaleString()}</span>
                  )}
                </div>

                <p className="text-xs text-muted mt-1">SKU: {product.sku}</p>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToBag}
                  className={`mt-6 w-full py-4 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 ${added ? "bg-whatsapp text-white" : "bg-charcoal text-white hover:bg-charcoal/90"}`}
                >
                  {added ? "✓ ADDED TO BAG" : "ADD TO BAG"}
                </button>

                {/* WhatsApp */}
                <a
                  href={getWhatsAppLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 border border-whatsapp text-whatsapp rounded-full font-medium text-sm hover:bg-whatsapp hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  ORDER ON WHATSAPP
                </a>

                {/* Description */}
                <div className="mt-8 border-t border-border/30 pt-6">
                  <p className="text-muted text-sm leading-relaxed">{product.description}</p>
                </div>

                {/* Fabric Details */}
                <div className="mt-6 border-t border-border/30 pt-6">
                  <h3 className="text-sm font-medium text-charcoal mb-3">Fabrics — {product.fabric} {product.fabricDetails.length > 2 ? `${product.fabricDetails.length - 1} Piece` : ""}</h3>
                  <div className="space-y-1.5">
                    {product.fabricDetails.map((detail, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="font-medium text-charcoal min-w-[120px]">{detail.label}:</span>
                        <span className="text-muted">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Thumbnail + SKU + Quantity + Size */}
                <div className="mt-6 border-t border-border/30 pt-6">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-28 rounded-lg overflow-hidden bg-cream shrink-0">
                      <Image src={product.image} alt={product.name} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-charcoal">{product.name}</h4>
                      <p className="text-xs text-muted mt-0.5">SKU: {product.sku}</p>

                      {/* Quantity */}
                      <div className="mt-3">
                        <p className="text-xs text-muted mb-1.5">Quantity</p>
                        <div className="flex items-center border border-border rounded-lg w-fit">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-muted hover:text-charcoal transition-colors">−</button>
                          <span className="w-8 text-center text-sm font-medium text-charcoal">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-muted hover:text-charcoal transition-colors">+</button>
                        </div>
                      </div>

                      {/* Size */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-xs text-muted">Size</p>
                          <button className="text-xs text-beige hover:underline flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Size Guide
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => { setSelectedSize(size); setSizeError(false); }}
                              className={`w-10 h-10 rounded-lg border text-xs font-medium transition-all duration-200 ${
                                selectedSize === size
                                  ? "border-charcoal bg-charcoal text-white"
                                  : sizeError
                                  ? "border-red-300 text-charcoal hover:border-charcoal"
                                  : "border-border text-charcoal hover:border-charcoal"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                        {sizeError && <p className="text-red-500 text-xs mt-1">Please select a size</p>}
                      </div>

                      {/* Color */}
                      {product.colors.length > 1 && (
                        <div className="mt-3">
                          <p className="text-xs text-muted mb-1.5">Color</p>
                          <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                                  (selectedColor || product.colors[0]) === color
                                    ? "border-charcoal bg-charcoal text-white"
                                    : "border-border text-charcoal hover:border-charcoal"
                                }`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Care Instructions (accordion) */}
                <div className="mt-6 border-t border-border/30">
                  <button
                    onClick={() => setShowCare(!showCare)}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-charcoal"
                  >
                    Care Instructions
                    <svg className={`w-4 h-4 text-muted transition-transform duration-300 ${showCare ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${showCare ? "max-h-40 pb-4" : "max-h-0"}`}>
                    <ul className="space-y-1.5">
                      {product.careInstructions.map((inst, i) => (
                        <li key={i} className="text-sm text-muted flex items-start gap-2">
                          <span className="text-beige mt-0.5">•</span>{inst}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Product Tags (accordion) */}
                <div className="border-t border-border/30">
                  <button
                    onClick={() => setShowTags(!showTags)}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-charcoal"
                  >
                    Product Tags
                    <svg className={`w-4 h-4 text-muted transition-transform duration-300 ${showTags ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${showTags ? "max-h-20 pb-4" : "max-h-0"}`}>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-cream text-muted text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 bg-cream/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl font-light text-charcoal tracking-wide mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 100} direction="up">
                  <ProductCard product={p} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
