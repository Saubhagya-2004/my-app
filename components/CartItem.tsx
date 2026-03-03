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
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-200">
            {/* Image */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0">
                <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-1 right-1 bg-brand text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {item.quantity}
                </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-100 text-sm mb-1 truncate">{item.product_name}</p>
                <p className="text-slate-500 text-xs mb-2">{formatPrice(item.product_price)} each</p>

                {/* Qty controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="w-7 h-7 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:bg-brand/20 hover:border-brand/40 hover:text-brand transition-all text-sm font-bold flex items-center justify-center cursor-pointer"
                    >
                        −
                    </button>
                    <span className="text-sm font-semibold text-slate-200 w-5 text-center">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-7 h-7 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:bg-brand/20 hover:border-brand/40 hover:text-brand transition-all text-sm font-bold flex items-center justify-center cursor-pointer"
                    >
                        +
                    </button>
                    <button
                        onClick={() => removeItem(item.product_id)}
                        className="ml-2 text-xs text-slate-600 hover:text-danger transition-colors cursor-pointer"
                    >
                        Remove
                    </button>
                </div>
            </div>

            {/* Line total */}
            <div className="text-right shrink-0">
                <p className="font-bold text-slate-100 text-base">{formatPrice(lineTotal)}</p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-eco/10 border border-eco/20 text-eco text-[10px] font-semibold">
                    🌿 Eco
                </span>
            </div>
        </div>
    );
}
