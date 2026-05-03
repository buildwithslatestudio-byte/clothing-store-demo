interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({ name, location, text, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-500 border border-border/50">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-beige" : "text-border"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-muted text-sm md:text-base leading-relaxed italic">
        &ldquo;{text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
          <span className="text-beige font-semibold text-sm">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-charcoal font-medium text-sm">{name}</p>
          <p className="text-muted text-xs">{location}</p>
        </div>
      </div>
    </div>
  );
}
