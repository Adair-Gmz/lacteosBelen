document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Simple validation
        if (name.value && email.value && message.value) {
            // Show success message with smooth animation
            successMessage.style.display = 'block';
            successMessage.classList.add('animate__animated', 'animate__fadeIn');
            
            // Reset form and hide message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                contactForm.reset();
            }, 3000);
        }
    });
});