// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Catalog from '../../frontend/src/components/Catalog';
import Orders from '../../frontend/src/components/Orders';
import AddStock from '../../frontend/src/components/AddStock';
import AddWarehouse from '../../frontend/src/components/AddWarehouse';
import './App.css';

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
                <Switch>
                    <Route path="/" exact component={Catalog} />
                    <Route path="/add-stock" component={AddStock} />
                    <Route path="/add-warehouse" component={AddWarehouse} />
                    <Route path="/orders" component={Orders} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
