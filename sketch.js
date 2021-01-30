var ground, groundImage;
var sonic, sonicImage;
var obstacle, obstacleImage, obstacleGroup;
var gameState = "PLAY";
var distance = 0;


function preload(){
  
  groundImage = 
    loadImage("background.png");
  
  sonicImage = 
    loadImage("sonicRunning.png");
  
  obstacleImage = 
    loadImage("spikes.png");
  
}


function setup() {
  createCanvas(displayWidth,displayHeight);

  ground = createSprite(displayWidth-300,displayHeight,30,30);
  ground.x = ground.width/2;
  ground.velocityX = -6;

  
  sonic = createSprite(200,400,20,20);
  sonic.addImage(sonicImage);
  sonic.scale = 0.3;
  
  obstacleGroup = new Group();
  
  
}

function draw() {
  background(groundImage);

  if(ground.x<displayWidth-300){
    ground.x = ground.width/2;
    ground.addImage(groundImage);
  }
  
  if(keyDown("right")){
    sonic.x = sonic.x+10;
    distance+=50;
  }
  
  if(keyDown("down")){
    sonic.velocityY = 3;
  }
  
  if(keyDown("up")){
    sonic.velocityY = -3;
    }
  if(sonic.y>displayHeight-70){
    sonic.velocityY = sonic.velocityY + 1;
  }

  camera.position.x = displayWidth/2;
  camera.position.y = displayHeight/2;
  
  spawnObstacles();
  drawSprites();

  
  if(gameState === "END"){
    sonic.destroy();
    obstacleGroup.destroyEach();
    background("white");
    textSize(20);
    stroke("purple");
    text("Game Over.", displayWidth-250,displayHeight-200);
  }
  
  
  
  if(sonic.isTouching(obstacleGroup)){
    gameState = "END";
  
  }

  if(distance === 3000){
    sonic.destroy();
    obstacleGroup.destroyEach();
    background("white");
    textSize(20);
    stroke("purple");
    text("Great job!! You covered a long distance! Refresh this tab to play again!", displayWidth+50,displayHeight-200);
  }
  }


function spawnObstacles() {
  if(frameCount%50==0){
    obstacle = createSprite(displayWidth,Math.round(random(100,600)), 20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    sonic.depth = obstacle.depth;
    sonic.depth = obstacle.depth+1;
    obstacle.scale = 0.5;
    obstacleGroup.lifetime = 400;
    obstacleGroup.add(obstacle);
    
      
    }
  
  
}
  