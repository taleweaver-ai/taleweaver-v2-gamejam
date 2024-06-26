// Generated by dojo-bindgen on Sun, 7 Apr 2024 20:07:59 +0000. Do not modify this file manually.
import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<
            ReturnType<typeof defineContractComponents>
        >;



// Type definition for `taleweaver::models::seed::Seed` struct
export interface Seed {
    assistantId: BigInt;
    creator: BigInt;
    cidA: BigInt;
    cidB: BigInt;
    
}

export const SeedDefinition = {
    assistantId: RecsType.BigInt,
    creator: RecsType.BigInt,
    cidA: RecsType.BigInt,
    cidB: RecsType.BigInt,
    
};


// Type definition for `taleweaver::models::decision::Decision` struct
export interface Decision {
    assistantId: BigInt;
    player: BigInt;
    counter: BigInt;
    threadId: BigInt;
    runId: BigInt;
    cidA: BigInt;
    cidB: BigInt;
    
}

export const DecisionDefinition = {
    assistantId: RecsType.BigInt,
    player: RecsType.BigInt,
    counter: RecsType.BigInt,
    threadId: RecsType.BigInt,
    runId: RecsType.BigInt,
    cidA: RecsType.BigInt,
    cidB: RecsType.BigInt,
    
};


export function defineContractComponents(world: World) {
    return {

        // Model definition for `taleweaver::models::seed::Seed` model
        Seed: (() => {
            return defineComponent(
                world,
                {
                    assistantId: RecsType.BigInt,
                    creator: RecsType.BigInt,
                    cidA: RecsType.BigInt,
                    cidB: RecsType.BigInt,
                },
                {
                    metadata: {
                        name: "Seed",
                        types: ["felt252", "ContractAddress", "felt252", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `taleweaver::models::decision::Decision` model
        Decision: (() => {
            return defineComponent(
                world,
                {
                    assistantId: RecsType.BigInt,
                    player: RecsType.BigInt,
                    counter: RecsType.BigInt,
                    threadId: RecsType.BigInt,
                    runId: RecsType.BigInt,
                    cidA: RecsType.BigInt,
                    cidB: RecsType.BigInt,
                },
                {
                    metadata: {
                        name: "Decision",
                        types: ["felt252", "ContractAddress", "felt252", "felt252", "felt252", "felt252", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),
    };
}
