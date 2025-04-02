const createGameBoard = (function () {
	let gameBoard = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	return gameBoard;
})();

// Creates the player
function createPlayer(name, symbol) {
	let score = 0;

	const increaseScore = () => {
		return score++;
	};

	const getScore = () => {
		return score;
	};

	return {
		name,
		symbol,
		score,
		increaseScore,
		getScore,
	};
}

const player1 = createPlayer("Kevin", "x");
const player2 = createPlayer("Markus", "o");
let activePlayer = player1;
const gameBoard = createGameBoard;

// Checks for winner
function checkWinner(board) {
	const combinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	board = board.flat();

	for (let comb of combinations) {
		const [a, b, c] = comb;

		if (board[a] && board[a] == board[b] && board[b] == board[c]) {
			console.log(`Spieler ${activePlayer.name} hat gewonnen!`);
			break;
		}
	}

	if (board.every((cell) => cell)) {
		return "Draw";
	}

	return null;
}

// Plays Round
function playRound(row, col) {
	board = gameBoard;

	if (board[row][col] !== "") {
		console.log("Das Feld ist bereits belegt!");
		return;
	}

	board[row][col] = activePlayer.symbol;

	checkWinner(board, activePlayer);
	activePlayer = activePlayer === player1 ? player2 : player1;
}

playRound(0, 0);
playRound(1, 1);
playRound(0, 1);
playRound(2, 1);
playRound(0, 2);
