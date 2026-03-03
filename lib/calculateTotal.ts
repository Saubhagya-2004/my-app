import { CartItem } from "@/store/cartStore";

export interface OrderTotals {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
}

export function calculateTotal(
    items: CartItem[],
    shippingFee: number,
    discountApplied: number
): OrderTotals {
    const subtotal = items.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const total = subtotal + shippingFee - discountApplied;

    return {
        subtotal,
        discount: discountApplied,
        shipping: shippingFee,
        total,
    };
}

export function formatPrice(amount: number): string {
    return `₹${amount.toLocaleString("en-IN")}`;
}
