/**
 * NYAZNATION Main Script v3.1
 * - Launch: Sept 25, 2025
 * - Web3 Optimized
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. INITIALIZATION
    // ======================
    const LAUNCH_DATE = new Date('2025-09-25T00:00:00Z');
    const header = document.querySelector('header');
    const buyButtons = document.querySelectorAll('#buyButton, #heroBuyButton');

    // ======================
    // 2. AUTO-SCROLLING BANNER
    // ======================
    function initBannerCarousel() {
        const track = document.querySelector('.banner-track');
        if (!track) return;
        
        // Clone first banner for seamless looping
        track.appendChild(track.children[0].cloneNode(true));
        
        let currentPosition = 0;
        const bannerWidth = 100 / 4; // 25% per banner
        
        setInterval(() => {
            currentPosition = (currentPosition + bannerWidth) % 100;
            track.style.transform = `translateX(-${currentPosition}%)`;
        }, 5000); // Change every 5 seconds
    }

    // ======================
    // 3. COUNTDOWN TIMER
    // ======================
    function updateCountdown() {
        const now = new Date();
        const diff = LAUNCH_DATE - now;
        
        // Handle post-launch state
        if (diff <= 0) {
            document.querySelector('.countdown-container').innerHTML = `
                <h3> NYAZ IS LIVE ON PUMP.FUN!</h3>
                <a href="https://pump.fun" class="btn btn-primary" target="_blank">
                    <i class="fas fa-coins"></i> Mint Now
                </a>
            `;
            return;
        }
        
        // Calculate units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // ======================
    // 4. WALLET INTEGRATION
    // ======================
    async function connectWallet() {
        try {
            const provider = window.phantom?.solana || window.solflare;
            if (!provider) {
                window.open('https://phantom.app/', '_blank');
                throw new Error('Please install Phantom or Solflare');
            }
            
            await provider.connect();
            const publicKey = provider.publicKey.toString();
            
            // Sign verification message
            const { signature } = await provider.signMessage(
                new TextEncoder().encode('NYAZ Allowlist Verification')
            );
            
            console.log('Wallet Connected:', {
                publicKey: publicKey.slice(0, 8) + '...',
                signature: signature.slice(0, 8) + '...'
            });
            
            alert('Successfully joined allowlist!');
            
        } catch (error) {
            console.error("Wallet Error:", error);
            alert(`Error: ${error.message}`);
        }
    }

    // ======================
    // 5. EVENT LISTENERS
    // ======================
    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            connectWallet();
        });
    });

    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 100 
            ? 'rgba(10, 10, 26, 0.95)' 
            : 'rgba(10, 10, 26, 0.8)';
    });

    // ======================
    // 6. INITIALIZATION
    // ======================
    initBannerCarousel();
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Immediate first run
});