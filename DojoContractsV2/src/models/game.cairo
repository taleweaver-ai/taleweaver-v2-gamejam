use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Game{  
#[key] id: u32,
#[key] seed_id: u32,
player_id: ContractAddress,  
avatar_id: u32,  
counter: u64 
}