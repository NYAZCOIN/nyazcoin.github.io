// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Send email using EmailJS
            emailjs.send("service_41x5rn2", "template_j6so2ca", {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            })
            .then(() => {
                // Show success message
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'form-message success';
                // Reset form
                contactForm.reset();
            }, (error) => {
                // Show error message
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
                console.error('EmailJS Error:', error);
            });
        });
    }
});
