// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formLoader = document.getElementById('formLoader');
    const submitText = document.getElementById('submitText');
    const formSuccess = document.getElementById('formSuccess');

    // Real-time Validation
    contactForm.addEventListener('input', function(e) {
        const field = e.target;
        if (field.validity.valid) {
            clearError(field.id);
        }
    });

    // Form Submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            // Show loading state
            submitText.textContent = 'Sending...';
            formLoader.style.display = 'block';
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                date: new Date().toLocaleString()
            };

            // Send via EmailJS
            const response = await emailjs.send(
                'service_41x5rn2', // Service ID
                'template_j6so2ca', // Template ID
                formData
            );
            
            // Success handling
            showSuccess('Message sent successfully! We\'ll respond within 24 hours.');
            contactForm.reset();
            
        } catch (error) {
            console.error('Email Error:', error);
            showError('Failed to send message. Please try again or contact us on Telegram.');
        } finally {
            submitText.textContent = 'Send Message';
            formLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    // Validation Functions
    function validateForm() {
        let isValid = true;
        const fields = ['name', 'email', 'message'];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.validity.valid) {
                showError(fieldId, getValidationMessage(field));
                isValid = false;
            }
        });
        
        return isValid;
    }

    function getValidationMessage(field) {
        if (field.validity.valueMissing) {
            return 'This field is required';
        } else if (field.validity.typeMismatch) {
            return 'Please enter a valid email address';
        } else if (field.validity.tooShort) {
            return `Minimum ${field.minLength} characters required`;
        }
        return '';
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    function showSuccess(message) {
        formSuccess.textContent = message;
        formSuccess.style.display = 'block';
        setTimeout(() => {
            formSuccess.style.opacity = '0';
            setTimeout(() => {
                formSuccess.style.display = 'none';
                formSuccess.style.opacity = '1';
            }, 500);
        }, 5000);
    }
});

// Add to style.css:
/*
.form-loader {
    display: none;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top: 2px solid white;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-left: 10px;
}
.error-message {
    color: #ff5555;
    font-size: 0.8rem;
    margin-top: 5px;
    display: none;
}
.success-message {
    background: rgba(20, 241, 149, 0.2);
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
    display: none;
}
*/