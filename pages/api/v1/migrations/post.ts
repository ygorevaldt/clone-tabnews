import { NextApiResponse } from "next";
import migrationRunner, { RunnerOption } from "node-pg-migrate";

export async function post(
  response: NextApiResponse,
  migrationRunnerConfig: RunnerOption,
) {
  const migratedMigrations = await migrationRunner({
    ...migrationRunnerConfig,
    dryRun: false,
  });

  const wereMigrationsRun = migratedMigrations.length > 0;
  return response
    .status(wereMigrationsRun ? 201 : 200)
    .json(migratedMigrations);
}
