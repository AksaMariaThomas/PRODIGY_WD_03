let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let againstComputer = false;

function cellClicked(index) {
    if (board[index] === "") {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText = currentPlayer;
        if (checkWinner()) {
            alert(currentPlayer + " wins!");
            resetGame();
            return;
        }
        if (checkDraw()) {
            alert("It's a draw!");
            resetGame();
            return;
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (againstComputer) {
            if (currentPlayer === "O") {
                playComputer();
            }
        }
    }
}



function checkWinner() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];
    for (let combination of winCombinations) {
        if (board[combination[0]] === currentPlayer &&
            board[combination[1]] === currentPlayer &&
            board[combination[2]] === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== "");
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    const cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerText = "";
    }
    currentPlayer = "X";
}

function toggleMode() {
    againstComputer = !againstComputer;
    const toggleBtn = document.getElementById("toggleBtn");
    toggleBtn.innerText = againstComputer ? "Play against Player" : "Play against Computer";
    resetGame();
}
function playComputer() {
    const opponentPlayer = currentPlayer === "X" ? "O" : "X";
    const corners = [0, 2, 6, 8];
    const sides = [1, 3, 5, 7];
    const center = 4;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = currentPlayer;
            if (checkWinner()) {
                setTimeout(() => cellClicked(i), 100);
                return;
            }
            board[i] = "";
        }
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = opponentPlayer;
            if (checkWinner()) {
                board[i] = currentPlayer; 
                setTimeout(() => cellClicked(i), 100); 
                return;
            }
            board[i] = "";
        }
    }

    for (let corner of corners) {
        if (board[corner] === "") {
            setTimeout(() => cellClicked(corner), 100);
            return;
        }
    }

    if (board[center] === "") {
        if (board[corners[0]] === opponentPlayer && board[corners[3]] === opponentPlayer) {
            setTimeout(() => cellClicked(center), 100); 
            return;
        }
        if (board[corners[1]] === opponentPlayer && board[corners[2]] === opponentPlayer) {
            setTimeout(() => cellClicked(center), 100); 
            return;
        }
        if (board[corners[2]] === opponentPlayer && board[corners[1]] === opponentPlayer) {
            setTimeout(() => cellClicked(center), 100); 
            return;
        }
        if (board[corners[3]] === opponentPlayer && board[corners[0]] === opponentPlayer) {
            setTimeout(() => cellClicked(center), 100); 
            return;
        }
    }

    for (let corner of corners) {
        if (board[corner] === "") {
            setTimeout(() => cellClicked(corner), 100); 
            return;
        }
    }
    for (let side of sides) {
        if (board[side] === "") {
            setTimeout(() => cellClicked(side), 100);
            return;
        }
    }
    if (board[center] === "") {
        setTimeout(() => cellClicked(center), 100);
        return;
    }
}
