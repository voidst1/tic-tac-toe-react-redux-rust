import { getBit, setBit } from "@/utils/bit-utils"

export const NUMBER_OF_PLAYERS = 2
export const NUMBER_OF_SQUARES = 3 * 3

export function getActivePlayerIdFromTurn(turnNumber: number): number {
  return turnNumber % NUMBER_OF_PLAYERS
}

// returns player id if square is occupied, else return null
export function getSquare(
  bitboards: number[],
  position: number,
): number | null {
  for (let i = 0; i < bitboards.length; i++) {
    if (getBit(bitboards[i], position)) {
      return i
    }
  }
  return null
}

// It's a valid move if square is not occupied
export function isValidMove(bitboards: number[], position: number): boolean {
  return getSquare(bitboards, position) === null
}

// Return a new bitboard with the move played
export function playMove(bitboard: number, position: number): number {
  return setBit(bitboard, position)
}
