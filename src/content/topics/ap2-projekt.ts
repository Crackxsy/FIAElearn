import { card, q, type TopicSeed } from "../types";

const SIHK_HINWEIS =
  "\n\n> Lokale Vorgaben (Fristen, Formalien, Seitenumfang, Upload) legt die SIHK zu Hagen fest. Prüfe sie immer tagesaktuell auf der SIHK-Website (Quellen O08–O10).";

export const AP2_PROJEKT: TopicSeed[] = [
  {
    id: "projekt-antrag-planung",
    part: "AP2_PROJEKT",
    lf: "LF12a",
    title: "Projektantrag & Projektplanung",
    summary: "Geeignetes Projekt finden, Antrag (DiPa), Ist/Soll, Abgrenzung, Zeitplanung in 80 Stunden, Ressourcen.",
    weight: 5,
    hours: 3,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O03", "O08", "O09"],
      keyPoints: [
        "Projektarbeit inkl. Dokumentation: höchstens 80 Stunden.",
        "Das Projekt muss vor der Durchführung genehmigt werden (Antrag über das SIHK-Portal).",
        "Eigene fachliche Entscheidungen müssen erkennbar sein – nicht nur „nach Anleitung umsetzen“.",
        "Antrag: Thema, Ist-Zustand, Soll/Ziel, Abgrenzung, Phasen mit Stunden, Ressourcen.",
        "Zeitplanung realistisch inkl. Puffer, Tests und Dokumentation.",
      ],
      content: `## Rahmen (FIAusbV § 12)
- Betriebliches Projekt + Dokumentation: **max. 80 Stunden**
- Präsentation + Fachgespräch: **max. 30 Minuten**, Präsentation **höchstens 15 Minuten**
- Gewicht: **50 %** der Gesamtnote; innerhalb: Projekt/Doku und Präsentation/Fachgespräch je zur Hälfte
- Das Projekt wird **vor der Durchführung genehmigt** (bei der SIHK über den digitalen Projektantrag)

## Was ist ein gutes Projekt?
- Echter **Kundenauftrag** (intern oder extern) mit erkennbarem Nutzen
- Umfang passt in 80 Stunden – nicht zu klein, nicht zu groß
- **Eigenständige Entscheidungen**: Lösungsalternativen vergleichen und begründen
- Alle Phasen: Analyse, Entwurf, Umsetzung, Test, Abnahme, Dokumentation

## Projektantrag – typische Inhalte
1. Projektbezeichnung
2. Kurzbeschreibung: Ist-Zustand, Problem, Soll-Zustand, Ziel
3. Projektumfeld und Schnittstellen
4. **Abgrenzung**: was gehört nicht dazu
5. **Zeitplanung** nach Phasen (Summe max. 80 h)
6. Ressourcen (Hardware, Software, Personal)

## Beispiel Zeitplanung
| Phase | Stunden |
|---|---|
| Analyse (Ist, Soll, Wirtschaftlichkeit) | 8 |
| Entwurf (Architektur, DB, UI) | 12 |
| Implementierung | 34 |
| Test & Qualitätssicherung | 8 |
| Abnahme & Einführung | 4 |
| Dokumentation | 14 |
| **Summe** | **80** |` + SIHK_HINWEIS,
    },
    questions: [
      q.single("Wie viele Stunden umfassen die betriebliche Projektarbeit und die Dokumentation zusammen höchstens?", ["40", "70", "80", "120"], 2, "FIAusbV § 12: zusammen höchstens 80 Stunden.", { placement: true, difficulty: 1, sources: ["O03"] }),
      q.single("Wie lange darf die Präsentation des Projekts höchstens dauern?", ["10 Minuten", "15 Minuten", "20 Minuten", "30 Minuten"], 1, "Präsentation höchstens 15 Minuten; mit Fachgespräch zusammen max. 30 Minuten.", { sources: ["O03"] }),
      q.single("Was macht ein Projekt aus Prüfersicht besonders geeignet?", ["Möglichst viele Programmiersprachen", "Erkennbare eigenständige Entscheidungen und vollständiger Projektablauf", "Möglichst wenig Dokumentation", "Ein besonders großes Budget"], 1, "Bewertet werden u. a. Planung, begründete Entscheidungen, Umsetzung, Test und Dokumentation."),
      q.multi("Was gehört typischerweise in einen Projektantrag?", ["Ist- und Soll-Zustand", "Zeitplanung nach Phasen", "Abgrenzung des Projekts", "Fertiger Quellcode", "Prüfungsnote des Vorjahres"], [0, 1, 2], "Der Antrag beschreibt das geplante Vorgehen – Code entsteht erst nach Genehmigung."),
      q.open("Fachgespräch: „Warum haben Sie sich für diese Programmiersprache/dieses Framework entschieden?“ – Wie antwortest du strukturiert?", "Struktur: Anforderungen nennen (z. B. Integration ins bestehende System, Team-Know-how, Lizenz, Performance) → Alternativen kurz nennen → Kriterien gewichtet vergleichen (ggf. Nutzwertanalyse aus der Doku) → Entscheidung begründen → Nachteile/Risiken ehrlich erwähnen.", "Gute Antworten zeigen Abwägung statt Bauchgefühl.", { difficulty: 3 }),
      q.open("Fachgespräch: „Was würden Sie heute anders machen?“", "Ehrlich und reflektiert: konkrete Abweichung nennen (z. B. Testaufwand unterschätzt), Ursache, Lerneffekt und was man beim nächsten Mal anders plant (früher Kundenfeedback, mehr Puffer, automatisierte Tests). Nicht „nichts“ sagen.", "", { difficulty: 2 }),
    ],
    cards: [
      card("AP2-Projekt Rahmen", "Projekt + Doku max. 80 h; Präsentation max. 15 Min.; mit Fachgespräch max. 30 Min.; 50 % der Gesamtnote", true),
      card("Projektantrag", "Thema, Ist/Soll, Ziel, Umfeld, Abgrenzung, Zeitplan nach Phasen, Ressourcen – Genehmigung vor Durchführung", true),
      card("Abgrenzung", "Legt fest, was ausdrücklich NICHT Teil des Projekts ist – schützt vor Scope Creep."),
      card("Projektbewertung intern", "Projektarbeit/Dokumentation 50 % + Präsentation/Fachgespräch 50 %"),
    ],
  },
  {
    id: "projekt-wirtschaftlichkeit",
    part: "AP2_PROJEKT",
    lf: "LF12a",
    title: "Wirtschaftlichkeit & Make-or-Buy",
    summary: "Projektkosten berechnen, Amortisation, Make-or-Buy, Nutzwertanalyse, nicht-monetäre Vorteile.",
    weight: 4,
    hours: 2.5,
    difficulty: 3,
    lesson: {
      sources: ["O03"],
      keyPoints: [
        "Projektkosten = Personalkosten + Ressourcenkosten (Arbeitsplatz, Lizenzen, Hardware).",
        "Personalkosten = Stunden × Stundensatz (inkl. Gemeinkosten).",
        "Amortisationsdauer = Projektkosten ÷ Einsparung pro Zeiteinheit.",
        "Make-or-Buy: Eigenentwicklung vs. Kaufsoftware – Kosten und qualitative Faktoren.",
        "Auch nicht-monetäre Vorteile nennen: Fehlerreduktion, Zufriedenheit, Datenqualität.",
      ],
      content: `## Projektkosten
\`\`\`
Personalkosten Azubi:     70 h × 25 €/h = 1.750 €
Personalkosten Mitarbeiter (Gespräche, Abnahme):
                          6 h × 50 €/h   =   300 €
Ressourcen (Arbeitsplatz, Lizenzen):
                         76 h × 15 €/h   = 1.140 €
Projektkosten gesamt                     = 3.190 €
\`\`\`
Stundensätze kommen meist vom Betrieb (Controlling) oder werden nachvollziehbar hergeleitet.

## Amortisation
Bisher dauert ein Vorgang 15 Minuten, künftig 5 Minuten, 40 Vorgänge pro Monat, Stundensatz 40 €:
Ersparnis = 10 Min × 40 = 400 Min ≈ 6,67 h/Monat × 40 € ≈ **266,67 €/Monat**
Amortisation = 3.190 € ÷ 266,67 € ≈ **12 Monate**

## Make-or-Buy
| Kriterium | Make (Eigenentwicklung) | Buy (Standardsoftware) |
|---|---|---|
| Passgenauigkeit | hoch | mittel, Anpassung nötig |
| Kosten | Entwicklung + Wartung | Lizenz/Abo |
| Zeit | länger | schnell verfügbar |
| Abhängigkeit | Know-how intern | vom Hersteller |

Entscheidung oft per **Nutzwertanalyse** begründen.`,
    },
    questions: [
      q.calc("Ein Azubi arbeitet 75 Stunden am Projekt (Stundensatz 22 €), ein Mitarbeiter 5 Stunden (Stundensatz 48 €). Ressourcenpauschale: 12 € pro Projektstunde für alle 80 Stunden. Wie hoch sind die Projektkosten?", 2850, "75 × 22 = 1.650 €; 5 × 48 = 240 €; 80 × 12 = 960 €; Summe 2.850 €.", { unit: "€", tolerance: 0.01 }),
      q.calc("Projektkosten 4.800 €, monatliche Einsparung 400 €. Nach wie vielen Monaten ist das Projekt amortisiert?", 12, "4.800 ÷ 400 = 12 Monate.", { unit: "Monate", tolerance: 0, placement: true }),
      q.calc("Ein Vorgang dauert bisher 12 Minuten, nach dem Projekt 4 Minuten. Er fällt 300-mal pro Monat an. Stundensatz 36 €. Wie viel Euro werden pro Monat eingespart?", 1440, "8 Min × 300 = 2.400 Min = 40 h; 40 h × 36 € = 1.440 €.", { unit: "€", tolerance: 0.01 }),
      q.multi("Welche sind nicht-monetäre Vorteile eines Softwareprojekts?", ["Weniger Eingabefehler", "Höhere Mitarbeiterzufriedenheit", "Bessere Datenqualität", "Höherer Stundensatz des Azubis"], [0, 1, 2], "Qualitative Vorteile gehören in die Wirtschaftlichkeitsbetrachtung."),
      q.open("Fachgespräch: „Warum haben Sie die Software selbst entwickelt, statt eine fertige Lösung zu kaufen?“", "Make-or-Buy-Abwägung: Marktrecherche zeigte keine passende Lösung bzw. hohe Lizenz-/Anpassungskosten; Anforderungen sehr spezifisch (Integration in bestehende Systeme); internes Know-how vorhanden; geringere laufende Kosten; Nutzwertanalyse/Kostenvergleich als Beleg; Nachteile (Wartungsaufwand) benennen.", "", { difficulty: 3 }),
    ],
    cards: [
      card("Projektkosten", "Personalkosten (Stunden × Satz) + Ressourcen (Arbeitsplatz, Lizenzen, Hardware)", true),
      card("Amortisationsdauer", "Projektkosten ÷ Einsparung pro Zeiteinheit", true),
      card("Make-or-Buy", "Eigenentwicklung vs. Kauf: Passgenauigkeit, Kosten, Zeit, Abhängigkeit, Wartung"),
    ],
  },
  {
    id: "projekt-dokumentation",
    part: "AP2_PROJEKT",
    lf: "LF12a",
    title: "Projektdokumentation",
    summary: "Bewährte Gliederung, Soll-Ist-Vergleich, Anhang, Quellen, typische Fehler.",
    weight: 5,
    hours: 3,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["O03", "O08"],
      keyPoints: [
        "Die Dokumentation beschreibt den Prozess – nicht nur das Produkt.",
        "Entscheidungen begründen (Alternativen, Kriterien), nicht nur beschreiben.",
        "Soll-Ist-Vergleich der Zeitplanung mit Begründung der Abweichungen.",
        "Anhang: Diagramme, Screenshots, Code-Auszüge, Testprotokolle, Kundendokumentation.",
        "Formalien (Umfang, Deckblatt, Erklärung) nach aktuellen SIHK-Vorgaben.",
      ],
      content: `## Bewährte Gliederung
1. **Einleitung**: Projektumfeld, Projektziel, Begründung, Schnittstellen, Abgrenzung
2. **Projektplanung**: Phasen, Abweichungen vom Antrag, Ressourcen, Entwicklungsprozess
3. **Analyse**: Ist-Analyse, Wirtschaftlichkeit (Make-or-Buy, Kosten, Amortisation), Anwendungsfälle, Qualitätsanforderungen
4. **Entwurf**: Zielplattform, Architektur, Benutzeroberfläche, Datenmodell, Geschäftslogik, Qualitätssicherung
5. **Implementierung**: Datenstrukturen, Oberfläche, Geschäftslogik (Auszüge, nicht alles)
6. **Abnahme & Einführung**: Tests, Abnahme durch Fachbereich, Deployment
7. **Dokumentation**: Benutzer- und Entwicklerdokumentation
8. **Fazit**: **Soll-Ist-Vergleich**, Lessons Learned, Ausblick

## Gute Doku
- Roter Faden: Problem → Entscheidung → Umsetzung → Ergebnis
- Fachbegriffe korrekt, Ich-Form oder neutral – aber einheitlich
- Abbildungen beschriften und im Text referenzieren
- Quellen angeben; fremde Inhalte kennzeichnen
- Keine Betriebsgeheimnisse/personenbezogenen Daten (schwärzen/anonymisieren)

## Typische Fehler
- Nur „was“ statt „warum“
- Fehlende Wirtschaftlichkeitsbetrachtung
- Keine Tests oder Testbelege
- Soll-Ist-Vergleich ohne Begründung
- Zu viel Code im Hauptteil` + SIHK_HINWEIS,
    },
    questions: [
      q.single("Was sollte im Fazit der Projektdokumentation unbedingt enthalten sein?", ["Der komplette Quellcode", "Ein Soll-Ist-Vergleich mit Begründung der Abweichungen", "Die Gehaltsabrechnung", "Werbung für das Unternehmen"], 1, "Der Soll-Ist-Vergleich zeigt Planungs- und Reflexionsfähigkeit.", { placement: true }),
      q.multi("Was gehört eher in den Anhang als in den Hauptteil?", ["Umfangreiche Code-Auszüge", "Testprotokolle", "Begründung der Architekturentscheidung", "Screenshots der Oberfläche", "Projektziel"], [0, 1, 3], "Begründungen und Ziele gehören in den Hauptteil."),
      q.single("Wie geht man mit personenbezogenen Kundendaten in Screenshots der Doku um?", ["Unverändert lassen", "Anonymisieren oder schwärzen", "Nur in Farbe abdrucken", "Ins Englische übersetzen"], 1, "Datenschutz und Betriebsgeheimnisse beachten."),
      q.open("Fachgespräch: „Wie haben Sie die Qualität Ihrer Software sichergestellt?“", "Konkrete Maßnahmen nennen: Unit-Tests (Abdeckung kritischer Logik), Integrationstests, manuelle Testfälle nach Äquivalenzklassen/Grenzwerten, Code-Review durch Kollegen, statische Analyse/Linter, Abnahmetest mit dem Fachbereich, Versionsverwaltung mit Feature-Branches; Ergebnisse/Testprotokolle im Anhang.", "", { difficulty: 3 }),
    ],
    cards: [
      card("Doku-Gliederung", "Einleitung – Planung – Analyse – Entwurf – Implementierung – Abnahme/Einführung – Dokumentation – Fazit", true),
      card("Soll-Ist-Vergleich", "Geplante vs. tatsächliche Stunden je Phase mit Begründung der Abweichungen", true),
      card("Was macht eine Doku gut?", "Roter Faden, begründete Entscheidungen, Belege (Tests), sauberer Anhang, Datenschutz"),
    ],
  },
  {
    id: "projekt-praesentation",
    part: "AP2_PROJEKT",
    lf: "LF12a",
    title: "Präsentation & Fachgespräch",
    summary: "15-Minuten-Präsentation aufbauen, Medien, Auftreten, typische Fachgespräch-Fragen und Antwortstrategien.",
    weight: 5,
    hours: 3,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["O03", "O08"],
      keyPoints: [
        "Präsentation höchstens 15 Minuten – Zeit vorher mehrfach stoppen.",
        "Aufbau: Einstieg, Ausgangslage, Ziel, Vorgehen/Entscheidungen, Ergebnis, Fazit.",
        "Wenig Text auf Folien, Diagramme statt Code-Wände.",
        "Fachgespräch: ausgehend vom Projekt, auch angrenzende Fachthemen.",
        "Nicht wissen ist okay – ehrlich sagen und Lösungsweg skizzieren.",
      ],
      content: `## Präsentation (max. 15 Minuten)
1. **Einstieg** (1 Min.): Vorstellung, Thema, Agenda
2. **Ausgangslage & Ziel** (2 Min.): Problem des Kunden, Ist/Soll
3. **Planung & Analyse** (3 Min.): Vorgehen, Wirtschaftlichkeit, Entscheidungen
4. **Umsetzung** (5 Min.): Architektur, interessante technische Lösung, kurze Demo/Screenshots
5. **Qualitätssicherung & Ergebnis** (2 Min.): Tests, Abnahme
6. **Fazit** (2 Min.): Soll-Ist, Lessons Learned, Ausblick

## Tipps
- Eine Kernaussage pro Folie, große Schrift, Diagramme
- Frei sprechen, Blickkontakt, Pausen
- Mehrfach mit Stoppuhr üben – bei 15 Minuten wird abgebrochen
- Technik vorher testen, Backup (PDF, USB-Stick)

## Fachgespräch (Rest der 30 Minuten)
Fragen gehen vom Projekt aus und vertiefen Fachwissen:
- *Warum diese Technologie/Architektur?*
- *Wie haben Sie getestet?*
- *Wie sicher ist die Anwendung (SQL-Injection, Passwörter)?*
- *Welche Alternativen gab es?*
- *Wie würden Sie das System erweitern/skalieren?*
- *Erklären Sie ein Diagramm aus Ihrer Doku.*

**Strategie**: Frage verstehen (ggf. nachfragen) → kurz und strukturiert antworten → Bezug zum eigenen Projekt herstellen.

Nutze im Fachgespräch-Training dieser App die Fragen als Simulation: Antwort laut formulieren (ca. 1–2 Minuten), dann mit der Musterantwort vergleichen.`,
    },
    questions: [
      q.single("Wie lange dürfen Präsentation und Fachgespräch zusammen höchstens dauern?", ["15 Minuten", "20 Minuten", "30 Minuten", "45 Minuten"], 2, "Zusammen max. 30 Minuten, Präsentation höchstens 15.", { placement: true, difficulty: 1, sources: ["O03"] }),
      q.single("Wie reagierst du im Fachgespräch am besten auf eine Frage, die du nicht sicher beantworten kannst?", ["Schweigen", "Irgendetwas erfinden", "Ehrlich sagen und einen möglichen Lösungsweg oder Ansatz skizzieren", "Das Thema wechseln"], 2, "Ehrlichkeit + Problemlösekompetenz wirken besser als Raten."),
      q.open("Fachgespräch: „Wie haben Sie Ihre Anwendung gegen SQL-Injection geschützt?“", "Durch Prepared Statements bzw. ORM mit parametrisierten Abfragen; zusätzlich Eingabevalidierung (Typ, Länge, Format), Datenbanknutzer mit minimalen Rechten, Fehlermeldungen ohne interne Details; ggf. Test mit typischen Angriffsstrings.", "", { difficulty: 3 }),
      q.open("Fachgespräch: „Erklären Sie den Unterschied zwischen Ihrem Komponententest und dem Abnahmetest.“", "Komponententest: Entwickler testet einzelne Funktionen/Klassen isoliert, meist automatisiert (z. B. JUnit). Abnahmetest: Auftraggeber/Fachbereich prüft das Gesamtsystem gegen die Anforderungen (Lastenheft/Akzeptanzkriterien) in realistischer Umgebung; Ergebnis im Abnahmeprotokoll.", "", { difficulty: 2 }),
      q.open("Fachgespräch: „Wie würden Sie vorgehen, wenn die Anwendung künftig 100-mal so viele Nutzer hat?“", "Engpässe messen (Profiling, Monitoring), Datenbank optimieren (Indizes, Abfragen), Caching, horizontale Skalierung (mehrere Instanzen hinter Load Balancer, zustandslose Services), asynchrone Verarbeitung (Queues), ggf. Cloud-Ressourcen; Lasttests vor dem Rollout.", "", { difficulty: 4 }),
      q.open("Fachgespräch: „Welche Rolle spielte der Datenschutz in Ihrem Projekt?“", "Welche personenbezogenen Daten verarbeitet werden, Rechtsgrundlage, Datenminimierung, Zugriffskonzept (Rollen/Rechte), Verschlüsselung (TLS, ggf. at rest), Löschkonzept, ggf. Abstimmung mit dem Datenschutzbeauftragten, Privacy by Default.", "", { difficulty: 3 }),
    ],
    cards: [
      card("Präsentation – Aufbau", "Einstieg → Ausgangslage/Ziel → Planung/Entscheidungen → Umsetzung → QS/Ergebnis → Fazit", true),
      card("Zeitregel", "Präsentation max. 15 Min., zusammen mit Fachgespräch max. 30 Min.", true),
      card("Antwortstrategie Fachgespräch", "Verstehen (ggf. nachfragen) → strukturiert antworten → Bezug zum Projekt → ehrlich bei Unsicherheit"),
      card("Typische Fachgesprächsfragen", "Warum diese Technik? Wie getestet? Alternativen? Sicherheit/Datenschutz? Was würden Sie anders machen?"),
    ],
  },
];
