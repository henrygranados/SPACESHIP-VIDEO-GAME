function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var myImage = new Image();
    var img  = new Image();
    var enemiespic = new Image();
    var enemiespic2 = new Image();
    myImage.src = "images/background-pic.jpg"; //Background picture
    img.src = "images/spaceship-pic.png"; //Spaceship picture
    enemiespic.src = "images/enemies.png";
    enemiespic2.src = "images/ene2.png"; //Enemies picture
    ctx.drawImage(myImage, 20, 20);
    ctx.drawImage(img,this.x,this.y, 10, 10);
    ctx.drawImage(enemiespic, 20, 20);
    ctx.drawImage(enemiespic2, 20, 20);
    var cW = ctx.canvas.width 
    var cH = ctx.canvas.height;

    // I sorta like the idea of being able to create 'unique' ships or at least being able to adjust the hit box, if images are larger than the other normal ships. 
    //   feel free to use this or trash this.
    var enemyTemplate = function(options){
        return {
            // Items on the right side of the || is treated as the 'default' value if you don't pass anything to the template
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            hitBox: options.hitBox || { y: 25, x: 45 },
            image: options.image || enemiespic
        }
    }

    // To reduce a repetitive function or two I've made some slight changes to how you create enemies.
    var enemies = [
                   new enemyTemplate({"id": "enemy1", "x": 100, "y": -20, "w": 50, "h": 30 }),
                   new enemyTemplate({"id": "enemy2", "x": 225, "y": -20, "w": 50, "h": 30 }),
                   new enemyTemplate({"id": "enemy3", "x": 350, "y": -20, "w": 80, "h": 50, "hitBox": {y: 40, x: 40}}), // proof that this ship is 'bigger' than the others.
                   new enemyTemplate({"id":"enemy4","x":100,"y":-70,"w":80,"h":50}),
                   new enemyTemplate({"id":"enemy5","x":225,"y":-70,"w":50,"h":30}),
                   new enemyTemplate({"id":"enemy6","x":350,"y":-70,"w":50,"h":30}),
                   new enemyTemplate({"id":"enemy7","x":475,"y":-70,"w":50,"h":30}),
                   new enemyTemplate({"id":"enemy8","x":600,"y":-70,"w":80,"h":50}),
                   new enemyTemplate({"id":"enemy9","x":475,"y":-20,"w":50,"h":30}),
                   new enemyTemplate({ "id": "enemy10", "x": 600, "y": -20, "w": 50, "h": 30 }),
                   new enemyTemplate({ "id": "enemy51", "x": 100, "y": -220, "w": 50, "h": 30, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy2", "x": 225, "y": -220, "w": 50, "h": 30, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy3", "x": 350, "y": -220, "w": 80, "h": 50, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy4", "x": 100, "y": -270, "w": 80, "h": 50, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy5", "x": 225, "y": -270, "w": 50, "h": 30, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy6", "x": 350, "y": -270, "w": 50, "h": 30, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy7", "x": 475, "y": -270, "w": 50, "h": 30, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy8", "x": 600, "y": -270, "w": 80, "h": 50, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy9", "x": 475, "y": -200, "w": 50, "h": 30, "image": enemiespic2 }),
                   new enemyTemplate({ "id": "enemy10", "x": 600, "y": -200, "w": 50, "h": 30, "image": enemiespic2 })
                  ];

    // This allows for more enemies to be rendered without needing a function per set of enemies.
    // This also forces enemies to check if THEY are hitting the player 
    var renderEnemies = function (enemyList) {
        for (var i = 0; i < enemyList.length; i++) {
            //ctx.fillStyle = "green";
            ctx.drawImage(enemyList[i].image, enemyList[i].x, enemyList[i].y += .5, enemyList[i].w, enemyList[i].h);
            // So the reason why your ships can't tell if there was a crash is because you never called the function that can do this.
            launcher.hitDetectLowerLevel(enemyList[i]);
            //ctx.fillRect(enemies[i].x, enemies[i].y+=.5, enemies[i].w, enemies[i].h);
        }
    }

    function Launcher(){
        this.y = 500, 
        this.x = cW*.5-25, 
        this.w = 100, 
        this.h = 100,   
        this.dir, 
        this.bg="white", 
        this.missiles = [];
        this.Nave = 1;

        this.render = function () {
            console.log(this);
            if(this.dir == 'left'){
                this.x-=5;
            } else if(this.dir == 'right'){
                this.x+=5;
            }else if(this.dir == "downArrow"){
                this.y+=5;
            }else if(this.dir == "upArrow"){
                this.y-=5;
            }
            ctx.fillStyle = this.bg;
            ctx.drawImage(myImage, 10, 10);
            ctx.drawImage(img,this.x,this.y, 100, 90);
            //ctx.fillRect(this.x, this.y, this.w, this.h);

            for(var i=0; i < this.missiles.length; i++){
                var m = this.missiles[i];
                ctx.fillStyle = ctx.drawImage(img,this.x,this.y, 100, 90);
                ctx.fillRect(m.x, m.y-=5, m.w, m.h);
                this.hitDetect(this.missiles[i],i);
                //this.hitDetectLowerLevel();  // I don't see a reason to call this when shooting bullets
                if(m.y <= 0){ // If a missile goes past the canvas boundaries, remove it
                    this.missiles.splice(i,1); // Splice that missile out of the missiles array
                }
            }
            if (enemies.length == 0 /*&& enemies2.shipList.length == 0*/) {
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = '#FC0';
                ctx.font = 'italic bold 36px Arial, sans-serif';
                ctx.fillText('Good Job!', cW*.5-130, 50, 300);

            }
        }
        this.hitDetect = function (m, mi) {
            for (var i = 0; i < enemies.length; i++) {
                var e = enemies[i];
                if(m.x+m.w >= e.x && 
                   m.x <= e.x+e.w && 
                   m.y >= e.y && 
                   m.y <= e.y+e.h){
                    this.missiles.splice(this.missiles[mi],1); // Remove the missile
                    enemies.splice(i, 1); // Remove the enemy that the missile hit
                    document.getElementById('status').innerHTML = "Destroyed "+ e.id+ " ";
                }
            }
        }
        // Ask player ship if an enemy has passed or has hit the player ship
        this.hitDetectLowerLevel = function(enemy){
            var e = enemy;
            var hitBox = enemy.hitBox
            var gameStatus = { // If you wanted to use different fonts or messages for the player losing you can change it accordingly.
                over: false, 
                message: "",
                fillStyle: '#FC0',
                font: 'italic bold 36px Arial, sans-serif',
            }
            if(e.y > 550){
                gameStatus.over = true;
                gameStatus.message = 'Ships have passed!'
            }
            // THIS DETECTS SHIPS CRASHING!
            if ((enemy.y < this.y + hitBox.y && enemy.y > this.y - hitBox.y) &&
                (enemy.x < this.x + hitBox.x && enemy.x > this.x - hitBox.x)) {
                    gameStatus.over = true;
                    gameStatus.message = 'You Died!'
                }

            if(gameStatus.over == true){  
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = gameStatus.fillStyle;
                ctx.font = gameStatus.font;
                ctx.fillText(gameStatus.message, cW * .5 - 130, 50, 300);
            }
        }
    }
    var launcher = new Launcher();
    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
        //renderEnemies(enemies2);
    }
    var animateInterval = setInterval(animate, 4);
    var left_btn = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var fire_btn = document.getElementById('fire_btn'); 


    left_btn.addEventListener('mousedown', function(event) {
        launcher.dir = 'left';
    });
   document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37)
        {
         launcher.dir = 'left';  
        if(launcher.x < cW*.2-130){
            launcher.x+=0;
            launcher.dir = '';
         }
       }
        
    }, false);
    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37)
        {
         launcher.x+=0;
         launcher.dir = '';
        }
    }, false); 
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39)
        {
         launcher.dir = 'right';
         if(launcher.x > cW-110){
            launcher.x-=0;
            launcher.dir = '';
         }
        
        }
    }, false);
    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39)
        {
         launcher.x-=0;   
         launcher.dir = '';
        }
    }, false); 
    document.addEventListener('keydown', function(event){
         if(event.keyCode == 38)
         {
           launcher.dir = 'upArrow';  
           if(launcher.y < cH*.2-80){
            launcher.y += 0;
            launcher.dir = '';
         }
         }
    }, false);
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 38)
         {
           launcher.y -= 0;
           launcher.dir = '';
         }
    }, false);
    document.addEventListener('keydown', function(event){
         if(event.keyCode == 40)
         {
           launcher.dir = 'downArrow';  
          if(launcher.y > cH - 110){
            //launcher.y += 20;
            launcher.y -= 0;
            launcher.dir = '';
           }
         }
    }, false);
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 40)
         {
           launcher.y += 0;
           launcher.dir = '';
         }
    }, false);

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 80)
         {
          location.reload();
         }
    }, false);

    left_btn.addEventListener('mouseup', function(event) {
        launcher.dir = '';
    });
    right_btn.addEventListener('mousedown', function(event) {
        launcher.dir = 'right';
    });
    right_btn.addEventListener('mouseup', function(event) {
        launcher.dir = '';
    });
    //This code below fires bullets
    fire_btn.addEventListener('mousedown', function(event) {
        launcher.missiles.push({"x":launcher.x+launcher.w*.5,"y":launcher.y,"w":3,"h":10,"bg":"red"});
    });
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
        launcher.missiles.push({"x":launcher.x+launcher.w*.5,"y":launcher.y,"w":3,"h":10,"bg":"red"});
        }
    }, false);
    document.addEventListener('keyup', function(event) {
        if(lastDownTarget == canvas) {
        launcher.missiles.push({});
        }
    }, false);
    
}
window.addEventListener('load', function(event) {
    initCanvas();
});
