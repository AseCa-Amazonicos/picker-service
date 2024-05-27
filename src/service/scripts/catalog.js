function renderCatalog() {
    getAllStock()
        .then(res => {
            catalogHTML(res)
        }).catch(error => console.error('Error:', error))

}

function catalogHTML(res){
    const catalog = res;

    const catalogList = document.getElementById('catalog-list');
    catalogList.innerHTML = '';
    catalog.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('catalog-item');
        div.innerHTML = `
                <span>${item.itemName} - ${item.warehouseName}</span> <!--TODO: item.location-->
                <span>Cantidad: ${item.quantity}</span>
            `;
        catalogList.appendChild(div);
    });
}



