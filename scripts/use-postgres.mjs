// Erzeugt prisma/schema.postgres.prisma aus dem SQLite-Schema.
// Prisma erlaubt keinen Provider-Wechsel per Umgebungsvariable,
// deshalb wird eine Kopie mit provider = "postgresql" angelegt.
// Danach laufen generate, db push und db seed mit PRISMA_SCHEMA auf der Kopie.
// Die Umgebungsvariable wird hier gesetzt statt im npm-Skript, weil
// `VAR=wert befehl` unter Windows (cmd.exe) nicht funktioniert.
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const SCHEMA = "prisma/schema.postgres.prisma";

const source = readFileSync("prisma/schema.prisma", "utf8");
const target = source.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');

if (target === source) {
  console.error('Kein provider = "sqlite" im Schema gefunden.');
  process.exit(1);
}

writeFileSync(SCHEMA, target);
console.log(`${SCHEMA} erzeugt.`);

// Prisma-CLI direkt mit Node starten: kein Shell-Aufruf, kein .cmd-Wrapper.
const prismaCli = createRequire(import.meta.url).resolve("prisma/build/index.js");
const env = { ...process.env, PRISMA_SCHEMA: SCHEMA };

for (const args of [["generate"], ["db", "push"], ["db", "seed"]]) {
  const { status, error } = spawnSync(process.execPath, [prismaCli, ...args], { stdio: "inherit", env });
  if (error) throw error;
  if (status !== 0) process.exit(status ?? 1);
}
