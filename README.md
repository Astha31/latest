# Flask Rätsel-Spiel

Ein einfaches, buntes Wort-Rätsel-Spiel, das mit Python Flask erstellt wurde. Perfekt für ein anfängerfreundliches Schulprojekt.

## Dateien
- `app.py` - Haupt-Flask-Anwendungscode
- `templates/` - HTML-Templates für die Start- und Spieleseiten
- `static/css/style.css` - Styling für helles und spielerisches Design
- `static/js/game.js` - Spiel-Logik, Timer, Punkte und Neustart-Verhalten
- `requirements.txt` - Flask-Abhängigkeit

## Das Projekt ausführen
1. Flask installieren:
   ```bash
   pip install -r requirements.txt
   ```
2. Die App starten:
   ```bash
   python app.py
   ```
3. Den Browser öffnen bei `http://127.0.0.1:5000`

## Projekt-Konzept
- Startseite stellt das Spiel vor und zeigt ein spielerisches Design.
- Spieleseite zeigt durcheinandergewürfelte Wörter, Hinweise, Punkte, Züge und einen Timer.
- Der Spieler tippt das richtige Wort und erhält Punkte.
- Eine Gewinn-Nachricht erscheint, wenn alle Wörter gelöst sind.
- Ein Neustart-Knopf setzt das Spiel für eine neue Runde zurück.
