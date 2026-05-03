"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, allSizes, allColors, allCampaigns, discountOptions, priceRanges, sortOptions } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import { Suspense } from "react";

interface Filters {
  category: string;
  discounts: number[];
  priceRange: { min: number; max: number } | null;
  sizes: string[];
  colors: string[];
  fabric: string;
  campaign: string;
}

const defaultFilters: Filters = {
  category: "all",
  discounts: [],
  priceRange: null,
  sizes: [],
  colors: [],
  fabric: "all",
  campaign: "all",
};

function FilterSection({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-border/30">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-sm font-medium text-charcoal hover:text-beige transition-colors">
        <span>{title}</span>
        <svg className={`w-4 h-4 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-96 pb-4" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  );
}

function CollectionContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, category: initialCategory });
  const [sort, setSort] = useState("new");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // Which filter sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ Discount: true, Category: false, Campaign: false, Price: false, Size: false, Color: false, Fabric: false });
  const toggleSection = (name: string) => setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));

  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleArrayFilter = useCallback(<K extends keyof Filters>(key: K, value: string | number) => {
    setFilters((prev) => {
      const arr = prev[key] as (string | number)[];
      const newArr = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: newArr };
    });
  }, []);

  const clearAllFilters = () => setFilters({ ...defaultFilters });

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.discounts.length > 0) count++;
    if (filters.priceRange) count++;
    if (filters.sizes.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.fabric !== "all") count++;
    if (filters.campaign !== "all") count++;
    return count;
  }, [filters]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (filters.category !== "all") {
      result = result.filter((p) => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.discounts.length > 0) {
      result = result.filter((p) => filters.discounts.includes(p.discount));
    }
    if (filters.priceRange) {
      result = result.filter((p) => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max);
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) => filters.sizes.some((s) => p.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.some((c) => p.colors.includes(c)));
    }
    if (filters.fabric !== "all") {
      result = result.filter((p) => p.fabric.toLowerCase() === filters.fabric.toLowerCase());
    }
    if (filters.campaign !== "all") {
      result = result.filter((p) => p.campaign === filters.campaign);
    }

    // Sort
    switch (sort) {
      case "price-asc": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "name-asc": result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return result;
  }, [filters, sort]);

  // Count products per discount
  const discountCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    discountOptions.forEach((d) => {
      counts[d] = products.filter((p) => p.discount === d).length;
    });
    return counts;
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-beige text-sm uppercase tracking-[0.3em] mb-3">Our Collection</p>
            <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-wide">Explore Our Range</h1>
            <p className="mt-4 text-muted max-w-xl mx-auto text-sm md:text-base">
              Browse through our complete collection of premium Pakistani clothing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Top Bar: Filter toggle + Sort + Count */}
          <div className="flex items-center gap-3 mb-8">
            {/* Filter by button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm text-charcoal hover:border-charcoal transition-colors relative"
            >
              <span>Filter by</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-beige text-white text-[10px] font-semibold rounded-full flex items-center justify-center">{activeFilterCount}</span>
              )}
              <svg className={`w-4 h-4 text-muted transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm text-charcoal hover:border-charcoal transition-colors"
              >
                <span>{sortOptions.find((s) => s.value === sort)?.label}</span>
                <svg className={`w-4 h-4 text-muted transition-transform duration-300 ${showSort ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showSort && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-border rounded-xl shadow-lg z-20 py-1 animate-[fadeIn_0.2s_ease-out]">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setShowSort(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === opt.value ? "text-beige font-medium" : "text-charcoal hover:bg-cream/50"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Item count */}
            <span className="ml-auto text-sm text-muted">
              <span className="font-semibold text-charcoal">{filteredProducts.length}</span> items
            </span>
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className={`transition-all duration-500 ease-out overflow-hidden shrink-0 ${showFilters ? "w-64 opacity-100" : "w-0 opacity-0"}`}>
              <div className="w-64">
                {/* Clear all */}
                {activeFilterCount > 0 && (
                  <button onClick={clearAllFilters} className="text-xs text-beige hover:underline mb-4">Clear all filters</button>
                )}

                {/* Discount */}
                <FilterSection title="Discount" open={openSections.Discount} onToggle={() => toggleSection("Discount")}>
                  <div className="space-y-2">
                    {discountOptions.map((d) => (
                      <label key={d} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.discounts.includes(d)}
                          onChange={() => toggleArrayFilter("discounts", d)}
                          className="w-4 h-4 rounded border-border text-beige focus:ring-beige accent-beige"
                        />
                        <span className="text-sm text-muted group-hover:text-charcoal transition-colors">{d}% Off ({discountCounts[d]})</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Category */}
                <FilterSection title="Category" open={openSections.Category} onToggle={() => toggleSection("Category")}>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="category" checked={filters.category === "all"} onChange={() => updateFilter("category", "all")} className="w-4 h-4 text-beige accent-beige" />
                      <span className="text-sm text-muted group-hover:text-charcoal transition-colors">All</span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="category" checked={filters.category === cat.slug} onChange={() => updateFilter("category", cat.slug)} className="w-4 h-4 text-beige accent-beige" />
                        <span className="text-sm text-muted group-hover:text-charcoal transition-colors">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Campaign */}
                <FilterSection title="Campaign" open={openSections.Campaign} onToggle={() => toggleSection("Campaign")}>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="campaign" checked={filters.campaign === "all"} onChange={() => updateFilter("campaign", "all")} className="w-4 h-4 text-beige accent-beige" />
                      <span className="text-sm text-muted group-hover:text-charcoal transition-colors">All</span>
                    </label>
                    {allCampaigns.map((c) => (
                      <label key={c} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="campaign" checked={filters.campaign === c} onChange={() => updateFilter("campaign", c)} className="w-4 h-4 text-beige accent-beige" />
                        <span className="text-sm text-muted group-hover:text-charcoal transition-colors">{c}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Price */}
                <FilterSection title="Price" open={openSections.Price} onToggle={() => toggleSection("Price")}>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="price" checked={filters.priceRange === null} onChange={() => updateFilter("priceRange", null)} className="w-4 h-4 text-beige accent-beige" />
                      <span className="text-sm text-muted group-hover:text-charcoal transition-colors">All Prices</span>
                    </label>
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="price" checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max} onChange={() => updateFilter("priceRange", range)} className="w-4 h-4 text-beige accent-beige" />
                        <span className="text-sm text-muted group-hover:text-charcoal transition-colors">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Size */}
                <FilterSection title="Size" open={openSections.Size} onToggle={() => toggleSection("Size")}>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleArrayFilter("sizes", size)}
                        className={`w-10 h-10 rounded-lg border text-xs font-medium transition-all duration-200 ${filters.sizes.includes(size) ? "border-charcoal bg-charcoal text-white" : "border-border text-charcoal hover:border-charcoal"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Color */}
                <FilterSection title="Color" open={openSections.Color} onToggle={() => toggleSection("Color")}>
                  <div className="space-y-2">
                    {allColors.map((color) => (
                      <label key={color} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={filters.colors.includes(color)} onChange={() => toggleArrayFilter("colors", color)} className="w-4 h-4 rounded border-border text-beige focus:ring-beige accent-beige" />
                        <span className="text-sm text-muted group-hover:text-charcoal transition-colors">{color}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Fabric */}
                <FilterSection title="Fabric" open={openSections.Fabric} onToggle={() => toggleSection("Fabric")}>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="fabric" checked={filters.fabric === "all"} onChange={() => updateFilter("fabric", "all")} className="w-4 h-4 text-beige accent-beige" />
                      <span className="text-sm text-muted group-hover:text-charcoal transition-colors">All</span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="fabric" checked={filters.fabric === cat.slug} onChange={() => updateFilter("fabric", cat.slug)} className="w-4 h-4 text-beige accent-beige" />
                        <span className="text-sm text-muted group-hover:text-charcoal transition-colors">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-6">
                  {filteredProducts.map((product, i) => (
                    <AnimatedSection key={product.id} delay={i * 60} direction="up">
                      <ProductCard product={product} index={i} />
                    </AnimatedSection>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-muted">
                  <svg className="w-16 h-16 mx-auto mb-4 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-lg mb-2">No products found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                  <button onClick={clearAllFilters} className="mt-4 text-sm text-beige hover:underline">Clear all filters</button>
                </div>
              )}
            </div>
          </div>
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
