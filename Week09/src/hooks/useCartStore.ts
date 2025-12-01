import { create } from 'zustand';
import type { CartItems } from '../types/cart';
import { immer } from 'zustand/middleware/immer';
import cartItems from '../constants/cartItems';
import { useShallow } from 'zustand/shallow';

interface CartActions {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;

    actions: CartActions;
}

export const useCartStore = create<CartState>()(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    immer((set, _) => ({
        cartItems: cartItems,
        amount: 0,
        total: 0,
        actions: {
            //증가
            increase: (id: string) : void => {
                // set((state) => ({
                //     cartItems: state.cartItems.map((item) =>
                //         item.id === id ? { ...item, amount: item.amount + 1 } : item
                //     ),
                // }));
                
                set((state) : void => {
                    const cartItem = state.cartItems.find((item) : boolean =>
                        item.id === id
                    );

                    if (cartItem) {
                        cartItem.amount += 1;
                    }
                });
            },
            //감소
            decrease: (id: string) : void => {
                set((state) : void => {
                    const cartItem = state.cartItems.find((item) : boolean =>
                        item.id === id
                    );

                    if (cartItem && cartItem.amount > 0) {
                        cartItem.amount -= 1;
                    }
                },);
            },
            //제거
            removeItem: (id: string) : void => {
                set((state) : void => {
                    state.cartItems = state.cartItems.filter((item) : boolean =>
                        item.id !== id
                    );
                });
            },
            //장바구니 비우기
            clearCart: () : void => {
                set((state) : void => {
                    state.cartItems = [];
                });
            },
            //총합 계산
            calculateTotals: () : void => {
                set((state) : void => {
                    let amount = 0;
                    let total = 0;

                    state.cartItems.forEach((item) : void => {
                        amount += item.amount;
                        total += item.amount * item.price;
                    });

                    state.amount = amount;
                    state.total = total;
                });
            },

        },
    }))
);

export const useCartInfo = () : { cartItems: CartItems; amount: number; total: number } =>
    useCartStore(
        useShallow((state) : { cartItems: CartItems; amount: number; total: number } => ({
            cartItems: state.cartItems,
            amount: state.amount,
            total: state.total,
        }))
    );

export const useCartActions = () : CartActions => useCartStore((state) : CartActions => state.actions);


