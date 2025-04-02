// At first i need to create a game board. The board could be created by using an array
// Then I have to create a factory function to create the player. It should include a name, score and id
// I need a function to check which players turn it is 


// Wie könnte ein Spieler einen Zug machen?
// 1. Eine Funktion erstellen
// 2. Die Funktion nimmt einen Parameter entgegen. Der Parameter ist das gewählte Feld.
// 3. Das Feld erhält ein x oder o, je nachdem welcher spieler am zug ist.

function createBoard() {
    const rows = 3;
    const cols = 3;
    let gameBoard = [["", "", ""], ["", "", ""],["", "", ""]]
    for (let i = 0; i < gameBoard.length; i++) {
        console.log(gameBoard[i])
    }
}

// Creates the player
function createPlayer(name, symbol) {
    let score = 0;
    const id = crypto.randomUUID();

    const increaseScore = () => {
        return score++
    }

    const getScore = () => {
        return score;
    }

    return {
        name,
        symbol, 
        score, 
        id, 
        increaseScore,
        getScore,
    }
}

function checkWinner(board) {
    const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let comb of Winningcombinations) {
        const [a, b, c] = combo;

         if (
            board[a] &&
            board[a] == board[b] &&
            board[b] == board[c]
         ) {
            return board[a];
         }
    }

    if (board.every(cell => cell)) {
        return 'Draw'
    }

    return null;
}

const player1 = createPlayer("Kevin", "x");
const player2 = createPlayer("Markus", "y");
const gameController = createGameController();

createBoard();

gameController.setMarker(2);
gameController.refreshBoard();