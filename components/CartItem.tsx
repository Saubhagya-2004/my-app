"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/calculateTotal";

interface CartItemProps {
    item: {
        product_id: number;
        product_name: string;
        product_price: number;
        quantity: number;
        image: string;
    };
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();
    const lineTotal = item.product_price * item.quantity;

    return (
        <div className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white
                        hover:border-green-200 hover:shadow-sm transition-all duration-200">
            {/* Image */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm leading-snug truncate">{item.product_name}</p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-[9px] font-bold">
                        🌿 Eco
                    </span>
                </div>
                <p className="text-gray-400 text-xs mb-3">{formatPrice(item.product_price)} / unit</p>

                {/* Qty stepper */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-50 border border-gray-200">
                        <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500
                                       hover:bg-green-100 hover:text-green-700 transition-all duration-150 cursor-pointer text-sm font-bold"
                        >
                            −
                        </button>
                        <span className="text-sm font-bold text-gray-800 w-6 text-center tabular-nums">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500
                                       hover:bg-green-100 hover:text-green-700 transition-all duration-150 cursor-pointer text-sm font-bold"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-[11px] text-gray-400 hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Remove
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
                <p className="font-black text-gray-900 text-base tracking-tight">{formatPrice(lineTotal)}</p>
                {item.quantity > 1 && (
                    <p className="text-[10px] text-gray-400 mt-0.5">
                        {item.quantity} × {formatPrice(item.product_price)}
                    </p>
                )}
            </div>
        </div>
    );
}
