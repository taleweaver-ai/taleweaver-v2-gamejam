import { useDojo } from "@/dojo/useDojo";
import { DojoWorldProps } from "@/types/world";
import { useCallback } from "react";
import { stringToSplitHash, splitHashToString } from "@/utils/dojo/conversion";
import {  splitCid } from "@/utils/ipfs/pinata";
import { shortString } from "starknet";

export function getDojoWorldData(world: DojoWorldProps) {
  const id = shortString.decodeShortString(world.assistantId)
  const cidA = shortString.decodeShortString(world.cidA);
  const cidB = shortString.decodeShortString(world.cidB);
  const cid = cidA + cidB;
  return { id: id, cid: cid };
}

export function useCreateDojoWorld() {
  const { 
    setup: { systemCalls: { createWorld },
    }, 
    account : { account }
  } = useDojo();
  return useCallback(async ({ assistant, cid }) : DojoWorldProps => {

      const [ cidA, cidB ] = splitCid(cid);
      console.log("creating", assistant, cidA, cidB, account)
      const receipt = await createWorld({ 
        creator: account, 
        assistantId: assistant, 
        cidA: cidA, 
        cidB: cidB, 
      });

      return assistant
    }, [])
}

export function useReadDojoWorlds() {
  const {
    setup: { graphSdk },
  } = useDojo();

  return useCallback(async() => {
    const {
      data: { seedModels },
    } = await graphSdk.getWorlds();
    const edges = seedModels?.edges;
    if (edges.length)
      return edges.map((edge: any) => getDojoWorldData(edge.node))
    return []
  })
}

export function useReadDojoWorld() {
  const {
    setup: { graphSdk },
  } = useDojo();
  return useCallback(async (worldId: string) => {
    const worldFelt252 = shortString.encodeShortString(worldId);
    console.log("useReadDojoWorld", worldFelt252)
    const {
      data: { seedModels },
    } = await graphSdk.getWorld({ assistantId: worldFelt252 });
    const edges = seedModels?.edges;
    console.log("useReadDojoWorld", edges)
    if (edges.length) {
      const world = edges[0].node;
      return getDojoWorldData(world);
    }
  })
}
