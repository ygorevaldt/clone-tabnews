import { defineConfig } from "vitest/config";
import { config } from "dotenv";
config();

export default defineConfig({
  test: {
    alias: {
      "@/": new URL("./", import.meta.url).pathname,
    },
  },
});
