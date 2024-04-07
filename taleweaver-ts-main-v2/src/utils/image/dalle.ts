// import downloadImage from "./download"
// import uploadToIPFS from "./ipfs"
import openai from "@/utils/openai";


export default async function generateImageURL(prompt: string) {
  try {
    // Generación de imagen con SDK de OpenAI
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024"
    });

    const imageUrl = response.data[0].url;
    return imageUrl;

  } catch (error) {
    console.error("Error al generar la imagen:", error);
    return null;
  }
}

export async function processImage(prompt: string) {
  try {
    const imageUrl = await generateImageURL(prompt);
    const filename = `image_${Date.now()}.jpg`;
    const filePath: string = await downloadImage({ url: imageUrl, filename: filename });
    const ipfsHash = await uploadToIPFS(filePath);

    console.log(`Imagen subida a IPFS con éxito. CID: ${ipfsHash}`);
    const result = {
      imageUrl: imageUrl,
      ipfsHash: ipfsHash
    };

    return result;
  } catch (error) {
    console.error('Error en el proceso de la imagen:', error);
  }
}
