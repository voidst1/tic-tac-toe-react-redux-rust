import { expect } from "vitest"
import { getBit } from "./bit-utils.js"

describe("getBit", () => {
  it("returns true when the specified bit is set (1)", () => {
    expect(getBit(0b101010101, 0)).toBe(true) // Least significant bit is 1
    expect(getBit(0b101010101, 2)).toBe(true) // 3rd bit from right is 1
    expect(getBit(0b101010101, 4)).toBe(true) // 5th bit from right is 1
    expect(getBit(0b101010101, 6)).toBe(true) // 7th bit from right is 1
    expect(getBit(0b101010101, 8)).toBe(true) // 9th bit from right is 1
  })

  it("returns false when the specified bit is not set (0)", () => {
    expect(getBit(0b101010101, 1)).toBe(false) // 2nd bit from right is 0
    expect(getBit(0b101010101, 3)).toBe(false) // 4th bit from right is 0
    expect(getBit(0b101010101, 5)).toBe(false) // 6th bit from right is 0
    expect(getBit(0b101010101, 7)).toBe(false) // 8th bit from right is 0
  })

  it("returns false for out-of-range positions", () => {
    expect(getBit(0b101, 10)).toBe(false) // Position exceeds bit length
    expect(getBit(0, 0)).toBe(false) // All bits are 0
  })
})
