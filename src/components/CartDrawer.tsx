"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, subtotal, isCartOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
          <h2 className="text-lg font-medium text-charcoal">Your Bag ({totalItems})</h2>
          <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center text-muted hover:text-charcoal transition-colors" aria-label="Close cart">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 text-border mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-muted text-sm mb-4">Your bag is empty</p>
              <button onClick={() => setIsCartOpen(false)} className="text-sm text-beige hover:underline">Continue Shopping</button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => {
                const key = `${item.product.id}-${item.size}-${item.color}`;
                const discountedPrice = item.product.discount > 0
                  ? item.product.price * (1 - item.product.discount / 100)
                  : item.product.price;
                return (
                  <div key={key} className="flex gap-4 pb-5 border-b border-border/30">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-cream shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-charcoal truncate">{item.product.name}</h3>
                      <p className="text-sm font-semibold text-charcoal mt-0.5">
                        PKR {discountedPrice.toLocaleString()}
                      </p>
                      <div className="flex gap-3 mt-1 text-xs text-muted">
                        <span>Size: <span className="text-charcoal">{item.size}</span></span>
                        <span>Color: <span className="text-charcoal">{item.color}</span></span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} disabled={item.quantity <= 1} className="w-7 h-7 flex items-center justify-center text-muted hover:text-charcoal disabled:opacity-30 transition-colors text-sm">−</button>
                          <span className="w-7 text-center text-xs font-medium text-charcoal">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-muted hover:text-charcoal transition-colors text-sm">+</button>
                        </div>
                        <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-xs text-muted hover:text-red-500 transition-colors">Remove</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border/50 px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold text-charcoal">PKR {subtotal.toLocaleString()}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3.5 bg-charcoal text-white text-center rounded-full font-medium text-sm hover:bg-charcoal/90 transition-colors"
            >
              VIEW BAG & CHECKOUT
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
