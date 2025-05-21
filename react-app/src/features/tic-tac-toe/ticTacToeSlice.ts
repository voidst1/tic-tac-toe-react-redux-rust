import { createAppSlice } from "@/app/createAppSlice"
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
}

const initialState: TicTacToeSliceState = {
  gameStatus: GameStatus.MainMenu,
  players: [],
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
  },
})

export const { startGame, exitGame } = ticTacToeSlice.actions
export const { selectGameStatus } = ticTacToeSlice.selectors
