import { card, q, type TopicSeed } from "../types";

export const AP1_DATEN: TopicSeed[] = [
  {
    id: "ap1-programmierung",
    part: "AP1",
    lf: "LF05",
    title: "Programmier-Grundlagen & Struktogramm",
    summary: "Variablen, Datentypen, Verzweigungen, Schleifen, Pseudocode, Struktogramm und PAP lesen.",
    weight: 4,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O11", "L01"],
      keyPoints: [
        "Sequenz, Verzweigung (if/else, switch), Wiederholung (for, while, do-while).",
        "Kopfgesteuerte Schleife prüft vorher (evtl. 0 Durchläufe), fußgesteuerte nachher (mind. 1).",
        "Datentypen: Integer, Fließkomma, Boolean, Char, String.",
        "Struktogramm (Nassi-Shneiderman) und PAP stellen Algorithmen grafisch dar.",
        "Modulo (%) liefert den Rest – z. B. gerade Zahl: x % 2 == 0.",
      ],
      content: `## Grundbausteine
- **Sequenz**: Anweisungen nacheinander.
- **Verzweigung**: \`WENN Bedingung DANN … SONST …\`, Mehrfachauswahl (\`switch\`).
- **Schleifen**:
  - Zählschleife \`FÜR i VON 1 BIS 10\`
  - kopfgesteuert \`SOLANGE Bedingung\` (0..n Durchläufe)
  - fußgesteuert \`WIEDERHOLE … BIS Bedingung\` (mind. 1 Durchlauf)

## Datentypen
| Typ | Beispiel |
|---|---|
| Integer | 42 |
| Float/Double | 3.14 |
| Boolean | wahr/falsch |
| Char | 'A' |
| String | "Hallo" |

## Pseudocode lesen (Schreibtischtest)
\`\`\`
summe ← 0
FÜR i VON 1 BIS 4
    WENN i % 2 = 0 DANN
        summe ← summe + i
    ENDE WENN
ENDE FÜR
AUSGABE summe
\`\`\`
Schreibtischtest: i=1 (ungerade), i=2 → summe 2, i=3, i=4 → summe 6. **Ausgabe: 6**.

Lege dir beim Nachverfolgen eine **Tabelle** mit allen Variablen an.

## Grafische Darstellung
- **Struktogramm** (Nassi-Shneiderman, DIN 66261): Blöcke für Anweisung, Verzweigung (Dreieck mit wahr/falsch), Schleife (umschließender Block).
- **Programmablaufplan (PAP)**, DIN 66001: Rechteck = Anweisung, Raute = Verzweigung, Oval = Start/Ende, Parallelogramm = Ein-/Ausgabe.
- **UML-Aktivitätsdiagramm**: moderne Alternative.`,
    },
    questions: [
      q.trace("Was gibt der Pseudocode aus?", "x ← 1\nSOLANGE x < 20\n    x ← x * 3\nENDE SOLANGE\nAUSGABE x", ["27"], "1 → 3 → 9 → 27; 27 < 20 ist falsch → Ausgabe 27.", { placement: true, difficulty: 2 }),
      q.trace("Was gibt der Code aus?", "zahlen ← [4, 7, 2, 9, 5]\nmax ← zahlen[0]\nFÜR JEDES z IN zahlen\n    WENN z > max DANN\n        max ← z\n    ENDE WENN\nENDE FÜR\nAUSGABE max", ["9"], "Klassische Maximumsuche → 9."),
      q.single("Welche Schleife wird mindestens einmal durchlaufen?", ["Kopfgesteuerte Schleife", "Fußgesteuerte Schleife", "Zählschleife mit Start > Ende", "Keine"], 1, "Die fußgesteuerte Schleife prüft die Bedingung erst am Ende.", { placement: true, difficulty: 1 }),
      q.trace("Was gibt der Code aus?", "s ← \"\"\nFÜR i VON 3 BIS 1 SCHRITT -1\n    s ← s + i\nENDE FÜR\nAUSGABE s", ["321"], "i = 3, 2, 1 → String-Verkettung \"321\"."),
      q.single("Welches Symbol steht im Programmablaufplan (DIN 66001) für eine Verzweigung?", ["Rechteck", "Raute", "Oval", "Parallelogramm"], 1, "Raute = Verzweigung, Rechteck = Operation, Oval = Start/Ende, Parallelogramm = Ein-/Ausgabe."),
      q.trace("Welchen Wert hat z am Ende?", "z ← 17 % 5 + 10 / 2", ["7", "7.0", "7,0"], "17 % 5 = 2; 10 / 2 = 5; 2 + 5 = 7."),
      q.single("Welcher Datentyp eignet sich für den Wert „Kunde ist aktiv: ja/nein“?", ["String", "Integer", "Boolean", "Float"], 2, "Wahr/falsch → Boolean."),
    ],
    cards: [
      card("Kopf- vs. fußgesteuert", "Kopf: prüft vorher (0..n Durchläufe). Fuß: prüft nachher (mind. 1 Durchlauf).", true),
      card("Modulo", "Rest der ganzzahligen Division: 17 % 5 = 2. Gerade: x % 2 = 0.", true),
      card("PAP-Symbole", "Oval Start/Ende, Rechteck Anweisung, Raute Verzweigung, Parallelogramm Ein-/Ausgabe"),
      card("Struktogramm", "Nassi-Shneiderman-Diagramm (DIN 66261) – Blöcke ohne Sprünge."),
      card("Schreibtischtest", "Code Schritt für Schritt per Hand durchgehen und Variablenwerte in einer Tabelle notieren."),
    ],
  },
  {
    id: "ap1-datenbanken",
    part: "AP1",
    lf: "LF05",
    title: "Datenbank-Grundlagen & einfaches SQL",
    summary: "Tabellen, Primär-/Fremdschlüssel, Beziehungen, einfache SELECT-Abfragen.",
    weight: 4,
    hours: 3.5,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["O11", "L03"],
      keyPoints: [
        "Relationale DB: Tabellen (Relationen) aus Zeilen (Datensätze) und Spalten (Attribute).",
        "Primärschlüssel identifiziert eindeutig, Fremdschlüssel verweist auf einen Primärschlüssel.",
        "Beziehungen 1:1, 1:n, n:m (n:m braucht eine Zwischentabelle).",
        "SELECT Spalten FROM Tabelle WHERE Bedingung ORDER BY Spalte.",
        "NULL prüft man mit IS NULL, nicht mit = NULL.",
      ],
      content: `## Relationale Datenbanken
Daten liegen in **Tabellen**. Jede Zeile ist ein Datensatz, jede Spalte ein Attribut.

- **Primärschlüssel (PK)**: eindeutig, nicht NULL (z. B. \`kunde.id\`).
- **Fremdschlüssel (FK)**: verweist auf den PK einer anderen Tabelle (z. B. \`bestellung.kunde_id\`) → **referenzielle Integrität**.

## Beziehungen
- **1:1** – z. B. Mitarbeiter ↔ Dienstwagen
- **1:n** – ein Kunde hat viele Bestellungen (FK auf der n-Seite)
- **n:m** – Artikel ↔ Bestellungen → **Zwischentabelle** (z. B. \`position\`)

## Erste SQL-Abfragen
\`\`\`sql
SELECT name, ort
FROM kunde
WHERE ort = 'Hagen'
ORDER BY name;
\`\`\`
- \`WHERE\` filtert Zeilen: \`=, <>, <, >, BETWEEN, IN, LIKE 'M%'\`
- \`ORDER BY … ASC/DESC\` sortiert
- \`IS NULL\` / \`IS NOT NULL\` für fehlende Werte
- \`COUNT(*)\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\` aggregieren

## DBMS
MySQL/MariaDB, PostgreSQL, Microsoft SQL Server, SQLite, Oracle. Vorteile gegenüber Dateien: Mehrbenutzerbetrieb, Konsistenz, Transaktionen, Rechte.`,
    },
    questions: [
      q.single("Was ist ein Fremdschlüssel?", ["Ein Schlüssel, der jede Zeile der eigenen Tabelle eindeutig macht", "Ein Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist", "Ein verschlüsseltes Passwort", "Ein Index für schnellere Suche"], 1, "Der Fremdschlüssel stellt die Beziehung zu einer anderen Tabelle her.", { placement: true, difficulty: 1 }),
      q.single("Wie wird eine n:m-Beziehung im relationalen Modell umgesetzt?", ["Mit einem Fremdschlüssel in einer der Tabellen", "Mit einer Zwischentabelle mit zwei Fremdschlüsseln", "Gar nicht", "Mit einer zusätzlichen Spalte vom Typ Liste"], 1, "n:m wird über eine Zwischentabelle aufgelöst."),
      q.sql("Gib Name und Ort aller Kunden aus Hagen aus.", "shop", "SELECT name, ort FROM kunde WHERE ort = 'Hagen'", "Filtern mit WHERE auf die Spalte ort.", { placement: true, difficulty: 2 }),
      q.sql("Liste Bezeichnung und Preis aller Artikel, absteigend nach Preis sortiert.", "shop", "SELECT bezeichnung, preis FROM artikel ORDER BY preis DESC", "ORDER BY preis DESC sortiert absteigend."),
      q.sql("Welche Kunden haben keine E-Mail-Adresse hinterlegt? Gib den Namen aus.", "shop", "SELECT name FROM kunde WHERE email IS NULL", "NULL wird mit IS NULL geprüft – email = NULL liefert nie ein Ergebnis."),
      q.single("Welche WHERE-Bedingung findet alle Namen, die mit „M“ beginnen?", ["name = 'M*'", "name LIKE 'M%'", "name LIKE '%M'", "name IN ('M')"], 1, "% steht bei LIKE für beliebig viele Zeichen."),
    ],
    cards: [
      card("Primärschlüssel", "Identifiziert jeden Datensatz eindeutig, darf nicht NULL sein.", true),
      card("Fremdschlüssel", "Verweist auf den Primärschlüssel einer anderen Tabelle (referenzielle Integrität).", true),
      card("n:m-Beziehung", "Auflösen über Zwischentabelle mit zwei Fremdschlüsseln.", true),
      card("NULL abfragen", "IS NULL / IS NOT NULL – nie = NULL."),
      card("LIKE-Platzhalter", "% = beliebig viele Zeichen, _ = genau ein Zeichen."),
    ],
  },
];
