import { join } from "node:path";
import { NextApiRequest, NextApiResponse } from "next";
import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { getNewClient } from "@/infra/database";
import { get } from "./get";
import { post } from "./post";
import { Client } from "pg";

export default async function migrations(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  let dbClient: Client;
  try {
    dbClient = await getNewClient();

    const migrationRunnerConfig: RunnerOption = {
      dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      verbose: true,
    };

    const method = request.method?.toUpperCase();

    if (method === "GET") {
      return await get(response, migrationRunnerConfig);
    }

    if (method === "POST") {
      return await post(response, migrationRunnerConfig);
    }

    return response.status(405).end();
  } catch (error) {
    console.error(error);
    return response.status(500).end();
  } finally {
    if (!dbClient!) return;
    await dbClient.end();
  }
}
