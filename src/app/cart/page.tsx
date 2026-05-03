"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import AnimatedSection from "@/components/AnimatedSection";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, clearCart } = useCart();
  const [voucher, setVoucher] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [email, setEmail] = useState("");

  const shipping = subtotal > 5000 ? 0 : 199;
  const discount = voucherApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;

  const handleApplyVoucher = () => {
    if (voucher.trim().toUpperCase() === "ZARIYA10") {
      setVoucherApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <AnimatedSection>
          <svg className="w-20 h-20 text-border mb-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="text-2xl font-light text-charcoal mb-2">Your Bag is Empty</h1>
          <p className="text-muted text-sm mb-6">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/collection" className="px-8 py-3 bg-charcoal text-white rounded-full text-sm font-medium hover:bg-charcoal/90 transition-colors">
            CONTINUE SHOPPING
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <section className="py-8 md:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <span className="text-charcoal">Shopping Bag</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left — Checkout Steps */}
          <div className="lg:col-span-3">
            <AnimatedSection direction="left">
              {/* Step 1 — Email */}
              <div className="border border-border/50 rounded-2xl overflow-hidden mb-4">
                <button
                  onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
                  className="w-full flex items-center gap-3 px-6 py-5 text-left"
                >
                  <span className="w-7 h-7 rounded-full border border-charcoal flex items-center justify-center text-xs font-medium text-charcoal">1</span>
                  <span className="font-medium text-charcoal uppercase tracking-wider text-sm">Enter Email</span>
                  <svg className={`w-4 h-4 text-muted ml-auto transition-transform duration-300 ${activeStep === 1 ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeStep === 1 ? "max-h-60 pb-6" : "max-h-0"}`}>
                  <div className="px-6">
                    <p className="text-sm text-muted mb-4">Already have an account? <button className="text-charcoal font-medium underline">SIGN IN</button></p>
                    <label htmlFor="checkout-email" className="block text-xs text-muted mb-1">Email *</label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-b border-charcoal py-2 text-sm text-charcoal focus:outline-none bg-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2 — Shipping */}
              <div className="border border-border/50 rounded-2xl overflow-hidden mb-4">
                <button
                  onClick={() => setActiveStep(activeStep === 2 ? 0 : 2)}
                  className="w-full flex items-center gap-3 px-6 py-5 text-left"
                >
                  <span className="w-7 h-7 rounded-full border border-charcoal flex items-center justify-center text-xs font-medium text-charcoal">2</span>
                  <span className="font-medium text-charcoal uppercase tracking-wider text-sm">Shipping</span>
                  <svg className={`w-4 h-4 text-muted ml-auto transition-transform duration-300 ${activeStep === 2 ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeStep === 2 ? "max-h-40 pb-6" : "max-h-0"}`}>
                  <div className="px-6">
                    <p className="text-sm text-muted">Free shipping on orders above PKR 5,000. Standard delivery: 3-5 business days across Pakistan.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 — Payment */}
              <div className="border border-border/50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveStep(activeStep === 3 ? 0 : 3)}
                  className="w-full flex items-center gap-3 px-6 py-5 text-left"
                >
                  <span className="w-7 h-7 rounded-full border border-charcoal flex items-center justify-center text-xs font-medium text-charcoal">3</span>
                  <span className="font-medium text-charcoal uppercase tracking-wider text-sm">Payment</span>
                  <svg className={`w-4 h-4 text-muted ml-auto transition-transform duration-300 ${activeStep === 3 ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeStep === 3 ? "max-h-40 pb-6" : "max-h-0"}`}>
                  <div className="px-6">
                    <p className="text-sm text-muted">Cash on Delivery available across Pakistan. Bank transfer details will be shared on WhatsApp.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — Cart Summary */}
          <div className="lg:col-span-2">
            <AnimatedSection direction="right">
              {/* Cart Items */}
              <div className="bg-cream/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-medium text-charcoal">Your Bag ({totalItems})</h2>
                  <span className="font-semibold text-charcoal">PKR {subtotal.toLocaleString()}</span>
                </div>

                <div className="space-y-5">
                  {items.map((item) => {
                    const key = `${item.product.id}-${item.size}-${item.color}`;
                    const itemPrice = item.product.discount > 0
                      ? item.product.price * (1 - item.product.discount / 100)
                      : item.product.price;
                    return (
                      <div key={key} className="flex gap-4">
                        <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-cream shrink-0">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-charcoal truncate pr-2">{item.product.name}</h3>
                            <span className="text-sm font-semibold text-charcoal whitespace-nowrap">PKR {(itemPrice * item.quantity).toLocaleString()}</span>
                          </div>
                          <div className="flex gap-3 mt-1 text-xs text-muted">
                            <span>Size: <span className="text-charcoal">{item.size}</span></span>
                            <span>Qty: <span className="text-charcoal">{item.quantity}</span></span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-border rounded">
                              <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} disabled={item.quantity <= 1} className="w-6 h-6 flex items-center justify-center text-xs text-muted hover:text-charcoal disabled:opacity-30">−</button>
                              <span className="w-5 text-center text-xs text-charcoal">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-xs text-muted hover:text-charcoal">+</button>
                            </div>
                            <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-xs text-muted hover:text-red-500 transition-colors">Remove</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Voucher */}
              <div className="mt-6 bg-cream/30 rounded-2xl p-6">
                <h3 className="font-medium text-charcoal text-sm uppercase tracking-wider mb-4">Redeem Your Voucher</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    placeholder="Enter Code"
                    className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-charcoal bg-white transition-colors"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="px-5 py-2.5 bg-charcoal text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-charcoal/90 transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {voucherApplied && <p className="text-green-600 text-xs mt-2">✓ Voucher applied! 10% discount added.</p>}
                <p className="text-muted text-[10px] mt-2">Try: ZARIYA10 for 10% off</p>
              </div>

              {/* Order Summary */}
              <div className="mt-6 bg-cream/30 rounded-2xl p-6">
                <h3 className="font-medium text-charcoal text-sm uppercase tracking-wider mb-4">Order Summary</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="text-charcoal">PKR {subtotal.toLocaleString()}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-600"><span>Voucher Discount</span><span>- PKR {discount.toLocaleString()}</span></div>}
                  <div className="flex justify-between"><span className="text-muted">Shipping</span><span className="text-charcoal">{shipping === 0 ? "FREE" : `PKR ${shipping}`}</span></div>
                  <div className="flex justify-between pt-3 border-t border-border/30 font-semibold text-base"><span className="text-charcoal">Total</span><span className="text-charcoal">PKR {total.toLocaleString()}</span></div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="mt-6 w-full py-4 bg-charcoal text-white rounded-full font-medium text-sm uppercase tracking-wider hover:bg-charcoal/90 transition-colors">
                PROCEED TO SHIPPING
              </button>

              <button
                onClick={clearCart}
                className="mt-3 w-full py-3 text-muted text-xs hover:text-red-500 transition-colors"
              >
                Clear Bag
              </button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
