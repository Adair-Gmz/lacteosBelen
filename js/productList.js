function displayProducts() {
    const productList = document.getElementById('products-container');
    productList.innerHTML = ''; // Limpiar la lista

    if(!localStorage.getItem('productsCheese')){
        loadJSON();
    }    
    const products = JSON.parse(localStorage.getItem('productsCheese')) || [];
    // Mostrar cada producto en la lista
    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'col-10 mx-auto product-item ';
        productElement.innerHTML = `
            <div class="row">
                <div class="col-md-5">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%;">
                    </div>
                </div>
                <div class="col-md-7">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <button class="btn add-to-cart-btn mt-3" onclick="addToCart('${index}')">
                        <span class="me-2">+</span> Add to cart
                    </button>
                </div>
            </div>
        `;

        productList.appendChild(productElement);
    });
}

displayProducts();