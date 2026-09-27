# Referenz: Interaktive Selbstlernstrecke Netzwerke (Q2 Informatik)

## 1. Ziel des Projekts

Dieses Projekt ist eine interaktive Selbstlernstrecke für einen Informatikkurs der Q2.
Die Lernenden haben Netzwerke zuvor bereits grafisch und experimentell mit **FILIUS**
kennengelernt. Die Lernstrecke soll nun den Übergang von der sichtbaren Netzwerkstruktur
zu den technischen Hintergründen und schließlich zur Java-Programmierung mit den
NRW-Netzklassen herstellen.

Der zeitliche Umfang beträgt insgesamt:

- **3 Unterrichtsstunden à 45 Minuten**
- Gesamtumfang: ca. **135 Minuten**
- Bearbeitung weitgehend selbstständig
- Bereitstellung über **GitHub Pages**
- kein Login und kein Backend notwendig

Zentrales didaktisches Muster jeder Station:

> **Input → Interaktion → Rückmeldung → nächster Schritt**

Die Seite soll deshalb kein digitales Skript mit langen Textblöcken werden, sondern eine
geführte Lernstrecke mit kurzen Inputs und möglichst vielen kleinen Denk- und
Anwendungsaufgaben.

---

# 2. Fachlicher Ausgangspunkt

## Vorwissen der Lerngruppe

Die Schülerinnen und Schüler haben sich bereits mit Netzwerken in **FILIUS** beschäftigt.

Als bekannt kann grundsätzlich vorausgesetzt werden:

- Rechner in einem Netzwerk
- Client und Server als Geräte bzw. Rollen
- IP-Adressen
- grundlegende Netzwerktopologien
- Router / Switches zumindest auf Anwendungsebene
- grafische Simulation von Netzwerkkommunikation

Noch nicht systematisch behandelt wurden:

- Ports als Zuordnung zu Anwendungen/Diensten
- TCP als Transportmechanismus
- Anwendungsprotokolle
- Aufbau und Ablauf konkreter Protokolle
- Zusammenhang zwischen Netzwerkkommunikation und Java-Code
- NRW-Netzklassen `Connection`, `Client` und `Server`

---

# 3. Bezug zum schulinternen Lehrplan

Thematischer Bereich:

## Daten in Netzwerken und Sicherheitsaspekte in Netzen sowie beim Zugriff auf Datenbanken

Relevante Inhalte:

- Beschreibung eines Webserverzugriffs anhand eines Anwendungskontextes
- Client-Server-Struktur
- Netztopologien als Grundlage von Client-Server-Strukturen
- TCP/IP-Schichtenmodell als Beispiel für Paketübermittlung
- Protokolle, insbesondere:
  - HTTP
  - HTTPS
  - POP3
- Analyse eines fertigen POP3-Clients
- spätere Anknüpfung an:
  - Vertraulichkeit
  - Integrität
  - Authentizität
  - symmetrische und asymmetrische Kryptografie

Relevante Kompetenzen:

Die Schülerinnen und Schüler sollen insbesondere

- Topologien beschreiben und erläutern,
- Client-Server-Strukturen beschreiben und erläutern,
- Protokolle in Netzwerken analysieren,
- ein Schichtenmodell erläutern,
- bereitgestellte Informatiksysteme reflektiert nutzen,
- fachliche Inhalte selbstständig erschließen und aufbereiten.

Für diese Lernstrecke steht zunächst der Bereich **Netzwerkkommunikation und Protokolle**
im Vordergrund. Kryptografie und Sicherheitsaspekte werden nur als Ausblick auf die
Folgeeinheit aufgegriffen.

---

# 4. Übergeordnetes Lernziel

Nach Abschluss der Lernstrecke sollen die Schülerinnen und Schüler erklären können,

> wie zwei Programme über ein Netzwerk miteinander kommunizieren und warum eine
> funktionierende Netzwerkverbindung allein noch nicht ausreicht.

Sie sollen insbesondere verstehen:

1. **IP-Adresse** bestimmt den Zielrechner.
2. **Port** bestimmt die Zielanwendung bzw. den Dienst.
3. **TCP** stellt eine zuverlässige Verbindung für den Datenaustausch bereit.
4. Ein **Anwendungsprotokoll** legt fest, welche Nachrichten ausgetauscht werden und
   welche Bedeutung sie besitzen.
