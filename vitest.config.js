// Packages
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "json"],
      reportsDirectory: "./tests/coverage",
      include: ["./src/modules/users/use-cases/**"],
    },
  },
});
