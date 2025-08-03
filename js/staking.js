// Staking Calculator
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('amount').value);
            const duration = parseInt(document.getElementById('duration').value);
            const apy = parseFloat(document.getElementById('apy').value);
            
            if (isNaN(amount) || isNaN(duration) || isNaN(apy) || 
                amount <= 0 || duration <= 0 || apy <= 0) {
                document.getElementById('result').innerHTML = '<p class="error">Please enter valid values in all fields</p>';
                return;
            }
            
            // Calculate rewards
            const dailyRate = apy / 100 / 365;
            const reward = amount * dailyRate * duration;
            const totalPayout = amount + reward;
            
            document.getElementById('result').innerHTML = `
                <h4>Estimated Rewards</h4>
                <p><strong>Staked Amount:</strong> ${amount.toLocaleString()} $NYAZ</p>
                <p><strong>Duration:</strong> ${duration} days</p>
                <p><strong>APY:</strong> ${apy}%</p>
                <hr>
                <p><strong>Estimated Reward:</strong> ${reward.toFixed(2).toLocaleString()} $NYAZ</p>
                <p><strong>Total Payout:</strong> ${totalPayout.toFixed(2).toLocaleString()} $NYAZ</p>
            `;
        });
    }
    
    // Initialize Solana Connection
    // const connection = new web3.Connection(
    //     web3.clusterApiUrl('mainnet-beta'), 
    //     'confirmed'
    // );

    // Get Program ID
    // const programId = new web3.PublicKey(
    //     document.querySelector('meta[name="staking-program-id"]').content
    // );

    // Stake Tokens
    // document.querySelector('.stake-card button')?.addEventListener('click', async () => {
    //     const amount = document.getElementById('stakeAmount').value;
    //     if (!amount || amount <= 0) {
    //         alert('Please enter a valid amount!');
    //         return;
    //     }

    //     try {
    //         const provider = window.phantom?.solana || window.solflare;
    //         if (!provider) throw new Error('Wallet not installed');
            
    //         await provider.connect();
    //         const publicKey = provider.publicKey;
            
    //         // Mock transaction (replace with actual program call)
    //         const txHash = `mock-stake-tx-${Date.now()}`;
    //         console.log('Staked! TX:', txHash);
    //         alert(`${amount} $NYAZ staked successfully!`);
    //     } catch (error) {
    //         console.error('Staking Error:', error);
    //         alert('Failed: ' + error.message);
    //     }
    // });
});
