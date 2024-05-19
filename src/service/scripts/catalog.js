function renderCatalog() {
    const catalog = [
        { id: 1, name: 'Producto A', location: 'Pasillo 1', quantity: 10 },
        { id: 2, name: 'Producto B', location: 'Pasillo 3', quantity: 20 },
        { id: 3, name: 'Producto C', location: 'Pasillo 2', quantity: 15 },
        { id: 4, name: 'Producto D', location: 'Pasillo 4', quantity: 5 },
        { id: 5, name: 'Producto E', location: 'Pasillo 1', quantity: 8 },
        { id: 6, name: 'Producto F', location: 'Pasillo 5', quantity: 12 },
    ];

    const catalogList = document.getElementById('catalog-list');
    catalogList.innerHTML = '';
    catalog.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('catalog-item');
        div.innerHTML = `
                <span>${item.name} - ${item.location}</span>
                <span>Cantidad: ${item.quantity}</span>
            `;
        catalogList.appendChild(div);
    });
}
