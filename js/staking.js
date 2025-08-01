// Initialize Solana Connection
const connection = new web3.Connection(
    web3.clusterApiUrl('mainnet-beta'), 
    'confirmed'
);

// Get Program ID
const programId = new web3.PublicKey(
    document.querySelector('meta[name="staking-program-id"]').content
);

// Stake Tokens
document.querySelector('.stake-card button').addEventListener('click', async () => {
    const amount = document.getElementById('stakeAmount').value;
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount!');
        return;
    }

    try {
        const provider = window.phantom?.solana || window.solflare;
        if (!provider) throw new Error('Wallet not installed');
        
        await provider.connect();
        const publicKey = provider.publicKey;
        
        // Mock transaction (replace with actual program call)
        const txHash = `mock-stake-tx-${Date.now()}`;
        console.log('Staked! TX:', txHash);
        alert(`${amount} $NYAZ staked successfully!`);
    } catch (error) {
        console.error('Staking Error:', error);
        alert('Failed: ' + error.message);
    }
});