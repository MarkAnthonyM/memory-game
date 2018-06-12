//List of Variables
let listOfCards = document.querySelectorAll('.card');
const listOfImgTags = document.getElementsByTagName('img');
const listOfRows = document.getElementsByClassName('row-container');
const winScreen = document.getElementById('winModal');
const loseScreen = document.getElementById('loseModal');
const modalClose = document.getElementsByClassName('modal-button');
const mainTable = document.getElementById('cardTable');
const timer = document.querySelector('span');
const moves = document.getElementsByClassName('moves');
const moveAmount = document.getElementsByTagName('h2');
const stars = document.getElementsByClassName('star');
const flippedCards = document.getElementsByClassName('flip');
let starAmount = 2;
let turns = 0;
let minutes = 3;
let seconds = 59;
let cardsMatched = [];

//Array used to store card images
let imgArray = ['https://avatarfiles.alphacoders.com/242/24282.jpg', 'https://avatarfiles.alphacoders.com/241/24193.jpg', 'https://avatarfiles.alphacoders.com/235/23542.jpg', 'https://avatarfiles.alphacoders.com/226/22680.jpg', 'https://avatarfiles.alphacoders.com/187/18787.jpg', 'https://avatarfiles.alphacoders.com/481/4816.jpg', 'https://avatarfiles.alphacoders.com/471/4717.jpg', 'https://avatarfiles.alphacoders.com/799/79.jpg', 'https://avatarfiles.alphacoders.com/114/114197.jpg', 'https://avatarfiles.alphacoders.com/841/84143.png', 'https://avatarfiles.alphacoders.com/583/58365.jpg', 'https://avatarfiles.alphacoders.com/253/25343.jpg']

/***************************
CARD MANIPULATION FUNCTIONS:
    All functions that create/manipulate cards
    found here.
***************************/

//This function takes images from image array and appends them to img tags
function addImgToCards(imagesArray, tagArray, attr) {
  let trimedArray = trimArray(imagesArray, tagArray);
  let tempArray = [];
  let iterator = 0;
  while (trimedArray.length > 0) {
    let randomIndex = Math.floor(Math.random() * trimedArray.length);
    if (tempArray.includes(trimedArray[randomIndex])) {
      tagArray[iterator].setAttribute(attr, trimedArray[randomIndex]);
      trimedArray.splice(randomIndex, 1);
      iterator += 1;
    } else {
      tagArray[iterator].setAttribute(attr, trimedArray[randomIndex]);
      tempArray.push(trimedArray[randomIndex]);
      iterator += 1;
    }
  }
}

//This function will append created tags to elements
function appendToElement(array, string, tagAttr, attrValue) {
  for (let i = 0; i < array.length; i++) {
    let tagContainer = createTag(string, tagAttr, attrValue);
    array[i].appendChild(tagContainer);
  }
}

//Code will flip card when clicked on and check for matching cards
// function cardFlip() {
//   tempArray = [];
//   mainTable.addEventListener('click', function(event) {
//     if (event.target.getAttribute('class') === 'card') {
//       if (event.target.firstElementChild.style.visibility === 'hidden') {
//         console.log('this condition fired!');
//       } else {
//         event.target.firstElementChild.style.display = '';
//         event.target.firstElementChild.setAttribute('class', 'flipped');
//         tempArray.push(event.target.firstElementChild.currentSrc);
//         if (tempArray.length === 2) {
//           turnCount();
//           checkMatch(tempArray);
//           tempArray = [];
//         }
//       }
//     } else {
//       if (event.target.nodeName === 'IMG') {
//         event.target.style.display = 'none';
//         event.target.setAttribute('class', '');
//         tempArray.splice(0, 1);
//       }
//     }
//   })
// }

function cardFlip() {
  tempArray = [];
  mainTable.addEventListener('click', function(event) {
    if (event.target.getAttribute('class') === 'card') {
      event.target.classList.toggle('flip');
      event.target.firstElementChild.style.display = '';
      event.target.firstElementChild.setAttribute('class', 'flipped');
      tempArray.push(event.target.firstElementChild.currentSrc);
      if (tempArray.length === 2) {
        turnCount();
        setTimeout(checkMatch, 1000, tempArray);
        tempArray = [];
      }
    }
  })
}

//Function will check the size of device viewing app and return
//size in pixels
function checkDeviceSize() {
  const windowSize = window.innerWidth;
  return windowSize;
}

//this function when called creates element tags
function createTag(string, tagAttr, attrValue) {
  const tag = document.createElement(string);
  if (string === 'img') {
    tag.style.display = attrValue;
  } else {
    tag.setAttribute(tagAttr, attrValue);
  }
  return tag;
}

