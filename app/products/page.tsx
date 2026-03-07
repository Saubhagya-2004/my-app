"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import CartBadge from "@/components/CartBadge";

const ALL_PRODUCTS = [
    {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        original_price: 450,
        category: "Personal Care",
        rating: 4.8,
        reviews: 312,
        image: "/products/bamboo-toothbrush.png",
        badge: "25% OFF",
        description: "Biodegradable bamboo handle with BPA-free nylon bristles. Compostable packaging.",
    },
    {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        original_price: 600,
        category: "Kitchen",
        rating: 4.6,
        reviews: 185,
        image: "/products/cotton-bags.png",
        badge: null,
        description: "Set of 6 organic cotton mesh bags — replace plastic forever.",
    },
    {
        product_id: 103,
        product_name: "Stainless Steel Water Bottle",
        product_price: 799,
        original_price: 999,
        category: "Drinkware",
        rating: 4.9,
        reviews: 540,
        image: "/products/water-bottle.png",
        badge: "20% OFF",
        description: "Double-wall insulated, keeps cold 24h and hot 12h. BPA-free.",
    },
    {
        product_id: 104,
        product_name: "Beeswax Food Wraps (3-pack)",
        product_price: 349,
        original_price: 499,
        category: "Kitchen",
        rating: 4.5,
        reviews: 97,
        image: "/products/beeswax-wraps.png",
        badge: null,
        description: "Natural alternative to cling wrap. Washable and reusable up to 1 year.",
    },
    {
        product_id: 105,
        product_name: "Organic Coconut Shell Bowl Set",
        product_price: 599,
        original_price: 799,
        category: "Kitchen",
        rating: 4.7,
        reviews: 231,
        image: "/products/coconut-bowls.png",
        badge: "25% OFF",
        description: "Handcrafted from reclaimed coconut shells. Set of 4 bowls.",
    },
    {
        product_id: 106,
        product_name: "Natural Loofah Sponge (2-pack)",
        product_price: 199,
        original_price: 299,
        category: "Personal Care",
        rating: 4.4,
        reviews: 68,
        image: "/products/loofah.png",
        badge: null,
        description: "100% plant-based loofah. Biodegradable and plastic-free.",
    },
    {
        product_id: 107,
        product_name: "Compostable Trash Bags (100pcs)",
        product_price: 389,
        original_price: 499,
        category: "Home & Living",
        rating: 4.3,
        reviews: 144,
        image: "/products/trash-bags.png",
        badge: "22% OFF",
        description: "Made from plant-based materials. Fully compostable in 90 days.",
    },
    {
        product_id: 108,
        product_name: "Organic Cotton Tote Bag",
        product_price: 249,
        original_price: 349,
        category: "Home & Living",
        rating: 4.6,
        reviews: 201,
        image: "/products/tote-bag.png",
        badge: null,
        description: "Heavy-duty canvas tote. Replaces 500+ plastic bags over its lifetime.",
    },
    {
        product_id: 109,
        product_name: "Solar LED Garden Lights (6-pack)",
        product_price: 1299,
        original_price: 1699,
        category: "Home & Living",
        rating: 4.5,
        reviews: 88,
        image: "/products/solar-lights.png",
        badge: "24% OFF",
        description: "Weatherproof solar-powered pathway lights. Auto on/off at dusk.",
    },
    {
        product_id: 110,
        product_name: "Natural Soy Wax Candle",
        product_price: 449,
        original_price: 599,
        category: "Home & Living",
        rating: 4.8,
        reviews: 315,
        image: "/products/soy-candle.png",
        badge: "25% OFF",
        description: "Clean-burning soy wax with cotton wick. 50-hour burn time. Lavender scent.",
    },
    {
        product_id: 111,
        product_name: "Recycled Kraft Notebook (A5)",
        product_price: 179,
        original_price: 249,
        category: "Stationery",
        rating: 4.4,
        reviews: 56,
        image: "/products/notebook.png",
        badge: null,
        description: "100% recycled paper, acid-free pages. 200 ruled pages.",
    },
    {
        product_id: 112,
        product_name: "Herbal Organic Lip Balm (4-pack)",
        product_price: 299,
        original_price: 399,
        category: "Personal Care",
        rating: 4.7,
        reviews: 189,
        image: "/products/lip-balm.png",
        badge: "25% OFF",
        description: "All-natural beeswax and shea butter. SPF 15. No parabens.",
    },
    {
        product_id: 113,
        product_name: "Organic Himalayan Green Tea (100g)",
        product_price: 349,
        original_price: 449,
        category: "Food & Wellness",
        rating: 4.9,
        reviews: 412,
        image: "/products/green-tea.png",
        badge: "22% OFF",
        description: "Single-origin, hand-picked Himalayan green tea. Rich in antioxidants.",
    },
    {
        product_id: 114,
        product_name: "Bamboo Cutting Board (Large)",
        product_price: 699,
        original_price: 899,
        category: "Kitchen",
        rating: 4.6,
        reviews: 273,
        image: "/products/cutting-board.png",
        badge: "22% OFF",
        description: "Antibacterial bamboo. Knife-friendly surface. Easy to clean.",
    },
    {
        product_id: 115,
        product_name: "Plant-Based Dish Soap (500ml)",
        product_price: 219,
        original_price: 299,
        category: "Kitchen",
        rating: 4.5,
        reviews: 134,
        image: "/products/dish-soap.png",
        badge: null,
        description: "Made from coconut and corn-derived surfactants. Biodegradable formula.",
    },
    {
        product_id: 116,
        product_name: "Hemp Yoga Mat (6mm)",
        product_price: 1499,
        original_price: 1999,
        category: "Fitness",
        rating: 4.8,
        reviews: 97,
        image: "/products/yoga-mat.png",
        badge: "25% OFF",
        description: "Non-slip hemp + natural rubber yoga mat. Sweat-absorbing and odor-free.",
    },
    {
        product_id: 117,
        product_name: "Bamboo Charcoal Air Purifier Bag",
        product_price: 269,
        original_price: 349,
        category: "Home & Living",
        rating: 4.3,
        reviews: 77,
        image: "/products/charcoal-bag.png",
        badge: null,
        description: "Natural activated charcoal absorbs odours and moisture. Lasts 2 years.",
    },
    {
        product_id: 118,
        product_name: "Organic Aloe Vera Gel (200ml)",
        product_price: 199,
        original_price: 279,
        category: "Personal Care",
        rating: 4.7,
        reviews: 523,
        image: "/products/aloe-vera.png",
        badge: "29% OFF",
        description: "Pure cold-pressed aloe vera. Soothes sunburn, moisturises, no alcohol.",
    },
];

