import openai from "@/utils/openai/openai";
import { makeDecision } from "@/utils/openai/decision";
import { generateDalle } from "@/utils/openai/dalle";

import { MadeDecisionProps } from "@/types/decision";
import { WorldProps, PlayWorldProps } from "@/types/world";

export async function createWorldAssistant({ title, description, theme, mode, avatars }: WorldProps) {
  console.log("Creating world with theme and mode", theme, mode)

  const assistant = await openai.beta.assistants.create({
    instructions: `
      Generate a story context for a world described by: title, description, theme, 
      a set of avatars of which one will be chosen to be 
      main character (each have a name, an alias, and a brief description), 
      and mode of play (survival, creative or adventure).

      The game initializes by selecting once a main character (avatar, by its id) so:
      - Remember it throughout the whole story.
      - Make sure it is consistent with the story.
      - Tailor the story to the main character and its abilities within the world described.

      1. Once the game initializes:
      - Create a brief contextual description of the story of up to 500 characters that includes the world, 
        the main character, and the main conflict.
      - Provide 4 decisions the user can make (upto 200 characters), listed as A, B, C, D.
      
      2. The user will select one of the decisions: A, B, C, or D. Then:
      - (previousDecision) Provide a summary of the decision made, up to 200 characters.
      - (consequence) Describe consequences of the decision made, up to 500 characters. The description should take into account
        the previous decision and the main character's abilities within the described world and main conflict.
      - (decisions) Provide 4 decisions the user can make (upto 200 characters), listed as A, B, C, D.
      - (dallePrompt) Create a prompt for Dalle to generate an image based on the context of the story (world, main character an conflict)
        as well as the decision made by the user and the consequences of it. The image should not include any text and be in a 
        landscape format with a resolution of 1920x1080 pixels, with most of most of the important elements in the center of the image.

      Repeat process 2 indefinitely. However, only at the survival mode, the main character can potentially die based on
      their decision with certain probability. Therefore, the game would end and a coherent description of how the main character
      died upon their decision in the given context must be provided.
      
      The format of the output should be consistent and in JSON format as the following example:
      {
        previousDecision: "",
        consequence: "",
        decisions: [{ id: "A", description: "" }, { id: "B", description: "" }, { id: "C", description: "" }, { value: "D", description: "" }]
        dallePrompt: ""
      }
       
      The details of the world are as follows;
        - Title: ${title}
        - Description: ${description}
        - Theme: ${theme}
        - Mode: ${mode}

      The details of the avatars are as follows;
        ${avatars.toString()}
    `,
    name: "Interactive Story Decision Maker with Infinite Gameplay",
    model: "gpt-4-turbo-preview"
  });

  return { 
    id: assistant.id, 
    created_at: 
    assistant.created_at, 
    model: assistant.model 
  }
}

export async function createWorldImage({
  title,
  description,
  theme,
  mode,
  avatars 
}: WorldProps): Promise<string> { 
  const prompt = `
    Based on the title of a story, its description, the provided theme, and mode of play, 
    create an image that represents the context of the story. 
    The image should not include any text and be in a landscape format with a resolution of 1920x1080 pixels, 
    with most of the important elements in the center of the image.
    IMPORTANT: DO NOT INCLUDE LETTERS IN THE IMAGE.

    The details of the story are as follows;
      - Title: ${title}
      - Description: ${description}
      - Theme: ${theme}
      - Mode: ${mode}

    The details of the avatars are as follows;
      ${avatars.toString()}
    `
  const imageUrl = await generateDalle(prompt)
  return imageUrl || ""
}

export async function playWorld({assistant, avatar}: PlayWorldProps): Promise<MadeDecisionProps> {
  console.log(assistant)
  const decision: MadeDecisionProps = await makeDecision({ 
    assistant: assistant, 
    decision: `I choose the avatar with id ${avatar.id}, known as: ${avatar.name}, ${avatar.alias}.
      ${avatar.description}.
      Remember my chosen avatar through the whole story, refering to his name as the story unravels.`,
    counter: 0 
  });
  return decision
}
