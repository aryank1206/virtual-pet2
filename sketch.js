//Create variables here
var dog,happyDog,database,foodS,foodStock,milkBottle;
var addFoodB,feedFoodB;
var fedTime,lastFed;
var foodObj;


function preload()
{
	dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  milkBottle=loadImage("images/Milk.png");
}



function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  
  dog1=createSprite(800,200,150,150)
  dog1.addImage(dog);
  dog1.scale=0.2


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  foodObj=new Food();
  //Buttons:
  //(i)
  feedFoodB=createButton("feed Dog");
  feedFoodB.position(700,100)
  feedFoodB.mousePressed(feedDog)

  //(ii)
  addFoodB=createButton("Add food")
  addFoodB.position(800,100);
  addFoodB.mousePressed(addFood);
  
}


function draw() {  

   background(46,139,87);

   
     fedTime=database.ref('feedTime');
     fedTime.on("value",function(data){
       lastFed=data.val();
     })

     fill(255,255,254);
     textSize(15);
     if(lastFed>=12){
       text("last Fed:"+lastFed%12+"PM",250,30);
     }
     else if(lastFed==0){
       text("Last Fed: 12 AM",350,30 );
     }

     else{
       text("Last Feed:"+lastFed+"AM",350,30);
     }

       
   foodObj.display();
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog1.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:second()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