const CATEGORIES = ["All Products", "Personal Care", "Kitchen", "Drinkware", "Home & Living", "Stationery", "Food & Wellness", "Fitness"];

const TOP_SELLING_IDS = [101, 103, 113, 116, 110, 112];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8.1 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z"
                        fill={i <= Math.floor(rating) ? "#f59e0b" : "#e5e7eb"} />
                </svg>
            ))}
            <span className="text-[10px] text-gray-400 ml-1">({rating})</span>
        </div>
    );
}

function TrendingCard({ p }: { p: typeof ALL_PRODUCTS[0] }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col hover:border-green-200 hover:shadow-md transition-all duration-200 group">
            <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2">
                <img src={p.image} alt={p.product_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                {p.badge && (
                    <span className="absolute top-1.5 left-1.5 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        {p.badge}
                    </span>
                )}
            </div>
            <StarRating rating={p.rating} />
            <p className="text-gray-700 text-xs font-medium leading-snug mt-1 mb-2 line-clamp-2 flex-1">{p.product_name}</p>
            <div className="flex items-center justify-between gap-1">
                <div>
                    <p className="text-[10px] text-gray-400 line-through">₹{p.original_price.toLocaleString("en-IN")}</p>
                    <p className="text-sm font-black text-gray-900">₹{p.product_price.toLocaleString("en-IN")}</p>
                </div>
                <AddToCartButton
                    product={{ product_id: p.product_id, product_name: p.product_name, product_price: p.product_price, image: p.image }}
                    compact
                />
            </div>
        </div>
    );
}