5. Java-Programme können diese Kommunikation mithilfe von **Sockets** realisieren.
6. Die NRW-Netzklassen abstrahieren die technische Socket-Kommunikation.
7. Ein eigenes Client-Server-Programm benötigt ein klar definiertes Protokoll.

---

# 5. Leitidee der Lernstrecke

Die gesamte Lernstrecke folgt einer durchgehenden Frage:

> **Wie wird aus zwei verbundenen Rechnern eine funktionierende Netzwerkanwendung?**

Dabei entsteht schrittweise folgende Kette:

```text
Netzwerk
    ↓
IP-Adresse
    ↓
Port
    ↓
TCP-Verbindung
    ↓
Nachrichten
    ↓
Protokoll
    ↓
Client-Server-Anwendung
    ↓
Java-Implementierung
```

Die Lernenden sollen diese Zusammenhänge nicht nur lesen, sondern schrittweise selbst
rekonstruieren.

---

# 6. Aufbau der Lernstrecke

Empfohlen werden **8 Stationen**.

Eine Station sollte im Mittel etwa 10–20 Minuten beanspruchen.

---

# Station 0 – Einstieg: FILIUS kennt ihr schon

## Zeit

ca. 5 Minuten

## Ziel

Vorwissen aktivieren und die Leitfrage aufwerfen.

## Input

Kurze Situation:

> Ein Client kennt die IP-Adresse eines Servers und kann diesen über das Netzwerk
> erreichen.
>
> Aber woher weiß der Server, **welche Anwendung** gemeint ist?
>
> Und woher wissen beide Programme, **was eine Nachricht bedeutet**?

Darstellung beispielsweise:

```text
Client  ─────────────── Netzwerk ─────────────── Server
```

Danach erscheinen nacheinander die Begriffe:

```text
IP-Adresse
Port
TCP
Protokoll
```

## Interaktion

Vier kurze Aussagen den vier Begriffen zuordnen.

Beispiel:

- „Bestimmt den Zielrechner.“
- „Bestimmt den Dienst auf dem Zielrechner.“
- „Stellt eine zuverlässige Verbindung bereit.“
- „Legt Bedeutung und Reihenfolge von Nachrichten fest.“

## Rückmeldung

Direkte Rückmeldung nach jeder Zuordnung.

Nicht nur „richtig/falsch“, sondern kurz erklären:

> Richtig. Die IP-Adresse identifiziert den Rechner. Welche Anwendung auf diesem
> Rechner angesprochen wird, wird zusätzlich über einen Port festgelegt.

## Übergang

> Die Verbindung steht. Jetzt müssen Client und Server noch dieselbe Sprache sprechen.

---

# Station 1 – IP-Adresse, Port und TCP

## Zeit

ca. 15 Minuten

## Ziel

Die Rollen von IP-Adresse, Port und TCP voneinander unterscheiden.

## Kurzer Input

Beispiel:

```text
192.168.1.20 : 80
```

Aufschlüsselung:

```text
192.168.1.20  → Rechner
80            → Dienst / Anwendung
```

Optional Darstellung eines Servers mit mehreren Diensten:

```text
Server 192.168.1.20

Port 80      → Webserver
Port 443     → HTTPS
Port 110     → POP3
Port 5000    → eigenes Java-Programm
```

Hinweis:

Ports sind Nummern, über die auf einem Rechner verschiedene Netzwerkdienste
unterschieden werden können.

## TCP

Kurzer, funktionaler Input:

TCP übernimmt für die Anwendung insbesondere:

- Aufbau einer Verbindung
- zuverlässige Übertragung
- geordnete Übertragung
- Erkennen verlorener Daten und erneute Übertragung

Noch keine detaillierte TCP-Paketanalyse.

## Interaktion

### Aufgabe A

Mehrere Verbindungsangaben analysieren:

```text
192.168.0.12:80
10.0.0.15:110
172.16.1.4:5000
```

Fragen:

- Was bezeichnet die IP?
- Was bezeichnet der Port?
- Können mehrere Anwendungen dieselbe IP-Adresse verwenden?

### Aufgabe B

Lückenschema:

```text
Programm
   ↓
Port
   ↓
TCP
   ↓
IP
   ↓
Netzwerk
```

Begriffe richtig einsetzen.

## Rückmeldung

Direktes Feedback.

---

# Station 2 – Was ist überhaupt ein Protokoll?

## Zeit

ca. 15 Minuten

## Ziel

