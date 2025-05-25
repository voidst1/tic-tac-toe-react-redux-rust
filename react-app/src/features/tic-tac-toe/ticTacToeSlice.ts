import { createAppSlice } from "@/app/createAppSlice"
import { getBit } from "@/utils/bit-utils"
import type { PayloadAction } from "@reduxjs/toolkit/react"

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

export type TicTacToeSliceState = {
  gameStatus: GameStatus
  players: Player[]
  bitboards: number[]
}

const initialState: TicTacToeSliceState = {
  gameStatus: GameStatus.MainMenu,
  players: [],
  bitboards: [0, 0],
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
  }),
  selectors: {
    selectGameStatus: state => state.gameStatus,

    // returns player id if square is occupied, else return null
    selectSquare: (state, position: number) => {
      for (let i = 0; i < state.bitboards.length; i++) {
        if (getBit(state.bitboards[i], position)) {
          return i
        }
      }
      return null
    },
  },
})

export const { startGame, exitGame } = ticTacToeSlice.actions
export const { selectGameStatus, selectSquare } = ticTacToeSlice.selectors
