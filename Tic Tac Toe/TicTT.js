let msgContainer = document.querySelector(".msg1");
let cnt = 0;
let squares = document.querySelectorAll(".squares");
let msg = document.querySelector(".msg");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector(".new");
const winners = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let X = prompt("Enter name of Player 1(X):");
let O = prompt("Enter name of Player 2(O):");

if (X === "") {
    X = "Player 1";
}
if (O === "") {
    O = "Player 2";
}
let turn = X;

// TURN EVENTS===================================
squares.forEach((square) => {
    square.addEventListener("click", () => {

        if (turn === X) {
            square.innerText = "X";
            turn = O;
            msgContainer.classList.remove("hide");
            msg.innerText = `Your turn ${turn}`;

        }
        else {
            square.innerText = "O";
            turn = X;
            msg.innerText = `Your turn ${turn}`;
        }
        square.style.pointerEvents = 'none';
        cnt++;
        let wins = checkWinner();
        if (cnt === 9 && wins != true) {
            draw();
        }
    });
});
// WINNER FUNCTION===================================
const checkWinner = () => {
    for (let winner of winners) {
        let one = squares[winner[0]].innerText;
        let two = squares[winner[1]].innerText;
        let three = squares[winner[2]].innerText;
        if (one != "" && two != "" && three != "") {
            if (one === two && two === three && one === three) {
                displayWinner(turn);
                return true;
            }
        }

    }
};

const displayWinner = (turn) => {
    if (turn === X) {
        msg.innerText = `${O} is the winner`;
    }
    else {
        msg.innerText = `${X} is the winner`;
    }
    msgContainer.classList.remove("hide");
    disablebox();

}


// DISABLE ENABLE FUNCTIONS==========================
const disablebox = () => {
    for (let box of squares) {
        box.style.pointerEvents = 'none';
    }
};
const enablebox = () => {
    for (let box of squares) {
        box.style.pointerEvents = 'auto';
        box.innerText = ""
    }

};


// DRAW GAME FUNCTION================================
const draw = () => {
    msg.innerText = `Draw Match`;
    msgContainer.classList.remove("hide");
    disablebox();
};

// RESET FUCNTION===================================
const resets = () => {
    turn = X;
    enablebox();
    cnt = 0;
    msgContainer.classList.add("hide");

};
const newGame = () => {
    resets();
    X = prompt("Enter name of Player 1(X):");
    O = prompt("Enter name of Player 2(O):");
    if (X === "") {
        X = "Player 1";
    }
    if (O === "") {
        O = "Player 2";
    }
    msg.innerText = `Your turn ${turn}`;
}

resetbtn.addEventListener("click", resets);

newbtn.addEventListener("click", newGame);