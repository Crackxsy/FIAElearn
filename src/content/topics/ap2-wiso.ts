import { card, q, type TopicSeed } from "../types";

const RECHT_HINWEIS =
  "\n\n> Hinweis: Gesetze und Werte (z. B. Beitragssätze) ändern sich. Für die Prüfung gilt der Stand des aktuellen Prüfungskatalogs – im Zweifel nachschlagen.";

export const AP2_WISO: TopicSeed[] = [
  {
    id: "wiso-ausbildung",
    part: "AP2_WISO",
    lf: "LF01",
    title: "Berufsausbildung (BBiG & JArbSchG)",
    summary: "Duales System, Ausbildungsvertrag, Probezeit, Kündigung, Pflichten, Jugendarbeitsschutz.",
    weight: 5,
    hours: 3,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["L08", "O06"],
      keyPoints: [
        "Probezeit in der Ausbildung: mindestens 1, höchstens 4 Monate.",
        "In der Probezeit: Kündigung jederzeit ohne Frist, schriftlich.",
        "Nach der Probezeit: Azubi kann mit 4 Wochen Frist kündigen, wenn er die Ausbildung aufgibt oder wechselt; sonst nur aus wichtigem Grund.",
        "Ausbildung endet mit Bekanntgabe des Prüfungsergebnisses (bestanden) bzw. Ablauf der Ausbildungszeit.",
        "JArbSchG: Jugendliche max. 8 h/Tag, 40 h/Woche, 5-Tage-Woche.",
      ],
      content: `## Duales System
Ausbildung an zwei Lernorten: **Betrieb** (Ausbildungsordnung, Ausbildungsrahmenplan) und **Berufsschule** (KMK-Rahmenlehrplan). Zuständige Stelle für Prüfungen und Vertragsverzeichnis: die **IHK** (hier: SIHK zu Hagen).

## Ausbildungsvertrag (BBiG)
Mindestinhalte u. a.: Art und Ziel der Ausbildung, Beginn und Dauer, Ausbildungsstätte, tägliche Arbeitszeit, **Probezeit**, Vergütung, Urlaub, Kündigungsvoraussetzungen.

- **Probezeit**: 1 bis 4 Monate
- **Kündigung in der Probezeit**: jederzeit, ohne Frist, ohne Grund – schriftlich
- **Nach der Probezeit**:
  - aus wichtigem Grund fristlos (beide Seiten, mit Angabe der Gründe)
  - durch den Azubi mit **4 Wochen** Frist bei Berufsaufgabe/-wechsel
- **Ende**: mit Bestehen der Abschlussprüfung (Bekanntgabe des Ergebnisses) oder Ablauf der Ausbildungszeit. Bei Nichtbestehen auf Verlangen Verlängerung bis zur nächsten Wiederholungsprüfung, höchstens ein Jahr.

## Pflichten
| Ausbildender | Auszubildender |
|---|---|
| Ausbildungsziel vermitteln | Lernpflicht |
| Ausbildungsmittel kostenlos | Weisungen befolgen |
| Freistellung für Berufsschule/Prüfung | Berufsschule besuchen |
| Vergütung zahlen | Ausbildungsnachweis führen |
| Zeugnis ausstellen | Betriebsgeheimnisse wahren |

## Jugendarbeitsschutzgesetz (unter 18)
- max. **8 Stunden/Tag**, **40 Stunden/Woche**, 5-Tage-Woche
- Ruhepausen: über 4,5 bis 6 h → 30 Min., über 6 h → 60 Min.
- Urlaub nach Alter: unter 16 → 30, unter 17 → 27, unter 18 → 25 Werktage
- ärztliche Erstuntersuchung vor Beginn` + RECHT_HINWEIS,
    },
    questions: [
      q.single("Wie lange darf die Probezeit in einem Ausbildungsverhältnis höchstens dauern?", ["1 Monat", "3 Monate", "4 Monate", "6 Monate"], 2, "§ 20 BBiG: mindestens 1, höchstens 4 Monate.", { placement: true, difficulty: 1 }),
      q.single("Ein Azubi möchte nach der Probezeit die Ausbildung abbrechen und studieren. Was gilt?", ["Er kann nicht kündigen.", "Er kann mit einer Frist von 4 Wochen schriftlich kündigen.", "Er muss 3 Monate Frist einhalten.", "Nur der Betrieb kann kündigen."], 1, "Bei Aufgabe der Berufsausbildung: 4 Wochen Frist, schriftlich."),
      q.single("Wann endet das Ausbildungsverhältnis bei bestandener Abschlussprüfung vor Ablauf der Vertragszeit?", ["Am letzten Tag des Vertrags", "Mit Bekanntgabe des Prüfungsergebnisses", "Nach der Zeugnisübergabe der Berufsschule", "Nach 3 Monaten Übergang"], 1, "§ 21 BBiG: mit Bekanntgabe des Ergebnisses durch den Prüfungsausschuss."),
      q.multi("Welche Pflichten hat der Auszubildende?", ["Berufsschule besuchen", "Ausbildungsnachweis führen", "Ausbildungsmittel selbst bezahlen", "Betriebsgeheimnisse wahren"], [0, 1, 3], "Ausbildungsmittel stellt der Betrieb kostenlos."),
      q.single("Wie viele Stunden darf ein 17-jähriger Auszubildender pro Woche höchstens arbeiten?", ["35", "38,5", "40", "48"], 2, "JArbSchG: max. 40 Stunden pro Woche, 8 Stunden pro Tag.", { placement: true }),
      q.single("Wer ist zuständige Stelle für die Abschlussprüfung von Fachinformatikern in Hagen?", ["Die Berufsschule", "Die Bundesagentur für Arbeit", "Die Südwestfälische IHK zu Hagen (SIHK)", "Das Gewerbeamt"], 2, "Die IHK ist zuständige Stelle für IHK-Berufe."),
    ],
    cards: [
      card("Probezeit Ausbildung", "Mindestens 1, höchstens 4 Monate. Kündigung jederzeit ohne Frist (schriftlich).", true),
      card("Kündigung nach Probezeit (Azubi)", "4 Wochen Frist bei Berufsaufgabe/-wechsel, sonst nur aus wichtigem Grund.", true),
      card("Ende der Ausbildung", "Mit Bekanntgabe des bestandenen Prüfungsergebnisses oder Ablauf der Ausbildungszeit."),
      card("JArbSchG Arbeitszeit", "Max. 8 h/Tag, 40 h/Woche, 5 Tage/Woche", true),
      card("Duales System", "Betrieb (Ausbildungsordnung) + Berufsschule (Rahmenlehrplan)"),
    ],
  },
  {
    id: "wiso-arbeitsrecht",
    part: "AP2_WISO",
    lf: "LF01",
    title: "Arbeitsrecht, Tarifvertrag & Mitbestimmung",
    summary: "Arbeitsvertrag, Kündigung und Kündigungsschutz, Arbeitszeit, Urlaub, Tarifverträge, Betriebsrat, JAV.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O06"],
      keyPoints: [
        "Gesetzliche Grundkündigungsfrist: 4 Wochen zum 15. oder zum Monatsende (§ 622 BGB).",
        "Kündigung muss schriftlich erfolgen (§ 623 BGB) – E-Mail reicht nicht.",
        "KSchG: nach 6 Monaten Betriebszugehörigkeit in Betrieben mit mehr als 10 Arbeitnehmern.",
        "Betriebsrat ab 5 ständigen wahlberechtigten Arbeitnehmern, Amtszeit 4 Jahre; JAV Amtszeit 2 Jahre.",
        "Tarifautonomie: Gewerkschaften und Arbeitgeberverbände verhandeln ohne Staat.",
      ],
      content: `## Arbeitsvertrag
Pflichten des Arbeitnehmers: Arbeitspflicht, Treuepflicht, Verschwiegenheit. Arbeitgeber: Vergütung, Fürsorge, Beschäftigung, Zeugnis.

**Arbeitszeitgesetz**: werktäglich 8 h, bis 10 h, wenn im Durchschnitt (6 Monate/24 Wochen) 8 h nicht überschritten werden. **Ruhezeit 11 h**. Pausen: über 6 h → 30 Min., über 9 h → 45 Min.

**Bundesurlaubsgesetz**: mindestens **24 Werktage** (6-Tage-Woche) = **20 Arbeitstage** bei 5-Tage-Woche.

## Kündigung
- **Ordentlich**: Grundfrist **4 Wochen zum 15. oder Monatsende**; in vereinbarter Probezeit (max. 6 Monate) 2 Wochen. Für den Arbeitgeber verlängern sich die Fristen mit der Betriebszugehörigkeit.
- **Außerordentlich (fristlos)**: wichtiger Grund, innerhalb von 2 Wochen nach Kenntnis.
- **Schriftform** zwingend.
- **Kündigungsschutzgesetz**: Kündigung muss sozial gerechtfertigt sein – personen-, verhaltens- (meist nach **Abmahnung**) oder betriebsbedingt (Sozialauswahl).
- **Besonderer Kündigungsschutz**: Schwangere, Elternzeit, Schwerbehinderte, Betriebsrats-/JAV-Mitglieder, Azubis nach der Probezeit.
- **Betriebsrat** ist vor jeder Kündigung anzuhören.

## Tarifvertrag
- **Tarifparteien**: Gewerkschaften und Arbeitgeberverbände (oder einzelner Arbeitgeber)
- **Manteltarifvertrag**: Rahmen (Arbeitszeit, Urlaub, Kündigungsfristen) – längere Laufzeit
- **Lohn-/Gehaltstarifvertrag**: Höhe der Vergütung
- **Friedenspflicht** während der Laufzeit; **Günstigkeitsprinzip**: Abweichungen nur zugunsten der Arbeitnehmer
- Arbeitskampf: Verhandlung → Scheitern → Urabstimmung → Streik/Aussperrung → Schlichtung → Einigung

## Betriebsverfassungsgesetz
- **Betriebsrat**: ab 5 ständigen wahlberechtigten Arbeitnehmern (3 davon wählbar), Amtszeit 4 Jahre
- **JAV** (Jugend- und Auszubildendenvertretung): ab 5 Arbeitnehmern unter 18 bzw. Azubis unter 25, Amtszeit 2 Jahre
- Rechte: **Mitbestimmung** (z. B. Arbeitszeitlage, Urlaubsgrundsätze, Einführung technischer Überwachung), **Mitwirkung** (Anhörung bei Kündigung), **Information**
- **Betriebsvereinbarung**: Vertrag zwischen Arbeitgeber und Betriebsrat` + RECHT_HINWEIS,
    },
    questions: [
      q.single("Wie lautet die gesetzliche Grundkündigungsfrist für Arbeitnehmer?", ["2 Wochen", "4 Wochen zum 15. oder zum Monatsende", "1 Monat zum Quartalsende", "3 Monate"], 1, "§ 622 Abs. 1 BGB.", { placement: true }),
      q.single("Eine Kündigung wird per E-Mail ausgesprochen. Ist sie wirksam?", ["Ja, E-Mail ist ausreichend.", "Nein, Kündigungen bedürfen der Schriftform (eigenhändige Unterschrift).", "Ja, wenn die E-Mail signiert ist.", "Nur bei Azubis."], 1, "§ 623 BGB: Schriftform, elektronische Form ausgeschlossen."),
      q.single("Ab welcher Betriebsgröße kann ein Betriebsrat gewählt werden?", ["ab 5 ständigen wahlberechtigten Arbeitnehmern", "ab 10 Arbeitnehmern", "ab 20 Arbeitnehmern", "ab 50 Arbeitnehmern"], 0, "§ 1 BetrVG: mindestens 5, davon 3 wählbar.", { placement: true }),
      q.single("Welcher Tarifvertrag regelt Arbeitszeit, Urlaub und Kündigungsfristen?", ["Lohntarifvertrag", "Manteltarifvertrag", "Betriebsvereinbarung", "Arbeitsvertrag"], 1, "Der Manteltarifvertrag regelt die allgemeinen Arbeitsbedingungen."),
      q.calc("Wie viele Urlaubstage stehen einem Erwachsenen bei einer 5-Tage-Woche gesetzlich mindestens zu?", 20, "24 Werktage (6-Tage-Woche) ÷ 6 × 5 = 20 Arbeitstage.", { unit: "Tage", tolerance: 0 }),
      q.multi("Wofür ist die Mitbestimmung des Betriebsrats vorgesehen?", ["Beginn und Ende der täglichen Arbeitszeit", "Einführung einer Software, die Leistung/Verhalten überwachen kann", "Wahl des Produktsortiments", "Aufstellung allgemeiner Urlaubsgrundsätze"], [0, 1, 3], "§ 87 BetrVG (soziale Angelegenheiten). Unternehmerische Entscheidungen wie das Sortiment sind nicht mitbestimmungspflichtig."),
      q.single("Was bedeutet Friedenspflicht?", ["Streiks sind immer verboten.", "Während der Laufzeit eines Tarifvertrags sind Arbeitskämpfe über die geregelten Inhalte unzulässig.", "Der Betriebsrat darf nicht streiken.", "Schlichter müssen neutral sein."], 1, "Friedenspflicht gilt während der Laufzeit."),
    ],
    cards: [
      card("Grundkündigungsfrist", "4 Wochen zum 15. oder zum Monatsende (§ 622 BGB); Probezeit: 2 Wochen", true),
      card("Schriftform Kündigung", "§ 623 BGB – eigenhändige Unterschrift, keine E-Mail.", true),
      card("Kündigungsschutzgesetz", "Gilt nach 6 Monaten in Betrieben mit > 10 AN; Kündigung muss sozial gerechtfertigt sein.", true),
      card("Betriebsrat / JAV", "BR ab 5 AN, 4 Jahre Amtszeit. JAV: ab 5 Jugendlichen/Azubis < 25, 2 Jahre."),
      card("Mantel- vs. Lohntarifvertrag", "Mantel: Rahmenbedingungen. Lohn/Gehalt: Vergütungshöhe."),
      card("Arbeitszeitgesetz", "8 h/Tag (bis 10 h mit Ausgleich), 11 h Ruhezeit, Pausen 30/45 Min."),
    ],
  },
  {
    id: "wiso-sozialversicherung",
    part: "AP2_WISO",
    lf: "LF01",
    title: "Sozialversicherung & Entgeltabrechnung",
    summary: "Fünf Zweige der Sozialversicherung, Träger, Finanzierung, Brutto-Netto-Rechnung, Steuerklassen.",
    weight: 4,
    hours: 2.5,
    difficulty: 2,
    lesson: {
      sources: ["O06"],
      keyPoints: [
        "Fünf Zweige: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung.",
        "Unfallversicherung zahlt allein der Arbeitgeber (Träger: Berufsgenossenschaften).",
        "Rentenversicherung: Deutsche Rentenversicherung; Arbeitslosenversicherung: Bundesagentur für Arbeit.",
        "Netto = Brutto − Steuern (Lohnsteuer, ggf. Soli, Kirchensteuer) − AN-Anteile Sozialversicherung.",
        "Prinzipien: Versicherungspflicht, Solidaritätsprinzip, Umlageverfahren (Generationenvertrag).",
      ],
      content: `## Die fünf Säulen
| Zweig | Träger | Finanzierung |
|---|---|---|
| Krankenversicherung | Krankenkassen | AG + AN (+ Zusatzbeitrag) |
| Pflegeversicherung | Pflegekassen | AG + AN (Zuschlag für Kinderlose trägt AN) |
| Rentenversicherung | Deutsche Rentenversicherung | AG + AN je zur Hälfte |
| Arbeitslosenversicherung | Bundesagentur für Arbeit | AG + AN je zur Hälfte |
| Unfallversicherung | Berufsgenossenschaften | **nur AG** |

Die gesetzliche Unfallversicherung deckt Arbeitsunfälle, **Wegeunfälle** und Berufskrankheiten.

## Prinzipien
- **Solidaritätsprinzip**: Beiträge nach Einkommen, Leistungen nach Bedarf
- **Umlageverfahren / Generationenvertrag**: Erwerbstätige finanzieren aktuelle Renten
- **Beitragsbemessungsgrenze**: Einkommen darüber ist beitragsfrei

## Von Brutto zu Netto
\`\`\`
  Bruttoentgelt
− Lohnsteuer (nach Steuerklasse)
− Solidaritätszuschlag (nur noch bei hohen Einkommen)
− Kirchensteuer (8 % bzw. 9 % der Lohnsteuer, nur Mitglieder)
− AN-Anteil Sozialversicherung (KV, PV, RV, AV)
= Nettoentgelt
\`\`\`

## Steuerklassen
I ledig · II alleinerziehend · III verheiratet (höheres Einkommen) · IV verheiratet (gleiches Einkommen) · V Partner von III · VI Zweitjob` + RECHT_HINWEIS,
    },
    questions: [
      q.single("Welcher Zweig der Sozialversicherung wird allein vom Arbeitgeber finanziert?", ["Krankenversicherung", "Rentenversicherung", "Unfallversicherung", "Arbeitslosenversicherung"], 2, "Die gesetzliche Unfallversicherung zahlt der Arbeitgeber allein.", { placement: true, difficulty: 1 }),
      q.single("Wer ist Träger der gesetzlichen Unfallversicherung für Betriebe?", ["Krankenkassen", "Berufsgenossenschaften", "Bundesagentur für Arbeit", "Finanzamt"], 1, "Berufsgenossenschaften (bzw. Unfallkassen im öffentlichen Dienst)."),
      q.single("Ein Azubi verunglückt auf dem direkten Weg zur Berufsschule. Welche Versicherung ist zuständig?", ["Private Haftpflicht", "Gesetzliche Unfallversicherung", "Krankenversicherung allein", "Keine"], 1, "Wegeunfälle sind durch die gesetzliche Unfallversicherung abgedeckt."),
      q.single("Welche Steuerklasse hat ein lediger Arbeitnehmer ohne Kinder?", ["I", "II", "III", "V"], 0, "Steuerklasse I: ledig."),
      q.multi("Welche Abzüge können vom Bruttolohn eines Arbeitnehmers einbehalten werden?", ["Lohnsteuer", "Arbeitgeberanteil zur Rentenversicherung", "Arbeitnehmeranteil zur Krankenversicherung", "Kirchensteuer (bei Kirchenmitgliedschaft)"], [0, 2, 3], "Der Arbeitgeberanteil wird zusätzlich gezahlt, nicht vom Brutto abgezogen."),
      q.single("Was beschreibt das Umlageverfahren der Rentenversicherung?", ["Jeder spart für sich selbst an.", "Die Beiträge der heutigen Erwerbstätigen finanzieren die heutigen Renten.", "Der Staat zahlt alle Renten aus Steuern.", "Renten werden an der Börse angelegt."], 1, "Generationenvertrag."),
    ],
    cards: [
      card("5 Säulen der Sozialversicherung", "Kranken-, Pflege-, Renten-, Arbeitslosen-, Unfallversicherung", true),
      card("Unfallversicherung", "Nur AG zahlt; Träger: Berufsgenossenschaften; inkl. Wegeunfälle", true),
      card("Brutto → Netto", "Brutto − Lohnsteuer − Soli − Kirchensteuer − AN-Anteile SV = Netto"),
      card("Träger RV / AV", "Rentenversicherung: Deutsche Rentenversicherung. Arbeitslosenversicherung: Bundesagentur für Arbeit."),
      card("Solidaritätsprinzip", "Beiträge nach Leistungsfähigkeit, Leistungen nach Bedarf."),
    ],
  },
  {
    id: "wiso-unternehmensformen",
    part: "AP2_WISO",
    lf: "LF01",
    title: "Unternehmensformen, Kaufmann & Vollmachten",
    summary: "Einzelunternehmen, GbR, OHG, KG, GmbH, UG, AG; Haftung, Handelsregister, Prokura und Handlungsvollmacht.",
    weight: 4,
    hours: 3,
    difficulty: 3,
    lesson: {
      sources: ["O06", "L07"],
      keyPoints: [
        "OHG: alle Gesellschafter haften unbeschränkt, unmittelbar und gesamtschuldnerisch.",
        "KG: Komplementär haftet unbeschränkt, Kommanditist nur bis zur Höhe seiner Einlage.",
        "GmbH: Mindeststammkapital 25.000 €; AG: Grundkapital 50.000 €; UG ab 1 €.",
        "Prokura: im Handelsregister eingetragen, weitreichend, Zeichen „ppa.“.",
        "Handelsregister Abteilung A: Einzelkaufleute/Personengesellschaften; B: Kapitalgesellschaften.",
      ],
      content: `## Überblick
| Form | Gründer | Kapital | Haftung | Leitung |
|---|---|---|---|---|
| Einzelunternehmen | 1 | keins vorgeschrieben | unbeschränkt, persönlich | Inhaber |
| GbR | mind. 2 | keins | Gesellschafter persönlich, gesamtschuldnerisch | gemeinsam |
| OHG | mind. 2 | keins | alle unbeschränkt | alle Gesellschafter |
| KG | mind. 2 | keins | Komplementär voll, Kommanditist bis Einlage | Komplementär |
| GmbH | mind. 1 | 25.000 € | Gesellschaftsvermögen | Geschäftsführer |
| UG (haftungsbeschränkt) | mind. 1 | ab 1 € (Rücklagenpflicht) | Gesellschaftsvermögen | Geschäftsführer |
| AG | mind. 1 | 50.000 € | Gesellschaftsvermögen | Vorstand |

**Organe der AG**: Vorstand (leitet), Aufsichtsrat (kontrolliert), Hauptversammlung (Aktionäre). **GmbH**: Geschäftsführer, Gesellschafterversammlung.

## Kaufmann (HGB)
- **Istkaufmann**: betreibt ein Handelsgewerbe (kaufmännische Einrichtung erforderlich)
- **Kannkaufmann**: Kleingewerbe, freiwillige Eintragung
- **Formkaufmann**: GmbH, AG – kraft Rechtsform

**Handelsregister** (öffentlich, beim Amtsgericht): Abteilung **A** (Einzelkaufleute, OHG, KG), Abteilung **B** (GmbH, AG).

## Vollmachten
- **Prokura** (§§ 48 ff. HGB): nur vom Kaufmann erteilt, Eintragung ins Handelsregister, berechtigt zu fast allen Geschäften – **nicht**: Grundstücke verkaufen/belasten (ohne besondere Befugnis), Bilanz/Steuererklärung unterschreiben, Insolvenz beantragen, Prokura erteilen. Unterschrift: **ppa.**
- **Handlungsvollmacht** (§ 54 HGB): allgemeine, Art- oder Einzelvollmacht; Unterschrift **i. V.** (Einzelvollmacht oft **i. A.**)`,
    },
    questions: [
      q.single("Wie haftet ein Kommanditist einer KG?", ["Unbeschränkt mit seinem Privatvermögen", "Nur bis zur Höhe seiner Einlage", "Gar nicht", "Gemeinsam mit dem Staat"], 1, "Der Kommanditist haftet beschränkt auf seine Einlage, der Komplementär unbeschränkt.", { placement: true }),
      q.single("Wie hoch ist das Mindeststammkapital einer GmbH?", ["1 €", "12.500 €", "25.000 €", "50.000 €"], 2, "25.000 € (bei Gründung mind. die Hälfte eingezahlt).", { difficulty: 1 }),
      q.single("Welches Organ kontrolliert den Vorstand einer AG?", ["Hauptversammlung", "Aufsichtsrat", "Betriebsrat", "Geschäftsführer"], 1, "Der Aufsichtsrat überwacht den Vorstand."),
      q.single("Was darf ein Prokurist ohne besondere Befugnis NICHT?", ["Mitarbeiter einstellen", "Kredite aufnehmen", "Grundstücke des Unternehmens verkaufen", "Waren einkaufen"], 2, "Veräußerung/Belastung von Grundstücken erfordert eine besondere Befugnis."),
      q.single("In welche Abteilung des Handelsregisters wird eine GmbH eingetragen?", ["Abteilung A", "Abteilung B", "Gar nicht", "Abteilung C"], 1, "Kapitalgesellschaften → Abteilung B."),
      q.single("Mit welchem Zusatz unterschreibt ein Prokurist?", ["i. A.", "i. V.", "ppa.", "gez."], 2, "ppa. = per procura."),
    ],
    cards: [
      card("Haftung KG", "Komplementär: unbeschränkt. Kommanditist: bis zur Einlage.", true),
      card("Mindestkapital", "GmbH 25.000 €, AG 50.000 €, UG ab 1 €", true),
      card("Organe der AG", "Vorstand (Leitung), Aufsichtsrat (Kontrolle), Hauptversammlung (Aktionäre)", true),
      card("Prokura", "Im Handelsregister eingetragen, umfassend; nicht: Grundstücke veräußern/belasten, Bilanz unterschreiben, Insolvenz, Prokura erteilen. „ppa.“"),
      card("Handelsregister A/B", "A: Einzelkaufleute & Personengesellschaften. B: Kapitalgesellschaften."),
    ],
  },
  {
    id: "wiso-vertragsrecht",
    part: "AP2_WISO",
    lf: "LF02",
    title: "Rechtsgeschäfte & Kaufvertrag",
    summary: "Rechts- und Geschäftsfähigkeit, Willenserklärungen, Kaufvertrag, Mängel, Lieferungs- und Zahlungsverzug, Verjährung.",
    weight: 4,
    hours: 3.5,
    difficulty: 3,
    lesson: {
      sources: ["O06", "L07"],
      keyPoints: [
        "Geschäftsfähigkeit: unter 7 geschäftsunfähig, 7–17 beschränkt, ab 18 voll.",
        "Kaufvertrag = zwei übereinstimmende Willenserklärungen (Antrag + Annahme).",
        "Gewährleistung beim Kauf: 2 Jahre; vorrangig Nacherfüllung (Nachbesserung oder Ersatzlieferung).",
        "Zweiseitiger Handelskauf: Mängel unverzüglich rügen (§ 377 HGB).",
        "Regelmäßige Verjährung: 3 Jahre, Beginn zum Jahresende.",
      ],
      content: `## Rechts- und Geschäftsfähigkeit
- **Rechtsfähigkeit**: Träger von Rechten und Pflichten – natürliche Personen ab Geburt, juristische Personen (GmbH, AG, eingetragener Verein) ab Eintragung.
- **Geschäftsfähigkeit**:
  - unter 7: geschäftsunfähig (Verträge nichtig)
  - 7 bis 17: beschränkt – Zustimmung der Eltern nötig, Ausnahme **Taschengeldparagraf** (§ 110 BGB) und rechtlich lediglich vorteilhafte Geschäfte
  - ab 18: voll geschäftsfähig

## Kaufvertrag
**Antrag** (Angebot) + **Annahme** = Vertrag. Eine Anfrage ist unverbindlich; ein Angebot bindet, außer mit Freizeichnungsklausel („freibleibend“, „solange Vorrat reicht“). Werbung ist kein Angebot, sondern Aufforderung zur Abgabe eines Angebots.

**Verpflichtungsgeschäft** (Vertrag) vs. **Erfüllungsgeschäft** (Übergabe der Ware, Zahlung).

## Mangelhafte Lieferung (Schlechtleistung)
Mängelarten: Qualitätsmangel, Falschlieferung, Zuweniglieferung, Montagemangel/fehlerhafte Anleitung, Rechtsmangel.

Rechte des Käufers:
1. **vorrangig Nacherfüllung**: Nachbesserung (Reparatur) oder Ersatzlieferung – der Käufer wählt
2. **nachrangig** (wenn Nacherfüllung scheitert): Rücktritt, Minderung, Schadensersatz

Gewährleistung: **2 Jahre** ab Übergabe. Beim zweiseitigen Handelskauf muss **unverzüglich** gerügt werden.

## Lieferungsverzug
Voraussetzungen: Fälligkeit, **Mahnung** (entbehrlich bei kalendermäßig bestimmtem Termin/Fixkauf), Verschulden. Rechte: auf Lieferung bestehen + Verzugsschaden, nach angemessener Nachfrist Rücktritt/Schadensersatz statt Leistung.

## Zahlungsverzug
Spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung (bei Verbrauchern nur bei Hinweis darauf). Verzugszinsen: Basiszins + 5 Prozentpunkte (Verbraucher) bzw. + 9 Prozentpunkte (Unternehmen).

## Verjährung
Regelmäßig **3 Jahre**, beginnend mit dem **Schluss des Jahres**, in dem der Anspruch entstanden ist.` + RECHT_HINWEIS,
    },
    questions: [
      q.single("Ein 15-Jähriger kauft von seinem Taschengeld ein Videospiel für 30 €. Ist der Vertrag wirksam?", ["Nein, er ist geschäftsunfähig.", "Ja, nach dem Taschengeldparagrafen, wenn er mit eigenen Mitteln bezahlt.", "Nur mit Zustimmung der IHK.", "Nur bei Ratenzahlung."], 1, "§ 110 BGB: Erfüllung mit Mitteln, die zur freien Verfügung überlassen wurden.", { placement: true }),
      q.single("Ein Kunde erhält einen defekten Monitor. Was kann er ZUERST verlangen?", ["Sofortigen Rücktritt", "Minderung", "Nacherfüllung (Reparatur oder Ersatz)", "Schadensersatz ohne Frist"], 2, "Vorrang der Nacherfüllung.", { placement: true }),
      q.single("Wann verjährt ein am 15. März 2026 entstandener Zahlungsanspruch regelmäßig?", ["15. März 2029", "31. Dezember 2028", "31. Dezember 2029", "31. Dezember 2026"], 2, "Beginn am 31.12.2026, drei Jahre → Ablauf 31.12.2029."),
      q.single("Wie kommt ein Kaufvertrag zustande?", ["Durch eine Anfrage", "Durch zwei übereinstimmende Willenserklärungen", "Durch Werbung im Internet", "Durch Lieferung ohne Bestellung"], 1, "Antrag und Annahme."),
      q.multi("Welche Voraussetzungen hat der Lieferungsverzug grundsätzlich?", ["Fälligkeit der Lieferung", "Mahnung (sofern nicht entbehrlich)", "Verschulden des Lieferers", "Einverständnis der IHK"], [0, 1, 2], "Fälligkeit, Mahnung, Verschulden."),
      q.single("Ab welchem Alter ist man voll geschäftsfähig?", ["7", "14", "16", "18"], 3, "Mit Vollendung des 18. Lebensjahres.", { difficulty: 1 }),
    ],
    cards: [
      card("Geschäftsfähigkeit", "< 7 geschäftsunfähig, 7–17 beschränkt, ab 18 voll", true),
      card("Rechte bei Mängeln", "Vorrangig Nacherfüllung; danach Rücktritt, Minderung, Schadensersatz", true),
      card("Regelmäßige Verjährung", "3 Jahre ab Ende des Jahres der Entstehung", true),
      card("Taschengeldparagraf", "§ 110 BGB: Verträge Minderjähriger wirksam, wenn mit überlassenen Mitteln bezahlt."),
      card("Lieferungsverzug", "Voraussetzungen: Fälligkeit, Mahnung (ggf. entbehrlich), Verschulden"),
    ],
  },
  {
    id: "wiso-wirtschaft",
    part: "AP2_WISO",
    lf: "LF01",
    title: "Markt, Wirtschaftspolitik & Kennzahlen",
    summary: "Ökonomisches Prinzip, Marktformen, Preisbildung, Konjunktur, magisches Viereck, Rentabilität, Nachhaltigkeit.",
    weight: 4,
    hours: 3.5,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["L07", "O06"],
      keyPoints: [
        "Maximalprinzip: mit gegebenen Mitteln maximaler Erfolg; Minimalprinzip: Ziel mit minimalen Mitteln.",
        "Marktformen: Polypol (viele), Oligopol (wenige), Monopol (einer).",
        "Gleichgewichtspreis: Angebot = Nachfrage.",
        "Magisches Viereck: Preisstabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges Wachstum.",
        "Eigenkapitalrentabilität = Gewinn ÷ Eigenkapital × 100.",
      ],
      content: `## Grundbegriffe
- **Bedürfnisse** (Existenz, Kultur, Luxus) → mit Kaufkraft = **Bedarf** → am Markt = **Nachfrage**
- **Ökonomisches Prinzip**: **Maximalprinzip** (gegebener Einsatz, maximaler Ertrag) bzw. **Minimalprinzip** (gegebenes Ziel, minimaler Einsatz)
- **Produktionsfaktoren** (VWL): Arbeit, Boden, Kapital (+ Wissen)

## Markt & Preis
| Anbieter | viele | wenige | einer |
|---|---|---|---|
| Marktform | Polypol | Oligopol | Monopol |

Steigt der Preis, sinkt die Nachfrage und das Angebot steigt. Im Schnittpunkt liegt der **Gleichgewichtspreis**. Angebotsüberhang → Preis sinkt; Nachfrageüberhang → Preis steigt.

**Soziale Marktwirtschaft**: freier Markt + staatlicher Ordnungsrahmen und sozialer Ausgleich (Kartellamt, Sozialversicherung, Verbraucherschutz).

## Konjunktur
Aufschwung (Expansion) → Hochkonjunktur (Boom) → Abschwung (Rezession) → Tiefstand (Depression).

**Stabilitätsgesetz – magisches Viereck**:
1. Stabilität des Preisniveaus
2. hoher Beschäftigungsstand
3. außenwirtschaftliches Gleichgewicht
4. stetiges und angemessenes Wirtschaftswachstum

„Magisch“, weil sich nicht alle Ziele gleichzeitig erreichen lassen. Erweiterung zum **Sechseck**: gerechte Einkommensverteilung, Umweltschutz.

**Inflation**: anhaltender Anstieg des Preisniveaus, Kaufkraftverlust. Die **EZB** steuert v. a. über Leitzinsen.

## Kennzahlen
- **Produktivität** = Ausbringungsmenge ÷ Einsatzmenge
- **Wirtschaftlichkeit** = Ertrag ÷ Aufwand (> 1 = wirtschaftlich)
- **Eigenkapitalrentabilität** = Gewinn ÷ Eigenkapital × 100
- **Umsatzrentabilität** = Gewinn ÷ Umsatz × 100

## Nachhaltigkeit
Drei Dimensionen: **ökologisch, ökonomisch, sozial**. In der IT z. B. Green IT, energieeffiziente Hardware, Refurbished-Geräte, fachgerechtes Recycling.`,
    },
    questions: [
      q.single("Ein Unternehmen will mit einem festen Budget von 10.000 € möglichst viele Kunden erreichen. Welches Prinzip?", ["Minimalprinzip", "Maximalprinzip", "Solidaritätsprinzip", "Günstigkeitsprinzip"], 1, "Gegebene Mittel, maximaler Erfolg → Maximalprinzip.", { placement: true, difficulty: 1 }),
      q.single("Welche Marktform liegt vor, wenn wenige große Anbieter vielen Nachfragern gegenüberstehen (z. B. Mobilfunk)?", ["Polypol", "Oligopol", "Monopol", "Duopson"], 1, "Wenige Anbieter → (Angebots-)Oligopol."),
      q.calc("Gewinn 60.000 €, Eigenkapital 400.000 €. Wie hoch ist die Eigenkapitalrentabilität in %?", 15, "60.000 ÷ 400.000 × 100 = 15 %.", { unit: "%", tolerance: 0.01, placement: true }),
      q.multi("Welche Ziele gehören zum magischen Viereck?", ["Stabilität des Preisniveaus", "Hoher Beschäftigungsstand", "Ausgeglichener Staatshaushalt", "Außenwirtschaftliches Gleichgewicht", "Stetiges und angemessenes Wachstum"], [0, 1, 3, 4], "Der ausgeglichene Staatshaushalt gehört nicht zum Viereck."),
      q.single("Was passiert bei einem Nachfrageüberhang typischerweise mit dem Preis?", ["Er sinkt.", "Er steigt.", "Er bleibt gleich.", "Er wird staatlich festgelegt."], 1, "Knappheit → Preis steigt."),
      q.calc("Ein Team erstellt mit 4 Entwicklern in 2 Wochen 48 Story Points. Wie hoch ist die Produktivität in Story Points pro Entwickler und Woche?", 6, "48 ÷ (4 × 2) = 6.", { tolerance: 0 }),
      q.single("Wie heißt die Konjunkturphase mit sinkender Produktion und steigender Arbeitslosigkeit?", ["Boom", "Expansion", "Rezession", "Hochkonjunktur"], 2, "Abschwung/Rezession."),
    ],
    cards: [
      card("Ökonomisches Prinzip", "Maximal: gegebene Mittel → max. Erfolg. Minimal: gegebenes Ziel → min. Mittel.", true),
      card("Magisches Viereck", "Preisstabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges Wachstum", true),
      card("Marktformen", "Polypol (viele), Oligopol (wenige), Monopol (ein Anbieter)"),
      card("Eigenkapitalrentabilität", "Gewinn ÷ Eigenkapital × 100", true),
      card("Konjunkturphasen", "Aufschwung → Boom → Abschwung/Rezession → Depression/Tiefstand"),
      card("Nachhaltigkeit", "Ökologisch, ökonomisch, sozial"),
    ],
  },
];
