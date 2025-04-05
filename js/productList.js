// function displayProducts() {
//     const productList = document.getElementById('products-container');
//     productList.innerHTML = ''; // Limpiar la lista

//     if(!localStorage.getItem('productsCheese')){
//         loadJSON();
//     }    
//     const products = JSON.parse(localStorage.getItem('productsCheese')) || [];
//     // Mostrar cada producto en la lista
//     products.forEach((product, index) => {
//         const productElement = document.createElement('div');
//         productElement.className = 'col-10 mx-auto product-item ';
//         productElement.innerHTML = `
//             <div class="row">
//                 <div class="col-md-5">
//                     <div class="product-image">
//                         <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%;">
//                     </div>
//                 </div>
//                 <div class="col-md-7">
//                     <h4>${product.name}</h4>
//                     <p>${product.description}</p>
//                     <button class="btn add-to-cart-btn mt-3" onclick="addToCart('${index}')">
//                         <span class="me-2">+</span> Add to cart
//                     </button>
//                 </div>
//             </div>
//         `;

//         productList.appendChild(productElement);
//     });
// }

// displayProducts();


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
        productElement.className = 'product-card-horizontal mb-4';
        productElement.innerHTML = `
    <div class="card flex-row product-card-custom shadow-sm">
        <div class="product-image-container-horizontal">
            <img src="${product.image}" alt="${product.name}" class="img-fluid product-img-horizontal">
        </div>
        <div class="card-body d-flex flex-column justify-content-between position-relative">
            <div>
                <h5 class="card-title mb-2">${product.name}</h5>
                <p class="card-text text-muted">${product.description}</p>
            </div>
            <div class="add-to-cart-wrapper">
                <button class="btn btn-sm btn-primary add-to-cart-btn" onclick="addToCart('${index}')">
                    <i class="fas fa-shopping-cart me-1"></i> Añadir
                </button>
            </div>
        </div>
    </div>
    `;

        productList.appendChild(productElement);
    });
}

// Mostrar los productos
displayProducts();