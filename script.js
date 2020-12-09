const gameContainer = document.getElementById("game");
const form=document.querySelector('#form');

const IMAGES=[
  'image1.jpeg',
  'image2.jpeg',
  'image3.jpeg',
  'image4.jpeg',
  'image5.jpeg',
  'image1.jpeg',
  'image2.jpeg',
  'image3.jpeg',
  'image4.jpeg',
  'image5.jpeg'
]

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let cardsUpCount=0;
let image1=null;
let image2=null;
let scores=0;
let faceupCount=0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    // newDiv.addEventListener("click", handleCardClick);

    // append the div to ßthe element with an id of game
    gameContainer.append(newDiv);
  }
}

function createImages(imageArray){
  for (let img of imageArray){
    const newDiv=document.createElement('div');
    const newImage=document.createElement('img');
    newImage.setAttribute('src',`images/${img}`);
    newImage.classList.add('hidden');

    newDiv.append(newImage);
    gameContainer.append(newDiv);
  }
}

form.addEventListener('submit',function(e){
  e.preventDefault();
  gameContainer.innerText='';
  // shuffledColors=shuffle(COLORS);
  let shuffledImages=shuffle(IMAGES);
  createImages(shuffledImages);
})

form.addEventListener('click',function(e){
  if(e.target.tagName==='DIV'){
    handleCardClick(e);
  }
})



// TODO: Implement this function!
function handleCardClick(event) {
  const image=event.target.querySelector('img');
  if(image.classList.contains('hidden')&&cardsUpCount!==2){
    console.log(event.target);
    if (cardsUpCount===0){
      image1=image;
      image1.classList.toggle('hidden');
      cardsUpCount++;
    }else if (cardsUpCount===1){
      image2=image;
      image2.classList.toggle('hidden');
      scores++;
      cardsUpCount++;
      compareImages(image1,image2);
    }
  }
}

//compare two cards, if they are matched check if all the faces are up to determine winner,
// if not, setTimeout before face down those cards back
function compareImages(first,second){
  if(first.getAttribute('src')===second.getAttribute('src')){
    console.log(faceupCount)
    faceupCount+=2;
    checkWin();
    image1=null;
    image2=null;
    cardsUpCount=0;
  }else{ 
    setTimeout(function(){
      first.classList.toggle('hidden');
      second.classList.toggle('hidden');
      image1=null;
      image2=null;
      cardsUpCount=0;
    },1000);
  }
}

function checkWin(){
  if (faceupCount===COLORS.length){
    alert('You won!');
    console.log(scores);
    faceupCount=0;
  }
}

