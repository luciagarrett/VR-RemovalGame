const {
    selectCartItemsByCartItemId,
    selectCartItemsByCartId
} = require('../repositories/cartItems-repository');

const mapToModel = (cartItem) => ({
    cartItemId: cartItem['cartItem_id'],
    item: cartItem['item'],
    quantity: cartItem['quantity']
});

const getCartItemsByCartItemId = (cartItemId) => {
    const cartItem = selectCartItemsByCartItemId(cartItemId);

    return mapToModel(cartItem);
};

const getCartItemsByCartId = (cartId) => {
    const {rows} = selectCartItemsByCartId(cartId);

    return rows.map(mapToModel);
};

module.exports = {
    getCartItemsByCartItemId,
    getCartItemsByCartId
};