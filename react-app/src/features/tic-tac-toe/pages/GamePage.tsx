import type { JSX } from "react"
import { useAppDispatch } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { NUMBER_OF_SQUARES } from "../gameLogic"
import { exitGame } from "../ticTacToeSlice"
import { Square } from "../Square"

export const GamePage = (): JSX.Element => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
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
