import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import CartBadge from "@/components/CartBadge";

const ALL_PRODUCTS = [
    {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        category: "Personal Care",
        rating: 4.8,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop",
        badge: "Best Seller",
        badge_color: "bg-brand",
        description: "Biodegradable bamboo handle with BPA-free nylon bristles.",
    },
    {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        category: "Kitchen",
        rating: 4.6,
        reviews: 185,
        image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400&h=400&fit=crop",
        badge: "Eco Pick",
        badge_color: "bg-eco",
        description: "Set of 6 organic cotton mesh bags — replace plastic forever.",
    },
    {
        product_id: 103,
        product_name: "Stainless Steel Water Bottle",
        product_price: 799,
        category: "Drinkware",
        rating: 4.9,
        reviews: 540,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
        badge: "Top Rated",
        badge_color: "bg-warning",
        description: "Double-wall insulated, keeps cold 24h and hot 12h.",
    },
    {
        product_id: 104,
        product_name: "Beeswax Food Wraps (3-pack)",
        product_price: 349,
        category: "Kitchen",
        rating: 4.5,
        reviews: 97,
        image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=400&fit=crop",
        badge: null,
        badge_color: "",
        description: "Natural alternative to cling wrap. Washable and reusable.",
    },
    {
        product_id: 105,
        product_name: "Organic Coconut Shell Bowl Set",
        product_price: 599,
        category: "Kitchen",
        rating: 4.7,
        reviews: 231,
        image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop",
        badge: "New",
        badge_color: "bg-eco",
        description: "Handcrafted from reclaimed coconut shells. Set of 4.",
    },
    {
        product_id: 106,
        product_name: "Natural Loofah Sponge (2-pack)",
        product_price: 199,
        category: "Personal Care",
        rating: 4.4,
        reviews: 68,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
        badge: null,
        badge_color: "",
        description: "100% plant-based loofah. Biodegradable and plastic-free.",
    },
];

export const metadata = {
    title: "Shop Products — EcoMart",
    description: "Browse our curated range of eco-friendly, sustainable products.",
};

export default function ProductsPage() {
    return (
        <div className="page-bg min-h-screen px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Nav */}
                <div className="flex justify-between items-center mb-10 animate-fade-up">
                    <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 border border-white/10 px-3.5 py-2 rounded-lg hover:border-white/20 hover:text-slate-200 transition-all">
                        ← Back to Home
                    </Link>
                    <Link href="/checkout" className="flex items-center gap-2 text-sm font-semibold text-white bg-brand px-4 py-2 rounded-lg shadow-[0_2px_8px_rgba(99,102,241,0.4)] hover:bg-brand-dark transition-all">
                        🛒 View Cart
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-12 animate-fade-up delay-100">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-eco/10 border border-eco/20 text-eco text-xs font-bold uppercase tracking-wider">
                        🌿 {ALL_PRODUCTS.length} Eco-Certified Products
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 bg-gradient-to-r from-slate-100 to-brand bg-clip-text text-transparent">
                        Browse Products
                    </h1>
                    <p className="text-slate-400 text-base">Handpicked sustainable essentials for everyday living</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-up delay-200">
                    {ALL_PRODUCTS.map((p) => (
                        <div
                            key={p.product_id}
                            className="flex flex-col rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl overflow-hidden hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img src={p.image} alt={p.product_name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark/80 to-transparent" />
                                {/* Category */}
                                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-dark/70 backdrop-blur text-slate-400 text-[10px] font-semibold border border-white/10">
                                    {p.category}
                                </span>
                                {/* Badge */}
                                {p.badge && (
                                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full ${p.badge_color} text-white text-[10px] font-bold`}>
                                        {p.badge}
                                    </span>
                                )}
                            </div>

                            {/* Body */}
                            <div className="flex flex-col flex-1 p-5 gap-3">
                                {/* Stars */}
                                <div className="flex items-center gap-2">
                                    <span className="text-warning text-sm tracking-wide">{"★".repeat(Math.floor(p.rating))}</span>
                                    <span className="text-slate-500 text-xs">{p.rating} ({p.reviews})</span>
                                </div>

                                <h3 className="font-bold text-slate-100 leading-snug">{p.product_name}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed flex-1">{p.description}</p>

                                {/* Price + CTA */}
                                <div className="flex items-end justify-between mt-1">
                                    <div>
                                        <p className="text-2xl font-black text-slate-100 tracking-tight">
                                            ₹{p.product_price.toLocaleString("en-IN")}
                                        </p>
                                        <p className="text-[10px] text-slate-600">incl. of all taxes</p>
                                    </div>
                                    {/* Real Add to Cart — client component */}
                                    <AddToCartButton
                                        product={{
                                            product_id: p.product_id,
                                            product_name: p.product_name,
                                            product_price: p.product_price,
                                            image: p.image,
                                        }}
                                    />
                                </div>

                                {/* Footer */}
                                <div className="flex items-center gap-3 pt-3 border-t border-white/8 text-[11px]">
                                    <span className="text-eco">🌿 Eco-certified</span>
                                    <span className="text-white/20">·</span>
                                    <span className="text-slate-500">Free returns</span>
                                    <span className="text-white/20">·</span>
                                    <span className="text-slate-500">Fast delivery</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-14 text-center p-8 rounded-2xl bg-brand/8 border border-brand/15 animate-fade-up delay-300">
                    <p className="font-bold text-lg mb-2">Ready to checkout?</p>
                    <p className="text-slate-400 text-sm mb-5">Go to your cart to review items and place your order.</p>
                    <Link href="/checkout" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand to-brand-dark shadow-[0_4px_16px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,102,241,0.55)] transition-all">
                        🛒 Proceed to Cart →
                    </Link>
                </div>
            </div>

            {/* Floating cart bubble */}
            <CartBadge />
        </div>
    );
}
