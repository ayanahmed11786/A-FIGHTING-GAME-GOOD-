var database;
var gameState = 0, playerCount;

var allPlayers;

var invisibleGround;

var fighters;

var backgroundImg

var form, player, game;

var fighter1, fighter2;
var fg1Img, fg2Img;

var fg1jumpImg, fg1hittedImg , fg1fallImg, fg1standupImg, fg1walkImg, fg1punchImg,
    fg1kickImg;

var fg2jumpImg, fg2hittedImg, fg2fallImg, fg2standupImg, fg2walkImg, fg2punchImg,
    fg2kickImg;

    var f1score = 0;
    var f2score = 0;

    var gameState = "serve";

function preload(){

  backgroundImg = loadImage("arena.png");

  //standing images
  fg1Img = loadAnimation("left/stand/0.png","left/stand/1.png","left/stand/2.png",
  "left/stand/3.png","left/stand/4.png","left/stand/5.png","left/stand/6.png",
  "left/stand/7.png","left/stand/8.png");

  fg2Img = loadAnimation("right/stand/0.png","right/stand/1.png","right/stand/2.png",
  "right/stand/3.png","right/stand/4.png","right/stand/5.png","right/stand/6.png",
  "right/stand/7.png","right/stand/8.png");

  //player's hitted Images
  fg1hittedImg = loadAnimation("left/hitted/0.png","left/hitted/1.png","left/hitted/2.png",);

  fg2hittedImg = loadAnimation("right/hitted/0.png","right/hitted/1.png","right/hitted/2.png",);

  //punching images
  fg1punchImg = loadAnimation("left/low-punch/0.png","left/low-punch/1.png","left/low-punch/2.png",
  "left/low-punch/3.png","left/low-punch/4.png",);

  fg2punchImg = loadAnimation("right/low-punch/0.png","right/low-punch/1.png","right/low-punch/2.png",
  "right/low-punch/3.png","right/low-punch/4.png",);

  //kicking images
  fg1kickImg = loadAnimation("left/low-kick/0.png","left/low-kick/1.png","left/low-kick/2.png",
  "left/low-kick/3.png","left/low-kick/4.png","left/low-kick/5.png",);

  fg2kickImg = loadAnimation("right/low-kick/0.png","right/low-kick/1.png","right/low-kick/2.png",
  "right/low-kick/3.png","right/low-kick/4.png","right/low-kick/5.png",);
  
}

function setup() {
  createCanvas(800,400);

  fighter1 = createSprite(200,300,50,50);
  fighter1.addAnimation("f1", fg1Img);
  //fighter1.debug = true;
  //fighter1.setCollider("circle");

  fighter2 = createSprite(600,300,50,50);
  fighter2.addAnimation("f2", fg2Img);
 // fighter2.debug = true;

  invisibleGround = createSprite(400,350,800,20);
  invisibleGround.visible = false;

}

function draw() {
  background(backgroundImg);  

  if(gameState === "serve"){
    textSize(20);
    fill("yellow")
    text("WELCOME",400,70); 
    text("It is a MULTIPLAYER FIGHTING GAME.",260,120);
    text("Both the players have to fight against each other to win this game.",150,170);
    text("PRESS  'P'  button to start the game",280,220);
  }

  if(keyDown("P") && gameState === "serve"){
    gameState = "play";

  }

  fighter1.collide(invisibleGround);
  fighter2.collide(invisibleGround);

  if(gameState === "play"){

    textSize(20);
  fill("yellow");
  text("F1-SCORE : "+ f1score, 100,40);
  text("F2-SCORE : "+ f2score, 600,40);
  
  if(keyDown(RIGHT_ARROW)){
    fighter1.x +=3;
    //fighter1.addAnimation("f1",fg1walkImg);
  }

  if(keyDown(LEFT_ARROW)){
    fighter1.x -=3;
    //fighter1.addAnimation("f1",fg1walkImg);
  }

  if(keyDown("A")){
    fighter2.x -=3;
    //fighter2.addAnimation("f2",fg2walkImg);
  }

  if(keyDown("D")){
    fighter2.x +=3;
    //fighter2.addAnimation("f2",fg2walkImg);
  }

  if(keyWentDown(UP_ARROW)){
    fighter1.velocityY = -12;
   // fighter1.addAnimation("f1",fg1jumpImg);
  }
  fighter1.velocityY += 2;

  if(keyWentUp(UP_ARROW)){
    fighter1.addAnimation("f1",fg1Img);
  }

  if(keyWentDown("W")){
    fighter2.velocityY = -5;
   // fighter2.addAnimation("f2",fg2jumpImg);
  }
  fighter2.velocityY += 0.8;

  if(keyWentUp("W")){
    fighter2.addAnimation("f2",fg2Img);
  }

  if(keyWentDown("space")){
    var rand = Math.round(random(1,2));
    if(rand === 1){
      fighter1.addAnimation("f1",fg1punchImg)
    }else{
      fighter1.addAnimation("f1",fg1kickImg);
    }
  }

  if(keyWentUp("space")){
    fighter1.addAnimation("f1",fg1Img)
  }

  if(keyWentDown("Q")){
    var rand = Math.round(random(1,2));
    if(rand === 1){
      fighter2.addAnimation("f2",fg2punchImg)
    }else{
      fighter2.addAnimation("f2",fg2kickImg);
    }
  }

  if(keyWentUp("Q")){
    fighter2.addAnimation("f2",fg2Img)
  }

  if(keyWentDown("space") && fighter1.isTouching(fighter2)){
    f1score = f1score+1;
    fighter2.addAnimation("f2", fg2hittedImg);
  }else{
    fighter2.changeAnimation("f2", fg2Img);
  }

  if(keyWentDown("Q") && fighter2.isTouching(fighter1)){
    f2score = f2score+1;
    fighter1.addAnimation("f1", fg1hittedImg);
  }else{
    fighter1.changeAnimation("f1", fg1Img);
  }

  if(fighter1.x >= fighter2.x){
    fighter1.x = 200;
    fighter2.x = 600;
  }

  if(fighter2.x <= fighter1.x){
    fighter1.x = 200;
    fighter2.x = 600;
  }

  console.log(fighter2.x);
  console.log(fighter1.x);

  drawSprites();
  }

}

