import { beforeEach, describe, expect, it } from "vitest";
import { cleanDatabase } from "../../utils/clean-database";

describe("migrations", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("POST to /api/v1/migrations should return http status code 200", async () => {
    const apiService = "http://localhost:3000/api/v1/migrations";
    const response1 = await fetch(apiService, {
      method: "POST",
    });
    expect(response1.status).toEqual(201);

    const responseBody1 = await response1.json();

    expect(Array.isArray(responseBody1)).toBeTruthy();
    expect(responseBody1.length).toBeGreaterThan(0);

    const response2 = await fetch(apiService, {
      method: "POST",
    });
    const responseBody2 = await response2.json();

    expect(response2.status).toEqual(200);
    expect(responseBody2.length).toEqual(0);
  });
});
