// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://ametrine.cc",
    trailingSlash: "ignore",
    build: {
        format: "directory",
    },
});
