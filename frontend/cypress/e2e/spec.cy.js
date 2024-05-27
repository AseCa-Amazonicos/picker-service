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
                body: {warehouseId: 3, productId: 10, quantity: 100},
            }
        ).as('getStock');

        // Visit the app
        cy.visit('http://localhost:3001/add-warehouse'); // Navigate to the correct route

        // Wait for the #warehouse-name-input element to appear
        cy.get('#warehouse-name').type('Palermo');
        cy.wait(1000);
        cy.get('#add-warehouse-button').then($button => {
            cy.wait(1000); // Wait for 1 second
            $button.click();
        });
        cy.wait('@createWarehouse');

        // Navigate to the add stock page
        cy.visit('http://localhost:3001/add-stock');

        // Add stock
        cy.get('#item-id').type('10');
        cy.wait(1000);
        cy.get('#item-name').type('Mate');
        cy.wait(1000);
        cy.get('#item-location').type('3');
        cy.wait(1000);
        cy.get('#item-quantity').type('100');
        cy.wait(1000);
        cy.get('#add-stock-button').click();
        cy.wait('@addStock');

        // Navigate to the catalog page
        cy.visit('http://localhost:3001/');

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
        cy.visit('http://localhost:3001/');

        // Wait for the getAllStock API call to complete
        cy.wait('@getAllStock');

        // Check if the added product is present in the catalog
        cy.contains('Mate').should('be.visible'); // Replace 'Mate' with the actual name of the product

        cy.wait(3000);

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
                                quantity: 100,
                            },
                        ],
                    },
                ],
            }
        ).as('getAllOrders');

        // Navigate to the orders page
        cy.visit('http://localhost:3001/orders');

        // Wait for the getAllOrders API call to complete
        cy.wait('@getAllOrders');

        // Check if the order is present in the list
        cy.contains('Pedido #1');

        cy.wait(3000);

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
                            quantity: 100,
                        },
                    ],
                },
            }
        ).as('getOrderByOrderId');

        // Click on the order to view the details
        cy.contains('Pedido #1').click();
        cy.wait('@getOrderByOrderId');
    });
});
