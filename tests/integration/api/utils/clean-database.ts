import { database } from "@/infra/database";

export async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE;");
  await database.query("CREATE SCHEMA public;");
}
