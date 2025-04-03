document.addEventListener("DOMContentLoaded", () => {

	const gameBoard = (function () {
		let board = [
			["", "", ""],
			["", "", ""],
			["", "", ""],
		];

		const render = () => {
			const appContainer = document.querySelector("#gameBoard");
			appContainer.innerHTML = "";

			board.forEach((row, rowIndex) => {
				row.forEach((col, colIndex) => {
					const cellElement = document.createElement("div");
					cellElement.classList.add("field");
					cellElement.dataset.row = rowIndex;
					cellElement.dataset.col = colIndex;

					if (!gameController.getIsGameOver()) {
						cellElement.addEventListener("click", () => gameController.playRound(rowIndex, colIndex));	
					}
					cellElement.textContent = board[rowIndex][colIndex];

					appContainer.appendChild(cellElement);
				});
			});
		};

		const clear = () => {
			for (let i = 0; i < board.length; i++) {
				for (let j = 0; j < board[i].length; j++) {
					board[i][j] = "";
				}
			}
			render();
		};

		const getBoard = () => board;

		

		return { render, clear, getBoard };
	})();

	const gameController = (function () {
		let isGameOver = false;
		const resetButton = document.querySelector("#resetBtn");
		const player1ScoreElement = document.querySelector("#player1Score");
		const player2ScoreElement = document.querySelector("#player2Score");

		const playRound = (row, col) => {
			const board = gameBoard.getBoard();
	
			if (board[row][col] !== "") {
				gameController.updateMessage("Dieses Feld ist bereits belegt!");
				return;
			}
	
			board[row][col] = activePlayer.symbol;
	
			checkWinner(board);
	
			activePlayer = activePlayer === player1 ? player2 : player1;

			(!getIsGameOver()) ? gameController.updateMessage(`${activePlayer.name} ist am Zug!`) : null;
			gameBoard.render();
		}

		const checkWinner = (board) => {
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
	
			const flatBoard = board.flat();
	
			for (let comb of combinations) {
				const [a, b, c] = comb;
				if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[b] === flatBoard[c]) {
					gameController.updateMessage(`${activePlayer.name} hat diese Runde gewonnen!`);
					activePlayer.increaseScore();
					setIsGameOver(true);
					gameController.refreshPlayerScores();
					setTimeout(() => {
						setIsGameOver(false)
						gameBoard.clear();
						gameController.updateMessage("");
					}, 1000);
					return;
				}
			}
	
			if (flatBoard.every((cell) => cell)) {
				setIsGameOver(true)
				gameController.updateMessage("Unentschieden!");
				setTimeout(() => {
					setIsGameOver(false);
					gameBoard.clear();
					gameController.updateMessage("");
				}, 1000);
			}
		}

		const refreshPlayerScores = () => {
			player1ScoreElement.textContent = `${player1.name}: ${player1.getScore()}`;
			player2ScoreElement.textContent = `${player2.name}: ${player2.getScore()}`;
		};

		const updateMessage = (message) => {
			const messageContainer = document.querySelector("#statusMessage");
			messageContainer.textContent = message || `Wähle ein Feld aus, um den ersten Zug zu machen. ${player1.name} beginnt!`;
		};

		const getIsGameOver = () => isGameOver;
		const setIsGameOver = (value) => isGameOver = value;

		const resetGame = () => {
			gameBoard.clear();
			updateMessage();
			player1.resetScore();
			player2.resetScore();
			refreshPlayerScores();
		}

		return {
			isGameOver,
			resetButton,
			playRound,
			resetGame,
			refreshPlayerScores,
			updateMessage,
			getIsGameOver,
			setIsGameOver
		}
	})();

	const createPlayer = (name, symbol) => {
		let score = 0;

		const increaseScore = () => score++;
		const getScore = () => score;
		const resetScore = () => {
			score = 0;
		};

		return {
			name,
			symbol,
			increaseScore,
			getScore,
			resetScore,
		};
	}

	const player1 = createPlayer("Kevin", "x");
	const player2 = createPlayer("Markus", "o");
	let activePlayer = player1;

	gameController.resetButton.addEventListener("click", () => {
		gameController.resetGame();
	});

	gameBoard.render();
	gameController.updateMessage();
	gameController.refreshPlayerScores();
});
