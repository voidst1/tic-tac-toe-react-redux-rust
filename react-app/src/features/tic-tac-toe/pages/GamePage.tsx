import type { JSX } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { NUMBER_OF_SQUARES, Winner } from "../gameLogic"
import { exitGame, selectActivePlayerId, selectWinner } from "../ticTacToeSlice"
import { Square } from "../Square"

export const GamePage = (): JSX.Element => {
  const winner: Winner = useAppSelector(state => selectWinner(state))
  const activePlayerId: number = useAppSelector(state =>
    selectActivePlayerId(state),
  )
  const dispatch = useAppDispatch()

  function getTurnText(): string {
    if (winner === Winner.None) {
      return `Player ${String(activePlayerId + 1)}'s Turn`
    }
    return ""
  }

  function getResultText(): string {
    switch (winner) {
      case Winner.Player1:
        return "Player 1 (O) Wins"
      case Winner.Player2:
        return "Player 2 (X) Wins"
      case Winner.Draw:
        return "Draw"
      case Winner.None:
        return ""
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="py-2 text-gray-800">{getTurnText()}</div>
      <div className="py-2 text-gray-800">{getResultText()}</div>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: NUMBER_OF_SQUARES }).map((_, i) => (
          <Square key={i} id={i} />
        ))}
      </div>
      <br />
      <Button onClick={() => dispatch(exitGame())}>Exit Game</Button>
    </div>
  )
}
