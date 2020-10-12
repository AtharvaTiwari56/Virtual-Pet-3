var dog, dogimg, dog_happyimg, database, foodStock, foodCount, feedButton, addButton, food ;
var fedTime, lastFed, changeGameState, readGameState;
var bedImage, washImage, gardenImg, currentTime;

function preload() {
  dogimg = loadImage("images/dogImg.png");
  bedImage = loadImage("images/Bed Room.png");
  washImage = loadImage("images/Wash Room.png");
  gardenImg = loadImage("images/Garden.png");
  dog_happyimg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 800);
  
  food = new Food();

  readGameState = database.ref('gameState');
  readGameState.on("value", (data) => {
    changeGameState = data.val();
  })
  
  dog = createSprite(850, 200, 34, 34);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);

  addButton = createButton("Add Food To Stock");
  addButton.position(700, 95);
  addButton.mousePressed(addFood);
  
  feedButton = createButton("Feed the Dog");
  feedButton.position(850, 95);
  feedButton.mousePressed(feedDog);
}


function draw() {  
  background(46, 139, 87);
  

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  })
  currentTime = hour();
  if (currentTime == (lastFed + 1)) {
    updateState("Playing");
    food.garden();
  } else if (currentTime == (lastFed + 2) || currentTime == (lastFed +3)) {
     updateState("Sleeping");
     food.bedroom();
  } else if (currentTime == (lastFed + 4)) {
    updateState("Sleeping");
    food.washroom();
  } else {
    updateState("Hungry");
    food.display();
  }

  if (changeGameState != "Hungry") {
    addButton.hide();
    feedButton.hide();
    dog.remove();
  } else {
    addButton.show();
    feedButton.show();
    //dog.addImage(dogimg);
  }
  fill(0);
  textSize(15);
  if(lastFed >= 12) {
    text("Last Fed : " + lastFed%12 + " PM", 350, 30);
  }else if(lastFed === 0) {
    text("Last Fed : 12 AM", 350, 30);
  }else {
    text("Last Fed : " + lastFed + "AM", 350, 30);
  }
  
  drawSprites();
  
}
function readStock(data) {
  foodCount = data.val();
  food.updateFoodStock(foodCount);
}


function feedDog () {
  if (foodCount !== 0) {
    dog.addImage(dog_happyimg);

  food.updateFoodStock(food.getFoodStock() -1);
  database.ref('/').update({
    Food: food.getFoodStock(),
    FeedTime: hour()
  })
  }
}
function addFood() {
  dog.addImage(dogimg);
  foodCount++;
  database.ref('/').update({
    Food:foodCount
  })
}
function updateState(state) {
  database.ref('/').update({
    gameState: state
  });
}



