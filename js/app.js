//List of Variables
const listOfCards = document.querySelectorAll('.card');

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
