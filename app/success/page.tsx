"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, calculateTotal } from "@/lib/calculateTotal";

function generateOrderId() {
    return "ECO" + Math.floor(Math.random() * 900000 + 100000);
}

export default function SuccessPage() {
    const { cartItems, shippingFee, discountApplied, shippingAddress, paymentMethod, resetOrder } = useCartStore();
    const [orderId] = useState(generateOrderId);
    const [showItems, setShowItems] = useState(false);

    const totals = calculateTotal(cartItems, shippingFee, discountApplied);

    useEffect(() => {
        const t = setTimeout(() => setShowItems(true), 700);
        return () => clearTimeout(t);
    }, []);

    const deliveryDate = new Date(Date.now() + 4 * 86400000).toLocaleDateString("en-IN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    const payLabel = { card: "Credit / Debit Card", upi: "UPI", cod: "Cash on Delivery" }[paymentMethod ?? ""] ?? "Online Payment";

    return (
        <div className="page-bg min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full">
                {/* Icon */}
                <div className="animate-pop flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-eco/15 border-2 border-eco/40 flex items-center justify-center text-5xl shadow-[0_0_60px_rgba(16,185,129,0.25)] mb-5">
                        ✅
                    </div>
                    <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-eco to-brand bg-clip-text text-transparent mb-2">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-slate-400 text-sm text-center">Thank you for shopping sustainably. Your order is on its way!</p>
                </div>

                {/* Order card */}
                <div className="animate-fade-up delay-200 rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-7 mb-5">
                    <div className="flex justify-between items-start mb-5">
                        <div>
                            <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Order ID</p>
                            <p className="font-black text-xl text-brand tracking-wide">#{orderId}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-eco/12 border border-eco/25 text-eco text-xs font-bold">
                            ● Confirmed
                        </span>
                    </div>

                    <div className="h-px bg-white/8 mb-5" />

                    <div className="grid grid-cols-2 gap-4 mb-5">
                        {[
                            { label: "Estimated Delivery", value: deliveryDate },
                            { label: "Payment Method", value: payLabel },
                            { label: "Amount Paid", value: formatPrice(totals.total) },
                            { label: "Deliver To", value: shippingAddress ? `${shippingAddress.city}, ${shippingAddress.state}` : "—" },
                        ].map((d) => (
                            <div key={d.label}>
                                <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">{d.label}</p>
                                <p className="font-semibold text-sm text-slate-200">{d.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Items list */}
                    {showItems && cartItems.length > 0 && (
                        <div className="animate-fade-up">
                            <div className="h-px bg-white/8 mb-4" />
                            <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-3">Items Ordered</p>
                            <div className="space-y-2">
                                {cartItems.map((item) => (
                                    <div key={item.product_id} className="flex items-center gap-3">
                                        <span className="px-1.5 py-0.5 rounded bg-brand/20 text-brand text-[10px] font-bold">×{item.quantity}</span>
                                        <span className="text-sm text-slate-400 flex-1 truncate">{item.product_name}</span>
                                        <span className="text-sm font-semibold text-slate-200">{formatPrice(item.product_price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="animate-fade-up delay-300 space-y-3">
                    <Link
                        href="/"
                        onClick={resetOrder}
                        className="flex justify-center items-center gap-2 w-full py-4 rounded-xl font-bold text-white
                       bg-gradient-to-r from-brand to-brand-dark shadow-[0_4px_16px_rgba(99,102,241,0.4)]
                       hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,102,241,0.55)] transition-all"
                    >
                         Continue Shopping
                    </Link>
                    {shippingAddress && (
                        <p className="text-center text-xs text-slate-600">
                            📧 Confirmation sent to <strong className="text-slate-400">{shippingAddress.email}</strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
