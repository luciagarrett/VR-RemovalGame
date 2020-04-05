const uuid = require('uuid');

const {
    getAllCarts,
    getCartByCartId,
    getCartsByCustomerId
} = require('../../services/cart-service');
const {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId
} = require('../../repositories/cart-repository');

jest.mock('../../repositories/cart-repository');

describe('getAllCarts', () => {
    let expectedFirstCart,
        expectedFirstCartId,
        expectedCustomerId;

    beforeEach(() => {
        expectedFirstCartId = uuid.v4();
        expectedCustomerId = uuid.v4();

        expectedFirstCart = {
            cartId: expectedFirstCartId,
            customerId: expectedCustomerId
        };

        selectCarts.mockReturnValue({
            rows: [{
                'cart_id': expectedFirstCartId,
                'customer_id': expectedCustomerId
            }]
        });

        selectCartsByCustomerId.mockReturnValue({
            rows: [{
                'cart_id': expectedFirstCartId,
                'customer_id': expectedCustomerId
            }]
        });

        selectCartByCartId.mockReturnValue({
            'cart_id': expectedFirstCartId,
            'customer_id': expectedCustomerId
        });
    });

    it('should get all the carts', () => {
        const actualCarts = getAllCarts();

        expect(selectCarts).toHaveBeenCalledTimes(1);

        expect(actualCarts).toEqual([
            expectedFirstCart
        ]);
    });

    it('should get a cart by a specific cartId', () => {
        const actualCart = getCartByCartId(expectedFirstCartId);

        expect(selectCartByCartId).toHaveBeenCalledTimes(1);
        expect(selectCartByCartId).toHaveBeenCalledWith(expectedFirstCartId);

        expect(actualCart).toEqual(expectedFirstCart);
    });

    it('should get all the carts by customerId', () => {
        const actualCarts = getCartsByCustomerId(expectedCustomerId);

        expect(selectCartsByCustomerId).toHaveBeenCalledTimes(1);
        expect(selectCartsByCustomerId).toHaveBeenCalledWith(expectedCustomerId);

        expect(actualCarts).toEqual([
            expectedFirstCart
        ]);
    });
    it('should return NOT_FOUND if a cart does not exist when looking for their carts', async () => {
        const randomCartId = uuid.v4();
        const response = await fakeServer.inject({
            method: 'GET',
            url: `/carts/${randomCartId}`
        });

        expect(response.statusCode).toEqual(404);
    });

    it('should be able to create a new cart', async () => {
        expectedCart = {
            cartId: uuid.v4(),
            customerId: uuid.v4()
        };

        const response = await fakeServer.inject({
            method: 'POST',
            payload: expectedCart,
            url: '/carts'
        });

        expect(response.statusCode).toEqual(201);
        expect(response.result).toEqual(expectedCart);

        expect(addCart).toHaveBeenCalledTimes(1);
        expect(addCart).toHaveBeenCalledWith(expectedCart);
    });

    it('should be able to update an existing cart', async () => {
        const updatedCart = {
            cartId: expectedCartId,
            customerId: uuid.v4()
        };

        const response = await fakeServer.inject({
            method: 'PUT',
            payload: updatedCart,
            url: `/carts/${expectedCartId}`
        });

        expect(response.statusCode).toEqual(204);

        expect(modifyCart).toHaveBeenCalledTimes(1);
        expect(modifyCart).toHaveBeenCalledWith(updatedCart);
    });

    it('should be able to delete an existing cart', async () => {
        const response = await fakeServer.inject({
            method: 'DELETE',
            url: `/carts/${expectedCartId}`
        });

        expect(response.statusCode).toEqual(204);

        expect(removeCartByCartId).toHaveBeenCalledTimes(1);
        expect(removeCartByCartId).toHaveBeenCalledWith(expectedCartId);
    });
});
