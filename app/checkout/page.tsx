import CartInitializer from "./CartInitializer";
import CheckoutContent from "./CheckoutContent";
import StepIndicator from "@/components/StepIndicator";
import CartBadge from "@/components/CartBadge";
import Link from "next/link";
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
            {/* SSR data fetched above — SSR badge shown in CheckoutContent */}
            <CartInitializer />

            <div className="max-w-5xl mx-auto">
                {/* Nav */}
                <div className="flex justify-between items-center mb-4 animate-fade-up">
                    <Link
                        href="/"
                        className="text-sm text-slate-400 border border-white/10 px-3.5 py-2 rounded-lg
                       hover:border-white/20 hover:text-slate-200 transition-all"
                    >
                        ← Home
                    </Link>
                    <span className="text-xs text-slate-600 border border-white/8 px-3 py-1.5 rounded-full">
                        🌿 Eco-certified products
                    </span>
                </div>

                <h1 className="animate-fade-up delay-100 text-3xl font-black tracking-tight text-center mb-1">
                    Your Cart
                </h1>
                <p className="animate-fade delay-100 text-slate-500 text-sm text-center mb-8">
                    Review your items before checkout
                </p>

                <StepIndicator currentStep={1} />

                {/* Client component reads live Zustand store */}
                <CheckoutContent
                    shippingFee={data.shipping_fee}
                    discountApplied={data.discount_applied}
                />
            </div>

            <CartBadge />
        </div>
    );
}
