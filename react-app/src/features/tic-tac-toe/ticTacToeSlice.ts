import { createAppSlice } from "@/app/createAppSlice"
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit/react"
import * as gameLogic from "./gameLogic"
import type { RootState } from "@/app/store"

export enum GameStatus {
  MainMenu,
  GameStarted,
  GameEnded,
}

export enum PlayerType {
  Human,
  Bot,
}

export type Player = {
  id: number
  name: string
  playerType: PlayerType
}

type PlayMovePayload = {
  playerType: PlayerType
  position: number
}

/*
function getRandomMove(bitboards: number[]): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      const move = gameLogic.getRandomMove(bitboards)
      resolve(move)
    }, 1500)
  })
}
*/

function getMctsMove(
  bitboard0: number,
  bitboard1: number,
  currentPlayer: number,
): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      const move = gameLogic.getMctsMoveWasm(
        bitboard0,
        bitboard1,
        currentPlayer,
      )
      resolve(move)
    }, 1500)
  })
}

export const playBotMove = createAsyncThunk(
  "ticTacToe/playBotMove",
  async (_arg, { dispatch, getState }) => {
    const state = getState() as RootState
    const { bitboards } = state.ticTacToe
    dispatch(
      playMove({
        position: await getMctsMove(
          bitboards[0],
          bitboards[1],
          selectActivePlayerId(state),
        ),
        playerType: PlayerType.Bot,
      }),
    )
  },
)

export type TicTacToeSliceState = {
  gameStatus: GameStatus
  players: Player[]
  bitboards: number[]
  turnNumber: number
  winner: gameLogic.Winner
}

const initialState: TicTacToeSliceState = {
  gameStatus: GameStatus.MainMenu,
  players: [],
  bitboards: [0, 0],
  turnNumber: 0,
  winner: gameLogic.Winner.None,
}

export const ticTacToeSlice = createAppSlice({
  name: "ticTacToe",
  initialState,
  reducers: create => ({
    startGame: create.reducer((state, action: PayloadAction<Player[]>) => {
      state.gameStatus = GameStatus.GameStarted
      state.players = action.payload
    }),
    exitGame: create.reducer(() => {
      return initialState
    }),
    playMove: create.reducer(
      (state, action: PayloadAction<PlayMovePayload>) => {
        // Player should only be able to make a move when the game is started and ongoing
        if (state.gameStatus !== GameStatus.GameStarted) {
          return
        }

        // Destructure payload
        const {
          playerType,
          position,
        }: { playerType: PlayerType; position: number } = action.payload

        // Get active player id
        const activePlayerId = gameLogic.getActivePlayerIdFromTurn(
          state.turnNumber,
        )

        // Ensure the player type passed in matches the active player's player type
        // Human cannot play on bot's turn
        if (playerType !== state.players[activePlayerId].playerType) {
          return
        }

        // Ensure move is valid
        if (gameLogic.isValidMove(state.bitboards, position)) {
          // Play move and update player bitboard
          state.bitboards[activePlayerId] = gameLogic.playMove(
            state.bitboards[activePlayerId],
            position,
          )

          // Check for game end
          state.winner = gameLogic.getWinner(state.bitboards, activePlayerId)
          if (state.winner === gameLogic.Winner.None) {
            state.turnNumber++
          } else {
            state.gameStatus = GameStatus.GameEnded
          }
        }
      },
    ),
  }),
  selectors: {
    selectGameStatus: state => state.gameStatus,

    selectActivePlayer: state =>
      state.players[gameLogic.getActivePlayerIdFromTurn(state.turnNumber)],

    selectActivePlayerId: state =>
      gameLogic.getActivePlayerIdFromTurn(state.turnNumber),

    selectWinner: state => state.winner,

    // returns player id if square is occupied, else return null
    selectSquare: (state, position: number) => {
      return gameLogic.getSquare(state.bitboards, position)
    },
  },
})

export const { startGame, exitGame, playMove } = ticTacToeSlice.actions
export const {
  selectGameStatus,
  selectActivePlayer,
  selectActivePlayerId,
  selectSquare,
  selectWinner,
} = ticTacToeSlice.selectors
