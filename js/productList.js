// Datos de los productos
const products = [
    {
        id: 1,
        name: "Queso Fresco",
        description: "El queso fresco es un queso blanco, suave y desmoronable, de sabor suave y láctico. Es uno de los más tradicionales en la cocina mexicana y se utiliza comúnmente para espolvorear sobre antojitos como enchiladas, sopes y tacos.",
        image: "../Pic/quesosSinFondo/Queso-fresco-ch.png",
        featured: false
    },
    {
        id: 2,
        name: "Queso Panela",
        description: "El queso panela es un queso fresco de textura suave y húmeda, elaborado a base de leche pasteurizada de vaca, su sabor es delicado y ligeramente salado.",
        image: "../Pic/quesosSinFondo/Panela-chica.png",
        featured: true
    },
    {
        id: 3,
        name: "Adobera fresca",
        description: "El queso adobera fresco es un queso semiblando de forma rectangular, originario del occidente de México. Tiene una textura compacta pero cremosa, con un sabor suave y ligeramente ácido.",
        image: "../Pic/quesosSinFondo/abobera-fresco.png",
        featured: false
    },
    {
        id: 4,
        name: "Adobera seca ",
        description: "El queso adobera seco es una versión madurada del adobera fresco. Su textura es más firme y su sabor más concentrado, con notas salinas y lácticas más intensas.",
        image: "../Pic/quesosSinFondo/adobera-seca.png",
        featured: false
    },
    {
        id: 5,
        name: "Adobera enchilada",
        description: "Este queso es una variante del adobera seco, cubierto con una mezcla de chile seco en polvo que le da un sabor picante y un aspecto rojizo distintivo. La combinación del queso madurado con el chile ofrece un perfil de sabor complejo.",
        image: "../Pic/quesosSinFondo/adobera-enchilada.png",
        featured: true
    },
    {
        id: 6,
        name: "Jocoque",
        description: "El jocoque es un producto lácteo fermentado, entre queso y yogur, de consistencia cremosa, sabor ácido y rico en probióticos. ",
        image: "../Pic/quesosSinFondo/Bolsa jocoque.png",
        featured: false
    },
    {
        id: 7,
        name: "Requeson",
        description: "El requesón es un queso fresco de textura granulosa, suave y húmeda, elaborado con el suero de leche que queda tras la producción de otros quesos.",
        image: "../Pic/quesosSinFondo/Requeson png.png",
        featured: false
    },
    
    {
        id: 8,
        name: "Botanera",
        description: "Pregunta por diponibilidad, producto solo por encargo",
        image: "../Pic/quesosSinFondo/Botaneras-sin.png",
        featured: false
    }
];

// Función para crear las tarjetas de productos
function createProductCards() {
    const container = document.getElementById('products-container');
    
    products.forEach(product => {
        const productCard = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="product-card">
                    ${product.featured ? '<div class="featured-badge">Popular</div>' : ''}
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    createProductCards();
    
    // Animación de entrada
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});