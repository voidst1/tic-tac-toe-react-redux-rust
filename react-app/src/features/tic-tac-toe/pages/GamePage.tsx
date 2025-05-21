import type { JSX } from "react"
import { Button } from "@/components/ui/button"

export const GamePage = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center min-h-svh">
    <Button>Exit Game</Button>
  </div>
)
