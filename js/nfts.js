// NFT Rarity Validation
const VALID_RARITIES = new Set(['common', 'rare', 'legendary', 'exclusive']);

// Sample NFT Data
const nfts = [
    { 
        id: 1, 
        name: "Zesty Cat", 
        rarity: "rare", 
        image: "assets/nft1.png",
        price: 0.25 
    },
    { 
        id: 2, 
        name: "Moon Nyaz", 
        rarity: "legendary", 
        image: "assets/nft2.png",
        price: 0.5 
    },
    { 
        id: 3, 
        name: "Cyber Nyaz", 
        rarity: "exclusive", 
        image: "assets/nft3.png",
        price: 1 
    }
];

// Render NFTs with Error Handling
function renderNFTs(filter = "all") {
    const grid = document.querySelector('.nft-grid');
    
    try {
        grid.innerHTML = '';
        
        const filteredNFTs = filter === 'all' ? nfts : nfts.filter(nft => {
            if (!VALID_RARITIES.has(nft.rarity)) {
                console.warn(`Invalid rarity for NFT ${nft.id}: ${nft.rarity}`);
                return false;
            }
            return nft.rarity === filter;
        });

        filteredNFTs.forEach(nft => {
            grid.innerHTML += `
                <div class="nft-card" data-rarity="${nft.rarity}">
                    <div class="nft-image">
                        <img src="${nft.image}" alt="${nft.name}" loading="lazy" decoding="async">
                        <div class="nft-overlay">
                            <button class="btn btn-primary" onclick="handleNftPurchase(${nft.id})">
                                Buy Now
                            </button>
                        </div>
                    </div>
                    <h3>${nft.name}</h3>
                    <div class="nft-meta">
                        <span class="rarity ${nft.rarity}">${nft.rarity}</span>
                        <span class="price">◎ ${nft.price.toLocaleString('en-US')}</span>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error('NFT Render Error:', error);
        grid.innerHTML = `
            <div class="error-card">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load NFTs. Please refresh.</p>
            </div>
        `;
    }
}

// Initialize Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderNFTs(btn.textContent.toLowerCase());
    });
});

// Web3 Purchase Handler
async function handleNftPurchase(nftId) {
    try {
        const provider = window.phantom?.solana || window.solflare;
        if (!provider) throw new Error('Please install Phantom or Solflare wallet!');
        
        await provider.connect();
        const publicKey = provider.publicKey.toString();
        
        // Replace with actual program call
        const txHash = `mock-tx-${nftId}-${Date.now()}`; 
        console.log('NFT Purchased! TX:', txHash);
        alert(`NFT #${nftId} purchased successfully!\nTX: ${txHash.slice(0, 10)}...`);
    } catch (error) {
        console.error('Purchase Failed:', error);
        alert('Error: ' + error.message);
    }
}

// Initial Load
document.addEventListener('DOMContentLoaded', renderNFTs);