// src/services/api.js
const apiURL = 'http://localhost:3000/api/picker';

export const getAllOrders = () =>
    fetch(`${apiURL}/order/get_all_orders`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));

export const getOrderByOrderId = orderId =>
    fetch(`${apiURL}/order/get_order_by_id?orderId=${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));

export const getAllStock = () =>
    fetch(`${apiURL}/stock/get_actual_stock`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));

export const addStock = stock =>
    fetch(`${apiURL}/stock/add_stock`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to add stock: ${response.status}`);
            }
        })
        .catch(error => console.error('Error:', error));

export const addWarehouse = warehouse =>
    fetch(`${apiURL}/warehouse/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(warehouse),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to add warehouse: ${response.status}`);
            }
        })
        .catch(error => console.error('Error:', error));

export const prepareOrder = orderId =>
    fetch(`${apiURL}/picker/prepare_order`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({orderId}),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to prepare order: ${response.status}`);
            }
        })
        .catch(error => console.error('Error:', error));

export const markReadyOrder = orderId =>
    fetch(`${apiURL}/picker/ready_to_ship`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({orderId}),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to ready order: ${response.status}`);
            }
        })
        .catch(error => console.error('Error:', error));
