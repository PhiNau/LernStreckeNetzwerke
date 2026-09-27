# Netzwerke Q2

Interaktive Selbstlernstrecke für einen Informatikkurs der Q2: von IP-Adresse,
Port und TCP über HTTP und POP3 bis zu den NRW-Netzklassen und einem eigenen
Quizprotokoll.

## Enthalten

- neun Stationen (0 bis 8) für etwa 135 Minuten Lernzeit
- direkte Rückmeldungen, Klick-Sortierungen und Code-Exploration
- touchfreundliche Oberfläche für iPads und Desktopgeräte
- lokaler Lernfortschritt ohne Login oder personenbezogene Übertragung
- vollständig statische Ausgabe für GitHub Pages

## Lokal starten

Voraussetzung ist Node.js 22.

```bash
npm install
npm run dev
```

Der statische Produktionsstand wird mit `npm run build` nach `dist` geschrieben.
Relative Asset-Pfade sorgen dafür, dass die Seite sowohl als Benutzer- als auch
als Projektseite unter GitHub Pages funktioniert.

## GitHub Pages

Der Workflow `.github/workflows/deploy-pages.yml` baut und veröffentlicht die
Lernstrecke bei jedem Push auf `main`. In den Repository-Einstellungen muss unter
**Pages → Build and deployment** als Quelle **GitHub Actions** gewählt sein.

Die Originaldateien `Connection.java`, `Client.java` und `Server.java` sind nicht
Bestandteil dieses Repository-Standes und werden daher nicht als vermeintlicher
Originalcode nachgebildet. Sobald die schulisch verwendeten Originaldateien
vorliegen, können sie unverändert in einen Ordner `code/` gelegt werden.
