"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore, ShippingAddress } from "@/store/cartStore";
import { useRouter } from "next/navigation";

const schema = z.object({
    fullName: z.string().min(2, "At least 2 characters").regex(/^[a-zA-Z\s]+$/, "Letters only"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian mobile"),
    pinCode: z.string().regex(/^\d{6}$/, "Must be 6 digits"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "Select a state"),
});

type FormData = z.infer<typeof schema>;

const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Puducherry",
];

const inputCls = (err?: { message?: string }) =>
    `w-full px-4 py-3 rounded-lg bg-white/[0.04] border text-slate-100 text-sm
   placeholder:text-slate-600 outline-none transition-all duration-200
   ${err
        ? "border-danger/60 bg-danger/5 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.2)]"
        : "border-white/10 focus:border-brand focus:bg-brand/5 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
    }`;

export default function AddressForm() {
    const router = useRouter();
    const setShippingAddress = useCartStore((s) => s.setShippingAddress);

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } =
        useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

    const onSubmit = async (data: FormData) => {
        setShippingAddress(data as ShippingAddress);
        await new Promise((r) => setTimeout(r, 400));
        router.push("/payment");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name *</label>
                    <input className={inputCls(errors.fullName)} placeholder="Rahul Sharma" {...register("fullName")} />
                    {errors.fullName && <p className="text-xs text-danger flex items-center gap-1">⚠ {errors.fullName.message}</p>}
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email *</label>
                    <input type="email" className={inputCls(errors.email)} placeholder="rahul@example.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-danger flex items-center gap-1">⚠ {errors.email.message}</p>}
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone *</label>
                    <input type="tel" maxLength={10} className={inputCls(errors.phone)} placeholder="9876543210" {...register("phone")} />
                    {errors.phone && <p className="text-xs text-danger flex items-center gap-1">⚠ {errors.phone.message}</p>}
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">PIN Code *</label>
                    <input maxLength={6} className={inputCls(errors.pinCode)} placeholder="400001" {...register("pinCode")} />
                    {errors.pinCode && <p className="text-xs text-danger flex items-center gap-1">⚠ {errors.pinCode.message}</p>}
                </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">City *</label>
                    <input className={inputCls(errors.city)} placeholder="Mumbai" {...register("city")} />
                    {errors.city && <p className="text-xs text-danger flex items-center gap-1">⚠ {errors.city.message}</p>}
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">State *</label>
                    <select className={`${inputCls(errors.state)} cursor-pointer`} {...register("state")}>
                        <option value="" style={{ background: "#111827" }}>Select State</option>
                        {STATES.map((s) => <option key={s} value={s} style={{ background: "#111827" }}>{s}</option>)}
                    </select>
                    {errors.state && <p className="text-xs text-danger flex items-center gap-1">⚠ {errors.state.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-brand to-brand-dark text-white cursor-pointer
                   shadow-[0_4px_16px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,102,241,0.55)]
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base mt-2"
            >
                {isSubmitting ? "Saving…" : "Continue to Payment →"}
            </button>
        </form>
    );
}
