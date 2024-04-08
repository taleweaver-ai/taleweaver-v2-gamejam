import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

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

export default function DisplayNFTs({ walletAddress }: DisplayNFTsProps) {
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

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {nfts.length > 0 ? (
        nfts.map((nft, index) => (
          <Card key={index}>
            <Card.Img
              variant="top mx-auto mt-3"
              src={nft.metadata.normalized.image}
              alt="NFT"
              style={{ width: "200px", height: "200px" }}
            />
            <Card.Body>{nft.metadata.normalized.name}</Card.Body>
          </Card>
        ))
      ) : (
        <p>No NFTs found or not loaded.</p>
      )}
    </div>
  );
}
