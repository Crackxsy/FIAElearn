import { card, q, type TopicSeed } from "../types";

export const AP1_NETZ_SICHERHEIT: TopicSeed[] = [
  {
    id: "ap1-netzwerk-grundlagen",
    part: "AP1",
    lf: "LF03",
    title: "Netzwerk-Grundlagen: OSI, TCP/IP, Ports",
    summary: "OSI- und TCP/IP-Modell, Netzwerkgeräte, TCP vs. UDP, wichtige Ports.",
    weight: 5,
    hours: 4,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["L06", "O11"],
      keyPoints: [
        "OSI: Bitübertragung, Sicherung, Vermittlung, Transport, Sitzung, Darstellung, Anwendung.",
        "Switch arbeitet mit MAC-Adressen (Schicht 2), Router mit IP-Adressen (Schicht 3).",
        "TCP: verbindungsorientiert, zuverlässig (3-Way-Handshake). UDP: verbindungslos, schnell.",
        "Ports: 22 SSH, 53 DNS, 80 HTTP, 443 HTTPS, 25/587 SMTP, 993 IMAPS, 3389 RDP.",
        "Fehlersuche oft von Schicht 1 aufwärts: Kabel → Link → IP → DNS → Anwendung.",
      ],
      content: `## OSI-Modell
| Nr. | Schicht | Beispiele | Gerät |
|---|---|---|---|
| 7 | Anwendung | HTTP, DNS, SMTP | – |
| 6 | Darstellung | TLS, Kodierung | – |
| 5 | Sitzung | Sitzungsverwaltung | – |
| 4 | Transport | TCP, UDP (Ports) | – |
| 3 | Vermittlung | IP, ICMP | Router |
| 2 | Sicherung | Ethernet, MAC, WLAN | Switch, Bridge |
| 1 | Bitübertragung | Kabel, Funk, Stecker | Hub, Repeater |

Merksatz (von unten): **„Bitte Sende Viele Teure Sachen Durch Amerika.“**

Das **TCP/IP-Modell** fasst zusammen: Netzzugang (1–2), Internet (3), Transport (4), Anwendung (5–7).

## TCP vs. UDP
- **TCP**: Verbindungsaufbau (SYN → SYN-ACK → ACK), Reihenfolge, Bestätigungen, Neuübertragung. Für Web, E-Mail, Dateien.
- **UDP**: kein Verbindungsaufbau, wenig Overhead. Für DNS-Anfragen, VoIP, Streaming, Gaming.

## Wichtige Ports
| Port | Dienst |
|---|---|
| 20/21 | FTP |
| 22 | SSH / SFTP |
| 25 / 587 | SMTP / Submission |
| 53 | DNS |
| 67/68 | DHCP |
| 80 / 443 | HTTP / HTTPS |
| 123 | NTP |
| 993 / 995 | IMAPS / POP3S |
| 3389 | RDP |

## Diagnose-Werkzeuge
\`ping\` (Erreichbarkeit, ICMP), \`tracert\`/\`traceroute\` (Route), \`ipconfig\`/\`ip a\` (Konfiguration), \`nslookup\` (DNS), \`netstat\`/\`ss\` (Verbindungen).`,
    },
    questions: [
      q.single("Auf welcher OSI-Schicht arbeitet ein klassischer Switch?", ["Schicht 1", "Schicht 2", "Schicht 3", "Schicht 4"], 1, "Ein Switch leitet anhand von MAC-Adressen weiter → Sicherungsschicht (2).", { placement: true, difficulty: 1 }),
      q.single("Welcher Port wird standardmäßig für HTTPS verwendet?", ["80", "443", "8080", "22"], 1, "HTTPS = TCP 443, HTTP = 80.", { difficulty: 1 }),
      q.multi("Welche Aussagen zu UDP sind richtig?", ["UDP baut vor der Übertragung eine Verbindung auf.", "UDP hat weniger Overhead als TCP.", "UDP eignet sich für Echtzeitanwendungen wie VoIP.", "UDP garantiert die Reihenfolge der Pakete."], [1, 2], "UDP ist verbindungslos, schnell, ohne Garantie für Zustellung oder Reihenfolge.", { placement: true }),
      q.short("Wie heißen die drei Schritte des TCP-Verbindungsaufbaus? (Format: A, B, C)", ["SYN, SYN-ACK, ACK", "SYN SYN-ACK ACK", "SYN, SYN/ACK, ACK", "SYN,SYNACK,ACK"], "3-Way-Handshake: SYN → SYN-ACK → ACK."),
      q.single("Mit welchem Befehl prüfst du unter Windows die Namensauflösung eines Hosts?", ["ipconfig /release", "nslookup", "netstat -a", "arp -d"], 1, "nslookup fragt einen DNS-Server ab."),
      q.single("Welche OSI-Schicht ist für die Ende-zu-Ende-Verbindung zwischen Anwendungen über Ports zuständig?", ["Vermittlung", "Transport", "Sitzung", "Sicherung"], 1, "Transportschicht (4) – TCP/UDP mit Portnummern."),
      q.single("Welcher Dienst nutzt standardmäßig Port 22?", ["Telnet", "SSH", "SMTP", "RDP"], 1, "SSH (und SFTP) nutzen Port 22; Telnet 23, SMTP 25, RDP 3389."),
    ],
    cards: [
      card("OSI-Schichten (1→7)", "Bitübertragung, Sicherung, Vermittlung, Transport, Sitzung, Darstellung, Anwendung", true),
      card("Switch vs. Router", "Switch: Schicht 2, MAC-Adressen, innerhalb eines Netzes. Router: Schicht 3, IP-Adressen, verbindet Netze.", true),
      card("TCP vs. UDP", "TCP: verbindungsorientiert, zuverlässig. UDP: verbindungslos, schnell, kein Handshake.", true),
      card("Ports 22/53/80/443", "SSH / DNS / HTTP / HTTPS", true),
      card("3-Way-Handshake", "SYN → SYN-ACK → ACK"),
      card("ping", "Testet Erreichbarkeit per ICMP Echo Request/Reply."),
    ],
  },
  {
    id: "ap1-ipv4-subnetting",
    part: "AP1",
    lf: "LF03",
    title: "IPv4 & Subnetting",
    summary: "Adressaufbau, CIDR, Subnetzmaske, Netz-/Broadcastadresse, Hostanzahl, private Bereiche.",
    weight: 5,
    hours: 5,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["L06", "O02"],
      keyPoints: [
        "Hosts pro Netz = 2^(32 − Präfix) − 2.",
        "/24 = 255.255.255.0, /25 = .128, /26 = .192, /27 = .224, /28 = .240, /29 = .248, /30 = .252.",
        "Netzadresse: alle Hostbits 0; Broadcast: alle Hostbits 1.",
        "Private Netze: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
        "Blockgröße = 256 − Wert der Maske im „interessanten“ Oktett.",
      ],
      content: `## Aufbau
Eine IPv4-Adresse hat **32 Bit**, geschrieben als vier Oktette (z. B. 192.168.10.37). Die **Subnetzmaske** bzw. das **CIDR-Präfix** (/26) trennt Netz- und Hostanteil.

## Die wichtigsten Masken
| CIDR | Maske | Adressen | Hosts |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 |

## Rechenweg (Beispiel 192.168.10.37/27)
1. Blockgröße: 256 − 224 = **32**
2. Netze im letzten Oktett: 0, 32, 64 … → 37 liegt in **32–63**
3. Netzadresse **192.168.10.32**, Broadcast **192.168.10.63**
4. Nutzbare Hosts: .33 bis .62 → **30 Hosts**

## Subnetze bilden
Ein /24 in 4 gleich große Subnetze: 2 Bit borgen → /26 (je 62 Hosts).
Benötigte Hosts h → kleinstes n mit 2ⁿ − 2 ≥ h → Präfix = 32 − n.

## Besondere Adressen
- Privat (RFC 1918): **10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16**
- Loopback: 127.0.0.0/8 · APIPA: 169.254.0.0/16 (kein DHCP erreicht)
- Standardgateway: Router-Adresse im eigenen Netz.`,
    },
    questions: [
      q.calc("Wie viele nutzbare Hostadressen hat ein /26-Netz?", 62, "2^(32−26) − 2 = 64 − 2 = 62.", { placement: true, difficulty: 2, tolerance: 0 }),
      q.short("Wie lautet die Netzadresse von 172.20.45.130/25?", ["172.20.45.128"], "Blockgröße 128 → Netze .0 und .128; 130 liegt im Netz .128.", { difficulty: 3 }),
      q.short("Wie lautet die Broadcastadresse von 192.168.4.70/28?", ["192.168.4.79"], "Blockgröße 16 → Netz 64–79 → Broadcast .79.", { placement: true }),
      q.short("Welche Subnetzmaske gehört zu /27? (dezimale Punktschreibweise)", ["255.255.255.224"], "/27 → 27 Einsen → letztes Oktett 11100000 = 224."),
      q.single("Welche Adresse ist eine private IPv4-Adresse?", ["172.32.1.5", "192.169.0.1", "10.200.3.4", "8.8.8.8"], 2, "Privat: 10.0.0.0/8, 172.16.0.0–172.31.255.255, 192.168.0.0/16. 172.32.x.x und 192.169.x.x sind öffentlich."),
      q.short("Ein Unternehmen braucht ein Subnetz für 50 Geräte. Welches ist das kleinste passende CIDR-Präfix? (z. B. /24)", ["/26", "26"], "2⁶ − 2 = 62 ≥ 50, 2⁵ − 2 = 30 < 50 → 6 Hostbits → /26."),
      q.single("Ein PC hat die Adresse 169.254.12.7. Was ist die wahrscheinlichste Ursache?", ["Statische Adresse falsch eingetragen", "Kein DHCP-Server erreichbar (APIPA)", "DNS-Server ausgefallen", "Die Adresse ist öffentlich"], 1, "169.254.0.0/16 vergibt Windows automatisch (APIPA), wenn kein DHCP-Server antwortet."),
      q.calc("Das Netz 10.0.0.0/22 – wie viele nutzbare Hostadressen?", 1022, "2^(32−22) − 2 = 1024 − 2 = 1022.", { tolerance: 0 }),
      q.single("Liegen 192.168.1.20/26 und 192.168.1.70/26 im selben Netz?", ["Ja", "Nein"], 1, "/26 → Blöcke 0–63 und 64–127. .20 liegt im ersten, .70 im zweiten Netz → Router nötig."),
    ],
    cards: [
      card("Hosts pro Subnetz", "2^(Hostbits) − 2 (Netz- und Broadcastadresse abziehen)", true),
      card("/26, /27, /28", "/26 = .192 (62 Hosts), /27 = .224 (30), /28 = .240 (14)", true),
      card("Private IPv4-Bereiche", "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16", true),
      card("APIPA", "169.254.0.0/16 – automatische Adresse, wenn kein DHCP-Server erreichbar ist."),
      card("Blockgröße", "256 − Maskenwert im interessanten Oktett, z. B. 256 − 192 = 64."),
      card("Loopback IPv4", "127.0.0.1 (127.0.0.0/8)"),
    ],
  },
  {
    id: "ap1-ipv6",
    part: "AP1",
    lf: "LF03",
    title: "IPv6",
    summary: "Aufbau, Kurzschreibweise, Adresstypen, SLAAC, Präfixe.",
    weight: 3,
    hours: 2.5,
    difficulty: 3,
    lesson: {
      sources: ["L06"],
      keyPoints: [
        "128 Bit, 8 Blöcke à 16 Bit in Hex, getrennt durch Doppelpunkte.",
        "Führende Nullen pro Block weglassen; eine zusammenhängende Null-Gruppe einmal durch :: ersetzen.",
        "Link-Local fe80::/10, Global Unicast 2000::/3, Unique Local fc00::/7 (praktisch fd00::/8), Loopback ::1.",
        "Kein Broadcast mehr – Multicast stattdessen (ff00::/8).",
        "Üblich: /64 je Subnetz, SLAAC zur automatischen Konfiguration.",
      ],
      content: `## Aufbau
**128 Bit**, 8 Blöcke à 16 Bit, hexadezimal: \`2001:0db8:0000:0000:0000:ff00:0042:8329\`

## Kürzen
1. Führende Nullen je Block weglassen: \`2001:db8:0:0:0:ff00:42:8329\`
2. **Eine** Folge von Null-Blöcken durch \`::\` ersetzen: \`2001:db8::ff00:42:8329\`

\`::\` darf nur **einmal** vorkommen, sonst ist die Adresse nicht eindeutig.

## Adresstypen
| Präfix | Typ |
|---|---|
| ::1/128 | Loopback |
| fe80::/10 | Link-Local (nur im lokalen Segment) |
| fc00::/7 (fd00::/8) | Unique Local (vergleichbar mit privat) |
| 2000::/3 | Global Unicast (im Internet routbar) |
| ff00::/8 | Multicast |

Es gibt **keinen Broadcast**. Ein Interface hat meist mehrere Adressen (Link-Local + Global).

## Präfix & Interface-ID
Typisch: **/64** – die ersten 64 Bit Netzpräfix, die letzten 64 Bit Interface-ID. Provider vergeben oft /56 oder /48 → viele /64-Subnetze.

Anzahl /64-Subnetze aus /56: 2^(64−56) = **256**.

## Automatische Konfiguration
- **SLAAC**: Gerät bildet Adresse aus Router-Advertisement-Präfix + eigener Interface-ID (EUI-64 oder zufällig/Privacy Extensions).
- **DHCPv6**: zentral verwaltet (stateful).`,
    },
    questions: [
      q.short("Kürze die Adresse 2001:0db8:0000:0000:0000:0000:0000:0001 maximal.", ["2001:db8::1"], "Führende Nullen weg, Nullblöcke zu :: → 2001:db8::1.", { placement: true }),
      q.single("Welches Präfix haben Link-Local-Adressen?", ["2000::/3", "fe80::/10", "ff00::/8", "fc00::/7"], 1, "Link-Local = fe80::/10.", { difficulty: 2 }),
      q.single("Warum ist 2001:db8::1::5 ungültig?", ["Zu viele Ziffern", ":: kommt zweimal vor", "db8 ist kein Hex", "IPv6 erlaubt keine 1"], 1, "Der Doppelpunkt-Kurzschreibweise darf nur einmal genutzt werden."),
      q.calc("Ein Provider vergibt ein /48-Präfix. Wie viele /64-Subnetze kann man bilden?", 65536, "2^(64−48) = 2^16 = 65.536.", { tolerance: 0 }),
      q.single("Was ersetzt in IPv6 den Broadcast?", ["Anycast", "Multicast", "Unicast", "ARP"], 1, "IPv6 nutzt Multicast (z. B. ff02::1 = alle Knoten im Link)."),
      q.single("Wie viele Bit hat eine IPv6-Adresse?", ["32", "64", "128", "256"], 2, "IPv6 = 128 Bit.", { difficulty: 1 }),
    ],
    cards: [
      card("IPv6-Länge", "128 Bit, 8 Blöcke à 16 Bit (Hex)", true),
      card("IPv6 kürzen", "Führende Nullen weg; einmalig :: für aufeinanderfolgende Nullblöcke.", true),
      card("fe80::/10", "Link-Local-Adresse – nur im lokalen Netzsegment gültig."),
      card("2000::/3", "Global Unicast – öffentlich routbar."),
      card("SLAAC", "Stateless Address Autoconfiguration: Präfix vom Router + eigene Interface-ID."),
    ],
  },
  {
    id: "ap1-dienste",
    part: "AP1",
    lf: "LF03",
    title: "DHCP, DNS, NAT, VLAN & WLAN",
    summary: "Netzdienste konfigurieren: DHCP-Ablauf, DNS-Einträge, NAT, VLANs, WLAN-Sicherheit.",
    weight: 4,
    hours: 3,
    difficulty: 2,
    lesson: {
      sources: ["L06"],
      keyPoints: [
        "DHCP-Ablauf DORA: Discover, Offer, Request, Acknowledge.",
        "DNS-Records: A (IPv4), AAAA (IPv6), CNAME (Alias), MX (Mailserver), PTR (Reverse).",
        "NAT übersetzt private in öffentliche Adressen; PAT nutzt dazu Ports.",
        "VLAN (IEEE 802.1Q) trennt Netze logisch auf derselben Hardware.",
        "WLAN: WPA3 (oder mindestens WPA2-AES) verwenden, WEP/WPA sind unsicher.",
      ],
      content: `## DHCP
Vergibt automatisch IP-Adresse, Subnetzmaske, Gateway, DNS-Server und Lease-Zeit.

**DORA**: Discover (Client sucht) → Offer (Server bietet an) → Request (Client fordert an) → Acknowledge (Server bestätigt).

Für Drucker/Server: **Reservierung** (feste IP anhand der MAC-Adresse).

## DNS
Übersetzt Namen in IP-Adressen.
| Record | Bedeutung |
|---|---|
| A | Name → IPv4 |
| AAAA | Name → IPv6 |
| CNAME | Alias auf anderen Namen |
| MX | Mailserver der Domain |
| PTR | IP → Name (Reverse Lookup) |
| NS | zuständiger Nameserver |
| TXT | Text, z. B. SPF |

## NAT
**Network Address Translation**: Router ersetzt private Quelladressen durch seine öffentliche Adresse. **PAT/NAT-Overload** unterscheidet die Verbindungen über Ports. **Port-Forwarding** macht interne Dienste von außen erreichbar.

## VLAN
Virtuelle LANs trennen z. B. Verwaltung, Produktion, Gäste auf einem Switch. Tagging nach **IEEE 802.1Q**. Kommunikation zwischen VLANs nur über Router/Layer-3-Switch → Sicherheit, weniger Broadcast.

## WLAN
- Standards: Wi-Fi 5 (802.11ac), Wi-Fi 6/6E (802.11ax), Wi-Fi 7 (802.11be)
- Sicherheit: **WPA3**, mindestens WPA2 mit AES; im Unternehmen **WPA2/3-Enterprise** mit RADIUS (802.1X).
- Gäste-WLAN in eigenem VLAN.`,
    },
    questions: [
      q.short("Wofür stehen die vier Schritte des DHCP-Ablaufs? (Abkürzung)", ["DORA", "Discover Offer Request Acknowledge", "Discover, Offer, Request, Acknowledge"], "Discover, Offer, Request, Acknowledge.", { placement: true }),
      q.single("Welcher DNS-Eintrag verweist auf den Mailserver einer Domain?", ["A", "CNAME", "MX", "PTR"], 2, "MX = Mail Exchanger.", { difficulty: 1 }),
      q.single("Welcher DNS-Eintrag ordnet einem Namen eine IPv6-Adresse zu?", ["A", "AAAA", "PTR", "NS"], 1, "AAAA für IPv6, A für IPv4."),
      q.multi("Welche Vorteile bieten VLANs?", ["Logische Trennung von Netzen auf gleicher Hardware", "Kleinere Broadcast-Domänen", "Ersetzen eine Firewall vollständig", "Höhere Sicherheit durch Segmentierung"], [0, 1, 3], "VLANs segmentieren, ersetzen aber keine Firewall."),
      q.single("Welche WLAN-Verschlüsselung ist für ein neues Firmennetz zu empfehlen?", ["WEP", "WPA (TKIP)", "WPA3", "Offenes WLAN mit MAC-Filter"], 2, "WPA3 ist aktueller Stand; WEP/WPA-TKIP sind unsicher.", { placement: true }),
      q.single("Ein Webserver im internen Netz soll aus dem Internet über Port 443 erreichbar sein. Was wird am Router eingerichtet?", ["DHCP-Reservierung", "Port-Forwarding (Destination NAT)", "VLAN-Tagging", "DNS-PTR-Record"], 1, "Port-Forwarding leitet eingehende Verbindungen auf einen internen Host weiter."),
    ],
    cards: [
      card("DHCP – DORA", "Discover → Offer → Request → Acknowledge", true),
      card("DNS-Records", "A = IPv4, AAAA = IPv6, CNAME = Alias, MX = Mail, PTR = Reverse, NS = Nameserver", true),
      card("NAT / PAT", "Private Adressen werden in die öffentliche Adresse übersetzt; PAT unterscheidet per Port."),
      card("VLAN", "Logische Netztrennung auf einem Switch, IEEE 802.1Q-Tagging."),
      card("WPA2/3-Enterprise", "Anmeldung je Benutzer über RADIUS (802.1X) statt gemeinsamem Passwort."),
    ],
  },
  {
    id: "ap1-virtualisierung",
    part: "AP1",
    lf: "LF02",
    title: "Virtualisierung",
    summary: "Hypervisor Typ 1/2, VM vs. Container, Snapshot ≠ Backup, Ressourcenplanung, Überprovisionierung, VDI, Bezug zu IaaS.",
    weight: 3,
    hours: 2.5,
    difficulty: 2,
    lesson: {
      sources: ["O02", "L10"],
      keyPoints: [
        "Ein Host stellt mehreren isolierten VMs virtuelle Hardware bereit; der Hypervisor verteilt die Ressourcen.",
        "Typ 1 (bare metal) läuft direkt auf der Hardware (ESXi, Hyper-V); Typ 2 (hosted) als Anwendung auf einem Host-Betriebssystem (VirtualBox, VMware Workstation).",
        "VMs haben ein eigenes Gast-OS mit eigenem Kernel; Container teilen sich den Kernel des Hosts – leichter, aber schwächer isoliert.",
        "Snapshot ≠ Backup: Er liegt auf demselben Speicher und ist von der Basis-Festplatte abhängig.",
        "RAM-Bedarf = Summe aller VMs + Hypervisor-Overhead + Reserve. Überprovisionierung nur mit Monitoring.",
        "VDI: Arbeitsplatz-Desktops laufen als VMs im Rechenzentrum, Zugriff per Remote-Protokoll.",
      ],
      content: `## Begriff
Bei der **Virtualisierung** wird physische Hardware (CPU, Arbeitsspeicher, Massenspeicher, Netzwerk) durch eine Software-Schicht abstrahiert. Auf einem physischen **Host** laufen dadurch mehrere voneinander isolierte **virtuelle Maschinen (VMs)**, die **Gäste**. Jede VM hat ein eigenes Betriebssystem und virtuelle Hardware: vCPUs, virtuellen Arbeitsspeicher, virtuelle Festplatten und virtuelle Netzwerkkarten.

Die Software, die die Ressourcen verteilt und die VMs voneinander trennt, heißt **Hypervisor** (auch Virtual Machine Monitor).

Voraussetzung auf dem Host: eine CPU mit Virtualisierungserweiterung (**Intel VT-x** bzw. **AMD-V**), die im BIOS/UEFI aktiviert sein muss.

## Vorteile und Nachteile
| Vorteile | Nachteile |
|---|---|
| Konsolidierung: weniger physische Server, bessere Auslastung, weniger Strom, Platz und Kühlung | Der Host wird zum **Single Point of Failure** – fällt er aus, stehen alle VMs (ohne Cluster) |
| Schnelle Bereitstellung über Vorlagen (Templates) und Klone | Leistungs-Overhead durch den Hypervisor |
| Isolation: Der Absturz einer VM betrifft die anderen nicht | VMs konkurrieren um dieselben Ressourcen |
| Hardwareunabhängigkeit: VMs lassen sich auf einen anderen Host verschieben (Live-Migration) | Höhere Anforderungen an Know-how, Verwaltung und Lizenzierung |
| Test- und Schulungsumgebungen, Snapshots vor Änderungen | Der Hypervisor ist ein zusätzliches Angriffsziel |

## Hypervisor-Typen
| | Typ 1 (bare metal, nativ) | Typ 2 (hosted) |
|---|---|---|
| läuft | direkt auf der Hardware | als Anwendung auf einem Host-Betriebssystem |
| Overhead | gering | höher (Host-OS liegt dazwischen) |
| Einsatz | Server, Rechenzentrum, Cloud | Arbeitsplatz, Test, Schulung, Entwicklung |
| Beispiele | VMware ESXi, Microsoft Hyper-V, Xen, KVM (z. B. in Proxmox VE) | Oracle VirtualBox, VMware Workstation |

Hyper-V zählt zu Typ 1: Auch wenn es unter Windows aktiviert wird, läuft der Hypervisor direkt auf der Hardware, und Windows selbst läuft in einer privilegierten Partition darüber.

## VM vs. Container
| | Virtuelle Maschine | Container |
|---|---|---|
| virtualisiert | komplette Hardware | Betriebssystem-Ebene (isolierte Prozesse) |
| Betriebssystem | eigenes Gast-OS mit eigenem Kernel | teilt sich den Kernel des Hosts |
| Größe | meist mehrere GB | oft nur MB bis wenige hundert MB |
| Start | bootet wie ein PC | meist in Sekunden |
| Isolation | stark | schwächer (gemeinsamer Kernel) |
| Beispiele | VMs unter ESXi oder Hyper-V | Docker, Podman; Orchestrierung mit Kubernetes |

Container eignen sich für Anwendungen und Microservices, die schnell skaliert werden und auf Entwickler-PC, Testsystem und Produktion identisch laufen sollen. VMs und Container schließen sich nicht aus: In der Praxis laufen Container häufig innerhalb von VMs.

## Snapshot ≠ Backup
Ein **Snapshot** hält den Zustand einer VM (Festplatte, optional auch Arbeitsspeicher) zu einem Zeitpunkt fest. Danach werden Änderungen in eine Differenzdatei geschrieben, und man kann schnell zum alten Stand zurückkehren – ideal **vor Updates oder Konfigurationsänderungen**.

Ein Snapshot ist **kein Backup**:
- Er liegt auf **demselben Speicher** wie die VM – fällt das Speichersystem aus, sind VM und Snapshot verloren.
- Er ist von der **Basis-Festplatte abhängig** und allein nicht nutzbar.
- Lange aufbewahrte Snapshots wachsen, kosten Speicherplatz und Leistung.

Daher: Snapshots nur kurzfristig nutzen und danach löschen (zusammenführen). Für die Datensicherung braucht es echte Backups nach der 3-2-1-Regel (siehe Thema „Datensicherung & RAID“).

## Ressourcenplanung
Der Host muss den Bedarf aller VMs **plus Hypervisor-Overhead plus Reserve** abdecken.

Beispiel Arbeitsspeicher (Muster GmbH):
1. VMs: Domänencontroller 8 GB + Dateiserver 8 GB + Datenbankserver 16 GB = **32 GB**
2. Hypervisor-Overhead (laut Aufgabenstellung bzw. Herstellerangabe): + 4 GB = **36 GB**
3. Reserve für Wachstum und Lastspitzen, hier 20 %: 36 GB × 1,2 = **43,2 GB**
4. Bestückung: nächste sinnvolle Modulbestückung, z. B. **64 GB**

Bei der CPU zählt man **vCPUs** (virtuelle Prozessorkerne). Das Verhältnis von vCPUs zu physischen Kernen ist der **Überbuchungsfaktor**: 32 vCPUs auf 16 Kernen = **2:1**.

Beim Massenspeicher: Summe der virtuellen Festplatten + Platz für Snapshots, Vorlagen und Wachstum; für Ausfallsicherheit ein passendes RAID.

## Überprovisionierung (Overcommitment)
Den VMs wird insgesamt **mehr zugewiesen, als physisch vorhanden** ist – z. B. mehr vCPUs als Kerne oder mehr Festplattenplatz (Thin Provisioning), als das Speichersystem hat. Das funktioniert, weil selten alle VMs gleichzeitig alles ausnutzen.
- Vorteil: bessere Auslastung, geringere Hardwarekosten.
- Risiko: Bei Lastspitzen bremsen sich die VMs gegenseitig aus; beim Arbeitsspeicher droht Auslagerung, bei Thin Provisioning ein volllaufender Datenspeicher, der betroffene VMs anhalten kann.
- Daher: Auslastung überwachen (Monitoring), Schwellwerte und Alarme setzen; kritischen VMs feste Ressourcen reservieren.

## Desktop-Virtualisierung (VDI)
Bei der **Virtual Desktop Infrastructure** laufen die Arbeitsplatz-Betriebssysteme als VMs im Rechenzentrum. Die Nutzer greifen über ein Remote-Protokoll (z. B. RDP) mit Thin Client, Notebook oder Browser darauf zu.
- Vorteile: zentrale Verwaltung und Updates, Daten verlassen das Rechenzentrum nicht, neue Arbeitsplätze schnell bereitgestellt, Zugriff von überall (Homeoffice), einfache Endgeräte genügen.
- Nachteile: ohne stabile Netzwerkverbindung kein Arbeiten, leistungsstarke Server und passende Lizenzen nötig, grafikintensive Anwendungen sind anspruchsvoll.
- Abgrenzung: Beim **Terminalserver** (z. B. Remote Desktop Services) teilen sich viele Nutzer **ein** Server-Betriebssystem; bei VDI erhält jeder Nutzer eine **eigene VM**.

## Bezug zur Cloud
Cloud-Rechenzentren beruhen auf Virtualisierung. Bei **IaaS** mietet der Kunde virtuelle Maschinen, Speicher und Netze: Hardware und Hypervisor betreibt der Anbieter, das Gastbetriebssystem und alles darüber verwaltet der Kunde selbst. Die Servicemodelle im Überblick stehen im Thema „Betriebssysteme, Software & Lizenzen“.`,
    },
    questions: [
      q.single("Welcher Hypervisor-Typ läuft direkt auf der Hardware des Servers, ohne darunterliegendes Betriebssystem?", ["Typ 1 (bare metal)", "Typ 2 (hosted)", "Container-Engine", "Emulator"], 0, "Typ 1 (bare metal, nativ) läuft direkt auf der Hardware, z. B. VMware ESXi oder Hyper-V. Typ 2 läuft als Anwendung auf einem Host-Betriebssystem.", { placement: true, difficulty: 1 }),
      q.multi("Welche Produkte sind Typ-2-Hypervisoren (hosted)?", ["VMware ESXi", "Oracle VirtualBox", "VMware Workstation", "Xen"], [1, 2], "VirtualBox und VMware Workstation werden als Anwendung auf einem vorhandenen Betriebssystem installiert. ESXi und Xen laufen direkt auf der Hardware (Typ 1)."),
      q.single("Was unterscheidet einen Container grundlegend von einer virtuellen Maschine?", ["Container haben ein eigenes Gast-Betriebssystem mit eigenem Kernel.", "Container teilen sich den Kernel des Host-Betriebssystems.", "Container benötigen immer einen Typ-1-Hypervisor.", "Container lassen sich nur unter Windows betreiben."], 1, "Container virtualisieren auf Betriebssystem-Ebene und nutzen den Kernel des Hosts mit. Dadurch sind sie klein und starten schnell, sind aber schwächer isoliert als VMs.", { placement: true }),
      q.single("Vor einem größeren Update erstellt ein Administrator der Muster GmbH einen Snapshot der Datenbank-VM und erklärt, damit sei die Datensicherung erledigt. Was ist richtig?", ["Stimmt, ein Snapshot ist eine vollwertige Sicherung.", "Falsch – der Snapshot liegt auf demselben Speicher und hängt von der Basis-Festplatte ab; er ersetzt kein Backup.", "Stimmt, sofern der Snapshot länger als 30 Tage aufbewahrt wird.", "Falsch – von Datenbank-VMs lassen sich grundsätzlich keine Snapshots erstellen."], 1, "Ein Snapshot eignet sich, um nach einem misslungenen Update schnell zurückzuspringen. Fällt aber das Speichersystem aus, sind VM und Snapshot gemeinsam verloren. Eine Datensicherung muss unabhängig davon auf einem anderen Medium liegen."),
      q.calc(
        "Die Muster GmbH plant einen Virtualisierungshost für vier VMs: Domänencontroller 4 GB RAM, Dateiserver 8 GB, Datenbankserver 16 GB, Webserver 6 GB. Der Hypervisor benötigt selbst 4 GB. Auf den Gesamtbedarf (VMs + Hypervisor) sollen 25 % Reserve aufgeschlagen werden. Wie hoch ist der rechnerische Arbeitsspeicherbedarf in GB (ohne Aufrunden auf Modulgrößen)?",
        47.5,
        "VMs: 4 + 8 + 16 + 6 = 34 GB. Mit Hypervisor: 34 + 4 = 38 GB. Mit 25 % Reserve: 38 × 1,25 = 47,5 GB.",
        { unit: "GB", tolerance: 0.05, steps: ["Summe der VMs: 4 + 8 + 16 + 6 = 34 GB", "Hypervisor-Overhead: 34 + 4 = 38 GB", "Reserve 25 %: 38 × 1,25 = 47,5 GB"] },
      ),
      q.calc(
        "Ein Host hat 2 CPUs mit je 8 physischen Kernen (Hyper-Threading bleibt unberücksichtigt). Darauf laufen 4 VMs mit je 4 vCPUs, 6 VMs mit je 2 vCPUs und 2 VMs mit je 6 vCPUs. Wie hoch ist der Überbuchungsfaktor (vCPUs je physischem Kern)? Gib x für das Verhältnis x:1 an (nur die Zahl x, z. B. 1,5).",
        2.5,
        "vCPUs: 4 × 4 + 6 × 2 + 2 × 6 = 16 + 12 + 12 = 40. Physische Kerne: 2 × 8 = 16. 40 ÷ 16 = 2,5 → 2,5:1.",
        { tolerance: 0.02, steps: ["vCPUs: 4 × 4 + 6 × 2 + 2 × 6 = 40", "Physische Kerne: 2 × 8 = 16", "40 ÷ 16 = 2,5 → 2,5:1"] },
      ),
      q.single("Auf einem neuen Notebook lässt sich in VirtualBox keine 64-Bit-VM starten. Was ist die wahrscheinlichste Ursache?", ["Die Virtualisierungserweiterung (Intel VT-x bzw. AMD-V) ist im UEFI deaktiviert.", "Das Notebook hat keine dedizierte Grafikkarte.", "Es ist keine USV angeschlossen.", "Im Notebook ist eine SSD statt einer HDD verbaut."], 0, "64-Bit-Gäste benötigen die Hardware-Virtualisierung der CPU. Sie ist bei manchen Geräten ab Werk im BIOS/UEFI deaktiviert und muss dort eingeschaltet werden."),
      q.short("Wie nennt man es, wenn den VMs insgesamt mehr Ressourcen (z. B. vCPUs oder Speicherplatz) zugewiesen werden, als der Host physisch besitzt? (ein Fachbegriff)", ["Überprovisionierung", "Overcommitment", "Overcommit", "Overprovisioning", "Überbuchung"], "Überprovisionierung (Overcommitment) nutzt aus, dass selten alle VMs gleichzeitig ihre volle Zuteilung brauchen. Sie erfordert Monitoring, sonst drohen Engpässe bei Lastspitzen."),
      q.single("Die Muster GmbH möchte, dass jeder Sachbearbeiter einen eigenen virtuellen Windows-Desktop im Rechenzentrum erhält, auf den er per Thin Client zugreift. Wie heißt dieses Konzept?", ["Terminalserver (alle Nutzer teilen sich ein Server-Betriebssystem)", "Virtual Desktop Infrastructure (VDI)", "Container-Orchestrierung", "Typ-2-Virtualisierung am Arbeitsplatz"], 1, "Bei VDI erhält jeder Nutzer eine eigene Desktop-VM im Rechenzentrum. Beim Terminalserver teilen sich die Nutzer ein Server-Betriebssystem."),
      q.multi("Welche Aussagen zur Servervirtualisierung sind richtig?", ["Mehrere schwach ausgelastete Server lassen sich auf einem Host konsolidieren.", "Fällt der Host aus, laufen die VMs auch ohne Cluster automatisch weiter.", "VMs lassen sich ohne Neuinstallation auf einen anderen Host verschieben.", "Überprovisionierter Arbeitsspeicher kann bei Lastspitzen zu Leistungseinbrüchen führen."], [0, 2, 3], "Ohne Cluster bzw. Hochverfügbarkeitsfunktion ist der Host ein Single Point of Failure: Fällt er aus, stehen alle VMs."),
      q.single("Die Muster GmbH mietet bei einem Cloud-Anbieter virtuelle Server (IaaS). Wer ist für die Sicherheitsupdates des Gastbetriebssystems zuständig?", ["Der Cloud-Anbieter", "Die Muster GmbH als Kunde", "Der Hersteller der Serverhardware", "Niemand, virtuelle Server benötigen keine Updates"], 1, "Bei IaaS betreibt der Anbieter Hardware und Hypervisor. Betriebssystem, Anwendungen und Daten in der VM verwaltet der Kunde."),
      q.open(
        "Die Muster GmbH betreibt sechs ältere, schwach ausgelastete physische Server. Die Geschäftsführung fragt, ob sich eine Servervirtualisierung lohnt. Nenne drei Vorteile, zwei Nachteile bzw. Risiken und eine Maßnahme gegen den Ausfall des Virtualisierungshosts.",
        "Vorteile: Konsolidierung auf weniger Hardware (bessere Auslastung, weniger Strom, Platz und Kühlung), schnelle Bereitstellung neuer Server über Vorlagen, Snapshots vor Änderungen, VMs hardwareunabhängig und auf andere Hosts verschiebbar, Isolation der Dienste. Nachteile/Risiken: Host als Single Point of Failure, Ressourcenkonkurrenz bzw. Leistungseinbußen bei Überprovisionierung, Investition in leistungsfähige Hardware, Lizenzkosten und Know-how, Hypervisor als zusätzliches Angriffsziel. Maßnahme: zweiter Host im Cluster mit gemeinsamem Speicher und Hochverfügbarkeit bzw. Live-Migration; zusätzlich regelmäßige Backups der VMs.",
        "",
        { difficulty: 2 },
      ),
    ],
    cards: [
      card("Hypervisor Typ 1 vs. Typ 2", "Typ 1 (bare metal): direkt auf der Hardware, z. B. ESXi, Hyper-V. Typ 2 (hosted): Anwendung auf einem Host-OS, z. B. VirtualBox, VMware Workstation.", true),
      card("VM vs. Container", "VM: eigenes Gast-OS mit eigenem Kernel, starke Isolation. Container: teilt den Kernel des Hosts, klein, startet in Sekunden (z. B. Docker).", true),
      card("Snapshot ≠ Backup", "Snapshot liegt auf demselben Speicher und hängt von der Basis-Festplatte ab – nur kurzfristig vor Änderungen nutzen, Backup separat.", true),
      card("RAM-Bedarf Virtualisierungshost", "Summe RAM aller VMs + Hypervisor-Overhead + Reserve (z. B. 20–25 %).", true),
      card("Überprovisionierung", "Mehr vCPUs, RAM oder Speicherplatz zuweisen als physisch vorhanden – bessere Auslastung, aber nur mit Monitoring."),
      card("VDI", "Virtual Desktop Infrastructure: Jeder Nutzer hat eine eigene Desktop-VM im Rechenzentrum, Zugriff per Remote-Protokoll (z. B. RDP)."),
      card("Intel VT-x / AMD-V", "CPU-Erweiterungen für Hardware-Virtualisierung; müssen im BIOS/UEFI aktiviert sein."),
      card("Live-Migration", "Verschieben einer laufenden VM auf einen anderen Host ohne merkliche Unterbrechung, z. B. für Wartungsarbeiten."),
    ],
  },
  {
    id: "ap1-it-sicherheit",
    part: "AP1",
    lf: "LF04",
    title: "IT-Sicherheit & Schutzbedarf",
    summary: "Schutzziele, Schutzbedarfsanalyse, Bedrohungen, Verschlüsselung, Hash, Signatur, MFA.",
    weight: 5,
    hours: 4,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["L10", "O02"],
      keyPoints: [
        "Schutzziele CIA: Vertraulichkeit, Integrität, Verfügbarkeit (+ Authentizität, Verbindlichkeit).",
        "Schutzbedarfskategorien (BSI): normal, hoch, sehr hoch.",
        "Symmetrisch (AES): ein Schlüssel, schnell. Asymmetrisch (RSA/ECC): Schlüsselpaar.",
        "Signatur: mit privatem Schlüssel signieren, mit öffentlichem prüfen.",
        "MFA kombiniert Faktoren aus Wissen, Besitz und Inhärenz (Biometrie).",
        "VPN: verschlüsselter Tunnel über ein unsicheres Netz. Site-to-Site verbindet Netze, Client-to-Site (Remote Access) einzelne Geräte mit dem Firmennetz.",
        "VPN-Verfahren: IPsec (Schicht 3, ESP verschlüsselt), SSL/TLS-VPN (oft TCP 443), WireGuard (schlank, UDP).",
        "Split Tunneling: nur Firmenverkehr durch den Tunnel. Ein VPN schützt den Transportweg, macht aber nicht anonym.",
      ],
      content: `## Schutzziele
- **Vertraulichkeit**: Nur Berechtigte sehen Daten (Verschlüsselung, Rechte).
- **Integrität**: Daten sind unverändert und korrekt (Hash, Signatur).
- **Verfügbarkeit**: Systeme/Daten sind nutzbar, wenn benötigt (Backup, USV, Redundanz).
- Ergänzend: Authentizität, Verbindlichkeit (Nichtabstreitbarkeit).

## Schutzbedarfsanalyse (BSI IT-Grundschutz)
Für jedes Objekt (Anwendung, System, Raum) wird der Schutzbedarf je Schutzziel bestimmt: **normal – hoch – sehr hoch**. Maximumprinzip: Ein System erbt den höchsten Schutzbedarf der darauf laufenden Anwendungen.

## Bedrohungen
Phishing, Social Engineering, Ransomware, Malware, schwache Passwörter, ungepatchte Software, Innentäter, Hardwaredefekt, Feuer/Wasser.

## Maßnahmen (TOM)
Technisch: Firewall, Updates, Virenschutz, Verschlüsselung, MFA, Backups, Logging. Organisatorisch: Richtlinien, Schulungen, Rollen- und Rechtekonzept (Least Privilege), Notfallplan.

## Kryptografie
| | Symmetrisch | Asymmetrisch |
|---|---|---|
| Schlüssel | ein gemeinsamer | öffentlicher + privater |
| Beispiel | AES | RSA, ECC |
| Tempo | schnell | langsam |
| Problem | Schlüsselaustausch | Rechenaufwand |

**Hybride Verschlüsselung** (z. B. TLS): Sitzungsschlüssel asymmetrisch austauschen, Daten symmetrisch verschlüsseln.

**Hashfunktion** (SHA-256): Einwegfunktion, feste Länge, Integritätsprüfung. Passwörter mit **Salt** und langsamen Verfahren (bcrypt, Argon2) speichern.

**Digitale Signatur**: Hash mit **privatem** Schlüssel des Absenders signieren → Empfänger prüft mit dessen **öffentlichem** Schlüssel.

## VPN (Virtual Private Network)
Ein **VPN** baut über ein unsicheres Netz (meist das Internet) eine **verschlüsselte und authentifizierte Verbindung** auf. Für die Beteiligten wirkt es so, als wären sie direkt im selben privaten Netz. Damit schützt ein VPN Vertraulichkeit, Integrität und Authentizität der übertragenen Daten.

**Tunneling**: Die ursprünglichen Datenpakete werden verschlüsselt und in neue Pakete eingepackt (gekapselt). Unterwegs sind nur die äußeren Pakete zwischen den beiden Tunnelendpunkten sichtbar, nicht der Inhalt.

### Site-to-Site vs. Client-to-Site
| | Site-to-Site | Client-to-Site (Remote Access) |
|---|---|---|
| verbindet | zwei Netze, z. B. Zentrale und Filiale | ein einzelnes Gerät mit dem Firmennetz |
| Endpunkte | VPN-Gateways (Router/Firewall) an beiden Standorten | VPN-Client auf dem Gerät + VPN-Gateway der Firma |
| für Nutzer | unsichtbar, dauerhaft aktiv | Nutzer baut die Verbindung auf und meldet sich an |
| typisch | Standortvernetzung | Homeoffice, Außendienst |

Weitere Bezeichnungen: **End-to-Site** für Client-to-Site, **End-to-End** für eine direkte Verbindung zweier einzelner Rechner.

### VPN-Verfahren
| Verfahren | Merkmale |
|---|---|
| **IPsec** | arbeitet auf Schicht 3; **ESP** verschlüsselt und sichert die Integrität, **AH** sichert nur Integrität und Authentizität (keine Verschlüsselung); Schlüsselaustausch per **IKE** (UDP 500, hinter NAT UDP 4500); verbreitet für Site-to-Site |
| **SSL/TLS-VPN** | nutzt TLS wie HTTPS, oft über TCP 443 und kommt daher durch die meisten Firewalls; mit Client-Software (z. B. OpenVPN, Standardport UDP 1194, bei Bedarf auch TCP 443) oder clientlos über ein Webportal im Browser |
| **WireGuard** | modern und schlank (wenig Code), aktuelle Kryptografie, Authentifizierung über Schlüsselpaare statt Zertifikate, nutzt UDP (Standardport 51820) |

IPsec kennt den **Tunnelmodus** (das komplette IP-Paket wird gekapselt, typisch zwischen VPN-Gateways) und den **Transportmodus** (nur die Nutzdaten werden geschützt, z. B. zwischen zwei Hosts). Das alte **PPTP** gilt als unsicher und sollte nicht mehr eingesetzt werden.

### Full Tunnel vs. Split Tunneling
- **Full Tunnel**: Der gesamte Datenverkehr des Geräts läuft durch den Tunnel ins Firmennetz, auch Internetzugriffe. Die Firma kann alles über ihre Firewall filtern, das VPN-Gateway wird aber stärker belastet.
- **Split Tunneling**: Nur der Verkehr ins Firmennetz läuft durch den Tunnel, alles andere geht direkt ins Internet. Das entlastet Gateway und Internetanbindung der Firma, dafür umgeht der Internetverkehr die Schutzmaßnahmen der Firma.

### VPN ≠ Anonymität
Ein VPN verschlüsselt nur die Strecke **bis zum VPN-Endpunkt**. Wer den Endpunkt betreibt (die Firma oder ein VPN-Anbieter), kann den Verkehr sehen und protokollieren; dahinter geht es ohne VPN-Verschlüsselung weiter. Anmeldungen, Cookies und Browser-Fingerprinting identifizieren Nutzer weiterhin. Ein VPN schützt außerdem nicht vor Phishing, Malware oder einem kompromittierten Endgerät.

### Homeoffice und Datenschutz
Werden im Homeoffice personenbezogene Daten verarbeitet, verlangt Art. 32 DSGVO geeignete technische und organisatorische Maßnahmen. Das VPN schützt den **Transportweg**, z. B. über das private WLAN. Hinzu kommen: **MFA** für die VPN-Anmeldung, verwaltete und aktuelle Firmengeräte mit Festplattenverschlüsselung, automatische Bildschirmsperre, klare Regeln (z. B. keine Firmendaten auf privaten Geräten) und Schulungen der Beschäftigten.`,
    },
    questions: [
      q.single("Ein Angreifer verändert unbemerkt Beträge in einer Rechnungsdatei. Welches Schutzziel ist verletzt?", ["Vertraulichkeit", "Integrität", "Verfügbarkeit", "Anonymität"], 1, "Unbefugte Veränderung → Integrität.", { placement: true, difficulty: 1 }),
      q.single("Womit verschlüsselt Alice eine Nachricht an Bob asymmetrisch, damit nur Bob sie lesen kann?", ["Alices privatem Schlüssel", "Alices öffentlichem Schlüssel", "Bobs öffentlichem Schlüssel", "Bobs privatem Schlüssel"], 2, "Verschlüsselt wird mit dem öffentlichen Schlüssel des Empfängers; nur dessen privater Schlüssel entschlüsselt.", { placement: true }),
      q.single("Womit wird eine digitale Signatur erstellt?", ["Öffentlicher Schlüssel des Empfängers", "Privater Schlüssel des Absenders", "Symmetrischer Sitzungsschlüssel", "Passwort-Hash"], 1, "Signieren mit dem privaten Schlüssel des Absenders, prüfen mit seinem öffentlichen Schlüssel."),
      q.multi("Welche Kombinationen sind echte Multi-Faktor-Authentifizierung?", ["Passwort + PIN", "Passwort + Code aus Authenticator-App", "Fingerabdruck + Smartcard", "Zwei verschiedene Passwörter"], [1, 2], "MFA braucht Faktoren aus verschiedenen Kategorien (Wissen, Besitz, Biometrie). Passwort + PIN sind beides Wissen."),
      q.single("Was ist eine Eigenschaft einer kryptografischen Hashfunktion?", ["Sie ist umkehrbar.", "Gleiche Eingabe liefert immer denselben Hashwert fester Länge.", "Sie braucht einen privaten Schlüssel.", "Der Hash wird länger, je länger die Eingabe ist."], 1, "Hashfunktionen sind deterministisch, einwegig und liefern eine feste Länge."),
      q.single("Warum wird beim Speichern von Passwörtern ein Salt verwendet?", ["Damit Passwörter wieder entschlüsselt werden können", "Damit gleiche Passwörter unterschiedliche Hashes erhalten und Rainbow-Tables nicht helfen", "Um Speicherplatz zu sparen", "Damit die Anmeldung schneller geht"], 1, "Ein zufälliges Salt pro Passwort verhindert vorberechnete Angriffe (Rainbow Tables)."),
      q.open("Eine Mitarbeiterin erhält eine E-Mail der „IT-Abteilung“ mit der Bitte, ihr Passwort über einen Link zu bestätigen. Nenne drei Merkmale für Phishing und zwei Maßnahmen.", "Merkmale: Zeitdruck/Drohung, falsche/abweichende Absenderadresse, Link zu fremder Domain, Aufforderung zur Passworteingabe, Rechtschreibfehler. Maßnahmen: Link nicht anklicken, IT über bekannten Kanal informieren, Mitarbeiterschulungen, MFA, Spam-/Link-Filter, Meldebutton.", "", { difficulty: 2 }),
      q.single("Nach dem Maximumprinzip hat ein Server, auf dem eine Anwendung mit Schutzbedarf „sehr hoch“ läuft, den Schutzbedarf …", ["normal", "hoch", "sehr hoch", "den Durchschnitt aller Anwendungen"], 2, "Das System übernimmt den höchsten Schutzbedarf der Anwendungen."),
      q.single("Eine Außendienstmitarbeiterin der Muster GmbH soll unterwegs mit ihrem Notebook auf den Dateiserver der Firma zugreifen. Welche VPN-Art passt?", ["Site-to-Site-VPN", "Client-to-Site-VPN (Remote Access)", "VLAN-Trunk", "Port-Forwarding auf den Dateiserver"], 1, "Ein einzelnes Gerät verbindet sich per VPN-Client mit dem VPN-Gateway der Firma → Client-to-Site (Remote Access). Port-Forwarding würde den Dateiserver ungeschützt ins Internet stellen.", { difficulty: 1, sources: ["L06", "L10"] }),
      q.single("Zentrale und Filiale der Muster GmbH sollen dauerhaft über das Internet verbunden werden, ohne dass die Beschäftigten selbst eine Verbindung aufbauen müssen. Welche Lösung ist geeignet?", ["Client-to-Site-VPN auf jedem PC", "Site-to-Site-VPN zwischen den Firewalls beider Standorte", "Gäste-WLAN in beiden Standorten", "Unverschlüsselte Verbindung über eine feste IP-Adresse"], 1, "Ein Site-to-Site-VPN verbindet die beiden Netze über die VPN-Gateways. Für die Nutzer ist der Tunnel unsichtbar und dauerhaft aktiv.", { sources: ["L06", "L10"] }),
      q.single("Welches IPsec-Protokoll verschlüsselt die Nutzdaten?", ["AH (Authentication Header)", "ESP (Encapsulating Security Payload)", "IKE (Internet Key Exchange)", "ARP (Address Resolution Protocol)"], 1, "ESP verschlüsselt und sichert die Integrität. AH sichert nur Integrität und Authentizität, IKE handelt die Schlüssel aus, ARP gehört nicht zu IPsec.", { sources: ["L06"] }),
      q.multi("Welche Aussagen zu Split Tunneling sind richtig?", ["Nur der Verkehr ins Firmennetz läuft durch den VPN-Tunnel.", "Der gesamte Internetverkehr des Geräts wird über die Firmen-Firewall gefiltert.", "Das VPN-Gateway der Firma wird entlastet.", "Internetzugriffe des Geräts umgehen die Schutzmaßnahmen der Firma."], [0, 2, 3], "Beim Split Tunneling geht nur der Firmenverkehr durch den Tunnel. Dass alles über die Firmen-Firewall läuft, beschreibt den Full Tunnel.", { sources: ["L06", "L10"] }),
      q.single("Ein Kollege sagt: „Mit einem kommerziellen VPN-Dienst bin ich im Internet anonym.“ Was trifft zu?", ["Stimmt, ein VPN verhindert jede Identifizierung.", "Nur bedingt: Der VPN-Anbieter kann den Verkehr sehen, und Anmeldungen oder Cookies identifizieren den Nutzer weiterhin.", "Stimmt, sofern WireGuard verwendet wird.", "Stimmt, weil das VPN die Daten bis zur Zielwebseite verschlüsselt."], 1, "Das VPN verschlüsselt nur bis zum VPN-Endpunkt. Der Betreiber sieht den Verkehr, und Logins, Cookies oder Fingerprinting machen Nutzer weiterhin erkennbar.", { sources: ["L06", "L10"] }),
      q.short("Über welchen TCP-Port laufen SSL/TLS-VPNs häufig, damit sie Firewalls problemlos passieren? (Portnummer)", ["443", "TCP 443", "443/tcp"], "SSL/TLS-VPNs nutzen oft TCP 443 – denselben Port wie HTTPS, der in fast jeder Firewall freigegeben ist.", { sources: ["L06"] }),
      q.open(
        "Die Muster GmbH führt Homeoffice ein. Die Beschäftigten sollen von zu Hause auf Kundendaten im Firmennetz zugreifen. Beschreibe eine geeignete VPN-Lösung (Art und ein mögliches Verfahren) und nenne drei weitere Maßnahmen, damit der Zugriff sicher und datenschutzkonform ist.",
        "VPN-Lösung: Client-to-Site-VPN (Remote Access) vom Firmen-Notebook zum VPN-Gateway der Firma, z. B. mit IPsec (IKEv2), einem SSL/TLS-VPN oder WireGuard; möglichst Full Tunnel, damit auch der Internetverkehr über die Firmen-Firewall läuft. Weitere Maßnahmen: MFA für die VPN-Anmeldung, verwaltete Firmengeräte mit aktuellen Updates, Virenschutz und Festplattenverschlüsselung, automatische Bildschirmsperre und Sichtschutz, Rechtevergabe nach Least Privilege, Homeoffice-Richtlinie (keine Firmendaten auf privaten Geräten, kein Ausdruck sensibler Daten), Schulung der Beschäftigten, Protokollierung der Zugriffe.",
        "",
        { sources: ["L09", "L10"] },
      ),
    ],
    cards: [
      card("CIA-Schutzziele", "Confidentiality (Vertraulichkeit), Integrity (Integrität), Availability (Verfügbarkeit)", true),
      card("Asymmetrisch verschlüsseln", "Mit dem öffentlichen Schlüssel des Empfängers – nur dessen privater Schlüssel entschlüsselt.", true),
      card("Digitale Signatur", "Hash mit privatem Schlüssel des Absenders signieren, mit dessen öffentlichem Schlüssel prüfen.", true),
      card("MFA-Faktoren", "Wissen (Passwort), Besitz (Token, Handy), Inhärenz (Biometrie)", true),
      card("Hybride Verschlüsselung", "Sitzungsschlüssel asymmetrisch austauschen, Daten symmetrisch (schnell) verschlüsseln – z. B. TLS."),
      card("Maximumprinzip", "Ein System erbt den höchsten Schutzbedarf seiner Anwendungen."),
      card("Site-to-Site vs. Client-to-Site", "Site-to-Site: verbindet zwei Netze über VPN-Gateways, dauerhaft. Client-to-Site (Remote Access): einzelnes Gerät mit VPN-Client ins Firmennetz.", true),
      card("IPsec: AH vs. ESP", "AH: Integrität und Authentizität, keine Verschlüsselung. ESP: Verschlüsselung + Integrität. Schlüsselaustausch per IKE.", true),
      card("Split Tunneling", "Nur Firmenverkehr durch den VPN-Tunnel, Internetverkehr direkt. Gegenteil: Full Tunnel (alles durch den Tunnel)."),
      card("VPN ≠ Anonymität", "Verschlüsselt nur bis zum VPN-Endpunkt; der Betreiber sieht den Verkehr, Logins und Cookies identifizieren weiterhin."),
      card("SSL/TLS-VPN vs. WireGuard", "SSL/TLS-VPN: basiert auf TLS, oft TCP 443, auch clientlos im Browser. WireGuard: schlank, modern, Schlüsselpaare, UDP."),
    ],
  },
  {
    id: "ap1-datenschutz",
    part: "AP1",
    lf: "LF04",
    title: "Datenschutz (DSGVO)",
    summary: "Personenbezogene Daten, Grundsätze, Rechtsgrundlagen, Betroffenenrechte, TOM, Meldepflicht.",
    weight: 4,
    hours: 3,
    difficulty: 2,
    mustKnow: true,
    lesson: {
      sources: ["L09"],
      keyPoints: [
        "Personenbezogen = jede Information zu einer identifizierten oder identifizierbaren natürlichen Person.",
        "Grundsätze Art. 5: Rechtmäßigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität/Vertraulichkeit, Rechenschaftspflicht.",
        "Verarbeitung nur mit Rechtsgrundlage (Art. 6), z. B. Einwilligung, Vertrag, rechtliche Pflicht, berechtigtes Interesse.",
        "Datenpannen innerhalb von 72 Stunden an die Aufsichtsbehörde melden (Art. 33).",
        "Pseudonymisiert = noch personenbezogen; anonymisiert = kein Personenbezug mehr.",
      ],
      content: `## Grundbegriffe
- **Personenbezogene Daten**: Name, E-Mail, IP-Adresse, Personalnummer, Standort …
- **Besondere Kategorien** (Art. 9): Gesundheit, Religion, Herkunft, Biometrie, Gewerkschaft – besonders geschützt.
- **Verantwortlicher**: entscheidet über Zweck und Mittel. **Auftragsverarbeiter** (Art. 28) verarbeitet im Auftrag → **AV-Vertrag** nötig (z. B. Cloud-Anbieter).

## Grundsätze (Art. 5)
Rechtmäßigkeit/Transparenz · Zweckbindung · Datenminimierung · Richtigkeit · Speicherbegrenzung · Integrität und Vertraulichkeit · Rechenschaftspflicht

## Rechtsgrundlagen (Art. 6)
Einwilligung · Vertragserfüllung · rechtliche Verpflichtung · lebenswichtige Interessen · öffentliches Interesse · berechtigtes Interesse.

## Betroffenenrechte
Auskunft (Art. 15) · Berichtigung (16) · Löschung (17) · Einschränkung (18) · Datenübertragbarkeit (20) · Widerspruch (21)

## Technische und organisatorische Maßnahmen (Art. 32)
Pseudonymisierung, Verschlüsselung, Zugriffskontrolle, Backups, Wiederherstellbarkeit, regelmäßige Überprüfung.

## Pflichten
- **Datenpanne** → Meldung an Aufsichtsbehörde binnen **72 Stunden** (Art. 33), ggf. Betroffene informieren.
- **Datenschutzbeauftragter**: in Deutschland u. a. Pflicht, wenn i. d. R. mindestens 20 Personen ständig mit automatisierter Verarbeitung beschäftigt sind (§ 38 BDSG).
- Bußgelder bis 20 Mio. € oder 4 % des weltweiten Jahresumsatzes.

> Hinweis: Rechtstexte ändern sich – im Zweifel die aktuelle Fassung prüfen.`,
    },
    questions: [
      q.single("Welche Information ist KEIN personenbezogenes Datum?", ["E-Mail-Adresse max.mustermann@firma.de", "IP-Adresse eines Kunden", "Durchschnittsalter aller Kunden (anonym, aggregiert)", "Personalnummer"], 2, "Anonymisierte, aggregierte Werte lassen keinen Rückschluss auf eine Person zu.", { placement: true }),
      q.short("Innerhalb wie vieler Stunden muss eine meldepflichtige Datenpanne der Aufsichtsbehörde gemeldet werden?", ["72", "72 Stunden", "72h"], "Art. 33 DSGVO: unverzüglich, möglichst binnen 72 Stunden.", { difficulty: 1 }),
      q.single("Welcher Grundsatz verlangt, nur so viele Daten wie nötig zu erheben?", ["Zweckbindung", "Datenminimierung", "Speicherbegrenzung", "Transparenz"], 1, "Datenminimierung (Art. 5 Abs. 1 lit. c)."),
      q.single("Ein Unternehmen lässt Kundendaten bei einem Cloud-Anbieter speichern. Was ist erforderlich?", ["Nichts, wenn der Anbieter bekannt ist", "Ein Auftragsverarbeitungsvertrag (Art. 28)", "Die Einwilligung der IHK", "Eine Löschung nach 24 Stunden"], 1, "Der Cloud-Anbieter ist Auftragsverarbeiter → AV-Vertrag."),
      q.multi("Welche sind Betroffenenrechte nach DSGVO?", ["Recht auf Auskunft", "Recht auf Löschung", "Recht auf kostenlosen Support", "Recht auf Datenübertragbarkeit"], [0, 1, 3], "Auskunft, Löschung, Datenübertragbarkeit u. a. – kostenloser Support gehört nicht dazu."),
      q.single("Was unterscheidet Pseudonymisierung von Anonymisierung?", ["Nichts", "Pseudonymisierte Daten lassen sich mit Zusatzwissen wieder einer Person zuordnen", "Anonymisierte Daten sind verschlüsselt", "Pseudonymisierte Daten fallen nicht unter die DSGVO"], 1, "Pseudonymisierte Daten bleiben personenbezogen, anonyme nicht."),
    ],
    cards: [
      card("Art. 5 DSGVO – Grundsätze", "Rechtmäßigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität/Vertraulichkeit, Rechenschaft", true),
      card("Meldepflicht Datenpanne", "Binnen 72 Stunden an die Aufsichtsbehörde (Art. 33)", true),
      card("Auftragsverarbeitung", "Dienstleister verarbeitet Daten im Auftrag → AV-Vertrag nach Art. 28.", true),
      card("Besondere Kategorien (Art. 9)", "Gesundheit, Religion, ethnische Herkunft, Biometrie, Sexualleben, Gewerkschaft, politische Meinung"),
      card("Pseudonymisierung", "Personenbezug nur mit getrennt aufbewahrtem Zusatzwissen herstellbar – bleibt personenbezogen."),
    ],
  },
  {
    id: "ap1-backup",
    part: "AP1",
    lf: "LF04",
    title: "Datensicherung & RAID",
    summary: "Voll-, inkrementelle, differenzielle Sicherung, 3-2-1-Regel, Generationenprinzip, RAID-Level.",
    weight: 4,
    hours: 3,
    difficulty: 3,
    mustKnow: true,
    lesson: {
      sources: ["L10"],
      keyPoints: [
        "Inkrementell: Änderungen seit der letzten Sicherung (egal welcher). Differenziell: seit der letzten Vollsicherung.",
        "Wiederherstellung inkrementell: Voll + alle Inkremente; differenziell: Voll + letzte Differenzielle.",
        "3-2-1: drei Kopien, zwei Medientypen, eine Kopie extern/offline.",
        "RAID 0: keine Redundanz; RAID 1: Spiegelung; RAID 5: n−1 Kapazität; RAID 6: n−2; RAID 10: Hälfte.",
        "RAID ersetzt kein Backup (schützt nicht vor Löschen, Ransomware, Brand).",
      ],
      content: `## Sicherungsarten
| Art | sichert | Wiederherstellung |
|---|---|---|
| Voll | alles | nur die Vollsicherung |
| Inkrementell | Änderungen seit **letzter Sicherung** | Voll + **alle** Inkremente |
| Differenziell | Änderungen seit **letzter Vollsicherung** | Voll + **letzte** Differenzielle |

Inkrementell spart Platz und Zeit beim Sichern, Wiederherstellen dauert länger.

## Strategien
- **3-2-1-Regel**: 3 Kopien, 2 verschiedene Medien, 1 außer Haus (offline/immutable gegen Ransomware).
- **Generationenprinzip** (Großvater–Vater–Sohn): täglich, wöchentlich, monatlich rotieren.
- **RPO** (wie viel Datenverlust ist tolerierbar?) und **RTO** (wie schnell muss es wieder laufen?).
- Backups regelmäßig **testen** (Restore-Test)!

## RAID
| Level | Prinzip | min. Platten | nutzbar | Ausfall |
|---|---|---|---|---|
| 0 | Striping | 2 | 100 % | keiner |
| 1 | Mirroring | 2 | 50 % | 1 Platte |
| 5 | Striping + Parität | 3 | (n−1)/n | 1 Platte |
| 6 | doppelte Parität | 4 | (n−2)/n | 2 Platten |
| 10 | Spiegel + Striping | 4 | 50 % | 1 je Spiegel |

Beispiel: RAID 5 mit 4 × 4 TB → (4 − 1) × 4 TB = **12 TB** nutzbar.

**RAID ist kein Backup** – es erhöht nur die Verfügbarkeit bei Plattendefekt.`,
    },
    questions: [
      q.single("Montag Vollsicherung, Di–Fr inkrementell. Freitagabend fällt der Server aus. Was wird zur Wiederherstellung benötigt?", ["Nur Montag", "Montag + Freitag", "Montag + Di + Mi + Do + Fr", "Nur Freitag"], 2, "Inkrementell: Vollsicherung plus alle folgenden Inkremente.", { placement: true }),
      q.single("Montag Vollsicherung, Di–Fr differenziell. Was wird nach einem Ausfall am Freitagabend benötigt?", ["Montag + Freitag", "Nur Freitag", "Alle Sicherungen", "Montag + Dienstag"], 0, "Differenziell: Vollsicherung + letzte differenzielle Sicherung."),
      q.calc("Ein RAID 5 besteht aus 5 Festplatten à 2 TB. Wie viel Speicher (TB) ist nutzbar?", 8, "(5 − 1) × 2 TB = 8 TB.", { unit: "TB", tolerance: 0, placement: true }),
      q.calc("Ein RAID 6 besteht aus 6 Festplatten à 4 TB. Wie viel TB sind nutzbar?", 16, "(6 − 2) × 4 TB = 16 TB.", { unit: "TB", tolerance: 0 }),
      q.single("Welches RAID-Level bietet keine Ausfallsicherheit?", ["RAID 0", "RAID 1", "RAID 5", "RAID 10"], 0, "RAID 0 verteilt nur (Striping) – fällt eine Platte aus, sind alle Daten weg."),
      q.multi("Wovor schützt ein RAID 1 NICHT?", ["Ausfall einer Festplatte", "Versehentliches Löschen einer Datei", "Verschlüsselung durch Ransomware", "Brand im Serverraum"], [1, 2, 3], "Gespiegelt wird alles – auch Löschungen und Verschlüsselungen. Nur der Plattendefekt ist abgedeckt."),
      q.short("Wie heißt die Backup-Regel „3 Kopien, 2 Medien, 1 extern“?", ["3-2-1", "3-2-1-Regel", "321"], "Die 3-2-1-Regel."),
    ],
    cards: [
      card("Inkrementell vs. differenziell", "Inkrementell: seit letzter Sicherung. Differenziell: seit letzter Vollsicherung.", true),
      card("Wiederherstellung", "Inkrementell: Voll + alle Inkremente. Differenziell: Voll + letzte Differenzielle.", true),
      card("RAID 5 Kapazität", "(n − 1) × Plattengröße, mind. 3 Platten, 1 Ausfall verkraftbar", true),
      card("RAID ist kein Backup", "RAID schützt nur vor Hardwaredefekt, nicht vor Löschen, Malware, Brand.", true),
      card("RPO / RTO", "RPO: max. tolerierbarer Datenverlust (Zeit). RTO: max. Wiederherstellungsdauer."),
      card("3-2-1-Regel", "3 Kopien, 2 Medientypen, 1 Kopie außer Haus/offline"),
    ],
  },
];
