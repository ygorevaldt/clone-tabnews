import { Client } from "pg";

export const database = {
  query: async <T>(query: string, values: any[] = []): Promise<T[]> => {
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

    try {
      await client.connect();
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    } finally {
      await client.end();
    }
  },
};
