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
                <div className="text-center px-4">
                    <div className="text-5xl mb-4 animate-float">📦</div>
                    <p className="text-gray-500 mb-6">Please fill in your shipping address first.</p>
                    <Link href="/shipping"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-all shadow-lg">
                        Enter Address →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-bg min-h-screen px-4 py-8">
            <div className="max-w-5xl mx-auto pb-32">

                {/* Header */}
                <div className="text-center mb-10 animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-wider
                                    bg-green-50 border border-green-200 text-green-700">
                        <span>💳</span> Step 3 — Payment
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Confirm & Pay</h1>
                    <p className="text-gray-500 text-sm">Review your order and choose how you'd like to pay</p>
                </div>

                <StepIndicator currentStep={3} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 animate-fade-up delay-200">
                    <div className="space-y-5">

                        {/* Address preview */}
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
                                <h2 className="font-bold text-gray-700 text-sm flex items-center gap-2"><span>📍</span> Delivery To</h2>
                                <Link href="/shipping"
                                    className="text-xs text-green-600 hover:text-green-700 font-semibold border border-green-200 px-2.5 py-1 rounded-lg hover:bg-green-50 transition-all">
                                    Edit
                                </Link>
                            </div>
                            <div className="p-6">
                                <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        {shippingAddress.label && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                                                {shippingAddress.label}
                                            </span>
                                        )}
                                        <p className="font-bold text-gray-900 text-sm">{shippingAddress.fullName}</p>
                                    </div>
                                    {shippingAddress.addressLine && (
                                        <p className="text-gray-600 text-xs mb-1">{shippingAddress.addressLine}</p>
                                    )}
                                    <p className="text-gray-500 text-xs">{shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}</p>
                                    <p className="text-gray-400 text-[11px] mt-1.5">📞 {shippingAddress.phone} · ✉ {shippingAddress.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment methods */}
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                                <h2 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                                    <span>🔐</span> Payment Method
                                </h2>
                            </div>
                            <div className="p-6 space-y-3">
                                {METHODS.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setSelected(m.id)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer
                                            ${selected === m.id
                                                ? "border-green-400 bg-green-50 shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                                                : "border-gray-200 bg-white hover:border-green-200 hover:bg-green-50/50"
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all
                                            ${selected === m.id ? "border-[5px] border-green-600" : "border-gray-300"}`} />
                                        <span className="text-xl">{m.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm text-gray-900">{m.label}</p>
                                            <p className="text-xs text-gray-500">{m.desc}</p>
                                        </div>
                                        {selected === m.id && (
                                            <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                    <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div><OrderSummary totals={totals} itemCount={totalQty} /></div>
                </div>
            </div>

            {/* ─── Sticky Bar ─── */}
            <div className="sticky-bar fixed bottom-0 left-0 right-0 z-50 px-4 py-4">
                <div className="max-w-5xl mx-auto flex items-center gap-3">
                    <Link href="/shipping"
                        className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-gray-600
                                   border border-gray-200 hover:border-green-300 hover:text-green-700 hover:bg-green-50
                                   transition-all duration-200 text-sm">
                        ← Back
                    </Link>
                    <button
                        onClick={handlePay}
                        disabled={processing}
                        className="flex-1 flex justify-center items-center gap-2.5 py-3.5 rounded-xl font-bold text-white text-sm
                                   bg-green-600 hover:bg-green-700 transition-all duration-200
                                   shadow-[0_4px_16px_rgba(22,163,74,0.3)] hover:-translate-y-0.5
                                   disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                    >
                        {processing ? (
                            <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Processing…</>
                        ) : (
                            <>🔒 Pay Securely — {formatPrice(totals.total)}</>
                        )}
                    </button>
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                    By placing your order you agree to our Terms & Privacy Policy
                </p>
            </div>
        </div>
    );
}
