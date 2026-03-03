"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { calculateTotal, formatPrice } from "@/lib/calculateTotal";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";
import Link from "next/link";

type PayMethod = "card" | "upi" | "cod";

const METHODS: { id: PayMethod; icon: string; label: string; desc: string }[] = [
    { id: "card", icon: "💳", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
    { id: "upi", icon: "📱", label: "UPI", desc: "GPay, PhonePe, Paytm" },
    { id: "cod", icon: "🏚️", label: "Cash on Delivery", desc: "Pay when it arrives" },
];

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, shippingFee, discountApplied, shippingAddress, setPaymentMethod } = useCartStore();
    const [selected, setSelected] = useState<PayMethod>("card");
    const [processing, setProcessing] = useState(false);

    const totals = calculateTotal(cartItems, shippingFee, discountApplied);
    const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

    const handlePay = async () => {
        setProcessing(true);
        setPaymentMethod(selected);
        await new Promise((r) => setTimeout(r, 1800));
        router.push("/success");
    };

    if (!shippingAddress) {
        return (
            <div className="page-bg min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-400 mb-4">Please fill in your shipping address first.</p>
                    <Link href="/shipping" className="px-6 py-3 rounded-xl font-bold text-white bg-brand hover:bg-brand-dark transition-colors">
                        Enter Address →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-bg min-h-screen px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-2 animate-fade-up">
                    <Link href="/shipping" className="text-sm text-slate-400 border border-white/10 px-3.5 py-2 rounded-lg hover:border-white/20 hover:text-slate-200 transition-all inline-flex items-center">
                        ← Back to Shipping
                    </Link>
                </div>

                <h1 className="animate-fade-up delay-100 text-3xl font-black tracking-tight text-center mb-1">
                    Payment &amp; Confirmation
                </h1>
                <p className="animate-fade delay-100 text-slate-500 text-sm text-center mb-8">
                    Review your order and choose a payment method
                </p>

                <StepIndicator currentStep={3} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 animate-fade-up delay-200">
                    <div className="space-y-5">
                        {/* Address review */}
                        <div className="rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-sm">📍 Delivery To</h2>
                                <Link href="/shipping" className="text-xs text-brand hover:text-brand/80 font-semibold">Edit</Link>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-1">
                                <p className="font-bold text-slate-100 text-sm">{shippingAddress.fullName}</p>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}<br />
                                    📞 {shippingAddress.phone} · ✉ {shippingAddress.email}
                                </p>
                            </div>
                        </div>

                        {/* Payment methods */}
                        <div className="rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6">
                            <h2 className="font-bold text-sm mb-4">💳 Payment Method</h2>
                            <div className="space-y-3">
                                {METHODS.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setSelected(m.id)}
                                        className={`
                      w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer
                      ${selected === m.id
                                                ? "border-brand bg-brand/10 shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
                                                : "border-white/10 bg-white/[0.02] hover:border-brand/40 hover:bg-brand/5"
                                            }
                    `}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${selected === m.id ? "border-[5px] border-brand" : "border-white/30"}`} />
                                        <span className="text-xl">{m.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm text-slate-100">{m.label}</p>
                                            <p className="text-xs text-slate-500">{m.desc}</p>
                                        </div>
                                        {selected === m.id && <span className="text-eco text-sm">✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pay button */}
                        <button
                            onClick={handlePay}
                            disabled={processing}
                            className="w-full py-5 rounded-xl font-bold text-white text-base flex items-center justify-center gap-3
                         bg-gradient-to-r from-eco to-eco-dark shadow-[0_4px_16px_rgba(16,185,129,0.4)]
                         hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.55)]
                         transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                        >
                            {processing ? (
                                <>
                                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Processing…
                                </>
                            ) : (
                                <>🔒 Pay Securely — {formatPrice(totals.total)}</>
                            )}
                        </button>

                        <p className="text-center text-xs text-slate-600">
                            By placing your order you agree to our Terms & Privacy Policy.
                        </p>
                    </div>

                    <div>
                        <OrderSummary totals={totals} itemCount={totalQty} />
                    </div>
                </div>
            </div>
        </div>
    );
}
