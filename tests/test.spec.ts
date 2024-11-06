import { describe, expect, it } from "vitest";

import { Calculator } from "@/models/calculator";

describe("calculator", () => {
  const calculator = new Calculator();

  it("should get sum of two numbers", () => {
    const result = calculator.sum(1, 1);
    expect(result).toBe(2);
  });
});
