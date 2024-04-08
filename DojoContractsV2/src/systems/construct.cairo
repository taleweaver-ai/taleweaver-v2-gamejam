use taleweaver::models::seed::Seed;
// define the interface
#[starknet::interface]
trait IConstruct<TContractState> {
    fn createSeed(self: @TContractState, assistantIdP:felt252, cidAP:felt252, cidBP:felt252);
}

// dojo decorator
#[dojo::contract]
mod construct {    
    use starknet::{ContractAddress, get_caller_address};
    use taleweaver::models::{seed::Seed};

    use super::IConstruct; 

    #[abi(embed_v0)]
    impl ConstructImpl of IConstruct<ContractState> {
        fn createSeed(self: @ContractState, assistantIdP:felt252, cidAP:felt252, cidBP:felt252){
            
            let world = self.world_dispatcher.read(); 
            
            let player = get_caller_address();
            
            let mut seedTmp = Seed {
                assistantId: assistantIdP,
                creator: player,
                cidA: cidAP,
                cidB: cidBP
            };
            set!(world, (seedTmp));
        }
    }
 
}