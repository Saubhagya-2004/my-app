"use client";

import { useState } from "react";
import AddressForm from "@/components/AddressForm";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";
import { useCartStore } from "@/store/cartStore";
import { calculateTotal } from "@/lib/calculateTotal";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
    const { cartItems, shippingFee, discountApplied, savedAddresses, activeAddressIndex } = useCartStore();
    const totals = calculateTotal(cartItems, shippingFee, discountApplied);
    const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
    const router = useRouter();
    const [navigating, setNavigating] = useState(false);

    const handleAddressSaved = async () => {
        setNavigating(true);
        await new Promise((r) => setTimeout(r, 300));
        router.push("/payment");
    };

    const handleNext = () => {
        if (savedAddresses.length > 0 && activeAddressIndex >= 0) {
            (document.getElementById("use-selected-address-btn") as HTMLButtonElement)?.click();
        } else {
            document.querySelector<HTMLFormElement>("#shipping-address-form")?.requestSubmit();
        }
    };

    const canProceed = savedAddresses.length > 0 && activeAddressIndex >= 0;

    return (
        <div className="page-bg min-h-screen px-4 py-8">
            <div className="max-w-5xl mx-auto pb-32">

                {/* Header */}
                <div className="text-center mb-10 animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-wider
                                    bg-green-50 border border-green-200 text-green-700">
                        <span className="animate-leaf inline-block">🌿</span> Step 2 — Delivery Details
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
                        Where should we deliver?
                    </h1>
                    <p className="text-gray-500 text-sm">We ship eco-consciously to every PIN code across India</p>
                </div>

                <StepIndicator currentStep={2} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 animate-fade-up delay-200">
                    {/* Form card */}
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 px-7 py-5 bg-gray-50 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-green-100 border border-green-200 flex items-center justify-center text-sm">
                                📦
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 text-sm">Delivery Address</h2>
                                <p className="text-gray-400 text-xs">Saved addresses are auto-filled for speed</p>
                            </div>
                        </div>
                        <div className="p-7">
                            <AddressForm onAddressSaved={handleAddressSaved} />
                        </div>
                    </div>

                    {/* Right col */}
                    <div className="flex flex-col gap-4">
                        <OrderSummary totals={totals} itemCount={totalQty} />

                        {/* Delivery options */}
                        <div className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm">
                            <p className="text-green-700 font-bold text-sm mb-3 flex items-center gap-2">
                                <span>🚚</span> Delivery Options
                            </p>
                            {[
                                { label: "Standard Delivery", time: "3–5 days", price: "₹50" },
                                { label: "Express Delivery", time: "1–2 days", price: "₹99" },
                                { label: "Free on orders above", time: "₹500+", price: "FREE" },
                            ].map((d) => (
                                <div key={d.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                    <div>
                                        <p className="text-gray-700 text-xs font-medium">{d.label}</p>
                                        <p className="text-gray-400 text-[10px]">{d.time}</p>
                                    </div>
                                    <span className={`text-xs font-bold ${d.price === "FREE" ? "text-green-600" : "text-gray-500"}`}>
                                        {d.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Sticky Bar ─── */}
            <div className="sticky-bar fixed bottom-0 left-0 right-0 z-50 px-4 py-4">
                <div className="max-w-5xl mx-auto flex items-center gap-3">
                    <Link href="/checkout"
                        className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-gray-600
                                   border border-gray-200 hover:border-green-300 hover:text-green-700 hover:bg-green-50
                                   transition-all duration-200 text-sm">
                        ← Back
                    </Link>
                    <button
                        onClick={handleNext}
                        disabled={navigating}
                        className={`flex-1 flex justify-center items-center gap-2 py-3.5 rounded-xl font-bold text-sm
                                    transition-all duration-200 cursor-pointer
                                    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                                    ${canProceed
                                ? "text-white bg-green-600 hover:bg-green-700 shadow-[0_4px_16px_rgba(22,163,74,0.3)] hover:-translate-y-0.5"
                                : "text-gray-600 border border-gray-200 bg-white hover:border-green-300 hover:bg-green-50"
                            }`}
                    >
                        {navigating
                            ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving…</>
                            : canProceed ? "Next Step: Payment →" : "Save Address & Continue →"
                        }
                    </button>
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                    🔒 Your address is encrypted and never shared
                </p>
            </div>
        </div>
    );
}
