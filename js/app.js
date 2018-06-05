//List of Variables
const listOfCards = document.querySelectorAll('.card');
const listOfImgTags = document.getElementsByTagName('img');
const mainTable = document.getElementById('cardTable');

//Array used to store card images
let imgArray = ['https://avatarfiles.alphacoders.com/242/24282.jpg', 'https://avatarfiles.alphacoders.com/241/24193.jpg', 'https://avatarfiles.alphacoders.com/235/23542.jpg', 'https://avatarfiles.alphacoders.com/226/22680.jpg', 'https://avatarfiles.alphacoders.com/187/18787.jpg', 'https://avatarfiles.alphacoders.com/481/4816.jpg', 'https://avatarfiles.alphacoders.com/471/4717.jpg', 'https://avatarfiles.alphacoders.com/799/79.jpg', 'https://avatarfiles.alphacoders.com/114/114197.jpg', 'https://avatarfiles.alphacoders.com/841/84143.png', 'https://avatarfiles.alphacoders.com/583/58365.jpg', 'https://avatarfiles.alphacoders.com/253/25343.jpg']

//this function when called creates img elements
function makeTag(string) {
  const imgEle = document.createElement(string);
  imgEle.style.display = 'none';
  return imgEle;
}

//This function will append created tags to elements
function appendToElement(array, string) {
  for (let i = 0; i < array.length; i++) {
    let tagContainer = makeTag(string);
    array[i].appendChild(tagContainer);
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

//Function will check filpped cards for match. If matching, will remove them.
//If not, will reset cards
function checkMatch(array) {
  const toRemove = document.getElementsByClassName('flipped')
  if (array[0] === array[1]) {
    for (let i = 0; i < toRemove.length; i++) {
      toRemove[i].style.visibility = 'hidden';
    }
  } else {
    resetCard(toRemove);
  }
}

//Function will reset card when called
function resetCard(array) {
  while (array.length > 0) {
    array[0].style.display = 'none'
    array[0].setAttribute('class', '');
  }
}

//Code will flip card when clicked on and check for matching cards
function cardFlip() {
  tempArray = [];
  mainTable.addEventListener('click', function(event) {
    if (event.target.getAttribute('class') === 'card') {
      event.target.firstElementChild.style.display = '';
      event.target.firstElementChild.setAttribute('class', 'flipped');
      tempArray.push(event.target.firstElementChild.currentSrc);
      if (tempArray.length === 2) {
        setTimeout(checkMatch, 3000, tempArray);
        tempArray = [];
      }
    } else {
      if (event.target.nodeName === 'IMG') {
        event.target.style.display = 'none';
        event.target.setAttribute('class', '');
        tempArray.splice(0, 1);
      }
    }
  })
}

//Older, less efficent code. Keeping around for documentation purposes.
// function cardFlip(array, tag) {
//   tempArray = [];
//   for (let i = 0; i < array.length; i++) {
//     array[i].addEventListener('click', function(event) {
//       if (tag[i].style.display === 'none') {
//         tag[i].style.display = '';
//         tag[i].setAttribute('class', 'flipped');
//         tempArray.push(event.target.firstElementChild.currentSrc);
//         if (tempArray.length === 2) {
//           checkMatch(tempArray);
//           tempArray = [];
//         }
//       } else {
//         tag[i].style.display = 'none';
//         tag[i].setAttribute('class', '');
//         tempArray.splice(0, 1);
//       }
//     })
//   }
// }

appendToElement(listOfCards, 'img');
addImgToCards(imgArray, listOfImgTags, 'src');
cardFlip();
