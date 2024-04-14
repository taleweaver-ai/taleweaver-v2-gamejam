import express from 'express';
import cors from 'cors'; // Importa cors
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

// Usa cors para permitir todas las solicitudes cruzadas
// Para un ambiente de producción, querrás configurar esto para permitir solo ciertos orígenes
const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173', // Origen por defecto para desarrollo,poner la direccion en la que se este lanzando el frontend
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/nfts', async (req, res) => {
    const { address } = req.body;
    const apiKey = process.env.ARK_API_KEY;
    const url = `https://api.arkproject.dev/v1/owners/${address}/tokens?contract_address=0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1`;
    // https://api.arkproject.dev/v1/owners/${address}/tokens
    //https://api.arkproject.dev/v1/owners/${address}/tokens?contract_address=0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'x-api-key': apiKey },
        });

        if (!response.ok) throw new Error(`Error en la respuesta de la API: ${response.statusText}`);

        const data = await response.json();
        // Si la API devuelve una respuesta exitosa pero sin NFTs, puedes manejar ese caso aquí
        if (data.result.length === 0) {
            console.log("No NFTs found for this address:", address);
            // Envía una respuesta exitosa indicando que no se encontraron NFTs
            return res.status(200).json({ message: "No NFTs found for this address" });
        }

        // Si se encuentran NFTs, devuelve esos datos
        console.log(`Sending NFT data to client for address: ${address}`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        console.log("Address attempted:", address);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/uploadImageToIPFS', async (req, res) => {
    const { dalleUrl } = req.body; // Asume que `dalleUrl` es la URL de la imagen a subir
    const JWT = process.env.PINATA_JWT; // Tu token JWT de Pinata

    try {
        // Obtiene la imagen usando fetch
        const imageResponse = await fetch(dalleUrl);
        if (!imageResponse.ok) throw new Error(`Error al recuperar la imagen: ${imageResponse.statusText}`);
        const imageBlob = await imageResponse.blob();

        // Prepara el archivo para subirlo a Pinata
        const formData = new FormData();
        formData.append("file", imageBlob, "image.jpg");

        // Realiza la petición a Pinata para subir la imagen
        const pinataResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
            body: formData,
        });

        if (!pinataResponse.ok) throw new Error(`Error al subir a Pinata: ${pinataResponse.statusText}`);

        const pinataData = await pinataResponse.json();

        // Devuelve el hash de IPFS de la imagen subida
        res.status(200).json({ IpfsHash: pinataData.IpfsHash });
    } catch (error) {
        console.error('Error uploading image to IPFS:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