Den Begriff „Protokoll“ als Kommunikationsregel verstehen.

## Einstieg

Alltagsanalogie:

Zwei Personen besitzen Telefone. Damit können sie technisch miteinander verbunden
werden. Trotzdem benötigen sie gemeinsame Regeln und eine gemeinsame Sprache, damit
Kommunikation gelingt.

Übertragung:

> Eine Netzwerkverbindung transportiert Nachrichten.
> Ein Protokoll legt fest, **welche Nachrichten erlaubt sind und was sie bedeuten**.

## Arbeitsdefinition

Die Lernenden sollen eine Definition zunächst selbst vervollständigen.

Beispiel:

> Ein Netzwerkprotokoll ist eine Menge von ________, die festlegen, welche ________
> Kommunikationspartner austauschen, welche ________ diese Nachrichten besitzen und in
> welcher ________ sie auftreten dürfen.

Zielbegriffe:

- Regeln
- Nachrichten
- Bedeutung
- Reihenfolge

## Interaktion

Ein fiktiver Dialog:

```text
Client → Server: HALLO
Server → Client: OK
Client → Server: DATEN
Server → Client: 42
Client → Server: ENDE
```

Fragen:

- Welche Nachrichten sendet der Client?
- Welche der Server?
- Welche Nachricht beendet den Dialog?
- Welche Regeln lassen sich aus diesem Beispiel ableiten?

## Rückmeldung

Musterlösung schrittweise aufdecken.

---

# Station 3 – HTTP: Eine Webseite anfordern

## Zeit

ca. 15 Minuten

## Ziel

Ein reales Anwendungsprotokoll anhand eines konkreten Requests analysieren.

## Beispiel

Vereinfachter Request:

```http
GET /index.html HTTP/1.1
Host: beispiel.de
```

Vereinfachte Antwort:

```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>
...
</html>
```

## Begriffe

Nur das Nötigste:

- Request
- Response
- Methode `GET`
- Ressource `/index.html`
- Statuscode `200`
- Inhalt der Antwort

## Interaktion

### Aufgabe A

Markiere / ordne zu:

- Methode
- angeforderte Ressource
- Protokollversion
- Statuscode
- eigentlicher Inhalt

### Aufgabe B

Frage:

> Was würde passieren, wenn ein Client nach dem Aufbau der TCP-Verbindung einfach
> `HALLO SERVER` an einen Webserver sendet?

Erwartete Erkenntnis:

Die TCP-Verbindung kann technisch funktionieren, aber die Nachricht entspricht nicht
dem erwarteten HTTP-Protokoll.

## Transferfrage

> Welche Aufgabe übernimmt TCP und welche Aufgabe HTTP?

Erwartung:

- TCP: Übertragung
- HTTP: Bedeutung und Struktur der Nachrichten

---

# Station 4 – POP3: Ein Protokoll als Dialog

## Zeit

ca. 20 Minuten

## Ziel

Einen protokollgesteuerten Kommunikationsablauf analysieren.

## Beispiel

```text
S: +OK POP3 server ready
C: USER philipp
S: +OK
C: PASS geheim
S: +OK
C: STAT
S: +OK 4 18200
C: RETR 1
S: +OK
C: QUIT
S: +OK
```

Wichtig:

Dies ist ein didaktisch vereinfachter Ablauf.

## Interaktion

### Aufgabe A – Reihenfolge

Die einzelnen Nachrichten werden gemischt dargestellt.

Die Lernenden müssen sie in eine sinnvolle Reihenfolge bringen.

### Aufgabe B – Nachrichten klassifizieren

Beispiele:

```text
USER
PASS
STAT
RETR
QUIT
```

Zuordnung zu Bedeutungen.

### Aufgabe C – Protokollregeln erkennen

Fragen:

- Kann `RETR 1` sinnvoll vor der Anmeldung auftreten?
- Welche Nachricht beendet die Sitzung?
- Warum reicht es nicht, nur die Liste aller möglichen Befehle zu kennen?

Erwartete Erkenntnis:

Ein Protokoll enthält nicht nur Befehle, sondern auch Regeln über Zustände und
zulässige Reihenfolgen.

## Optional

Ein sehr einfaches Zustandsdiagramm:

```text
Verbunden
   ↓ USER / PASS
Angemeldet
   ↓
Nachrichten abrufen
   ↓ QUIT
Beendet
```

---

