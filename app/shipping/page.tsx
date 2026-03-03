"use client";

import AddressForm from "@/components/AddressForm";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";
import CartBadge from "@/components/CartBadge";
import { useCartStore } from "@/store/cartStore";
import { calculateTotal } from "@/lib/calculateTotal";
import Link from "next/link";

export default function ShippingPage() {
    const { cartItems, shippingFee, discountApplied } = useCartStore();
    const totals = calculateTotal(cartItems, shippingFee, discountApplied);
    const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

    return (
        <div className="page-bg min-h-screen px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-2 animate-fade-up">
                    <Link href="/checkout" className="text-sm text-slate-400 border border-white/10 px-3.5 py-2 rounded-lg hover:border-white/20 hover:text-slate-200 transition-all inline-flex items-center gap-1">
                        ← Back to Cart
                    </Link>
                </div>

                <h1 className="animate-fade-up delay-100 text-3xl font-black tracking-tight text-center mb-1">
                    Shipping Details
                </h1>
                <p className="animate-fade delay-100 text-slate-500 text-sm text-center mb-8">
                    Where should we deliver your order?
                </p>

                <StepIndicator currentStep={2} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 animate-fade-up delay-200">
                    {/* Form */}
                    <div className="rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-7">
                        <h2 className="font-bold text-base mb-1">📦 Delivery Address</h2>
                        <p className="text-slate-500 text-sm mb-6">We deliver to all PIN codes across India</p>
                        <AddressForm />
                    </div>

                    {/* Summary + delivery promise */}
                    <div className="flex flex-col gap-4">
                        <OrderSummary totals={totals} itemCount={totalQty} />
                        <div className="rounded-xl border border-eco/20 bg-eco/[0.06] p-4">
                            <p className="text-eco text-sm font-bold mb-2">🚚 Delivery Promise</p>
                            {["Standard (3–5 days) — ₹50", "Express (1–2 days) — ₹99", "Free delivery above ₹500"].map((item) => (
                                <p key={item} className="text-slate-500 text-xs leading-relaxed">• {item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <CartBadge />
        </div>
    );
}
