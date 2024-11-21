let flippedCards = [];
let matchedCards = 0;
let flag = 0;
let cards = document.querySelectorAll('.card');
let score = document.querySelector('.score');
let btn = document.querySelector('.reset');

btn.addEventListener('click', reset);

function reset() {
    score.innerText = "Score: 0"; //INITIALIZE SCORE
    flippedCards = [];
    matchedCards = 0;
    cards.forEach((card) => {
        card.classList.remove('flipped');

    });

    //SHUFFLING OF CARDS
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i].querySelector('.img').src, cards[j].querySelector('.img').src] = [cards[j].querySelector('.img').src, cards[i].querySelector('.img').src];

    }
}

cards.forEach((card) => {

    card.addEventListener('click', () => {
        flip(card);
    });
});
function flip(card) {
    if (card.classList.contains('flipped') || flippedCards.length >= 2) {
        return;
    }
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        matched();
    }
}

//CHECK IF TWO SELECTED CARDS MATCH AND DISPLAY WINNING MSG WHEN ALL MATCHES ARE DONE
function matched() {
    const [card1, card2] = flippedCards;
    if (card1.querySelector('.img').src === card2.querySelector('.img').src) {
        matchedCards += 2;
        flippedCards = [];

        score.innerText = `Score: ${matchedCards}`;
        if (matchedCards === cards.length) {
            score.innerText = `Score: ${matchedCards}\nYou WON!!!!`;
        }
    }
    else {
        flippedCards.forEach((cd) => {
            setTimeout(() => {
                cd.classList.remove('flipped');
            }, 800);

        });
        flippedCards = [];
    }
}