# Station 5 – Von der Verbindung zum Java-Code: `Connection`

## Zeit

ca. 20 Minuten

## Ziel

Netzwerkbegriffe im Java-Code wiedererkennen.

## Grundlage

NRW-Netzklasse:

```text
Connection.java
```

Die Klasse ermöglicht eine TCP/IP-Verbindung zu einem Server und stellt Methoden für
das zeilenweise Senden und Empfangen von Strings bereit.

## Relevante Bestandteile

### Attribute

```java
private Socket socket;
private BufferedReader fromServer;
private PrintWriter toServer;
```

### Verbindung aufbauen

```java
socket = new Socket(pServerIP, pServerPort);
```

### Nachricht empfangen

```java
return fromServer.readLine();
```

### Nachricht senden

```java
toServer.println(pMessage);
```

### Verbindung schließen

```java
socket.close();
```

## Didaktischer Hinweis

Nicht jede Java-Zeile muss im Detail verstanden werden.

Die Lernenden sollen insbesondere erkennen:

```text
pServerIP      → Zielrechner
pServerPort    → Zielanwendung
Socket         → Netzwerkverbindung
send(...)      → Nachricht senden
receive()      → Nachricht empfangen
close()        → Verbindung beenden
```

## Interaktion

### Aufgabe A – Code anklicken

Code anzeigen:

```java
Connection verbindung =
    new Connection("192.168.0.10", 5000);

verbindung.send("HALLO");

String antwort = verbindung.receive();

verbindung.close();
```

Klickbare Bereiche:

- `Connection`
- `"192.168.0.10"`
- `5000`
- `send`
- `receive`
- `close`

Beim Anklicken erscheint eine kurze Erklärung.

### Aufgabe B – Ablauf sortieren

Elemente:

```text
Verbindung herstellen
Nachricht senden
Antwort empfangen
Verbindung schließen
```

In richtige Reihenfolge bringen.

### Aufgabe C – Visualisierung

Parallel zum Code soll eine Sequenzdarstellung erscheinen:

```text
Client                           Server
   |                                |
   | -------- TCP-Verbindung -----> |
   |                                |
   | -------- "HALLO" ------------> |
   |                                |
   | <------- Antwort ------------- |
   |                                |
   | -------- Verbindung Ende ----> |
```

---

# Station 6 – `Connection` oder `Client`?

## Zeit

ca. 15 Minuten

## Ziel

Synchrone Kommunikation und nebenläufigen Nachrichteneingang unterscheiden.

## Ausgangspunkt

`Connection` arbeitet konzeptionell nach dem Muster:

```java
send(...);
receive();
```

Das Programm fordert den Empfang aktiv an.

Die NRW-Klasse `Client` besitzt dagegen einen Hintergrundmechanismus zum Empfangen von
Nachrichten.

Zentrale Methode:

```java
public abstract void processMessage(String pMessage);
```

Immer wenn eine Nachricht eintrifft, kann die Unterklasse darauf reagieren.

## Interaktion

Szenarien klassifizieren:

### Szenario 1

Ein Programm fragt einmalig die aktuelle Uhrzeit von einem Server ab.

### Szenario 2

Ein Chatprogramm soll jederzeit neue Nachrichten anzeigen können.

### Szenario 3

Ein Spielserver kann jederzeit eine Änderung des Spielzustands senden.

Frage:

> In welchen Fällen ist ein dauerhaft auf eingehende Nachrichten reagierender `Client`
> besonders sinnvoll?

## Kernidee

Die Lernenden sollen verstehen:

```text
Connection:
Programm fragt gezielt eine Antwort ab.

Client:
Programm kann auf eintreffende Nachrichten reagieren.
```

Noch keine vertiefte Behandlung von Threads notwendig.

---

# Station 7 – Was macht der `Server`?

## Zeit

ca. 15 Minuten

## Ziel

Die ereignisorientierte Struktur der NRW-Serverklasse verstehen.

## Wichtig

Der interne Aufbau von `Server.java` ist relativ komplex.

Insbesondere:

- Threads
- ServerSocket
- mehrere Client-Verbindungen
- interne Handler
- Synchronisation

Diese Implementierungsdetails sind **nicht Hauptgegenstand dieser Lernstrecke**.

Stattdessen sollen die Lernenden verstehen, welche Ereignisse eine eigene
Server-Unterklasse behandeln muss.

## Die drei zentralen Methoden

