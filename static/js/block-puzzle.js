// Block Puzzle Game Logic - Tetris-style with falling blocks and shifting mechanics
// Players move and rotate blocks to form complete rows and clear them

const GRID_WIDTH = 6;
const GRID_HEIGHT = 10;
const CELL_SIZE = 40;

// Game state
let grid = [];
let score = 0;
let linesCleared = 0;
let timer = 120;
let gameOver = false;
let intervalId = null;
let gameLoopId = null;
let currentBlock = null;
let nextBlock = null;

// Tetris block shapes (Tetrominoes) - as arrays of [row, col] offsets
const BLOCK_SHAPES = {
    I: { shape: [[0, 0], [0, 1], [0, 2], [0, 3]], color: '#4ECDC4' },
    O: { shape: [[0, 0], [0, 1], [1, 0], [1, 1]], color: '#45B7D1' },
    T: { shape: [[0, 1], [1, 0], [1, 1], [1, 2]], color: '#FFA07A' },
    S: { shape: [[0, 1], [0, 2], [1, 0], [1, 1]], color: '#98D8C8' },
    Z: { shape: [[0, 0], [0, 1], [1, 1], [1, 2]], color: '#F7DC6F' },
    J: { shape: [[0, 0], [1, 0], [1, 1], [1, 2]], color: '#FF6B6B' },
    L: { shape: [[0, 2], [1, 0], [1, 1], [1, 2]], color: '#C9ADA7' }
};

const BLOCK_TYPES = Object.keys(BLOCK_SHAPES);

// DOM elements
const gameGrid = document.getElementById('game-grid');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const linesElement = document.getElementById('lines');
const gameMessage = document.getElementById('game-message');
const restartButton = document.getElementById('restart-button');
const nextBlocksDisplay = document.getElementById('next-blocks');

// Initialize the game
function initGame() {
    grid = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(null));
    score = 0;
    linesCleared = 0;
    timer = 120;
    gameOver = false;
    
    spawnNewBlock();
    renderGrid();
    updateDisplay();
    startTimer();
    startGameLoop();
    setMessage('Benutze Pfeiltasten zum Verschieben! Drücke Leertaste zum Drehen!');
}

// Spawn a new falling block
function spawnNewBlock() {
    if (nextBlock) {
        currentBlock = nextBlock;
    } else {
        const type = BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)];
        const blockData = BLOCK_SHAPES[type];
        currentBlock = {
            shape: blockData.shape.map(([r, c]) => [r, c]),
            color: blockData.color,
            row: 0,
            col: 2
        };
    }
    
    // Generate next block
    const nextType = BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)];
    const nextBlockData = BLOCK_SHAPES[nextType];
    nextBlock = {
        shape: nextBlockData.shape.map(([r, c]) => [r, c]),
        color: nextBlockData.color,
        row: 0,
        col: 2
    };
    
    renderNextBlock();
    
    // Check for game over (new block can't spawn)
    if (!canMoveTo(currentBlock.row, currentBlock.col, currentBlock.shape)) {
        gameOver = true;
        endGame();
    }
}

// Render the next block preview
function renderNextBlock() {
    nextBlocksDisplay.innerHTML = '';
    const preview = document.createElement('div');
    preview.className = 'block-preview';
    preview.style.display = 'grid';
    preview.style.gridTemplateColumns = 'repeat(4, 25px)';
    preview.style.gridTemplateRows = 'repeat(4, 25px)';
    preview.style.gap = '2px';
    
    // Find bounds of next block shape
    const allCells = {};
    nextBlock.shape.forEach(([r, c]) => {
        allCells[`${r},${c}`] = true;
    });
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const cell = document.createElement('div');
            cell.style.width = '25px';
            cell.style.height = '25px';
            cell.style.gridColumn = c + 1;
            cell.style.gridRow = r + 1;
            if (allCells[`${r},${c}`]) {
                cell.style.backgroundColor = nextBlock.color;
                cell.style.borderRadius = '4px';
            }
            preview.appendChild(cell);
        }
    }
    
    nextBlocksDisplay.appendChild(preview);
}

// Check if block can move to a position
function canMoveTo(row, col, shape) {
    for (let [r, c] of shape) {
        const newRow = row + r;
        const newCol = col + c;
        
        if (newCol < 0 || newCol >= GRID_WIDTH || newRow >= GRID_HEIGHT) {
            return false;
        }
        
        if (newRow >= 0 && grid[newRow][newCol] !== null) {
            return false;
        }
    }
    return true;
}

