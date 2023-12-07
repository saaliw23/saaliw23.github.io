const cards = document.querySelectorAll('.memory-card');
const meilleurTemps = document.getElementById('best-time');
const tempsEcoule = document.getElementById('current-time');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let startTime, endTime, elapsedTime;
let bestTime = localStorage.getItem('bestTime') || Infinity;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;


    //////////
    // start le chrono lors du premier clic sur une carte
    startTimer();
    //startTime = performance.now();
    ///////////

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  ////////////
  // Vérifier si toutes les cartes ont été trouvées
  if (document.querySelectorAll('.flip').length === cards.length) 
  {
    stopTimer(); // pour arreter le chronometre
    updateBestTime(); // pour mettre a jour le meilleur temps
  }
  ////////////

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Ajout des fonctions
/////////////
function startTimer() {
  startTime = new Date().getTime();
  //startTime = performance.now();
}

function stopTimer() {
  endTime = new Date().getTime();
  elapsedTime = (endTime - startTime) / 1000; // pour convertir en secondes

  //endTime = performance.now();
  //elapsedTime = (endTime - startTime) / 1000; 

  tempsEcoule.textContent = elapsedTime.toFixed(2) + " secondes"; // pour formater le temps a 0
}

function updateBestTime() {
  if (elapsedTime < bestTime) 
  {
    bestTime = elapsedTime;
    localStorage.setItem('bestTime', bestTime);
    alert("Nouveau meilleur temps : " + bestTime.toFixed(2) + " secondes");
  } 
  else 
  {
    alert("Temps ecoule : " + elapsedTime.toFixed(2) + " secondes");
  }

  meilleurTemps.textContent.toFixed(2) + " secondes"; //
}
//////////////

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
