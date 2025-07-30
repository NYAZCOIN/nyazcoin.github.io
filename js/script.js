document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 26, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 26, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Add floating animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('floating');
    }

    // Whitepaper download tracking
    const whitepaperBtn = document.querySelector('.btn-whitepaper');
    if (whitepaperBtn) {
        whitepaperBtn.addEventListener('click', function() {
            // Add analytics tracking here if needed
            console.log('Whitepaper downloaded');
        });
    }
});