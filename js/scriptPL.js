// Array para almacenar los productos
let productList = [];

// Función para convertir una imagen a Base64
function convertImageToBase64(url, callback) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => callback(reader.result);
            reader.readAsDataURL(blob);
        })
        .catch(error => {
            console.error('Error al convertir la imagen a Base64:', error);
            callback(url); // Si falla la conversión, usar la URL original
        });
}

// Función para generar un nuevo ID basado en el ID más grande en localStorage y en los productos predeterminados
function generateNewId() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const defaultProducts = productList; // Productos predeterminados ya cargados
    const allProducts = [...storedProducts, ...defaultProducts]; // Combinar ambos arrays

    if (allProducts.length === 0) return 1; // Si no hay productos, empezar con ID 1
    const maxId = Math.max(...allProducts.map(product => product.id)); // Encontrar el ID más grande
    return maxId + 1; // Devolver el siguiente ID
}

// Función para crear un nuevo producto
function createProduct(name, img, description) {
    const id = generateNewId(); // Generar un nuevo ID
    return {
        id: id,
        name: name,
        img: img,
        description: description
    };
}

// Función para agregar un producto
function add(product) {
    // Convertir la imagen a Base64 antes de agregar el producto
    convertImageToBase64(product.img, (base64Image) => {
        product.img = base64Image; // Reemplazar la URL con Base64
        productList.push(product);
        localStorage.setItem('products', JSON.stringify(productList)); // Guardar en localStorage
        displayProducts();
    });
}

// Función para mostrar los productos
function displayProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Limpiar el contenedor

    productList.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-10 mx-auto product-item';

        productElement.innerHTML = `
            <div class="row">
                <div class="col-md-5">
                    <div class="product-image">
                        <img src="${product.img}" alt="${product.name}" 
                             style="max-width: 100%; max-height: 100%;"
                             onerror="this.onerror=null; this.src='../Pic/quesosSinFondo/Botaneras-sin.png'; console.log('Error cargando imagen: ${product.img}');">
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
        container.appendChild(productElement);
    });
}

// Función para cargar productos predeterminados desde JSON
function loadDefaultProducts() {
    fetch('../Pic/products.json')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('El formato del JSON no es correcto');
            data.forEach(product => {
                if (product.name && product.img && product.description) {
                    // Verificar si el producto ya existe en localStorage para evitar duplicados
                    const existingProduct = productList.find(p => p.id === product.id);
                    if (!existingProduct) {
                        productList.push(product); // Agregar el producto predeterminado
                    }
                } else {
                    console.warn('Producto con formato incorrecto:', product);
                }
            });
            localStorage.setItem('products', JSON.stringify(productList)); // Guardar en localStorage
            console.log(`Se han agregado ${productList.length} productos predeterminados a la lista.`);
        })
        .catch(error => {
            console.error('Error al cargar los productos predeterminados:', error);
        });
}

// Función para cargar productos desde localStorage
function loadProductsFromLocalStorage() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (storedProducts.length > 0) {
        productList = storedProducts; // Cargar productos desde localStorage
        console.log('Productos cargados desde localStorage.');
    } else {
        loadDefaultProducts(); // Cargar productos predeterminados si no hay datos en localStorage
    }
}

// Al cargar la página, inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromLocalStorage(); // Cargar productos desde localStorage o predeterminados
    displayProducts(); // Mostrar los productos
});