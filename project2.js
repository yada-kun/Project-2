//declaring variables
const cards = document.querySelectorAll('.memory-card');
let hasFlipped = false;
let firstCard, secondCard;
let isFirstPlayer = true;
let score = [0, 0];
const cardSound = new Audio('images/Card-flip.mp3')

//shuffling the cards
shuffleCards();

//init game
document.getElementById('player-1').classList.add('player-active');

// gettin all the cards in an array and looping it
cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

//function to flip the card
function flipCard() {

  this.classList.add('flip');
  cardSound.play();
 
  //first card checkings
  if(!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
  } else {
    hasFlipped = false;
    secondCard = this;

    //comparing cards
    if (firstCard.dataset.framework == secondCard.dataset.framework) {
      playerScore();
    } else {
      changePlayer();
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
      }, 1500);
    }
  }
}

//players score
function playerScore() {
  if (isFirstPlayer) {
    document.getElementById('player-1-score').innerText = score[0] + 1;
    score[0]++;
  } else {
    document.getElementById('player-2-score').innerText = score[1] + 1;
    score[1]++;
  }

  const totalScore = score[0] + score[1];
  const isAllCardsOpen = cards.length / 2 === totalScore;

  //score wins
  if (isAllCardsOpen) {
    if (score[0] > score[1]) {
      alert('Player 1 Wins!');
    } else if (score[0] < score[1]) {
      alert('Player 2 Wins!!');
    } else {
      alert('Its a TIE!!');
    }
  }
}

//change player
function changePlayer() {
  if (isFirstPlayer) {
    isFirstPlayer = false;
    document.getElementById('player-2').classList.add('player-active');
    document.getElementById('player-1').classList.remove('player-active');
    return;
  }

  isFirstPlayer = true;
  document.getElementById('player-1').classList.add('player-active');
  document.getElementById('player-2').classList.remove('player-active');
}


//shuffling cards
function shuffleCards(){

    cards.forEach(shuffleCards => {
        shuffleCards.style.order = Math.floor(Math.random() * 12);
      });
   
}