// src/components/AddWarehouse.js
import React, { useState } from 'react';
import { addWarehouse } from '../services/api';
import '../styles.css';

const AddWarehouse = () => {
    const [warehouseName, setWarehouseName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddWarehouse = () => {
        if (warehouseName.trim().length === 0) {
            setErrorMessage('El nombre del almacén no puede estar vacío.');
            return;
        }

        addWarehouse({ name: warehouseName.trim() }).then(() => {
            setErrorMessage('');
            setWarehouseName('');
        }).catch(error => {
            console.error('Error:', error);
            setErrorMessage('Error adding warehouse. Please try again.');
        });
    };

    return (
        <div id="add-warehouse-container">
            <h2>Crear Warehouse</h2>
            <div className="form-group">
                <label htmlFor="warehouse-name">Nombre del Warehouse:</label>
                <input
                    type="text"
                    id="warehouse-name"
                    value={warehouseName}
                    onChange={e => setWarehouseName(e.target.value)}
                    required
                />
            </div>
            <button id="add-warehouse-button" onClick={handleAddWarehouse}>Añadir</button>
            {errorMessage && <p id="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default AddWarehouse;
