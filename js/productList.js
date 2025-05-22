function displayProducts() {
    const productList = document.getElementById('products-container');
    productList.innerHTML = ''; // Limpiar la lista

    if (!localStorage.getItem('productsCheese')) {
        loadJSON();
    }

    const products = JSON.parse(localStorage.getItem('productsCheese')) || [];

    // Crear filas de 2 columnas
    for (let i = 0; i < products.length; i += 2) {
        const row = document.createElement('div');
        row.className = 'row mb-4';

        // Primera columna
        [0, 1].forEach(j => {
            if (products[i + j]) {
                const product = products[i + j];
                const col = document.createElement('div');
                col.className = 'col-md-6 mb-3';

                col.innerHTML = `
                    <div class="card flex-row product-card-custom shadow-sm">
                        <div class="product-image-container-horizontal">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid product-img-horizontal">
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between position-relative">
                            <div>
                                <h5 class="card-title mb-2">${product.name}</h5>
                                <p class="card-text text-muted">${product.description}</p>
                            </div>
                           
                        </div>
                    </div>
                `;
                row.appendChild(col);
            }
        });

        productList.appendChild(row);
    }
}

// Mostrar los productos
displayProducts();