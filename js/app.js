//List of Variables
const listOfCards = document.querySelectorAll('.card');

//this function when called creates img elements
function makeImgTag(string) {
  const imgEle = document.createElement(string);
  return imgEle;
}

//This function will append created tags to elements
function appendToElement(array) {
  for (let i = 0; i < array.length; i++) {
    let tagContainer = makeImgTag();
    array[i].appendChild(tagContainer);
  }
}
