import type { JSX } from "react"
import { MainMenu } from "@/features/tic-tac-toe/pages/MainMenu"
import { GamePage } from "@/features/tic-tac-toe/pages/GamePage"

export const App = (): JSX.Element => (
  <>{true ? <MainMenu /> : <GamePage />}</>
)
