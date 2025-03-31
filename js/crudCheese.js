function sendForm() {
    //Obtener los datos de las variables
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const image = document.querySelector('#image').files[0];
    const alert = document.getElementById('alert');
    //Comprobacion con JS que todos los campos esten completos
    if (!name || !price || !description || !image)
    {
        alert.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 20 20">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
                <div>
                    Llene todos los campos del formulario
                </div>
            </div>`;
        if(!name){
            document.getElementById("name").style.border = '0.1vh solid';
            document.getElementById("name").style.borderColor = 'red';
        }
        if(!price){
            document.getElementById("price").style.border = '0.1vh solid';
            document.getElementById("price").style.borderColor = 'red';
        }
        if(!description){
            document.getElementById("description").style.border = '0.1vh solid';
            document.getElementById("description").style.borderColor = 'red';
        }
        if(!image){
            document.getElementById("image").style.border = '0.1vh solid';
            document.getElementById("image").style.borderColor = 'red';
        }
        setTimeout(function() {
            alert.innerHTML = '';
            document.getElementById("name").style.border = '';
            document.getElementById("name").style.borderColor = '';
            document.getElementById("price").style.border = '';
            document.getElementById("price").style.borderColor = '';
            document.getElementById("description").style.border = '';
            document.getElementById("description").style.borderColor = '';
            document.getElementById("image").style.border = '';
            document.getElementById("image").style.borderColor = '';
        }, 5000);
        return;
    }
    else
    {
        // Convertir la imagen a base64
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = function () {
            const base64Image = reader.result;

            // Crear el JSON
            const productCheese = {
                name: name,
                price: price,
                description: description,
                image: base64Image
            };

            // Obtener los productos almacenados en localStorage
            let productsCheese = JSON.parse(localStorage.getItem('productsCheese')) || [];

            // Agregar nuevo producto
            productsCheese.push(productCheese);

            // Guardar cambios localStorage
            localStorage.setItem('productsCheese', JSON.stringify(productsCheese));
            // Mostrar los productos
            displayProducts();
            // Limpiar los campos del formulario
            document.getElementById('name').value = '';
            document.getElementById('price').value = '';
            document.getElementById('description').value = '';
            document.querySelector('#image').value = '';
            const previewImage =  document.getElementById('previewImage');
            previewImage.remove();//Remover el img que muestra la preview de la imagen
            alert.innerHTML = `
                <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill me-2" viewBox="0 0 20 20">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                    <div>
                        Producto almacenado exitosamente
                    </div>
                </div>`;
            setTimeout(function() {
                alert.innerHTML = '';
            }, 5000);
        };
    }
}

//Mostrar la preview de la imagen
document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];  // Obtener la imagen que cargo el usuario

    if (file) {
        const reader = new FileReader();  // Crear una instancia de FileReader

        // Mostrar la vista previa
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            // Usamos innerHTML para insertar la imagen en el contenedor
            preview.innerHTML = `<img src="${e.target.result}" id="previewImage" class="w-25 mb-2">`;
        }

        // Cargar la imagen
        reader.readAsDataURL(file);
    }
});

function displayProducts() {
    const productList = document.getElementById('showProducts');
    productList.innerHTML = ''; // Limpiar la lista
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
                    <button class="btn btn-primary" onclick="updateProduct('${index}')">
                        <span class="me-2">Modificar Producto</span>
                    </button>
                    
                    <button class="btn btn-primary" onclick="deleteProduct('${index}')">
                        <span class="me-2">Eliminar Producto</span>
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(productElement);
    });
}
function reloadJSON(){
    if(!localStorage.getItem('productsCheese')){
        loadJSON();
        displayProducts();
    }
}
displayProducts();