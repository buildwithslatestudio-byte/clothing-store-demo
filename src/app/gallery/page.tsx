"use client";

import Image from "next/image";
import { products } from "@/data/products";
import SectionTitle from "@/components/SectionTitle";
import AnimatedSection from "@/components/AnimatedSection";
import { useState } from "react";

function GalleryImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-cream ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-shimmer" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-white text-sm font-light">{alt}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const images = products.map((p) => ({ src: p.image, alt: p.name }));
  return (
    <>
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-beige text-sm uppercase tracking-[0.3em] mb-3">Visual Showcase</p>
            <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-wide">Our Gallery</h1>
            <p className="mt-4 text-muted max-w-xl mx-auto">A visual journey through our finest creations.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {images.map((img, i) => (
              <AnimatedSection key={i} delay={i * 60} direction="up">
                <GalleryImage src={img.src} alt={img.alt} className={i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
