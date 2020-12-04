var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var bananaGroup;
var survivalTime;
var jumpSound;
var score;
var obstaclesGroup;
var dieSound;
var backgroundImage;

var gameOver , gameOverImage;
var restart , restartImage;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");

  gameOverImage = loadImage("GAMEOVERC.png");
  restartImage = loadImage("restartc.png");
  backgroundImage = loadImage("bgg.jpg");

}



function setup() {

  createCanvas(displayWidth, displayHeight-110);
  
  gameOver = createSprite(displayWidth/2-400,displayHeight/2-50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  
  restart = createSprite(displayWidth/2-400,displayHeight/2);
  restart.addImage(restartImage);
  restart.scale = 0.5;

  ground = createSprite(displayWidth/2-470,displayHeight/2+200, displayWidth, 10);
  

  ground.shapeColor = "red";

  monkey = createSprite(displayWidth/2-600, 430, 10, 10);
  monkey.addAnimation("running", monkey_running);
 
  monkey.scale = 0.1;
  

  score = 0;

  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
 
   
  

}


function draw() {
  background(backgroundImage);

    camera.position.x = ground.x;
    // camera.position.y = displayHeight;
    //camera.position.y = cars[index-1].y;


  if(gameState == PLAY) {
    
     ground.velocityX = (4 + 50* score/100);
    
    gameOver.visible = false;
    restart.visible = false;

  if (keyWentDown(32) && monkey.y >= 400) {
    monkey.velocityY = -19;
    jumpSound.play();
  }

  monkey.velocityY = monkey.velocityY + 0.8;
    

   if (ground.x > 0) {
     ground.x = displayWidth / 2; 
   }
    
  if(monkey.isTouching(bananaGroup)) {
     score = score+1;
      bananaGroup.destroyEach();
     }
    
     
   
    
    if(monkey.isTouching(obstaclesGroup)) {
    gameState = END;
      dieSound.play();

      
    
    
    }
    
    stroke("black");
  textSize(20);
  fill("green");
  
 
  text("Score :" + score,100,100);
    
    

  spawnBananas();
  spawnObstacles();
    
  } else if (gameState === END) {
  ground.velocityX = 0;
  score = 0;
  survivalTime = 0;
    
    gameOver.visible = false;
   
   gameOver.visible = true;
    restart.visible = true;
    
 obstaclesGroup.setVelocityEach(0);   
 bananaGroup.setVelocityEach(0);
    
    obstaclesGroup.visible = false;
    bananaGroup.visible = false;
    monkey.velocityY = 0;
    
  
    gameOverRestart();
  
  }
  
 
  if(mousePressedOver(restart)) {
      reset();
    survivalTime = 0;
    }
  
 

  drawSprites();
  monkey.collide(ground);
  
}

function spawnBananas() {
  
    var banana = createSprite(displayWidth/2+200, 50, 10, 10);
    banana.velocityX = -(6 + 30* score/100);

    banana.y = Math.round(random(displayHeight/2,displayHeight/2-50));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = displayWidth/2;

    bananaGroup.add(banana);

  }



function spawnObstacles() {
  
    var obstacles = createSprite(displayWidth/2+200,displayHeight/2+150, 10, 10);
    obstacles.velocityX = -(7 + 30* score/100);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.25;
    obstacles.lifetime = displayWidth/2;
    
    obstaclesGroup.add(obstacles);
    
    obstacles.setCollider("circle",80,0,0);
  
}

function gameOverRestart () {
background("black");
monkey.visible = false; 
ground.visible = false;  
}

function reset () {
gameState = PLAY;  
monkey.visible = true;
ground.visible = true;
background("skyBlue"); 
 


}