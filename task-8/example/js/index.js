// Initialize a new ItemsController
const itemsController = new ItemsController(0);

// Load existing items from localStorage
itemsController.loadItemsFromLocalStorage();

// Select the New Task Form
const newItemForm = document.querySelector('#newItemForm');

// Add an 'onsubmit' event listener
newItemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Select the inputs
    const newItemNameInput = document.querySelector('#newItemNameInput');
    const newItemDescription = document.querySelector('#newItemDescription');
    const newItemImage = document.querySelector('#newItemImage');

    // Get the values of the inputs
    const name = newItemNameInput.value;
    const description = newItemDescription.value;
    const imageUrl = newItemImage.value;

    // Convert the image URL to Base64 and add the item
    convertImageToBase64(imageUrl, (base64Image) => {
        itemsController.addItem(name, description, base64Image); // Agregar el producto con la imagen en Base64

        // Mostrar mensaje de éxito
        showSuccessMessage();

        // Limpiar el formulario
        newItemNameInput.value = '';
        newItemDescription.value = '';
        newItemImage.value = '';

        // Actualizar la tabla de artículos
        displayItemsTable();
    });
});

// Función para mostrar un mensaje flotante de éxito
function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = 'Se agregó producto con éxito';
    message.style.position = 'fixed';
    message.style.bottom = '20px';
    message.style.right = '20px';
    message.style.backgroundColor = 'green';
    message.style.color = 'white';
    message.style.padding = '10px';
    message.style.borderRadius = '5px';
    message.style.zIndex = '1000';
    document.body.appendChild(message);

    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
        document.body.removeChild(message);
    }, 5000);
}

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

// Función para mostrar los artículos en la tabla
function displayItemsTable() {
    const tableBody = document.getElementById('itemsTableBody');
    tableBody.innerHTML = ''; // Limpiar la tabla

    itemsController.items.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td><img src="${item.img}" alt="${item.name}" style="max-width: 100px; max-height: 100px;"></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Función para eliminar un artículo
function deleteItem(id) {
    itemsController.deleteItem(id); // Eliminar el artículo
    displayItemsTable(); // Actualizar la tabla
}

// Al cargar la página, inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    displayItemsTable(); // Mostrar la tabla de artículos
});