// Packages
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    alias: {
      "@": resolve(__dirname, "src"),
    },

    globalSetup: ["./tests/mocks/setup.ts"],

    coverage: {
      all: true,
      include: ["src/modules/**/use-cases/**"],
      provider: "c8",
      reporter: ["text", "html", "json"],
    },
  },
});
