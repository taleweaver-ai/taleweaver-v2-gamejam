use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Seed{  
#[key] assistantId: felt252,
creator: ContractAddress,
cidA: felt252,
cidB: felt252   
}