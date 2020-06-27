import {createSelector} from 'reselect';

const selectCart = state => state.cart;//input selector. selects a piece of whole state

export const selectCartItems = createSelector(//output selector. createSelector has to be used for casheing.
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartHidden = createSelector(//when output selectors are summoned they send the information and cashe the it.
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => 
        cartItems.reduce((accumulatedQuantity, cartItem) => (accumulatedQuantity + cartItem.quantity), 
        0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => 
        cartItems.reduce((accumulatedQuantity, cartItem) => (accumulatedQuantity + cartItem.quantity * cartItem.price), 
        0)
)
