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
        const t = setTimeout(() => setShowItems(true), 600);
        return () => clearTimeout(t);
    }, []);

    const deliveryDate = new Date(Date.now() + 4 * 86400000).toLocaleDateString("en-IN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    const payLabel = { card: "Credit / Debit Card", upi: "UPI", cod: "Cash on Delivery" }[paymentMethod ?? ""] ?? "Online Payment";

    return (
        <div className="page-bg min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full">

                {/* Success Icon */}
                <div className="animate-pop flex flex-col items-center mb-10">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center text-4xl animate-glow">
                            ✅
                        </div>
                        <span className="absolute inset-0 rounded-full border-2 border-green-400 pulse-ring" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-100 mb-2 text-center">
                        Order Placed <span className="text-green-600">Successfully!</span>
                    </h1>
                    <p className="text-gray-500 text-sm text-center max-w-xs">
                        Thank you for shopping sustainably. Your package is being prepared with care 🌿
                    </p>
                </div>

                {/* Order Card */}
                <div className="animate-fade-up delay-200 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-5">
                    {/* Card header */}
                    <div className="px-7 py-5 flex justify-between items-center bg-gray-50 border-b border-gray-100">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                            <p className="font-black text-xl tracking-wide text-green-600">#{orderId}</p>
                        </div>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                                         bg-green-100 border border-green-200 text-green-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                            Confirmed
                        </span>
                    </div>

                    <div className="p-7">
                        {/* Details grid */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-6">
                            {[
                                { label: "Estimated Delivery", value: deliveryDate, icon: "📅" },
                                { label: "Payment Method", value: payLabel, icon: "💳" },
                                { label: "Amount Paid", value: formatPrice(totals.total), icon: "💰" },
                                { label: "Deliver To", value: shippingAddress ? `${shippingAddress.city}, ${shippingAddress.state}` : "—", icon: "📍" },
                            ].map((d) => (
                                <div key={d.label}>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                        <span>{d.icon}</span>{d.label}
                                    </p>
                                    <p className="font-semibold text-sm text-gray-700">{d.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Full address */}
                        {shippingAddress?.addressLine && (
                            <div className="mb-6 p-3.5 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
                                <span className="text-green-600 text-sm mt-0.5">🏠</span>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Full Address</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {shippingAddress.addressLine}, {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Items */}
                        {showItems && cartItems.length > 0 && (
                            <div className="animate-fade-up">
                                <div className="h-px bg-gray-100 mb-5" />
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                                    <span>🛍️</span> Items Ordered
                                </p>
                                <div className="space-y-2">
                                    {cartItems.map((item) => (
                                        <div key={item.product_id} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
                                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-100 text-green-700">×{item.quantity}</span>
                                            <span className="text-sm text-gray-600 flex-1 truncate">{item.product_name}</span>
                                            <span className="text-sm font-bold text-gray-900">{formatPrice(item.product_price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="animate-fade-up delay-400 space-y-3">
                    <Link
                        href="/checkout"
                        onClick={resetOrder}
                        className="flex justify-center items-center gap-2 w-full py-4 rounded-xl font-bold text-white
                                   bg-green-600 hover:bg-green-700 transition-all shadow-[0_4px_16px_rgba(22,163,74,0.3)]
                                   hover:-translate-y-0.5"
                    >
                        🌿 Continue Shopping
                    </Link>
                    {shippingAddress && (
                        <p className="text-center text-xs text-gray-400">
                            📧 Confirmation sent to{" "}
                            <strong className="text-gray-600">{shippingAddress.email}</strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
