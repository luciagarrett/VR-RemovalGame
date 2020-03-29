
let carts = [
    {
        'cart_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f14',
        'created_date': new Date(),
        'customer_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'purchased_date': new Date()
    }
];

const selectCarts = () => ({
    driver: 'postgres',
    error: new Error(),
    rows: carts
});

const selectCartByCartId = (cartId) =>
    carts.find((cart) => cart['cart_id'] === cartId);

const selectCartsByCustomerId = (customerId) => ({
    rows: carts.filter((cart) => cart['customer_id'] === customerId)
});

const insertCart = (cart) => carts.push(cart);

const updateCart = (updatedCart) => {
    const cartsThatDontMatch = carts.filter((cart) =>
        cart['cart_id'] !== updatedCart['cart_id']
    );

    carts = [
        ...cartsThatDontMatch,
        updatedCart
    ];
};

const deleteCartByCartId = (cartId) => {
    carts = carts.filter((cart) =>
        cart['cart_id'] !== cartId
    );
};

module.exports = {
    deleteCartByCartId,
    insertCart,
    selectCartByCartId,
    selectCarts,
    selectCartsByCustomerId,
    updateCart
};
