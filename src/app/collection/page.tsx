"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import AnimatedSection from "@/components/AnimatedSection";
import { Suspense } from "react";

function CollectionContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  const allCategories = [
    { name: "All", slug: "all" },
    ...categories.map((c) => ({ name: c.name, slug: c.slug })),
  ];

  return (
    <>
      {/* Hero banner */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-beige text-sm uppercase tracking-[0.3em] mb-3">
              Our Collection
            </p>
            <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-wide">
              Explore Our Range
            </h1>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              Browse through our complete collection of premium Pakistani clothing.
              Each piece is crafted with care and designed to make you stand out.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter tabs + Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category filter */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
              {allCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.slug
                      ? "bg-charcoal text-white shadow-lg"
                      : "bg-cream text-muted hover:bg-cream-dark hover:text-charcoal"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 80} direction="up">
                <ProductCard product={product} index={i} />
              </AnimatedSection>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-muted">
              <p className="text-lg">No products found in this category.</p>
            </div>
          )}

          {/* Count */}
          <AnimatedSection>
            <p className="mt-12 text-center text-sm text-muted">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-beige border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CollectionContent />
    </Suspense>
  );
}
