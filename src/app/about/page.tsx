import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";

const values = [
  { icon: "✦", title: "Premium Fabrics", desc: "Only the finest materials — chiffon, silk, organza, lawn, and cotton — sourced from trusted mills." },
  { icon: "◆", title: "Timeless Design", desc: "Our designs blend traditional Pakistani aesthetics with modern sensibility for a look that never fades." },
  { icon: "★", title: "Trusted Quality", desc: "Every stitch is inspected. We stand behind every piece we sell, ensuring lasting quality." },
  { icon: "♥", title: "Customer First", desc: "From browsing to delivery, we make your shopping experience smooth and personal." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/products/silk2.jpg" alt="About Zariya" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-beige text-sm uppercase tracking-[0.3em] mb-3">Our Story</p>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-wide">About Zariya</h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-wide mb-6">Where Tradition Meets Elegance</h2>
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="h-px w-12 bg-beige" /><span className="h-1.5 w-1.5 rounded-full bg-beige" /><span className="h-px w-12 bg-beige" />
              </div>
              <p className="text-muted leading-relaxed mb-4">Zariya was born from a simple idea — to bring the beauty of Pakistani clothing to everyone, with quality that speaks for itself. Based in the heart of Lahore, we curate collections that celebrate the rich textile heritage of Pakistan.</p>
              <p className="text-muted leading-relaxed mb-4">From the intricate hand-embroidery of our organza pieces to the breezy comfort of our lawn collections, every product in our store tells a story of craftsmanship passed down through generations.</p>
              <p className="text-muted leading-relaxed">We believe fashion should be accessible, beautiful, and personal. That&apos;s why we&apos;ve made ordering as simple as sending a WhatsApp message.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-wide text-center mb-12">What Sets Us Apart</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 150} direction="up">
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center text-beige text-xl">{v.icon}</div>
                  <h3 className="text-charcoal font-medium mb-2">{v.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection><CTASection title="Let&apos;s Style You" subtitle="Have questions? Want a recommendation? We're just a WhatsApp message away." /></AnimatedSection>
    </>
  );
}
