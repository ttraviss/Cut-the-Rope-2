const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope_2;
var rope_3;
var button_2;
var button_3;


var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;
var blower;
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(width/2 - 25,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button_2 = createImg('cut_btn.png');
  button_2.position(width/2 - 250, 70);
  button_2.size(50,50);
  button_2.mouseClicked(drop2);
  
  button_3 = createImg('cut_btn.png');
  button_3.position(width/2 + 250, -10);
  button_3.size(50,50);
  button_3.mouseClicked(drop3);


  /*blower = createImg('balloon.png');
  blower.position(50,250);
  blower.size(100,100);
  blower.mouseClicked(airblow);*/

  mute_btn = createImg('mute.png');
  mute_btn.position(width - 100,100);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  
  rope = new Rope(7,{x:width/2,y:30});
  ground = new Ground(width/2,height-10,width,20);

  rope_2 = new Rope(5,{x:width/2 - 250, y: 70});

  rope_3 = new Rope(9,{x:width/2 + 250, y: -10});

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(width/2,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  Matter.Composite.add(rope_2.body, fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope_2, fruit);
  fruit_con_3 = new Link(rope_3, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope_2.show();
  rope_3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
    sad_song.play();
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play();
}

function drop2(){
  rope_2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
  cut_sound.play();
}

function drop3(){
  rope_3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
  cut_sound.play();
}

function airblow() {
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air.play();
}

function mute() {
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


