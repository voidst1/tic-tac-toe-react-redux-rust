import type { JSX } from "react"
import { useAppDispatch } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { PlayerType, startGame } from "../ticTacToeSlice"

export const MainMenu = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const handlePracticeWithBotClick = () => {
    dispatch(
      startGame([
        {
          id: 0,
          name: "You",
          playerType: PlayerType.Human,
        },
        {
          id: 1,
          name: "Bot",
          playerType: PlayerType.Bot,
        },
      ]),
    )
  }
  const handleLocalTwoPlayerModeClick = () => {
    dispatch(
      startGame([
        {
          id: 0,
          name: "Player 1",
          playerType: PlayerType.Human,
        },
        {
          id: 1,
          name: "Player 2",
          playerType: PlayerType.Human,
        },
      ]),
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-y-2">
      <Button onClick={handlePracticeWithBotClick}>Practice with Bot</Button>
      <Button onClick={handleLocalTwoPlayerModeClick}>
        Local Two Player Mode
      </Button>
    </div>
  )
}
