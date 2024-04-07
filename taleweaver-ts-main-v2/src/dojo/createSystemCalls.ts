import { getComponentValue } from '@dojoengine/recs';
// import { uuid } from '@latticexyz/utils';
import { fromFixed } from '@/utils/dojo/fixed';
import { getEntityIdFromKeys, getEvents, setComponentsFromEvents } from '@dojoengine/utils';

import { ClientComponents } from './createClientComponents';

import manifest from '@/../dojoManifest.json';
import { IWorld } from './generated/generated';
import { ContractComponents } from './generated/contractComponents';
import { DojoProvider, getContractByName } from '@dojoengine/core';

import {
  AvatarProps,
  WorldProps
} from "./types"

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  contractComponents: ContractComponents,
  clientComponents: ClientComponents,
  provider: DojoProvider
) {

  const createWorld = async ({ creator, assistantId, cidA, cidB }: WorldProps) => {
    try {
      const tx = await provider.execute(creator, 'construct', 'createSeed', [assistantId, cidA, cidB]);
      const receipt = await creator.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
      console.log("World", assistantId, receipt.finality_status)
      return receipt 
    } catch (e) {
      console.log(e)
    }
  };

  const createAvatar = async ({ creator, assistantId, name, alias, descriptionA, descriptionB }: AvatarProps) => {
    try {
      const tx = await provider.execute(creator, 'avatargen', 'createAvatar', [assistantId, name, alias, descriptionA, descriptionB]);
      const receipt = await creator.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
      console.log("Avatar",  name, receipt.finality_status)
      return receipt
    }
    catch (e) {
      console.log(e)
    }

  };

  return {
    createWorld,
    createAvatar,
  };
}
