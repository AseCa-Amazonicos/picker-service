function getOrderDetail(orderId) {
    getOrderByOrderId(orderId).then(res =>
        showOrderDetails(res)
    ).catch(error => console.error('Error:', error));
}

function showOrderDetails(res) {
    const items = res.item;
    const orderDetailContainer = document.getElementById('order-detail-container');
    const orderDetailList = document.getElementById('order-detail-list');

    orderDetailContainer.classList.remove('hidden');
    orderDetailList.innerHTML = ''; // Limpiar el contenido previo

    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.textContent = `Name: ${item.name} - Quantity: ${item.quantity}`;
        orderDetailList.appendChild(div);
    });
}

function hideOrderDetails() {
    const orderDetailContainer = document.getElementById('order-detail-container');
    orderDetailContainer.classList.add('hidden');
}
