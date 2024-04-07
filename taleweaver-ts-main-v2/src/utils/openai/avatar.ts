import openai from "@/utils/openai/openai"
import { AvatarRequestProps } from "@/types/avatar"


async function promptAvatars({ theme, title, description }: AvatarRequestProps) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          Based on the title of a story, its description, and the provided theme, create SIX unique avatars. 
          For each avatar: 
            - Provide a name that is up to 20 characters long. 
            - An alias that is up to 30 characters long. 
            - A brief description that is up to 70 characters long. 

          The avatars must be consistent with the context of the story and the specified theme, 
          reflecting their personality, abilities, or role within the story with these length limitations.

          The details of the story are as follows;
            - Title: ${title}
            - Description: ${description}
            - Theme: ${theme}

          Return a JSON formated object with the following keys: id (counter), name, alias and description
          for each of the SIX unique avatars generated.
          JSON format MUST be as follows
          [ 
              { id: 1, name: string, value: string, description: string },
              { id: 2, name: string, value: string, description: string },
              { id: 3, name: string, value: string, description: string },
              { id: 4, name: string, value: string, description: string },
              { id: 5, name: string, value: string, description: string },
              { id: 6, name: string, value: string, description: string },
          ]
        `
      }
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });
  let parsed = JSON.parse(completion.choices[0].message.content || "");
  console.log("unparsed", parsed)
  if (typeof parsed === "object" && !Array.isArray(parsed))
    parsed = Object.values(parsed)[0];
  console.log("parsed", parsed)
  return parsed
}

export async function getAvatars(avatarRequest: AvatarRequestProps) {
  console.log("Generating avatars", avatarRequest)
  let counter = 0;
  let run = await promptAvatars(avatarRequest);
  while (!Array.isArray(run)) {
    counter++;
    console.log(`Retry: ${counter}`)
    await new Promise(resolve => setTimeout(resolve, 2000));
    run = await promptAvatars(avatarRequest);
  }
  return run;
}
