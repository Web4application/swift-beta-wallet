
const SwiftBetaWallet = () => {
  const [balance, setBalance] = React.useState("Loading...");
  const walletAddress = "0xCaAA9A2A8B4d0dfD9ca5eC406ae11663CdC3Dd43";

  React.useEffect(() => {
    setTimeout(() => setBalance("1,000 FDAK"), 1500);
  }, []);

  const requestFaucet = () => {
    alert("⛲ Faucet request sent! (Simulated)");
  };

  return (
    <div className="card">
      <h1>💼 Swift Beta Wallet</h1>
      <p><strong>Address:</strong> {walletAddress}</p>
      <p><strong>Token Balance:</strong> {balance}</p>
      <button onClick={requestFaucet}>Request Faucet</button>
    </div>
  );
};

ReactDOM.render(<SwiftBetaWallet />, document.getElementById('root'));
