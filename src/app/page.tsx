import Image from "next/image";
import Link from "next/link";
import { products, categories, testimonials, getWhatsAppLink } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import CategoryCard from "@/components/CategoryCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/products/organza2.webp"
            alt="Zariya Collection"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <AnimatedSection delay={0} direction="up">
              <p className="text-beige text-sm md:text-base uppercase tracking-[0.3em] mb-4">
                New Collection 2025
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200} direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight tracking-wide">
                Elegance Woven
                <br />
                <span className="text-beige">Into Every</span>
                <br />
                Thread
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={400} direction="up">
              <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-lg">
                Discover our curated collection of premium Pakistani clothing.
                From everyday cotton to luxurious silk — crafted with passion,
                delivered with care.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={600} direction="up">
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/collection"
                  className="px-8 py-3.5 bg-white text-charcoal rounded-full font-medium text-sm hover:bg-cream transition-all duration-300 hover:scale-105"
                >
                  View Collection
                </Link>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3.5 bg-whatsapp text-white rounded-full font-medium text-sm hover:bg-whatsapp-dark transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order on WhatsApp
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              title="Featured Collection"
              subtitle="Handpicked pieces from our latest arrivals — each crafted with attention to detail and premium fabrics."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 100} direction="up">
                <ProductCard product={product} index={i} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300}>
            <div className="mt-12 text-center">
              <Link
                href="/collection"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-charcoal text-charcoal rounded-full text-sm font-medium hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                View All Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              title="Shop by Fabric"
              subtitle="From breezy lawns to luxurious silks — find the perfect fabric for every occasion."
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, i) => (
              <AnimatedSection key={category.slug} delay={i * 100} direction="up">
                <CategoryCard {...category} index={i} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              title="What Our Customers Say"
              subtitle="Don't just take our word for it — hear from our happy customers across Pakistan."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, i) => (
              <AnimatedSection key={testimonial.name} delay={i * 150} direction="up">
                <TestimonialCard {...testimonial} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
