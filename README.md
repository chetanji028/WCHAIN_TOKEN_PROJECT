W Chain Token Project:-
This project enables the creation, deployment, and management of an ERC-20-like token (MyToken) on the W Chain blockchain, a custom EVM-compatible blockchain with testnet (chain ID: 71117) and mainnet (chain ID: 171717).

Overview:- 
MyToken: An ERC-20-like contract for the W Chain native token, supporting standard functions like transfer, approve, mint, and burn.

Blockchain: W Chain testnet (https://rpc-testnet.w-chain.com) and mainnet (https://rpc.w-chain.com).
Block Explorers: Testnet (https://scan-testnet.w-chain.com), Mainnet (https://scan.w-chain.com).

Deployed Contracts:
MyToken (Testnet): 0x7Cf0BF6Dd6b729714558D23010f998bf85a55C1f


Tools: Hardhat, OpenZeppelin, ethers.js (v6), and dotenv for secure configuration.


Prerequisites:-
Node.js: Version 16 or later
npm: Node package manager
MetaMask: Configured for W Chain testnet and mainnet
WCO Tokens: Native tokens for gas fees (obtain from W Chain testnet faucet at https://docs.w-chain.com/)


Setup Instructions:-
Clone the Repository 

git clone https://github.com/chetanji028/WCHAIN_TOKEN_PROJECT.git
cd WChainTokenProject

Install Dependencies:

npm install 

##Create a .env file in the root directory:

PRIVATE_KEY="your wallet private key"
WCHAIN_RPC_URL=https://rpc-testnet.w-chain.com 

##Configure MetaMask:Add W Chain testnet:Network Name: W Chain Testnet
RPC URL: https://rpc-testnet.w-chain.com
Chain ID: 71117
Currency Symbol: WCO

Add W Chain mainnet (for production):Network Name: W Chain
RPC URL: https://rpc.w-chain.com
Chain ID: 171717
Currency Symbol: WCO

##Deployment 
Compile Contracts:- npx hardhat compile 

Deploy MyToken:- npx hardhat run scripts/deploy.js --network w_chain_testnet 

Verify Contracts on Block Explorer:- 
npx hardhat verify --network <network_name> <contract_address> [constructor_arguments...]
 
 













