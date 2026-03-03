"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

/** Floating cart bubble shown on all pages */
export default function CartBadge() {
    const cartItems = useCartStore((s) => s.cartItems);
    const total = cartItems.reduce((s, i) => s + i.product_price * i.quantity, 0);
    const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

    if (totalQty === 0) return null;

    return (
        <Link
            href="/checkout"
            className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-3 px-5 py-3.5
        bg-brand text-white font-semibold text-sm
        rounded-2xl shadow-[0_8px_32px_rgba(99,102,241,0.5)]
        hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(99,102,241,0.6)]
        transition-all duration-200 animate-slide-down
      "
        >
            <span className="relative">
                🛒
                <span className="
          absolute -top-2 -right-2.5
          bg-eco text-white text-[10px] font-black
          w-5 h-5 rounded-full flex items-center justify-center
          shadow-[0_0_8px_rgba(16,185,129,0.6)]
        ">
                    {totalQty}
                </span>
            </span>
            <span>
                Cart · ₹{total.toLocaleString("en-IN")}
            </span>
        </Link>
    );
}
