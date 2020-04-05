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
    describe('deleteCartByCartId', () => {
        it('should return all the carts', () => {
            deleteCartByCartId(expectedFirstCartId);

            const actualCarts = selectCarts();

            expect(actualCarts).toEqual({
                rows: []
            });
        });
    });

    describe('insertCart', () => {
        it('should insert a new carts', () => {
            const newCart = {
                'cart_id': uuid.v4(),
                'customer_id': uuid.v4(),
            };

            insertCart(newCart);

            const actualCarts = selectCarts();

            expect(actualCarts).toEqual({
                rows: [newCart]
            });
        });
    });

    describe('updateCart', () => {
        it('should insert a new carts', () => {
            const updatedCart = {
                'cart_id': expectedFirstCartId,
                'customer_id': uuid.v4()
            };

            updateCart(updatedCart);

            const actualCart = selectCartByCartId(expectedFirstCartId);

            expect(actualCart).toEqual(updatedCart);
        });
    });
});
