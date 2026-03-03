"use client";

import { useEffect } from "react";
import { useCartStore, CartItem } from "@/store/cartStore";

interface CartInitializerProps {
    cartItems: CartItem[];
    shippingFee: number;
    discountApplied: number;
}

/**
 * Seeds the Zustand store from SSR-fetched data.
 * Uses seedCart which only fills the store if it's currently empty —
 * so items added via "Add to Cart" on the products page are preserved.
 */
export default function CartInitializer({ cartItems, shippingFee, discountApplied }: CartInitializerProps) {
    const seedCart = useCartStore((s) => s.seedCart);

    useEffect(() => {
        seedCart({ cartItems, shippingFee, discountApplied });
    }, []);

    return null;
}
