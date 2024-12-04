import { join } from "node:path";
import { NextApiRequest, NextApiResponse } from "next";
import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { getNewClient } from "@/infra/database";

export default async function migrations(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const dbClient = await getNewClient();
  const runnerOption: RunnerOption = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  };

  const method = request.method?.toUpperCase();

  if (method === "GET") {
    const pendingMigrations = await migrationRunner(runnerOption);
    await dbClient.end();

    return response.status(200).json(pendingMigrations);
  }

  if (method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...runnerOption,
      dryRun: false,
    });
    await dbClient.end();

    const whereMigrationsRunned = migratedMigrations.length > 0;
    return response
      .status(whereMigrationsRunned ? 201 : 200)
      .json(migratedMigrations);
  }

  return response.status(405).end();
}
