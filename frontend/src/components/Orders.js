// src/components/Orders.js
import React, { useEffect, useState } from 'react';
import { getAllOrders, getOrderByOrderId, prepareOrder, markReadyOrder } from '../services/api';
import '../styles.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);

    useEffect(() => {
        getAllOrders().then(setOrders).catch(error => console.error('Error:', error));
    }, []);

    const handleOrderClick = (orderId) => {
        getOrderByOrderId(orderId).then(setOrderDetail).catch(error => console.error('Error:', error));
    };

    const handlePrepareOrder = (orderId) => {
        prepareOrder(orderId).then(() => handleOrderClick(orderId)).catch(error => console.error('Error:', error));
    };

    const handleMakeReadyOrder = (orderId) => {
        markReadyOrder(orderId).then(() => handleOrderClick(orderId)).catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <div id="orders-container">
                <h2>Lista de Pedidos</h2>
                <div id="orders-list">
                    {orders.map(order => (
                        <div key={order.orderId} className="order-item" onClick={() => handleOrderClick(order.orderId)}>
                            Pedido #{order.orderId}
                        </div>
                    ))}
                </div>
            </div>
            {orderDetail && (
                <div id="order-detail-container">
                    <h2>Detalle del Pedido</h2>
                    <div id="order-detail-list">
                        {orderDetail.item.map(item => (
                            <div key={item.itemId} className="order-item">
                                Name: {item.name} - Quantity: {item.quantity}
                            </div>
                        ))}
                    </div>
                    {orderDetail.status !== 'READY_TO_SHIP' && (
                        <button
                            id="complete-order"
                            onClick={() =>
                                orderDetail.status === 'NOT_STARTED'
                                    ? handlePrepareOrder(orderDetail.orderId)
                                    : handleMakeReadyOrder(orderDetail.orderId)
                            }
                        >
                            {orderDetail.status === 'NOT_STARTED' ? 'Marcar como preparando' : 'Marcar como completado'}
                        </button>
                    )}

                    <button id="incomplete-order" onClick={() => setOrderDetail(null)}>Volver a los pedidos</button>
                </div>
            )}
        </div>
    );
};

export default Orders;
