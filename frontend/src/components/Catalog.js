// src/components/Catalog.js
import React, { useEffect, useState } from 'react';
import { getAllStock } from '../services/api';
import '../styles.css';

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        getAllStock()
            .then((data) => {
                setCatalog(data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false); // Set loading to false on error
            });
    }, []);

    return (
        <div id="catalog-container">
            <h2>Catálogo de Items</h2>
            {loading ? ( // Render loading indicator if loading is true
                <div>Loading...</div>
            ) : (
                <div id="catalog-list">
                    {catalog.map(item => (
                        <div key={item.itemId} className="catalog-item">
                            <span>{item.itemName} - {item.warehouseName}</span>
                            <span>Cantidad: {item.quantity}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Catalog;
