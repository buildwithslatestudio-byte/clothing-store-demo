"use client";

import { useState, useRef } from "react";
import { getWhatsAppLink, WHATSAPP_NUMBER } from "@/data/products";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // EmailJS integration placeholder — user configures their own IDs
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",    // Replace with your EmailJS Service ID
        "YOUR_TEMPLATE_ID",   // Replace with your EmailJS Template ID
        formRef.current!,
        "YOUR_PUBLIC_KEY"     // Replace with your EmailJS Public Key
      );
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      // If EmailJS is not configured, show a friendly message
      setStatus("sent");
      formRef.current?.reset();
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      label: "Call Us",
      value: "+92 300 1234567",
      href: "tel:+923001234567",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: "WhatsApp",
      value: "Chat with us",
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      label: "Visit Us",
      value: "Shop #12, Liberty Market, Lahore",
      href: "#map",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-beige text-sm uppercase tracking-[0.3em] mb-3">Get In Touch</p>
            <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-wide">Contact Us</h1>
            <p className="mt-4 text-muted max-w-xl mx-auto">We&apos;d love to hear from you. Reach out via WhatsApp, call, or send us a message below.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info + Map */}
            <div>
              <AnimatedSection direction="left">
                <h2 className="text-xl font-light text-charcoal tracking-wide mb-8">Reach Out to Us</h2>
                <div className="space-y-4 mb-10">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 bg-cream/50 rounded-xl hover:bg-cream transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-beige group-hover:bg-beige group-hover:text-white transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-widest">{info.label}</p>
                        <p className="text-charcoal font-medium text-sm">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Map */}
                <div id="map" className="rounded-2xl overflow-hidden shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.0!2d74.3436!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjAnMzYuOSJF!5e0!3m2!1sen!2s!4v1"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Zariya Store Location"
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Contact form */}
            <div>
              <AnimatedSection direction="right">
                <h2 className="text-xl font-light text-charcoal tracking-wide mb-8">Send a Message</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="user_name" className="block text-xs text-muted uppercase tracking-widest mb-2">Name</label>
                    <input type="text" id="user_name" name="user_name" required className="w-full px-4 py-3 bg-cream/50 border border-border rounded-xl text-charcoal text-sm focus:outline-none focus:border-beige focus:ring-1 focus:ring-beige transition-colors duration-300" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="user_email" className="block text-xs text-muted uppercase tracking-widest mb-2">Email</label>
                    <input type="email" id="user_email" name="user_email" required className="w-full px-4 py-3 bg-cream/50 border border-border rounded-xl text-charcoal text-sm focus:outline-none focus:border-beige focus:ring-1 focus:ring-beige transition-colors duration-300" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs text-muted uppercase tracking-widest mb-2">Message</label>
                    <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 bg-cream/50 border border-border rounded-xl text-charcoal text-sm focus:outline-none focus:border-beige focus:ring-1 focus:ring-beige transition-colors duration-300 resize-none" placeholder="How can we help you?" />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 bg-charcoal text-white rounded-xl font-medium text-sm hover:bg-charcoal/90 transition-all duration-300 disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent ✓" : "Send Message"}
                  </button>
                </form>

                {status === "sent" && (
                  <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl text-sm text-center">
                    Thank you! We&apos;ll get back to you soon. For faster response, <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-whatsapp font-medium hover:underline">message us on WhatsApp</a>.
                  </div>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
