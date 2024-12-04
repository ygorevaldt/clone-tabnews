import { beforeEach, describe, expect, it } from "vitest";
import { cleanDatabase } from "../../utils/clean-database";

describe("migrations", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("GET to /api/v1/migrations should return http status code 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
  });
});
