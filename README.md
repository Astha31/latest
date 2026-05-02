# Flask Rätsel-Spiel 🎮

Ein einfaches, buntes Wort-Rätsel-Spiel und Block-Puzzle-Spiel, das mit Python Flask erstellt wurde. Perfekt für ein anfängerfreundliches Schulprojekt.

## Features ✨

### Wort-Rätsel Spiel
- Löse 4 deutsche Wörter, bevor die Zeit abläuft
- Hinweise für jedes Rätsel
- 90-Sekunden Timer
- Punkteverfolgung und Zähler

### Block-Puzzle Spiel (Tetris-Style)
- Fallende Blöcke mit 7 verschiedenen Formen
- Tastatursteuerung (Pfeiltasten, Leertaste zum Drehen)
- Automatisches Löschen von vollständigen Zeilen
- 120-Sekunden Gameplay
- Punkte- und Statistikverfolgung

## Dateien
- `app.py` - Haupt-Flask-Anwendungscode
- `templates/` - HTML-Templates (base.html, index.html, game.html, block-puzzle.html)
- `static/css/style.css` - Styling für helles und spielerisches Design
- `static/js/game.js` - Wort-Spiel-Logik
- `static/js/block-puzzle.js` - Block-Puzzle-Logik
- `requirements.txt` - Python-Abhängigkeiten
- `Procfile` - Heroku-Deployment-Konfiguration
- `runtime.txt` - Python-Version für Heroku

## Das Projekt lokal ausführen
```bash
# 1. In das Projektverzeichnis gehen
cd latest

# 2. Abhängigkeiten installieren
pip install -r requirements.txt

# 3. Die App starten
python app.py

# 4. Browser öffnen und besuchen
http://127.0.0.1:5000
```

---

# 🚀 DEPLOYMENT

## ONE-CLICK DEPLOYMENT (Empfohlen!)

### Railway (Einfachste Methode)
1. [Zu Railway.app gehen](https://railway.app)
2. Mit GitHub anmelden
3. "New" → "Deploy from GitHub"
4. Dieses Repository auswählen
5. "Deploy" klicken
6. ✅ Fertig! Deine App ist live!

### Render
1. [Zu Render.com gehen](https://render.com)
2. "New" → "Web Service"
3. Dieses GitHub Repository auswählen
4. Render erkennt Python automatisch
5. ✅ Es wird in Minuten deployed!

### Heroku
```bash
# 1. Heroku CLI installieren (von https://devcenter.heroku.com/articles/heroku-cli)

# 2. Bei Heroku einloggen
heroku login

# 3. Heroku App erstellen
heroku create dein-app-name --buildpack heroku/python

# 4. Deployen
git push heroku main

# 5. App öffnen
heroku open
```

---

## Projekt-Konzept
- **Startseite** - Stellt beide Spiele vor und zeigt spielerisches Design
- **Wort-Rätsel-Seite** - Durcheinandergewürfelte Wörter, Hinweise, Punkte, Timer
- **Block-Puzzle-Seite** - Fallendes Tetris-Style-Block-Gameplay
- **Gewinn-Nachricht** - Erscheint beim Abschluss aller Rätsel oder Spielende
- **Neustart-Knopf** - Setzt das Spiel für eine neue Runde zurück

---

## Steuerung

### Wort-Rätsel
1. Hinweis lesen
2. Das Wort eingeben
3. "Überprüfen" drücken oder Enter
4. Alle 4 Wörter lösen, bevor Zeit abläuft!

### Block-Puzzle
- **⬅️ / ➡️** - Block nach links/rechts verschieben
- **⬇️** - Schneller fallen
- **LEERTASTE** - Block drehen
- **Ziel** - Vollständige Zeilen bilden um Punkte zu erhalten!

---

## Deployment-Status ✅

| Plattform | Status | Zeit bis Live |
|-----------|--------|---------------|
| Railway | ✅ Bereit | < 1 Minute |
| Render | ✅ Bereit | < 2 Minuten |
| Heroku | ✅ Bereit | < 5 Minuten |

---

**Bereit zum Spielen? Jetzt deployen und anfangen zu rätseln!** 🎉
