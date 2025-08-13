const hre = require("hardhat");

async function main() {
  // Deployed contract address
  const CONTRACT_ADDRESS = "0x7Cf0BF6Dd6b729714558D23010f998bf85a55C1f";
  // Hardcoded recipient address for testing (replace with a valid testnet address)
  const RECIPIENT_ADDRESS = "0x2a5e16F0d1e108D82eB22581b31958DA3de34984"; 

  // Get deployer signer
  let deployer;
  try {
    const signers = await hre.ethers.getSigners();
    if (!signers || signers.length < 1) {
      throw new Error("No signers available");
    }
    deployer = signers[0];
    console.log("Deployer address:", deployer.address);
  } catch (error) {
    console.error("Error fetching signers:", error.message);
    process.exit(1);
  }

  // Attach to the contract
  let token;
  try {
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    token = await MyToken.attach(CONTRACT_ADDRESS);
  } catch (error) {
    console.error("Error attaching to contract:", error.message);
    process.exit(1);
  }

  // Helper function to convert tokens to wei
  const toWei = (amount) => hre.ethers.parseUnits(amount.toString(), 18);

  // 1. Check balance of deployer
  const deployerBalance = await token.balanceOf(deployer.address);
  console.log("Deployer balance:", hre.ethers.formatUnits(deployerBalance, 18), "MTK");

  // 2. Transfer tokens to recipient
  try {
    const transferAmount = toWei(1000);
    const transferTx = await token.transfer(RECIPIENT_ADDRESS, transferAmount);
    await transferTx.wait();
    console.log("Transferred 1000 MTK to", RECIPIENT_ADDRESS);
    console.log("Transfer transaction hash:", transferTx.hash);
  } catch (error) {
    console.error("Transfer failed:", error.message);
  }

  // Verify recipient balance
  const recipientBalance = await token.balanceOf(RECIPIENT_ADDRESS);
  console.log("Recipient balance after transfer:", hre.ethers.formatUnits(recipientBalance, 18), "MTK");

  // 3. Approve recipient to spend tokens
  try {
    const approveAmount = toWei(500);
    const approveTx = await token.approve(RECIPIENT_ADDRESS, approveAmount);
    await approveTx.wait();
    console.log("Approved", RECIPIENT_ADDRESS, "to spend 500 MTK");
    console.log("Approve transaction hash:", approveTx.hash);
  } catch (error) {
    console.error("Approve failed:", error.message);
  }

  // Check allowance
  const allowance = await token.allowance(deployer.address, RECIPIENT_ADDRESS);
  console.log("Allowance for recipient:", hre.ethers.formatUnits(allowance, 18), "MTK");

  // 4. Mint tokens
  try {
    const mintAmount = toWei(10000);
    const mintTx = await token.mint(deployer.address, mintAmount);
    await mintTx.wait();
    console.log("Minted 10,000 MTK to deployer");
    console.log("Mint transaction hash:", mintTx.hash);
  } catch (error) {
    console.error("Mint failed:", error.message);
  }

  // Verify deployer balance after minting
  const deployerBalanceAfterMint = await token.balanceOf(deployer.address);
  console.log("Deployer balance after minting:", hre.ethers.formatUnits(deployerBalanceAfterMint, 18), "MTK");

  // 5. Burn tokens
  try {
    const burnAmount = toWei(500);
    const burnTx = await token.burn(burnAmount);
    await burnTx.wait();
    console.log("Burned 500 MTK from deployer");
    console.log("Burn transaction hash:", burnTx.hash);
  } catch (error) {
    console.error("Burn failed:", error.message);
  }

  // Verify deployer balance after burning
  const deployerBalanceAfterBurn = await token.balanceOf(deployer.address);
  console.log("Deployer balance after burning:", hre.ethers.formatUnits(deployerBalanceAfterBurn, 18), "MTK");

  // 6. Check total supply
  const totalSupply = await token.totalSupply();
  console.log("Total supply:", hre.ethers.formatUnits(totalSupply, 18), "MTK");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});