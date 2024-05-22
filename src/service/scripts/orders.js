// orders.js
function renderOrders() {
    const orders = [
        { id: 1, items: [{ name: 'Producto A', location: 'Pasillo 1', quantity: 2 }, { name: 'Producto B', location: 'Pasillo 3', quantity: 1 }] },
        { id: 2, items: [{ name: 'Producto C', location: 'Pasillo 2', quantity: 5 }, { name: 'Producto D', location: 'Pasillo 4', quantity: 3 }] },
        { id: 3, items: [{ name: 'Producto E', location: 'Pasillo 1', quantity: 2 }, { name: 'Producto F', location: 'Pasillo 5', quantity: 4 }] },
    ];

    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';
    orders.forEach(order => {
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.textContent = `Pedido #${order.id}`;
        div.dataset.orderId = order.id;
        div.addEventListener('click', function() {
            showOrderDetail(order.id, orders);
        });
        ordersList.appendChild(div);
    });
}

function showOrderDetail(orderId, orders) {
    const order = orders.find(o => o.id === orderId);
    const orderDetailList = document.getElementById('order-detail-list');
    orderDetailList.innerHTML = '';
    order.items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('order-detail-item');
        div.innerHTML = `
            <span>${item.name} - ${item.location}</span>
            <span>Cantidad: ${item.quantity}</span>
        `;
        orderDetailList.appendChild(div);
    });
    document.getElementById('orders-container').classList.add('hidden');
    document.getElementById('order-detail-container').classList.remove('hidden');
}
