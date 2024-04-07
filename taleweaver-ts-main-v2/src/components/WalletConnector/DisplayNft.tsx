import React, { useState } from "react";

// Definimos los tipos para los props.
interface DisplayNFTsProps {
  walletAddress: string;
}

// Aquí definimos la estructura de un NFT. Ajusta según los datos que esperas recibir.
interface NFT {
  metadata: {
    normalized: {
      name?: string;
      description?: string;
      image?: string;
    };
  };
  owner: string;
}

const DisplayNFTs: React.FC<DisplayNFTsProps> = ({ walletAddress }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);

  const fetchNFTs = async () => {
    try {
      const response = await fetch("http://localhost:3000/nfts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: walletAddress }),
      });

      if (!response.ok) throw new Error("Network response was not ok.");

      const data = await response.json();
      setNfts(data.result || []); // Asegura que nfts sea un array
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      setNfts([]); // Asegura que nfts sea un array incluso si hay un error
    }
  };

  return (
    <div>
      <button onClick={fetchNFTs}>Load My NFTs</button>
      {nfts.length > 0 ? (
        nfts.map((nft, index) => (
          <div key={index}>
            {/* Renderiza los datos de cada NFT */}
            <p>Name: {nft.metadata.normalized.name || "No name provided"}</p>
            <p>Description: {nft.metadata.normalized.description || "No description provided"}</p>
            {/* Muestra la imagen si está disponible */}
            <p>Owner: {nft.owner}</p>
            {nft.metadata.normalized.image && (
              <img
                src={nft.metadata.normalized.image}
                alt="NFT"
                style={{ width: "200px", height: "200px" }}
              />
            )}
          </div>
        ))
      ) : (
        <p>No NFTs found or not loaded.</p>
      )}
    </div>
  );
};

export default DisplayNFTs;
