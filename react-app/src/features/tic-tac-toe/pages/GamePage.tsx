import type { JSX } from "react"
import { useAppDispatch } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { exitGame } from "../ticTacToeSlice"

export const GamePage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={() => dispatch(exitGame())}>Exit Game</Button>
    </div>
  )
}
