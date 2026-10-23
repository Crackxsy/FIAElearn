# Mitmachen bei FIAElearn

Danke, dass du FIAElearn verbessern willst! Beiträge sind willkommen – ob Tippfehler, falsche Musterlösung, neues Thema oder Code.

## Einrichtung

Voraussetzung: Node.js 22 oder neuer. Alle Befehle funktionieren unter Windows (PowerShell), macOS und Linux.

```bash
npm install
cp .env.example .env       # Windows-Eingabeaufforderung: copy .env.example .env
npx prisma migrate dev     # legt prisma/dev.db an
npm run db:seed            # Inhalte einspielen
npm run dev                # http://localhost:3000
```

## Vor dem Pull Request

```bash
npm run lint
npm run typecheck
npm test                   # prüft u. a. alle Inhalte und SQL-Musterlösungen
npm run test:e2e           # nur bei Änderungen an Oberfläche oder Abläufen
```

Für den E2E-Test einmalig `npx playwright install chromium` ausführen. Er läuft headless gegen eine eigene Test-Datenbank (`prisma/e2e.db`).

## Inhalte beitragen

Lerninhalte liegen in `src/content/topics/*.ts`, das Format steht in `src/content/types.ts` (Helfer `q.single`, `q.multi`, `q.short`, `q.calc`, `q.trace`, `q.sql`, `q.open`, `card`).

**Wichtig – IDs entstehen aus der Position.** Fragen und Karten bekommen ihre ID aus der Reihenfolge (`<thema>-q1`, `<thema>-q2`, …). Lernfortschritt und Wiederholungen der Nutzer hängen an diesen IDs. Deshalb:

- Neue Fragen und Karten in bestehenden Themen **nur ans Ende** anhängen.
- Nichts in der Mitte einfügen, nicht umsortieren, nicht löschen. Eine fehlerhafte Frage wird korrigiert, nicht entfernt.
- Themen-IDs nie umbenennen.

**Qualität**

- Nur **eigene Übungsaufgaben** – keine Original-IHK-Prüfungsaufgaben und keine Texte aus kostenpflichtigen Büchern oder Katalogen.
- Fachlich korrekt und prüfungsnah; bei Unsicherheit lieber weglassen. Rechenaufgaben nachrechnen und Toleranz/Einheit setzen.
- Jede Lektion verweist auf Quellen aus `src/content/sources.ts`. Neue Quellen nur seriös und öffentlich erreichbar.
- Nur fiktive Beispieldaten (z. B. „Muster GmbH“), keine echten Personen oder Firmen.
- Deutsch mit korrekten Umlauten und ß.
- Lektionstexte nutzen nur das Markdown, das `src/components/markdown.tsx` darstellt (Überschriften `##`/`###`, Listen, Tabellen, Code-Blöcke, Zitate, `**fett**`, `*kursiv*`, `` `Code` ``).
- Prüfungsregeln (Gewichtung, Bestehen, Termine) nur mit Beleg aus FIAusbV, IHK oder SIHK ändern.

Nach jeder Inhaltsänderung `npm test` und `npm run db:seed` ausführen.

## Code beitragen

- Fachlogik ohne Datenbank gehört nach `src/lib/domain/` und bekommt Unit-Tests in `tests/unit/`.
- Datenbankzugriffe laufen über `src/lib/services/`.
- Schemaänderungen immer mit Migration (`npm run db:migrate`) und so, dass sie auf SQLite und PostgreSQL funktionieren.
- npm-Skripte plattformunabhängig halten: keine Shell-Syntax wie `VAR=wert befehl`, `rm -rf` oder `cp` in `package.json` – im Zweifel ein kleines Node-Skript in `scripts/`.

## Commits und Pull Requests

- Commit-Nachrichten auf Deutsch, Betreff nach dem Muster `Bereich: was und warum` (z. B. `Lerninhalte: Reguläre Ausdrücke (AP2)`).
- Ein Pull Request pro Thema bzw. Fehlerbehebung.
- Fehler in Inhalten gern zuerst als Issue melden – mit Thema, Frage und Beleg.
