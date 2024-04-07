import FormData from "form-data";
import fs from "fs";
import path from "path";
import axios from "axios";


export default async function uploadToIPFS(filePath: string) {
  try {
    let data = new FormData();
    data.append('file', fs.createReadStream(filePath));
    data.append('pinataOptions', '{"cidVersion": 0}');
    data.append('pinataMetadata', `{"name": "${path.basename(filePath)}"}`);


    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        'Authorization': `Bearer ${process.env.PINATA_JWT}` // Usar PINATA_JWT de .env
      }
    });

    console.log(response.data);
    console.log(`View the file here: https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
    return response.data.IpfsHash;

  } catch (error) {
    console.error('Error al subir archivo a IPFS:', error);
    return null;
  }
}
