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

					cellElement.addEventListener("click", () => playRound(rowIndex, colIndex));
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

		const updateMessage = (message) => {
			const messageContainer = document.querySelector("#statusMessage");
			messageContainer.textContent = message;
		};

		return { render, clear, getBoard, updateMessage };
	})();

	function createPlayer(name, symbol) {
		let score = 0;

		const increaseScore = () => score++;
		const getScore = () => score;

		return {
			name,
			symbol,
			increaseScore,
			getScore,
		};
	}

	const player1 = createPlayer("Kevin", "x");
	const player2 = createPlayer("Markus", "o");
	let activePlayer = player1;

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

		const flatBoard = board.flat();

		for (let comb of combinations) {
			const [a, b, c] = comb;
			if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[b] === flatBoard[c]) {
				gameBoard.updateMessage(`${activePlayer.name} hat diese Runde gewonnen!`);
				activePlayer.increaseScore;
				setTimeout(() => {
					gameBoard.clear();
					gameBoard.updateMessage("");
				}, 1000);
				return;
			}
		}

		if (flatBoard.every((cell) => cell)) {
			gameBoard.updateMessage("Unentschieden!");
			setTimeout(() => {
				gameBoard.clear();
				gameBoard.updateMessage("");
			}, 1000);
		}
	}

	function playRound(row, col) {
		const board = gameBoard.getBoard();

		if (board[row][col] !== "") {
			gameBoard.updateMessage("Dieses Feld ist bereits belegt!");
			return;
		}

		board[row][col] = activePlayer.symbol;

		checkWinner(board);

		activePlayer = activePlayer === player1 ? player2 : player1;
		gameBoard.updateMessage(`${activePlayer.name} ist am Zug!`);
		gameBoard.render();
	}

	gameBoard.render();
	gameBoard.updateMessage(`${player1.name} ist am Zug!`);
});
