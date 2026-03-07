"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
    product: {
        product_id: number;
        product_name: string;
        product_price: number;
        image: string;
    };
    compact?: boolean;
}

export default function AddToCartButton({ product, compact }: AddToCartButtonProps) {
    const { addItem, cartItems } = useCartStore();
    const [added, setAdded] = useState(false);

    const inCart = cartItems.find((i) => i.product_id === product.product_id);
    const qty = inCart?.quantity ?? 0;

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    if (compact) {
        // Circular green button as in Medxpress reference
        return (
            <button
                onClick={handleAdd}
                title={added ? "Added!" : "Add to Cart"}
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
                    text-white font-bold text-lg transition-all duration-200 cursor-pointer shadow-md
                    ${added ? "bg-green-400 scale-90" : "bg-green-600 hover:bg-green-700 hover:scale-105"}`}
            >
                {added ? (
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M1 5.5l4 4L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="6" cy="13.5" r="1.25" fill="white" />
                        <circle cx="11.5" cy="13.5" r="1.25" fill="white" />
                        <path d="M1 1.5h2l2 7.5h6.5l1.5-5H4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </button>
        );
    }

    // Full button variant
    return (
        <button
            onClick={handleAdd}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm w-full
                transition-all duration-200 cursor-pointer
                ${added
                    ? "bg-green-500 text-white"
                    : qty > 0
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "bg-green-600 text-white hover:bg-green-700 shadow-[0_2px_8px_rgba(22,163,74,0.3)]"
                }`}
        >
            {added ? "✓ Added!" : qty > 0 ? `🛒 In Cart (${qty})` : "Add To Cart"}
        </button>
    );
}
