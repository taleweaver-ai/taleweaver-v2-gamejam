use taleweaver::models::decision::Decision;
use starknet::ContractAddress;
// define the interface
#[starknet::interface]
trait IPlay<TContractState> {
    fn playGame(self: @TContractState, assistantIdP:felt252, counterP:felt252, threadIdP:felt252, runIdP:felt252, cidAP:felt252,cidBP:felt252);
}

// dojo decorator
#[dojo::contract]
mod play {    
    use starknet::{ContractAddress, get_caller_address};
    use taleweaver::models::{decision::Decision};

    use super::IPlay;

    #[abi(embed_v0)]
    impl PlayImpl of IPlay<ContractState> {
        fn playGame(self: @ContractState, assistantIdP:felt252, counterP:felt252, threadIdP:felt252, runIdP:felt252, cidAP:felt252,cidBP:felt252)
        {
            let world = self.world_dispatcher.read(); 
            // Get the address of the current caller, possibly the player's address.
            let mut playerD = get_caller_address();
            //let mut key = world.uuid();
            let mut decisionTmp = Decision{
                assistantId: assistantIdP,
                player: playerD,
                counter: counterP,
                threadId: threadIdP,
                runId: runIdP,
                cidA: cidAP,
                cidB: cidBP
            };
            set!(world, (decisionTmp));
        }
    }
 
}