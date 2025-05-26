import { useAppDispatch, useAppSelector } from "@/app/hooks"
import type { JSX } from "react"
import { PlayerType, playMove, selectSquare } from "./ticTacToeSlice"

export const Square = ({ id }: { id: number }): JSX.Element => {
  const square = useAppSelector(state => selectSquare(state, id))
  const dispatch = useAppDispatch()

  const getSymbol = (): string => {
    if (square === 0) {
      return "X"
    } else if (square === 1) {
      return "O"
    }
    return ""
  }

  function handleClick(): void {
    dispatch(playMove({ position: id, playerType: PlayerType.Human }))
  }

  return (
    <button className="size-16 bg-gray-200" onClick={handleClick}>
      {getSymbol()}
    </button>
  )
}
