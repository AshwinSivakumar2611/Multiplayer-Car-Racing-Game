class Game {
  constructor(){
    
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getRank();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          fill("blue");
          ellipse(x,y,50,50);
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3700){
      player.rank = player.rank+1;
      player.updateRank(player.rank);
      player.plarRank = player.plarRank+1;
      player.update();
      gameState = 2;
      
    }
   
    drawSprites();
  }

  textSize=25;
  textcolor=red;

  end(){
    console.log("Game Ended");
  }

  scoreboard(){
    var plr1score = database.ref('players/player1');
    plr1score.on("value",function(data){
      plr1score = data.val();
    })
    var plr2score = database.ref('players/player2');
    plr2score.on("value",function(data){
      plr2score = data.val();
    })
    var plr3score = database.ref('players/player3');
    plr3score.on("value",function(data){
      plr3score = data.val();
    })
    var plr4score = database.ref('players/player4');
    plr4score.on("value",function(data){
      plr4score = data.val();
    })
    text(plr1score.name +" : "+ plr1score.plarRank,600,400);
    text(plr2score.name +" : "+ plr2score.plarRank,600,400);
    text(plr3score.name +" : "+ plr3score.plarRank,600,400);
    text(plr4score.name +" : "+ plr4score.plarRank,600,400);
  }
}
