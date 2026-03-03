"use client";

/**
 * This component intentionally does NOT seed the cart anymore.
 * Cart items are only added when the user explicitly clicks "Add to Cart"
 * on the /products page. The SSR fetch in page.tsx still runs (demonstrating
 * server-side data fetching) but the cart itself starts empty.
 */
export default function CartInitializer() {
    return null;
}
