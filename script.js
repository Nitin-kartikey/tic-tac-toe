document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart'); 
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true; 
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6] ,[3, 5, 7],
    ]; 
    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index')); 
        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        } 
        gameState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer === 'X' ? 'x-mark' : 'o-mark');
        if (checkWin()) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        if (checkDraw()) {
            status.textContent = "It's a draw!";
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }
    function checkWin() {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (
                gameState[a] !== '' &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                return true;
            }
        }
        return false;
    }
    function checkDraw() {
        return !gameState.includes('');
    }  
    function restartGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x-mark', 'o-mark', 'win');
        });
    }
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    restartButton.addEventListener('click', restartGame);
});