```java
public abstract void processNewConnection(
    String pClientIP,
    int pClientPort);

public abstract void processMessage(
    String pClientIP,
    int pClientPort,
    String pMessage);

public abstract void processClosingConnection(
    String pClientIP,
    int pClientPort);
```

## Zuordnung

```text
Client verbindet sich
        ↓
processNewConnection(...)

Client sendet Nachricht
        ↓
processMessage(...)

Client trennt Verbindung
        ↓
processClosingConnection(...)
```

## Interaktion

Situationen passenden Methoden zuordnen.

Beispiele:

> Anna verbindet sich mit dem Server.

> Anna sendet `LOGIN:Anna`.

> Anna beendet das Programm.

## Transfer

Codefragment:

```java
public void processMessage(
    String pClientIP,
    int pClientPort,
    String pMessage) {

    if (pMessage.equals("PING")) {
        send(pClientIP, pClientPort, "PONG");
    }
}
```

Fragen:

- Welche Nachricht versteht der Server?
- Was antwortet er?
- Was passiert bei `HELLO`?

---

# Station 8 – Entwickle dein eigenes Protokoll

## Zeit

ca. 20–25 Minuten

## Ziel

Die bisher analysierten Konzepte selbst anwenden.

Diese Station bildet den Abschluss der Selbstlernphase und gleichzeitig die Vorbereitung
für die folgende Präsenzstunde.

## Anwendungskontext

### Quizserver

Ein Client verbindet sich mit einem Quizserver.

Der Client soll:

1. einen Namen anmelden,
2. eine Frage anfordern,
3. eine Antwort senden,
4. weitere Fragen anfordern können,
5. die Verbindung beenden können.

## Mögliche Client-Nachrichten

```text
LOGIN:<Name>
QUESTION
ANSWER:<Antwort>
QUIT
```

## Mögliche Server-Nachrichten

```text
OK
ERROR:<Beschreibung>
QUESTION:<Frage>:<A>:<B>:<C>:<D>
CORRECT
WRONG
BYE
```

Diese Vorgaben können entweder vollständig gegeben oder teilweise von den Lernenden
entwickelt werden.

## Interaktion

### Aufgabe A – Nachrichtentypen entwickeln

Die Lernenden entscheiden:

- Welche Nachricht meldet den Benutzer an?
- Welche Nachricht fordert eine Frage an?
- Wie wird eine Antwort übertragen?
- Wie wird die Verbindung beendet?

### Aufgabe B – Ablauf zusammenbauen

Beispiel:

```text
C → S   LOGIN:Anna
S → C   OK

C → S   QUESTION
S → C   QUESTION:Welche Zahl ist prim?:4:6:7:9

C → S   ANSWER:C
S → C   CORRECT

C → S   QUIT
S → C   BYE
```

Die Lernenden ordnen oder erstellen den Ablauf selbst.

### Aufgabe C – Fehlerfälle

Beispiele:

```text
ANSWER:C
```

wird vor `LOGIN` gesendet.

Oder:

```text
BANANE
```

ist kein definierter Befehl.

Frage:

> Wie sollte der Server reagieren?

Damit wird deutlich, dass ein Protokoll auch Fehlerbehandlung und erlaubte Zustände
definiert.

---

# 7. Abschluss: Lerncheck

Am Ende erscheint eine Selbstkontrolle.

## „Das kann ich jetzt“

Die Schülerinnen und Schüler sollen einschätzen:

- [ ] Ich kann Client und Server unterscheiden.
- [ ] Ich kann erklären, wozu eine IP-Adresse benötigt wird.
- [ ] Ich kann erklären, wozu ein Port benötigt wird.
- [ ] Ich kann TCP und ein Anwendungsprotokoll voneinander unterscheiden.
- [ ] Ich kann erklären, was ein Netzwerkprotokoll ist.
- [ ] Ich kann einen einfachen HTTP-Ablauf erklären.
- [ ] Ich kann einen POP3-Dialog analysieren.
- [ ] Ich kann die Methoden `send()`, `receive()` und `close()` der Klasse `Connection`
      erklären.
- [ ] Ich kann erklären, wozu `processMessage()` in der Klasse `Client` dient.
- [ ] Ich kann die drei Ereignismethoden der Klasse `Server` erklären.
- [ ] Ich kann für eine einfache Client-Server-Anwendung ein eigenes Protokoll
      entwerfen.

Optional:

