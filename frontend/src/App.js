// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Catalog from './components/Catalog';
import Orders from './components/Orders';
import AddStock from './components/AddStock';
import AddWarehouse from './components/AddWarehouse';
import './App.css';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="container">
                <nav>
                    <Link to="/">Ver Stock</Link>
                    <Link to="/add-stock">Añadir Stock</Link>
                    <Link to="/add-warehouse">Añadir Warehouse</Link>
                    <Link to="/orders">Ver Pedidos</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Catalog />} />
                    <Route path="/add-stock" element={<AddStock />} />
                    <Route path="/add-warehouse" element={<AddWarehouse />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
