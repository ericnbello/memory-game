// cards
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// game timer
let second = 0, minute = 0;
let timer = document.querySelector(".time-played");
let interval;

// moves counter
let count = 0;
let moves = document.querySelector('.move-counter');

moves.innerHTML = 0;
timer.innerHTML = "0 min 0 sec";

function flipCard() { 
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    
    // second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
    
    moveCounter();
}

function disableCards() {
    // do cards match?
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
        lockBoard = false;
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20)
        card.style.order = randomPos;
    })
})();

function startTimer(){
    // timer.innerHTML = minute + " min " + second + " sec";
    interval = setInterval(function(){
        timer.innerHTML = minute + " min " + second + " sec";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}

function moveCounter(){   
    // moves.innerHTML = count; 
    count++;    
    moves.innerHTML = count;

    //start timer on first move
    if(count == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}

function playerReset() {
    cards.forEach(card => card.classList.remove('flip'));

    //reset timer
    clearInterval(interval);
    count = 0;
    if (count < 1) {
        moves.innerHTML = 0;
        timer.innerHTML = "0 min 0 sec";
    }
}

function winner() {
    cards.forEach(checkForMatch);
    console.log('Winner!');
}

cards.forEach(card => card.addEventListener('click', flipCard));