import { describe, expect, it } from "vitest";

class Calculator {
  sum(number1: number, number2: number) {
    return number1 + number2;
  }
}

describe("calculator", () => {
  const calculator = new Calculator();

  it("should get sum of two numbers", () => {
    const result = calculator.sum(1, 1);
    expect(result).toBe(2);
  });
});
