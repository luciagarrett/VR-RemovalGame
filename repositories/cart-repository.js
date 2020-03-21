const uuid = require('uuid');

const carts = [
    {
        'cart_id': uuid.v4(),
        'created_date': new Date(),
        'customer_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'purchased_date': new Date()
    },
    {
        'cart_id': uuid.v4(),
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

module.exports = {
    selectCartByCartId,
    selectCarts,
    selectCartsByCustomerId
};
