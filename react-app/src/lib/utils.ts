import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
