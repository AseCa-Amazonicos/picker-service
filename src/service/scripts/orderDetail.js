var currentOrderId = 0;

function getOrderDetail(orderId) {
    getOrderByOrderId(orderId).then(res =>{
        showOrderDetails(res)
        showStatusButton(res.status);
    })
        .catch(error => console.error('Error:', error));
}

function showOrderDetails(res) {
    const items = res.item;
    const orderDetailContainer = document.getElementById('order-detail-container');
    const orderDetailList = document.getElementById('order-detail-list');
    currentOrderId = res.orderId;
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

function showStatusButton(status) {
    const statusButton = document.getElementById('complete-order');
    console.log(status)
    if(status === 'NOT_STARTED') {
        showIfHidden(); //show the button if it was hidden
        statusButton.textContent = "Marcar como preparando";
        // on click: it marks the order as prepared and refreshes the order detail
        statusButton.setAttribute('onclick', `handlePrepareOrder(${currentOrderId})`);
    }
    if(status === 'PREPARING') {
        showIfHidden();
        statusButton.textContent = "Marcar como completado";
        statusButton.setAttribute('onclick', `handleMakeReadyOrder(${currentOrderId})`);
    }
    if(status === 'READY_TO_SHIP') {
        statusButton.classList.add('hidden'); //hide the button
    }
}

function showIfHidden() {
    const statusButton = document.getElementById('complete-order');
    if(statusButton.classList.contains('hidden')) {
        statusButton.classList.remove('hidden');
    }
}


// When the order is marked as prepared, the status changes to 'PREPARING' and the order refreshes
function handlePrepareOrder(orderId) {
    prepareOrder(orderId).then(() => {
        getOrderDetail(orderId);
    }).catch(error => console.error('Error:', error));
}

function handleMakeReadyOrder(orderId) {
    markReadyOrder(orderId).then(() => {
        getOrderDetail(orderId);
        renderCatalog();
    }).catch(error => console.error('Error:', error));
}

