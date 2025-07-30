document.addEventListener('DOMContentLoaded', function() {
    // ===== 1. Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== 2. Dynamic Header =====
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 26, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 26, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // ===== 3. Hero Animation =====
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('floating');
        
        // Additional hover effect for CTA buttons
        const ctaButtons = heroContent.querySelectorAll('.btn');
        ctaButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.querySelector('i').style.transform = 'rotate(10deg)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.querySelector('i').style.transform = 'rotate(0)';
            });
        });
    }

    // ===== 4. Icon Animations =====
    // Social icons hover effect
    const socialIcons = document.querySelectorAll('.social-link i');
    socialIcons.forEach(icon => {
        icon.parentElement.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });
        icon.parentElement.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });

    // Mechanic cards icon effects
    const mechanicIcons = document.querySelectorAll('.mechanic-card i');
    mechanicIcons.forEach(icon => {
        icon.style.transition = 'transform 0.3s ease';
        icon.parentElement.addEventListener('mouseenter', () => {
            if (icon.classList.contains('fa-fire')) {
                icon.style.transform = 'scale(1.2) translateY(-2px)';
                icon.style.color = '#ff4500'; // Brighter fire color
            } else {
                icon.style.transform = 'scale(1.1)';
            }
        });
        icon.parentElement.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
            if (icon.classList.contains('fa-fire')) {
                icon.style.color = '';
            }
        });
    });

    // ===== 5. Whitepaper Tracking =====
    const whitepaperBtn = document.querySelector('.btn-whitepaper');
    if (whitepaperBtn) {
        whitepaperBtn.addEventListener('click', function() {
            // Example: Send event to analytics
            console.log('Whitepaper download initiated');
            // ga('send', 'event', 'Whitepaper', 'download');
        });
    }

    // ===== 6. Mobile Menu (Future-Proofing) =====
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    document.querySelector('nav').appendChild(mobileMenuBtn);

    function checkMobile() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'flex';
            document.querySelector('.nav-links').style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            document.querySelector('.nav-links').style.display = 'flex';
        }
    }

    window.addEventListener('resize', checkMobile);
    checkMobile(); // Initial check

    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
});
