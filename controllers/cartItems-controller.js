const {
    getCartItemsByCartItemId
} = require('../services/Cartitem-service');

const getCartItemsByCartItemIdRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const cartItem = getCartItemsByCartItemId(request.params.cartItemId);

            if (!cartItem) {
                return h.response().code(404);
            }

            return cartItem;
        },
        method: 'GET',
        path: '/cart-items/{cartItemId}'
    });
};

const initCartItemsControllers = (server) => {
    getCartItemsByCartItemIdRoute(server);
};

module.exports = {
    initCartItemsControllers
};
