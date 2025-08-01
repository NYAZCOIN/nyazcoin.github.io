// NFT Gallery Modal
document.addEventListener('DOMContentLoaded', () => {
    const nftCards = document.querySelectorAll('.nft-card');
    
    nftCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.classList.add('nft-modal');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            `;
            
            modal.innerHTML = `
                <div style="background: var(--dark-bg); border-radius: 15px; padding: 30px; max-width: 500px; width: 90%; text-align: center;">
                    <img src="${card.querySelector('img').src}" alt="${title}" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
                    <h3 style="color: var(--solana-green); margin-bottom: 10px;">${title}</h3>
                    <p style="margin-bottom: 20px;">${description}</p>
                    <button class="btn btn-primary" id="close-modal">Close</button>
                    <button class="btn btn-secondary" style="margin-top: 10px;">Mint NFT</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            document.getElementById('close-modal').addEventListener('click', () => {
                modal.remove();
            });
        });
    });
});