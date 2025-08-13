require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const { PRIVATE_KEY, WCHAIN_RPC_URL } = process.env;

module.exports = {
  solidity: "0.8.28", 
  networks: {
    w_chain_testnet: {
      url: "https://rpc-testnet.w-chain.com",
      accounts: [PRIVATE_KEY],
      chainId: 71117
    },
    w_chain: {
      url: "https://rpc.w-chain.com",
      accounts: [PRIVATE_KEY],
      chainId: 171717
    }
  },
  etherscan: {
    apiKey: {
      "w_chain_testnet": "empty" 
    },
    customChains: [
      {
        network: "w_chain_testnet",
        chainId: 71117,
        urls: {
          apiURL: "https://scan-testnet.w-chain.com/api",
          browserURL: "https://scan-testnet.w-chain.com"
        }
      },
      {
        network: "w_chain",
        chainId: 171717,
        urls: {
          apiURL: "https://scan.w-chain.com/api",
          browserURL: "https://scan.w-chain.com"
        }
      }
    ] 
  },
  sourcify: {
    enabled: false 
  }
};