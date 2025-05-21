import type { JSX } from "react"
import { useAppSelector } from "@/app/hooks"
import { MainMenu } from "@/features/tic-tac-toe/pages/MainMenu"
import { GamePage } from "@/features/tic-tac-toe/pages/GamePage"
import {
  GameStatus,
  selectGameStatus,
} from "@/features/tic-tac-toe/ticTacToeSlice"

export const App = (): JSX.Element => {
  const gameStatus = useAppSelector(selectGameStatus)
  return <>{gameStatus === GameStatus.MainMenu ? <MainMenu /> : <GamePage />}</>
}
