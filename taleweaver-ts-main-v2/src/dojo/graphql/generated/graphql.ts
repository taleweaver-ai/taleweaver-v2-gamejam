import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  felt252: { input: any; output: any; }
};

export type Decision = {
  __typename?: 'Decision';
  assistantId?: Maybe<Scalars['felt252']['output']>;
  cidA?: Maybe<Scalars['felt252']['output']>;
  cidB?: Maybe<Scalars['felt252']['output']>;
  counter?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<World__Entity>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  runId?: Maybe<Scalars['felt252']['output']>;
  threadId?: Maybe<Scalars['felt252']['output']>;
};

export type DecisionConnection = {
  __typename?: 'DecisionConnection';
  edges?: Maybe<Array<Maybe<DecisionEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DecisionEdge = {
  __typename?: 'DecisionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Decision>;
};

export type DecisionOrder = {
  direction: OrderDirection;
  field: DecisionOrderField;
};

export enum DecisionOrderField {
  Assistantid = 'ASSISTANTID',
  Cida = 'CIDA',
  Cidb = 'CIDB',
  Counter = 'COUNTER',
  Player = 'PLAYER',
  Runid = 'RUNID',
  Threadid = 'THREADID'
}

export type DecisionWhereInput = {
  assistantId?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdEQ?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdGT?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdGTE?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdLT?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdLTE?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdNEQ?: InputMaybe<Scalars['felt252']['input']>;
  cidA?: InputMaybe<Scalars['felt252']['input']>;
  cidAEQ?: InputMaybe<Scalars['felt252']['input']>;
  cidAGT?: InputMaybe<Scalars['felt252']['input']>;
  cidAGTE?: InputMaybe<Scalars['felt252']['input']>;
  cidALT?: InputMaybe<Scalars['felt252']['input']>;
  cidALTE?: InputMaybe<Scalars['felt252']['input']>;
  cidANEQ?: InputMaybe<Scalars['felt252']['input']>;
  cidB?: InputMaybe<Scalars['felt252']['input']>;
  cidBEQ?: InputMaybe<Scalars['felt252']['input']>;
  cidBGT?: InputMaybe<Scalars['felt252']['input']>;
  cidBGTE?: InputMaybe<Scalars['felt252']['input']>;
  cidBLT?: InputMaybe<Scalars['felt252']['input']>;
  cidBLTE?: InputMaybe<Scalars['felt252']['input']>;
  cidBNEQ?: InputMaybe<Scalars['felt252']['input']>;
  counter?: InputMaybe<Scalars['felt252']['input']>;
  counterEQ?: InputMaybe<Scalars['felt252']['input']>;
  counterGT?: InputMaybe<Scalars['felt252']['input']>;
  counterGTE?: InputMaybe<Scalars['felt252']['input']>;
  counterLT?: InputMaybe<Scalars['felt252']['input']>;
  counterLTE?: InputMaybe<Scalars['felt252']['input']>;
  counterNEQ?: InputMaybe<Scalars['felt252']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  runId?: InputMaybe<Scalars['felt252']['input']>;
  runIdEQ?: InputMaybe<Scalars['felt252']['input']>;
  runIdGT?: InputMaybe<Scalars['felt252']['input']>;
  runIdGTE?: InputMaybe<Scalars['felt252']['input']>;
  runIdLT?: InputMaybe<Scalars['felt252']['input']>;
  runIdLTE?: InputMaybe<Scalars['felt252']['input']>;
  runIdNEQ?: InputMaybe<Scalars['felt252']['input']>;
  threadId?: InputMaybe<Scalars['felt252']['input']>;
  threadIdEQ?: InputMaybe<Scalars['felt252']['input']>;
  threadIdGT?: InputMaybe<Scalars['felt252']['input']>;
  threadIdGTE?: InputMaybe<Scalars['felt252']['input']>;
  threadIdLT?: InputMaybe<Scalars['felt252']['input']>;
  threadIdLTE?: InputMaybe<Scalars['felt252']['input']>;
  threadIdNEQ?: InputMaybe<Scalars['felt252']['input']>;
};

export type ModelUnion = Decision | Seed;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Seed = {
  __typename?: 'Seed';
  assistantId?: Maybe<Scalars['felt252']['output']>;
  cidA?: Maybe<Scalars['felt252']['output']>;
  cidB?: Maybe<Scalars['felt252']['output']>;
  creator?: Maybe<Scalars['ContractAddress']['output']>;
  entity?: Maybe<World__Entity>;
};

export type SeedConnection = {
  __typename?: 'SeedConnection';
  edges?: Maybe<Array<Maybe<SeedEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SeedEdge = {
  __typename?: 'SeedEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Seed>;
};

export type SeedOrder = {
  direction: OrderDirection;
  field: SeedOrderField;
};

export enum SeedOrderField {
  Assistantid = 'ASSISTANTID',
  Cida = 'CIDA',
  Cidb = 'CIDB',
  Creator = 'CREATOR'
}

export type SeedWhereInput = {
  assistantId?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdEQ?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdGT?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdGTE?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdLT?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdLTE?: InputMaybe<Scalars['felt252']['input']>;
  assistantIdNEQ?: InputMaybe<Scalars['felt252']['input']>;
  cidA?: InputMaybe<Scalars['felt252']['input']>;
  cidAEQ?: InputMaybe<Scalars['felt252']['input']>;
  cidAGT?: InputMaybe<Scalars['felt252']['input']>;
  cidAGTE?: InputMaybe<Scalars['felt252']['input']>;
  cidALT?: InputMaybe<Scalars['felt252']['input']>;
  cidALTE?: InputMaybe<Scalars['felt252']['input']>;
  cidANEQ?: InputMaybe<Scalars['felt252']['input']>;
  cidB?: InputMaybe<Scalars['felt252']['input']>;
  cidBEQ?: InputMaybe<Scalars['felt252']['input']>;
  cidBGT?: InputMaybe<Scalars['felt252']['input']>;
  cidBGTE?: InputMaybe<Scalars['felt252']['input']>;
  cidBLT?: InputMaybe<Scalars['felt252']['input']>;
  cidBLTE?: InputMaybe<Scalars['felt252']['input']>;
  cidBNEQ?: InputMaybe<Scalars['felt252']['input']>;
  creator?: InputMaybe<Scalars['ContractAddress']['input']>;
  creatorEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  creatorGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  creatorGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  creatorLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  creatorLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  creatorNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type World__Content = {
  __typename?: 'World__Content';
  coverUri?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  iconUri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<Array<Maybe<World__Social>>>;
  website?: Maybe<Scalars['String']['output']>;
};

export type World__Entity = {
  __typename?: 'World__Entity';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EntityConnection = {
  __typename?: 'World__EntityConnection';
  edges?: Maybe<Array<Maybe<World__EntityEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EntityEdge = {
  __typename?: 'World__EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Entity>;
};

export type World__Event = {
  __typename?: 'World__Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type World__EventConnection = {
  __typename?: 'World__EventConnection';
  edges?: Maybe<Array<Maybe<World__EventEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EventEdge = {
  __typename?: 'World__EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Event>;
};

export type World__Metadata = {
  __typename?: 'World__Metadata';
  content?: Maybe<World__Content>;
  coverImg?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  iconImg?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  worldAddress: Scalars['String']['output'];
};

export type World__MetadataConnection = {
  __typename?: 'World__MetadataConnection';
  edges?: Maybe<Array<Maybe<World__MetadataEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__MetadataEdge = {
  __typename?: 'World__MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Metadata>;
};

export type World__Model = {
  __typename?: 'World__Model';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__ModelConnection = {
  __typename?: 'World__ModelConnection';
  edges?: Maybe<Array<Maybe<World__ModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__ModelEdge = {
  __typename?: 'World__ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Model>;
};

export type World__ModelOrder = {
  direction: OrderDirection;
  field: World__ModelOrderField;
};

export enum World__ModelOrderField {
  ClassHash = 'CLASS_HASH',
  Name = 'NAME'
}

export type World__PageInfo = {
  __typename?: 'World__PageInfo';
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type World__Query = {
  __typename?: 'World__Query';
  decisionModels?: Maybe<DecisionConnection>;
  entities?: Maybe<World__EntityConnection>;
  entity: World__Entity;
  events?: Maybe<World__EventConnection>;
  metadatas?: Maybe<World__MetadataConnection>;
  model: World__Model;
  models?: Maybe<World__ModelConnection>;
  seedModels?: Maybe<SeedConnection>;
  transaction: World__Transaction;
  transactions?: Maybe<World__TransactionConnection>;
};


export type World__QueryDecisionModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DecisionOrder>;
  where?: InputMaybe<DecisionWhereInput>;
};


export type World__QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<World__ModelOrder>;
};


export type World__QuerySeedModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SeedOrder>;
  where?: InputMaybe<SeedWhereInput>;
};


export type World__QueryTransactionArgs = {
  transactionHash: Scalars['ID']['input'];
};


export type World__QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type World__Social = {
  __typename?: 'World__Social';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type World__Subscription = {
  __typename?: 'World__Subscription';
  entityUpdated: World__Entity;
  eventEmitted: World__Event;
  modelRegistered: World__Model;
};


export type World__SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionEventEmittedArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type World__SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type World__Transaction = {
  __typename?: 'World__Transaction';
  calldata?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  maxFee?: Maybe<Scalars['felt252']['output']>;
  nonce?: Maybe<Scalars['felt252']['output']>;
  senderAddress?: Maybe<Scalars['felt252']['output']>;
  signature?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__TransactionConnection = {
  __typename?: 'World__TransactionConnection';
  edges?: Maybe<Array<Maybe<World__TransactionEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__TransactionEdge = {
  __typename?: 'World__TransactionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Transaction>;
};

export type GetWorldQueryVariables = Exact<{
  assistantId?: InputMaybe<Scalars['felt252']['input']>;
}>;


export type GetWorldQuery = { __typename?: 'World__Query', seedModels?: { __typename?: 'SeedConnection', edges?: Array<{ __typename?: 'SeedEdge', node?: { __typename?: 'Seed', assistantId?: any | null, cidA?: any | null, cidB?: any | null } | null } | null> | null } | null };

export type GetWorldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorldsQuery = { __typename?: 'World__Query', seedModels?: { __typename?: 'SeedConnection', edges?: Array<{ __typename?: 'SeedEdge', node?: { __typename?: 'Seed', assistantId?: any | null, cidA?: any | null, cidB?: any | null } | null } | null> | null } | null };

export type GetDecisionsQueryVariables = Exact<{
  threadId?: InputMaybe<Scalars['felt252']['input']>;
}>;


export type GetDecisionsQuery = { __typename?: 'World__Query', decisionModels?: { __typename?: 'DecisionConnection', edges?: Array<{ __typename?: 'DecisionEdge', node?: { __typename?: 'Decision', runId?: any | null, threadId?: any | null, assistantId?: any | null, cidA?: any | null, cidB?: any | null } | null } | null> | null } | null };


export const GetWorldDocument = gql`
    query getWorld($assistantId: felt252) {
  seedModels(where: {assistantId: $assistantId}) {
    edges {
      node {
        assistantId
        cidA
        cidB
      }
    }
  }
}
    `;
export const GetWorldsDocument = gql`
    query getWorlds {
  seedModels {
    edges {
      node {
        assistantId
        cidA
        cidB
      }
    }
  }
}
    `;
export const GetDecisionsDocument = gql`
    query getDecisions($threadId: felt252) {
  decisionModels(where: {threadId: $threadId}) {
    edges {
      node {
        runId
        threadId
        assistantId
        cidA
        cidB
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetWorldDocumentString = print(GetWorldDocument);
const GetWorldsDocumentString = print(GetWorldsDocument);
const GetDecisionsDocumentString = print(GetDecisionsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getWorld(variables?: GetWorldQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetWorldQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetWorldQuery>(GetWorldDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWorld', 'query');
    },
    getWorlds(variables?: GetWorldsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetWorldsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetWorldsQuery>(GetWorldsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWorlds', 'query');
    },
    getDecisions(variables?: GetDecisionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetDecisionsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetDecisionsQuery>(GetDecisionsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDecisions', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;