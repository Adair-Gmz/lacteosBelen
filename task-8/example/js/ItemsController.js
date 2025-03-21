class ItemsController {
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    // Add a new item
    addItem(name, description, imageUrl) {
        const id = this.generateNewId(); // Generar un nuevo ID
        const item = {
            id: id,
            name: name,
            description: description,
            img: imageUrl
        };

        // Add the item to the list
        this.items.push(item);

        // Save the updated list to localStorage
        localStorage.setItem('products', JSON.stringify(this.items));
    }

    // Delete an item by ID
    deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id); // Filtrar el artículo a eliminar
        localStorage.setItem('products', JSON.stringify(this.items)); // Actualizar localStorage
    }

    // Generate a new ID based on the maximum ID in the list
    generateNewId() {
        if (this.items.length === 0) return 1; // Si no hay productos, empezar con ID 1
        const maxId = Math.max(...this.items.map(product => product.id)); // Encontrar el ID más grande
        return maxId + 1; // Devolver el siguiente ID
    }

    // Load items from localStorage
    loadItemsFromLocalStorage() {
        const storageItems = localStorage.getItem('products');
        if (storageItems) {
            this.items = JSON.parse(storageItems);

            // Set the currentId to the maximum id + 1 to avoid duplicates
            if (this.items.length > 0) {
                this.currentId = this.items[this.items.length - 1].id + 1;
            }
        }
    }
}