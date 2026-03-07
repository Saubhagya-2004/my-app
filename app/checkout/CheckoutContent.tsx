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
        <>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 animate-fade-up delay-200 pb-32">
                {/* Cart items card */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <span>🛒</span>
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Items in Cart</h2>
                            {cartItems.length > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-[10px] font-bold">
                                    {totalQty}
                                </span>
                            )}
                        </div>
                        <Link href="/products"
                            className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors flex items-center gap-1">
                            + Add more
                        </Link>
                    </div>

                    <div className="p-6">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="animate-float inline-block text-6xl mb-5">🌿</div>
                                <p className="text-gray-600 font-medium mb-2">Your cart is empty</p>
                                <p className="text-gray-400 text-sm mb-7">Add eco-friendly products to get started</p>
                                <Link href="/products"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-green-600
                                               hover:bg-green-700 transition-all shadow-lg text-sm hover:-translate-y-0.5">
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

                        <div className="mt-5 px-4 py-2.5 rounded-xl flex items-center gap-2 bg-green-50 border border-green-100">
                            <span className="text-green-600 text-sm">⚡</span>
                            <span className="text-green-700 text-[11px] font-medium">Cart synced via Server-Side Rendering</span>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div>
                    <OrderSummary totals={totals} itemCount={totalQty} />
                </div>
            </div>

            {/* ─── Sticky Bar ─── */}
            <div className="sticky-bar fixed bottom-0 left-0 right-0 z-50 px-4 py-4">
                <div className="max-w-5xl mx-auto flex items-center gap-3">
                    <Link href="/products"
                        className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-gray-600
                                   border border-gray-200 hover:border-green-300 hover:text-green-700 hover:bg-green-50
                                   transition-all duration-200 text-sm">
                        ← Back
                    </Link>
                    {cartItems.length > 0 ? (
                        <Link href="/shipping"
                            className="flex-1 flex justify-center items-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm
                                       bg-green-600 hover:bg-green-700 transition-all duration-200
                                       shadow-[0_4px_16px_rgba(22,163,74,0.3)] hover:-translate-y-0.5">
                            Next Step: Shipping Details →
                        </Link>
                    ) : (
                        <div className="flex-1 flex justify-center items-center py-3.5 rounded-xl text-gray-400
                                        bg-gray-100 border border-gray-200 text-sm cursor-not-allowed">
                            Add items to continue
                        </div>
                    )}
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                    🔒 256-bit SSL encryption · Your data is always safe
                </p>
            </div>
        </>
    );
}
