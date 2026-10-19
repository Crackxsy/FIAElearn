import type { ExamPartId } from "@/lib/domain/exam";
import { EXAM_PARTS } from "@/lib/domain/exam";

export const EXAM_PART_SEEDS: {
  id: ExamPartId;
  paragraph: string;
  description: string;
  order: number;
}[] = [
  {
    id: "AP1",
    paragraph: "FIAusbV §§ 8–9",
    description:
      "Schriftlich, praxisbezogene Aufgaben, 90 Minuten, 20 % der Gesamtnote. Kundenbedarf ermitteln, Hard- und Software auswählen, Arbeitsplatz einrichten, Datenschutz und IT-Sicherheit, Einweisung und Übergabe.",
    order: 1,
  },
  {
    id: "AP2_PROJEKT",
    paragraph: "FIAusbV § 12",
    description:
      "Betriebliche Projektarbeit inkl. Dokumentation (zusammen max. 80 Stunden) sowie Präsentation und Fachgespräch (zusammen max. 30 Minuten, Präsentation höchstens 15 Minuten). 50 % der Gesamtnote; Projekt/Doku und Präsentation/Fachgespräch zählen je zur Hälfte.",
    order: 2,
  },
  {
    id: "AP2_SOFTWARE",
    paragraph: "FIAusbV § 13",
    description:
      "Schriftlich, 90 Minuten, 10 %. Anforderungen, Entwicklungsumgebungen und Bibliotheken, Modellierung, Benutzeroberflächen und Ergonomie, Qualitätssicherung.",
    order: 3,
  },
  {
    id: "AP2_ALGO",
    paragraph: "FIAusbV § 14",
    description:
      "Schriftlich, 90 Minuten, 10 %. Algorithmen entwickeln und darstellen, Code lesen und schreiben, Testfälle, Datenbankabfragen mit SQL.",
    order: 4,
  },
  {
    id: "AP2_WISO",
    paragraph: "FIAusbV § 15",
    description:
      "Schriftlich, 60 Minuten, 10 %. Wirtschaftliche und gesellschaftliche Zusammenhänge der Berufs- und Arbeitswelt.",
    order: 5,
  },
];

export const examPartName = (id: ExamPartId) => EXAM_PARTS[id].name;

export const LEARNING_FIELDS = [
  { id: "LF01", title: "Das Unternehmen und die eigene Rolle im Betrieb beschreiben", description: "Unternehmensformen, Organisationsstruktur, Rechte/Pflichten, Stakeholder", examHint: "AP1, WiSo" },
  { id: "LF02", title: "Arbeitsplätze nach Kundenwunsch ausstatten", description: "Anforderungsermittlung, Hard-/Software, Angebote, Nutzwertanalyse, Kosten, Ergonomie, Übergabe", examHint: "AP1" },
  { id: "LF03", title: "Clients in Netzwerke einbinden", description: "IPv4/IPv6, Subnetting, TCP/IP, DNS, DHCP, Client-Konfiguration, Tests", examHint: "AP1" },
  { id: "LF04", title: "Schutzbedarfsanalyse im eigenen Arbeitsbereich durchführen", description: "Vertraulichkeit/Integrität/Verfügbarkeit, Risiken, Datenschutz, Backup", examHint: "AP1" },
  { id: "LF05", title: "Software zur Verwaltung von Daten anpassen", description: "Datenmodelle, SQL, Programmierung, Anforderungen, Testfälle", examHint: "AP1 Grundlagen, AP2 Vertiefung" },
  { id: "LF06", title: "Serviceanfragen bearbeiten", description: "Tickets, Fehleranalyse, Kommunikation, Support, Dokumentation, SLA", examHint: "AP1" },
  { id: "LF07", title: "Cyber-physische Systeme ergänzen", description: "Systeme, Schnittstellen, Sensoren, vernetzte Abläufe", examHint: "AP2 Kontext" },
  { id: "LF08", title: "Daten systemübergreifend bereitstellen", description: "APIs, Schnittstellen, Datenübertragung, Austauschformate", examHint: "AP2 Kontext" },
  { id: "LF09", title: "Netzwerke und Dienste bereitstellen", description: "Netzwerksicherheit, Server/Dienste, Bereitstellung", examHint: "AP2 Kontext" },
  { id: "LF10a", title: "Benutzerschnittstellen gestalten und entwickeln", description: "UI/UX, Barrierefreiheit, Usability, Mockups, Validierung", examHint: "AP2-Software" },
  { id: "LF11a", title: "Funktionalität in Anwendungen realisieren", description: "Algorithmen, Paradigmen, OOP, Design, Testing, SQL", examHint: "AP2-Algorithmen, AP2-Software" },
  { id: "LF12a", title: "Kundenspezifische Anwendungsentwicklung durchführen", description: "Anforderungsanalyse, Planung, Wirtschaftlichkeit, Implementierung, QS, Übergabe, Dokumentation", examHint: "AP2-Projekt" },
].map((lf, i) => ({ ...lf, order: i + 1 }));
