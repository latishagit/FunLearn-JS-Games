BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const word = document.querySelector('.word');
const hint = document.querySelector('.hint');
const msg = document.querySelector('.msg');
const words = ["apple", "hello", "class", "language", "medium", "browser", "pilot", "word", "greeting", "hide", "normal"];
const newGame = document.querySelector(".NewGame");

let chosen_word = "";
let incorrect_guesses = 0;
let letter_cnt = 0;
let span = ""; //ELEMENT TO ADD BLANKS AND LETTERS WHEN LETTERS ARE GUESSED
let game_over = false; // Flag to track if the game is over

// GAME OVER
const gameOver = () => {
    game_over = true; // Set the game over flag to true
    msg.innerText = "Game Over";
    word.disabled = true;
    // Reveal the whole word
    for (let i = 0; i < chosen_word.length; i++) {
        document.querySelector(`.letter${i}`).innerText = chosen_word[i].toUpperCase();
    }
};

// WON GAME
const wonGame = () => {
    game_over = true; // Set the game over flag to true
    msg.style.backgroundColor = "#e0e0e0";
    msg.style.color = "#293845";
    msg.style.padding = "2rem";
    msg.style.borderRadius = "5px";
    msg.innerText = "YOU WON";
    // Reveal the whole word
    for (let i = 0; i < chosen_word.length; i++) {
        document.querySelector(`.letter${i}`).innerText = chosen_word[i].toUpperCase();
    }
};

// START GAME / INITIALIZE GAME
const startGame = async () => {
    incorrect_guesses = 0;
    letter_cnt = 0;
    game_over = false; // Reset game over flag when starting a new game
    word.innerHTML = "";
    hint.innerText = "";
    msg.innerText = "Try Guessing...";
    const randomIndex = Math.floor(Math.random() * words.length);
    const current_word = words[randomIndex];
    let response = await fetch(`${BASE_URL}${current_word}`);
    let data = await response.json();
    chosen_word = data[0]['word'];
    hint_msg = data[0].meanings[0].definitions[0].definition;
    hint.innerText = hint_msg;
    for (let i = 0; i < chosen_word.length; i++) {
        span = document.createElement("span");
        span.classList.add("underscore", `letter${i}`);
        word.appendChild(span);
    }
};

// NEW GAME
const NewGame = () => {
    chosen_word = "";
    hint.innerText = "";
    incorrect_guesses = 0;
    letter_cnt = 0;
    startGame();
};

// ADDING NEW GAME EVENT LISTENER TO BUTTON
newGame.addEventListener('click', NewGame);
window.onload = startGame;

// EVENT WHEN A KEY IS PRESSED (KEYDOWN)
document.addEventListener('keydown', function (event) {

    if (game_over) return; // If the game is over, don't process keypresses

    let key_pressed = event.key;
    key_pressed = key_pressed.toLowerCase();
    if (chosen_word.includes(key_pressed)) {
        if (letter_cnt === chosen_word.length - 1) {
            wonGame();
        }
        for (let i = 0; i < chosen_word.length; i++) {
            if (chosen_word[i] === key_pressed) {
                document.querySelector(`.letter${i}`).innerText = key_pressed.toUpperCase();
                letter_cnt++;
            }
        }

    }
    else {
        if (incorrect_guesses >= 6) {
            gameOver();
        }
        else {
            msg.innerText = `Incorrect letter: ${key_pressed.toUpperCase()}`;
            incorrect_guesses++;
        }
    }
});
