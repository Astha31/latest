import os
import sys
from flask import Flask, render_template

# Add parent directory to path so we can import from the main app directory if needed
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Create a Flask app instance
app = Flask(__name__, 
            template_folder=os.path.join(os.path.dirname(__file__), '..', 'templates'),
            static_folder=os.path.join(os.path.dirname(__file__), '..', 'static'))

# Home page route
@app.route('/')
def home():
    return render_template('index.html')

# Game page route
@app.route('/game')
def game():
    puzzles = [
        {'word': 'STERN', 'scrambled': 'RNEST', 'hint': 'Ein helles Objekt am Nachthimmel'},
        {'word': 'REGEN', 'scrambled': 'GENRE', 'hint': 'Wasser, das aus Wolken fällt'},
        {'word': 'BUCH', 'scrambled': 'CHUB', 'hint': 'Du liest das für Geschichten und Lernen'},
        {'word': 'SPIEL', 'scrambled': 'PIELS', 'hint': 'Spaß mit Spielen und Freunden'}
    ]
    return render_template('game.html', puzzles=puzzles)

# Block puzzle game page route
@app.route('/block-puzzle')
def block_puzzle():
    return render_template('block-puzzle.html')

# Health check endpoint (optional but useful)
@app.route('/health')
def health():
    return {'status': 'ok'}, 200

# Run the app locally if executed directly (for testing)
if __name__ == '__main__':
    app.run(debug=True)
