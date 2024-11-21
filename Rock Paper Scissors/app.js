// CHOOSE ROCK, PAPER OR SCISSORS IMAGE ACCORDING TO USER'S CHOICE
function choose_img(clicked) {
    const img1 = document.querySelector('.img1');
    img1.style.visibility = "visible";
    img1.src = `./${clicked}.jpg`;

}

// CHOOSE ROCK, PAPER OR SCISSORS IMAGE ACCORDING TO COMPUTER'S CHOICE
function comp_img(i) {
    const img2 = document.querySelector('.img2');
    img2.style.visibility = "visible";
    img2.src = `./${i}.jpg`;
}

// RETURN COMPUTER'S CHOICE (RANDOM CHOICE)
function comp_turn() {
    let options = ['rock', 'paper', 'scissors'];
    let ch = options[Math.floor(Math.random() * options.length)];
    return ch;
}

//RESULT OF THE GAME (WHO WINS USER OR COMPUTER)
function game_result(user, computer) {
    const winning = [
        ['rock', 'scissors'],
        ['paper', 'rock'],
        ['scissors', 'paper']
    ];
    for (wins of winning) {
        if (user === computer) {
            result = "DRAW";
        }
        if (user === wins[0] && computer === wins[1]) {
            result = "YOU";
        }
        else if (computer === wins[0] && user === wins[1]) {
            result = "I";
        }
    }

    return result;
}

//FUNCTION CALLS FOR GAME RESULT AND DISPLAYING OF RESULT i.e. WINNER
let choice = document.querySelectorAll('.user');
choice.forEach(ch => {
    ch.addEventListener('click', (e) => {
        let user = e.target.getAttribute('id');
        let computer = comp_turn();
        comp_img(computer);
        let winner = game_result(user, computer);
        const winner_msg = document.querySelector('.winner-msg');
        if (winner !== "DRAW") {
            winner_msg.innerText = `${winner} won`;
        }
        else {
            winner_msg.innerText = `Draw Match`;
        }
    });
});



