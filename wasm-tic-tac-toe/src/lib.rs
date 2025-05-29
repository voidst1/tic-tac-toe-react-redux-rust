mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_first_available_move(bitboard1: u16, bitboard2: u16) -> u8 {
    for pos in 0..9 {
        let mask = 1 << pos;
        if (bitboard1 & mask) == 0 && (bitboard2 & mask) == 0 {
            return pos;
        }
    }
    0
}
