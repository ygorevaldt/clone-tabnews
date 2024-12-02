import { defineConfig } from "vitest/config";
import { config } from "dotenv";

config({ path: "./.env.development" });

export default defineConfig({
  test: {
    alias: {
      "@/": new URL("./", import.meta.url).pathname,
    },
    fileParallelism: false,
  },
});
