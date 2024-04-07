import { useState } from "react";
import { connect, disconnect } from "starknetkit";
import { Button } from "react-bootstrap";

interface IWalletConnection {
  wallet?: any;
  address?: string;
}

export default function WalletConnector() {
  const [walletConnection, setWalletConnection] = useState<IWalletConnection | null>(null);

  const handleConnect = async (event) => {
    event.preventDefault();
    try {
      const result = await connect();
      if (result.wallet) {
        const address = result.wallet.selectedAddress;
        setWalletConnection({
          wallet: result.wallet,
          address: address,
        });
        console.log("Wallet connected:", result, "Address:", address);
      } else {
        console.error("No wallet found in connection result.");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleDisconnect = async (event) => {
    event.preventDefault();
    try {
      await disconnect();
      setWalletConnection(null);
      console.log("Wallet disconnected");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <>
      {walletConnection?.address ? (
        <button
          className="btn btn-outline-primary f-bold"
          style={{ fontSize: "small", whiteSpace: "nowrap" }}
          onClick={handleDisconnect}
        >
          Disconnect ...{walletConnection.address.slice(-6)}
        </button>
      ) : (
        <button
          className="btn btn-outline-primary f-bold"
          style={{ fontSize: "small", whiteSpace: "nowrap" }}
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}
