import { create } from "zustand";

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
}

export type PaymentMethod = "card" | "upi" | "cod" | null;

interface CartStore {
    cartItems: CartItem[];
    shippingFee: number;
    discountApplied: number;
    shippingAddress: ShippingAddress | null;
    paymentMethod: PaymentMethod;

    // Seed cart (only if empty)
    seedCart: (data: { cartItems: CartItem[]; shippingFee: number; discountApplied: number }) => void;
    // Per-item actions
    addItem: (product: Omit<CartItem, "quantity">) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    // Checkout actions
    setShippingAddress: (address: ShippingAddress) => void;
    setPaymentMethod: (method: PaymentMethod) => void;
    resetOrder: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
    cartItems: [],
    shippingFee: 50,
    discountApplied: 0,
    shippingAddress: null,
    paymentMethod: null,

    /** Seeds the cart from SSR data — only when cart is completely empty */
    seedCart: (data) =>
        set((state) => {
            if (state.cartItems.length > 0) return state; // already has items — don't overwrite
            return {
                cartItems: data.cartItems,
                shippingFee: data.shippingFee,
                discountApplied: data.discountApplied,
            };
        }),

    /** Add product — increments qty if already in cart */
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

    /** Remove product entirely */
    removeItem: (productId) =>
        set((state) => ({
            cartItems: state.cartItems.filter((i) => i.product_id !== productId),
        })),

    /** Update quantity — removes item if qty is set to 0 */
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
    setPaymentMethod: (method) => set({ paymentMethod: method }),

    resetOrder: () =>
        set({
            cartItems: [],
            shippingFee: 50,
            discountApplied: 0,
            shippingAddress: null,
            paymentMethod: null,
        }),
}));
