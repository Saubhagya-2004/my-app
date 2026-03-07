import { OrderTotals, formatPrice } from "@/lib/calculateTotal";

interface OrderSummaryProps {
    totals: OrderTotals;
    itemCount: number;
}

const TRUST = [
    { icon: "🔒", text: "256-bit SSL Encryption" },
    { icon: "🔄", text: "30-day Free Returns" },
    { icon: "🚚", text: "Tracked Delivery" },
    { icon: "🌿", text: "Carbon Neutral" },
];

export default function OrderSummary({ totals, itemCount }: OrderSummaryProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">Order Summary</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-[11px] font-bold">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
            </div>

            <div className="px-6 pt-5 pb-6">
                {/* Line items */}
                <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-semibold text-gray-900">{formatPrice(totals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Shipping</span>
                        {totals.shipping === 0 ? (
                            <span className="text-green-600 font-bold text-xs px-2 py-0.5 rounded-full bg-green-50 border border-green-200">
                                FREE
                            </span>
                        ) : (
                            <span className="font-semibold text-gray-900">{formatPrice(totals.shipping)}</span>
                        )}
                    </div>
                    {totals.discount > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-green-600">Discount</span>
                            <span className="font-bold text-green-600">−{formatPrice(totals.discount)}</span>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-5" />

                {/* Total */}
                <div className="flex justify-between items-center mb-5 p-4 rounded-xl bg-green-50 border border-green-200">
                    <div>
                        <p className="text-[10px] text-green-600 uppercase tracking-widest mb-0.5 font-semibold">Total</p>
                        <p className="font-black text-2xl text-gray-900 tracking-tight">{formatPrice(totals.total)}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">🛍️</div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-2">
                    {TRUST.map((t) => (
                        <div key={t.text} className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-gray-50 border border-gray-100">
                            <span className="text-sm">{t.icon}</span>
                            <span className="text-[10px] text-gray-500 leading-tight">{t.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
