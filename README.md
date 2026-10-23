<p align="center">
  <img src="public/brand/banner.png" alt="FIAElearn – AP1 & AP2 für Fachinformatiker AE" width="100%" />
</p>

# FIAElearn

Lernapp für die IHK-Abschlussprüfung **Fachinformatiker/in Anwendungsentwicklung** (AP1 & AP2) nach FIAusbV 2020 – mit Fokus auf die **SIHK zu Hagen (NRW)**.

## Funktionen

- **Persönlicher Lernplan** aus Prüfungstermin, Lernstart, Zielnote und verfügbarer Zeit – mit Empfehlung: täglich, alle 2 Tage, alle 3 Tage oder feste Wochentage
- **Zielnote (1–4)** bestimmt, wie sicher jedes Thema sitzen muss und wie viel Zeit eingeplant wird
- **Einstufungstest** + Selbsteinschätzung → Startwerte je Thema
- **Rettungsmodus** für alle, die kaum etwas gelernt haben: nur Pflichtthemen mit dem meisten Punktenutzen, Ziel „sicher bestehen“
- **Machbarkeitsampel**: reicht die Zeit? Was fällt bei Zeitmangel weg?
- **Automatische Umplanung** verpasster Einheiten
- **Lektionen, Karteikarten, Übungsaufgaben** zu 46 Themen (≈ 290 Aufgaben, ≈ 220 Karten) – alles eigene Inhalte
- Aufgabentypen: Single/Multiple Choice, Kurzantwort, Rechnung (Toleranz, Bit/Byte-Hinweise), Code lesen, **SQL mit echter Ausführung** in einer Sandbox, Freitext mit Selbstbewertung
- **Spaced Repetition** (Leitner, 1/3/7/14/30 Tage)
- **Prüfungssimulation** mit Timer und IHK-100-Punkte-Schlüssel
- **Fachgespräch-Training** mit Sprechtimer und Musterantworten
- **Notenprognose** inkl. Bestehensregeln nach § 16 FIAusbV
- Statistik, Quellenregister (FIAusbV, KMK, SIHK, BIBB …), Datenexport & Konto löschen (DSGVO)
- Cleanes Design mit **Hell-/Dunkelmodus**, mobil nutzbar und als **PWA** installierbar

> Alle Aufgaben sind eigene Übungsaufgaben – **keine Original-IHK-Prüfungen**. Die Notenprognose ist eine Schätzung, keine offizielle Bewertung. Prüfungstermine und lokale Vorgaben immer bei der SIHK prüfen.

## Tech-Stack

Next.js 16 (App Router, Server Actions) · TypeScript · Tailwind CSS 4 · Prisma 7 (SQLite lokal, PostgreSQL in Produktion) · eigene Session-Authentifizierung (bcrypt, httpOnly-Cookies, DB-Sessions, Rate-Limit) · Recharts · Vitest · Playwright

## Schnellstart

Voraussetzung: Node.js ≥ 20.

```bash
npm install
cp .env.example .env       # Windows-Eingabeaufforderung: copy .env.example .env
npx prisma migrate dev     # legt prisma/dev.db an
npm run db:seed            # Themen, Fragen, Karten, Quellen
npm run dev                # http://localhost:3000
```

Alle npm-Skripte laufen auf Windows, macOS und Linux. Unter Windows funktionieren die Befehle in PowerShell unverändert. `better-sqlite3` bringt vorkompilierte Binärdateien für aktuelle Node-LTS-Versionen mit; nur bei sehr neuen Node-Versionen ohne passendes Binary werden die Visual Studio Build Tools („Desktopentwicklung mit C++“) zum Kompilieren benötigt.

## Skripte

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` / `npm start` | Produktion |
| `npm test` | Unit-Tests (Noten, Planer, Scoring, Inhalte inkl. SQL-Musterlösungen) |
| `npm run test:e2e` | End-to-End-Test (Playwright, eigene Test-DB) |
| `npm run lint` / `npm run typecheck` | Codequalität |
| `npm run db:seed` | Inhalte einspielen/aktualisieren (idempotent) |
| `npm run db:studio` | Datenbank ansehen |
| `npm run db:postgres` | Schema auf PostgreSQL umstellen, Tabellen anlegen, seeden |

## PostgreSQL (Produktion)

```bash
# .env
DATABASE_URL="postgresql://user:passwort@host:5432/fiaelearn?schema=public"
APP_URL="https://deine-domain.de"

npm run db:postgres   # erzeugt prisma/schema.postgres.prisma, generate + db push + seed
npm run build && npm start
```

Prisma erlaubt keinen Provider-Wechsel per Umgebungsvariable – deshalb erzeugt `scripts/use-postgres.mjs` eine Postgres-Kopie des Schemas. Die App wählt den passenden Treiber automatisch anhand von `DATABASE_URL`.

## Projektstruktur

```
prisma/              Schema, Migrationen, Seed
src/content/         Lerninhalte (Themen, Fragen, Karten), Quellen, SQL-Übungsdatenbanken
src/lib/domain/      Reine Logik: Notenschlüssel, Planer, Spaced Repetition, Scoring, Prognose
src/lib/services/    Datenbankzugriff: Fortschritt, Planung, Fragenauswahl, Übersicht
src/lib/sql-sandbox  SQL-Ausführung in Worker-Thread mit In-Memory-SQLite und Zeitlimit
src/app/             Seiten (Landing, Onboarding, Dashboard, Lernen, Plan, Simulation …) und Server Actions
tests/               Unit- und E2E-Tests
```

## Inhalte erweitern

Neue Themen/Fragen in `src/content/topics/*.ts` ergänzen (Helfer `q.single`, `q.calc`, `q.sql`, …), dann `npm test` (prüft u. a. alle SQL-Musterlösungen) und `npm run db:seed`.

## Quellen

Rechtsgrundlage: [FIAusbV](https://www.gesetze-im-internet.de/fiausbv/) · [KMK-Rahmenlehrplan](https://www.kmk.org/fileadmin/Dateien/pdf/Bildung/BeruflicheBildung/rlp/Fachinformatiker_19-12-13_EL.pdf) · [SIHK Hagen – IT-Berufe](https://www.ihk.de/hagen/bildung/abschlusspruefungen/it-berufe-index-812540?index=0). Vollständige Liste in der App unter „Quellen & Regeln“.
