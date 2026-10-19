import { card, q, type TopicSeed } from "../types";

export const AP2_SOFTWARE: TopicSeed[] = [
  {
    id: "sw-anforderungen",
    part: "AP2_SOFTWARE",
    lf: "LF12a",
    title: "Anforderungen, User Stories & Qualität",
    summary: "Funktionale/nichtfunktionale Anforderungen, User Stories, Akzeptanzkriterien, ISO/IEC 25010.",
    weight: 5,
    hours: 3,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["O04"],
      keyPoints: [
        "User Story: Als <Rolle> möchte ich <Ziel>, damit <Nutzen>.",
        "Akzeptanzkriterien machen eine Story testbar (z. B. Given–When–Then).",
        "INVEST: independent, negotiable, valuable, estimable, small, testable.",
        "ISO/IEC 25010: u. a. Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Wartbarkeit, Sicherheit, Portabilität.",
        "Anforderungen müssen eindeutig, prüfbar und vollständig sein.",
      ],
      content: `## Anforderungsarten
- **Funktional**: Was tut das System? (*Die Anwendung berechnet den Rechnungsbetrag inkl. USt.*)
- **Nichtfunktional / Qualitätsanforderung**: Wie gut? (*Antwortzeit < 1 s bei 100 gleichzeitigen Nutzern.*)
- **Randbedingungen**: Vorgaben wie Programmiersprache, Budget, Gesetze.

## User Stories
\`Als Lagerist möchte ich Wareneingänge per Barcode erfassen, damit ich schneller arbeite.\`

**Akzeptanzkriterien** (Given–When–Then):
- *Gegeben* ein gültiger Barcode, *wenn* ich scanne, *dann* wird der Bestand um 1 erhöht.
- *Gegeben* ein unbekannter Barcode, *wenn* ich scanne, *dann* erscheint eine Fehlermeldung.

**INVEST**-Kriterien für gute Stories: unabhängig, verhandelbar, wertvoll, schätzbar, klein, testbar.

## Qualitätsmodell ISO/IEC 25010
Funktionale Eignung · Leistungseffizienz · Kompatibilität · Benutzbarkeit (Usability) · Zuverlässigkeit · Sicherheit · Wartbarkeit · Übertragbarkeit (Portabilität)

## Gute Anforderungen
Eindeutig, vollständig, konsistent, prüfbar (messbar), umsetzbar, priorisiert (z. B. **MoSCoW**: Must, Should, Could, Won't).`,
    },
    questions: [
      q.single("Welche User Story ist korrekt formuliert?", ["Das System braucht eine Datenbank.", "Als Kunde möchte ich meine Bestellungen einsehen, damit ich den Lieferstatus kenne.", "Login-Seite bauen.", "Die Anwendung ist schnell."], 1, "Schema: Als <Rolle> möchte ich <Ziel>, damit <Nutzen>.", { placement: true, difficulty: 1 }),
      q.single("Wozu dienen Akzeptanzkriterien?", ["Sie legen den Preis fest.", "Sie machen eine Anforderung überprüfbar und definieren, wann sie erfüllt ist.", "Sie beschreiben die Datenbankstruktur.", "Sie ersetzen das Testen."], 1, "Akzeptanzkriterien definieren testbar, wann eine Story fertig ist."),
      q.multi("Welche Merkmale gehören zum Qualitätsmodell ISO/IEC 25010?", ["Wartbarkeit", "Benutzbarkeit", "Zuverlässigkeit", "Rentabilität", "Sicherheit"], [0, 1, 2, 4], "Rentabilität ist ein betriebswirtschaftliches Kriterium, kein Produktqualitätsmerkmal der Norm."),
      q.single("„Die Suche soll schnell sein.“ Was ist das Problem dieser Anforderung?", ["Sie ist funktional.", "Sie ist nicht messbar/prüfbar.", "Sie ist zu technisch.", "Nichts"], 1, "Besser: „Die Suche liefert Ergebnisse in unter 500 ms bei 10.000 Datensätzen.“", { placement: true }),
      q.short("Wofür steht das M in der MoSCoW-Priorisierung?", ["Must", "Must have"], "Must have – Should have – Could have – Won't have."),
      q.open("Formuliere eine User Story mit zwei Akzeptanzkriterien für das Zurücksetzen eines Passworts.", "Als registrierter Nutzer möchte ich mein Passwort per E-Mail-Link zurücksetzen, damit ich mich wieder anmelden kann. AK1: Gegeben eine registrierte E-Mail, wenn ich „Passwort vergessen“ absende, dann erhalte ich einen Link, der 30 Minuten gültig ist. AK2: Gegeben ein abgelaufener Link, wenn ich ihn öffne, dann erscheint eine Fehlermeldung und ich kann einen neuen anfordern.", "", { difficulty: 3 }),
    ],
    cards: [
      card("User Story Schema", "Als <Rolle> möchte ich <Ziel>, damit <Nutzen>.", true),
      card("Given–When–Then", "Gegeben (Ausgangslage) – Wenn (Aktion) – Dann (erwartetes Ergebnis): Format für Akzeptanzkriterien.", true),
      card("INVEST", "Independent, Negotiable, Valuable, Estimable, Small, Testable"),
      card("MoSCoW", "Must, Should, Could, Won't have – Priorisierung von Anforderungen"),
      card("ISO/IEC 25010", "Produktqualität: Funktionalität, Effizienz, Kompatibilität, Usability, Zuverlässigkeit, Sicherheit, Wartbarkeit, Portabilität"),
    ],
  },
  {
    id: "sw-vorgehensmodelle",
    part: "AP2_SOFTWARE",
    lf: "LF12a",
    title: "Vorgehensmodelle: Wasserfall, V-Modell, Scrum, Kanban",
    summary: "Klassische und agile Vorgehensmodelle, Scrum-Rollen, -Artefakte und -Events.",
    weight: 4,
    hours: 3,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["O04", "O03"],
      keyPoints: [
        "Wasserfall: sequenzielle Phasen, gut bei stabilen Anforderungen.",
        "V-Modell: jeder Entwicklungsstufe steht eine Teststufe gegenüber.",
        "Scrum-Rollen: Product Owner, Scrum Master, Developers.",
        "Scrum-Events: Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.",
        "Kanban: Board, WIP-Limits, kontinuierlicher Fluss ohne feste Sprints.",
      ],
      content: `## Klassisch
- **Wasserfall**: Analyse → Entwurf → Implementierung → Test → Betrieb. Klar planbar, aber späte Fehlererkennung und unflexibel.
- **V-Modell**: Links Spezifikation (Anforderungen → Systementwurf → Komponentenentwurf), unten Implementierung, rechts die passenden Tests (Komponententest → Integrationstest → Systemtest → Abnahmetest).
- **Spiralmodell**: iterativ mit Risikoanalyse in jedem Zyklus.

## Agil (Agiles Manifest)
Individuen & Interaktionen, funktionierende Software, Zusammenarbeit mit Kunden, Reagieren auf Veränderung.

## Scrum
| Rollen | Artefakte | Events |
|---|---|---|
| Product Owner (Wert, Backlog) | Product Backlog | Sprint (1–4 Wochen) |
| Scrum Master (Prozess, Hindernisse) | Sprint Backlog | Sprint Planning |
| Developers (Umsetzung) | Increment | Daily Scrum (15 Min.) |
| | | Sprint Review, Retrospektive |

**Definition of Done**: gemeinsame Kriterien, wann ein Inkrement fertig ist.

## Kanban
Visualisierung auf einem Board (To Do – In Progress – Done), **WIP-Limits** begrenzen parallele Arbeit, Fokus auf Durchlaufzeit, keine festen Iterationen.

## Wann was?
Feste Anforderungen, regulatorisch → klassisch/V-Modell. Unklare, sich ändernde Anforderungen → agil.`,
    },
    questions: [
      q.single("Wer verantwortet in Scrum das Product Backlog?", ["Scrum Master", "Product Owner", "Developers", "Kunde"], 1, "Der Product Owner pflegt und priorisiert das Product Backlog.", { placement: true, difficulty: 1 }),
      q.single("Welche Teststufe steht im V-Modell der Anforderungsdefinition gegenüber?", ["Komponententest", "Integrationstest", "Systemtest", "Abnahmetest"], 3, "Anforderungsdefinition ↔ Abnahmetest (der Kunde prüft seine Anforderungen)."),
      q.multi("Welche sind Scrum-Events?", ["Daily Scrum", "Sprint Review", "Lastenheft-Abnahme", "Sprint Retrospective", "Kick-off-Meeting"], [0, 1, 3], "Scrum-Events: Sprint, Planning, Daily, Review, Retrospective."),
      q.single("Was begrenzt ein WIP-Limit in Kanban?", ["Die Sprintlänge", "Die Anzahl gleichzeitig bearbeiteter Aufgaben in einer Spalte", "Das Budget", "Die Teamgröße"], 1, "Work in Progress Limits verhindern Überlastung und Staus."),
      q.single("Ein Kunde kann seine Anforderungen nur grob beschreiben und will früh Zwischenergebnisse sehen. Welches Vorgehen passt am besten?", ["Wasserfall", "V-Modell", "Scrum", "Keines"], 2, "Agile Verfahren mit kurzen Iterationen und Feedback passen bei unklaren Anforderungen."),
      q.single("Was ist die Hauptaufgabe des Scrum Masters?", ["Aufgaben an Entwickler verteilen", "Das Team coachen und Hindernisse beseitigen", "Den Code reviewen", "Das Budget freigeben"], 1, "Der Scrum Master ist für das Verständnis und die Umsetzung von Scrum zuständig und entfernt Impediments."),
    ],
    cards: [
      card("Scrum-Rollen", "Product Owner, Scrum Master, Developers", true),
      card("Scrum-Artefakte", "Product Backlog, Sprint Backlog, Increment", true),
      card("V-Modell", "Jeder Entwicklungsphase steht eine Teststufe gegenüber (Anforderungen ↔ Abnahmetest).", true),
      card("Definition of Done", "Gemeinsame Kriterien, wann ein Backlog-Eintrag wirklich fertig ist."),
      card("Kanban", "Visualisierung, WIP-Limits, kontinuierlicher Fluss, Pull-Prinzip"),
    ],
  },
  {
    id: "sw-uml-klassen",
    part: "AP2_SOFTWARE",
    lf: "LF11a",
    title: "UML-Klassendiagramm",
    summary: "Klassen, Sichtbarkeiten, Assoziation, Aggregation, Komposition, Vererbung, Multiplizitäten.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O04", "O05"],
      keyPoints: [
        "Sichtbarkeit: + public, - private, # protected, ~ package.",
        "Aggregation (leere Raute): Teil kann ohne Ganzes existieren.",
        "Komposition (gefüllte Raute): Teil existiert nur mit dem Ganzen.",
        "Vererbung: Pfeil mit leerem Dreieck zur Oberklasse.",
        "Multiplizitäten: 1, 0..1, *, 1..*.",
      ],
      content: `## Aufbau einer Klasse
\`\`\`
┌─────────────────────────┐
│ Kunde                   │
├─────────────────────────┤
│ - id: int               │
│ - name: String          │
├─────────────────────────┤
│ + getName(): String     │
│ + bestellen(a: Artikel) │
└─────────────────────────┘
\`\`\`
**Sichtbarkeiten**: \`+\` public, \`-\` private, \`#\` protected, \`~\` package. Statische Elemente werden unterstrichen, abstrakte kursiv.

## Beziehungen
| Beziehung | Symbol | Bedeutung |
|---|---|---|
| Assoziation | Linie | kennt / nutzt |
| Gerichtete Assoziation | Linie mit Pfeil | nur eine Seite kennt die andere |
| Aggregation | leere Raute am Ganzen | „hat“, Teil kann allein existieren (Team – Mitarbeiter) |
| Komposition | gefüllte Raute am Ganzen | „besteht aus“, Teil stirbt mit (Rechnung – Rechnungsposition) |
| Vererbung | leeres Dreieck zur Oberklasse | „ist ein“ |
| Realisierung | gestrichelt mit leerem Dreieck | Klasse implementiert Interface |
| Abhängigkeit | gestrichelter Pfeil | benutzt kurzzeitig |

## Multiplizitäten
\`1\` genau eins · \`0..1\` höchstens eins · \`*\` bzw. \`0..*\` beliebig viele · \`1..*\` mindestens eins

Beispiel: Ein Kunde hat **0..*** Bestellungen, eine Bestellung gehört zu genau **1** Kunden.`,
    },
    questions: [
      q.single("Welches Zeichen steht im UML-Klassendiagramm für „private“?", ["+", "-", "#", "~"], 1, "- private, + public, # protected, ~ package.", { placement: true, difficulty: 1 }),
      q.single("Eine Rechnung besteht aus Rechnungspositionen, die ohne Rechnung nicht existieren. Welche Beziehung?", ["Assoziation", "Aggregation", "Komposition", "Vererbung"], 2, "Existenzabhängigkeit → Komposition (gefüllte Raute an der Rechnung).", { placement: true }),
      q.single("Was bedeutet die Multiplizität 1..* an einer Assoziation?", ["Genau eins", "Keins oder eins", "Mindestens eins", "Beliebig viele, auch keins"], 2, "1..* = mindestens eins."),
      q.single("Wie wird Vererbung dargestellt?", ["Linie mit gefüllter Raute", "Durchgezogene Linie mit leerem Dreieck zur Oberklasse", "Gestrichelter Pfeil", "Linie mit leerer Raute"], 1, "Generalisierung: leeres Dreieck zeigt auf die Oberklasse."),
      q.single("Ein Team hat Mitarbeiter; wird das Team aufgelöst, existieren die Mitarbeiter weiter. Welche Beziehung?", ["Komposition", "Aggregation", "Realisierung", "Abhängigkeit"], 1, "Teile können unabhängig existieren → Aggregation."),
      q.open("Modelliere textuell: Ein Kurs hat genau einen Dozenten und mindestens 5 Teilnehmer; ein Teilnehmer kann mehrere Kurse belegen. Gib die Multiplizitäten an.", "Kurs 0..* —— 1 Dozent (ein Dozent hält beliebig viele Kurse, ein Kurs hat genau einen Dozenten). Kurs 0..* —— 5..* Teilnehmer (ein Kurs hat mindestens 5 Teilnehmer, ein Teilnehmer belegt beliebig viele Kurse).", "", { difficulty: 3 }),
    ],
    cards: [
      card("UML-Sichtbarkeiten", "+ public, - private, # protected, ~ package", true),
      card("Aggregation vs. Komposition", "Aggregation (leere Raute): Teil lebt weiter. Komposition (gefüllte Raute): Teil stirbt mit dem Ganzen.", true),
      card("Vererbung in UML", "Durchgezogene Linie mit leerem Dreieck zur Oberklasse.", true),
      card("Interface-Realisierung", "Gestrichelte Linie mit leerem Dreieck zum Interface."),
      card("Multiplizitäten", "1, 0..1, 0..* (bzw. *), 1..*"),
    ],
  },
  {
    id: "sw-uml-verhalten",
    part: "AP2_SOFTWARE",
    lf: "LF11a",
    title: "UML-Verhaltensdiagramme",
    summary: "Use-Case-, Aktivitäts-, Sequenz- und Zustandsdiagramm lesen und erstellen.",
    weight: 4,
    hours: 4,
    difficulty: 3,
    lesson: {
      sources: ["O04", "O05"],
      keyPoints: [
        "Use-Case-Diagramm: Akteure, Anwendungsfälle, Systemgrenze, include/extend.",
        "«include»: wird immer mit ausgeführt; «extend»: optionale Erweiterung.",
        "Aktivitätsdiagramm: Start, Aktionen, Entscheidungen (Raute), Gabelung/Vereinigung (Balken).",
        "Sequenzdiagramm: Lebenslinien, synchrone/asynchrone Nachrichten, Antworten gestrichelt.",
        "Zustandsdiagramm: Zustände, Übergänge mit Ereignis [Bedingung] / Aktion.",
      ],
      content: `## Use-Case-Diagramm
Zeigt **wer** (Akteur) **was** (Anwendungsfall) mit dem System macht.
- Systemgrenze als Rechteck, Akteure als Strichmännchen außerhalb.
- **«include»**: Basisfall bindet immer einen anderen ein (*Bestellen* includes *Anmelden*). Pfeil zeigt zum eingebundenen Fall.
- **«extend»**: optionale Erweiterung unter Bedingung (*Gutschein einlösen* extends *Bezahlen*). Pfeil zeigt zum Basisfall.
- Generalisierung zwischen Akteuren möglich (Admin ist ein Nutzer).

## Aktivitätsdiagramm
Startknoten (gefüllter Kreis) → Aktionen (abgerundete Rechtecke) → **Verzweigung** (Raute mit [Guards]) → **Gabelung/Synchronisation** (dicker Balken für Parallelität) → Endknoten (Kreis mit Punkt). **Swimlanes** zeigen Verantwortliche.

## Sequenzdiagramm
Objekte oben mit **Lebenslinien** (gestrichelt nach unten). Nachrichten als Pfeile:
- synchron: gefüllte Pfeilspitze, Antwort gestrichelt zurück
- asynchron: offene Pfeilspitze
Kombinierte Fragmente: \`alt\` (Alternative), \`opt\` (optional), \`loop\` (Schleife).

## Zustandsdiagramm
Zustände (abgerundet) und Übergänge: \`Ereignis [Bedingung] / Aktion\`.
Beispiel Bestellung: *offen* → (bezahlt) → *bezahlt* → (versendet) → *versendet* → *zugestellt*.`,
    },
    questions: [
      q.single("Welche Beziehung im Use-Case-Diagramm beschreibt eine optionale Erweiterung?", ["«include»", "«extend»", "Generalisierung", "Assoziation"], 1, "«extend» = optional/bedingt; «include» = immer.", { placement: true }),
      q.single("Welches Diagramm zeigt den zeitlichen Ablauf von Nachrichten zwischen Objekten?", ["Klassendiagramm", "Sequenzdiagramm", "Use-Case-Diagramm", "Komponentendiagramm"], 1, "Das Sequenzdiagramm zeigt Interaktionen entlang der Zeitachse (Lebenslinien)."),
      q.single("Was stellt ein dicker schwarzer Balken im Aktivitätsdiagramm dar?", ["Entscheidung", "Ende", "Gabelung bzw. Synchronisation paralleler Abläufe", "Kommentar"], 2, "Fork/Join = Parallelisierung und Zusammenführung."),
      q.single("Welches Fragment im Sequenzdiagramm steht für Wiederholung?", ["alt", "opt", "loop", "par"], 2, "loop = Schleife, alt = Alternative, opt = optional, par = parallel."),
      q.single("Für welche Fragestellung eignet sich ein Zustandsdiagramm am besten?", ["Welche Klassen gibt es?", "Welche Zustände durchläuft eine Bestellung?", "Welche Akteure nutzen das System?", "Wie ist die Datenbank aufgebaut?"], 1, "Zustandsdiagramme modellieren den Lebenszyklus eines Objekts."),
      q.open("Beschreibe in Textform ein Aktivitätsdiagramm für „Geld am Automaten abheben“ mit mindestens einer Verzweigung.", "Start → Karte einstecken → PIN eingeben → [PIN falsch] Fehlermeldung, ggf. zurück zur Eingabe (nach 3 Fehlern Karte einziehen → Ende) / [PIN richtig] Betrag wählen → [Deckung nicht ausreichend] Hinweis → Ende / [ausreichend] Geld ausgeben und Karte ausgeben (parallel möglich) → Ende.", "", { difficulty: 3 }),
    ],
    cards: [
      card("«include» vs. «extend»", "include: wird immer ausgeführt (Pfeil zum eingebundenen Fall). extend: optional (Pfeil zum Basisfall).", true),
      card("Sequenzdiagramm", "Lebenslinien, synchrone Nachricht (gefüllte Spitze), Antwort gestrichelt, Fragmente alt/opt/loop.", true),
      card("Aktivitätsdiagramm-Elemente", "Start (●), Aktion, Entscheidung (◇ mit [Guards]), Fork/Join (Balken), Ende (◉), Swimlanes"),
      card("Zustandsübergang", "Ereignis [Bedingung] / Aktion"),
    ],
  },
  {
    id: "sw-er-normalisierung",
    part: "AP2_SOFTWARE",
    lf: "LF05",
    title: "ER-Modell & Normalisierung",
    summary: "Entitäten, Attribute, Kardinalitäten (Chen/MC), Überführung ins Relationenmodell, 1.–3. Normalform, Anomalien.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O04", "O05"],
      keyPoints: [
        "1. NF: alle Attribute atomar, keine Wiederholungsgruppen.",
        "2. NF: 1. NF + jedes Nichtschlüsselattribut voll funktional vom ganzen Primärschlüssel abhängig.",
        "3. NF: 2. NF + keine transitiven Abhängigkeiten zwischen Nichtschlüsselattributen.",
        "Redundanz führt zu Einfüge-, Änderungs- und Löschanomalien.",
        "1:n → Fremdschlüssel auf n-Seite; n:m → eigene Tabelle.",
      ],
      content: `## ER-Modell
- **Entität** (Rechteck): Objekt der realen Welt (Kunde)
- **Attribut** (Oval): Eigenschaft (Name); Schlüssel unterstrichen
- **Beziehung** (Raute): (Kunde *gibt auf* Bestellung)
- **Kardinalität**: 1:1, 1:n, n:m (Chen) oder (min,max)-Notation

## Überführung in Tabellen
- Jede Entität → Tabelle
- **1:n** → Fremdschlüssel in der Tabelle der n-Seite
- **n:m** → Zwischentabelle mit beiden Fremdschlüsseln (zusammen Primärschlüssel)
- **1:1** → Fremdschlüssel in einer der beiden Tabellen (UNIQUE)

## Anomalien (warum normalisieren?)
- **Einfügeanomalie**: Neue Abteilung kann ohne Mitarbeiter nicht gespeichert werden.
- **Änderungsanomalie**: Adresse an vielen Stellen ändern → Inkonsistenz.
- **Löschanomalie**: Letzten Mitarbeiter löschen → Abteilungsdaten weg.

## Normalformen
1. **1. NF**: Werte atomar (kein „Straße, PLZ, Ort“ in einem Feld; keine Listen).
2. **2. NF**: Bei zusammengesetztem Schlüssel hängt kein Attribut nur von einem **Teil** des Schlüssels ab.
3. **3. NF**: Kein Nichtschlüsselattribut hängt von einem anderen Nichtschlüsselattribut ab (**transitiv**: PLZ → Ort).

## Beispiel
\`bestellposition(bestell_nr, artikel_nr, menge, artikel_bezeichnung)\` → *artikel_bezeichnung* hängt nur von *artikel_nr* ab → verletzt 2. NF → Tabelle \`artikel(artikel_nr, bezeichnung)\` auslagern.`,
    },
    questions: [
      q.single("Eine Tabelle enthält die Spalte „Telefonnummern“ mit „0231-123, 0172-456“. Welche Normalform ist verletzt?", ["1. NF", "2. NF", "3. NF", "Keine"], 0, "Mehrere Werte in einem Feld → nicht atomar → 1. NF verletzt.", { placement: true }),
      q.single("Tabelle mitarbeiter(id, name, plz, ort). Welche Normalform ist verletzt?", ["1. NF", "2. NF", "3. NF", "Keine"], 2, "ort hängt transitiv über plz von id ab → 3. NF verletzt."),
      q.single("Tabelle position(bestell_nr, artikel_nr, menge, artikelpreis) mit PK (bestell_nr, artikel_nr). artikelpreis hängt nur von artikel_nr ab. Welche NF ist verletzt?", ["1. NF", "2. NF", "3. NF", "Keine"], 1, "Abhängigkeit von nur einem Teil des zusammengesetzten Schlüssels → 2. NF verletzt."),
      q.single("Wie wird eine 1:n-Beziehung zwischen Abteilung (1) und Mitarbeiter (n) umgesetzt?", ["Fremdschlüssel abteilung_id in mitarbeiter", "Fremdschlüssel mitarbeiter_id in abteilung", "Zwischentabelle", "Gar nicht"], 0, "Der Fremdschlüssel steht auf der n-Seite.", { placement: true }),
      q.single("Der letzte Kunde eines Ortes wird gelöscht, dadurch gehen die Ortsdaten verloren. Welche Anomalie?", ["Einfügeanomalie", "Änderungsanomalie", "Löschanomalie", "Keine"], 2, "Mit dem Löschen gehen ungewollt weitere Informationen verloren."),
      q.open("Normalisiere bis zur 3. NF: kurs(kurs_nr, titel, dozent_nr, dozent_name, teilnehmer_nr, teilnehmer_name).", "kurs(kurs_nr, titel, dozent_nr→dozent), dozent(dozent_nr, dozent_name), teilnehmer(teilnehmer_nr, teilnehmer_name), kurs_teilnehmer(kurs_nr→kurs, teilnehmer_nr→teilnehmer) mit PK (kurs_nr, teilnehmer_nr).", "", { difficulty: 4 }),
    ],
    cards: [
      card("1. Normalform", "Alle Attribute atomar, keine Wiederholungsgruppen.", true),
      card("2. Normalform", "1. NF + jedes Nichtschlüsselattribut hängt vom GANZEN Primärschlüssel ab.", true),
      card("3. Normalform", "2. NF + keine transitiven Abhängigkeiten (Nichtschlüssel → Nichtschlüssel).", true),
      card("Anomalien", "Einfüge-, Änderungs-, Löschanomalie – Folge von Redundanz."),
      card("n:m in Tabellen", "Zwischentabelle mit zwei Fremdschlüsseln, die zusammen den Primärschlüssel bilden."),
    ],
  },
  {
    id: "sw-architektur",
    part: "AP2_SOFTWARE",
    lf: "LF08",
    title: "Architektur, Schnittstellen & Entwurfsmuster",
    summary: "Schichtenarchitektur, MVC, Client-Server, REST/JSON, Entwurfsmuster (Singleton, Observer, Factory, Strategy).",
    weight: 4,
    hours: 4,
    difficulty: 3,
    lesson: {
      sources: ["O04", "L02"],
      keyPoints: [
        "MVC trennt Model (Daten/Logik), View (Darstellung), Controller (Steuerung).",
        "REST: Ressourcen über URLs, HTTP-Methoden GET/POST/PUT/PATCH/DELETE, zustandslos.",
        "HTTP-Statuscodes: 200 OK, 201 Created, 400 Bad Request, 401/403, 404, 500.",
        "Singleton: genau eine Instanz. Observer: Benachrichtigung bei Änderung.",
        "JSON ist leichtgewichtig, XML strenger mit Schema (XSD).",
      ],
      content: `## Architekturen
- **Schichtenarchitektur** (3-Schicht): Präsentation – Logik – Datenhaltung. Austauschbarkeit, Wartbarkeit.
- **MVC**: Model (Daten), View (Anzeige), Controller (nimmt Eingaben an, steuert).
- **Client-Server**, **Microservices** (kleine, unabhängig deploybare Dienste), **Monolith**.

## REST-Schnittstellen
| Methode | Zweck | Beispiel |
|---|---|---|
| GET | lesen | GET /kunden/7 |
| POST | anlegen | POST /kunden |
| PUT | ersetzen | PUT /kunden/7 |
| PATCH | teilweise ändern | PATCH /kunden/7 |
| DELETE | löschen | DELETE /kunden/7 |

GET, PUT, DELETE sind **idempotent** (mehrfach ausgeführt → gleiches Ergebnis), POST nicht.

**Statuscodes**: 2xx Erfolg (200, 201, 204), 3xx Umleitung, 4xx Clientfehler (400, 401, 403, 404), 5xx Serverfehler (500, 503).

## Datenformate
\`\`\`json
{ "id": 7, "name": "Müller GmbH", "aktiv": true, "orte": ["Hagen", "Dortmund"] }
\`\`\`
JSON: kompakt, nah an JavaScript. XML: Tags, Attribute, Validierung mit XSD. CSV: einfache Tabellen.

## Entwurfsmuster (GoF)
- **Singleton**: genau eine Instanz (privater Konstruktor, statische getInstance()).
- **Factory (Method)**: Objekterzeugung kapseln.
- **Observer**: Subjekt benachrichtigt registrierte Beobachter bei Änderungen.
- **Strategy**: austauschbare Algorithmen hinter gemeinsamer Schnittstelle.
- **Adapter**: inkompatible Schnittstellen verbinden.`,
    },
    questions: [
      q.single("Welche HTTP-Methode legt in einer REST-API typischerweise eine neue Ressource an?", ["GET", "POST", "DELETE", "HEAD"], 1, "POST erzeugt eine neue Ressource (Antwort häufig 201 Created).", { placement: true, difficulty: 1 }),
      q.single("Was bedeutet der HTTP-Statuscode 404?", ["Server-Fehler", "Nicht autorisiert", "Ressource nicht gefunden", "Erfolgreich angelegt"], 2, "404 Not Found.", { difficulty: 1 }),
      q.single("Welches Entwurfsmuster stellt sicher, dass es nur genau eine Instanz einer Klasse gibt?", ["Observer", "Singleton", "Strategy", "Adapter"], 1, "Singleton: privater Konstruktor + statischer Zugriffspunkt.", { placement: true }),
      q.single("Welche Komponente in MVC verarbeitet Benutzereingaben?", ["Model", "View", "Controller", "Router"], 2, "Der Controller nimmt Eingaben an und steuert Model und View."),
      q.multi("Welche HTTP-Methoden sind idempotent?", ["GET", "POST", "PUT", "DELETE"], [0, 2, 3], "Mehrfaches GET/PUT/DELETE führt zum gleichen Zustand; POST erzeugt jedes Mal eine neue Ressource."),
      q.single("Eine Wetter-App soll alle Anzeigen automatisch aktualisieren, wenn neue Messwerte eintreffen. Welches Muster passt?", ["Singleton", "Factory", "Observer", "Adapter"], 2, "Observer: Beobachter werden bei Zustandsänderung benachrichtigt."),
      q.single("Was ist ein Vorteil einer Schichtenarchitektur?", ["Weniger Klassen", "Schichten lassen sich austauschen/testen, ohne die anderen zu ändern", "Kein Datenbankzugriff nötig", "Höhere Hardwareanforderungen"], 1, "Trennung der Verantwortlichkeiten → Wartbarkeit und Austauschbarkeit."),
    ],
    cards: [
      card("MVC", "Model = Daten/Logik, View = Darstellung, Controller = Eingaben/Steuerung", true),
      card("REST-Methoden", "GET lesen, POST anlegen, PUT ersetzen, PATCH ändern, DELETE löschen", true),
      card("HTTP-Statusklassen", "2xx Erfolg, 3xx Umleitung, 4xx Clientfehler, 5xx Serverfehler", true),
      card("Singleton", "Genau eine Instanz: privater Konstruktor + statische getInstance()-Methode."),
      card("Observer", "Subjekt informiert registrierte Beobachter automatisch bei Änderungen."),
      card("Idempotenz", "Mehrfache Ausführung hat dieselbe Wirkung wie einmalige (GET, PUT, DELETE)."),
    ],
  },
  {
    id: "sw-ui-ux",
    part: "AP2_SOFTWARE",
    lf: "LF10a",
    title: "Benutzeroberflächen, Ergonomie & Barrierefreiheit",
    summary: "Dialoggrundsätze DIN EN ISO 9241-110, Usability, Barrierefreiheit (WCAG/BITV), Mockups, Validierung.",
    weight: 4,
    hours: 3,
    difficulty: 2,
    lesson: {
      sources: ["O04", "L02"],
      keyPoints: [
        "ISO 9241-110 Interaktionsprinzipien: Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robustheit gegen Benutzungsfehler, Benutzerbindung.",
        "WCAG-Prinzipien: wahrnehmbar, bedienbar, verständlich, robust.",
        "Barrierefreiheit: Alternativtexte, Kontrast, Tastaturbedienung, Screenreader-Labels.",
        "Wireframe → Mockup → Prototyp: zunehmende Detailtiefe.",
        "Eingaben clientseitig für UX und serverseitig für Sicherheit validieren.",
      ],
      content: `## Interaktionsprinzipien (DIN EN ISO 9241-110:2020)
1. **Aufgabenangemessenheit** – unterstützt die Aufgabe ohne unnötige Schritte
2. **Selbstbeschreibungsfähigkeit** – man versteht, wo man ist und was zu tun ist
3. **Erwartungskonformität** – verhält sich wie gewohnt/konsistent
4. **Erlernbarkeit** – leicht zu lernen
5. **Steuerbarkeit** – Nutzer bestimmt Ablauf und Tempo (Abbrechen, Zurück)
6. **Robustheit gegen Benutzungsfehler** (früher Fehlertoleranz) – Fehler vermeiden, verständliche Meldungen, Korrektur möglich
7. **Benutzerbindung** – motivierend, ansprechend

(Ältere Fassung: zusätzlich „Individualisierbarkeit“, dafür ohne „Benutzerbindung“.)

## Barrierefreiheit
**WCAG** (international) und **BITV 2.0** (öffentliche Stellen in DE); seit 2025 gilt für viele Produkte das **Barrierefreiheitsstärkungsgesetz (BFSG)**.
WCAG-Prinzipien: **wahrnehmbar, bedienbar, verständlich, robust**.
- Alternativtexte für Bilder, ausreichender Kontrast (mind. 4,5 : 1 für normalen Text, Stufe AA)
- vollständige Tastaturbedienung, sichtbarer Fokus
- Formularfelder mit Labels, Fehlermeldungen als Text (nicht nur Farbe)
- Skalierbare Schrift, einfache Sprache

## Entwurf
**Wireframe** (Struktur, grau) → **Mockup** (visuelles Design) → **Prototyp** (klickbar). Frühzeitig mit Nutzern testen (Usability-Test, Thinking aloud).

## Validierung
Pflichtfelder, Formate (E-Mail, PLZ), Wertebereiche. Clientseitig = schnelles Feedback, **serverseitig = Pflicht** (Sicherheit).`,
    },
    questions: [
      q.single("Ein Formular zeigt bei einem Fehler nur einen roten Rahmen ohne Text. Welches Problem besteht vor allem?", ["Datenschutz", "Barrierefreiheit/Selbstbeschreibungsfähigkeit", "Performance", "Lizenzrecht"], 1, "Farbe allein ist für Farbenblinde/Screenreader nicht wahrnehmbar; es fehlt eine verständliche Meldung.", { placement: true }),
      q.single("Der Nutzer kann einen langen Assistenten jederzeit abbrechen und zurückspringen. Welcher Grundsatz ist erfüllt?", ["Steuerbarkeit", "Erwartungskonformität", "Aufgabenangemessenheit", "Benutzerbindung"], 0, "Steuerbarkeit: Der Nutzer bestimmt Richtung und Tempo."),
      q.multi("Welche Maßnahmen verbessern die Barrierefreiheit einer Webanwendung?", ["Alternativtexte für Bilder", "Bedienung nur per Maus", "Ausreichender Farbkontrast", "Labels für Formularfelder", "Informationen nur über Farbe kennzeichnen"], [0, 2, 3], "Alt-Texte, Kontrast und Labels helfen; nur Maus oder nur Farbe schließen Menschen aus."),
      q.single("Wie heißen die vier WCAG-Prinzipien?", ["Schnell, sicher, schön, sparsam", "Wahrnehmbar, bedienbar, verständlich, robust", "Lesbar, klickbar, mobil, sicher", "Einfach, klar, kurz, konsistent"], 1, "POUR: perceivable, operable, understandable, robust."),
      q.single("Gleiche Schaltflächen sehen in der gesamten Anwendung gleich aus und stehen an der gleichen Stelle. Welcher Grundsatz?", ["Steuerbarkeit", "Erwartungskonformität", "Robustheit", "Erlernbarkeit"], 1, "Konsistenz entspricht den Erwartungen der Nutzer."),
      q.single("Warum reicht eine clientseitige Validierung nicht aus?", ["Sie ist zu langsam.", "Sie kann umgangen werden; der Server muss Eingaben selbst prüfen.", "Browser unterstützen sie nicht.", "Sie verstößt gegen die DSGVO."], 1, "Clientseitige Prüfung verbessert die UX, ist aber manipulierbar."),
    ],
    cards: [
      card("ISO 9241-110 (2020)", "Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robustheit gegen Benutzungsfehler, Benutzerbindung", true),
      card("WCAG-Prinzipien", "Wahrnehmbar, bedienbar, verständlich, robust (POUR)", true),
      card("Wireframe – Mockup – Prototyp", "Struktur → visuelles Design → klickbare Simulation"),
      card("Kontrast WCAG AA", "Mindestens 4,5 : 1 für normalen Text, 3 : 1 für großen Text."),
      card("Validierung", "Client: Komfort. Server: Pflicht für Sicherheit und Datenqualität."),
    ],
  },
  {
    id: "sw-testen",
    part: "AP2_SOFTWARE",
    lf: "LF11a",
    title: "Softwaretest & Qualitätssicherung",
    summary: "Teststufen, Black-/White-Box, Äquivalenzklassen, Grenzwerte, Überdeckung, TDD, Regressionstest.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O04", "O05"],
      keyPoints: [
        "Teststufen: Komponenten-, Integrations-, System-, Abnahmetest.",
        "Black-Box: gegen Spezifikation, ohne Code. White-Box: anhand der Codestruktur.",
        "Äquivalenzklassen: gültige und ungültige Klassen, je ein Repräsentant.",
        "Grenzwertanalyse: Werte direkt an und neben den Grenzen testen.",
        "Anweisungsüberdeckung (C0) < Zweigüberdeckung (C1) < Pfadüberdeckung.",
      ],
      content: `## Teststufen
1. **Komponententest (Unit Test)** – einzelne Funktion/Klasse, meist automatisiert (JUnit, pytest)
2. **Integrationstest** – Zusammenspiel von Komponenten/Schnittstellen
3. **Systemtest** – ganzes System gegen Anforderungen
4. **Abnahmetest** – durch den Kunden

**Regressionstest**: Nach Änderungen prüfen, ob Bestehendes noch funktioniert.

## Verfahren
- **Black-Box**: Ein-/Ausgaben laut Spezifikation (Äquivalenzklassen, Grenzwerte, Entscheidungstabellen).
- **White-Box**: Codestruktur (Anweisungs-, Zweig-, Pfadüberdeckung).
- **Statisch**: Code-Review, Linter – ohne Ausführung. **Dynamisch**: mit Ausführung.

## Äquivalenzklassen & Grenzwerte
Beispiel: Alter für Azubi-Rabatt gültig von **16 bis 25** (ganzzahlig).
- Klassen: < 16 (ungültig), 16–25 (gültig), > 25 (ungültig), keine Zahl (ungültig)
- Grenzwerte: **15, 16, 25, 26**

## Überdeckung
- **C0 Anweisungsüberdeckung**: jede Anweisung mindestens einmal
- **C1 Zweigüberdeckung**: jeder Zweig (if wahr UND falsch) mindestens einmal
- C1 schließt C0 ein.

## Testfall-Aufbau
ID, Vorbedingung, Eingabe, **erwartetes Ergebnis**, tatsächliches Ergebnis, Status.

## TDD
Red (Test schreiben, schlägt fehl) → Green (minimal implementieren) → Refactor.`,
    },
    questions: [
      q.single("Welche Teststufe prüft das Zusammenspiel mehrerer Komponenten über Schnittstellen?", ["Komponententest", "Integrationstest", "Systemtest", "Abnahmetest"], 1, "Integrationstest = Schnittstellen und Zusammenspiel.", { placement: true, difficulty: 1 }),
      q.short("Ein Feld akzeptiert Mengen von 1 bis 99. Nenne die vier Grenzwerte (aufsteigend, mit Komma getrennt).", ["0, 1, 99, 100", "0,1,99,100"], "Direkt an und neben den Grenzen: 0, 1, 99, 100.", { placement: true }),
      q.single("Was unterscheidet White-Box- von Black-Box-Tests?", ["White-Box-Tests werden nur vom Kunden durchgeführt.", "White-Box-Tests leiten Testfälle aus der Codestruktur ab.", "Black-Box-Tests prüfen nur die Oberfläche.", "Es gibt keinen Unterschied."], 1, "White-Box kennt den Code (Überdeckung), Black-Box nur die Spezifikation."),
      q.trace("Wie viele Testfälle braucht man mindestens für 100 % Zweigüberdeckung?", "funktion pruefe(x)\n    WENN x > 10 DANN\n        AUSGABE \"groß\"\n    ENDE WENN\n    WENN x % 2 = 0 DANN\n        AUSGABE \"gerade\"\n    ENDE WENN", ["2"], "Zwei Testfälle reichen: x = 12 (beide wahr) und x = 3 (beide falsch) decken alle vier Zweige ab."),
      q.single("Nach einem Bugfix wird die komplette Testsuite erneut ausgeführt. Wie nennt man das?", ["Abnahmetest", "Regressionstest", "Lasttest", "Smoke-Test"], 1, "Regressionstests stellen sicher, dass Änderungen nichts kaputt gemacht haben."),
      q.single("Was ist der erste Schritt bei Test-Driven Development?", ["Code schreiben", "Einen fehlschlagenden Test schreiben", "Refactoring", "Deployment"], 1, "Red → Green → Refactor."),
      q.open("Bilde Äquivalenzklassen für ein Passwortfeld: 8–64 Zeichen, mindestens eine Ziffer.", "Gültig: Länge 8–64 mit mindestens einer Ziffer (z. B. „sommer2026“). Ungültig: Länge < 8 („abc1“), Länge > 64, keine Ziffer („sommerzeit“), leer. Grenzwerte: 7, 8, 64, 65 Zeichen.", "", { difficulty: 3 }),
    ],
    cards: [
      card("Teststufen", "Komponenten- → Integrations- → System- → Abnahmetest", true),
      card("Black-Box vs. White-Box", "Black: Spezifikation, kein Code. White: Codestruktur (Überdeckung).", true),
      card("Grenzwertanalyse", "Werte an und direkt neben den Grenzen testen (z. B. 0, 1, 99, 100).", true),
      card("C0 / C1", "C0 = Anweisungsüberdeckung, C1 = Zweigüberdeckung (stärker)."),
      card("TDD-Zyklus", "Red – Green – Refactor"),
      card("Regressionstest", "Wiederholung von Tests nach Änderungen, um Seiteneffekte zu finden."),
    ],
  },
  {
    id: "sw-qualitaet-git",
    part: "AP2_SOFTWARE",
    lf: "LF11a",
    title: "Versionsverwaltung, CI/CD & Clean Code",
    summary: "Git-Grundbefehle, Branching, Merge-Konflikte, Code-Review, CI/CD, Entwicklungsumgebungen und Bibliotheken.",
    weight: 3,
    hours: 2.5,
    difficulty: 2,
    lesson: {
      sources: ["L05", "O04"],
      keyPoints: [
        "Git ist verteilt: jeder hat das komplette Repository lokal.",
        "Ablauf: git add → git commit → git push; git pull holt Änderungen.",
        "Feature-Branches + Pull/Merge Request + Code-Review.",
        "CI baut und testet automatisch bei jedem Push; CD liefert automatisiert aus.",
        "IDE: Editor, Debugger, Build, Versionskontrolle, Refactoring in einem Werkzeug.",
      ],
      content: `## Git
| Befehl | Zweck |
|---|---|
| git clone | Repository kopieren |
| git status | Änderungen anzeigen |
| git add | Änderungen vormerken (Staging) |
| git commit -m "…" | Snapshot lokal speichern |
| git push / pull | Mit Remote synchronisieren |
| git branch / switch | Zweige verwalten |
| git merge | Zweige zusammenführen |

**Merge-Konflikt**: Zwei Branches ändern dieselbe Stelle → manuell auflösen, dann committen.

**Branching-Strategie**: \`main\` stabil, Feature-Branches für neue Funktionen, Integration über **Pull Request** mit Code-Review.

## CI/CD
- **Continuous Integration**: Bei jedem Push automatisch bauen, testen, Linter ausführen.
- **Continuous Delivery/Deployment**: automatisiert in Test- oder Produktivumgebung ausliefern.

## Entwicklungsumgebung & Bibliotheken
IDE (z. B. IntelliJ, VS Code, Visual Studio): Syntaxhervorhebung, Autovervollständigung, Debugger, Refactoring.
Bibliotheken/Frameworks über **Paketmanager** (npm, Maven, pip). Auswahlkriterien: Lizenz, Wartung/Community, Sicherheit, Dokumentation, Kompatibilität.

## Clean Code
Sprechende Namen, kleine Funktionen, DRY (Don't Repeat Yourself), KISS, kommentiere das *Warum*, nicht das *Was*. **Code-Reviews** finden Fehler früh und verteilen Wissen.`,
    },
    questions: [
      q.single("Welcher Git-Befehl speichert vorgemerkte Änderungen als Snapshot im lokalen Repository?", ["git push", "git add", "git commit", "git clone"], 2, "git commit legt den Snapshot lokal an; push überträgt ihn.", { placement: true, difficulty: 1 }),
      q.single("Was passiert bei Continuous Integration?", ["Code wird nur einmal pro Monat zusammengeführt.", "Jede Änderung wird automatisch gebaut und getestet.", "Tests werden abgeschafft.", "Der Kunde testet jede Änderung."], 1, "CI = automatischer Build und Test bei jeder Integration."),
      q.single("Wann entsteht ein Merge-Konflikt?", ["Wenn zwei Branches unterschiedliche Dateien ändern", "Wenn zwei Branches dieselbe Zeile unterschiedlich ändern", "Bei jedem Merge", "Wenn ein Commit-Text fehlt"], 1, "Git kann gleichzeitige Änderungen an derselben Stelle nicht automatisch auflösen."),
      q.multi("Welche Kriterien sind bei der Auswahl einer externen Bibliothek wichtig?", ["Lizenz", "Aktive Wartung und Sicherheitsupdates", "Farbe des Logos", "Dokumentation", "Kompatibilität zur eigenen Umgebung"], [0, 1, 3, 4], "Lizenz, Wartung, Doku und Kompatibilität sind entscheidend."),
      q.short("Wofür steht das Clean-Code-Prinzip DRY?", ["Don't Repeat Yourself", "dont repeat yourself"], "Don't Repeat Yourself – Wiederholungen vermeiden."),
    ],
    cards: [
      card("git add / commit / push", "Vormerken → lokal speichern → auf Remote übertragen", true),
      card("CI/CD", "CI: automatisch bauen + testen. CD: automatisiert ausliefern.", true),
      card("Pull Request", "Antrag, einen Branch zu mergen – mit Code-Review und automatischen Checks."),
      card("DRY / KISS", "Don't Repeat Yourself / Keep It Simple, Stupid"),
    ],
  },
  {
    id: "sw-sicherheit",
    part: "AP2_SOFTWARE",
    lf: "LF11a",
    title: "Sichere Softwareentwicklung",
    summary: "SQL-Injection, XSS, CSRF, Passwort-Hashing, Prinzip der minimalen Rechte, Privacy by Design.",
    weight: 4,
    hours: 2.5,
    difficulty: 3,
    lesson: {
      sources: ["L10", "L09", "O04"],
      keyPoints: [
        "SQL-Injection verhindern: Prepared Statements / parametrisierte Abfragen.",
        "XSS verhindern: Ausgaben kontextgerecht escapen, Content Security Policy.",
        "CSRF verhindern: CSRF-Token, SameSite-Cookies.",
        "Passwörter nie im Klartext: bcrypt/Argon2 mit Salt.",
        "Privacy by Design/Default (Art. 25 DSGVO).",
      ],
      content: `## Typische Schwachstellen (OWASP Top 10)
- **Injection** (z. B. SQL-Injection): Benutzereingaben werden als Code ausgeführt.
  \`\`\`
  "SELECT * FROM user WHERE name = '" + eingabe + "'"   ← gefährlich
  \`\`\`
  Eingabe \`' OR '1'='1\` liefert alle Nutzer. **Lösung**: Prepared Statements.
- **Cross-Site Scripting (XSS)**: eingeschleustes JavaScript wird im Browser anderer Nutzer ausgeführt. **Lösung**: Ausgabe escapen, CSP.
- **CSRF**: fremde Seite löst Aktion im Namen eines eingeloggten Nutzers aus. **Lösung**: CSRF-Token, SameSite-Cookies.
- **Broken Access Control**: fehlende Rechteprüfung auf dem Server.
- **Sensitive Data Exposure**: fehlende Verschlüsselung (TLS), Passwörter im Klartext.

## Grundprinzipien
- **Least Privilege**: nur nötige Rechte (auch für DB-Benutzer).
- **Defense in Depth**: mehrere Schutzschichten.
- **Eingaben validieren**, Ausgaben kodieren, Fehlermeldungen ohne interne Details.
- **Abhängigkeiten aktuell** halten (Dependency-Scanning).
- **Privacy by Design & by Default** (Art. 25 DSGVO): Datenschutz von Anfang an, datensparsame Voreinstellungen.

## Passwörter
Mit **Salt** und langsamer Hashfunktion (bcrypt, scrypt, Argon2) speichern – nicht mit MD5/SHA-1 und nie verschlüsselt-umkehrbar.`,
    },
    questions: [
      q.single("Welche Maßnahme schützt am wirksamsten vor SQL-Injection?", ["Eingaben in Großbuchstaben umwandeln", "Prepared Statements mit Parametern", "Längere Tabellennamen", "Clientseitige Validierung"], 1, "Parametrisierte Abfragen trennen Code und Daten.", { placement: true }),
      q.single("Ein Angreifer speichert <script>…</script> in einem Kommentarfeld, das anderen Nutzern angezeigt wird. Welcher Angriff?", ["SQL-Injection", "Cross-Site Scripting (XSS)", "Brute Force", "Man-in-the-Middle"], 1, "Gespeichertes (persistentes) XSS."),
      q.single("Welches Verfahren eignet sich zum Speichern von Passwörtern?", ["MD5 ohne Salt", "AES-Verschlüsselung", "bcrypt oder Argon2 mit Salt", "Base64"], 2, "Langsame, gesalzene Hashverfahren – Base64 ist nur Kodierung, AES umkehrbar."),
      q.single("Was beschreibt das Prinzip „Least Privilege“?", ["Jeder Nutzer bekommt Admin-Rechte.", "Nur die minimal notwendigen Rechte vergeben.", "Rechte werden nie entzogen.", "Gäste haben die meisten Rechte."], 1, "Minimale Rechte begrenzen den Schaden bei Kompromittierung."),
      q.single("Welche Maßnahme schützt vor CSRF?", ["CSRF-Token im Formular", "Längere Passwörter", "RAID 1", "Ein größerer Server"], 0, "Ein geheimes Token pro Sitzung/Formular, das die fremde Seite nicht kennt (dazu SameSite-Cookies)."),
    ],
    cards: [
      card("SQL-Injection", "Eingabe wird als SQL ausgeführt. Schutz: Prepared Statements.", true),
      card("XSS", "Eingeschleustes Script im Browser anderer Nutzer. Schutz: Escaping, CSP.", true),
      card("Passwort-Speicherung", "bcrypt/Argon2 mit Salt – nie Klartext, MD5 oder umkehrbar.", true),
      card("CSRF", "Fremde Seite löst Aktion im Namen des Nutzers aus. Schutz: Token, SameSite-Cookies."),
      card("Privacy by Design", "Datenschutz von Anfang an in die Entwicklung einbauen (Art. 25 DSGVO)."),
    ],
  },
];
