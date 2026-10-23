import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: process.env.PRISMA_SCHEMA ?? "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  // Fallback wie in src/lib/db.ts und prisma/seed.ts: `npm install` führt
  // `prisma generate` aus, bevor eine .env existiert.
  datasource: {
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  },
});
