// Array para almacenar los productos
let productList = [];


function add(product) {
    // Agregar el producto al array
    productList.push(product);
    
    // Actualizar la interfaz
    displayProducts();
    
    
    // Devolver el producto agregado (útil para encadenar operaciones)
    return product;
}


// Muestra los productos en la página HTML

function displayProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Limpiar el contenedor
    
    // Recorrer la lista de productos y crear el HTML para cada uno
    productList.forEach(product => {
        // Crear elemento para el producto
        const productElement = document.createElement('div');
        productElement.className = 'col-10 mx-auto product-item ';
        
        // Verificar si la imagen existe y cargarla con un manejo de errores
        const imagePath = product.img;
        
        // Añadir HTML del producto
        productElement.innerHTML = `
            <div class="row">
                <div class="col-md-5">
                    <div class="product-image">
                        <img src="${imagePath}" alt="${product.name}" 
                             style="max-width: 100%; max-height: 100%;"
                             onerror="this.onerror=null; this.src='quesosSinFondo/placeholder.png'; console.log('Error cargando imagen: ${imagePath}');">
                    </div>
                </div>
                <div class="col-md-7">
                    
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <button class="btn add-to-cart-btn mt-3" onclick="addToCart('${product.name}')">
                        <span class="me-2">+</span> Add to cart
                    </button>
                </div>
            </div>
        `;
        
        // Añadir el producto al contenedor
        container.appendChild(productElement);
    });
}




 // Carga los productos desde un archivo JSON
 
function loadProductsFromJSON() {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Verificar que los datos son un array
            if (!Array.isArray(data)) {
                throw new Error('El formato del JSON no es correcto');
            }
            
            // Agregar cada producto a la lista usando la función add
            data.forEach(product => {
                // Verificar que el producto tiene la estructura correcta
                if (product.name && product.img && product.description) {
                    add(product);
                } else {
                    console.warn('Producto con formato incorrecto:', product);
                }
            });
            
            // Verificar que se agregaron correctamente
            console.log(`Se han agregado ${productList.length} productos a la lista.`);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            
            // Si hay un error al cargar el JSON, usar datos de muestra
            loadSampleProducts();
        });
}



// Al cargar la página, inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    
    // Cargar los productos desde el JSON
    loadProductsFromJSON();
});