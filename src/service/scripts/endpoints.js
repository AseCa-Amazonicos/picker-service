function getAllOrders() {
    return fetch(`${apiURL}/order/get_all_orders`)
        .then(response =>
            response.json())
        .catch(error =>
            console.error('Error:', error));
}

function getOrderByOrderId(orderId) {
    return fetch(`${apiURL}/order/get_order_by_id?orderId=${orderId}`, { // Properly format the query string
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json()) // Return the parsed JSON
        .catch(error => console.error('Error:', error));
}

function getAllStock() {
    return fetch(`${apiURL}/stock/get_actual_stock`)
        .then(response =>
            response.json())
        .catch(error =>
            console.error('Error:', error));
}


// Modularize
function addStock() {
    const productId = Number(document.getElementById('item-id').value);
    const name = document.getElementById('item-name').value;
    const warehouseId = Number(document.getElementById('item-location').value);
    const quantity = Number(document.getElementById('item-quantity').value);
    const errorMessage = document.getElementById('error-message');
    console.log(typeof productId, typeof name, typeof warehouseId, typeof quantity);

    fetch(`${apiURL}/stock/add_stock`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId: productId,
            name: name,
            quantity: quantity,
            warehouseId: warehouseId
        })
    })
        .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error(`Failed to add stock: ${response.status}`);
        }
    })
        .then(() =>
            errorMessage.classList.add("hidden") // Hide the error message on success
        )
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = `Error adding stock`; // Set the error message
            errorMessage.classList.remove("hidden"); // Show the error message if there's an error
        });
}
function addWarehouse() {
    const name = document.getElementById('warehouse-name').value.trim(); // Trim to remove any extra spaces
    const errorMessage = document.getElementById('error-message');

    if (name.length === 0) {
        errorMessage.textContent = "El nombre del almacén no puede estar vacío.";
        errorMessage.classList.remove("hidden"); // Show the error message
        return; // Exit the function to prevent the POST request
    }

    fetch(`${apiURL}/warehouse/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name
        })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to add warehouse: ${response.status}`);
            }
        })
        .then(() => {
            errorMessage.classList.add("hidden"); // Hide the error message on success
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = `Error adding warehouse`; // Set the error message
            errorMessage.classList.remove("hidden"); // Show the error message if there's an error
        });
}



function prepareOrder(id) {
    return fetch(`${apiURL}/picker/prepare_order`, { // Return the fetch call
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderId: id
        })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to prepare order: ${response.status}`);
            }
        })
        .catch(error => console.error('Error:', error));
}

function markReadyOrder(id) {
    return fetch(`${apiURL}/picker/ready_to_ship`, { // Return the fetch call
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderId: id
        })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to ready order: ${response.status}`);
            }
        })
        .catch(error => console.error('Error:', error));
}