Bei nicht erfüllten Punkten kann ein Link zur passenden Station angeboten werden.

---

# 8. Ausblick auf die nächste Präsenzstunde

Die Lernstrecke soll ausdrücklich auf die nächste Unterrichtsstunde hinführen.

Abschlussmeldung:

> Ihr habt nun ein eigenes Kommunikationsprotokoll entwickelt.
>
> In der nächsten Unterrichtsstunde setzen wir genau ein solches Protokoll mit den
> NRW-Netzklassen in Java um.

Mögliche nächste Unterrichtsinhalte:

1. eigene Unterklasse von `Server`
2. Implementierung von `processMessage(...)`
3. eigene Unterklasse von `Client`
4. Test auf einem Rechner
5. Test zwischen mehreren Rechnern
6. Erweiterung des Protokolls

---

# 9. HTTPS und Sicherheit

HTTPS soll in dieser Lernstrecke nur kurz als Ausblick vorkommen.

Mögliche Formulierung:

> HTTP legt fest, welche Nachrichten Webbrowser und Webserver austauschen.
>
> Bei HTTPS wird diese Kommunikation zusätzlich geschützt übertragen.

Noch nicht vertiefen:

- TLS-Handshake
- Zertifikatsketten
- konkrete kryptografische Algorithmen

Diese Inhalte gehören sinnvoll in die anschließende Einheit zu:

- Vertraulichkeit
- Integrität
- Authentizität
- symmetrischer Verschlüsselung
- asymmetrischer Verschlüsselung
- RSA

---

# 10. Technische Umsetzung

## Grundidee

Die Anwendung soll vollständig clientseitig funktionieren.

Empfohlene Basis:

```text
HTML
CSS
JavaScript
GitHub Pages
```

Kein Backend notwendig.

---

# 11. Empfohlene Projektstruktur

Eine mögliche Struktur:

```text
netzwerke-q2/
│
├── index.html
├── README.md
├── REFERENZ.md
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── progress.js
│   ├── quiz.js
│   └── interactions.js
│
├── pages/
│   ├── 00-einstieg.html
│   ├── 01-ip-port-tcp.html
│   ├── 02-protokolle.html
│   ├── 03-http.html
│   ├── 04-pop3.html
│   ├── 05-connection.html
│   ├── 06-client.html
│   ├── 07-server.html
│   └── 08-eigenes-protokoll.html
│
├── assets/
│   ├── img/
│   └── icons/
│
└── code/
    ├── Connection.java
    ├── Client.java
    └── Server.java
```

Alternativ kann die gesamte Lernstrecke auch als Single-Page-Anwendung in `index.html`
umgesetzt werden.

Für die Wartbarkeit ist eine Trennung der Stationen jedoch wahrscheinlich sinnvoller.

---

# 12. Navigation

Die Navigation sollte sehr einfach sein.

Beispiel:

```text
← Zurück        Station 4 von 8        Weiter →
```

Zusätzlich:

```text
Fortschritt: ███████░░░ 70 %
```

Eine Übersichtsseite kann anzeigen:

```text
✓ Einstieg
✓ IP, Port und TCP
✓ Protokolle
✓ HTTP
● POP3
○ Connection
○ Client und Server
○ Eigenes Protokoll
```

---

# 13. Speicherung des Fortschritts

Es sollen keine personenbezogenen Daten an einen Server übertragen werden.

Der Bearbeitungsstand kann lokal im Browser gespeichert werden.

Beispiel:

```javascript
localStorage.setItem("station-03-complete", "true");
```

Beim Laden:

```javascript
const completed =
    localStorage.getItem("station-03-complete") === "true";
```

Wichtig:

Die Lernstrecke darf auch funktionieren, wenn `localStorage` gelöscht wurde.

Der Fortschritt ist nur Komfortfunktion und keine Leistungsdokumentation.

---

# 14. Gestaltung der Interaktionen

Bevorzugte Aufgabentypen:

## Multiple Choice

Gut für:

- Begriffe
- Verständnisfragen
- kurze Transferaufgaben

## Zuordnungen

Gut für:

```text
IP-Adresse ↔ Rechner
Port ↔ Anwendung
TCP ↔ zuverlässiger Transport
HTTP ↔ Webprotokoll
```

## Sortieraufgaben

Besonders geeignet für:

- POP3-Abläufe
- Client-Server-Kommunikation
- Reihenfolge von Methodenaufrufen

## Code-Exploration

