function renderOrders() {
    getAllOrders()
        .then(res => {
            ordersHTML(res)
        }).catch(error => console.error('Error:', error))
}


function ordersHTML(res){
    const orders = res;
    const ordersList = document.getElementById('orders-list');

    ordersList.innerHTML = '';
    orders.forEach(order => {
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.textContent = `Pedido #${order.orderId}`;
        div.dataset.orderId = order.orderId;
        div.addEventListener('click', function() {
            getOrderDetail(order.orderId);
        });
        ordersList.appendChild(div);
    });
}




