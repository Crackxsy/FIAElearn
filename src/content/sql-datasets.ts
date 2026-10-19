// Kleine Beispielschemata für SQL-Aufgaben. Werden in einer In-Memory-SQLite-Datenbank ausgeführt.

export type SqlDataset = { id: string; title: string; description: string; setup: string };

export const SQL_DATASETS: Record<string, SqlDataset> = {
  firma: {
    id: "firma",
    title: "Firma",
    description:
      "abteilung(id, name, standort)\nmitarbeiter(id, vorname, nachname, gehalt, eintritt, abteilung_id → abteilung.id, vorgesetzter_id → mitarbeiter.id)\nprojekt(id, titel, budget, start)\nmitarbeiter_projekt(mitarbeiter_id → mitarbeiter.id, projekt_id → projekt.id, stunden)",
    setup: `
CREATE TABLE abteilung (id INTEGER PRIMARY KEY, name TEXT NOT NULL, standort TEXT);
CREATE TABLE mitarbeiter (
  id INTEGER PRIMARY KEY, vorname TEXT, nachname TEXT NOT NULL, gehalt REAL,
  eintritt TEXT, abteilung_id INTEGER REFERENCES abteilung(id), vorgesetzter_id INTEGER REFERENCES mitarbeiter(id)
);
CREATE TABLE projekt (id INTEGER PRIMARY KEY, titel TEXT NOT NULL, budget REAL, start TEXT);
CREATE TABLE mitarbeiter_projekt (
  mitarbeiter_id INTEGER REFERENCES mitarbeiter(id), projekt_id INTEGER REFERENCES projekt(id), stunden INTEGER,
  PRIMARY KEY (mitarbeiter_id, projekt_id)
);
INSERT INTO abteilung VALUES (1,'Entwicklung','Hagen'),(2,'Vertrieb','Dortmund'),(3,'IT-Support','Hagen'),(4,'Personal','Iserlohn');
INSERT INTO mitarbeiter VALUES
 (1,'Anna','Schmidt',5200,'2015-03-01',1,NULL),
 (2,'Ben','Yilmaz',4100,'2019-08-15',1,1),
 (3,'Clara','Wagner',3900,'2021-01-10',1,1),
 (4,'David','Becker',3600,'2020-06-01',2,NULL),
 (5,'Elif','Kaya',3400,'2022-09-01',2,4),
 (6,'Felix','Hoffmann',3100,'2023-02-01',3,NULL),
 (7,'Greta','Schulz',2900,'2024-08-01',3,6),
 (8,'Hannes','Klein',NULL,'2025-08-01',NULL,1);
INSERT INTO projekt VALUES (1,'Kundenportal',120000,'2025-01-15'),(2,'Lagerverwaltung',80000,'2025-06-01'),(3,'Intranet-Relaunch',45000,'2026-02-01'),(4,'Ticketsystem',30000,NULL);
INSERT INTO mitarbeiter_projekt VALUES (1,1,120),(2,1,300),(3,1,250),(2,2,80),(3,3,140),(4,1,40),(6,4,60),(7,4,90);
`,
  },
  shop: {
    id: "shop",
    title: "Onlineshop",
    description:
      "kunde(id, name, ort, email)\nartikel(id, bezeichnung, kategorie, preis, bestand)\nbestellung(id, kunde_id → kunde.id, datum, status)\nposition(bestellung_id → bestellung.id, artikel_id → artikel.id, menge)",
    setup: `
CREATE TABLE kunde (id INTEGER PRIMARY KEY, name TEXT NOT NULL, ort TEXT, email TEXT UNIQUE);
CREATE TABLE artikel (id INTEGER PRIMARY KEY, bezeichnung TEXT NOT NULL, kategorie TEXT, preis REAL NOT NULL, bestand INTEGER DEFAULT 0);
CREATE TABLE bestellung (id INTEGER PRIMARY KEY, kunde_id INTEGER REFERENCES kunde(id), datum TEXT, status TEXT);
CREATE TABLE position (bestellung_id INTEGER REFERENCES bestellung(id) ON DELETE CASCADE, artikel_id INTEGER REFERENCES artikel(id), menge INTEGER, PRIMARY KEY (bestellung_id, artikel_id));
INSERT INTO kunde VALUES (1,'Müller GmbH','Hagen','info@mueller.example'),(2,'Lena Fischer','Dortmund','lena@example.org'),(3,'Tom Weber','Hagen',NULL),(4,'Byte AG','Bochum','kontakt@byte.example'),(5,'Mia Wolf','Iserlohn','mia@example.org');
INSERT INTO artikel VALUES (1,'Notebook 14"','Hardware',899.00,12),(2,'Monitor 27"','Hardware',249.90,30),(3,'USB-C Dock','Zubehör',129.00,0),(4,'Office-Lizenz','Software',149.00,100),(5,'Maus kabellos','Zubehör',24.90,55),(6,'Headset','Zubehör',59.90,8);
INSERT INTO bestellung VALUES (1,1,'2026-01-12','geliefert'),(2,2,'2026-02-03','geliefert'),(3,1,'2026-03-20','offen'),(4,4,'2026-03-22','storniert'),(5,3,'2026-04-02','offen');
INSERT INTO position VALUES (1,1,5),(1,2,5),(1,5,5),(2,6,1),(3,4,10),(3,3,2),(4,1,1),(5,5,2),(5,2,1);
`,
  },
};
