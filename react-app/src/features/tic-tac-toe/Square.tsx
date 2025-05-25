import { useAppSelector } from "@/app/hooks"
import type { JSX } from "react"
import { selectSquare } from "./ticTacToeSlice"

export const Square = ({ id }: { id: number }): JSX.Element => {
  const square = useAppSelector(state => selectSquare(state, id))

  const getSymbol = (): string => {
    if (square === 0) {
      return "X"
    } else if (square === 1) {
      return "O"
    }
    return ""
  }

  return <button className="size-16 bg-gray-200">{getSymbol()}</button>
}
