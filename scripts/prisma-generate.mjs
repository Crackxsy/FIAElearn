// Erzeugt den Prisma-Client passend zur Datenbank in DATABASE_URL.
// `prisma generate` liest sonst immer prisma/schema.prisma (SQLite). Ein
// SQLite-Client bricht mit dem PostgreSQL-Adapter beim ersten Datenbankzugriff
// ab („Driver Adapter @prisma/adapter-pg … not compatible with the provider
// sqlite“) – deshalb nutzt `npm run build` dieses Skript statt `prisma generate`.
import "dotenv/config";
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const POSTGRES_SCHEMA = "prisma/schema.postgres.prisma";

const env = { ...process.env };
if (!env.PRISMA_SCHEMA && env.DATABASE_URL?.startsWith("postgres")) {
  const source = readFileSync("prisma/schema.prisma", "utf8");
  const target = source.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
  if (target === source) {
    console.error('Kein provider = "sqlite" im Schema gefunden.');
    process.exit(1);
  }
  writeFileSync(POSTGRES_SCHEMA, target);
  env.PRISMA_SCHEMA = POSTGRES_SCHEMA;
}

// Prisma-CLI direkt mit Node starten: kein Shell-Aufruf, läuft auch unter Windows.
const prismaCli = createRequire(import.meta.url).resolve("prisma/build/index.js");
const { status, error } = spawnSync(process.execPath, [prismaCli, "generate"], { stdio: "inherit", env });
if (error) throw error;
process.exit(status ?? 1);
