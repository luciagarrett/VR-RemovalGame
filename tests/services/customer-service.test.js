const {
    getAllCustomers,
    getCustomerByCustomerId
} = require('../../services/customer-service');
const {
    selectCustomers,
    selectCustomerByCustomerId
} = require('../../repositories/customer-repository');

jest.mock('../../repositories/customer-repository');

describe('getAllCustomers', () => {
    let expectedFirstCustomer,
        expectedFirstCustomerId,
        expectedEmail,
        expectedFirstName,
        expectedLastName;

    beforeEach(() => {
        expectedFirstCustomerId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28';
        expectedEmail = 'john.doe@drake.edu';
        expectedFirstName = 'John';
        expectedLastName = 'Doe';

        expectedFirstCustomer = {
            customerId: expectedFirstCustomerId,
            email: expectedEmail,
            firstName: expectedFirstName,
            lastName: expectedLastName
        };

        selectCustomerByCustomerId.mockReturnValue({
            'customer_id': expectedFirstCustomerId,
            'email': expectedEmail,
            'first_name': expectedFirstName,
            'last_name': expectedLastName
        });
    });

    it('should get all the customers', () => {
        const actualCustomers = getAllCustomers();

        expect(selectCustomers).toHaveBeenCalledTimes(1);

        expect(actualCustomers).toEqual([
            expectedFirstCustomer
        ]);
    });

    it('should get a customer by a specific customerId', () => {
        const actualCustomer = getCustomerByCustomerId(expectedFirstCustomerId);

        expect(selectCustomerByCustomerId).toHaveBeenCalledTimes(1);
        expect(selectCustomerByCustomerId).toHaveBeenCalledWith(expectedFirstCustomerId);

        expect(actualCustomer).toEqual(expectedFirstCustomer);
    });
});
