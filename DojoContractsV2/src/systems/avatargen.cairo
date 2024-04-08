use taleweaver::models::avatar::Avatar;


// define the interface
#[starknet::interface]
trait IAvatarGen<TContractState> {
    fn createAvatar(self: @TContractState, assistantID: felt252, nameP:felt252, aliasP:felt252, descriptionAP:felt252, descriptionBP:felt252);
}


// dojo decorator
#[dojo::contract]
mod avatargen {    
    use starknet::{ContractAddress, get_caller_address};
    use tale_weaver::models::{avatar::{Avatar}};

    use super::IAvatarGen; 

    #[derive(Drop, starknet::Event)]
    struct NewAvatar{
        avatarId: u32,
    }

    #[abi(embed_v0)]
    impl CreationImpl of IAvatarGen<ContractState> {
        // ContractState is defined by system decorator expansion
        fn createAvatar(self: @ContractState, assistantID: felt252, nameP:felt252, aliasP:felt252, descriptionAP:felt252, descriptionBP:felt252){
            
            let world = self.world_dispatcher.read(); 
            
            let mut avatarTmp = Avatar {
                assistantId: assistantID,
                name:nameP,
                alias: aliasP,
                descriptionA:descriptionAP,
                descriptionB:descriptionBP,
            };
            set!(world, (avatarTmp));
        }
    } 
}

