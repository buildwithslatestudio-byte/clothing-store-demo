import Link from "next/link";
import { getWhatsAppLink } from "@/data/products";
import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  { num: "01", title: "Browse Our Collection", desc: "Explore our website or ask us for recommendations on WhatsApp.", icon: "🔍" },
  { num: "02", title: "Choose Your Favourite", desc: "Take a screenshot or note the product name you'd like to order.", icon: "❤️" },
  { num: "03", title: "Send on WhatsApp", desc: "Share the product name or screenshot with us on WhatsApp. We'll confirm availability and price.", icon: "💬" },
  { num: "04", title: "Confirm & Receive", desc: "Confirm your order details and address. We'll deliver it right to your doorstep!", icon: "📦" },
];

export default function OrderPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-beige text-sm uppercase tracking-[0.3em] mb-3">Simple & Easy</p>
            <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-wide">How to Order</h1>
            <p className="mt-4 text-muted max-w-xl mx-auto">Ordering from Zariya is as simple as sending a message. No complicated checkouts — just WhatsApp us!</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 150} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="flex gap-6 items-start p-6 md:p-8 bg-cream/50 rounded-2xl hover:bg-cream transition-colors duration-500">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm">{step.icon}</div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-beige text-xs font-medium tracking-widest">{step.num}</span>
                      <h3 className="text-charcoal font-medium text-lg">{step.title}</h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Big CTA */}
          <AnimatedSection delay={400}>
            <div className="mt-16 text-center">
              <p className="text-charcoal text-lg mb-2">Ready to place your order?</p>
              <p className="text-muted text-sm mb-8">Send the product name or screenshot on WhatsApp to get started!</p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-whatsapp/25"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp Now
              </a>

              <p className="mt-6 text-muted text-xs">
                Or <Link href="/collection" className="text-beige hover:underline">browse our collection</Link> first
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
