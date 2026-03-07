import CartInitializer from "./CartInitializer";
import CheckoutContent from "./CheckoutContent";
import StepIndicator from "@/components/StepIndicator";
import { headers } from "next/headers";
import type { CartItem } from "@/store/cartStore";

interface CartApiResponse {
    cartItems: CartItem[];
    shipping_fee: number;
    discount_applied: number;
}

async function fetchCartData(): Promise<CartApiResponse> {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch cart");
    return res.json();
}

export const metadata = { title: "Your Cart — EcoMart" };

export default async function CheckoutPage() {
    const data = await fetchCartData();

    return (
        <div className="page-bg min-h-screen px-4 py-8">
            <CartInitializer />
            <div className="max-w-5xl mx-auto">

                {/* Page header */}
                <div className="text-center mb-10 animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-wider
                                    bg-green-50 border border-green-200 text-green-700">
                        <span className="animate-leaf inline-block">🌿</span> Step 1 — Your Cart
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
                        Review Your Order
                    </h1>
                    <p className="text-gray-500 text-sm">Confirm your items before moving to delivery</p>
                </div>

                <StepIndicator currentStep={1} />

                <CheckoutContent
                    shippingFee={data.shipping_fee}
                    discountApplied={data.discount_applied}
                />
            </div>
        </div>
    );
}
