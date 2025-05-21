import { createAppSlice } from "@/app/createAppSlice"

export enum GameStatus {
  MainMenu,
  GameStarted,
  GameEnded,
}

export type TicTacToeSliceState = {
  gameStatus: GameStatus
}

const initialState: TicTacToeSliceState = {
  gameStatus: GameStatus.MainMenu,
}

export const ticTacToeSlice = createAppSlice({
  name: "ticTacToe",
  initialState,
  reducers: create => ({
    startGame: create.reducer(state => {
      state.gameStatus = GameStatus.GameStarted
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
