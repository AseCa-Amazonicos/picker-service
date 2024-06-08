describe('Warehouse and Stock Management', () => {
    it('creates a warehouse, adds stock, and checks the stock', () => {
        // Mock the API response for creating a warehouse
        cy.intercept(
            {
                method: 'POST',
                url: '/api/picker/warehouse/create',
            },
            {
                statusCode: 200,
                body: {id: 3, name: 'Palermo'},
            }
        ).as('createWarehouse');

        // Mock the API response for adding stock
        cy.intercept(
            {
                method: 'PUT',
                url: '/api/picker/stock/add_stock',
            },
            {
                statusCode: 200,
                body: {warehouseId: 3, productId: 10, quantity: 100},
            }
        ).as('addStock');

        // Mock the API response for getting the stock
        cy.intercept(
            {
                method: 'GET',
                url: '/api/stock?warehouseId=3&productId=10',
            },
            {
                statusCode: 200,
                body: {warehouseId: 3, productId: 10, quantity: 10},
            }
        ).as('getStock');

        cy.intercept(
            {
                method: 'GET',
                url: '/api/picker/stock/get_actual_stock',
            },
            {
                statusCode: 200,
                body: [],
            }
        ).as('getInitialStock');

        cy.visit('http://localhost:3002');
        cy.wait(5000);
        cy.wait('@getInitialStock');

        // Visit the app
        cy.visit('http://localhost:3002/add-warehouse'); // Navigate to the correct route

        // Wait for the #warehouse-name-input element to appear
        cy.get('#warehouse-name').type('Palermo');
        cy.wait(5000);
        cy.get('#add-warehouse-button').then($button => {
            $button.click();
        });
        cy.wait('@createWarehouse');

        cy.intercept('GET', '/api/picker/warehouse/get_all', {
            statusCode: 200,
            body: [{id: 3, name: 'Palermo'}],
        });

        // Navigate to the add stock page
        cy.visit('http://localhost:3002/add-stock');

        // Add stock
        cy.get('#item-name').type('Mate');
        cy.wait(5000);
        cy.get('#item-location').type('3');
        cy.wait(5000);
        cy.get('#item-quantity').type('100');
        cy.wait(5000);
        cy.get('#add-stock-button').click();
        cy.wait('@addStock');

        // Navigate to the catalog page
        cy.visit('http://localhost:3002/');

        // Mock the API response for getting all stock
        cy.intercept(
            {
                method: 'GET',
                url: '/api/picker/stock/get_actual_stock', // Replace with the actual URL used to fetch all stock
            },
            {
                statusCode: 200,
                body: [
                    {
                        warehouseId: 3,
                        itemName: 'Mate',
                        productId: 10,
                        quantity: 100,
                        warehouseName: 'Palermo',
                    },
                ],
            }
        ).as('getAllStock');

        // Navigate to the catalog page
        cy.visit('http://localhost:3002/');

        // Wait for the getAllStock API call to complete
        cy.wait('@getAllStock');

        // Check if the added product is present in the catalog
        cy.contains('Mate').should('be.visible'); // Replace 'Mate' with the actual name of the product

        cy.wait(5000);

        // Mock the API response for getting all orders
        cy.intercept(
            {
                method: 'GET',
                url: '/api/picker/order/get_all_orders',
            },
            {
                statusCode: 200,
                body: [
                    {
                        orderId: 1,
                        status: 'NOT_STARTED',
                        item: [
                            {
                                itemId: 10,
                                name: 'Mate', // Changed from 'itemName' to 'name'
                                quantity: 10,
                            },
                        ],
                    },
                ],
            }
        ).as('getAllOrders');

        // Navigate to the orders page
        cy.visit('http://localhost:3002/orders');

        // Wait for the getAllOrders API call to complete
        cy.wait('@getAllOrders');

        // Check if the order is present in the list
        cy.contains('Pedido #1');

        cy.wait(5000);

        // Mock the API response for getting an order by ID
        cy.intercept(
            {
                method: 'GET',
                url: '/api/picker/order/get_order_by_id?orderId=1',
            },
            {
                statusCode: 200,
                body: {
                    orderId: 1,
                    status: 'NOT_STARTED',
                    item: [
                        {
                            itemId: 10,
                            name: 'Mate',
                            quantity: 10,
                        },
                    ],
                },
            }
        ).as('getOrderByOrderId');

        // Click on the order to view the details
        cy.contains('Pedido #1').click();
        cy.wait('@getOrderByOrderId');

        cy.intercept(
            {
                method: 'PUT',
                url: '/api/picker/picker/prepare_order',
            },
            {
                statusCode: 200,
                body: {
                    orderId: 1,
                    status: 'IN_PROGRESS',
                },
            }
        ).as('startOrder');

        // Start the order
        cy.get('#complete-order').click();

        cy.wait(5000);

        cy.intercept(
            {
                method: 'PUT',
                url: '/api/picker/picker/ready_to_ship',
            },
            {
                statusCode: 200,
                body: {
                    orderId: 1,
                    status: 'READY_TO_SHIP',
                },
            }
        ).as('completeOrder');

        // Complete the order
        cy.get('#complete-order').click();
    });
});
