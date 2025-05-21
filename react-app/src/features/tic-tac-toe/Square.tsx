import type { JSX } from "react"

export const Square = ({ id }: { id: number }): JSX.Element => {
  const getSymbol = (): string => {
    return id.toString()
  }

  return <button className="size-16 bg-gray-200">{getSymbol()}</button>
}
