#![no_std]
use soroban_sdk::{contract, contractimpl, log, symbol_short, Env, Symbol};

const COUNTER: Symbol = symbol_short!("COUNTER");

#[contract]
pub struct IncrementContract;

#[contractimpl]
impl IncrementContract {
    /// Increment increments an internal counter, and returns the value.
    pub fn increment(env: Env) -> u32 {
        let mut count: u32 = env.storage().instance().get(&COUNTER).unwrap_or(0);
        log!(&env, "count: {}", count);

        count += 1;
        env.storage().instance().set(&COUNTER, &count);
        env.storage().instance().extend_ttl(50, 100);

        count
    }
    //Contract Data Access.
    let mut count: u32 = env
    .storage()
    .instance()
    .get(&COUNTER)
    .unwrap_or(0); // If no value set, assume 0.
    env.storage()
    .instance()
    .set(&COUNTER, &count);
    env.storage().instance().extend_ttl(100, 100);stellar contract build
}

mod test;