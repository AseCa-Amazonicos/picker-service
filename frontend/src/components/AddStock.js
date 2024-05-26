// src/components/AddStock.js
import React, { useState } from 'react';
import { addStock } from '../services/api';
import '../styles.css';

const AddStock = () => {
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemLocation, setItemLocation] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddStock = () => {
        addStock({
            productId: Number(itemId),
            name: itemName,
            quantity: Number(itemQuantity),
            warehouseId: Number(itemLocation),
        }).then(() => {
            setErrorMessage('');
            setItemId('');
            setItemName('');
            setItemLocation('');
            setItemQuantity('');
        }).catch(error => {
            console.error('Error:', error);
            setErrorMessage('Error adding stock. Please try again.');
        });
    };

    return (
        <div id="add-stock-container">
            <h2>Añadir Stock</h2>
            <div className="form-group">
                <label htmlFor="item-id">Id del Producto:</label>
                <input type="text" id="item-id" value={itemId} onChange={e => setItemId(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="item-name">Nombre del Producto:</label>
                <input type="text" id="item-name" value={itemName} onChange={e => setItemName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="item-location">ID del Warehouse:</label>
                <input type="text" id="item-location" value={itemLocation} onChange={e => setItemLocation(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="item-quantity">Cantidad:</label>
                <input type="number" id="item-quantity" value={itemQuantity} onChange={e => setItemQuantity(e.target.value)} required />
            </div>
            <button id="add-stock-button" onClick={handleAddStock}>Añadir</button>
            {errorMessage && <p id="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default AddStock;
