import { describe, expect, it } from "vitest";

import { database } from "@/infra/database";

describe("test", () => {
  it("should get sum of two numbers", async () => {
    const [queryResult] = await database.query("SELECT 1 + 1 as sum;");

    expect(queryResult.sum).toBe(2);
  });
});