// Render the game grid
function renderGrid() {
    gameGrid.innerHTML = '';
    gameGrid.style.display = 'grid';
    gameGrid.style.gridTemplateColumns = `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`;
    gameGrid.style.gap = '2px';
    gameGrid.style.padding = '10px';
    gameGrid.style.backgroundColor = '#1a1a2e';
    gameGrid.style.borderRadius = '10px';
    gameGrid.style.width = 'fit-content';
    gameGrid.style.height = `${GRID_HEIGHT * (CELL_SIZE + 2)}px`;
    
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.style.width = CELL_SIZE + 'px';
            cell.style.height = CELL_SIZE + 'px';
            cell.style.backgroundColor = '#2a2a4e';
            cell.style.border = '1px solid #444';
            cell.style.borderRadius = '4px';
            cell.style.transition = 'background-color 0.1s';
            
            // Draw static blocks
            if (grid[row][col]) {
                cell.style.backgroundColor = grid[row][col];
                cell.style.boxShadow = `inset 0 0 0 1px ${grid[row][col]}`;
            }
            
            // Draw falling block
            if (currentBlock) {
                for (let [r, c] of currentBlock.shape) {
                    if (currentBlock.row + r === row && currentBlock.col + c === col) {
                        cell.style.backgroundColor = currentBlock.color;
                        cell.style.boxShadow = `inset 0 0 0 1px ${currentBlock.color}`;
                    }
                }
            }
            
            gameGrid.appendChild(cell);
        }
    }
}

// Move block left
function moveLeft() {
    if (!gameOver && currentBlock && canMoveTo(currentBlock.row, currentBlock.col - 1, currentBlock.shape)) {
        currentBlock.col -= 1;
        renderGrid();
    }
}

// Move block right
function moveRight() {
    if (!gameOver && currentBlock && canMoveTo(currentBlock.row, currentBlock.col + 1, currentBlock.shape)) {
        currentBlock.col += 1;
        renderGrid();
    }
}

// Drop block down by one row
function moveDown() {
    if (!gameOver && currentBlock) {
        if (canMoveTo(currentBlock.row + 1, currentBlock.col, currentBlock.shape)) {
            currentBlock.row += 1;
            renderGrid();
        } else {
            // Block can't move down, place it
            placeBlock();
        }
    }
}

// Rotate block
function rotateBlock() {
    if (!gameOver || !currentBlock) return;
    
    // Rotate 90 degrees clockwise
    const rotated = currentBlock.shape.map(([r, c]) => [c, -r]);
    
    // Normalize to start from (0,0)
    const minRow = Math.min(...rotated.map(([r]) => r));
    const minCol = Math.min(...rotated.map(([, c]) => c));
    const normalized = rotated.map(([r, c]) => [r - minRow, c - minCol]);
    
    // Try to rotate, with wall kicks
    if (canMoveTo(currentBlock.row, currentBlock.col, normalized)) {
        currentBlock.shape = normalized;
        renderGrid();
    }
}

// Place current block permanently
function placeBlock() {
    if (!currentBlock) return;
    
    // Add block to grid
    for (let [r, c] of currentBlock.shape) {
        const row = currentBlock.row + r;
        const col = currentBlock.col + c;
        if (row >= 0) {
            grid[row][col] = currentBlock.color;
        }
    }
    
    // Check for complete lines
    const clearedLines = checkAndClearLines();
    if (clearedLines > 0) {
        linesCleared += clearedLines;
        score += clearedLines * 10;
        setMessage(`Toll! ${clearedLines} Reihe(n) gelöscht! +${clearedLines * 10} Punkte!`);
    }
    
    // Spawn new block
    currentBlock = null;
    spawnNewBlock();
    updateDisplay();
}

// Check for complete rows and clear them
function checkAndClearLines() {
    let clearedCount = 0;
    
    for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
        if (grid[row].every(cell => cell !== null)) {
            // Remove this row
            grid.splice(row, 1);
            // Add empty row at top
            grid.unshift(Array(GRID_WIDTH).fill(null));
            clearedCount++;
            row++; // Check this row again
        }
    }
    
    return clearedCount;
}

// Update the display
function updateDisplay() {
    scoreElement.textContent = score;
    timerElement.textContent = timer;
    linesElement.textContent = linesCleared;
}

// Set a message for the player
function setMessage(text) {
    gameMessage.textContent = text;
}

// Start the countdown timer
function startTimer() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    
    intervalId = setInterval(() => {
        if (gameOver) {
            clearInterval(intervalId);
            return;
        }
        
        timer -= 1;
        updateDisplay();
        
        if (timer <= 0) {
            timer = 0;
            updateDisplay();
            endGame();
        }
    }, 1000);
}

// Start the game loop (blocks fall automatically)
function startGameLoop() {
    if (gameLoopId) {
        clearInterval(gameLoopId);
    }
    
    gameLoopId = setInterval(() => {
        if (!gameOver && currentBlock) {
            moveDown();
        }
    }, 600); // Blocks fall every 600ms
}

// End the game
function endGame() {
    gameOver = true;
    clearInterval(intervalId);
    clearInterval(gameLoopId);
    setMessage(`Spielende! Finale Punktzahl: ${score} | Gelöschte Reihen: ${linesCleared}`);
}

// Reset the game
function resetGame() {
    if (intervalId) clearInterval(intervalId);
    if (gameLoopId) clearInterval(gameLoopId);
    initGame();
}

// Keyboard controls
function handleKeyPress(e) {
    if (gameOver) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            moveLeft();
            break;
        case 'ArrowRight':
            e.preventDefault();
            moveRight();
            break;
        case 'ArrowDown':
            e.preventDefault();
            moveDown();
            break;
        case ' ':
            e.preventDefault();
            rotateBlock();
            break;
    }
}

// Event listeners
restartButton.addEventListener('click', resetGame);
document.addEventListener('keydown', handleKeyPress);

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', () => {
    initGame();
});
