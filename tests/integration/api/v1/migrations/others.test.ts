import { beforeEach, describe, expect, it } from "vitest";
import { cleanDatabase } from "../../utils/clean-database";

describe("migrations", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("DELETE to /api/v1/migrations should return http status code 504", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "DELETE",
    });
    expect(response.status).toEqual(405);
  });

  it("PUT to /api/v1/migrations should return http status code 504", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "PUT",
    });
    expect(response.status).toEqual(405);
  });

  it("PUT to /api/v1/migrations should not create db connections without closing them afterwards", async () => {
    const putRequest = async () =>
      await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PUT",
      });
    const deleteRequest = async () =>
      await fetch("http://localhost:3000/api/v1/migrations", {
        method: "DELETE",
      });

    await Promise.all([putRequest, deleteRequest]);

    const apiStatusResponse = await fetch(
      "http://localhost:3000/api/v1/status",
    );
    expect(apiStatusResponse.status).toEqual(200);

    const apiStatusResponseJson = await apiStatusResponse.json();
    expect(
      apiStatusResponseJson.dependencies.database.opened_connections,
    ).toEqual(1);
  });
});
