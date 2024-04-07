import openai from "@/utils/openai/openai";

export async function generateDalle(prompt: string) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1792x1024"
  });

  const imageUrl = response.data[0].url;
  console.log("dalle", imageUrl)
  return imageUrl;
}
