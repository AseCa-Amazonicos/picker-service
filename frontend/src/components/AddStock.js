// src/components/AddStock.js
import React, {useEffect, useState} from 'react';
import {addStock, getWarehouses} from '../services/api';
import '../styles.css';

const AddStock = () => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('');

    const handleAddStock = () => {
        addStock({
            quantity: Number(itemQuantity),
            name: itemName,
            warehouseId: Number(selectedWarehouseId),
        })
            .then(() => {
                console.log('Successfully added stock');
                setErrorMessage('');
                setItemName('');
                setItemQuantity('');
            })
            .catch(error => {
                console.error('Error adding stock:', error);
                setErrorMessage('Error adding stock. Please try again.');
            });
    };

    useEffect(() => {
        getWarehouses()
            .then(data => {
                setWarehouses(data);
                setSelectedWarehouseId(data[0]?.id);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div id="add-stock-container">
            <h2>Añadir Stock</h2>
            <div className="form-group">
                <label htmlFor="item-name">Nombre del Producto:</label>
                <input
                    type="text"
                    id="item-name"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="item-location">Warehouse:</label>
                <select
                    id="item-location"
                    value={selectedWarehouseId}
                    onChange={e => setSelectedWarehouseId(e.target.value)}
                    required
                >
                    {warehouses.map(warehouse => (
                        <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="item-quantity">Cantidad:</label>
                <input
                    type="number"
                    id="item-quantity"
                    value={itemQuantity}
                    onChange={e => setItemQuantity(e.target.value)}
                    required
                />
            </div>
            <button id="add-stock-button" onClick={handleAddStock}>
                Añadir
            </button>
            {errorMessage && (
                <p id="error-message" style={{color: 'red'}}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default AddStock;
