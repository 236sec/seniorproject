import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Hardhat Node

export async function scanWalletTransactions(walletAddress : string) {
    const latestBlock = await provider.getBlockNumber();
    const recentTrasaction = [];
    console.log(`Scanning from block ${latestBlock - 10} to ${latestBlock} for address ${walletAddress}`);

    for (let i = latestBlock; i >= Math.max(0, latestBlock - 10); i--) {
        const block = await provider.getBlock(i, true);
        if (!block?.transactions) continue;
        block.transactions.forEach(async (txHash) => {
            const tx = await provider.getTransaction(txHash);
            console.log(tx);
            if (tx?.to && tx.to.toLowerCase() === walletAddress) {
                // console.log(`📥 Received: Received ${ethers.formatEther(tx.value)} ETH in Block ${i} from ${tx.from}`);
                recentTrasaction.push({state:"recieved",address:tx.to.toLowerCase(),amount:tx.value});
            } else if (tx?.from.toLowerCase() === walletAddress) {
                // console.log(`📤 Sent: Sent ${ethers.formatEther(tx.value)} ETH in Block ${i} to ${tx.to}`);
                recentTrasaction.push({state:"sent",address:tx.from.toLowerCase(),amount:tx.value});
            }
        });
    }
    return recentTrasaction;
}