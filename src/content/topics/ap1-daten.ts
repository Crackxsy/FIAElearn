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
  {
    id: "ap1-kuenstliche-intelligenz",
    part: "AP1",
    lf: "LF02",
    title: "Künstliche Intelligenz: Grundlagen, Einsatz & Recht",
    summary: "KI, Machine Learning, Lernarten, LLMs, Halluzinationen und Bias, KI am Arbeitsplatz, Datenschutz, Urheberrecht, EU-KI-Verordnung.",
    weight: 3,
    hours: 3,
    difficulty: 2,
    lesson: {
      sources: ["O02", "L09", "L16"],
      keyPoints: [
        "Deep Learning ist ein Teilgebiet von Machine Learning, ML ein Teilgebiet der KI; alle heutigen Systeme sind schwache KI.",
        "Überwacht: gelabelte Daten; unüberwacht: Muster ohne Labels finden; bestärkend: Lernen durch Belohnung.",
        "Trainings-, Validierungs- und Testdaten trennen; Overfitting = gut auf Trainingsdaten, schlecht auf neuen Daten.",
        "LLMs zerlegen Text in Token und erzeugen Token für Token anhand von Wahrscheinlichkeiten – Halluzinationen sind möglich, Ergebnisse immer prüfen.",
        "Keine personenbezogenen oder vertraulichen Daten in nicht freigegebene externe KI-Dienste (DSGVO, AV-Vertrag).",
        "KI-Verordnung: unannehmbar (verboten), hoch, begrenzt (Transparenzpflicht), minimal; Pflicht zur Förderung der KI-Kompetenz (Art. 4).",
      ],
      content: `## Begriffe
- **Künstliche Intelligenz (KI)**: Oberbegriff für Systeme, die Aufgaben lösen, für die bisher menschliche Intelligenz nötig war – z. B. Sprache verstehen, Bilder erkennen, Entscheidungen vorbereiten.
- **Schwache KI**: auf eine bestimmte Aufgabe spezialisiert (Übersetzung, Bilderkennung, Chatbot). Alle heute eingesetzten Systeme – auch große Sprachmodelle – zählen dazu.
- **Starke KI** (allgemeine KI): hätte eine dem Menschen vergleichbare, allgemeine Intelligenz für beliebige Aufgaben – existiert bisher nicht.
- **Machine Learning (ML)**: Teilgebiet der KI. Das System lernt Muster aus **Daten**, statt dass jede Regel ausprogrammiert wird.
- **Neuronales Netz**: Modell aus künstlichen Neuronen in Schichten (Eingabe-, verdeckte und Ausgabeschicht). Die Verbindungen haben **Gewichte**, die beim Training so angepasst werden, dass der Fehler kleiner wird.
- **Deep Learning (DL)**: Machine Learning mit neuronalen Netzen aus **vielen** verdeckten Schichten – Grundlage für Bild-, Sprach- und Textmodelle.

Merke: **Deep Learning ⊂ Machine Learning ⊂ KI**. Nicht jede KI lernt aus Daten – regelbasierte Expertensysteme arbeiten mit fest hinterlegten Regeln.

## Lernarten
| Lernart | Daten | Ziel | Beispiel |
|---|---|---|---|
| Überwacht (supervised) | gelabelt: Eingabe **mit** richtiger Lösung | Klassifikation (Kategorie), Regression (Zahlenwert) | Spamfilter aus als „Spam“ markierten Mails, Preisprognose für Gebrauchtwagen |
| Unüberwacht (unsupervised) | **ohne** Labels | Strukturen und Gruppen finden | Kundensegmentierung (Clustering), ungewöhnliche Datensätze erkennen |
| Bestärkend (reinforcement) | keine fertigen Beispiele – ein Agent probiert Aktionen aus | Strategie mit möglichst hoher Belohnung | Spiel-KI, Roboter lernt Greifen |

## Trainings-, Validierungs- und Testdaten
Die vorhandenen Daten werden aufgeteilt, z. B. 70 % / 15 % / 15 %:
- **Trainingsdaten**: Daraus lernt das Modell (Gewichte anpassen).
- **Validierungsdaten**: Modellvarianten und Einstellungen (Hyperparameter) vergleichen, Overfitting früh erkennen.
- **Testdaten**: ganz am Ende die Qualität auf **ungesehenen** Daten messen. Sie dürfen nie ins Training einfließen.

**Overfitting** (Überanpassung): Das Modell lernt die Trainingsdaten samt Zufälligkeiten „auswendig“ – sehr gut auf den Trainingsdaten, schlecht auf neuen Daten. Erkennbar an niedrigem Trainingsfehler und hohem Validierungs- bzw. Testfehler. Gegenmittel: mehr und vielfältigere Daten, einfacheres Modell, Training früher beenden (Early Stopping).

**Underfitting**: Das Modell ist zu einfach und schon auf den Trainingsdaten schlecht.

## Generative KI und Large Language Models
**Generative KI** erzeugt neue Inhalte – Text, Bilder, Audio, Code – aus gelernten Mustern. **Large Language Models (LLMs)** sind sehr große neuronale Netze, die mit riesigen Textmengen trainiert wurden.

Funktionsprinzip (vereinfacht):
1. Der Eingabetext (Prompt) wird in **Token** zerlegt – Wörter, Wortteile oder Satzzeichen.
2. Das Modell berechnet für die möglichen nächsten Token **Wahrscheinlichkeiten**.
3. Ein Token wird ausgewählt und angehängt – dann wiederholt sich der Schritt, bis die Antwort fertig ist.

- Ein LLM schlägt keine geprüften Fakten nach: Es erzeugt **wahrscheinliche** Texte, nicht automatisch **wahre**.
- **Kontextfenster**: wie viele Token das Modell auf einmal berücksichtigen kann.
- **Wissensstand**: Ohne Websuche oder angebundene Dokumente kennt das Modell nur seine Trainingsdaten bis zu einem Stichtag.

## Risiken
- **Halluzinationen**: überzeugend formulierte, aber falsche oder erfundene Aussagen – z. B. nicht existierende Quellen, Paragrafen oder Programmbibliotheken.
- **Bias** (Verzerrung): Sind die Trainingsdaten einseitig, übernimmt das Modell die Verzerrung. Beispiel: Ein mit alten Einstellungsdaten trainiertes Modell benachteiligt eine Bewerbergruppe, die früher selten eingestellt wurde.
- **Fehlende Nachvollziehbarkeit**: Neuronale Netze sind oft eine „Blackbox“ – warum ein Ergebnis entsteht, ist schwer erklärbar.
- **Sicherheit**: Prompt-Injection (versteckte Anweisungen in Dokumenten oder Webseiten), Abfluss vertraulicher Eingaben.

## Prompting-Grundlagen
- **Rolle und Kontext**: „Du unterstützt den IT-Support eines kleinen Handwerksbetriebs …“
- **Klare Aufgabe**: was genau, für wen, in welchem Umfang.
- **Format**: Tabelle, Stichpunkte, höchstens fünf Sätze, Programmiersprache.
- **Beispiele** (Few-Shot) und **Einschränkungen** („nur Standardbibliothek“, „ohne Fachbegriffe“).
- **Iterieren**: Ergebnis prüfen, nachschärfen, Rückfragen stellen.

## Einsatz am IT-Arbeitsplatz
- **Assistenten**: Texte entwerfen, zusammenfassen, übersetzen, Anleitungen schreiben, Tickets vorsortieren.
- **Code-Generierung**: Funktionen, Testfälle, SQL-Abfragen, Erklärungen zu fremdem Code, Hilfe bei der Fehlersuche.
- Betriebliche **KI-Richtlinie** beachten: Welche Werkzeuge sind freigegeben – und wofür?

### Prüfpflicht
KI-Ergebnisse sind **Entwürfe** – die Verantwortung bleibt beim Menschen:
- Code lesen und verstehen, mit Testfällen (auch Grenzfällen) prüfen.
- Sicherheit prüfen, z. B. SQL-Injection, fest eingetragene Passwörter.
- Erfundene Funktionen oder Pakete erkennen, Abhängigkeiten und Lizenzen prüfen.
- Fakten, Zahlen und Quellen gegenprüfen.

## Datenschutz und Vertraulichkeit
- Eingaben in einen **externen** KI-Dienst verlassen das Unternehmen und werden beim Anbieter verarbeitet. Enthalten sie **personenbezogene Daten**, gilt die **DSGVO**: Rechtsgrundlage (Art. 6), Datenminimierung (Art. 5) und bei Verarbeitung im Auftrag ein **AV-Vertrag (AVV)** nach Art. 28.
- Prüfen: Wo werden die Daten verarbeitet (Drittland, Art. 44 ff.)? Werden Eingaben gespeichert oder zum Training genutzt?
- **Grundregel**: keine personenbezogenen Daten, Zugangsdaten, Kundendaten oder Geschäftsgeheimnisse in nicht freigegebene, öffentliche KI-Dienste. Stattdessen den Personenbezug entfernen (Platzhalter statt Namen) oder ein vom Unternehmen geprüftes Werkzeug mit AVV nutzen.
- **Art. 22 DSGVO**: Entscheidungen mit rechtlicher Wirkung dürfen grundsätzlich nicht ausschließlich automatisiert fallen – z. B. eine Bewerberabsage allein durch KI.

## Urheberrecht und Lizenzen
- Geschützt sind nur **persönliche geistige Schöpfungen** (§ 2 Abs. 2 UrhG), also Werke von Menschen. Rein KI-generierte Ergebnisse sind daher nach überwiegender Auffassung nicht urheberrechtlich geschützt.
- Der Output kann trotzdem **fremde Rechte verletzen**, wenn er geschützte Texte, Bilder oder Code (nahezu) wiedergibt.
- **Code**: Stammen generierte Passagen aus Open-Source-Projekten, können deren Lizenzbedingungen gelten (z. B. Copyleft der GPL).
- **Nutzungsbedingungen** des KI-Dienstes beachten, z. B. zur kommerziellen Nutzung der Ergebnisse.

## EU-KI-Verordnung (AI Act)
Die **Verordnung (EU) 2024/1689** regelt KI **risikobasiert**: Je höher das Risiko für Gesundheit, Sicherheit und Grundrechte, desto strenger die Pflichten. Sie gilt unmittelbar in allen EU-Staaten – auch für Anbieter außerhalb der EU, deren KI-Systeme in der EU in Verkehr gebracht oder genutzt werden. Die DSGVO gilt daneben weiter.

| Risikoklasse | Beispiele | Folge |
|---|---|---|
| Unannehmbar | Social Scoring, manipulative Techniken, die Schwächen ausnutzen, Emotionserkennung am Arbeitsplatz und in Bildungseinrichtungen | **verboten** (Art. 5) |
| Hoch | Bewerberauswahl, Bewertung von Prüfungsleistungen, Kreditwürdigkeitsprüfung, Sicherheitskomponenten kritischer Infrastruktur | strenge Anforderungen: Risikomanagement, Datenqualität, Dokumentation, menschliche Aufsicht (für Anhang III ab 2. Dezember 2027) |
| Begrenzt | Chatbots, Deepfakes, KI-generierte Inhalte | **Transparenzpflicht** (Art. 50): offenlegen, dass KI im Spiel ist |
| Minimal | Spamfilter, KI in Videospielen | keine besonderen Anforderungen |

- **Anbieter**: entwickelt ein KI-System und bringt es in Verkehr.
- **Betreiber**: setzt ein KI-System in eigener Verantwortung beruflich ein – z. B. ein Unternehmen, das einen KI-Assistenten für seine Mitarbeitenden einführt.
- **KI-Kompetenz (Art. 4)**: Anbieter und Betreiber müssen Maßnahmen ergreifen, um die KI-Kompetenz ihres Personals, das mit KI-Systemen arbeitet, zu **fördern** – z. B. Schulungen zu Funktionsweise, Grenzen, Risiken und internen Regeln. Ein bestimmtes Kompetenzniveau jeder einzelnen Person müssen sie nicht garantieren. Das gilt unabhängig von der Risikoklasse. (Fassung nach der Änderung durch die Verordnung (EU) 2026/1744; ursprünglich mussten Anbieter und Betreiber für ein „ausreichendes Maß“ an KI-Kompetenz sorgen.)
- **Bußgelder**: bei verbotenen Praktiken bis zu 35 Mio. € oder 7 % des weltweiten Jahresumsatzes.

### Fristen
- **1. August 2024**: Inkrafttreten der Verordnung.
- **2. Februar 2025**: Verbote (Art. 5) und KI-Kompetenz (Art. 4) gelten.
- **2. August 2025**: Pflichten für KI-Modelle mit allgemeinem Verwendungszweck (z. B. große Sprachmodelle).
- **2. August 2026**: allgemeine Anwendung, u. a. Transparenzpflichten (Art. 50).
- **2. Dezember 2026**: neue Verbote (u. a. KI-erzeugte intime Darstellungen realer Personen ohne Einwilligung); Kennzeichnungspflicht für generative KI-Systeme, die schon vor dem 2. August 2026 auf dem Markt waren.
- **2. Dezember 2027**: Anforderungen an Hochrisiko-KI nach Anhang III (z. B. Bewerberauswahl).
- **2. August 2028**: Anforderungen an Hochrisiko-KI in Produkten nach Anhang I.

> Hinweis: Die KI-Verordnung wurde durch die Verordnung (EU) 2026/1744 („Digital Omnibus“, in Kraft seit 27. Juli 2026) geändert – u. a. Art. 4 und die Hochrisiko-Fristen. Im Zweifel die aktuelle konsolidierte Fassung auf EUR-Lex prüfen.`,
    },
    questions: [
      q.single("Wie hängen Künstliche Intelligenz (KI), Machine Learning (ML) und Deep Learning (DL) zusammen?", ["ML ist ein Teilgebiet von DL, DL ein Teilgebiet der KI", "DL ist ein Teilgebiet von ML, ML ein Teilgebiet der KI", "KI, ML und DL bezeichnen dasselbe", "KI ist ein Teilgebiet von ML"], 1, "Deep Learning ⊂ Machine Learning ⊂ KI. DL nutzt neuronale Netze mit vielen Schichten und ist eine Form des ML. Es gibt auch KI ohne ML, z. B. regelbasierte Expertensysteme.", { placement: true, difficulty: 1 }),
      q.single("Ein Onlineshop lässt ein Modell seine Kundschaft anhand des Kaufverhaltens in Gruppen einteilen. Welche Gruppen es gibt, wurde vorher nicht festgelegt, und die Daten enthalten keine Gruppenzuordnung. Welche Lernart liegt vor?", ["Überwachtes Lernen", "Unüberwachtes Lernen", "Bestärkendes Lernen", "Regelbasiertes Expertensystem"], 1, "Ohne Labels Strukturen finden (Clustering) = unüberwachtes Lernen. Überwacht bräuchte Daten mit vorgegebener richtiger Lösung, bestärkend eine Belohnung für Aktionen."),
      q.multi("Welche Aufgaben sind typische Beispiele für überwachtes Lernen?", ["Spam-Erkennung, trainiert mit E-Mails, die als „Spam“ oder „kein Spam“ markiert sind", "Preisprognose für Gebrauchtwagen anhand früherer Verkäufe mit bekanntem Preis", "Kundensegmentierung ohne vorgegebene Gruppen", "Eine Spiel-KI lernt durch Punkte für gewonnene Partien"], [0, 1], "Überwacht = Trainingsdaten mit bekannter richtiger Lösung (Label): Klassifikation (Spam) und Regression (Preis). Segmentierung ohne Gruppen ist unüberwacht, Lernen durch Belohnung ist bestärkend."),
      q.single("Ein Modell erkennt defekte Bauteile auf den Trainingsbildern zu 99 % richtig, auf neuen, bisher ungesehenen Bildern nur zu 62 %. Was liegt am wahrscheinlichsten vor?", ["Underfitting", "Overfitting", "Zu viele Testdaten", "Eine Halluzination"], 1, "Sehr gut auf Trainingsdaten, deutlich schlechter auf neuen Daten = Overfitting: Das Modell hat die Beispiele auswendig gelernt, statt zu verallgemeinern. Gegenmittel: mehr und vielfältigere Daten, einfacheres Modell, Early Stopping."),
      q.single("Wozu dienen die Testdaten beim Machine Learning?", ["Aus ihnen lernt das Modell seine Gewichte", "Mit ihnen werden während der Entwicklung Einstellungen (Hyperparameter) optimiert", "Mit ihnen wird am Ende die Qualität auf ungesehenen Daten gemessen", "Sie ersetzen die Trainingsdaten, wenn diese zu wenige sind"], 2, "Trainingsdaten → Lernen, Validierungsdaten → Varianten und Hyperparameter vergleichen, Testdaten → abschließende, unabhängige Bewertung. Fließen Testdaten ins Training ein, fällt das Ergebnis zu optimistisch aus."),
      q.single("Wie erzeugt ein Large Language Model (LLM) vereinfacht eine Antwort?", ["Es sucht die passende Antwort in einer Datenbank mit geprüften Fakten", "Es berechnet Schritt für Schritt Wahrscheinlichkeiten für das nächste Token und hängt ein ausgewähltes Token an", "Es kopiert die ähnlichste Webseite aus dem Internet", "Es arbeitet für jede Frage ein fest programmiertes Regelwerk ab"], 1, "Der Text wird in Token zerlegt; das Modell berechnet Wahrscheinlichkeiten für das nächste Token und erzeugt die Antwort Token für Token. Deshalb klingen Antworten plausibel, sind aber nicht automatisch richtig.", { placement: true }),
      q.short("Ein KI-Assistent nennt dir sprachlich völlig überzeugend einen Gesetzesparagrafen und eine Programmbibliothek, die es beide nicht gibt. Wie nennt man dieses Phänomen?", ["Halluzination", "Halluzinationen", "Halluzinieren", "halluziniert"], "Halluzination: plausibel klingende, aber falsche oder erfundene Ausgaben. Gegenmittel: Quellen und Fakten prüfen, Code testen.", { difficulty: 1 }),
      q.single("Ein Kollege will eine Kundenbeschwerde mit Name, Anschrift und Vertragsnummer in einen kostenlosen, vom Betrieb nicht freigegebenen KI-Chatbot kopieren, um eine Antwort formulieren zu lassen. Wie reagierst du richtig?", ["Unproblematisch, weil der Chatbot die Daten nur kurz verarbeitet", "Erlaubt, wenn er den Chatverlauf anschließend löscht", "Keine personenbezogenen Daten eingeben: Personenbezug entfernen (Platzhalter) oder ein freigegebenes Werkzeug mit AV-Vertrag nutzen", "Erlaubt, weil die Kundin sich selbst beschwert hat"], 2, "Name, Anschrift und Vertragsnummer sind personenbezogene Daten. Beim nicht freigegebenen Dienst fehlen Rechtsgrundlage, AV-Vertrag (Art. 28 DSGVO) und Kontrolle darüber, ob Eingaben gespeichert oder zum Training genutzt werden. Datenminimierung: Für den Antwortentwurf reicht der Sachverhalt ohne Personenbezug.", { sources: ["L09"] }),
      q.single("Ein Unternehmen setzt ein KI-System ein, das eingehende Bewerbungen automatisch analysiert und vorsortiert. In welche Risikoklasse der EU-KI-Verordnung fällt das?", ["Unannehmbares Risiko – verboten", "Hohes Risiko", "Begrenztes Risiko – nur Transparenzpflicht", "Minimales Risiko"], 1, "KI zur Einstellung und Auswahl von Personen (Bereich Beschäftigung, Anhang III) ist Hochrisiko-KI: Es gelten strenge Anforderungen, u. a. menschliche Aufsicht, Dokumentation und Datenqualität – für Anhang-III-Systeme nach der Änderung durch die VO (EU) 2026/1744 ab 2. Dezember 2027. Zusätzlich verbietet Art. 22 DSGVO grundsätzlich rein automatisierte Absagen.", { sources: ["L16"] }),
      q.multi("Welche Aussagen zur EU-KI-Verordnung (AI Act) sind richtig?", ["Social Scoring von Personen ist als unannehmbares Risiko verboten", "Bei einem Chatbot muss erkennbar sein, dass man mit einer KI kommuniziert", "Die Verordnung gilt nur für Anbieter mit Sitz in der EU", "Die Verordnung ersetzt die DSGVO", "Die Verordnung ist am 1. August 2024 in Kraft getreten"], [0, 1, 4], "Social Scoring ist verboten (Art. 5), Chatbots unterliegen der Transparenzpflicht (Art. 50). Die Verordnung gilt auch für Anbieter außerhalb der EU, wenn ihre KI-Systeme in der EU in Verkehr gebracht oder genutzt werden, und sie gilt neben der DSGVO – sie ersetzt sie nicht.", { difficulty: 3, sources: ["L16"] }),
      q.single("Ein Betrieb führt für alle Mitarbeitenden einen KI-Assistenten ein und ist damit Betreiber im Sinne der KI-Verordnung. Welche Pflicht ergibt sich für ihn aus Art. 4?", ["Jede KI-Antwort muss bei einer Behörde registriert werden", "Der Betrieb muss Maßnahmen ergreifen, um die KI-Kompetenz seines Personals zu fördern, z. B. durch Schulungen", "Alle Mitarbeitenden brauchen eine KI-Prüfung der IHK", "Der Assistent darf erst nach einer Hochrisiko-Zertifizierung genutzt werden"], 1, "Art. 4 verpflichtet Anbieter und Betreiber, Maßnahmen zur Förderung der KI-Kompetenz ihres Personals zu ergreifen – z. B. Schulungen zu Funktionsweise, Grenzen, Risiken und internen Nutzungsregeln. Ein bestimmtes Kompetenzniveau jeder Person muss nicht garantiert werden (Fassung nach VO (EU) 2026/1744). Die Pflicht gilt unabhängig von der Risikoklasse.", { sources: ["L16"] }),
      q.open("Du lässt dir von einem KI-Assistenten eine Funktion erzeugen, die Kundendatensätze aus einer Datenbank filtert. Nenne zwei Dinge, die du beim Formulieren des Prompts beachtest, und drei Prüfschritte, bevor du den Code übernimmst.", "Prompt: 1) keine echten Kundendaten, Zugangsdaten oder vertraulichen Interna eingeben – nur Tabellenstruktur oder erfundene Beispieldaten; 2) klare Aufgabe mit Kontext: Programmiersprache, Tabellen- und Spaltennamen, gewünschtes Ergebnis, Randbedingungen (z. B. parametrisierte Abfragen); 3) gewünschtes Ausgabeformat. Prüfung: 1) Code lesen und verstehen – die Verantwortung bleibt bei dir; 2) mit Testfällen inkl. Grenzfällen testen (leeres Ergebnis, NULL-Werte); 3) Sicherheit prüfen, z. B. SQL-Injection durch zusammengesetzte Strings, fest eingetragene Passwörter; 4) erfundene Funktionen oder Bibliotheken und mögliche Lizenzpflichten prüfen; 5) Code-Review und betriebliche KI-Richtlinie beachten.", "Bewerte dich selbst: Hast du Datenschutz beim Prompt und mindestens drei konkrete Prüfschritte (Verstehen, Testen, Sicherheit) genannt?", { difficulty: 3 }),
    ],
    cards: [
      card("KI – ML – DL", "Deep Learning ⊂ Machine Learning ⊂ KI. ML lernt Muster aus Daten statt fester Regeln; DL nutzt neuronale Netze mit vielen Schichten.", true),
      card("Schwache vs. starke KI", "Schwach: auf eine Aufgabe spezialisiert – alle heutigen Systeme, auch LLMs. Stark: allgemeine, menschenähnliche Intelligenz – existiert bisher nicht."),
      card("Lernarten", "Überwacht: gelabelte Daten (Spamfilter, Preisprognose). Unüberwacht: Muster ohne Labels (Clustering). Bestärkend: Belohnung für Aktionen (Spiel-KI).", true),
      card("Trainings-, Validierungs-, Testdaten", "Training: Modell lernt. Validierung: Varianten und Hyperparameter vergleichen. Test: abschließende Bewertung auf ungesehenen Daten."),
      card("Overfitting", "Modell lernt Trainingsdaten auswendig: sehr gut im Training, schlecht bei neuen Daten. Gegenmittel: mehr Daten, einfacheres Modell, Early Stopping.", true),
      card("LLM-Funktionsprinzip", "Text wird in Token zerlegt; das Modell berechnet Wahrscheinlichkeiten für das nächste Token und erzeugt die Antwort Token für Token.", true),
      card("Halluzination", "Überzeugend formulierte, aber falsche oder erfundene Ausgabe (Quellen, Paragrafen, Bibliotheken) – Ergebnisse immer prüfen.", true),
      card("Bias", "Systematische Verzerrung durch einseitige Trainingsdaten, z. B. Benachteiligung einer Bewerbergruppe."),
      card("KI und Datenschutz", "Keine personenbezogenen oder vertraulichen Daten in nicht freigegebene externe KI-Dienste. Bei Verarbeitung im Auftrag: AV-Vertrag nach Art. 28 DSGVO.", true),
      card("Urheberrecht bei KI-Output", "Rein KI-generierte Ergebnisse sind mangels menschlicher Schöpfung meist nicht geschützt; der Output kann aber fremde Rechte oder Lizenzen (z. B. GPL-Code) verletzen."),
      card("KI-Verordnung – Risikoklassen", "Unannehmbar → verboten (Social Scoring). Hoch → strenge Pflichten (Bewerberauswahl). Begrenzt → Transparenzpflicht (Chatbot). Minimal → keine besonderen Pflichten (Spamfilter).", true),
      card("KI-Kompetenz (Art. 4 KI-VO)", "Anbieter und Betreiber ergreifen Maßnahmen zur Förderung der KI-Kompetenz ihres Personals, z. B. Schulungen. Ein bestimmtes Niveau muss nicht garantiert werden (Fassung nach VO (EU) 2026/1744)."),
    ],
  },
];
