import { database } from "@/infra/database";
import { NextApiRequest, NextApiResponse } from "next";

type ServerVersion = {
  server_version: string;
};

type MaxConnections = {
  max_connections: string;
};

type OpenedConnections = {
  opened_connections: string;
};

export default async function status(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = (
    await database.query<ServerVersion>("SHOW server_version;")
  )[0].server_version;

  const databaseMaxConnections = (
    await database.query<MaxConnections>("SHOW max_connections;")
  )[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = (
    await database.query<OpenedConnections>(
      "SELECT COUNT(*)::int AS opened_connections FROM pg_stat_activity WHERE datname = $1",
      [databaseName],
    )
  )[0].opened_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        opened_connections: databaseOpenedConnections,
      },
    },
  });
}
