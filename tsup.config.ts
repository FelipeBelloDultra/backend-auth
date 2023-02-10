// Packages
import { defineConfig } from "tsup";

// [TODO]: Fix .spec files to not build
export default defineConfig({
  clean: true,
  minify: true,
  target: "es2022",
});
