const {
    getAllCarts,
    getCartByCartId
} = require('../services/cart-service');
const {getCartItemsByCartId} = require('../services/cartItems-service');

const getCartsRoute = (server) => {
    server.route({
        handler: () => getAllCarts(),
        method: 'GET',
        path: '/carts'
    });
};

const getCartByCartIdRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const cart = getCartByCartId(request.params.cartId);

            if (!cart) {
                return h.response().code(404);
            }

            return cart;
        },
        method: 'GET',
        path: '/carts/{cartId}'
    });
};

const getCartsCartItemsRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const cartId = request.params.cartId;
            const cart = getCartByCartId(cartId);

            if (!cart) {
                return h.response().code(404);
            }

            return getCartItemsByCartId(cartId);
        },
        method: 'GET',
        path: '/carts/{cartId}/cart-items'
    });
};

const initCartControllers = (server) => {
    getCartsRoute(server);
    getCartByCartIdRoute(server);
    getCartsCartItemsRoute(server);
};

module.exports = {
    initCartControllers
};
