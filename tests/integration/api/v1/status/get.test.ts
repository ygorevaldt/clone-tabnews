import { describe, expect, it } from "vitest";

describe("status", () => {
  it("should return http status code 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const responseBody = await response.json();

    console.log(responseBody);

    const updatedAtParsed = new Date(responseBody.updated_at).toISOString();

    expect(response.status).toBe(200);
    expect(responseBody.updated_at).toEqual(updatedAtParsed);
    expect(responseBody.dependencies.database.version).toEqual("16.0");
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
    expect(responseBody.dependencies.database.opened_connections).toEqual(1);
  });
});
