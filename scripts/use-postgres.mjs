// Erzeugt prisma/schema.postgres.prisma aus dem SQLite-Schema.
// Prisma erlaubt keinen Provider-Wechsel per Umgebungsvariable,
// deshalb wird eine Kopie mit provider = "postgresql" angelegt.
import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync("prisma/schema.prisma", "utf8");
const target = source.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');

if (target === source) {
  console.error('Kein provider = "sqlite" im Schema gefunden.');
  process.exit(1);
}

writeFileSync("prisma/schema.postgres.prisma", target);
console.log("prisma/schema.postgres.prisma erzeugt.");
