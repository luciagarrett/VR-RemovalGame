const {
    getAllCarts,
    getCartByCartId
} = require('../services/cart-service');
const {getCartItemsByCartId} = require('../services/cartItems-service');

const getCartsRoute = (server) => {
    server.route({
        path: '/carts',
        method: 'GET',
        handler: (request, h) => {
            return getAllCarts();
        }
    });
};

const getCartByCartIdRoute = (server) => {
    server.route({
        path: '/carts/{cartId}',
        method: 'GET',
        handler: (request, h) => {
            const cart = getCartByCartId(request.params.cartId);

            if (!cart) {
                return h.response().code(404);
            }

            return cart;
        }
    });
};

const getCartsCartItemsRoute = (server) => {
    server.route({
        path: '/carts/{cartId}/cart-items',
        method: 'GET',
        handler: (request, h) => {
            const cartId = request.params.cartId;
            const cart = getCartByCartId(cartId);

            if (!cart) {
                return h.response().code(404);
            }

            return getCartItemsByCartId(cartId);
        }
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