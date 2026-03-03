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
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem, cartItems } = useCartStore();
    const [added, setAdded] = useState(false);

    const inCart = cartItems.find((i) => i.product_id === product.product_id);
    const qty = inCart?.quantity ?? 0;

    const handleAdd = () => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <button
            onClick={handleAdd}
            className={`
        flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm
        transition-all duration-200 cursor-pointer border-0 outline-none
        ${added
                    ? "bg-eco text-white shadow-[0_4px_16px_rgba(16,185,129,0.45)] scale-95"
                    : "bg-brand text-white shadow-[0_2px_10px_rgba(99,102,241,0.35)] hover:bg-brand-dark hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(99,102,241,0.5)]"
                }
      `}
        >
            {added ? (
                <>✓ Added!</>
            ) : qty > 0 ? (
                <>🛒 In Cart ({qty})</>
            ) : (
                <>Add to Cart</>
            )}
        </button>
    );
}
