// Generated by dojo-bindgen on Sun, 7 Apr 2024 20:07:59 +0000. Do not modify this file manually.
import { Account } from "starknet";
import { DojoProvider } from "@dojoengine/core";
import * as models from "../generated/contractComponents";


export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
    // System definitions for `taleweaver::systems::play::play` contract
    function play() {
        const contract_name = "play";

        
        // Call the `playGame` system with the specified Account and calldata
        const playGame = async (props: { account: Account, assistantIdP: BigInt, counterP: BigInt, threadIdP: BigInt, runIdP: BigInt, cidAP: BigInt, cidBP: BigInt }) => {
            try {
                return await provider.execute(
                    props.account,
                    contract_name,
                    "playGame",
                    [props.assistantIdP,
                props.counterP,
                props.threadIdP,
                props.runIdP,
                props.cidAP,
                props.cidBP]
                );
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        };
            

    
        // Call the `dojo_resource` system with the specified Account and calldata
        const dojoResource = async (props: { account: Account }) => {
            try {
                return await provider.execute(
                    props.account,
                    contract_name,
                    "dojo_resource",
                    []
                );
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        };
            

        return {
            playGame, dojoResource
        };
    }

    // System definitions for `taleweaver::systems::construct::construct` contract
    function construct() {
        const contract_name = "construct";

        
        // Call the `createSeed` system with the specified Account and calldata
        const createSeed = async (props: { account: Account, assistantIdP: BigInt, cidAP: BigInt, cidBP: BigInt }) => {
            try {
                return await provider.execute(
                    props.account,
                    contract_name,
                    "createSeed",
                    [props.assistantIdP,
                props.cidAP,
                props.cidBP]
                );
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        };
            

    
        // Call the `dojo_resource` system with the specified Account and calldata
        const dojoResource = async (props: { account: Account }) => {
            try {
                return await provider.execute(
                    props.account,
                    contract_name,
                    "dojo_resource",
                    []
                );
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        };
            

        return {
            createSeed, dojoResource
        };
    }

    return {
        play: play(),
        construct: construct()
    };
}