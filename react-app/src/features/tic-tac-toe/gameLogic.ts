import { getRandomElement } from "@/lib/utils"
import { getBit, mergeWithBitwiseOr, setBit } from "@/utils/bit-utils"

export const NUMBER_OF_PLAYERS = 2
export const NUMBER_OF_SQUARES = 3 * 3

export enum Winner {
  None = -1,
  Player1 = 0,
  Player2 = 1,
  Draw = 2,
}

const WINNING_LINES = [
  0b111000000, // Row 1
  0b000111000, // Row 2
  0b000000111, // Row 3
  0b100100100, // Col 1
  0b010010010, // Col 2
  0b001001001, // Col 3
  0b100010001, // Diagonal
  0b001010100, // Anti-diagonal
]

const BOARD_FULL_MASK = 0b111111111

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

// Return the winning lines if found, else return empty array
function getWinningLines(bitboard: number): number[] {
  const lines: number[] = []
  for (const mask of WINNING_LINES) {
    if ((bitboard & mask) === mask) {
      lines.push(mask)
    }
  }
  return lines
}

function isBoardFull(bitboards: number[]): boolean {
  const mergedBitboard: number = mergeWithBitwiseOr(bitboards)
  return (mergedBitboard & BOARD_FULL_MASK) === BOARD_FULL_MASK
}

export function getWinner(bitboards: number[], activePlayerId: number): Winner {
  const winningLines: number[] = getWinningLines(bitboards[activePlayerId])
  if (winningLines.length > 0) {
    return activePlayerId
  } else if (isBoardFull(bitboards)) {
    return Winner.Draw
  } else {
    return Winner.None
  }
}

export function getLegalMoves(bitboards: number[]): number[] {
  const bitboard: number = mergeWithBitwiseOr(bitboards)
  const legalMoves: number[] = []
  for (let pos = 0; pos < NUMBER_OF_SQUARES; pos++) {
    if (((bitboard >> pos) & 1) === 0) {
      legalMoves.push(pos)
    }
  }
  return legalMoves
}

export function getRandomMove(bitboards: number[]): number {
  const legalMoves = getLegalMoves(bitboards)
  return getRandomElement(legalMoves) ?? 0
}

export function getFirstAvailableMove(bitboards: number[]): number {
  const legalMoves = getLegalMoves(bitboards)
  return legalMoves[0]
}
