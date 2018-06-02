//List of Variables
const listOfCards = document.querySelectorAll('.card');
const listOfImgTags = document.getElementsByTagName('img');

//Array used to store card images
let imgArray = ['https://avatarfiles.alphacoders.com/242/24282.jpg', 'https://avatarfiles.alphacoders.com/241/24193.jpg', 'https://avatarfiles.alphacoders.com/235/23542.jpg', 'https://avatarfiles.alphacoders.com/226/22680.jpg', 'https://avatarfiles.alphacoders.com/187/18787.jpg', 'https://avatarfiles.alphacoders.com/481/4816.jpg', 'https://avatarfiles.alphacoders.com/471/4717.jpg', 'https://avatarfiles.alphacoders.com/799/79.jpg', 'https://avatarfiles.alphacoders.com/114/114197.jpg', 'https://avatarfiles.alphacoders.com/841/84143.png', 'https://avatarfiles.alphacoders.com/583/58365.jpg', 'https://avatarfiles.alphacoders.com/253/25343.jpg']

//this function when called creates img elements
function makeTag(string) {
  const imgEle = document.createElement(string);
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

function addImgToCards(elArray, tagArray, attr) {
  let trimedArray = trimArray(elArray, tagArray);
  let tempArray = [];
  let iterator = 0;
  while (trimedArray.length > 0) {
    let randomIndex = Math.floor(Math.random() * trimedArray.length);
    if (tempArray.includes(trimedArray[randomIndex])) {
      listOfImgTags[iterator].setAttribute(attr, trimedArray[randomIndex]);
      trimedArray.splice(randomIndex, 1);
      iterator += 1;
    } else {
      listOfImgTags[iterator].setAttribute(attr, trimedArray[randomIndex]);
      tempArray.push(trimedArray[randomIndex]);
      iterator += 1;
    }
  }
}

//Code will flip card when clicked on
function cardFlip(array, tag) {
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener('click', function(event) {
      if (tag[i].style.display === 'none') {
        tag[i].style.display = '';
      } else {
        tag[i].style.display = 'none';
      }
    })
  }
}
