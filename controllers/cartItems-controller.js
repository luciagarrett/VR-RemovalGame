const {
    getCartItemsByCartItemId
} = require('../services/Cartitem-service');


const getCartItemsByCartItemIdRoute = (server) => {
    server.route({
        path: '/cart-items/{cartItemId}',
        method: 'GET',
        handler: (request, h) => {
            const cartItem = getCartItemsByCartItemId(request.params.cartItemId);

            if (!cartItem) {
                return h.response().code(404);
            }

            return cartItem;
        }
    });
};

const initCartItemsControllers = (server) => {
    getCartItemsByCartItemIdRoute(server);
};

module.exports = {
    initCartItemsControllers
};