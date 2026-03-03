import { OrderTotals, formatPrice } from "@/lib/calculateTotal";

interface OrderSummaryProps {
    totals: OrderTotals;
    itemCount: number;
}

export default function OrderSummary({ totals, itemCount }: OrderSummaryProps) {
    return (
        <div className="rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-100">Order Summary</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-bold">
                    {itemCount} items
                </span>
            </div>

            <div className="h-px bg-white/8 mb-4" />

            {/* Line items */}
            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="font-semibold text-slate-100">{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Shipping</span>
                    <span className="font-semibold text-slate-100">
                        {totals.shipping === 0 ? (
                            <span className="text-eco">FREE</span>
                        ) : (
                            formatPrice(totals.shipping)
                        )}
                    </span>
                </div>
                {totals.discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-eco">Discount</span>
                        <span className="font-semibold text-eco">−{formatPrice(totals.discount)}</span>
                    </div>
                )}
            </div>

            <div className="h-px bg-white/8 mb-4" />

            {/* Total */}
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-brand/10 border border-brand/20 mb-5">
                <span className="font-bold text-slate-100">Total</span>
                <span className="font-black text-2xl text-brand tracking-tight">{formatPrice(totals.total)}</span>
            </div>

            {/* Trust badges */}
            <div className="space-y-2">
                {[" Secure SSL Checkout", "🔄 Easy 30-day Returns", "🚚 Tracked Delivery"].map((b) => (
                    <p key={b} className="text-xs text-slate-600">{b}</p>
                ))}
            </div>
        </div>
    );
}