//Function will reset card when called
function resetCard(array) {
  while (array.length > 0) {
    array[0].style.display = 'none'
    array[0].setAttribute('class', '');
    flippedCards[0].setAttribute('class', 'card');
  }
}

//Function will remove "hidden" attribute from img elements
function returnCards(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].style.visibility = 'visible';
    array[i].style.display = 'none';
    array[i].setAttribute('class', '');
  }
}

//Function will setup game area
function setupGame() {
  if (checkDeviceSize() >= 650) {
    appendToElement(listOfRows, 'div', 'class', 'card');
    listOfCards = document.querySelectorAll('.card');
    console.log(listOfCards);
    appendToElement(listOfCards, 'img', 'display', 'none');
    addImgToCards(imgArray, listOfImgTags, 'src');
    cardFlip();
    timerClock();
  } else {
    appendToElement(listOfCards, 'img', 'display', 'none');
    console.log(listOfCards);
    addImgToCards(imgArray, listOfImgTags, 'src');
    cardFlip();
    timerClock();
  }
}

//This function will trim an array to fit amount of img tags
function trimArray(array, range) {
  let newArray = [];
  for (let i = 0; i < range.length/2; i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

/***************
TIMER FUNCTIONS:
    All functions that create/manipulate timer found here.
***************/

//Function will count timer down
function timerCountdown() {
  const timeOutput = (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds);
  if (minutes > 0) {
    if (seconds <= 60 && seconds > 0) {
      seconds -= 1;
    } else {
      seconds = 59;
      minutes -= 1;
    }
    timer.textContent = timeOutput;
    gameOutcome(cardsMatched);
  } else if (minutes === 0 && seconds > 0) {
    seconds -= 1;
    timer.textContent = timeOutput;
    gameOutcome(cardsMatched);
  } else {
    timer.textContent = 'Time Up!';
    gameOutcome(cardsMatched);
  }
}

function timerClock() {
  setTimeout(timerCountdown, 1000);
}

/*************************
GAME EVALUATION FUNCTIONS:
    All functions that evaluate state of game found here.
*************************/

//Function will check filpped cards for match. If matching, will remove them.
//If not, will reset cards
function checkMatch(array) {
  const toRemove = document.getElementsByClassName('flipped')
  if (array[0] === array[1]) {
    cardsMatched.push(toRemove[0]);
    starRating(cardsMatched);
    while (toRemove.length > 0) {
      toRemove[0].setAttribute('class', 'correct');
      flippedCards[0].setAttribute('class', 'card');
    }
  } else {
    resetCard(toRemove);
  }
}

//Function will check array storing matched cards for the correct amount
//in order to win game
function gameOutcome(cardArray) {
  if (minutes > 0 && seconds >= 0) {
    if (cardArray.length === 6) {
      showModal(winScreen);
      gameRestart(winScreen, modalClose[0]);
    } else {
      timerClock();
    }
  } else if (minutes === 0 && seconds > 0) {
    if (cardArray.length === 6) {
      showModal(winScreen);
      gameRestart(winScreen, modalClose[0]);
    } else {
      timerClock();
    }
  } else {
    showModal(loseScreen);
    gameRestart(loseScreen, modalClose[1]);
  }
}

//function will reset game area when called
function gameRestart(gameCondition, button) {
  button.onclick = function() {
    cardsMatched = [];
    gameCondition.style.display = 'none';
    addImgToCards(imgArray, listOfImgTags, 'src');
    returnCards(listOfImgTags);
    starReset(stars);
    moves[0].firstElementChild.textContent = 'Moves: 0';
    timer.textContent = '4:00';
    turns = 0;
    minutes = 3
    seconds = 59
    timerClock();
  }
}

//Function will reset state of star rating
function starReset(starArray) {
  for (let i = 0; i < starArray.length; i++) {
    starArray[i].innerHTML = '&#9733;';
  }
  starAmount = 2;
}

//Function to show modal based on game end condition
function showModal(gameCondition) {
  gameCondition.style.display = 'block';
  moveAmount[0].textContent = 'Number of moves: ' + turns;
}

function starRating(array) {
  if (array.length % 2 === 0) {
    stars[starAmount].innerHTML = '&#9734;';
    starAmount -= 1;
  }
}

//Function will keep track of turns taken
function turnCount() {
  turns += 1;
  moves[0].firstElementChild.textContent = 'Moves: ' + turns;
}

setupGame();
