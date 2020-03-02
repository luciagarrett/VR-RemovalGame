const uuid = require('uuid');

let cartItems = [
    {
        'cartItem_id': uuid.v4(),
        'item': 'Ball cap',
        'quantity': 4
    }
];

const selectCartItems = () => ({
    rows: cartItems,
    error: new Error(),
    driver: 'postgres'
});

const selectCartItemsByCartItemId = (cartItemId) =>
    cartItems.find((cartItem) => cartItem['cartItem_id'] === cartItemId);

const selectCartItemsByCartId = (cartId) => ({
    rows: cartItems.filter((cartItem) => cartItem['cart_id'] === cartId)
});

module.exports = {
    selectCartItems,
    selectCartItemsByCartItemId,
    selectCartItemsByCartId
};