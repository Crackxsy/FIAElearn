import { card, q, type TopicSeed } from "../types";

export const AP2_ALGO: TopicSeed[] = [
  {
    id: "algo-grundlagen",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "Code lesen & Kontrollstrukturen",
    summary: "Variablen, Operatoren, Verzweigungen, Schleifen, Funktionen, Parameterübergabe – Code nachverfolgen.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O05", "L01"],
      keyPoints: [
        "Schreibtischtest: Variablentabelle Zeile für Zeile führen.",
        "Ganzzahldivision: 7 / 2 = 3 (bei Integer), 7 % 2 = 1.",
        "&& / || werten kurzgeschlossen aus.",
        "Call by Value kopiert den Wert, Call by Reference übergibt einen Verweis.",
        "Off-by-one: Schleifengrenzen < vs. <= genau prüfen.",
      ],
      content: `## Code-Tracing
In der Prüfung musst du oft angeben, **was ein Code ausgibt** oder **welchen Wert eine Variable hat**. Vorgehen:
1. Variablentabelle anlegen (eine Spalte pro Variable)
2. Jede Zeile ausführen und Werte eintragen
3. Bei Schleifen jeden Durchlauf als neue Zeile notieren

## Operatoren
| Operator | Bedeutung |
|---|---|
| \`/\` | Division (bei int ganzzahlig: 7 / 2 = 3) |
| \`%\` | Rest (Modulo) |
| \`==\`, \`!=\` | Vergleich |
| \`&&\`, \`\\|\\|\`, \`!\` | UND, ODER, NICHT |
| \`i++\` / \`++i\` | Post-/Präinkrement |

## Funktionen
\`\`\`java
int quadrat(int x) { return x * x; }
\`\`\`
- **Parameter** (formal) vs. **Argument** (tatsächlicher Wert)
- **Rückgabewert** mit \`return\`
- **Call by Value**: Kopie (primitive Typen); **Call by Reference**: Verweis – Änderungen am Objekt sind außerhalb sichtbar.

## Typische Fallen
- \`for (i = 0; i <= n; i++)\` läuft **n + 1** mal
- Integer-Division
- Vergleich von Strings mit \`==\` in Java (Referenz statt Inhalt → \`equals\`)
- Variable außerhalb der Schleife nicht zurückgesetzt`,
    },
    questions: [
      q.trace("Was gibt das Programm aus?", "int a = 7;\nint b = 2;\nint c = a / b + a % b;\nSystem.out.println(c);", ["4"], "7 / 2 = 3 (Integer), 7 % 2 = 1 → 3 + 1 = 4.", { codeLang: "java", placement: true }),
      q.trace("Wie oft wird „Hallo“ ausgegeben?", "for (int i = 0; i <= 10; i += 2) {\n    System.out.println(\"Hallo\");\n}", ["6"], "i = 0, 2, 4, 6, 8, 10 → 6 Durchläufe.", { codeLang: "java" }),
      q.trace("Was gibt die Funktion für f(5) zurück?", "funktion f(n)\n    ergebnis ← 1\n    FÜR i VON 2 BIS n\n        ergebnis ← ergebnis * i\n    ENDE FÜR\n    RÜCKGABE ergebnis", ["120"], "Fakultät: 1·2·3·4·5 = 120.", { placement: true }),
      q.trace("Was steht nach der Schleife in s?", "s = 0\ni = 10\nwhile i > 0:\n    if i % 3 == 0:\n        s = s + i\n    i = i - 1\nprint(s)", ["18"], "Durch 3 teilbar zwischen 1 und 10: 9, 6, 3 → 18.", { codeLang: "python" }),
      q.trace("Was gibt der Code aus? (Werte mit Leerzeichen getrennt)", "x = [3, 1, 4, 1, 5]\nfor i in range(len(x)):\n    if x[i] == 1:\n        x[i] = 0\nprint(x[1], x[3], x[4])", ["0 0 5"], "Beide 1-Werte (Index 1 und 3) werden 0; x[4] bleibt 5.", { codeLang: "python" }),
      q.single("Was ist das Problem in diesem Java-Vergleich: if (eingabe == \"ja\") …?", ["Nichts", "== vergleicht Referenzen, nicht den Inhalt – besser eingabe.equals(\"ja\")", "Strings dürfen nicht verglichen werden", "Es fehlt ein Semikolon"], 1, "In Java vergleicht == bei Objekten die Referenz."),
      q.trace("Welchen Wert hat z?", "boolean a = true;\nboolean b = false;\nboolean z = !(a && b) || b;", ["true", "wahr"], "a && b = false; !false = true; true || false = true.", { codeLang: "java" }),
    ],
    cards: [
      card("Integer-Division", "Bei ganzen Zahlen wird abgeschnitten: 7 / 2 = 3, 7 % 2 = 1", true),
      card("Schreibtischtest", "Variablentabelle anlegen, jede Zeile/jeden Schleifendurchlauf eintragen.", true),
      card("Off-by-one", "i <= n läuft einmal mehr als i < n. Grenzen immer prüfen."),
      card("Call by Value vs. Reference", "Value: Kopie. Reference: Verweis – Änderungen wirken außerhalb."),
      card("String-Vergleich Java", "equals() statt == verwenden."),
    ],
  },
  {
    id: "algo-darstellung",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "Algorithmen darstellen: Pseudocode & Diagramme",
    summary: "Pseudocode schreiben, Struktogramm und Aktivitätsdiagramm in Code übersetzen und umgekehrt.",
    weight: 4,
    hours: 3,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O05"],
      keyPoints: [
        "Pseudocode ist sprachunabhängig, aber eindeutig: Einrückung, klare Schlüsselwörter.",
        "Struktogramm: Sequenz, Alternative, Mehrfachauswahl, kopf-/fußgesteuerte Schleife, Zählschleife.",
        "Aktivitätsdiagramm: Entscheidungen mit [Guards], Schleifen über Rücksprung.",
        "Erst Ein-/Ausgabe und Datenstrukturen klären, dann den Ablauf.",
        "Teilpunkte gibt es für richtige Struktur, auch wenn die Syntax nicht perfekt ist.",
      ],
      content: `## Vom Problem zum Algorithmus
1. **Eingaben** und **Ausgaben** festlegen
2. Benötigte **Variablen/Datenstrukturen** wählen
3. Ablauf in Schritte zerlegen (Sequenz, Verzweigung, Schleife)
4. Mit Beispielwerten im Kopf testen – inklusive Randfällen (leere Liste, 0, negative Zahlen)

## Pseudocode-Beispiel: Durchschnitt positiver Werte
\`\`\`
funktion durchschnittPositiv(werte: Liste von Zahl): Zahl
    summe ← 0
    anzahl ← 0
    FÜR JEDES w IN werte
        WENN w > 0 DANN
            summe ← summe + w
            anzahl ← anzahl + 1
        ENDE WENN
    ENDE FÜR
    WENN anzahl = 0 DANN
        RÜCKGABE 0
    ENDE WENN
    RÜCKGABE summe / anzahl
\`\`\`
Achte auf den **Randfall** „keine positiven Werte“ (Division durch 0!).

## Struktogramm-Elemente
| Element | Bedeutung |
|---|---|
| Rechteck | Anweisung |
| Dreieck mit wahr/falsch | Verzweigung |
| Block mit Bedingung oben | kopfgesteuerte Schleife |
| Block mit Bedingung unten | fußgesteuerte Schleife |

## Prüfungstipp
Schreibe gut lesbar, rücke ein und benenne Variablen sprechend. Prüfer vergeben Punkte für **richtige Logik**, nicht für perfekte Syntax einer bestimmten Sprache.`,
    },
    questions: [
      q.single("Welcher Randfall ist bei der Berechnung eines Durchschnitts besonders wichtig?", ["Sehr große Zahlen", "Leere Liste (Division durch 0)", "Gerade Anzahl", "Sortierte Liste"], 1, "Ohne Elemente wäre die Division durch 0 ein Fehler.", { placement: true }),
      q.trace("Was gibt der Algorithmus für n = 6 aus? (mit Leerzeichen getrennt)", "a ← 0\nb ← 1\nFÜR i VON 1 BIS n\n    AUSGABE a\n    temp ← a + b\n    a ← b\n    b ← temp\nENDE FÜR", ["0 1 1 2 3 5"], "Fibonacci-Folge: 0 1 1 2 3 5."),
      q.trace("Was gibt der Algorithmus für zahl = 1234 aus?", "summe ← 0\nSOLANGE zahl > 0\n    summe ← summe + zahl % 10\n    zahl ← zahl / 10   // ganzzahlig\nENDE SOLANGE\nAUSGABE summe", ["10"], "Quersumme: 4 + 3 + 2 + 1 = 10."),
      q.open("Schreibe Pseudocode für eine Funktion, die prüft, ob ein Wort ein Palindrom ist (z. B. „Rentner“, Groß-/Kleinschreibung ignorieren).", "funktion istPalindrom(wort): Boolean\n    w ← kleinbuchstaben(wort)\n    links ← 0\n    rechts ← länge(w) − 1\n    SOLANGE links < rechts\n        WENN w[links] ≠ w[rechts] DANN RÜCKGABE falsch\n        links ← links + 1\n        rechts ← rechts − 1\n    ENDE SOLANGE\n    RÜCKGABE wahr", "Prüfe: Kleinschreibung, zwei Zeiger oder Vergleich mit umgedrehtem String, Rückgabe Boolean.", { difficulty: 3 }),
      q.open("Schreibe Pseudocode: Aus einer Liste von Bestellbeträgen sollen alle Beträge über 100 € gezählt und deren Summe ausgegeben werden.", "anzahl ← 0; summe ← 0\nFÜR JEDES b IN betraege\n    WENN b > 100 DANN\n        anzahl ← anzahl + 1\n        summe ← summe + b\n    ENDE WENN\nENDE FÜR\nAUSGABE anzahl, summe", "", { difficulty: 2 }),
      q.single("Wodurch erkennt man im Struktogramm eine fußgesteuerte Schleife?", ["Die Bedingung steht oben im Block", "Die Bedingung steht unten im Block", "Es gibt ein Dreieck", "Sie ist gestrichelt"], 1, "Fußgesteuert: Bedingung unten, Rumpf wird mindestens einmal ausgeführt."),
    ],
    cards: [
      card("Algorithmus entwerfen", "1. Ein-/Ausgabe, 2. Datenstrukturen, 3. Ablauf, 4. mit Randfällen testen", true),
      card("Quersumme", "solange zahl > 0: summe += zahl % 10; zahl = zahl / 10 (ganzzahlig)"),
      card("Typische Randfälle", "Leere Liste, 0, negative Werte, ein Element, Duplikate, sehr große Werte", true),
      card("Fibonacci", "0 1 1 2 3 5 8 13 … – jedes Glied ist die Summe der beiden vorherigen."),
    ],
  },
  {
    id: "algo-datenstrukturen",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "Arrays & Datenstrukturen",
    summary: "Arrays, Listen, Stack, Queue, Map/Dictionary, Baum, 2D-Arrays.",
    weight: 4,
    hours: 3,
    difficulty: 3,
    lesson: {
      sources: ["O05", "L01"],
      keyPoints: [
        "Array: feste Größe, Zugriff per Index (meist ab 0) in O(1).",
        "Stack = LIFO (push/pop), Queue = FIFO (enqueue/dequeue).",
        "Map/Dictionary speichert Schlüssel-Wert-Paare.",
        "Verkettete Liste: flexibles Einfügen, aber kein direkter Indexzugriff.",
        "Binärer Suchbaum: links kleiner, rechts größer.",
      ],
      content: `## Überblick
| Struktur | Prinzip | typische Nutzung |
|---|---|---|
| Array | feste Größe, Index | Messwerte, Tabellen |
| (Array-)Liste | dynamische Größe | allgemeine Sammlungen |
| Verkettete Liste | Knoten mit Zeiger | häufiges Einfügen/Löschen |
| Stack | LIFO | Undo, Funktionsaufrufe, Klammerprüfung |
| Queue | FIFO | Warteschlangen, Druckaufträge |
| Map / Dictionary | Schlüssel → Wert | Nachschlagen per ID, Zählen |
| Baum | Hierarchie | Dateisystem, Suchbäume |

## Arrays
Index beginnt meist bei **0**: Ein Array mit 5 Elementen hat die Indizes 0–4. Zugriff auf Index 5 → Fehler (*IndexOutOfBounds*).

**2D-Array**: \`matrix[zeile][spalte]\` – z. B. Sitzplan, Spielfeld.

## Stack & Queue
- Stack: \`push(3), push(5), pop()\` → liefert 5
- Queue: \`enqueue(3), enqueue(5), dequeue()\` → liefert 3

## Map
\`\`\`python
lager = {"A12": 40, "B07": 0}
lager["A12"] -= 1
\`\`\`
Ideal zum **Zählen** (Wort → Häufigkeit) und schnellen Nachschlagen.`,
    },
    questions: [
      q.single("Welche Datenstruktur arbeitet nach dem LIFO-Prinzip?", ["Queue", "Stack", "Map", "Array"], 1, "Stack: Last In, First Out.", { placement: true, difficulty: 1 }),
      q.trace("Welcher Wert wird zuletzt ausgegeben?", "s = Stack()\ns.push(1)\ns.push(2)\ns.push(3)\nprint(s.pop())\ns.push(4)\nprint(s.pop())\nprint(s.pop())", ["2"], "pop → 3; push 4; pop → 4; pop → 2."),
      q.trace("Was liefert dequeue() nach dieser Folge?", "q = Queue()\nq.enqueue(\"A\")\nq.enqueue(\"B\")\nq.dequeue()\nq.enqueue(\"C\")\nq.dequeue()", ["B"], "FIFO: Erstes dequeue → A, zweites → B."),
      q.single("Ein Array hat 10 Elemente. Welcher Index ist der letzte?", ["10", "9", "11", "1"], 1, "Indizes 0 bis 9."),
      q.single("Welche Struktur eignet sich am besten, um zu zählen, wie oft jedes Wort in einem Text vorkommt?", ["Stack", "Queue", "Map/Dictionary", "2D-Array"], 2, "Map: Wort → Anzahl."),
      q.trace("Was gibt der Code aus?", "m = [[1, 2, 3],\n     [4, 5, 6]]\nsumme = 0\nfor zeile in m:\n    summe += zeile[2]\nprint(summe)", ["9"], "zeile[2] ist die dritte Spalte: 3 + 6 = 9.", { codeLang: "python" }),
    ],
    cards: [
      card("Stack vs. Queue", "Stack: LIFO (push/pop). Queue: FIFO (enqueue/dequeue).", true),
      card("Array-Index", "Beginnt bei 0; letzter Index = Länge − 1.", true),
      card("Map/Dictionary", "Schlüssel-Wert-Paare, schneller Zugriff über den Schlüssel."),
      card("Binärer Suchbaum", "Linker Teilbaum kleiner, rechter größer als der Knoten."),
    ],
  },
  {
    id: "algo-sortieren-suchen",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "Sortieren, Suchen & Laufzeit",
    summary: "Bubble-, Selection-, Insertion-Sort, Quick-/Mergesort-Idee, lineare/binäre Suche, O-Notation.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O05"],
      keyPoints: [
        "Bubble Sort: benachbarte Elemente tauschen, O(n²).",
        "Selection Sort: kleinstes Element suchen und nach vorne tauschen, O(n²).",
        "Merge-/Quicksort: Teile und herrsche, im Mittel O(n log n).",
        "Lineare Suche O(n); binäre Suche O(log n), aber nur auf sortierten Daten.",
        "O-Notation beschreibt das Wachstum bei großen Eingaben.",
      ],
      content: `## Bubble Sort
\`\`\`
FÜR i VON 0 BIS n − 2
    FÜR j VON 0 BIS n − 2 − i
        WENN a[j] > a[j + 1] DANN tausche(a[j], a[j + 1])
\`\`\`
Nach jedem äußeren Durchlauf steht das größte verbleibende Element am Ende.

## Selection Sort
Suche das Minimum im unsortierten Teil und tausche es an die erste unsortierte Position.

## Insertion Sort
Nimm das nächste Element und füge es an der richtigen Stelle im sortierten Teil ein – schnell bei fast sortierten Daten.

## Teile und herrsche
- **Mergesort**: halbieren, rekursiv sortieren, zusammenführen – immer O(n log n), braucht Zusatzspeicher.
- **Quicksort**: Pivot wählen, partitionieren – im Mittel O(n log n), schlechtester Fall O(n²).

## Suchen
- **Lineare Suche**: alle Elemente nacheinander → O(n)
- **Binäre Suche**: Mitte prüfen, Hälfte verwerfen → O(log n), nur bei **sortierten** Daten

Max. Vergleiche binäre Suche bei 1.000 Elementen: ⌈log₂(1.001)⌉ = **10**.

## O-Notation
| Klasse | Beispiel |
|---|---|
| O(1) | Array-Zugriff per Index |
| O(log n) | binäre Suche |
| O(n) | lineare Suche |
| O(n log n) | Mergesort |
| O(n²) | Bubble Sort, verschachtelte Schleifen |`,
    },
    questions: [
      q.single("Welche Voraussetzung hat die binäre Suche?", ["Die Daten müssen sortiert sein.", "Die Daten müssen Zahlen sein.", "Die Liste muss weniger als 100 Elemente haben.", "Keine"], 0, "Nur bei sortierten Daten kann man eine Hälfte sicher verwerfen.", { placement: true, difficulty: 1 }),
      q.short("Welche Laufzeitklasse hat Bubble Sort im schlechtesten Fall? (O-Notation)", ["O(n²)", "O(n^2)", "O(n*n)", "n²", "n^2"], "Zwei verschachtelte Schleifen → O(n²).", { placement: true }),
      q.trace("Wie sieht das Array nach dem ERSTEN vollständigen äußeren Durchlauf von Bubble Sort (aufsteigend) aus? (Werte mit Komma)", "a = [5, 1, 4, 2, 8]", ["1, 4, 2, 5, 8", "1,4,2,5,8", "[1, 4, 2, 5, 8]"], "5↔1 → [1,5,4,2,8]; 5↔4 → [1,4,5,2,8]; 5↔2 → [1,4,2,5,8]; 5<8 bleibt.", { codeLang: "pseudocode" }),
      q.calc("Wie viele Vergleiche braucht die binäre Suche höchstens bei 1.000.000 sortierten Elementen?", 20, "2²⁰ = 1.048.576 ≥ 1.000.000 → höchstens 20 Vergleiche.", { tolerance: 0 }),
      q.single("Welcher Sortieralgorithmus arbeitet nach dem Prinzip „Teile und herrsche“ mit Zusammenführen sortierter Hälften?", ["Bubble Sort", "Selection Sort", "Mergesort", "Insertion Sort"], 2, "Mergesort teilt, sortiert rekursiv und fügt zusammen."),
      q.trace("Wie viele Elemente werden bei der binären Suche nach 23 in dieser Liste verglichen?", "liste = [3, 8, 12, 17, 23, 31, 42]\n// Mitte = (links + rechts) / 2 (ganzzahlig)", ["3"], "Index 3 (17) < 23 → rechts; Mitte von 4..6 = 5 (31) > 23 → links; Index 4 (23) gefunden → 3 Vergleiche."),
      q.single("Eine Funktion enthält zwei verschachtelte Schleifen über n Elemente. Welche Laufzeit?", ["O(n)", "O(log n)", "O(n²)", "O(1)"], 2, "n · n = n²."),
    ],
    cards: [
      card("Binäre Suche", "Nur auf sortierten Daten, O(log n): Mitte prüfen, eine Hälfte verwerfen.", true),
      card("Bubble Sort", "Benachbarte Elemente vergleichen/tauschen, O(n²).", true),
      card("Mergesort", "Teile und herrsche, immer O(n log n), Zusatzspeicher nötig."),
      card("Quicksort", "Pivot + Partitionierung, im Mittel O(n log n), worst case O(n²)."),
      card("O-Notation Reihenfolge", "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)", true),
    ],
  },
  {
    id: "algo-rekursion",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "Rekursion",
    summary: "Basisfall, Rekursionsschritt, Aufrufstack, Rekursion vs. Iteration.",
    weight: 3,
    hours: 2.5,
    difficulty: 4,
    lesson: {
      sources: ["O05"],
      keyPoints: [
        "Eine rekursive Funktion ruft sich selbst auf.",
        "Ohne Basisfall (Abbruchbedingung) → Endlosrekursion / StackOverflow.",
        "Jeder Aufruf liegt auf dem Aufrufstack, bis er zurückkehrt.",
        "Jede Rekursion lässt sich iterativ (mit Schleife/Stack) umformen.",
        "Typische Beispiele: Fakultät, Fibonacci, Baumdurchlauf, Mergesort.",
      ],
      content: `## Aufbau
\`\`\`
funktion fakultaet(n)
    WENN n <= 1 DANN RÜCKGABE 1          // Basisfall
    RÜCKGABE n * fakultaet(n − 1)        // Rekursionsschritt
\`\`\`

## Ablauf (Aufrufstack)
fakultaet(4) → 4 · fakultaet(3) → 3 · fakultaet(2) → 2 · fakultaet(1) = 1
Rückweg: 2 · 1 = 2 → 3 · 2 = 6 → 4 · 6 = **24**

## Vor- und Nachteile
| Rekursion | Iteration |
|---|---|
| elegant bei rekursiven Strukturen (Bäume) | meist speichersparender |
| Stack-Verbrauch je Aufruf | kein Stack-Overflow-Risiko |
| evtl. Mehrfachberechnungen (naive Fibonacci) | oft schneller |

## Prüfungstipp
Zeichne die Aufrufe als Baum oder Stapel und rechne den Rückweg von unten nach oben.`,
    },
    questions: [
      q.trace("Was liefert f(3)?", "funktion f(n)\n    WENN n = 0 DANN RÜCKGABE 0\n    RÜCKGABE n + f(n − 1)", ["6"], "3 + 2 + 1 + 0 = 6.", { placement: true }),
      q.single("Was passiert bei einer rekursiven Funktion ohne Basisfall?", ["Sie gibt 0 zurück.", "Endlosrekursion bis zum Stack Overflow", "Sie wird automatisch iterativ.", "Nichts"], 1, "Ohne Abbruchbedingung wächst der Aufrufstack, bis er überläuft."),
      q.trace("Was liefert p(2, 4)?", "funktion p(basis, exp)\n    WENN exp = 0 DANN RÜCKGABE 1\n    RÜCKGABE basis * p(basis, exp − 1)", ["16"], "2⁴ = 16."),
      q.trace("Was gibt der Aufruf aus? (Zeichen ohne Leerzeichen)", "funktion r(s)\n    WENN länge(s) = 0 DANN RÜCKGABE \"\"\n    RÜCKGABE r(teil(s, 1)) + s[0]\n// teil(s, 1) = s ohne erstes Zeichen\nAUSGABE r(\"ABC\")", ["CBA"], "Die Funktion kehrt den String um."),
      q.trace("Wie oft wird fib aufgerufen, wenn man fib(4) berechnet (inklusive des ersten Aufrufs)?", "funktion fib(n)\n    WENN n < 2 DANN RÜCKGABE n\n    RÜCKGABE fib(n − 1) + fib(n − 2)", ["9"], "fib(4) → fib(3), fib(2); fib(3) → fib(2), fib(1); jedes fib(2) → fib(1), fib(0). Zählung: 1 + 2 + 4 + 2 = 9 Aufrufe."),
    ],
    cards: [
      card("Rekursion", "Funktion ruft sich selbst auf; braucht Basisfall + Rekursionsschritt.", true),
      card("Basisfall", "Abbruchbedingung, die ohne weiteren rekursiven Aufruf ein Ergebnis liefert.", true),
      card("Stack Overflow", "Zu viele verschachtelte Aufrufe (z. B. fehlender Basisfall) – Aufrufstack läuft über."),
    ],
  },
  {
    id: "algo-oop",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "Objektorientierte Programmierung",
    summary: "Klasse, Objekt, Konstruktor, Kapselung, Vererbung, Polymorphie, abstrakte Klassen, Interfaces.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["O05", "L01"],
      keyPoints: [
        "Klasse = Bauplan, Objekt = Instanz mit eigenem Zustand.",
        "Kapselung: Attribute private, Zugriff über Getter/Setter.",
        "Vererbung: Unterklasse übernimmt und erweitert die Oberklasse („ist ein“).",
        "Polymorphie: gleicher Methodenaufruf, unterschiedliches Verhalten (Überschreiben).",
        "Abstrakte Klasse: nicht instanziierbar; Interface: nur Methodensignaturen (Vertrag).",
      ],
      content: `## Grundbegriffe
\`\`\`java
public class Konto {
    private double saldo;                    // Attribut (gekapselt)
    public Konto(double start) { saldo = start; }   // Konstruktor
    public void einzahlen(double b) {
        if (b <= 0) throw new IllegalArgumentException();
        saldo += b;
    }
    public double getSaldo() { return saldo; }
}
Konto k = new Konto(100);   // Objekt
\`\`\`

## Vier Säulen
1. **Abstraktion** – nur Wesentliches modellieren
2. **Kapselung** – Daten verbergen, Zugriff kontrollieren (Validierung im Setter)
3. **Vererbung** – \`class Sparkonto extends Konto\`
4. **Polymorphie** – Unterklasse **überschreibt** Methode; Aufruf über Oberklassen-Referenz nutzt die Unterklassen-Version

## Überladen vs. Überschreiben
- **Überladen**: gleicher Name, andere Parameterliste (in derselben Klasse)
- **Überschreiben**: gleiche Signatur in der Unterklasse (@Override)

## Abstrakte Klasse vs. Interface
| Abstrakte Klasse | Interface |
|---|---|
| kann Attribute und fertige Methoden haben | definiert Vertrag (Methoden) |
| Einfachvererbung (Java) | Klasse kann mehrere implementieren |
| \`extends\` | \`implements\` |

## Weitere Begriffe
**static**: gehört zur Klasse, nicht zum Objekt. **this**: Verweis auf das aktuelle Objekt. **super**: Zugriff auf die Oberklasse.`,
    },
    questions: [
      q.single("Was beschreibt Kapselung?", ["Eine Klasse erbt von einer anderen.", "Attribute werden verborgen und nur über Methoden zugänglich gemacht.", "Eine Methode hat mehrere Parameterlisten.", "Objekte werden in Listen gespeichert."], 1, "Kapselung = Information Hiding, Zugriff über Getter/Setter.", { placement: true, difficulty: 1 }),
      q.trace("Was wird ausgegeben?", "class Tier { String laut() { return \"...\"; } }\nclass Hund extends Tier { String laut() { return \"Wuff\"; } }\nclass Katze extends Tier { String laut() { return \"Miau\"; } }\n\nTier[] tiere = { new Hund(), new Katze(), new Tier() };\nfor (Tier t : tiere) System.out.print(t.laut() + \" \");", ["Wuff Miau ...", "Wuff Miau ... "], "Polymorphie: Es wird jeweils die überschriebene Methode des tatsächlichen Objekts ausgeführt.", { codeLang: "java", placement: true }),
      q.single("Zwei Methoden heißen berechne(int a) und berechne(int a, int b) in derselben Klasse. Wie nennt man das?", ["Überschreiben", "Überladen", "Vererbung", "Kapselung"], 1, "Gleicher Name, unterschiedliche Parameter → Überladen (Overloading)."),
      q.single("Was gilt für eine abstrakte Klasse?", ["Sie kann direkt mit new instanziiert werden.", "Sie kann nicht instanziiert werden und dient als Basis für Unterklassen.", "Sie darf keine Methoden enthalten.", "Sie ist dasselbe wie ein Objekt."], 1, "Abstrakte Klassen sind unvollständige Baupläne."),
      q.trace("Was gibt das Programm aus?", "class Zaehler {\n    static int anzahl = 0;\n    Zaehler() { anzahl++; }\n}\nnew Zaehler(); new Zaehler(); new Zaehler();\nSystem.out.println(Zaehler.anzahl);", ["3"], "static: ein gemeinsamer Wert für alle Objekte → 3.", { codeLang: "java" }),
      q.single("Welche Beziehung beschreibt Vererbung?", ["„hat ein“", "„ist ein“", "„benutzt“", "„kennt“"], 1, "Sparkonto ist ein Konto."),
      q.open("Entwirf eine Klasse „Artikel“ mit Kapselung: Attribute Bezeichnung und Preis; der Preis darf nie negativ sein.", "class Artikel { private String bezeichnung; private double preis; public Artikel(String b, double p) { bezeichnung = b; setPreis(p); } public double getPreis() { return preis; } public void setPreis(double p) { if (p < 0) throw new IllegalArgumentException(\"Preis negativ\"); preis = p; } public String getBezeichnung() { return bezeichnung; } }", "Wichtig: private Attribute, Validierung im Setter/Konstruktor.", { difficulty: 3 }),
    ],
    cards: [
      card("Klasse vs. Objekt", "Klasse = Bauplan. Objekt = konkrete Instanz mit eigenem Zustand.", true),
      card("Polymorphie", "Gleicher Aufruf, unterschiedliches Verhalten je nach tatsächlichem Objekttyp (Überschreiben).", true),
      card("Überladen vs. Überschreiben", "Überladen: gleiche Klasse, andere Parameter. Überschreiben: Unterklasse, gleiche Signatur.", true),
      card("Interface", "Vertrag aus Methodensignaturen; Klasse kann mehrere implementieren."),
      card("static", "Gehört zur Klasse, wird von allen Objekten geteilt."),
    ],
  },
  {
    id: "algo-sql-select",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "SQL: SELECT, WHERE & ORDER BY",
    summary: "Spaltenauswahl, Filter, LIKE, IN, BETWEEN, NULL, DISTINCT, Sortierung, Aliase.",
    weight: 5,
    hours: 3,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["O05", "L03", "L04"],
      keyPoints: [
        "Reihenfolge: SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY.",
        "LIKE mit % (beliebig viele Zeichen) und _ (genau ein Zeichen).",
        "BETWEEN a AND b schließt beide Grenzen ein.",
        "NULL nur mit IS NULL / IS NOT NULL prüfen.",
        "DISTINCT entfernt doppelte Ergebniszeilen.",
      ],
      content: `## Grundgerüst
\`\`\`sql
SELECT spalte1, spalte2 AS alias
FROM tabelle
WHERE bedingung
ORDER BY spalte1 DESC;
\`\`\`

## Filter
| Ausdruck | Beispiel |
|---|---|
| Vergleich | \`gehalt >= 4000\` |
| Bereich | \`gehalt BETWEEN 3000 AND 4000\` |
| Liste | \`ort IN ('Hagen', 'Bochum')\` |
| Muster | \`nachname LIKE 'S%'\` |
| NULL | \`abteilung_id IS NULL\` |
| Logik | \`AND\`, \`OR\`, \`NOT\` (Klammern setzen!) |

## Sortieren & Begrenzen
\`ORDER BY nachname ASC, vorname ASC\` · Begrenzen: \`LIMIT 5\` (MySQL/SQLite/PostgreSQL) bzw. \`TOP 5\` (SQL Server)

## Berechnete Spalten
\`\`\`sql
SELECT bezeichnung, preis * 1.19 AS brutto FROM artikel;
\`\`\`

## Übungsdatenbank
Die SQL-Aufgaben in dieser App laufen **echt** gegen eine kleine Beispieldatenbank (SQLite). Du kannst deine Abfrage vor dem Abgeben ausführen und das Ergebnis ansehen.`,
    },
    questions: [
      q.sql("Gib Vorname, Nachname und Gehalt aller Mitarbeiter aus, die mehr als 3.500 € verdienen.", "firma", "SELECT vorname, nachname, gehalt FROM mitarbeiter WHERE gehalt > 3500", "WHERE gehalt > 3500. Hannes Klein hat kein Gehalt (NULL) und erscheint nicht.", { placement: true, difficulty: 2 }),
      q.sql("Gib alle Nachnamen aus, die mit „S“ beginnen, alphabetisch sortiert.", "firma", "SELECT nachname FROM mitarbeiter WHERE nachname LIKE 'S%' ORDER BY nachname", "LIKE 'S%' + ORDER BY.", { difficulty: 2 }),
      q.sql("Welche Mitarbeiter sind keiner Abteilung zugeordnet? Gib Vor- und Nachname aus.", "firma", "SELECT vorname, nachname FROM mitarbeiter WHERE abteilung_id IS NULL", "IS NULL statt = NULL."),
      q.sql("Gib Bezeichnung und Bruttopreis (Preis × 1,19, Spaltenname brutto) aller Artikel der Kategorie „Zubehör“ aus.", "shop", "SELECT bezeichnung, preis * 1.19 AS brutto FROM artikel WHERE kategorie = 'Zubehör'", "Berechnete Spalte mit Alias."),
      q.sql("Welche verschiedenen Orte gibt es in der Kundentabelle? Jeden Ort nur einmal.", "shop", "SELECT DISTINCT ort FROM kunde", "DISTINCT entfernt Duplikate (Hagen kommt doppelt vor)."),
      q.sql("Gib die drei teuersten Artikel (Bezeichnung, Preis) aus.", "shop", "SELECT bezeichnung, preis FROM artikel ORDER BY preis DESC LIMIT 3", "ORDER BY preis DESC + LIMIT 3."),
      q.sql("Gib Bezeichnung und Bestand aller Artikel aus, deren Bestand zwischen 1 und 20 liegt (Grenzen eingeschlossen).", "shop", "SELECT bezeichnung, bestand FROM artikel WHERE bestand BETWEEN 1 AND 20", "BETWEEN schließt beide Grenzen ein."),
    ],
    cards: [
      card("SQL-Klauselreihenfolge", "SELECT – FROM – WHERE – GROUP BY – HAVING – ORDER BY", true),
      card("LIKE-Platzhalter", "% beliebig viele Zeichen, _ genau ein Zeichen", true),
      card("BETWEEN", "Schließt beide Grenzen ein: x BETWEEN 1 AND 5 ⇔ x >= 1 AND x <= 5"),
      card("DISTINCT", "Entfernt doppelte Ergebniszeilen."),
    ],
  },
  {
    id: "algo-sql-join-group",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "SQL: JOIN, GROUP BY, HAVING & Unterabfragen",
    summary: "INNER/LEFT JOIN, Aggregatfunktionen, Gruppierung, HAVING, Subqueries.",
    weight: 5,
    hours: 5,
    difficulty: 4,
    mustKnow: true,
    lesson: {
      sources: ["O05", "L03", "L04"],
      keyPoints: [
        "INNER JOIN: nur Zeilen mit Partner in beiden Tabellen.",
        "LEFT JOIN: alle Zeilen der linken Tabelle, fehlende Partner = NULL.",
        "Alle Nicht-Aggregat-Spalten im SELECT gehören ins GROUP BY.",
        "WHERE filtert vor der Gruppierung, HAVING danach (auf Aggregate).",
        "COUNT(*) zählt Zeilen, COUNT(spalte) nur Nicht-NULL-Werte.",
      ],
      content: `## JOIN
\`\`\`sql
SELECT m.nachname, a.name
FROM mitarbeiter m
INNER JOIN abteilung a ON m.abteilung_id = a.id;
\`\`\`
- **INNER JOIN**: nur Treffer in beiden Tabellen
- **LEFT JOIN**: alle aus der linken Tabelle, rechts ggf. NULL → z. B. „Kunden **ohne** Bestellung“ mit \`WHERE b.id IS NULL\`
- **Selbst-Join**: Mitarbeiter mit Vorgesetztem (\`mitarbeiter m JOIN mitarbeiter v ON m.vorgesetzter_id = v.id\`)

## Aggregation
\`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`
\`\`\`sql
SELECT a.name, COUNT(*) AS anzahl, AVG(m.gehalt) AS schnitt
FROM mitarbeiter m
JOIN abteilung a ON m.abteilung_id = a.id
GROUP BY a.name
HAVING COUNT(*) >= 2
ORDER BY anzahl DESC;
\`\`\`
**WHERE** filtert Zeilen **vor**, **HAVING** Gruppen **nach** der Aggregation.

## Unterabfragen
\`\`\`sql
SELECT nachname FROM mitarbeiter
WHERE gehalt > (SELECT AVG(gehalt) FROM mitarbeiter);
\`\`\`
Auch mit \`IN (SELECT …)\` oder \`EXISTS\`.

## n:m abfragen
Über die Zwischentabelle zwei JOINs: mitarbeiter → mitarbeiter_projekt → projekt.`,
    },
    questions: [
      q.sql("Gib für jeden Mitarbeiter den Nachnamen und den Namen seiner Abteilung aus (nur Mitarbeiter mit Abteilung).", "firma", "SELECT m.nachname, a.name FROM mitarbeiter m INNER JOIN abteilung a ON m.abteilung_id = a.id", "INNER JOIN über abteilung_id = id.", { placement: true, difficulty: 3 }),
      q.sql("Wie viele Mitarbeiter hat jede Abteilung? Gib Abteilungsname und Anzahl aus (nur Abteilungen mit Mitarbeitern).", "firma", "SELECT a.name, COUNT(*) FROM mitarbeiter m JOIN abteilung a ON m.abteilung_id = a.id GROUP BY a.name", "JOIN + GROUP BY + COUNT(*)."),
      q.sql("Welche Kunden haben noch nie bestellt? Gib den Namen aus.", "shop", "SELECT k.name FROM kunde k LEFT JOIN bestellung b ON b.kunde_id = k.id WHERE b.id IS NULL", "LEFT JOIN und nach fehlendem Partner (IS NULL) filtern – alternativ NOT IN / NOT EXISTS.", { difficulty: 4 }),
      q.sql("Gib die Abteilungen (Name) aus, deren Durchschnittsgehalt über 3.500 € liegt, zusammen mit dem Durchschnittsgehalt.", "firma", "SELECT a.name, AVG(m.gehalt) FROM mitarbeiter m JOIN abteilung a ON m.abteilung_id = a.id GROUP BY a.name HAVING AVG(m.gehalt) > 3500", "Filter auf Aggregat → HAVING.", { difficulty: 4 }),
      q.sql("Gib Nachname und Gehalt aller Mitarbeiter aus, die mehr als der Durchschnitt verdienen.", "firma", "SELECT nachname, gehalt FROM mitarbeiter WHERE gehalt > (SELECT AVG(gehalt) FROM mitarbeiter)", "Unterabfrage für den Durchschnitt (AVG ignoriert NULL)."),
      q.sql("Berechne für jede Bestellung den Gesamtwert (Summe Menge × Preis). Gib Bestell-ID und Gesamtwert aus.", "shop", "SELECT p.bestellung_id, SUM(p.menge * a.preis) FROM position p JOIN artikel a ON a.id = p.artikel_id GROUP BY p.bestellung_id", "JOIN Position–Artikel, SUM über Menge × Preis, gruppiert nach Bestellung.", { difficulty: 4 }),
      q.sql("Gib für jeden Mitarbeiter mit Vorgesetztem den eigenen Nachnamen und den Nachnamen des Vorgesetzten aus.", "firma", "SELECT m.nachname, v.nachname FROM mitarbeiter m JOIN mitarbeiter v ON m.vorgesetzter_id = v.id", "Selbst-Join mit zwei Aliasen.", { difficulty: 4 }),
      q.single("Was ist der Unterschied zwischen WHERE und HAVING?", ["Keiner", "WHERE filtert Zeilen vor der Gruppierung, HAVING filtert Gruppen nach der Aggregation", "HAVING ist schneller", "WHERE funktioniert nur mit JOIN"], 1, "HAVING bezieht sich auf Gruppen/Aggregate.", { placement: true }),
    ],
    cards: [
      card("INNER vs. LEFT JOIN", "INNER: nur Treffer in beiden. LEFT: alle links, fehlende rechts = NULL.", true),
      card("WHERE vs. HAVING", "WHERE vor der Gruppierung (Zeilen), HAVING danach (Gruppen/Aggregate).", true),
      card("GROUP BY-Regel", "Jede Spalte im SELECT ohne Aggregatfunktion muss im GROUP BY stehen.", true),
      card("COUNT(*) vs. COUNT(spalte)", "COUNT(*) zählt alle Zeilen, COUNT(spalte) nur Nicht-NULL-Werte."),
      card("Datensätze ohne Partner finden", "LEFT JOIN … WHERE rechts.id IS NULL (oder NOT EXISTS)."),
    ],
  },
  {
    id: "algo-sql-dml-ddl",
    part: "AP2_ALGO",
    lf: "LF05",
    title: "SQL: INSERT, UPDATE, DELETE & CREATE TABLE",
    summary: "Daten ändern, Tabellen anlegen, Schlüssel und Constraints, Transaktionen.",
    weight: 4,
    hours: 3,
    difficulty: 3,
    lesson: {
      sources: ["O05", "L03"],
      keyPoints: [
        "INSERT INTO t (spalten) VALUES (werte);",
        "UPDATE t SET spalte = wert WHERE …; – ohne WHERE werden ALLE Zeilen geändert!",
        "DELETE FROM t WHERE …;",
        "Constraints: PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT.",
        "Transaktion: ACID – atomar, konsistent, isoliert, dauerhaft (COMMIT/ROLLBACK).",
      ],
      content: `## DML – Daten ändern
\`\`\`sql
INSERT INTO kunde (id, name, ort) VALUES (6, 'Neu AG', 'Hagen');
UPDATE artikel SET preis = preis * 1.05 WHERE kategorie = 'Zubehör';
DELETE FROM bestellung WHERE status = 'storniert';
\`\`\`
⚠️ **UPDATE/DELETE ohne WHERE** betrifft alle Zeilen.

## DDL – Struktur
\`\`\`sql
CREATE TABLE lieferant (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  bewertung INTEGER CHECK (bewertung BETWEEN 1 AND 5),
  ort_id INTEGER REFERENCES ort(id)
);
ALTER TABLE lieferant ADD telefon VARCHAR(30);
DROP TABLE lieferant;
\`\`\`

## Referenzielle Integrität
\`FOREIGN KEY … REFERENCES … ON DELETE CASCADE / RESTRICT / SET NULL\`

## Transaktionen (ACID)
- **A**tomarität: alles oder nichts
- **C**onsistency: gültiger Zustand vorher und nachher
- **I**solation: parallele Transaktionen stören sich nicht
- **D**auerhaftigkeit: nach COMMIT gespeichert

Beispiel Überweisung: Abbuchen + Gutschreiben in einer Transaktion, bei Fehler **ROLLBACK**.

## DCL
\`GRANT SELECT ON kunde TO praktikant;\` · \`REVOKE …\``,
    },
    questions: [
      q.sql("Erhöhe den Preis aller Artikel der Kategorie „Hardware“ um 10 %.", "shop", "UPDATE artikel SET preis = preis * 1.1 WHERE kategorie = 'Hardware'", "UPDATE mit WHERE – sonst wären alle Artikel betroffen.", { check: "SELECT id, preis FROM artikel ORDER BY id", placement: true }),
      q.sql("Lösche alle stornierten Bestellungen.", "shop", "DELETE FROM bestellung WHERE status = 'storniert'", "DELETE mit WHERE status = 'storniert'. Die zugehörigen Positionen werden hier per ON DELETE CASCADE mitgelöscht – ohne Cascade müsste man sie zuerst löschen (Fremdschlüssel!).", { check: "SELECT id FROM bestellung ORDER BY id" }),
      q.sql("Füge den Kunden mit id 6, Name „Nova KG“, Ort „Lüdenscheid“ und ohne E-Mail ein.", "shop", "INSERT INTO kunde (id, name, ort, email) VALUES (6, 'Nova KG', 'Lüdenscheid', NULL)", "INSERT mit Spaltenliste; fehlende E-Mail als NULL (oder Spalte weglassen).", { check: "SELECT id, name, ort, email FROM kunde ORDER BY id" }),
      q.single("Was passiert bei UPDATE mitarbeiter SET gehalt = 3000; (ohne WHERE)?", ["Fehlermeldung", "Nur der erste Datensatz wird geändert", "Alle Mitarbeiter erhalten 3.000 €", "Nichts"], 2, "Ohne WHERE werden alle Zeilen geändert."),
      q.single("Welche ACID-Eigenschaft stellt sicher, dass eine Überweisung entweder ganz oder gar nicht durchgeführt wird?", ["Atomarität", "Konsistenz", "Isolation", "Dauerhaftigkeit"], 0, "Atomarität: alles oder nichts."),
      q.single("Welcher Constraint verhindert doppelte E-Mail-Adressen?", ["NOT NULL", "UNIQUE", "DEFAULT", "CHECK"], 1, "UNIQUE erzwingt eindeutige Werte."),
      q.open("Schreibe ein CREATE TABLE für „raum“ mit id (Primärschlüssel), bezeichnung (Pflicht, max. 50 Zeichen), plaetze (ganzzahlig, größer 0) und gebaeude_id (Fremdschlüssel auf gebaeude.id).", "CREATE TABLE raum (\n  id INTEGER PRIMARY KEY,\n  bezeichnung VARCHAR(50) NOT NULL,\n  plaetze INTEGER CHECK (plaetze > 0),\n  gebaeude_id INTEGER,\n  FOREIGN KEY (gebaeude_id) REFERENCES gebaeude(id)\n);", "", { difficulty: 3 }),
    ],
    cards: [
      card("UPDATE/DELETE ohne WHERE", "Betrifft ALLE Zeilen der Tabelle!", true),
      card("ACID", "Atomarität, Konsistenz, Isolation, Dauerhaftigkeit", true),
      card("Constraints", "PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT"),
      card("DDL / DML / DCL", "DDL: CREATE/ALTER/DROP. DML: SELECT/INSERT/UPDATE/DELETE. DCL: GRANT/REVOKE."),
    ],
  },
  {
    id: "algo-db-vertiefung",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "Datenbanken vertieft: Transaktionen, Trigger, Prozeduren, NoSQL",
    summary: "Isolationsprobleme und -stufen, Trigger, Stored Procedures und Functions, NoSQL-Typen, CAP, BASE, Big Data, OLTP/OLAP, Data Warehouse und ETL.",
    weight: 3,
    hours: 4,
    difficulty: 3,
    lesson: {
      sources: ["O05", "L18"],
      keyPoints: [
        "Isolationsprobleme: Lost Update, Dirty Read, Non-Repeatable Read, Phantom Read – eine höhere Isolationsstufe verhindert mehr, kostet aber Parallelität.",
        "Trigger laufen automatisch bei INSERT, UPDATE oder DELETE: BEFORE zum Prüfen/Ändern, AFTER z. B. zum Protokollieren.",
        "Stored Procedure: Aufruf mit CALL, führt Aktionen aus. Stored Function: liefert einen Wert und ist in SQL-Ausdrücken nutzbar.",
        "Prozeduren schützen nur dann vor SQL-Injection, wenn Parameter gebunden werden und intern kein SQL per String-Verkettung entsteht.",
        "NoSQL-Typen: Key-Value, dokumentenorientiert, Wide-Column (oft „spaltenorientiert“ genannt), Graph.",
        "CAP: Bei einer Netzwerkpartition muss ein verteiltes System zwischen Konsistenz und Verfügbarkeit wählen.",
        "OLTP = Tagesgeschäft, OLAP = Analyse; ein Data Warehouse wird per ETL aus den operativen Systemen befüllt.",
      ],
      content: `## Worum es geht
Dieses Thema baut auf „SQL: INSERT, UPDATE, DELETE & CREATE TABLE“ auf (ACID, COMMIT, ROLLBACK). Neu sind parallele Transaktionen, Logik in der Datenbank (Trigger, Prozeduren, Funktionen) und Datenhaltung jenseits relationaler Tabellen (NoSQL, Big Data, Data Warehouse). Die Syntaxbeispiele sind **PostgreSQL** – MySQL, SQL Server und Oracle weichen teils deutlich ab.

## Transaktionen steuern
\`\`\`sql
BEGIN;   -- Standard-SQL: START TRANSACTION
UPDATE konto SET saldo = saldo - 100 WHERE id = 1;
UPDATE konto SET saldo = saldo + 100 WHERE id = 2;
COMMIT;  -- dauerhaft speichern
-- bei einem Fehler stattdessen: ROLLBACK;
\`\`\`
- **Autocommit**: Ohne explizites BEGIN ist in vielen DBMS jede einzelne Anweisung eine eigene Transaktion.
- **Savepoints**: \`SAVEPOINT sp1;\` … \`ROLLBACK TO SAVEPOINT sp1;\` nimmt nur den Teil nach dem Savepoint zurück.
- Nach COMMIT sind die Änderungen auch nach einem Absturz noch da (**Dauerhaftigkeit**, technisch über das Transaktionsprotokoll).

## Isolationsprobleme
Laufen Transaktionen parallel und sind nicht ausreichend voneinander isoliert, entstehen typische Fehler:

| Problem | Was passiert? |
|---|---|
| **Lost Update** | Zwei Transaktionen lesen denselben Wert und schreiben nacheinander zurück – die erste Änderung geht verloren. |
| **Dirty Read** | T1 liest Daten, die T2 geändert, aber noch nicht committet hat. Macht T2 ein ROLLBACK, hat T1 mit Daten gerechnet, die es nie gab. |
| **Non-Repeatable Read** | T1 liest dieselbe Zeile zweimal und erhält verschiedene Werte, weil T2 die Zeile dazwischen geändert oder gelöscht und committet hat. |
| **Phantom Read** | T1 wiederholt eine Abfrage mit derselben Bedingung und erhält zusätzliche Zeilen, weil T2 passende Zeilen eingefügt (oder so geändert, dass sie passen) und committet hat. |

### Isolationsstufen (SQL-Standard)
| Stufe | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| READ UNCOMMITTED | möglich | möglich | möglich |
| READ COMMITTED | verhindert | möglich | möglich |
| REPEATABLE READ | verhindert | verhindert | möglich |
| SERIALIZABLE | verhindert | verhindert | verhindert |

Der Standard legt fest, was **mindestens** verhindert wird – einzelne DBMS sind strenger. Höhere Stufe = mehr Schutz, aber weniger Parallelität und mehr abgebrochene Transaktionen. Einstellen direkt nach BEGIN mit \`SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\` (PostgreSQL auch kurz: \`BEGIN ISOLATION LEVEL SERIALIZABLE;\`) – Standard in PostgreSQL ist READ COMMITTED.

### Lost Update vermeiden
- **In der Datenbank rechnen** statt in der Anwendung: \`UPDATE artikel SET bestand = bestand - 2 WHERE id = 5;\`
- **Pessimistisches Sperren**: \`SELECT … FOR UPDATE\` sperrt die gelesene Zeile bis zum Ende der Transaktion (z. B. PostgreSQL, MySQL, Oracle).
- **Optimistisches Sperren**: Versionsspalte mitlesen und beim Schreiben prüfen: \`UPDATE … SET …, version = version + 1 WHERE id = 5 AND version = 7\`. Werden 0 Zeilen geändert, war jemand schneller → neu laden.

**Deadlock**: T1 wartet auf eine Sperre von T2 und T2 auf eine von T1. Das DBMS erkennt das und bricht eine der beiden Transaktionen ab (ROLLBACK) – die Anwendung muss sie wiederholen.

## Datenbankobjekte im Überblick
| Objekt | Zweck | Wie genutzt? |
|---|---|---|
| **View** (Sicht) | gespeicherte Abfrage, wirkt wie eine virtuelle Tabelle | \`SELECT * FROM sicht\` |
| **Index** | Zugriffsstruktur (meist B-Baum): schnelleres Suchen und Sortieren, dafür etwas langsameres Schreiben | automatisch durch den Optimierer |
| **Trigger** | Code, der bei einem Ereignis automatisch läuft | INSERT, UPDATE oder DELETE auf einer Tabelle |
| **Stored Procedure** | gespeicherte Folge von Anweisungen | \`CALL name(…)\`, in SQL Server \`EXEC name …\` |
| **Stored Function** | berechnet und liefert einen Wert | in Ausdrücken, z. B. \`SELECT f(x) FROM …\` |

\`\`\`sql
CREATE VIEW offene_bestellungen AS
SELECT b.id, k.name, b.datum
FROM bestellung b JOIN kunde k ON k.id = b.kunde_id
WHERE b.status = 'offen';
\`\`\`

## Trigger
Ein **Trigger** gehört zu einer Tabelle und einem Ereignis (INSERT, UPDATE, DELETE) und wird **automatisch** ausgeführt – niemand ruft ihn auf.
- **BEFORE**: läuft vor dem Schreiben → Werte prüfen, korrigieren oder ergänzen (z. B. E-Mail kleinschreiben, Zeitstempel setzen) oder die Änderung mit einem Fehler abbrechen.
- **AFTER**: läuft nach dem Schreiben → Folgeaktionen, z. B. **Protokollierung** (Audit-Log).
- **FOR EACH ROW** (einmal pro betroffener Zeile) oder **FOR EACH STATEMENT** (einmal pro Anweisung) – nicht jedes DBMS kann beides.
- Zeilentrigger sehen **OLD** (alte Werte, bei UPDATE und DELETE) und **NEW** (neue Werte, bei INSERT und UPDATE).

In PostgreSQL ruft ein Trigger eine eigene Trigger-Funktion auf:
\`\`\`sql
CREATE FUNCTION preis_protokollieren() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO preis_log (artikel_id, alt, neu, geaendert_am)
  VALUES (OLD.id, OLD.preis, NEW.preis, now());
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_preis_log
AFTER UPDATE OF preis ON artikel
FOR EACH ROW
EXECUTE FUNCTION preis_protokollieren();
\`\`\`
**Einsatzzwecke**: Änderungsprotokoll (wer hat wann was geändert), Integritätsregeln, die sich mit Constraints nicht ausdrücken lassen, automatisch gepflegte Werte wie „zuletzt geändert am“.

**Risiken**: „unsichtbare“ Logik, die im Anwendungscode nicht auftaucht; Leistungseinbußen bei Massenänderungen; Trigger-Ketten (ein Trigger löst weitere aus) bis hin zur Rekursion; schwer zu testen und zu debuggen; herstellerspezifische Syntax. Ein Fehler im Trigger lässt in gängigen DBMS auch die auslösende Anweisung scheitern.

## Stored Procedures und Functions
\`\`\`sql
-- Funktion: liefert einen Wert, nutzbar in Abfragen (preis als NUMERIC)
CREATE FUNCTION brutto(netto NUMERIC) RETURNS NUMERIC
LANGUAGE SQL
AS $$ SELECT round(netto * 1.19, 2) $$;

SELECT bezeichnung, brutto(preis) FROM artikel;

-- Prozedur: führt Aktionen aus, Aufruf mit CALL
CREATE PROCEDURE bestand_buchen(p_artikel INT, p_menge INT)
LANGUAGE SQL
AS $$
  UPDATE artikel SET bestand = bestand - p_menge WHERE id = p_artikel;
$$;

CALL bestand_buchen(5, 2);
\`\`\`

| | Stored Procedure | Stored Function |
|---|---|---|
| Ergebnis | kein Rückgabewert nötig; Ausgaben über OUT-Parameter oder Ergebnismengen | liefert einen Rückgabewert (Einzelwert oder Tabelle) |
| Aufruf | eigenständig mit CALL bzw. EXEC | innerhalb von SQL-Ausdrücken (SELECT, WHERE …) |
| Daten ändern | typischer Zweck | je nach DBMS eingeschränkt (SQL Server: nicht erlaubt) |
| COMMIT/ROLLBACK im Rumpf | in vielen DBMS möglich (PostgreSQL ab Version 11) | in gängigen DBMS nicht erlaubt |

**Vorteile**: Logik nah an den Daten (weniger Netzwerk-Roundtrips), von mehreren Anwendungen wiederverwendbar, Rechte lassen sich auf Prozeduren statt auf Tabellen vergeben (in PostgreSQL z. B. mit SECURITY DEFINER), Ausführungspläne werden je nach DBMS zwischengespeichert.

**Nachteile**: herstellerspezifische Sprachen (PL/pgSQL, T-SQL, PL/SQL) binden an ein DBMS; Geschäftslogik verteilt sich auf Anwendung und Datenbank; schwerer zu versionieren, zu testen und zu debuggen; zusätzliche Last auf dem Datenbankserver.

### Prozeduren und SQL-Injection
Parameter werden als **Werte** übergeben, nicht als SQL-Text. Das schützt – aber nur, wenn:
1. die Anwendung die Prozedur selbst parametrisiert aufruft (Platzhalter \`?\`, keine String-Verkettung) und
2. die Prozedur intern kein dynamisches SQL aus den Parametern zusammensetzt.

Grundlagen zu SQL-Injection und Prepared Statements: Thema „Sichere Softwareentwicklung“.

## NoSQL
„Not only SQL“: nicht-relationale Datenbanken, meist ohne festes Schema und auf horizontale Skalierung (viele Server) ausgelegt.

| Typ | Datenmodell | Beispiele | Typischer Einsatz |
|---|---|---|---|
| **Key-Value** | Schlüssel → Wert | Redis | Cache, Sitzungsdaten, Warenkorb |
| **Dokumentenorientiert** | JSON-ähnliche Dokumente mit flexiblen Feldern | MongoDB, CouchDB | Produktkataloge mit unterschiedlichen Merkmalen, Content-Management |
| **Wide-Column** (oft „spaltenorientiert“ genannt) | Zeilen mit flexiblen Spalten in Spaltenfamilien, verteilt gespeichert | Apache Cassandra, HBase | sehr große Datenmengen mit hoher Schreiblast, z. B. Sensor- und Logdaten |
| **Graph** | Knoten und Kanten (Beziehungen) | Neo4j | soziale Netzwerke, Empfehlungen, Routen, Betrugserkennung |

Relationale Datenbanken bleiben erste Wahl bei fester Struktur, referenzieller Integrität und strengen Transaktionsanforderungen (z. B. Buchhaltung).

## CAP-Theorem
Ein **verteiltes** Datensystem (mehrere Knoten) kann nicht in jeder Lage alle drei Eigenschaften garantieren:
- **C**onsistency: Jeder Lesezugriff liefert den zuletzt geschriebenen Stand oder einen Fehler – egal, welcher Knoten antwortet.
- **A**vailability: Jede Anfrage an einen funktionierenden Knoten bekommt eine fehlerfreie Antwort (nicht unbedingt mit dem neuesten Stand).
- **P**artition Tolerance: Das System arbeitet weiter, auch wenn die Netzwerkverbindung zwischen Knoten ausfällt (Partition).

Netzwerkausfälle lassen sich in verteilten Systemen nie ausschließen. Die eigentliche Aussage lautet daher: **Bei einer Netzwerkpartition muss das System zwischen Konsistenz und Verfügbarkeit wählen.** Ein CP-System verweigert dann lieber die Antwort, als veraltete Daten zu liefern (z. B. Kontostand). Ein AP-System antwortet immer, notfalls mit einem veralteten Stand (z. B. Like-Zähler).

> Die Kurzform „2 aus 3“ ist eine Vereinfachung: Ohne Partition sind C und A gleichzeitig erreichbar. Und das C in CAP (gleicher Stand auf allen Knoten) ist nicht das C aus ACID (Integritätsregeln sind eingehalten).

## BASE vs. ACID
| Merkmal | ACID | BASE |
|---|---|---|
| Vorrang | Konsistenz | Verfügbarkeit |
| Konsistenz | sofort nach dem COMMIT | „irgendwann“ (Eventual Consistency) |
| Typisch für | relationale DBMS, Buchungen, Zahlungen | viele verteilte NoSQL-Systeme, Feeds, Zähler |
| Skalierung | eher vertikal (stärkerer Server) | horizontal (mehr Server) |

**BASE** = **B**asically **A**vailable (das System antwortet), **S**oft State (der Zustand kann sich durch laufende Replikation noch ändern), **E**ventually Consistent (alle Knoten sind *irgendwann* auf demselben Stand). Viele NoSQL-Systeme bieten inzwischen auch Transaktionen – ACID und BASE beschreiben die Grundausrichtung, keine starre Grenze.

## Big Data
Datenbestände, die mit klassischen Mitteln kaum noch zu speichern und auszuwerten sind. Beschrieben über die **V**:
- **Volume**: sehr große Datenmenge (Tera- bis Petabyte)
- **Velocity**: hohe Geschwindigkeit, mit der Daten entstehen und verarbeitet werden müssen (Datenströme, Echtzeit)
- **Variety**: Vielfalt der Formate – strukturiert (Tabellen), semistrukturiert (JSON, XML), unstrukturiert (Texte, Bilder, Videos)
- häufig ergänzt: **Veracity** (Glaubwürdigkeit und Qualität der Daten) und **Value** (wirtschaftlicher Nutzen)

Typische Werkzeuge: verteilte Speicherung und Verarbeitung (z. B. Apache Hadoop, Apache Spark), NoSQL-Datenbanken, Data Lakes.

## OLTP vs. OLAP
| | OLTP (Online Transaction Processing) | OLAP (Online Analytical Processing) |
|---|---|---|
| Zweck | Tagesgeschäft: Bestellungen, Buchungen, Kasse | Auswertungen, Berichte, Entscheidungsunterstützung |
| Zugriffe | viele kurze Lese- und Schreibtransaktionen | wenige komplexe, überwiegend lesende Abfragen |
| Daten | aktuell, detailliert, normalisiert | historisch, oft verdichtet, denormalisiert (Sternschema) |
| Beispiel | „Bestellung 4711 anlegen“ | „Umsatz je Region und Quartal der letzten fünf Jahre“ |

## Data Warehouse und ETL
Ein **Data Warehouse (DWH)** ist eine eigene Datenbank für Analysen. Es führt Daten aus mehreren operativen Systemen **themenorientiert, vereinheitlicht und mit Historie** zusammen und wird nur lesend ausgewertet – so bremsen Auswertungen das Tagesgeschäft nicht aus.

Befüllt wird es regelmäßig (z. B. nächtlich) im **ETL-Prozess**:
1. **Extract** – Daten aus den Quellen lesen (ERP, Webshop-Datenbank, CSV-Dateien, APIs)
2. **Transform** – bereinigen (Dubletten, fehlende Werte), vereinheitlichen (Formate, Schlüssel, Währungen), verknüpfen, verdichten
3. **Load** – in das DWH laden

**Sternschema**: zentrale **Faktentabelle** mit Kennzahlen (z. B. Menge, Umsatz) und Fremdschlüsseln auf **Dimensionstabellen** (Zeit, Filiale, Artikel, Kunde).
- **Data Mart**: kleiner, fachbezogener Ausschnitt eines DWH (z. B. nur Vertrieb)
- **Data Lake**: speichert Rohdaten im Ursprungsformat; die Struktur wird erst beim Auswerten festgelegt (*schema on read*)
- **ELT**: Daten werden zuerst geladen und erst im Zielsystem transformiert`,
    },
    questions: [
      q.trace(
        "Was liefert die letzte Abfrage?",
        "-- konto: (id 1, saldo 500), (id 2, saldo 200)\nBEGIN;\nUPDATE konto SET saldo = saldo - 300 WHERE id = 1;\nUPDATE konto SET saldo = saldo + 300 WHERE id = 2;\nROLLBACK;\nSELECT saldo FROM konto WHERE id = 2;",
        ["200"],
        "ROLLBACK nimmt alle Änderungen seit BEGIN zurück – beide Konten haben wieder ihren Ausgangsstand. Mit COMMIT statt ROLLBACK wäre es 500.",
        { codeLang: "sql", placement: true, difficulty: 2 },
      ),
      q.trace(
        "Zwei Kassen verkaufen fast gleichzeitig denselben Artikel (3 bzw. 2 Stück). Die Anwendung rechnet den neuen Bestand selbst aus. Welcher Bestand steht am Ende in der Tabelle?",
        "-- Ausgangslage: artikel (id 5, bestand 10)\n-- Isolationsstufe READ COMMITTED, keine Sperren\n\nT1: SELECT bestand FROM artikel WHERE id = 5;   -- liest 10\nT2: SELECT bestand FROM artikel WHERE id = 5;   -- liest 10\nT1: UPDATE artikel SET bestand = 7 WHERE id = 5;  -- 10 − 3\nT1: COMMIT;\nT2: UPDATE artikel SET bestand = 8 WHERE id = 5;  -- 10 − 2\nT2: COMMIT;",
        ["8"],
        "Lost Update: T2 überschreibt den Wert von T1 mit einem Ergebnis, das auf dem veralteten Stand 10 beruht. Richtig wäre 5. Abhilfe: in der Datenbank rechnen (SET bestand = bestand - 2), SELECT … FOR UPDATE oder optimistisches Sperren mit Versionsspalte.",
        { codeLang: "sql", difficulty: 3 },
      ),
      q.single(
        "T2 ändert einen Kontostand, hat aber noch nicht committet. T1 liest diesen geänderten Wert und rechnet damit weiter. Danach macht T2 ein ROLLBACK. Wie heißt dieses Problem?",
        ["Lost Update", "Dirty Read", "Phantom Read", "Deadlock"],
        1,
        "Dirty Read: Lesen nicht festgeschriebener Daten. Ab der Isolationsstufe READ COMMITTED ist das ausgeschlossen.",
      ),
      q.multi(
        "Welche Aussagen zu Triggern treffen zu?",
        [
          "Ein Trigger wird automatisch bei INSERT, UPDATE oder DELETE auf seiner Tabelle ausgeführt.",
          "Ein Trigger muss von der Anwendung ausdrücklich mit CALL aufgerufen werden.",
          "Ein BEFORE-Trigger auf Zeilenebene kann die neuen Werte (NEW) prüfen oder ändern, bevor sie gespeichert werden.",
          "Bei einem DELETE stehen im zeilenweisen Trigger nur die alten Werte (OLD) zur Verfügung.",
          "Trigger machen eine Anwendung übersichtlicher, weil ihre Logik im Anwendungscode nicht auftaucht.",
        ],
        [0, 2, 3],
        "Trigger feuern ereignisgesteuert, CALL gehört zu Prozeduren. Dass Trigger-Logik im Anwendungscode nicht sichtbar ist, gilt gerade als Risiko („versteckte“ Logik).",
      ),
      q.trace(
        "Die Tabelle artikel enthält 6 Artikel, davon 3 in der Kategorie „Zubehör“. preis_log ist leer. Wie viele Zeilen stehen nach dem UPDATE in preis_log?",
        "CREATE TRIGGER trg_preis_log\nAFTER UPDATE OF preis ON artikel\nFOR EACH ROW\nEXECUTE FUNCTION preis_protokollieren();\n-- preis_protokollieren() schreibt pro Aufruf\n-- genau eine Zeile (id, alter Preis, neuer Preis)\n-- in die Tabelle preis_log\n\nUPDATE artikel SET preis = preis * 1.05\nWHERE kategorie = 'Zubehör';",
        ["3"],
        "FOR EACH ROW: Der Trigger läuft einmal pro geänderter Zeile, also dreimal. Ein Anweisungstrigger (FOR EACH STATEMENT) liefe nur einmal.",
        { codeLang: "sql" },
      ),
      q.multi(
        "Welche Aussagen zu Stored Procedures treffen zu?",
        [
          "Sie werden im DBMS gespeichert und ausgeführt – mehrere Anweisungen brauchen nur einen Aufruf über das Netzwerk.",
          "Sie schützen immer vor SQL-Injection, auch wenn sie intern SQL-Text aus ihren Parametern zusammensetzen.",
          "Ihre Sprachen sind herstellerspezifisch (z. B. PL/pgSQL, T-SQL, PL/SQL) – ein Wechsel des DBMS wird dadurch aufwendiger.",
          "Man verwendet sie wie eine Spalte direkt in der SELECT-Liste, z. B. SELECT bestand_buchen(5, 2) FROM artikel.",
        ],
        [0, 2],
        "Dynamisches SQL per String-Verkettung bleibt auch in einer Prozedur angreifbar. In Ausdrücken verwendet man Funktionen; Prozeduren werden mit CALL bzw. EXEC aufgerufen.",
      ),
      q.single(
        "Die Datenbanklogik steckt in einer Stored Procedure. Eine Anwendung ruft sie wie gezeigt auf. Ist das sicher gegen SQL-Injection?",
        [
          "Ja – Stored Procedures schützen grundsätzlich vor SQL-Injection.",
          "Nein – der Aufruf entsteht per String-Verkettung; die Eingabe muss als gebundener Parameter übergeben werden (z. B. {call kunde_suchen(?)} mit setString).",
          "Ja, sofern die Eingabe vorher in Großbuchstaben umgewandelt wird.",
          "Nein – Stored Procedures dürfen grundsätzlich keine Parameter haben.",
        ],
        1,
        "Die Eingabe wird Teil des SQL-Texts und kann dessen Struktur verändern (z. B. Anführungszeichen schließen und eigenen Code anhängen). Erst die Parameterbindung trennt Wert und SQL-Text.",
        { code: 'String sql = "CALL kunde_suchen(\'" + eingabe + "\')";\nstatement.execute(sql);', codeLang: "java", difficulty: 3 },
      ),
      q.single(
        "Ein soziales Netzwerk soll schnell beantworten, welche „Freunde von Freunden“ eine Nutzerin hat. Welcher NoSQL-Typ passt am besten?",
        ["Key-Value-Store", "Dokumentenorientierte Datenbank", "Wide-Column-Datenbank (oft „spaltenorientiert“ genannt)", "Graphdatenbank"],
        3,
        "Graphdatenbanken speichern Beziehungen als Kanten und durchlaufen sie direkt – ohne viele JOINs über Zwischentabellen.",
        { placement: true },
      ),
      q.single(
        "Was besagt das CAP-Theorem für verteilte Datensysteme?",
        [
          "Mit genügend Servern lassen sich Konsistenz, Verfügbarkeit und Partitionstoleranz jederzeit gleichzeitig garantieren.",
          "Tritt eine Netzwerkpartition auf, muss das System zwischen Konsistenz und Verfügbarkeit wählen.",
          "Relationale Datenbanken erfüllen C, A und P, NoSQL-Datenbanken nur P.",
          "CAP steht für Commit, Abort, Persist und beschreibt den Ablauf einer Transaktion.",
        ],
        1,
        "Partitionen lassen sich in verteilten Systemen nicht ausschließen. Während einer Partition liefert ein System entweder aktuelle Daten oder einen Fehler (CP) oder antwortet immer fehlerfrei, notfalls mit veraltetem Stand (AP).",
        { difficulty: 3 },
      ),
      q.single(
        "Welche Beschreibung passt zu OLAP?",
        [
          "Viele kurze Schreibtransaktionen im Tagesgeschäft, z. B. an der Kasse",
          "Komplexe, überwiegend lesende Auswertungen großer historischer Datenmengen, z. B. Umsatz je Region und Quartal",
          "Ein Sperrverfahren, das Lost Updates verhindert",
          "Ein Datenformat für den Austausch zwischen Webservices",
        ],
        1,
        "OLAP dient der Analyse (oft in einem Data Warehouse), OLTP dem operativen Tagesgeschäft.",
      ),
      q.sql(
        "Lege eine Sicht (View) umsatz_kategorie an, die für gelieferte Bestellungen den Umsatz (Menge × Preis) je Artikelkategorie liefert. Spalten: kategorie, umsatz.",
        "shop",
        "CREATE VIEW umsatz_kategorie AS SELECT a.kategorie, SUM(p.menge * a.preis) AS umsatz FROM position p JOIN artikel a ON a.id = p.artikel_id JOIN bestellung b ON b.id = p.bestellung_id WHERE b.status = 'geliefert' GROUP BY a.kategorie",
        "CREATE VIEW … AS SELECT: position mit artikel und bestellung verbinden, auf status = 'geliefert' filtern und nach Kategorie gruppieren. Die View speichert nur die Abfrage, nicht die Daten – sie liefert bei jedem Zugriff den aktuellen Stand. Solche verdichtenden Auswertungen sind typisch für OLAP.",
        { check: "SELECT kategorie, umsatz FROM umsatz_kategorie ORDER BY kategorie", difficulty: 4 },
      ),
      q.open(
        "Ein Onlineshop will jede Preisänderung an Artikeln nachvollziehen können – egal, ob sie über die Weboberfläche, ein Importskript oder direkt in der Datenbank erfolgt. Beschreibe eine Lösung mit einem Trigger und nenne je zwei Vor- und Nachteile gegenüber einer Lösung im Anwendungscode.",
        "Lösung: AFTER-UPDATE-Trigger auf Zeilenebene (FOR EACH ROW) auf der Tabelle artikel. Bei geändertem Preis schreibt er Artikel-ID, alten Preis (OLD.preis), neuen Preis (NEW.preis) und Zeitstempel (ggf. Benutzer) in eine Tabelle preis_log.\nVorteile: greift bei jeder Änderung, egal welche Anwendung oder welches Skript sie auslöst; läuft in derselben Transaktion wie die Änderung (Protokoll und Daten bleiben konsistent); keine doppelte Logik in mehreren Anwendungen.\nNachteile: „versteckte“ Logik, die im Anwendungscode nicht sichtbar ist; zusätzliche Last bei Massenänderungen; schwerer zu testen, zu debuggen und zu versionieren; herstellerspezifische Syntax.",
        "Entscheidend ist, dass der Trigger auch Änderungen außerhalb der Anwendung erfasst – genau das kann Anwendungscode nicht leisten.",
        { difficulty: 3 },
      ),
      q.open(
        "Eine Handelskette (fiktiv) hat ein Kassensystem, einen Webshop und erhält Lieferantendaten als CSV-Dateien. Die Geschäftsführung möchte Umsätze je Region, Artikelgruppe und Monat über mehrere Jahre auswerten. Beschreibe, wie ein Data Warehouse mit ETL-Prozess dafür aufgebaut wird und warum man die Auswertungen nicht direkt auf den operativen Datenbanken ausführt.",
        "Data Warehouse: eigene, themenorientierte Analysedatenbank, die Daten aus allen Quellen vereinheitlicht und mit Historie speichert.\nETL, regelmäßig (z. B. nachts): Extract – Daten aus Kassensystem, Webshop-Datenbank und CSV-Dateien lesen. Transform – bereinigen (Dubletten, fehlende Werte), vereinheitlichen (Datumsformate, Artikelnummern, Einheiten), verknüpfen und verdichten. Load – in das DWH laden.\nModell: Sternschema mit Faktentabelle Verkauf (Menge, Umsatz) und Dimensionen Zeit, Filiale/Region, Artikel.\nBegründung: Analysen (OLAP) sind lange, lesende Abfragen und würden die OLTP-Systeme im Tagesgeschäft ausbremsen; die operativen Systeme halten oft keine lange Historie; die Daten liegen in verschiedenen Systemen und Formaten und müssen erst vereinheitlicht werden.",
        "",
        { difficulty: 4 },
      ),
    ],
    cards: [
      card("Isolationsprobleme", "Lost Update, Dirty Read, Non-Repeatable Read, Phantom Read", true),
      card("Lost Update vermeiden", "In der DB rechnen (SET x = x - 1), SELECT … FOR UPDATE (pessimistisch) oder Versionsspalte prüfen (optimistisch)."),
      card("Isolationsstufen (aufsteigend)", "READ UNCOMMITTED – READ COMMITTED – REPEATABLE READ – SERIALIZABLE. Höher = mehr Schutz, weniger Parallelität."),
      card("Trigger", "Läuft automatisch bei INSERT/UPDATE/DELETE. BEFORE: prüfen/ändern. AFTER: z. B. protokollieren. Zeilentrigger sehen OLD und NEW.", true),
      card("Stored Procedure vs. Function", "Procedure: CALL/EXEC, führt Aktionen aus. Function: liefert einen Wert, nutzbar in SELECT/WHERE.", true),
      card("NoSQL-Typen", "Key-Value (Redis), Dokument (MongoDB), Wide-Column (Cassandra), Graph (Neo4j)", true),
      card("CAP-Theorem", "Bei einer Netzwerkpartition muss ein verteiltes System zwischen Konsistenz (C) und Verfügbarkeit (A) wählen.", true),
      card("BASE", "Basically Available, Soft State, Eventually Consistent – Verfügbarkeit vor sofortiger Konsistenz."),
      card("OLTP vs. OLAP", "OLTP: viele kurze Transaktionen im Tagesgeschäft. OLAP: komplexe lesende Analysen über historische Daten.", true),
      card("ETL", "Extract (aus Quellen lesen), Transform (bereinigen, vereinheitlichen), Load (ins Data Warehouse laden)."),
      card("Big Data – die V", "Volume, Velocity, Variety; oft ergänzt um Veracity und Value."),
    ],
  },
  {
    id: "algo-fehler-tests",
    part: "AP2_ALGO",
    lf: "LF11a",
    title: "Fehler finden, Exceptions & Testfälle",
    summary: "Syntax-, Laufzeit- und Logikfehler, Debugging, Exception Handling, Testfälle zu Code erstellen.",
    weight: 4,
    hours: 3,
    difficulty: 3,
    lesson: {
      sources: ["O05"],
      keyPoints: [
        "Syntaxfehler: Compiler meckert. Laufzeitfehler: Absturz beim Ausführen. Logikfehler: falsches Ergebnis.",
        "Debugger: Breakpoints, Schrittweise ausführen, Variablen beobachten.",
        "try – catch – finally fängt Exceptions kontrolliert ab.",
        "Ein Testfall besteht aus Eingabe, erwartetem Ergebnis und Vorbedingung.",
        "Testdaten: Normalfall, Grenzfälle, Fehlerfälle.",
      ],
      content: `## Fehlerarten
| Art | Beispiel | Wann bemerkt? |
|---|---|---|
| Syntaxfehler | fehlendes Semikolon | beim Kompilieren |
| Laufzeitfehler | Division durch 0, NullPointer, Index außerhalb | beim Ausführen |
| Logikfehler | \`<\` statt \`<=\`, falsche Formel | durch Tests |

## Debugging
Breakpoint setzen → Schritt für Schritt (Step over / Step into) → Variablen beobachten → Hypothese prüfen. Logging hilft in Produktion.

## Exception Handling (Java)
\`\`\`java
try {
    int ergebnis = a / b;
} catch (ArithmeticException e) {
    System.out.println("Division durch 0!");
} finally {
    verbindung.close();   // wird immer ausgeführt
}
\`\`\`
Eigene Fehler werfen: \`throw new IllegalArgumentException("Menge muss > 0 sein");\`

## Testfälle zu Code
| Nr | Eingabe | erwartet | Zweck |
|---|---|---|---|
| 1 | rabatt(100) | 0 | Normalfall unter Grenze |
| 2 | rabatt(500) | 25 | Grenzwert |
| 3 | rabatt(-5) | Exception | ungültige Eingabe |

## Typische Fehler finden
Falsche Schleifengrenze, nicht initialisierte Variable, Zuweisung statt Vergleich, falscher Datentyp (Integer-Division), fehlende NULL-Prüfung.`,
    },
    questions: [
      q.single("Ein Programm berechnet einen falschen Durchschnitt, stürzt aber nicht ab. Welche Fehlerart?", ["Syntaxfehler", "Laufzeitfehler", "Logikfehler", "Compilerfehler"], 2, "Falsches Ergebnis ohne Absturz → Logikfehler.", { placement: true, difficulty: 1 }),
      q.trace("Die Funktion soll die Summe 1 bis n berechnen. Welches Ergebnis liefert sie für n = 4 (inkl. Fehler)?", "int summe(int n) {\n    int s = 0;\n    for (int i = 1; i < n; i++) {\n        s += i;\n    }\n    return s;\n}", ["6"], "Wegen i < n wird 4 nicht addiert: 1 + 2 + 3 = 6 statt 10 (Off-by-one, richtig wäre i <= n).", { codeLang: "java" }),
      q.single("Welcher Block wird bei try-catch-finally immer ausgeführt?", ["try", "catch", "finally", "keiner"], 2, "finally läuft immer, z. B. zum Schließen von Ressourcen."),
      q.multi("Welche sind typische Laufzeitfehler?", ["Division durch 0", "Zugriff auf Index 10 in einem Array der Länge 10", "Fehlende schließende Klammer", "Zugriff auf eine Methode über eine null-Referenz"], [0, 1, 3], "Die fehlende Klammer ist ein Syntaxfehler."),
      q.open("Die Funktion versandkosten(betrag) liefert 4,95 €, ab 50 € (inklusive) 0 €; negative Beträge sind ungültig. Nenne vier sinnvolle Testfälle (Eingabe → erwartetes Ergebnis).", "20 → 4,95 (Normalfall); 49,99 → 4,95 (knapp unter Grenze); 50 → 0 (Grenze); 120 → 0 (Normalfall darüber); −1 → Fehler/Exception (ungültig); 0 → 4,95 (Randfall).", "", { difficulty: 3 }),
    ],
    cards: [
      card("Syntax / Laufzeit / Logik", "Syntax: Compiler. Laufzeit: Absturz beim Ausführen. Logik: falsches Ergebnis.", true),
      card("try-catch-finally", "try: riskanter Code; catch: Fehler behandeln; finally: wird immer ausgeführt.", true),
      card("Testfall", "Vorbedingung, Eingabe, erwartetes Ergebnis (+ tatsächliches Ergebnis, Status)."),
      card("Debugger", "Breakpoints, Step over/into, Variablen beobachten, Call Stack ansehen."),
    ],
  },
];
