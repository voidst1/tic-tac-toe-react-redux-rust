import type { JSX } from "react"
import { Button } from "@/components/ui/button"

export const MainMenu = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center min-h-svh gap-y-2">
    <Button>Practice with Bot</Button>
    <Button>Local Two Player Mode</Button>
  </div>
)
