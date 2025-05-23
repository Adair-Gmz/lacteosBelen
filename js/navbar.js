// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initially hide the sticky navbar
    const stickyNavbar = document.getElementById('stickyNavbar');
    
    // Add animation classes to navbar elements when the page loads
    animateNavElements();
    
    // Handle scrolling effects for sticky navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 150) {
            // Show sticky navbar when scrolled down
            stickyNavbar.classList.add('visible');
            
            // Animate elements when the sticky navbar becomes visible
            if (!stickyNavbar.classList.contains('animated')) {
                stickyNavbar.classList.add('animated');
                animateStickyNavElements();
            }
        } else {
            // Hide sticky navbar when at the top
            stickyNavbar.classList.remove('visible');
            stickyNavbar.classList.remove('animated');
        }
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .nav-link, .dropdown-item, .nav-icon-link');
    buttons.forEach(function(button) {
        button.addEventListener('click', createRipple);
    });
    
    // Dropdown hover effect (for desktop)
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth >= 992) { // Only on desktop
        dropdowns.forEach(function(dropdown) {
            dropdown.addEventListener('mouseenter', function() {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.add('show');
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('show');
                }
            });
        });
    }
    

    
    // Mobile menu enhancements
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            // Add some animation when the mobile menu is toggled
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.add('animate__animated', 'animate__fadeOutUp');
                setTimeout(function() {
                    navbarCollapse.classList.remove('animate__animated', 'animate__fadeOutUp', 'show');
                }, 300);
            } else {
                navbarCollapse.classList.add('animate__animated', 'animate__fadeInDown');
                setTimeout(function() {
                    navbarCollapse.classList.remove('animate__animated', 'animate__fadeInDown');
                }, 300);
            }
        });
    }
});

// Function to animate main navbar elements
function animateNavElements() {
    const elements = document.querySelectorAll('#mainNavbar .animate__animated');
    
    elements.forEach(function(element) {
        // Get animation delay if specified
        const delay = element.getAttribute('data-animation-delay') || '0';
        
        // Add fadeIn animation
        element.classList.add('animate__fadeIn');
        
        // Set animation delay
        element.style.animationDelay = parseInt(delay) / 1000 + 's';
    });
}

// Function to animate sticky navbar elements
function animateStickyNavElements() {
    const elements = document.querySelectorAll('#stickyNavbar .animate__animated');
    
    elements.forEach(function(element) {
        // Get animation delay if specified
        const delay = element.getAttribute('data-animation-delay') || '0';
        
        // Add fadeInDown animation
        element.classList.add('animate__fadeInDown');
        
        // Set animation delay
        element.style.animationDelay = parseInt(delay) / 1000 + 's';
    });
}

// Create ripple effect function
function createRipple(event) {
    const button = event.currentTarget;
    
    // Create ripple element
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    // Remove existing ripples
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    // Add ripple to button
    button.appendChild(circle);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        circle.remove();
    }, 600);
}



// Toast notification function
function showToast(message) {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    
    
    // Add toast to container
    document.querySelector('.toast-container').innerHTML += toastHTML;
    
    // Initialize and show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    toast.show();
    
    // Remove toast after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}