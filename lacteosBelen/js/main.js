// Inicializar componentes cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dropdowns
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl)
    });
    
    // Inicializar navbar scroll effect
    initNavbarScroll();
    
    // Inicializar active nav links
    initActiveNavLinks();
    
    // Inicializar el tema
    initTheme();
    
    // Inicializar contador del carrito
    updateCartCount();
});

// Efecto de cambio de navbar al hacer scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Función para actualizar los enlaces de navegación activos
function initActiveNavLinks() {
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    
    // Establecer el enlace "Inicio" como activo por defecto
    // document.querySelector('.navbar .nav-link[href="#inicio"]').classList.add('active');
    
    // Añadir event listeners a los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase active al enlace clicado
            this.classList.add('active');
            
            // Si hay un dropdown de navbar abierto, cerrarlo
            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            if (navbarCollapse) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
}

// Actualizar enlaces activos basados en la sección visible
function updateActiveNavLinksOnScroll() {
    // Obtener todas las secciones
    const sections = document.querySelectorAll('section[id]');
    
    // Si no hay secciones, salir
    if (sections.length === 0) return;
    
    // Obtener la posición actual de desplazamiento
    const scrollPosition = window.scrollY;

    // Variable para controlar si alguna sección está activa
    let activeSection = false;
    
    // Revisar cada sección para ver si está en el viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remover clase active de todos los enlaces
            document.querySelectorAll('.navbar .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Añadir clase active al enlace correspondiente
            const correspondingLink = document.querySelector(`.navbar .nav-link[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
                activeSection = true;
            }
        }
    });
}

// Función para alternar entre modos oscuro y claro
function toggleDarkMode() {
    // Verifica el estado actual del tema
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    
    // Cambia el atributo data-theme en el body
    if (isDarkMode) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Inicializa el tema según la preferencia guardada
function initTheme() {
    // Verifica si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    
    // Si no hay preferencia guardada, verifica la preferencia del sistema
    if (!savedTheme) {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            document.body.setAttribute('data-theme', 'dark');
            document.getElementById('darkModeToggle').checked = true;
        }
    } else if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('darkModeToggle').checked = true;
    }
    
    // Agrega el evento de cambio al toggle
    document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    // Esta función actualizaría el contador basado en el contenido del carrito
    // Por ahora solo simula una cantidad de ejemplo
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        // Aquí podría cargar el número real de elementos desde localStorage o estado de la aplicación
        const count = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')).length : 0;
        cartCount.textContent = count;
    }
}

// Event listener para el botón del carrito
document.getElementById('cartBtn').addEventListener('click', function(e) {
    e.preventDefault();
    // Aquí iría la lógica para mostrar el carrito
    alert('Carrito de compras - Funcionalidad por implementar');
});