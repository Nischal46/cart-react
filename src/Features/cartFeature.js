import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToChart(state, action) {

            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

            if (itemIndex >= 0) {
                console.log(state)
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`${state.cartItems[itemIndex].name} again added in cart.`, { position: 'top-right' });
            }

            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} added in cart.`, { position: 'top-right' });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },

        removeFromCart(state, action) {
            const removeItems = state.cartItems.filter(item => item.id !== action.payload.id);

            state.cartItems = removeItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error(`${action.payload.title} removed from cart`, { position: 'top-right' });
        },

        decreasedItem(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info(`${action.payload.title} decreaded.`, { position: 'top-right' });
            }
            else {
                toast.error('Must have one item. Remove instead.', { position: 'top-right' });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        increasedItem(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQuantity >= 1) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`${action.payload.title} increased in the list.`, { position: 'top-right' });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        clearCart(state, action) {
            state.cartItems = [];
            toast.error('Cart is empty.', { position: 'top-right' });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        getTotal(state, action) {
            let { total, quantity } = state.cartItems.reduce((carttotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                carttotal.total += itemTotal;
                carttotal.quantity += cartQuantity;

                return carttotal;
            }, {
                total: 0,
                quantity: 0
            });

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
});

export const { addToChart, removeFromCart, decreasedItem, increasedItem, clearCart, getTotal } = cartSlice.actions;
export default cartSlice.reducer;