import { card, q, type TopicSeed } from "../types";

export const AP1_ARBEITSPLATZ: TopicSeed[] = [
  {
    id: "ap1-anforderungen",
    part: "AP1",
    lf: "LF02",
    title: "Kundenanforderungen ermitteln",
    summary: "Kundengespräch, Lastenheft/Pflichtenheft, Muss- und Kann-Kriterien, funktionale und nichtfunktionale Anforderungen.",
    weight: 5,
    hours: 3,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["O02", "O11"],
      keyPoints: [
        "Lastenheft = Auftraggeber beschreibt WAS und WOFÜR.",
        "Pflichtenheft = Auftragnehmer beschreibt WIE und WOMIT.",
        "Muss-Kriterien sind Pflicht, Kann-Kriterien sind wünschenswert, Abgrenzungskriterien sind ausdrücklich nicht enthalten.",
        "Nichtfunktionale Anforderungen beschreiben Qualität: Performance, Sicherheit, Ergonomie, Wartbarkeit.",
        "Offene W-Fragen im Kundengespräch, am Ende Zusammenfassung und Bestätigung.",
      ],
      content: `## Worum geht es?
In der AP1 startet fast jede Aufgabe mit einer **Situation**: Ein Kunde oder eine Abteilung braucht einen neuen Arbeitsplatz, ein Gerät oder eine Software. Du musst aus dem Text herauslesen, **was wirklich gebraucht wird**.

## Kundengespräch
- **Offene Fragen** (W-Fragen) sammeln Informationen: *Wofür nutzen Sie den Rechner? Welche Programme?*
- **Geschlossene Fragen** bestätigen Details: *Reichen 16 GB RAM?*
- **Aktives Zuhören**: zusammenfassen, nachfragen, Missverständnisse klären.
- Ergebnis schriftlich festhalten und vom Kunden bestätigen lassen.

## Lastenheft vs. Pflichtenheft
| | Lastenheft | Pflichtenheft |
|---|---|---|
| Erstellt von | Auftraggeber (Kunde) | Auftragnehmer |
| Inhalt | Was und wofür? | Wie und womit? |
| Zeitpunkt | vor dem Angebot | nach Auftrag, Basis der Umsetzung |

## Anforderungsarten
- **Funktional**: Was soll das System tun? (*Der Nutzer kann Rechnungen als PDF exportieren.*)
- **Nichtfunktional**: Wie gut? (*Export in unter 2 Sekunden*, Datenschutz, Barrierefreiheit, Ergonomie)
- **Muss / Kann / Abgrenzung**: Priorisierung, damit das Angebot vergleichbar und das Projekt beherrschbar bleibt.

## Prüfungstipp
Lies die Situationsbeschreibung zweimal und markiere Zahlen, Nutzergruppen und Einschränkungen (Budget, Termine, Datenschutz). Viele Punkte gibt es dafür, Anforderungen **aus dem Text** zu begründen.`,
    },
    questions: [
      q.single("Wer erstellt üblicherweise das Lastenheft?", ["Der Auftragnehmer", "Der Auftraggeber", "Die IHK", "Der Datenschutzbeauftragte"], 1, "Das Lastenheft beschreibt die Anforderungen aus Sicht des Auftraggebers (Was/Wofür).", { placement: true, difficulty: 1, sources: ["O11"] }),
      q.single("Welche Aussage beschreibt das Pflichtenheft am besten?", ["Sammlung der Kundenwünsche ohne Lösung", "Beschreibung, wie und womit der Auftragnehmer die Anforderungen umsetzt", "Vertrag über die Bezahlung", "Protokoll der Abnahme"], 1, "Das Pflichtenheft konkretisiert das Lastenheft aus Sicht des Auftragnehmers: Wie und womit wird umgesetzt?"),
      q.multi("Welche Anforderungen sind nichtfunktional?", ["Die Anwendung startet in unter 3 Sekunden.", "Der Nutzer kann Kunden anlegen.", "Die Oberfläche ist mit Screenreadern bedienbar.", "Rechnungen können gedruckt werden.", "Passwörter werden gehasht gespeichert."], [0, 2, 4], "Nichtfunktionale Anforderungen beschreiben Qualitätseigenschaften (Performance, Barrierefreiheit, Sicherheit), nicht die Funktion selbst.", { placement: true }),
      q.single("Ein Kunde sagt: „Ein zweiter Monitor wäre schön, ist aber kein Muss.“ Wie ordnest du das ein?", ["Muss-Kriterium", "Kann-Kriterium", "Abgrenzungskriterium", "Nichtfunktionale Anforderung"], 1, "Wünschenswert, aber nicht zwingend → Kann-Kriterium."),
      q.single("Welche Frage ist eine offene Frage?", ["Brauchen Sie einen Laptop?", "Reichen Ihnen 8 GB RAM?", "Welche Programme nutzen Sie täglich?", "Ist ein Drucker vorhanden?"], 2, "Offene Fragen (W-Fragen) lassen sich nicht mit Ja/Nein beantworten und liefern mehr Informationen."),
      q.open("Nenne drei Informationen, die du im Kundengespräch für einen neuen Büroarbeitsplatz unbedingt erfragen musst, und begründe kurz.", "Z. B.: 1) Einsatzzweck/Anwendungen (bestimmt CPU/RAM/Grafik), 2) Budget (begrenzt Auswahl, Angebote vergleichbar), 3) Mobilität (Laptop vs. Desktop), 4) vorhandene Infrastruktur/Peripherie (Kompatibilität, Docking, Netzwerk), 5) Datenschutz-/Sicherheitsanforderungen, 6) Termin der Bereitstellung.", "Bewerte dich selbst: Hast du drei sinnvolle Punkte mit Begründung genannt?", { difficulty: 2 }),
    ],
    cards: [
      card("Lastenheft", "Vom Auftraggeber erstellt. Beschreibt WAS und WOFÜR (Anforderungen aus Kundensicht).", true),
      card("Pflichtenheft", "Vom Auftragnehmer erstellt. Beschreibt WIE und WOMIT die Anforderungen umgesetzt werden.", true),
      card("Muss-/Kann-/Abgrenzungskriterien", "Muss = zwingend, Kann = wünschenswert, Abgrenzung = ausdrücklich nicht Teil des Auftrags.", true),
      card("Funktionale vs. nichtfunktionale Anforderung", "Funktional: was das System tut. Nichtfunktional: wie gut (Performance, Sicherheit, Ergonomie, Wartbarkeit)."),
      card("Aktives Zuhören", "Zusammenfassen, nachfragen, paraphrasieren – Missverständnisse vermeiden und dem Kunden zeigen, dass man ihn versteht."),
    ],
  },
  {
    id: "ap1-hardware",
    part: "AP1",
    lf: "LF02",
    title: "Hardware auswählen & Arbeitsplatz",
    summary: "CPU, RAM, Speicher, Schnittstellen, Monitore, Ergonomie, Energieverbrauch, USV.",
    weight: 5,
    hours: 4,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["O02", "O11"],
      keyPoints: [
        "SSD (NVMe) ist deutlich schneller als SATA-SSD, diese schneller als HDD.",
        "RAM-Bedarf hängt von den Anwendungen ab: Büro ~16 GB, Entwicklung/VMs 32 GB+.",
        "Energiekosten = Leistung (kW) × Stunden × Preis pro kWh.",
        "USV-Klassen: Offline (VFD), Line-Interactive (VI), Online/Doppelwandler (VFI).",
        "Bildschirmarbeitsplatz: Arbeitsstättenverordnung (Anhang 6), blendfrei, ergonomisch einstellbar.",
      ],
      content: `## Komponenten
- **CPU**: Kerne/Threads, Takt, Cache. Mehr Kerne helfen bei parallelen Aufgaben (Kompilieren, VMs).
- **RAM**: Arbeitsspeicher, flüchtig. Zu wenig RAM → Auslagerung → langsam.
- **Massenspeicher**: HDD (günstig, langsam, mechanisch), SATA-SSD (~550 MB/s), NVMe-SSD über PCIe (mehrere GB/s).
- **Grafik**: integriert reicht fürs Büro; CAD/Video/KI → dedizierte GPU.
- **Schnittstellen**: USB-C/Thunderbolt (Daten, Bild, Strom), HDMI/DisplayPort, RJ45 (Ethernet), WLAN (Wi-Fi 6 = 802.11ax).

## Monitor & Ergonomie
Auflösung (z. B. 2560×1440), Diagonale, Panel (IPS: gute Farben/Blickwinkel), entspiegelt, höhenverstellbar. Für Bildschirmarbeitsplätze gilt die **Arbeitsstättenverordnung** (Anhang 6): ergonomische Gestaltung, Blendfreiheit, ausreichend Platz.

## Energie & Nachhaltigkeit
**Energiekosten = Leistung in kW × Betriebsstunden × Preis je kWh**

Beispiel: 120 W, 8 h/Tag, 220 Tage, 0,30 €/kWh → 0,12 × 8 × 220 × 0,30 = **63,36 €** pro Jahr.

Label wie *Energy Star*, *TCO Certified*, *Blauer Engel* helfen bei der Auswahl. Betrachte die **Gesamtkosten (TCO)**: Anschaffung + Betrieb + Wartung + Entsorgung.

## USV (Unterbrechungsfreie Stromversorgung)
| Klasse | Typ | Schutz |
|---|---|---|
| VFD | Offline/Standby | Stromausfall, kurze Umschaltzeit |
| VI | Line-Interactive | zusätzlich Spannungsschwankungen |
| VFI | Online/Doppelwandler | dauerhaft unabhängig, für Server |`,
    },
    questions: [
      q.single("Welcher Speicher bietet bei aktuellen PCs typischerweise die höchste Übertragungsrate?", ["HDD mit 7.200 U/min", "SATA-SSD", "NVMe-SSD (PCIe)", "USB-2.0-Stick"], 2, "NVMe-SSDs sind über PCIe angebunden und erreichen mehrere GB/s – SATA ist auf ca. 600 MB/s begrenzt.", { placement: true, difficulty: 1 }),
      q.calc("Ein PC verbraucht im Durchschnitt 80 W. Er läuft 9 Stunden pro Tag an 220 Arbeitstagen. Der Strompreis beträgt 0,32 €/kWh. Wie hoch sind die jährlichen Energiekosten in Euro?", 50.69, "0,08 kW × 9 h × 220 = 158,4 kWh; 158,4 kWh × 0,32 €/kWh = 50,688 € ≈ 50,69 €.", { unit: "€", tolerance: 0.02, steps: ["80 W = 0,08 kW", "0,08 × 9 × 220 = 158,4 kWh", "158,4 × 0,32 = 50,69 €"], placement: true }),
      q.single("Welche USV-Klasse arbeitet als Doppelwandler und versorgt die Last dauerhaft über den Wechselrichter?", ["VFD", "VI", "VFI", "VFT"], 2, "VFI (Voltage and Frequency Independent) = Online-USV/Doppelwandler – höchster Schutz, typisch für Server."),
      q.multi("Welche Schnittstellen können ein Bildsignal übertragen?", ["DisplayPort", "HDMI", "USB-C mit DisplayPort Alt Mode", "RJ45", "SATA"], [0, 1, 2], "DisplayPort, HDMI und USB-C (mit Alt Mode/Thunderbolt) übertragen Bild. RJ45 ist Netzwerk, SATA ist für Laufwerke."),
      q.single("Ein Entwickler arbeitet mit mehreren virtuellen Maschinen und Docker-Containern. Was ist am wichtigsten?", ["Hoher Monitor-Kontrast", "Viel Arbeitsspeicher und mehrere CPU-Kerne", "Eine dedizierte Soundkarte", "Ein optisches Laufwerk"], 1, "VMs und Container brauchen vor allem RAM und CPU-Kerne."),
      q.calc("Ein Monitor verbraucht 25 W im Betrieb und 0,3 W im Standby. Er ist 2.000 h/Jahr an und 6.760 h/Jahr im Standby. Wie viele kWh verbraucht er pro Jahr? (2 Nachkommastellen)", 52.03, "Betrieb: 0,025 kW × 2.000 h = 50 kWh. Standby: 0,0003 kW × 6.760 h = 2,028 kWh. Summe 52,03 kWh.", { unit: "kWh", tolerance: 0.02 }),
      q.short("Wie heißt die Verordnung, die in Deutschland Anforderungen an Bildschirmarbeitsplätze regelt? (Abkürzung)", ["ArbStättV", "Arbeitsstättenverordnung", "ArbStaettV"], "Die Arbeitsstättenverordnung (ArbStättV) regelt in Anhang 6 Bildschirmarbeitsplätze."),
    ],
    cards: [
      card("Energiekosten-Formel", "Leistung (kW) × Stunden × Preis pro kWh. Watt durch 1000 teilen!", true),
      card("USV-Klassen", "VFD = Offline, VI = Line-Interactive, VFI = Online/Doppelwandler (höchster Schutz).", true),
      card("TCO", "Total Cost of Ownership: Anschaffung + Betrieb (Strom, Wartung, Support) + Entsorgung."),
      card("NVMe vs. SATA", "NVMe nutzt PCIe-Lanes → mehrere GB/s. SATA-SSD max. ~550–600 MB/s."),
      card("Wi-Fi 6", "IEEE 802.11ax. Wi-Fi 5 = 802.11ac, Wi-Fi 4 = 802.11n."),
    ],
  },
  {
    id: "ap1-software-lizenzen",
    part: "AP1",
    lf: "LF02",
    title: "Betriebssysteme, Software & Lizenzen",
    summary: "Lizenzmodelle (OEM, Volumen, Abo, Open Source), Cloud-Modelle (IaaS/PaaS/SaaS), Betriebssystemwahl.",
    weight: 4,
    hours: 3,
    difficulty: 2,
    lesson: {
      sources: ["O02", "O11"],
      keyPoints: [
        "OEM-Lizenz ist an die Hardware gebunden.",
        "GPL = Copyleft: Weitergabe veränderter Software nur unter GPL. MIT/BSD = freizügig.",
        "Freeware ist kostenlos, aber nicht unbedingt quelloffen.",
        "SaaS: Software als Dienst (z. B. Webmail); PaaS: Plattform; IaaS: virtuelle Infrastruktur.",
        "Lizenzen nach Nutzer (Named User), Gerät (Device) oder gleichzeitiger Nutzung (Concurrent).",
      ],
      content: `## Lizenzmodelle
- **Einzelplatz / Retail**: frei übertragbar, teurer.
- **OEM**: mit Hardware verkauft und an diese gebunden.
- **Volumenlizenz**: für Unternehmen, zentral verwaltet.
- **Abonnement / Subscription**: laufende Gebühr, Updates inklusive (z. B. Microsoft 365).
- **Named User / Device / Concurrent**: pro Person, pro Gerät oder pro gleichzeitiger Nutzung.
- **CAL** (Client Access License): Zugriffslizenz auf Serverdienste.

## Freie Software
| Begriff | Bedeutung |
|---|---|
| Freeware | kostenlos, Quellcode meist nicht verfügbar |
| Shareware | kostenlos testen, danach zahlen |
| Open Source | Quellcode offen, Lizenz regelt Nutzung |
| GPL | Copyleft – Ableitungen müssen auch GPL sein |
| MIT / Apache / BSD | freizügig, auch in proprietärer Software nutzbar |

## Cloud-Servicemodelle
- **IaaS**: virtuelle Server, Speicher, Netz – du verwaltest das OS.
- **PaaS**: Laufzeitumgebung/Plattform – du lieferst nur die Anwendung.
- **SaaS**: fertige Anwendung im Browser.

Bereitstellung: **Public**, **Private**, **Hybrid**, **Community Cloud**. Datenschutz beachten (Serverstandort, Auftragsverarbeitungsvertrag).

## Betriebssystem auswählen
Kriterien: Kompatibilität der Anwendungen, Verwaltung (Domäne, MDM), Sicherheit & Updates (Support-Ende!), Kosten, Know-how im Unternehmen.`,
    },
    questions: [
      q.single("Welche Lizenz ist an die Hardware gebunden, mit der sie verkauft wurde?", ["Volumenlizenz", "OEM-Lizenz", "GPL", "Concurrent-Lizenz"], 1, "OEM-Lizenzen (Original Equipment Manufacturer) sind an das Gerät gebunden.", { placement: true, difficulty: 1 }),
      q.single("Ein Unternehmen ändert eine GPL-lizenzierte Bibliothek und verkauft das Produkt weiter. Was gilt?", ["Der Quellcode der Änderungen darf geheim bleiben.", "Das abgeleitete Werk muss ebenfalls unter der GPL weitergegeben werden.", "GPL-Software darf nicht verkauft werden.", "Nur die Binärdatei muss bereitgestellt werden."], 1, "Die GPL ist eine Copyleft-Lizenz: Abgeleitete Werke müssen bei Weitergabe unter derselben Lizenz inkl. Quellcode verfügbar sein. Verkaufen ist erlaubt."),
      q.single("Ein Kunde nutzt ein Webmail-Programm im Browser, ohne Server zu betreiben. Welches Cloud-Modell ist das?", ["IaaS", "PaaS", "SaaS", "On-Premises"], 2, "Fertige Anwendung als Dienst → Software as a Service.", { placement: true }),
      q.multi("Welche Aussagen zu Freeware und Open Source sind richtig?", ["Freeware ist immer quelloffen.", "Open-Source-Software kann kommerziell genutzt werden.", "Freeware ist kostenlos nutzbar.", "Open Source bedeutet automatisch Public Domain."], [1, 2], "Freeware = kostenlos, aber meist ohne Quellcode. Open Source erlaubt kommerzielle Nutzung, die Lizenz regelt die Bedingungen."),
      q.single("Bei welchem Modell zahlt man für die maximale Anzahl gleichzeitiger Nutzer?", ["Named User", "Device", "Concurrent User", "OEM"], 2, "Concurrent (Floating) Licensing zählt gleichzeitige Nutzung."),
      q.single("Welches Cloud-Modell passt, wenn ein Entwicklerteam nur seine Webanwendung hochladen will, ohne sich um Betriebssystem-Updates zu kümmern?", ["IaaS", "PaaS", "SaaS", "Private Cloud"], 1, "PaaS stellt die Laufzeitumgebung bereit; der Kunde kümmert sich nur um die Anwendung."),
    ],
    cards: [
      card("IaaS / PaaS / SaaS", "IaaS = Infrastruktur (VMs), PaaS = Plattform/Laufzeit, SaaS = fertige Anwendung.", true),
      card("OEM-Lizenz", "Mit Hardware verkauft, an das Gerät gebunden, meist günstiger.", true),
      card("Copyleft (GPL)", "Abgeleitete Werke müssen bei Weitergabe unter derselben Lizenz stehen (inkl. Quellcode)."),
      card("CAL", "Client Access License – Lizenz für den Zugriff von Nutzern/Geräten auf einen Server-Dienst."),
      card("Freeware vs. Shareware", "Freeware: dauerhaft kostenlos. Shareware: Testphase, danach kostenpflichtig."),
    ],
  },
  {
    id: "ap1-wirtschaftlichkeit",
    part: "AP1",
    lf: "LF02",
    title: "Angebote vergleichen & Wirtschaftlichkeit",
    summary: "Bezugskalkulation, Rabatt/Skonto, Nutzwertanalyse, Kauf vs. Leasing, Amortisation.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O02", "L07"],
      keyPoints: [
        "Listenpreis − Rabatt = Zieleinkaufspreis − Skonto = Bareinkaufspreis + Bezugskosten = Bezugspreis.",
        "Skonto wird auf den Betrag NACH Rabatt berechnet.",
        "Nutzwertanalyse: Gewichtung (Summe 100 %) × Punkte je Kriterium, summieren, höchster Nutzwert gewinnt.",
        "Amortisationszeit = Investition ÷ jährliche Ersparnis.",
        "Qualitative Kriterien (Service, Support) gehören auch in den Vergleich.",
      ],
      content: `## Bezugskalkulation (Angebotsvergleich)
\`\`\`
  Listeneinkaufspreis
− Liefererrabatt
= Zieleinkaufspreis
− Liefererskonto
= Bareinkaufspreis
+ Bezugskosten (Versand, Verpackung)
= Bezugspreis (Einstandspreis)
\`\`\`
**Wichtig**: Rabatt bezieht sich auf den Listenpreis, Skonto auf den Zieleinkaufspreis.

Beispiel: 1.200 € Liste, 10 % Rabatt, 2 % Skonto, 25 € Versand → 1.080 € → 1.058,40 € → **1.083,40 €**.

## Nutzwertanalyse
1. Kriterien festlegen (Preis, Leistung, Garantie, Support …)
2. Gewichtung vergeben (Summe = 100 %)
3. Jedes Angebot pro Kriterium bewerten (z. B. 1–10 Punkte)
4. Punkte × Gewicht, summieren → höchster Nutzwert gewinnt

## Kauf, Miete, Leasing
- **Kauf**: Eigentum, hohe Anfangsinvestition, Abschreibung.
- **Leasing**: monatliche Raten, Liquidität bleibt erhalten, oft Service inklusive, kein Eigentum.
- **Miete**: kurzfristig, flexibel, meist teurer.

## Amortisation
**Amortisationszeit = Investition ÷ jährliche Einsparung (Rückfluss)**

Kostenvergleich mehrerer Varianten: Fixkosten + variable Kosten × Menge. Der **Break-even** (kritische Menge) liegt dort, wo beide Kosten gleich sind.`,
    },
    questions: [
      q.calc("Listenpreis 2.500 €, Rabatt 12 %, Skonto 3 %, Bezugskosten 40 €. Wie hoch ist der Bezugspreis in €?", 2174, "2.500 € − 12 % Rabatt = 2.200 €; − 3 % Skonto = 2.134 €; + 40 € Bezugskosten = 2.174 €.", { unit: "€", tolerance: 0.01, steps: ["Rabatt: 2.500 × 0,88 = 2.200,00 €", "Skonto: 2.200 × 0,97 = 2.134,00 €", "Bezugskosten: 2.134 + 40 = 2.174,00 €"], placement: true }),
      q.single("Worauf wird der Skonto berechnet?", ["Auf den Listenpreis", "Auf den Zieleinkaufspreis (nach Rabatt)", "Auf den Bezugspreis", "Auf die Bezugskosten"], 1, "Skonto wird auf den Zieleinkaufspreis, also den Betrag nach Rabatt, gewährt."),
      q.calc("Nutzwertanalyse: Kriterium Preis (Gewicht 40 %) 8 Punkte, Leistung (35 %) 6 Punkte, Support (25 %) 9 Punkte. Wie hoch ist der Nutzwert?", 7.55, "0,4 × 8 + 0,35 × 6 + 0,25 × 9 = 3,2 + 2,1 + 2,25 = 7,55.", { tolerance: 0.01 }),
      q.calc("Eine neue Software kostet 18.000 € und spart jährlich 7.200 € Personalkosten. Nach wie vielen Jahren hat sie sich amortisiert?", 2.5, "18.000 € ÷ 7.200 €/Jahr = 2,5 Jahre.", { unit: "Jahre", tolerance: 0.01 }),
      q.calc("Variante A: 600 € fix + 0,05 € pro Seite. Variante B: 200 € fix + 0,09 € pro Seite. Ab wie vielen Seiten ist A günstiger? (kritische Menge)", 10000, "600 + 0,05x = 200 + 0,09x → 400 = 0,04x → x = 10.000 Seiten. Ab mehr als 10.000 Seiten ist A günstiger.", { unit: "Seiten", tolerance: 1 }),
      q.multi("Welche Vorteile hat Leasing gegenüber Kauf?", ["Liquidität bleibt erhalten", "Man wird sofort Eigentümer", "Planbare monatliche Kosten", "Geräte lassen sich nach Laufzeit einfach erneuern"], [0, 2, 3], "Beim Leasing bleibt der Leasinggeber Eigentümer; Vorteile sind Liquidität, planbare Raten und einfache Erneuerung."),
      q.open("Warum reicht ein reiner Preisvergleich bei der Auswahl von IT-Hardware oft nicht aus? Nenne zwei Gründe.", "Qualitative Kriterien (Garantie, Support/Reaktionszeit, Lieferzeit, Kompatibilität, Energieverbrauch) beeinflussen die Gesamtkosten (TCO) und den Nutzen. Eine Nutzwertanalyse berücksichtigt diese gewichtet.", "", { difficulty: 2 }),
    ],
    cards: [
      card("Bezugskalkulation", "Liste − Rabatt = Ziel-EK − Skonto = Bar-EK + Bezugskosten = Bezugspreis", true),
      card("Nutzwertanalyse", "Kriterien gewichten (Summe 100 %), bewerten, Punkte × Gewicht summieren.", true),
      card("Amortisationszeit", "Investition ÷ jährliche Einsparung", true),
      card("Kritische Menge (Break-even)", "Menge, bei der zwei Kostenvarianten gleich teuer sind: Fix1 + var1·x = Fix2 + var2·x"),
      card("Skonto", "Preisnachlass für schnelle Zahlung innerhalb einer Frist, berechnet auf den Zieleinkaufspreis."),
    ],
  },
  {
    id: "ap1-zahlensysteme",
    part: "AP1",
    lf: "LF03",
    title: "Zahlensysteme, Einheiten & Übertragungszeit",
    summary: "Binär/Hex/Dezimal, Bit/Byte, SI- vs. IEC-Präfixe, Speicherbedarf und Übertragungsdauer berechnen.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O02", "L06"],
      keyPoints: [
        "1 Byte = 8 Bit. Übertragungsraten in Bit/s, Dateigrößen meist in Byte!",
        "kB = 1000 Byte (SI), KiB = 1024 Byte (IEC).",
        "Übertragungszeit = Datenmenge in Bit ÷ Datenrate in Bit/s.",
        "Bildgröße = Breite × Höhe × Farbtiefe (Bit) ÷ 8.",
        "Ein Hex-Zeichen = 4 Bit (Nibble), zwei Hex-Zeichen = 1 Byte.",
      ],
      content: `## Zahlensysteme
| Dezimal | Binär | Hex |
|---|---|---|
| 10 | 1010 | A |
| 15 | 1111 | F |
| 255 | 1111 1111 | FF |

**Binär → Dezimal**: Stellenwerte 128, 64, 32, 16, 8, 4, 2, 1 addieren.
**Hex → Binär**: jedes Hex-Zeichen in 4 Bit umwandeln (z. B. 3F = 0011 1111).

## Präfixe
| SI (dezimal) | IEC (binär) |
|---|---|
| 1 kB = 1.000 B | 1 KiB = 1.024 B |
| 1 MB = 1.000² B | 1 MiB = 1.024² B |
| 1 GB = 1.000³ B | 1 GiB = 1.024³ B |

Festplattenhersteller rechnen dezimal, Betriebssysteme oft binär – darum „fehlt“ scheinbar Speicher.

## Übertragungszeit
\`\`\`
t = Datenmenge (Bit) / Datenrate (Bit/s)
\`\`\`
Beispiel: 2 GiB über 100 Mbit/s → 2 × 1.024³ × 8 Bit ÷ 100.000.000 Bit/s ≈ **171,8 s**.

## Speicherbedarf
- **Bild**: 1920 × 1080 Pixel × 24 Bit ÷ 8 = 6.220.800 Byte ≈ 5,93 MiB
- **Audio (PCM)**: Abtastrate × Bittiefe × Kanäle × Sekunden ÷ 8
- **Video (unkomprimiert)**: Bildgröße × Bilder pro Sekunde × Sekunden

## Prüfungstipp
Schreibe immer Einheiten mit und rechne zuerst alles in Bit bzw. Byte um. Achte genau auf **MB vs. MiB** und **Bit vs. Byte**.`,
    },
    questions: [
      q.calc("Rechne die Binärzahl 1011 0110 in eine Dezimalzahl um.", 182, "128 + 32 + 16 + 4 + 2 = 182.", { placement: true, difficulty: 2 }),
      q.short("Wie lautet die Dezimalzahl 200 in hexadezimaler Schreibweise?", ["C8", "0xC8", "c8h", "C8h"], "200 ÷ 16 = 12 Rest 8 → C8.", { difficulty: 2 }),
      q.calc("Eine Datei ist 750 MiB groß und wird mit 50 Mbit/s übertragen. Wie viele Sekunden dauert die Übertragung? (gerundet auf 1 Nachkommastelle)", 125.8, "750 × 1.048.576 Byte × 8 = 6.291.456.000 Bit; ÷ 50.000.000 Bit/s = 125,83 s.", { unit: "s", tolerance: 0.1, steps: ["750 MiB = 750 × 1.024² Byte = 786.432.000 Byte", "× 8 = 6.291.456.000 Bit", "÷ 50.000.000 Bit/s ≈ 125,8 s"], placement: true }),
      q.calc("Wie viel Speicher (in MiB, 2 Nachkommastellen) benötigt ein unkomprimiertes Bild mit 3840 × 2160 Pixeln und 24 Bit Farbtiefe?", 23.73, "3840 × 2160 × 3 Byte = 24.883.200 Byte ÷ 1.048.576 = 23,73 MiB.", { unit: "MiB", tolerance: 0.01 }),
      q.calc("Eine Festplatte wird mit 2 TB beworben. Wie viele TiB sind das? (2 Nachkommastellen)", 1.82, "2 × 10¹² Byte ÷ 1.024⁴ (1.099.511.627.776) = 1,819 TiB ≈ 1,82 TiB.", { unit: "TiB", tolerance: 0.01 }),
      q.single("Wie viele Bit hat ein Hexadezimalzeichen?", ["2", "4", "8", "16"], 1, "Ein Hex-Zeichen hat 16 Zustände = 2⁴ → 4 Bit (Nibble)."),
      q.calc("Wie viele Sekunden dauert der Upload von 4,5 GB (dezimal) bei 40 Mbit/s Upload?", 900, "4,5 × 10⁹ Byte × 8 = 36 × 10⁹ Bit ÷ 40 × 10⁶ Bit/s = 900 s (= 15 Minuten).", { unit: "s", tolerance: 0.5 }),
      q.calc("Eine Audioaufnahme: 48.000 Hz, 16 Bit, Stereo, 3 Minuten, unkomprimiert. Wie groß ist die Datei in MB (dezimal, 2 Nachkommastellen)?", 34.56, "48.000 × 16 × 2 × 180 s = 276.480.000 Bit ÷ 8 = 34.560.000 Byte = 34,56 MB.", { unit: "MB", tolerance: 0.01 }),
    ],
    cards: [
      card("kB vs. KiB", "kB = 1.000 Byte (SI), KiB = 1.024 Byte (IEC).", true),
      card("Übertragungszeit", "Datenmenge in Bit ÷ Datenrate in Bit/s. Byte × 8 = Bit!", true),
      card("Bildgröße", "Breite × Höhe × Farbtiefe (Bit) ÷ 8 = Byte", true),
      card("Hex ↔ Binär", "Jedes Hex-Zeichen = 4 Bit. A=1010, F=1111, 3F=0011 1111."),
      card("Binäre Stellenwerte (8 Bit)", "128 64 32 16 8 4 2 1"),
      card("Audio-Speicherbedarf", "Abtastrate × Bittiefe × Kanäle × Sekunden ÷ 8 = Byte"),
    ],
  },
  {
    id: "ap1-projekt-unternehmen",
    part: "AP1",
    lf: "LF01",
    title: "Unternehmen, Organisation & Projektmanagement",
    summary: "Aufbau-/Ablauforganisation, Ziele, magisches Dreieck, Projektphasen, Gantt und Netzplan.",
    weight: 3,
    hours: 3,
    difficulty: 2,
    lesson: {
      sources: ["O11", "O02"],
      keyPoints: [
        "Projekt: einmalig, zeitlich begrenzt, klares Ziel, begrenzte Ressourcen (DIN 69901).",
        "Magisches Dreieck: Zeit, Kosten, Qualität/Leistung beeinflussen sich gegenseitig.",
        "Netzplan: Gesamtpuffer = SAZ − FAZ; kritischer Pfad hat Puffer 0.",
        "SMART-Ziele: spezifisch, messbar, attraktiv/akzeptiert, realistisch, terminiert.",
        "Organigramm-Formen: Einlinien-, Mehrlinien-, Stablinien-, Matrixorganisation.",
      ],
      content: `## Unternehmen & Organisation
- **Aufbauorganisation**: Wer ist wem unterstellt? (Organigramm)
  - Einliniensystem: klare Weisungswege, lange Dienstwege
  - Mehrliniensystem: mehrere Vorgesetzte, kurze Wege, Kompetenzkonflikte möglich
  - Stabliniensystem: Stabsstellen beraten ohne Weisungsbefugnis
  - Matrixorganisation: Funktions- und Projekt-/Produktleitung kreuzen sich
- **Ablauforganisation**: Wie laufen Prozesse ab? (z. B. Prozessdiagramm, EPK)
- **Unternehmensziele**: ökonomisch (Gewinn), ökologisch (Nachhaltigkeit), sozial (Arbeitsplätze).

## Projektmanagement
Ein **Projekt** ist einmalig, zeitlich begrenzt, hat ein konkretes Ziel und begrenzte Ressourcen.

**Magisches Dreieck**: Zeit – Kosten – Qualität. Wer eines verändert, beeinflusst die anderen.

**SMART-Ziele**: spezifisch, messbar, attraktiv, realistisch, terminiert.

## Phasen
Initialisierung → Planung → Durchführung → Kontrolle → Abschluss

## Netzplan
- **FAZ/FEZ**: frühester Anfang/frühestes Ende (Vorwärtsrechnung: FEZ = FAZ + Dauer)
- **SAZ/SEZ**: spätester Anfang/spätestes Ende (Rückwärtsrechnung: SAZ = SEZ − Dauer)
- **Gesamtpuffer GP = SAZ − FAZ**
- **Kritischer Pfad**: alle Vorgänge mit GP = 0 – Verzögerung verschiebt das Projektende.

Ein **Gantt-Diagramm** zeigt Vorgänge als Balken auf einer Zeitachse, gut für Übersicht und Meilensteine.`,
    },
    questions: [
      q.single("Was ist KEIN Merkmal eines Projekts?", ["Einmaligkeit", "Zeitliche Begrenzung", "Daueraufgabe ohne Ende", "Konkretes Ziel"], 2, "Projekte sind einmalig und zeitlich begrenzt; Daueraufgaben sind Linientätigkeiten.", { placement: true, difficulty: 1 }),
      q.calc("Ein Vorgang hat FAZ = 4, Dauer = 3, SAZ = 6. Wie groß ist der Gesamtpuffer?", 2, "GP = SAZ − FAZ = 6 − 4 = 2.", { unit: "Tage", tolerance: 0 }),
      q.single("Welche Aussage zum kritischen Pfad stimmt?", ["Er enthält alle Vorgänge mit dem größten Puffer.", "Verzögert sich ein Vorgang auf ihm, verschiebt sich das Projektende.", "Er ist immer der kürzeste Weg im Netzplan.", "Er enthält nur Meilensteine."], 1, "Auf dem kritischen Pfad haben die Vorgänge keinen Puffer (GP = 0)."),
      q.single("Welche Organisationsform hat Stellen, die beraten, aber keine Weisungsbefugnis haben?", ["Einliniensystem", "Stabliniensystem", "Mehrliniensystem", "Matrixorganisation"], 1, "Stabsstellen (z. B. Datenschutz, Rechtsabteilung) beraten die Linie ohne Weisungsrecht."),
      q.multi("Welche Größen bilden das magische Dreieck des Projektmanagements?", ["Zeit", "Kosten", "Qualität/Leistung", "Motivation", "Standort"], [0, 1, 2], "Zeit, Kosten und Qualität (Leistung/Umfang) stehen in Wechselwirkung."),
      q.open("Formuliere für die Einführung eines Ticketsystems ein SMART-Ziel.", "Beispiel: „Bis zum 31.03. sind alle 45 Mitarbeitenden der Verwaltung im neuen Ticketsystem angelegt, und mindestens 90 % der Supportanfragen werden darüber erfasst.“ – spezifisch, messbar (45, 90 %), realistisch, terminiert.", "", { difficulty: 2 }),
    ],
    cards: [
      card("Magisches Dreieck", "Zeit – Kosten – Qualität beeinflussen sich gegenseitig.", true),
      card("Gesamtpuffer", "GP = SAZ − FAZ (= SEZ − FEZ). Kritischer Pfad: GP = 0.", true),
      card("SMART", "Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert"),
      card("Stablinienorganisation", "Linienorganisation + Stabsstellen, die beraten, aber nicht weisungsbefugt sind."),
      card("Matrixorganisation", "Zwei Weisungsdimensionen (z. B. Fachabteilung + Projekt) – flexibel, aber Konfliktpotenzial."),
    ],
  },
  {
    id: "ap1-support",
    part: "AP1",
    lf: "LF06",
    title: "Support, Tickets & Kundenkommunikation",
    summary: "Support-Level, Incident/Problem, SLA, Ticketaufbau, Fehleranalyse, Übergabe und Einweisung.",
    weight: 4,
    hours: 2.5,
    difficulty: 2,
    lesson: {
      sources: ["O02", "O11"],
      keyPoints: [
        "1st Level nimmt an und löst Standardfälle, 2nd Level Spezialisten, 3rd Level Hersteller/Entwicklung.",
        "Incident = Störung schnell beheben; Problem = Ursache dauerhaft beseitigen.",
        "SLA legt Reaktions- und Lösungszeiten, Verfügbarkeit und Servicezeiten fest.",
        "Priorität = Auswirkung (Impact) × Dringlichkeit (Urgency).",
        "Eskalation: funktional (an Experten) oder hierarchisch (an Vorgesetzte).",
      ],
      content: `## Support-Organisation
- **Single Point of Contact (Service Desk)**: eine Anlaufstelle für alle Anfragen.
- **1st Level**: Annahme, Kategorisierung, Standardlösungen (Passwort zurücksetzen).
- **2nd Level**: Fachspezialisten, tiefere Analyse.
- **3rd Level**: Hersteller, Entwicklung.

## ITIL-Grundbegriffe
- **Incident**: ungeplante Unterbrechung → Service schnell wiederherstellen (ggf. Workaround).
- **Problem**: Ursache eines oder mehrerer Incidents → dauerhaft lösen.
- **Service Request**: Standardanfrage (neue Maus, Zugang).
- **Change**: geplante Änderung an der IT.

## SLA (Service Level Agreement)
Vereinbart z. B. Servicezeiten, **Reaktionszeit**, **Lösungszeit**, **Verfügbarkeit** (z. B. 99,5 %).

Verfügbarkeit 99,5 % pro Jahr → erlaubte Ausfallzeit: 0,005 × 365 × 24 h = **43,8 h**.

## Ticket
Ticketnummer, Melder, Datum, Kategorie, Priorität, Beschreibung, Status, Bearbeiter, Lösung, Historie.

## Kommunikation
Freundlich, verständlich, keine Fachbegriffe ohne Erklärung, aktiv zuhören. Bei Übergabe: **Einweisung** und **Abnahmeprotokoll**.

## Systematische Fehlersuche
1. Fehler beschreiben/reproduzieren 2. Ursachen eingrenzen (z. B. OSI von unten nach oben) 3. Lösung testen 4. dokumentieren.`,
    },
    questions: [
      q.single("Was ist das Ziel des Incident Managements?", ["Die Ursache dauerhaft beseitigen", "Den Service schnellstmöglich wiederherstellen", "Neue Hardware bestellen", "Den Change genehmigen"], 1, "Incident Management stellt den Betrieb schnell wieder her; die Ursachenanalyse ist Problem Management.", { placement: true }),
      q.calc("Ein SLA garantiert 99,9 % Verfügbarkeit (24/7, 365 Tage). Wie viele Stunden Ausfall sind pro Jahr maximal erlaubt? (1 Nachkommastelle)", 8.8, "0,001 × 365 × 24 h = 8,76 h ≈ 8,8 h.", { unit: "h", tolerance: 0.05 }),
      q.single("Ein Kollege leitet ein Ticket an einen Datenbank-Spezialisten weiter, weil er es fachlich nicht lösen kann. Wie nennt man das?", ["Hierarchische Eskalation", "Funktionale Eskalation", "Change Request", "Rollback"], 1, "Funktional = an höhere Fachkompetenz; hierarchisch = an höhere Entscheidungsebene."),
      q.multi("Welche Angaben gehören typischerweise in ein Ticket?", ["Eindeutige Ticketnummer", "Priorität", "Passwort des Nutzers", "Problembeschreibung", "Status"], [0, 1, 3, 4], "Passwörter gehören niemals in ein Ticket."),
      q.single("Wovon hängt die Priorität eines Incidents typischerweise ab?", ["Nur vom Wunsch des Melders", "Von Auswirkung und Dringlichkeit", "Von der Uhrzeit", "Vom Alter des Geräts"], 1, "Priorität = Impact × Urgency (Auswirkung und Dringlichkeit)."),
    ],
    cards: [
      card("Incident vs. Problem", "Incident: Störung schnell beheben. Problem: Ursache finden und dauerhaft beseitigen.", true),
      card("SLA", "Service Level Agreement: Reaktions-/Lösungszeit, Verfügbarkeit, Servicezeiten.", true),
      card("Support-Level", "1st: Annahme/Standard, 2nd: Spezialisten, 3rd: Hersteller/Entwicklung."),
      card("Funktionale vs. hierarchische Eskalation", "Funktional: an Experten. Hierarchisch: an Vorgesetzte/Management."),
      card("Ausfallzeit aus Verfügbarkeit", "(1 − Verfügbarkeit) × Gesamtzeit, z. B. 0,001 × 8.760 h = 8,76 h"),
    ],
  },
  {
    id: "ap1-qualitaetsmanagement",
    part: "AP1",
    lf: "LF02",
    title: "Qualitätsmanagement & Qualitätssicherung",
    summary: "QS vs. QM, ISO 9001 und Audits, QM-Grundsätze, PDCA, KVP/Kaizen, TQM, Zehnerregel, Werkzeuge, Kennzahlen, Abnahme und Übergabe.",
    weight: 3,
    hours: 2.5,
    difficulty: 2,
    lesson: {
      sources: ["O02", "L17", "O11"],
      keyPoints: [
        "QS ist Teil des QM: QS schafft Vertrauen, dass Anforderungen erfüllt werden; QM lenkt die ganze Organisation bezüglich Qualität.",
        "ISO 9001 legt Anforderungen an ein QM-System fest. Zertifizierung freiwillig durch eine akkreditierte Zertifizierungsstelle, i. d. R. 3 Jahre mit jährlichen Überwachungsaudits.",
        "PDCA: Plan – Do – Check – Act, danach beginnt der Zyklus von vorn (kontinuierliche Verbesserung).",
        "Sieben QM-Grundsätze: Kundenorientierung, Führung, Engagement von Personen, prozessorientierter Ansatz, Verbesserung, faktengestützte Entscheidungsfindung, Beziehungsmanagement.",
        "Zehnerregel: Je später ein Fehler entdeckt wird, desto teurer – pro Phase etwa Faktor 10.",
        "Übergabe absichern: Checkliste, Testprotokoll, Abnahmeprotokoll mit Unterschrift, Einweisung, Dokumentation.",
      ],
      content: `## Worum geht es?
Laut FIAusbV § 9 sollst du in der AP1 einen IT-Arbeitsplatz konfigurieren und testen und dabei die betrieblichen Vorgaben **zur Qualitätssicherung** einhalten – und die Leistungserbringung kontrollieren und protokollieren. Dahinter steht das **Qualitätsmanagement** des Unternehmens.

## Qualität, Qualitätssicherung, Qualitätsmanagement
- **Qualität** (nach ISO 9000): Grad, in dem ein Satz **inhärenter** Merkmale eines Objekts (Produkt, Dienstleistung, Prozess …) die Anforderungen erfüllt. Inhärent heißt: dem Objekt selbst innewohnend – der Preis gehört nicht dazu. Qualität heißt also *Anforderungen erfüllen* – nicht „möglichst teuer“.
- **Qualitätssicherung (QS)**: Teil des QM. Schafft durch Vorgaben, Prüfungen und Nachweise Vertrauen, dass die Anforderungen erfüllt werden (z. B. Checkliste, Testprotokoll, Abnahmeprotokoll).
- **Qualitätsmanagement (QM)**: alle abgestimmten Tätigkeiten zum Leiten und Lenken einer Organisation bezüglich Qualität: Qualitätspolitik und -ziele, Qualitätsplanung, -lenkung, -sicherung und -verbesserung.

**Konstruktive QS** vermeidet Fehler von vornherein (Standards, Vorlagen, standardisierte Images, Schulung). **Analytische QS** findet Fehler (Tests, Prüfungen, Messungen, Reviews).

## QM-System nach DIN EN ISO 9001
- Internationale Norm mit **Anforderungen an ein QM-System** – branchenunabhängig, für Organisationen jeder Größe. Sie legt fest, *was* geregelt sein muss, nicht *wie*.
- **Aktuelle Ausgabe**: ISO 9001:2026, veröffentlicht im September 2026. Zertifikate nach ISO 9001:2015 bleiben in einer Übergangsfrist bis 30. September 2029 gültig und müssen bis dahin umgestellt werden.
- **Prozessorientierter Ansatz**: Abläufe werden als Prozesse mit Eingaben, Ergebnissen, Verantwortlichen und Kennzahlen gesteuert, ergänzt um risikobasiertes Denken. Die Norm folgt dem PDCA-Zyklus.
- **Zertifizierung**: freiwillig. Sie erfolgt durch eine **akkreditierte Zertifizierungsstelle** (in Deutschland akkreditiert durch die DAkkS) – nicht durch die ISO selbst. Zertifiziert wird das QM-System, nicht ein einzelnes Produkt. Das Zertifikat gilt in der Regel 3 Jahre, mit jährlichen Überwachungsaudits und anschließender Rezertifizierung.
- **Audit** = systematische, unabhängige Prüfung, ob Vorgaben eingehalten werden und wirksam sind.

| Auditart | Wer prüft? |
|---|---|
| Internes Audit (First Party) | eigene Auditoren, z. B. QM-Beauftragte – von ISO 9001 gefordert |
| Lieferantenaudit (Second Party) | ein Kunde prüft seinen Lieferanten |
| Zertifizierungsaudit (Third Party) | unabhängige, akkreditierte Zertifizierungsstelle |

## Die sieben QM-Grundsätze (ISO 9000)
| Grundsatz | Im IT-Alltag |
|---|---|
| Kundenorientierung | Anforderungen der Anwender ermitteln und erfüllen |
| Führung | Leitung legt Qualitätspolitik und -ziele fest und lebt sie vor |
| Engagement von Personen | kompetente, beteiligte Mitarbeitende |
| Prozessorientierter Ansatz | Abläufe als Prozesse steuern, z. B. den Ticketprozess |
| Verbesserung | ständig besser werden (KVP) |
| Faktengestützte Entscheidungsfindung | Entscheidungen auf Daten und Kennzahlen stützen |
| Beziehungsmanagement | Beziehungen zu Lieferanten und Partnern pflegen |

## PDCA-Zyklus (Deming-Kreis)
1. **Plan**: Ist-Zustand und Ursachen analysieren, messbares Ziel und Maßnahmen planen.
2. **Do**: Maßnahme umsetzen – zunächst im kleinen Rahmen (Pilot).
3. **Check**: Ergebnisse messen und mit dem Ziel vergleichen.
4. **Act**: Bei Erfolg als Standard festlegen und ausrollen, sonst Ursachen analysieren und neu planen.

Danach beginnt der Zyklus von vorn – so entsteht kontinuierliche Verbesserung.

| Phase | Beispiel: Service Desk der Muster GmbH |
|---|---|
| Plan | Viele Tickets betreffen dieselben Standardprobleme. Ziel: Erstlösungsquote in drei Monaten von 60 % auf 75 % steigern. Maßnahme: Wissensdatenbank mit Standardlösungen. |
| Do | Wissensdatenbank vier Wochen lang im 1st Level einsetzen. |
| Check | Erstlösungsquote messen (z. B. 76 %) und mit dem Ziel vergleichen. |
| Act | Wissensdatenbank für alle verbindlich machen, Pflege im Ticketprozess verankern, nächstes Verbesserungsthema wählen. |

## KVP, Kaizen und TQM
- **Kaizen** (japanisch, etwa „Veränderung zum Besseren“): ständige Verbesserung in kleinen Schritten unter Beteiligung aller Mitarbeitenden.
- **KVP** (kontinuierlicher Verbesserungsprozess): die betriebliche Umsetzung dieser Idee, z. B. durch Verbesserungsvorschläge, Teamrunden, Lessons Learned. Vorgehen meist nach PDCA.
- Abgrenzung **Innovation**: großer, sprunghafter Wandel (z. B. Umstieg auf ein neues Ticketsystem) statt vieler kleiner Schritte.
- **TQM** (Total Quality Management): umfassender Ansatz – Qualität ist Unternehmensphilosophie und Aufgabe **aller** Mitarbeitenden und Bereiche, langfristig auf Kundenzufriedenheit ausgerichtet. Ein bekanntes TQM-Modell ist das EFQM-Modell. TQM geht über die Anforderungen der ISO 9001 hinaus.

## Fehlerkosten: Zehnerregel
Faustregel: Mit jeder Phase, die ein Fehler unentdeckt bleibt, steigen die Kosten für seine Behebung etwa um den **Faktor 10**.

| Fehler entdeckt … | relative Kosten |
|---|---|
| in Planung und Vorbereitung | 1 |
| bei Einrichtung und Test vor der Übergabe | 10 |
| beim Kunden nach der Übergabe | 100 |

Je nach Quelle werden mehr Stufen genannt (bis 1.000). Die Faktoren sind Größenordnungen, keine exakten Werte. Folgerung: früh prüfen lohnt sich.

## Werkzeuge
- **Checkliste**: nichts vergessen, jeder arbeitet gleich, Ergebnis ist nachweisbar.
- **Testprotokoll**: Testfall, erwartetes und tatsächliches Ergebnis, bestanden/nicht bestanden, Datum, Prüfer.
- **Abnahme-/Übergabeprotokoll**: Datum, Beteiligte, Lieferumfang (inkl. Seriennummern), Testergebnisse, festgestellte Mängel mit Frist, Unterschriften.
- **Ishikawa-Diagramm** (Ursache-Wirkungs- oder Fischgrätdiagramm): Das Problem steht am „Kopf“, mögliche Ursachen werden nach Kategorien gesammelt, z. B. 6M: Mensch, Maschine, Methode, Material, Mitwelt, Messung.

## Kennzahlen (KPIs)
Kennzahlen machen Qualität messbar – Grundlage für faktengestützte Entscheidungen.
- **Erstlösungsquote** = im Erstkontakt gelöste Tickets ÷ alle Tickets × 100 %
- **SLA-Erfüllungsquote** = fristgerecht gelöste Tickets ÷ alle Tickets × 100 %
- **Nacharbeitsquote** = Arbeitsplätze mit Nacharbeit ÷ übergebene Arbeitsplätze × 100 %
- **Kundenzufriedenheit**, z. B. per Kurzumfrage nach Ticketabschluss

Beispiel: 1.000 Tickets, davon 720 im Erstkontakt gelöst → Erstlösungsquote **72 %**.

## QS bei Einrichtung und Übergabe eines Arbeitsplatzes
1. **Vorbereitung**: Anforderungen (z. B. Pflichtenheft) als Prüfgrundlage, Checkliste und standardisiertes Image bereitstellen.
2. **Einrichtung**: nach Checkliste installieren und konfigurieren – Updates, Virenschutz, Lizenzen, Benutzerkonto mit passenden Rechten, Netzwerk und Drucker, Datensicherung, Inventarisierung.
3. **Test**: Funktionstests mit Testprotokoll (Anmeldung, Netzwerk, Drucken, Fachanwendungen).
4. **Abnahme**: Der Kunde prüft gegen die vereinbarten Anforderungen und bestätigt mit dem Abnahmeprotokoll; Mängel werden mit Frist festgehalten.
5. **Einweisung**: zielgruppengerecht in die Nutzung einweisen, Supportweg nennen, Teilnahme dokumentieren.
6. **Dokumentation**: Konfiguration, Inventar, Lizenzen und Protokolle ablegen – Passwörter nie im Klartext ins Protokoll.

Ist die Einrichtung als Werkvertrag vereinbart, hat die Abnahme rechtliche Folgen: Die Vergütung wird fällig, die Gefahr geht auf den Kunden über und die Verjährung der Mängelansprüche beginnt.

## Abgrenzung
Hier geht es um die Qualität von **Prozessen und Dienstleistungen**. Die Produktqualität von Software (Qualitätsmodell nach ISO/IEC 25010) findest du im Thema „Anforderungen, User Stories & Qualität“ (AP2).

## Prüfungstipp
Nenne in Situationsaufgaben **konkrete Maßnahmen** passend zum Fall (Checkliste, Testprotokoll, Abnahmeprotokoll, Einweisung) statt allgemeiner Floskeln – und übe, Tätigkeiten aus einem Beispiel den PDCA-Phasen zuzuordnen.`,
    },
    questions: [
      q.single("Welche Aussage zu Qualitätssicherung (QS) und Qualitätsmanagement (QM) ist richtig?", ["QS und QM sind dasselbe.", "QS ist ein Teil des QM.", "QM ist ein Teil der QS.", "QS betrifft nur Software, QM nur Hardware."], 1, "QM umfasst alle Tätigkeiten zum Leiten und Lenken einer Organisation bezüglich Qualität (Politik, Ziele, Planung, Lenkung, Sicherung, Verbesserung). Die QS ist ein Teil davon.", { placement: true, difficulty: 1 }),
      q.multi("Welche der folgenden Punkte gehören zu den sieben Grundsätzen des Qualitätsmanagements nach ISO 9000?", ["Kundenorientierung", "Führung", "Gewinnmaximierung", "Prozessorientierter Ansatz", "Faktengestützte Entscheidungsfindung", "Möglichst wenige Lieferanten"], [0, 1, 3, 4], "Die sieben Grundsätze: Kundenorientierung, Führung, Engagement von Personen, prozessorientierter Ansatz, Verbesserung, faktengestützte Entscheidungsfindung, Beziehungsmanagement. Gewinnmaximierung und „möglichst wenige Lieferanten“ gehören nicht dazu.", { sources: ["L17"] }),
      q.single("Die Muster GmbH möchte ihr Qualitätsmanagementsystem nach ISO 9001 zertifizieren lassen. Wer stellt das Zertifikat aus?", ["Die ISO in Genf", "Die zuständige IHK", "Eine akkreditierte Zertifizierungsstelle", "Der eigene QM-Beauftragte nach einem internen Audit"], 2, "Zertifikate stellen unabhängige, akkreditierte Zertifizierungsstellen aus (in Deutschland akkreditiert durch die DAkkS). Die ISO entwickelt nur die Norm; ein internes Audit ersetzt keine Zertifizierung.", { placement: true }),
      q.single("Die QM-Beauftragte der Muster GmbH prüft im Auftrag der Geschäftsleitung, ob die IT-Abteilung die festgelegten Abläufe zur Arbeitsplatzeinrichtung einhält. Um welche Art von Audit handelt es sich?", ["Internes Audit (First Party)", "Lieferantenaudit (Second Party)", "Zertifizierungsaudit (Third Party)", "Überwachungsaudit der Zertifizierungsstelle"], 0, "Die Organisation prüft sich selbst mit eigenem Personal → internes Audit. Second Party = Kunde prüft Lieferanten, Third Party = unabhängige Zertifizierungsstelle (auch deren Überwachungsaudits)."),
      q.short("Bringe die Schritte in die Reihenfolge des PDCA-Zyklus. Gib die Buchstaben ohne Leerzeichen an (z. B. ABCD).", ["CADB", "C-A-D-B", "C,A,D,B"], "C = Plan (analysieren, Ziel und Maßnahme planen), A = Do (Pilot), D = Check (Ergebnis mit Ziel vergleichen), B = Act (als Standard festlegen).", { scenario: "Bei der Muster GmbH gibt es viele Nachbesserungen an neu eingerichteten Notebooks. A) Eine neue Einrichtungs-Checkliste wird bei den nächsten zehn Notebooks testweise eingesetzt. B) Die Checkliste wird verbindlich in den Einrichtungsprozess aufgenommen. C) Die Nachbesserungen werden ausgewertet, das Ziel „Nacharbeitsquote halbieren“ festgelegt und die Checkliste entworfen. D) Die Nacharbeitsquote der zehn Pilotgeräte wird gemessen und mit dem Ziel verglichen.", difficulty: 2 }),
      q.single("Nach einem vierwöchigen Pilot vergleicht das Support-Team die gemessene Erstlösungsquote mit dem geplanten Zielwert. In welcher Phase des PDCA-Zyklus befindet es sich?", ["Plan", "Do", "Check", "Act"], 2, "Check: Ergebnisse messen und mit dem Ziel vergleichen. Erst in Act wird entschieden, ob die Maßnahme Standard wird oder ein neuer Zyklus nötig ist."),
      q.calc("Bei der Muster GmbH wird für einen neuen Arbeitsplatz die falsche Software-Edition eingeplant. Wäre der Fehler noch in der Planung aufgefallen, hätte die Korrektur 20 € gekostet. Wie hoch sind die Kosten nach der Zehnerregel, wenn der Fehler erst beim Kunden nach der Übergabe entdeckt wird? (Stufen: Planung → Einrichtung/Test → beim Kunden)", 2000, "Der Fehler bleibt zwei Phasen unentdeckt: 20 € × 10 × 10 = 2.000 €.", { unit: "€", tolerance: 1, steps: ["Planung: 20 €", "Einrichtung/Test: 20 € × 10 = 200 €", "Beim Kunden: 200 € × 10 = 2.000 €"], difficulty: 2 }),
      q.calc("Der Service Desk der Muster GmbH hat im Quartal 1.240 Tickets bearbeitet, davon wurden 868 bereits im Erstkontakt gelöst. Wie hoch ist die Erstlösungsquote in Prozent?", 70, "868 ÷ 1.240 = 0,7 → 70 %.", { unit: "%", tolerance: 0.1, steps: ["Erstlösungsquote = im Erstkontakt gelöste Tickets ÷ alle Tickets × 100 %", "868 ÷ 1.240 = 0,70", "0,70 × 100 % = 70 %"] }),
      q.single("Welche Aussage beschreibt den kontinuierlichen Verbesserungsprozess (KVP) am besten?", ["Einmalige große Umstellung durch externe Berater", "Ständige Verbesserung in kleinen Schritten unter Beteiligung der Mitarbeitenden", "Jährliche Prüfung durch die Zertifizierungsstelle", "Austausch aller Geräte nach Ablauf der Garantie"], 1, "KVP (nach dem japanischen Kaizen) setzt auf viele kleine, laufende Verbesserungen, an denen alle mitwirken. Große, sprunghafte Veränderungen nennt man Innovation."),
      q.single("Ein Team sammelt mögliche Ursachen für häufige Druckerstörungen und ordnet sie den Kategorien Mensch, Maschine, Methode, Material, Mitwelt und Messung zu. Welches Werkzeug nutzt es?", ["Gantt-Diagramm", "Ishikawa-Diagramm", "Nutzwertanalyse", "Netzplan"], 1, "Das Ishikawa-Diagramm (Ursache-Wirkungs- oder Fischgrätdiagramm) strukturiert mögliche Ursachen eines Problems, z. B. nach den 6M."),
      q.multi("Welche Angaben gehören in ein Abnahmeprotokoll bei der Übergabe eines Arbeitsplatzes?", ["Datum und Beteiligte", "Lieferumfang inkl. Seriennummern", "Ergebnisse der Funktionstests", "Festgestellte Mängel mit Frist zur Behebung", "Das Passwort des Benutzers im Klartext", "Unterschriften von Kunde und Auftragnehmer"], [0, 1, 2, 3, 5], "Das Abnahmeprotokoll dokumentiert die Übergabe verbindlich. Passwörter gehören niemals in ein Protokoll."),
      q.open("Du richtest für die Muster GmbH zwölf neue Büroarbeitsplätze ein. Beschreibe vier qualitätssichernde Maßnahmen von der Vorbereitung bis zur Übergabe.", "Z. B.:\n1) Checkliste für Einrichtung und Konfiguration (Updates, Virenschutz, Lizenzen, Benutzerrechte, Netzwerk/Drucker) – alle Plätze einheitlich, nichts wird vergessen.\n2) Standardisiertes Image bzw. Softwareverteilung – vermeidet Konfigurationsfehler (konstruktive QS).\n3) Funktionstest je Arbeitsplatz mit Testprotokoll (Anmeldung, Netzwerk, Drucken, Fachanwendungen) – Fehler vor der Übergabe finden (Zehnerregel).\n4) Abnahme mit dem Kunden und Abnahmeprotokoll (Lieferumfang, Seriennummern, Testergebnisse, Mängel mit Frist, Unterschriften).\n5) Zielgruppengerechte Einweisung der Mitarbeitenden, Teilnahme dokumentieren.\n6) Dokumentation von Konfiguration, Inventar und Lizenzen; Feedback auswerten (KVP).", "Bewerte dich selbst: Hast du vier konkrete, zur Situation passende Maßnahmen genannt und jeweils kurz begründet?", { difficulty: 2 }),
    ],
    cards: [
      card("Qualitätssicherung vs. Qualitätsmanagement", "QS: Teil des QM – schafft durch Vorgaben, Prüfungen und Nachweise Vertrauen, dass Anforderungen erfüllt werden. QM: alle Tätigkeiten zum Leiten und Lenken der Organisation bezüglich Qualität (Politik, Ziele, Planung, Lenkung, Sicherung, Verbesserung).", true),
      card("PDCA-Zyklus (Deming-Kreis)", "Plan: analysieren, Ziel und Maßnahme planen. Do: im kleinen Rahmen umsetzen. Check: Ergebnis mit Ziel vergleichen. Act: als Standard festlegen oder neu ansetzen – dann von vorn.", true),
      card("DIN EN ISO 9001", "Norm mit Anforderungen an ein QM-System, prozessorientiert. Zertifizierung freiwillig durch eine akkreditierte Zertifizierungsstelle; Zertifikat i. d. R. 3 Jahre gültig, jährliche Überwachungsaudits. Aktuelle Ausgabe: ISO 9001:2026 (Übergangsfrist für 2015er-Zertifikate bis 30.09.2029).", true),
      card("Sieben QM-Grundsätze (ISO 9000)", "Kundenorientierung, Führung, Engagement von Personen, prozessorientierter Ansatz, Verbesserung, faktengestützte Entscheidungsfindung, Beziehungsmanagement.", true),
      card("Zehnerregel (Fehlerkosten)", "Mit jeder Phase, die ein Fehler unentdeckt bleibt, steigen die Behebungskosten etwa um Faktor 10: Planung 1 → Einrichtung/Test 10 → beim Kunden 100.", true),
      card("Abnahmeprotokoll", "Datum, Beteiligte, Lieferumfang mit Seriennummern, Testergebnisse, Mängel mit Frist, Unterschriften. Dokumentiert die Übergabe verbindlich.", true),
      card("Internes vs. externes Audit", "Intern (First Party): eigene Auditoren prüfen die eigenen Prozesse. Extern: Kunde prüft Lieferanten (Second Party) oder Zertifizierungsstelle prüft (Third Party)."),
      card("KVP / Kaizen", "Kontinuierliche Verbesserung in kleinen Schritten, alle Mitarbeitenden beteiligt; Vorgehen meist nach PDCA. Gegenstück: Innovation (großer Sprung)."),
      card("TQM", "Total Quality Management: Qualität als Unternehmensphilosophie und Aufgabe aller Mitarbeitenden und Bereiche, langfristig kundenorientiert (z. B. EFQM-Modell)."),
      card("Ishikawa-Diagramm", "Ursache-Wirkungs-/Fischgrätdiagramm: mögliche Ursachen eines Problems nach Kategorien sammeln, z. B. 6M (Mensch, Maschine, Methode, Material, Mitwelt, Messung)."),
      card("Erstlösungsquote", "Im Erstkontakt gelöste Tickets ÷ alle Tickets × 100 %. Typische Support-Kennzahl (KPI)."),
    ],
  },
];
