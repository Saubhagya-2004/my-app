"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore, ShippingAddress } from "@/store/cartStore";

const schema = z.object({
    label: z.string().optional(),
    addressLine: z.string().min(5, "Enter your full address (house no., street, locality)"),
    fullName: z.string().min(2, "At least 2 characters").regex(/^[a-zA-Z\s]+$/, "Letters only"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian mobile number"),
    pinCode: z.string().regex(/^\d{6}$/, "Must be exactly 6 digits"),
    city: z.string().min(2, "City name is required"),
    state: z.string().min(2, "Please select a state"),
});

type FormData = z.infer<typeof schema>;

const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Puducherry",
];

const LABEL_OPTIONS = [
    { id: "Home", icon: "🏠" },
    { id: "Office", icon: "🏢" },
    { id: "Other", icon: "📍" },
];

const inputCls = (err?: { message?: string }) =>
    `w-full px-4 py-3 rounded-lg text-gray-900 text-sm outline-none transition-all duration-200 border bg-white
    ${err
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
    }`;

interface AddressFormProps {
    onAddressSaved?: () => void;
}

export default function AddressForm({ onAddressSaved }: AddressFormProps) {
    const { savedAddresses, activeAddressIndex, addSavedAddress, removeSavedAddress, selectAddress } = useCartStore();
    const [showForm, setShowForm] = useState(savedAddresses.length === 0);
    const [selectedLabel, setSelectedLabel] = useState("Home");

    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } =
        useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

    const onSubmit = async (data: FormData) => {
        const newAddr: ShippingAddress = { ...data, label: selectedLabel };
        addSavedAddress(newAddr);
        reset();
        setShowForm(false);
        await new Promise((r) => setTimeout(r, 300));
        onAddressSaved?.();
    };

    return (
        <div className="space-y-4">
            {/* Saved cards */}
            {savedAddresses.length > 0 && (
                <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saved Addresses</p>
                    {savedAddresses.map((addr, idx) => (
                        <div
                            key={idx}
                            role="radio"
                            aria-checked={activeAddressIndex === idx}
                            tabIndex={0}
                            onClick={() => { selectAddress(idx); setShowForm(false); }}
                            onKeyDown={(e) => e.key === "Enter" && selectAddress(idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none
                                ${activeAddressIndex === idx
                                    ? "border-green-400 bg-green-50 shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                                    : "border-gray-200 bg-white hover:border-green-200 hover:bg-green-50/40"
                                }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all
                                        ${activeAddressIndex === idx ? "border-[5px] border-green-600" : "border-gray-300"}`} />
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                                                ${activeAddressIndex === idx
                                                    ? "bg-green-100 text-green-700 border-green-200"
                                                    : "bg-gray-100 text-gray-500 border-gray-200"
                                                }`}>
                                                {addr.label ?? "Address"}
                                            </span>
                                            <span className="font-semibold text-sm text-gray-900">{addr.fullName}</span>
                                        </div>
                                        <p className="text-xs text-gray-600">{addr.addressLine}</p>
                                        <p className="text-xs text-gray-500">{addr.city}, {addr.state} — {addr.pinCode}</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">📞 {addr.phone} · ✉ {addr.email}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeSavedAddress(idx); }}
                                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 cursor-pointer w-5 h-5 flex items-center justify-center rounded hover:bg-red-50"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}

                    {!showForm && activeAddressIndex >= 0 && (
                        <button
                            type="button"
                            id="use-selected-address-btn"
                            onClick={() => onAddressSaved?.()}
                            className="w-full py-3.5 rounded-xl font-bold text-white text-sm cursor-pointer
                                       bg-green-600 hover:bg-green-700 transition-all duration-200
                                       shadow-[0_4px_12px_rgba(22,163,74,0.25)] hover:-translate-y-0.5"
                        >
                            Deliver to This Address →
                        </button>
                    )}
                </div>
            )}

            {/* Add new toggle */}
            {!showForm ? (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed cursor-pointer
                               border-gray-300 text-gray-400 hover:border-green-400 hover:text-green-600 hover:bg-green-50
                               transition-all duration-200 text-sm font-semibold"
                >
                    <span className="text-lg leading-none">+</span> Add New Address
                </button>
            ) : (
                <div className="rounded-xl border border-green-100 bg-green-50/30 animate-fade-up overflow-hidden">
                    {/* Form panel header */}
                    <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-700">
                            {savedAddresses.length > 0 ? "New Address" : "Delivery Address"}
                        </p>
                        {savedAddresses.length > 0 && (
                            <button type="button" onClick={() => setShowForm(false)}
                                className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                Cancel
                            </button>
                        )}
                    </div>

                    <div className="p-5 space-y-5">
                        {/* Label chips */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Save As</label>
                            <div className="flex gap-2">
                                {LABEL_OPTIONS.map((lbl) => (
                                    <button
                                        key={lbl.id}
                                        type="button"
                                        onClick={() => setSelectedLabel(lbl.id)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer
                                            ${selectedLabel === lbl.id
                                                ? "border-green-500 text-green-700 bg-green-100"
                                                : "border-gray-200 text-gray-500 bg-white hover:border-green-300 hover:bg-green-50"
                                            }`}
                                    >
                                        {lbl.icon} {lbl.id}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form id="shipping-address-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address Line *</label>
                                <input className={inputCls(errors.addressLine)} placeholder="Flat / House No., Street, Locality" {...register("addressLine")} />
                                {errors.addressLine && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {errors.addressLine.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name *</label>
                                    <input className={inputCls(errors.fullName)} placeholder="Priya Sharma" {...register("fullName")} />
                                    {errors.fullName && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {errors.fullName.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email *</label>
                                    <input type="email" className={inputCls(errors.email)} placeholder="priya@example.com" {...register("email")} />
                                    {errors.email && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone *</label>
                                    <input type="tel" maxLength={10} className={inputCls(errors.phone)} placeholder="9876543210" {...register("phone")} />
                                    {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {errors.phone.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PIN Code *</label>
                                    <input maxLength={6} className={inputCls(errors.pinCode)} placeholder="400001" {...register("pinCode")} />
                                    {errors.pinCode && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {errors.pinCode.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City *</label>
                                    <input className={inputCls(errors.city)} placeholder="Mumbai" {...register("city")} />
                                    {errors.city && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {errors.city.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State *</label>
                                    <select className={`${inputCls(errors.state)} cursor-pointer`} {...register("state")}>
                                        <option value="">Select State</option>
                                        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {errors.state && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {errors.state.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                className="w-full py-3.5 rounded-xl font-bold text-white text-sm cursor-pointer mt-1
                                           bg-green-600 hover:bg-green-700 transition-all duration-200
                                           shadow-[0_4px_12px_rgba(22,163,74,0.25)] hover:-translate-y-0.5
                                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? "Saving…" : "✓ Save & Use This Address"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
