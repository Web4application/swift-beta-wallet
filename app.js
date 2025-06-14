// Swift Beta Wallet: MetaMask + Web3 integration

document.addEventListener("DOMContentLoaded", async () => {
  const connectBtn = document.getElementById("connectBtn");
  const balanceDisplay = document.getElementById("balanceDisplay");

  const tokenAddress = "0xCaAA9A2A8B4d0dfD9ca5eC406ae11663CdC3Dd43";
  const tokenABI = [
    {
      "constant": true,
      "inputs": [{"name": "_owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"name": "balance", "type": "uint256"}],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{"name": "", "type": "uint8"}],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{"name": "", "type": "string"}],
      "type": "function"
    }
  ];

  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return;
  }

  const web3 = new Web3(window.ethereum);
  const token = new web3.eth.Contract(tokenABI, tokenAddress);

  connectBtn.addEventListener("click", async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const user = accounts[0];

      const balanceRaw = await token.methods.balanceOf(user).call();
      const decimals = await token.methods.decimals().call();
      const symbol = await token.methods.symbol().call();

      const balance = (balanceRaw / (10 ** decimals)).toFixed(4);
      balanceDisplay.innerText = `Balance: ${balance} ${symbol}`;
    } catch (err) {
      console.error(err);
      alert("Error connecting to MetaMask or fetching token data.");
    }
  });
});
