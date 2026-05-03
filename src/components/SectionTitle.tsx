interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, light = false }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2
        className={`text-3xl md:text-4xl font-light tracking-wide ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-beige" />
        <span className="h-1.5 w-1.5 rounded-full bg-beige" />
        <span className="h-px w-12 bg-beige" />
      </div>
      {subtitle && (
        <p
          className={`mt-4 text-sm md:text-base max-w-xl mx-auto ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
