import { create } from 'zustand';

interface Product {
   id: string;
   title: string;
   price: number;
   image: string;
}

interface CartProduct extends Product {
   quantity: number;
}

interface CartStoreProps {
   // Cart item count
   count: number;
   toggle: boolean;
   carts: CartProduct[];
   setToggle: () => void;
   removeItemFromCart: (id: string) => void;
   addItemToCart: (item: Product) => void;
   decrementItemQuantity: (id: string) => void;
   incrementItemQuantity: (id: string) => void;
   clearCart: () => void;
}

const useStore = create<CartStoreProps>((set) => ({
   // State variabless
   count: 0,
   toggle: false,
   carts: [],

   setToggle: () => set((state) => ({ toggle: !state.toggle })),

   removeItemFromCart: (id: string) =>
      set((state) => ({
         carts: state.carts.filter((item) => item.id !== id),
      })),

   addItemToCart: (item: Product) =>
      set((state) => {
         const existingItem = state.carts.find(
            (cartItem) => cartItem.id === item.id
         );
         if (existingItem) {
            // If item already exists, increase its quantity
            return {
               carts: state.carts.map((cartItem) =>
                  cartItem.id === item.id
                     ? { ...cartItem, quantity: cartItem.quantity + 1 }
                     : cartItem
               ),
            };
         } else {
            // If item doesn't exist, add it with quantity 1
            return { carts: [...state.carts, { ...item, quantity: 1 }] };
         }
      }),

   incrementItemQuantity: (id: string) =>
      set((state) => ({
         carts: state.carts.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
         ),
      })),

   decrementItemQuantity: (id: string) =>
      set((state) => ({
         carts: state.carts.map((item) =>
            item.id === id
               ? { ...item, quantity: Math.max(1, item.quantity - 1) }
               : item
         ),
      })),

   clearCart: () => set({ carts: [] }),
}));

export default useStore;
