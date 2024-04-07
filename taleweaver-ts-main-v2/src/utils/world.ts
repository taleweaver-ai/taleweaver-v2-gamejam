import { createWorldAssistant, createWorldImage } from "./openai/world";
import { useReadDojoWorld, useReadDojoWorlds, useCreateDojoWorld } from "@/utils/dojo/world";
import { readFromPinata, uploadToPinata, uploadDalleToPinata } from "@/utils/ipfs/pinata";
import { useCallback } from "react";
import { WorldProps } from "@/types/world";

export function useCreateWorld() {
  const createDojoWorld = useCreateDojoWorld();
  return useCallback(async ({
    title,
    description,
    theme,
    mode,
    avatars 
  }: WorldProps) => {
    const world = {
      title,
      description,
      theme,
      mode,
      avatars,
    }
    const assistant = await createWorldAssistant(world)
    console.log("Assistant", assistant)

    const dalleUrl = await createWorldImage(world);
    console.log("Dalle", dalleUrl)

    const dalleCid = await uploadDalleToPinata(dalleUrl);
    console.log("Uploaded dale to pinata", dalleCid)

    console.log("Uploading to pinata")
    const cid = await uploadToPinata({
      variant: "world",
      title: title,
      description: description,
      theme: theme,
      mode: mode,
      dalleUrl: dalleUrl,
      avatars: avatars
    })

    await createDojoWorld({ assistant: assistant.id, cid: cid });

    return assistant.id
  })
}

export function useReadWorld() {
  const readDojoWorld = useReadDojoWorld();
  return useCallback(async (worldId: string) => {
    const world = await readDojoWorld(worldId);
    if (world)
      return await readFromPinata(world.cid);
  });
}

export function useReadWorlds() {
  const readDojoWorlds = useReadDojoWorlds();
  return useCallback(async () => {
    const worlds = await readDojoWorlds();
    const worldData = await Promise.all(worlds.map(async (world) => {
      return { ...world, ...await readFromPinata(world.cid)}
    }));
    // Filter out those that do not have data associated (dev...)
    return worldData.filter(w => Object.keys(w).length > 2);
  });
}