Code wird angezeigt.

Einzelne Stellen sind anklickbar.

Beispiel:

```java
new Connection("192.168.0.10", 5000);
```

Beim Anklicken von `5000`:

> Das ist der Port des Serverprogramms.

## Sequenzdiagramme

Kommunikation sollte möglichst oft visuell dargestellt werden:

```text
Client                     Server
   |                          |
   | -------- LOGIN -------> |
   | <---------- OK -------- |
   |                          |
```

## Freie Eingaben

Nur sparsam einsetzen.

Bei offenen Antworten ist automatische Bewertung ohne KI nur begrenzt sinnvoll.

Stattdessen:

1. Lernende formulieren Antwort.
2. Klick auf „Musterlösung anzeigen“.
3. Selbstvergleich.

---

# 15. Feedback-Prinzipien

Feedback soll nicht nur aus

```text
Richtig!
```

oder

```text
Falsch!
```

bestehen.

Besser:

> Richtig. Ein Port unterscheidet verschiedene Anwendungen auf demselben Rechner.

Oder:

> Noch nicht ganz. Die IP-Adresse führt zum Rechner. Für die Auswahl des konkreten
> Dienstes wird zusätzlich ein Port benötigt.

Fehler sollen als Lerngelegenheit behandelt werden.

---

# 16. Anforderungen an die Benutzeroberfläche

Die Seite sollte:

- auf iPads gut funktionieren,
- Touch-Bedienung unterstützen,
- keine Hover-Aktionen voraussetzen,
- ausreichend große Schaltflächen besitzen,
- Code gut lesbar darstellen,
- wenig Text pro Bildschirm zeigen,
- auf unnötige Animationen verzichten.

Da die Lernenden voraussichtlich mit iPads arbeiten, gilt:

> **Touch first.**

Drag-and-Drop sollte nach Möglichkeit auch auf Touchgeräten funktionieren.

Falls das nicht zuverlässig gelingt, sind klickbasierte Sortierlösungen vorzuziehen.

---

# 17. Didaktische Gestaltungsregel

Eine Bildschirmseite sollte möglichst nur **eine zentrale neue Idee** behandeln.

Nicht:

```text
IP + Port + TCP + HTTP + Schichtenmodell + Socket
```

auf einem Bildschirm erklären.

Besser:

```text
Beobachtung
↓
eine neue Idee
↓
kleine Aufgabe
↓
Rückmeldung
↓
Transfer
```

---

# 18. Verhältnis Input / Aktivität

Richtwert:

```text
max. 2–4 Minuten Lesen
        ↓
Interaktion
        ↓
Feedback
```

Längere Textblöcke sollen vermieden werden.

Faustregel:

> Wenn ein Abschnitt problemlos als halbe DIN-A4-Seite gedruckt werden könnte,
> ist er für eine einzelne Station wahrscheinlich zu lang.

---

# 19. Code der NRW-Netzklassen

Die Originaldateien sollen dem Projekt unverändert beigelegt werden:

```text
Connection.java
Client.java
Server.java
```

Für die Lernseite dürfen relevante Ausschnitte hervorgehoben oder separat dargestellt
werden.

Die Originalklassen sollen jedoch nicht didaktisch „vereinfacht“ und anschließend als
Originalcode ausgegeben werden.

---

# 20. Fachlicher Fokus der drei Klassen

## `Connection`

Die Klasse eignet sich als Einstieg.

Schwerpunkte:

```java
new Connection(IP, Port)
send(...)
receive()
close()
```

Zentrale Idee:

> Eine bestehende TCP-Verbindung wird wie ein Kommunikationskanal verwendet.

---

## `Client`

Schwerpunkt:

```java
processMessage(...)
```

Zentrale Idee:

> Nachrichten können eintreffen, ohne dass das Hauptprogramm genau in diesem Moment
> `receive()` aufruft.

Threads müssen dabei nicht im Detail behandelt werden.

---

## `Server`

Schwerpunkte:

```java
processNewConnection(...)
processMessage(...)
processClosingConnection(...)
send(...)
sendToAll(...)
```

Zentrale Idee:

> Der Server reagiert auf Netzwerkereignisse.

Der interne Code für

- Threads,
- Socketverwaltung,
- Synchronisation,
- Client-Handler

ist zunächst Implementierungsdetail.

---

# 21. Mögliche spätere Programmieraufgabe

