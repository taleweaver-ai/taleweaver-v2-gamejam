import fs from "fs";
import path from "path";
import axios from "axios";

const imagesFolder = path.join(__dirname, 'downloaded_images');

// Asegurarse de que existe el directorio para las imágenes descargadas
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder, { recursive: true });
}

export default async function downloadImage({ url, filename }: any): Promise<string> {
  const filePath = path.join(imagesFolder, filename);
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(filePath));
    writer.on('error', reject);
  });
}
