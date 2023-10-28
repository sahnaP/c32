const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playershoot;
var playerBullets = [];
var alien1, alien2;
var numberOfBullets = 10;
var counter=0;

var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(330, playerBase.body.position.y - 153, 200, 180);
  playerShooter = new playerShooter(
    340,
    playerBase.body.position.y - 180,
    210,
    210
  );

  alien1 = new Alien(width - 300, 330, 200, 200);
  alien2 = new Alien(width - 550, height - 300, 200, 200);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerBase.display();
  player.display();
  playerShooter.display();

  alien1.display();
  alien2.display();
  alienMove();
  console.log(counter);
  console.log(random(0,10));


  // if(playerBullets.Matter.SAT.collides(
  //   alien1.body,
  //   playerBullets[i].body
  // )){
  //   // alien1.lifetime =300;
  // }

  // if(playerBullets.Matter.SAT.collides(
  //   alien2.body,
  //   playerBullets[i].body
  // )){
  //   alien2.setInterval(() => {
      
  //   }, interval); =300;
  // }

  for (var i = 0; i < playerBullets.length; i++) {
    if (playerBullets[i] !== undefined) {
      playerBullets[i].display();

      var posX = playerBullets[i].body.position.x;
      var posY = playerBullets[i].body.position.y;

      if (posX > width || posY > height) {
        if (!playerBullets[i].isRemoved) {
          playerBullets[i].remove(i);
        } else {
          playerBullets[i].trajectory = [];
        }
      }
    }
  }

  
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("ALIEN INVASION", width / 2, 100);

 
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Score " + score, width - 200, 100);

  
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("BULLETS : " + numberOfBullets, 200, 100);

  if (numberOfBullets == 0) {
    gameOver();
  }

}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfBullets > 0) {
      var posX = playerShooter.body.position.x;
      var posY = playerShooter.body.position.y;
      var angle = playerShooter.body.angle;

      var bullet = new PlayerArrow(posX, posY, 30, 20, angle);

      bullet.trajectory = [];
      Matter.Body.setAngle(bullet.body, angle);
      playerBullets.push(bullet);
      numberOfBullets -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerBullets.length) {
      var angle = playerShooter.body.angle;
      playerBullets[playerBullets.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
  
      
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


function win() {
  swal(
    {
      title: `You Won!!!`,
      text: "Thanks for playing!!",
  
      
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function alienMove(){
  if (counter>50){
  alien1 = new Alien(width - 300, random(0,windowHeight), 200, 200);
  alien2 = new Alien(width - 550, random(0,windowHeight), 200, 200);
 
  counter = 0;
  }else{
   counter=counter+1;
  }
  
   
 }











