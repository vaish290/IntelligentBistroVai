import { create } from "zustand";
import { MenuItem } from "../../data/menu";

export type CartItem = MenuItem & {
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addItem: (item, quantity = 1) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          ),
        };
      }

      return {
        cart: [...state.cart, { ...item, quantity }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ cart: [] }),
}));