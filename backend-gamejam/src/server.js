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
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3001', // Origen por defecto para desarrollo,poner la direccion en la que se este lanzando el frontend
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
