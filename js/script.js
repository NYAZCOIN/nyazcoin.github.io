// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Banner Carousel Controls
const dots = document.querySelectorAll('.banner-dot');
const track = document.querySelector('.banner-track');

if (dots.length && track) {
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
}

// Make navbar more visible when scrolled
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(5, 5, 16, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(10, 10, 26, 0.9)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    }
});

// Digital Timer Functionality
function updateTimer() {
    const timer = document.getElementById('digital-timer');
    if (!timer) return;
    
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    document.getElementById('current-day').textContent = days[now.getDay()];
    document.getElementById('current-date').textContent = 
        `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    document.getElementById('current-time').textContent = 
        `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Update timer every second
setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// Visitor Counter
function updateVisitorCounter() {
    const counter = document.getElementById('visitor-count');
    if (!counter) return;
    
    // Get current count from localStorage or initialize to 0
    let count = localStorage.getItem('nyaz_visitor_count') || 0;
    count = parseInt(count) + 1;
    
    // Save updated count
    localStorage.setItem('nyaz_visitor_count', count);
    
    // Display count
    counter.textContent = count;
}

// Update counter on page load
updateVisitorCounter();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Presale Countdown (if on presale page)
if (document.getElementById('presale-days')) {
    // Set the date we're counting down to (presale end date)
    const presaleEndDate = new Date();
    presaleEndDate.setDate(presaleEndDate.getDate() + 30); // 30 days from now
    
    // Update the countdown every 1 second
    const presaleCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = presaleEndDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById('presale-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('presale-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('presale-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('presale-seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Update progress bar (mock data)
        const progressPercentage = Math.min(100 - (distance / (30 * 24 * 60 * 60 * 1000) * 100), 65);
        document.getElementById('presale-progress').style.width = `${progressPercentage}%`;
        document.getElementById('presale-raised').textContent = `$${Math.floor(500000 * (progressPercentage/100)).toLocaleString()}`;
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(presaleCountdown);
            document.getElementById('presale-days').textContent = '00';
            document.getElementById('presale-hours').textContent = '00';
            document.getElementById('presale-minutes').textContent = '00';
            document.getElementById('presale-seconds').textContent = '00';
            document.getElementById('presale-progress').style.width = '100%';
            document.getElementById('presale-raised').textContent = '$500,000';
        }
    }, 1000);
      }
