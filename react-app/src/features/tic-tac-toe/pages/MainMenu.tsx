import type { JSX } from "react"
import { useAppDispatch } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { startGame } from "../ticTacToeSlice"

export const MainMenu = (): JSX.Element => {
  const dispatch = useAppDispatch()
  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-y-2">
      <Button onClick={() => dispatch(startGame())}>Practice with Bot</Button>
      <Button onClick={() => dispatch(startGame())}>
        Local Two Player Mode
      </Button>
    </div>
  )
}
