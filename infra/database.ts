import { Client } from "pg";

export const database = {
  query: async (query: string) => {
    const {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_HOST,
      POSTGRES_PORT,
      POSTGRES_DB,
    } = process.env;

    const client = new Client({
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      database: POSTGRES_DB,
    });
    client.connect();

    const result = await client.query(query);

    client.end();
    return result.rows;
  },
};
