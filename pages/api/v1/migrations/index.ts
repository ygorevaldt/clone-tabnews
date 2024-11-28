import { join } from "node:path";
import { NextApiRequest, NextApiResponse } from "next";
import migrationRunner, { RunnerOption } from "node-pg-migrate";

export default async function migrations(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const runnerOption: RunnerOption = {
    databaseUrl: process.env.DATABASE_URL!,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  };

  const method = request.method?.toUpperCase();

  if (method === "GET") {
    const migrations = await migrationRunner(runnerOption);
    return response.status(200).json(migrations);
  }

  if (method === "POST") {
    const migrations = await migrationRunner({
      ...runnerOption,
      dryRun: false,
    });
    return response.status(200).json(migrations);
  }

  return response.status(405).end();
}
