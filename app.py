from flask import Flask, render_template

# Create a Flask app instance. This starts our web app.
app = Flask(__name__)

# Home page route: shows a friendly welcome screen.
@app.route('/')
def home():
    return render_template('index.html')

# Game page route: shows the puzzle game and passes puzzle data to the template.
@app.route('/game')
def game():
    # Simple educational puzzle list. Each item has a word and a scrambled version.
    puzzles = [
        {'word': 'STERN', 'scrambled': 'RNEST', 'hint': 'Ein helles Objekt am Nachthimmel'},
        {'word': 'REGEN', 'scrambled': 'GENRE', 'hint': 'Wasser, das aus Wolken fällt'},
        {'word': 'BUCH', 'scrambled': 'CHUB', 'hint': 'Du liest das für Geschichten und Lernen'},
        {'word': 'SPIEL', 'scrambled': 'PIELS', 'hint': 'Spaß mit Spielen und Freunden'}
    ]
    return render_template('game.html', puzzles=puzzles)

# Block puzzle game page route: a fun block-shifting puzzle game.
@app.route('/block-puzzle')
def block_puzzle():
    return render_template('block-puzzle.html')

# Run the app when this file is executed directly.
if __name__ == '__main__':
    app.run(debug=True)
