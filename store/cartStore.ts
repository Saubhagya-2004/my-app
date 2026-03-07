import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
}

export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    pinCode: string;
    city: string;
    state: string;
    addressLine?: string;
    label?: string; // e.g. "Home", "Office"
}

export type PaymentMethod = "card" | "upi" | "cod" | null;

interface CartStore {
    cartItems: CartItem[];
    shippingFee: number;
    discountApplied: number;
    shippingAddress: ShippingAddress | null;
    paymentMethod: PaymentMethod;

    // Multiple saved addresses
    savedAddresses: ShippingAddress[];
    activeAddressIndex: number;

    seedCart: (data: { cartItems: CartItem[]; shippingFee: number; discountApplied: number }) => void;

    addItem: (product: Omit<CartItem, "quantity">) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;

    setShippingAddress: (address: ShippingAddress) => void;
    addSavedAddress: (address: ShippingAddress) => void;
    removeSavedAddress: (index: number) => void;
    selectAddress: (index: number) => void;

    setPaymentMethod: (method: PaymentMethod) => void;
    resetOrder: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cartItems: [],
            shippingFee: 50,
            discountApplied: 0,
            shippingAddress: null,
            paymentMethod: null,
            savedAddresses: [],
            activeAddressIndex: -1,

            seedCart: (data) =>
                set((state) => {
                    if (state.cartItems.length > 0) return state;
                    return {
                        cartItems: data.cartItems,
                        shippingFee: data.shippingFee,
                        discountApplied: data.discountApplied,
                    };
                }),

            addItem: (product) =>
                set((state) => {
                    const existing = state.cartItems.find((i) => i.product_id === product.product_id);
                    if (existing) {
                        return {
                            cartItems: state.cartItems.map((i) =>
                                i.product_id === product.product_id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        };
                    }
                    return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
                }),

            removeItem: (productId) =>
                set((state) => ({
                    cartItems: state.cartItems.filter((i) => i.product_id !== productId),
                })),

            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    cartItems:
                        quantity <= 0
                            ? state.cartItems.filter((i) => i.product_id !== productId)
                            : state.cartItems.map((i) =>
                                i.product_id === productId ? { ...i, quantity } : i
                            ),
                })),

            setShippingAddress: (address) => set({ shippingAddress: address }),

            addSavedAddress: (address) =>
                set((state) => {
                    const updated = [...state.savedAddresses, address];
                    return {
                        savedAddresses: updated,
                        activeAddressIndex: updated.length - 1,
                        shippingAddress: address,
                    };
                }),

            removeSavedAddress: (index) =>
                set((state) => {
                    const updated = state.savedAddresses.filter((_, i) => i !== index);
                    const newActive = updated.length > 0 ? 0 : -1;
                    return {
                        savedAddresses: updated,
                        activeAddressIndex: newActive,
                        shippingAddress: newActive >= 0 ? updated[newActive] : null,
                    };
                }),

            selectAddress: (index) =>
                set((state) => ({
                    activeAddressIndex: index,
                    shippingAddress: state.savedAddresses[index] ?? null,
                })),

            setPaymentMethod: (method) => set({ paymentMethod: method }),

            resetOrder: () =>
                set({
                    cartItems: [],
                    shippingFee: 50,
                    discountApplied: 0,
                    shippingAddress: null,
                    paymentMethod: null,
                    savedAddresses: [],
                    activeAddressIndex: -1,
                }),
        }),
        {
            name: "ecomart-cart-store",
        }
    )
);
