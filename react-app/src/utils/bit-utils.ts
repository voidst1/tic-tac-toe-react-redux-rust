export function getBit(a: number, position: number): boolean {
  return ((a >> position) & 1) === 1
}
export function setBit(a: number, position: number): number {
  return a | (1 << position)
}
export function clearBit(a: number, position: number): number {
  return a & ~(1 << position)
}
export function flipBit(a: number, position: number): number {
  return a ^ (1 << position)
}

export function mergeWithBitwiseOr(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Array must contain at least one number.")
  }
  return numbers.reduce((acc, curr) => acc | curr)
}
