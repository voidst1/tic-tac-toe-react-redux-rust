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
