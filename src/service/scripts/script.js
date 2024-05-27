const apiURL = 'http://localhost:3000/api/picker';

document.addEventListener('DOMContentLoaded', function() {
    const orderContent = document.getElementById('order-content');
    const stockContent = document.getElementById('stock-content');

    document.getElementById('view-orders').addEventListener('click', function() {
        loadContent('orders.html', 'orders');
    });

    document.getElementById('view-catalog').addEventListener('click', function() {
        loadContent('catalog.html', 'catalog');
    });

    document.getElementById('add-stock').addEventListener('click', function() {
        loadContent('add-stock.html', 'stock');
    });

    document.getElementById('add-warehouse').addEventListener('click', function() {
        loadContent('add-warehouse.html', 'warehouse');
    })

    function loadContent(url, type) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                if (type === 'orders') {
                    orderContent.innerHTML = html;
                    renderOrders();  // Call function from orders.js
                } else if (type === 'catalog') {
                    stockContent.innerHTML = html;
                    renderCatalog();  // Define this function as needed
                } else if (type === 'stock') {
                    stockContent.innerHTML = html;
                }
                else if (type === 'warehouse') {
                    stockContent.innerHTML = html;
                }
            })
            .catch(error => console.error('Error loading content:', error));
    }

});