function TopSellingCard({ p }: { p: typeof ALL_PRODUCTS[0] }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all duration-200">
            <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                <img src={p.image} alt={p.product_name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{p.product_name}</p>
                <StarRating rating={p.rating} />
                <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs font-black text-gray-900">₹{p.product_price.toLocaleString("en-IN")}</p>
                    <p className="text-[10px] text-gray-400 line-through">₹{p.original_price.toLocaleString("en-IN")}</p>
                </div>
            </div>
            <AddToCartButton
                product={{ product_id: p.product_id, product_name: p.product_name, product_price: p.product_price, image: p.image }}
                compact
            />
        </div>
    );
}

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Products");

    const filteredProducts = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return ALL_PRODUCTS.filter((p) => {
            const matchCat = activeCategory === "All Products" || p.category === activeCategory;
            const matchSearch = !q ||
                p.product_name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q);
            return matchCat && matchSearch;
        });
    }, [searchQuery, activeCategory]);

    const topSelling = useMemo(() =>
        ALL_PRODUCTS.filter((p) => TOP_SELLING_IDS.includes(p.product_id)),
        []
    );

    const showingAll = !searchQuery && activeCategory === "All Products";

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <Link href="/checkout" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shadow-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6 2 3 7 3 12c0 3.5 1.5 6.5 4 8.5 1 .7 2 1 3 .5l2-1c1-.5 2-.5 3 0l2 1c1 .5 2 .2 3-.5 2.5-2 4-5 4-8.5 0-5-3-10-9-10z" fill="white" fillOpacity="0.3" />
                                <path d="M12 22V12M12 12C12 12 8 9 7 6M12 12C12 12 16 9 17 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="5" r="1.5" fill="white" />
                            </svg>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-black text-gray-900 text-sm leading-none block">EcoMart</span>
                            <span className="text-[9px] text-green-600 font-semibold leading-none">🌿 Sustainable</span>
                        </div>
                    </Link>

                    <div className="flex-1 max-w-xl relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search eco-friendly products..."
                            className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 bg-gray-50
                                       placeholder-gray-400 focus:outline-none focus:border-green-400 focus:bg-white
                                       focus:ring-2 focus:ring-green-100 transition-all"
                        />
                        {searchQuery ? (
                            <button onClick={() => setSearchQuery("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </button>
                        ) : (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>
                        )}
                    </div>

                    <Link href="/checkout"
                        className="flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg
                                   hover:bg-green-700 transition-all flex-shrink-0">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                            <circle cx="6" cy="13.5" r="1.25" fill="white" />
                            <circle cx="11.5" cy="13.5" r="1.25" fill="white" />
                            <path d="M1 1.5h2l2 7.5h6.5l1.5-5H4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="hidden sm:inline">View Cart</span>
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-4 pb-0 flex gap-1 overflow-x-auto scrollbar-hide">
                    {CATEGORIES.map((cat) => (
                        <button key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer
                                ${activeCategory === cat
                                    ? "border-green-600 text-green-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h2 className="text-base font-black text-gray-900">
                                {searchQuery
                                    ? `Search results for "${searchQuery}"`
                                    : activeCategory === "All Products"
                                        ? "Trending Products"
                                        : activeCategory}
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                            </p>
                        </div>
                        {!searchQuery && (
                            <Link href="#" className="flex items-center gap-1 text-green-600 text-xs font-semibold hover:text-green-700">
                                View All
                                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        )}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                            <div className="text-5xl mb-3">🌿</div>
                            <p className="font-bold text-gray-600 mb-1">No products found</p>
                            <p className="text-sm text-gray-400">Try a different search term or category</p>
                            <button onClick={() => { setSearchQuery(""); setActiveCategory("All Products"); }}
                                className="mt-4 px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-all cursor-pointer">
                                Clear filters
                            </button>
                        </div>
                    )}

                    {filteredProducts.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {filteredProducts.map((p) => (
                                <TrendingCard key={p.product_id} p={p} />
                            ))}
                        </div>
                    )}

                    {showingAll && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                            <div className="rounded-xl p-5 text-white"
                                style={{ background: "linear-gradient(135deg, #166534, #16a34a)" }}>
                                <p className="text-green-200 text-[10px] uppercase tracking-widest mb-1">Limited Offer</p>
                                <p className="font-black text-lg leading-tight">Get 25% Discount<br />&amp; <span className="text-green-200">Free Delivery</span></p>
                                <button className="mt-3 bg-white text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-50 transition-all cursor-pointer">
                                    Shop Now
                                </button>
                            </div>
                            <div className="rounded-xl p-5 bg-white border border-gray-100">
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">🌿 New in store</p>
                                <p className="font-black text-gray-900 text-lg leading-tight">Wellness Info<br /><span className="text-green-600">&amp; Eco Guides</span></p>
                                <button className="mt-3 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-700 transition-all cursor-pointer">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-black text-gray-900">Top Selling Products</h2>
                        <Link href="#" className="flex items-center gap-1 text-green-600 text-xs font-semibold hover:text-green-700">
                            View All
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>

                    <div className="space-y-2">
                        {topSelling.map((p) => (
                            <TopSellingCard key={p.product_id} p={p} />
                        ))}
                    </div>
                </div>
            </div>

            <CartBadge />
        </div>
    );
}
