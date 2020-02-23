
const Hapi = require('@hapi/hapi');
const uuid = require('uuid');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const samId = uuid.v4();
    const customerSam = {
        customerId: samId,
        firstName: 'Sam',
        lastName: 'Downey',
        email: '${firstName.toLowerCase()}.${lastName.toLowerCase()}@drake.edu',
        phoneNumber: '+18158228921'
    };

    const customerSamantha = {
        customerId: uuid.v4(),
        firstName: 'Samantha',
        lastName: 'Ure',
        email: '${firstName.toLowerCase()}.${lastName.toLowerCase()}@drake.edu',
        phoneNumber: '+18159999999'
    };

    const customerDundie = {
        customerId: uuid.v4(),
        firstName: 'Dundie',
        lastName: 'Road',
        email: '${firstName.toLowerCase()}.${lastName.toLowerCase()}@drake.edu',
        phoneNumber: '+18151111111'
    };

    let customers = [customerSam, customerSamantha, customerDundie];

    server.route({
        method: 'GET',
        path: '/customers',
        handler: (request, h) => {
            return customers;
        }
    });

    server.route({
        method: 'GET',
        path: '/customers/{customerId}',
        handler: (request, h) => {
            const {customerId} = request.params;
            const customer = customers.find((cust) => cust.customerId === customerId);

            if (!customer) {
                return h.response().code(404);
            }

            return customer;
        }
    });

    server.route({
        method: 'POST',
        path: '/customers',
        handler: (request, h) => {
            const customer = request.payload;
            const existingCust = customers.find((cust) => cust.customerId === customer.customerId);

            if (existingCust) {
                return h.response(existingCust).code(303);
            } else {
                customers.push(customer);

                return h.response(customer).code(201);
            }

        }
    });


    server.route({
        method: 'DELETE',
        path: '/customers/{customerId}',
        handler: (request, h) => {
            const {customerId} = request.params;
            const customer = customers.find((cust) => cust.customerId === customerId);

            if (!customer) {
                return h.response().code(404);
            }

            let newCustomers = [];

            customers.forEach((cust) => {
                if (cust.customerId !== customerId) {
                    newCustomers.push(cust);
                }
            });

            customers = newCustomers;

            return '';
        }
    });

    server.route({
        method: 'PUT',
        path: '/customers/{customerId}',
        handler: (request, h) => {
            const {customerId} = request.params;
            const updatedCustomer = request.payload;

            if (customerId !== updatedCustomer.customerId) {
                return h.response().code(409);
            }

            let newCustomers = [];

            customers.forEach((cust) => {
                if (cust.customerId === customerId) {
                    newCustomers.push(updatedCustomer);
                } else {
                    newCustomers.push(cust);
                }
            });

            customers = newCustomers;

            return '';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();