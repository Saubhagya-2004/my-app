"use client";

import { useCartStore } from "@/store/cartStore";
import { calculateTotal } from "@/lib/calculateTotal";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import Link from "next/link";

interface CheckoutContentProps {
    shippingFee: number;
    discountApplied: number;
}

export default function CheckoutContent({ shippingFee, discountApplied }: CheckoutContentProps) {
    const cartItems = useCartStore((s) => s.cartItems);
    const storeShippingFee = useCartStore((s) => s.shippingFee);
    const storeDiscount = useCartStore((s) => s.discountApplied);

    const totals = calculateTotal(cartItems, storeShippingFee || shippingFee, storeDiscount || discountApplied);
    const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 animate-fade-up delay-200">
            {/* Left — items */}
            <div className="rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Items in Cart</h2>
                    <Link href="/products" className="text-xs text-brand hover:text-brand/80 transition-colors">
                        + Add more products
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-5xl mb-4">🛒</p>
                        <p className="text-slate-400 mb-6">Your cart is empty</p>
                        <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-brand hover:bg-brand-dark transition-colors">
                            Browse Products →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {cartItems.map((item) => (
                            <CartItem key={item.product_id} item={item} />
                        ))}
                    </div>
                )}

                {/* SSR badge */}
                <div className="mt-4 px-3 py-2.5 rounded-lg bg-eco/6 border border-eco/15 text-eco text-xs">
                    ⚡ Cart data fetched via Server-Side Rendering (SSR)
                </div>
            </div>

            {/* Right — summary */}
            <div className="flex flex-col gap-4">
                <OrderSummary totals={totals} itemCount={totalQty} />
                {cartItems.length > 0 && (
                    <>
                        <Link
                            href="/shipping"
                            className="flex justify-center items-center gap-2 w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand to-brand-dark
                         shadow-[0_4px_16px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,102,241,0.55)] transition-all"
                        >
                            Proceed to Checkout →
                        </Link>
                        <p className="text-center text-xs text-slate-600">🔒 256-bit SSL encryption. Your info is safe.</p>
                    </>
                )}
            </div>
        </div>
    );
}
