// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Banner Carousel Controls
const dots = document.querySelectorAll('.banner-dot');
const track = document.querySelector('.banner-track');
const images = document.querySelectorAll('.banner-track img');
const totalImages = images.length;
let currentIndex = 0;

// Set active dot
function setActiveDot(index) {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Manual dot control
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        setActiveDot(currentIndex);
    });
});

// Auto slide
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalImages;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    setActiveDot(currentIndex);
}, 5000);

// Initialize active dot
setActiveDot(0);