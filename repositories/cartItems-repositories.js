const uuid = require('uuid');

const cartItems = [
    {
        'cartItem_id': uuid.v4(),
        'item': 'Ball cap',
        'quantity': 4
    }
];

const selectCartItems = () => ({
    driver: 'postgres',
    error: new Error(),
    rows: cartItems
});

const selectCartItemsByCartItemId = (cartItemId) =>
    cartItems.find((cartItem) => cartItem['cartItem_id'] === cartItemId);

const selectCartItemsByCartId = (cartId) => ({
    rows: cartItems.filter((cartItem) => cartItem['cart_id'] === cartId)
});

module.exports = {
    selectCartItems,
    selectCartItemsByCartId,
    selectCartItemsByCartItemId
};
