import { Account, BigNumberish } from 'starknet';

export interface AvatarProps {
  creator: Account,
  name: BigNumberish,
  alias: BigNumberish,
  descriptionA: BigNumberish,
  descriptionB: BigNumberish,
  worldId: number,
}


export interface WorldProps {
  creator: Account,
  assistantId: BigNumberish,
  cidA: BigNumberish,
  cidB: BigNumberish,
}

export interface DecisionProps {
  id: number,
  threadId: number,
  seedId: number,
  avatarId: number,
  counter: number,
  decisionA: BigNumberish,
  decisionB: BigNumberish,
  consequenceA: BigNumberish,
  consequenceB: BigNumberish
  imageA: BigNumberish,
  imageB: BigNumberish,
}