Nach der Selbstlernphase kann ein einfaches Projekt umgesetzt werden.

Beispiel:

## Ping-Pong-Server

Client:

```text
PING
```

Server:

```text
PONG
```

Danach Erweiterung:

```text
NAME:Anna
TIME
ECHO:Hallo
QUIT
```

Alternativ kann direkt der in Station 8 entworfene Quizserver implementiert werden.

---

# 22. Erweiterungsmöglichkeiten

Nicht für die erste Version notwendig.

Mögliche spätere Erweiterungen:

- interaktives TCP/IP-Schichtenmodell
- kleines Paket-Simulationsspiel
- HTTP-Statuscode-Quiz
- Vergleich HTTP / HTTPS
- Netzwerk-Traces
- vereinfachte Wireshark-Auswertung
- Simulation mehrerer Clients
- Fehlerfälle bei Protokollen
- Zustandsautomaten für Protokolle
- Live-Code-Editor
- Export des selbst entworfenen Protokolls als Textdatei

---

# 23. Was die erste Version ausdrücklich NICHT benötigt

Um den Projektumfang klein zu halten, zunächst nicht implementieren:

- Benutzerkonten
- Datenbank
- Server-Backend
- zentrale Ergebnisspeicherung
- Lehrkraft-Dashboard
- automatische Bewertung freier Texte
- komplexe Animationen
- echte TCP-Verbindungen aus der Website
- vollständige Netzwerk-Simulation im Browser
- vollständige Erklärung der Thread-Implementierung der NRW-Klassen

---

# 24. Definition of Done – erste Version

Die erste veröffentlichbare Version gilt als fertig, wenn:

- [ ] GitHub Pages die Seite korrekt ausliefert.
- [ ] Alle 8 Stationen erreichbar sind.
- [ ] Navigation auf iPad und Desktop funktioniert.
- [ ] Jede Station mindestens eine aktive Aufgabe enthält.
- [ ] Aufgaben direkt Feedback geben.
- [ ] HTTP und POP3 exemplarisch behandelt werden.
- [ ] `Connection.java` didaktisch analysiert wird.
- [ ] `Client.java` mit Fokus auf `processMessage()` behandelt wird.
- [ ] `Server.java` mit Fokus auf die drei Ereignismethoden behandelt wird.
- [ ] die Lernenden ein eigenes einfaches Protokoll entwickeln.
- [ ] der Bearbeitungsfortschritt lokal gespeichert werden kann.
- [ ] die gesamte Strecke ohne Login funktioniert.
- [ ] die Lernstrecke auf die anschließende Java-Implementierung vorbereitet.

---

# 25. Arbeitsauftrag für Codex

Dieses Dokument kann als zentrale Projektvorgabe verwendet werden.

Beispielprompt:

```text
Lies REFERENZ.md vollständig.

Wir entwickeln daraus schrittweise eine interaktive Lernstrecke für einen
Q2-Informatikkurs.

Halte dich insbesondere an:
- Input → Interaktion → Rückmeldung → nächster Schritt
- kurze Texte
- Touch-/iPad-Tauglichkeit
- keine Backend-Abhängigkeit
- GitHub-Pages-Kompatibilität
- fachliche Trennung von IP, Port, TCP und Anwendungsprotokoll
- Verwendung der Original-NRW-Netzklassen als fachliche Grundlage

Implementiere zunächst nur Station 0 und Station 1.
Erstelle dafür die notwendige Projektstruktur, HTML-, CSS- und JavaScript-Dateien.
Ändere die Dateien Connection.java, Client.java und Server.java nicht.
```

Danach kann schrittweise weitergearbeitet werden:

```text
Implementiere nun Station 2 gemäß REFERENZ.md.
```

oder:

```text
Überarbeite Station 4 gemäß den didaktischen Vorgaben in REFERENZ.md.
Die POP3-Kommunikation soll als interaktive Sortieraufgabe umgesetzt werden.
```

---

# 26. Wichtigste Leitlinie

Die Lernstrecke soll nicht versuchen, möglichst viele Informationen zu vermitteln.

Sie soll die Lernenden zu einer zentralen Erkenntnis führen:

> **Ein Netzwerk verbindet Rechner. TCP verbindet Programme.  
> Ein Protokoll sorgt dafür, dass diese Programme sich verstehen.**

Von dort aus wird der Übergang zur Java-Programmierung mit den NRW-Netzklassen
nachvollziehbar.
