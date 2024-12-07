import { NextApiResponse } from "next";
import migrationRunner, { RunnerOption } from "node-pg-migrate";

export async function get(
  response: NextApiResponse,
  migrationRunnerConfig: RunnerOption,
) {
  const pendingMigrations = await migrationRunner(migrationRunnerConfig);
  return response.status(200).json(pendingMigrations);
}
