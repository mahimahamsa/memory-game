document.addEventListener('DOMContentLoaded', () => {

  // Player's information
  const playerInfo = {
    name: '',
    nickname: ''
  };

  // Function to start the game
  function startGame() {
    getPlayerInfo();
  }

  // Function to get player's name and nickname
  function getPlayerInfo() {
    playerInfo.name = prompt('Please enter your name:');
    playerInfo.nickname = prompt('Please enter your nickname:');
    if (playerInfo.name && playerInfo.nickname) {
      showInstruction();
      createBoard();
    } else {
      alert('Please enter both your name and nickname to start the game.');
      getPlayerInfo();
    }
  }

  // Function to display game instructions
  function showInstruction() {
    alert(`Welcome, ${playerInfo.name} (${playerInfo.nickname})! Here are the instructions:
    1. Click on any card to reveal the image.
    2. Try to match two identical images by clicking on another card.
    3. If the images match, they will remain visible.
    4. If they don't match, they will be hidden again.
    5. Match all the cards to win the game within 60 seconds.`);
  }

  // List all card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const timerDisplay = document.querySelector('#timer');
  const playAgainButton = document.querySelector('#play-again');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let timerInterval;
  let secondsLeft = 60; // Adjust as needed

  // Create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
    startTimer();
  }

  // Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      alert('You have clicked the same image!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match');
      cards[optionOneId].setAttribute('src', 'images/white.png');
      cards[optionTwoId].setAttribute('src', 'images/white.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
      secondsLeft += 3; // Increase timer by 10 seconds
      if (secondsLeft > 60) {
        secondsLeft = 60;
      }
      timerDisplay.textContent = `Time left: ${secondsLeft}s`;
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      alert('Sorry, try again');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timerInterval);
      setTimeout(() => {
        grid.innerHTML = '';
        grid.style.display = 'none'; // Hide the grid
        resultDisplay.textContent = 'Congratulations! You found them all!';
        resultDisplay.style.textAlign = 'center';
        playAgainButton.style.display = 'block'; // Show the "Play Again" button
      }, 500);
    }
  }

  // Flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  // Start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      secondsLeft--;
      timerDisplay.textContent = `Time left: ${secondsLeft}s`;
      if (secondsLeft === 0) {
        clearInterval(timerInterval);
        alert('Time is up! Play again.');
        resetGame();
      }
    }, 1000);
  }

  // Reset the game
  function resetGame() {
    grid.innerHTML = '';
    grid.style.display = 'flex'; // Show the grid again
    resultDisplay.textContent = '';
    secondsLeft = 60;
    playAgainButton.style.display = 'none'; // Hide the "Play Again" button
    createBoard();
  }

  // Event listener for the "Play Again" button
  playAgainButton.addEventListener('click', resetGame);

  // Start the game when the DOM is loaded
  startGame();
});
