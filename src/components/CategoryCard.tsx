"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  description: string;
  index?: number;
}

export default function CategoryCard({ name, slug, image, description, index = 0 }: CategoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={`/collection?category=${slug}`}
      className="group relative block aspect-[3/4] rounded-2xl overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        onLoad={() => setImageLoaded(true)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent transition-opacity duration-500 group-hover:from-charcoal/90" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <h3 className="text-white text-xl md:text-2xl font-light tracking-wide">
          {name}
        </h3>
        <p className="text-white/60 text-xs md:text-sm mt-1 transition-all duration-500 group-hover:text-white/80">
          {description}
        </p>
        <div className="mt-3 flex items-center gap-2 text-beige text-xs font-medium uppercase tracking-widest">
          <span>Explore</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
