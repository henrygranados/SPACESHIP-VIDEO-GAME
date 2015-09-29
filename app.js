//Author: Henry Granados
//Website: henrygranados.github.io
function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var myImage = new Image();
    var img  = new Image();
    var enemies = new Image();
    myImage.src = "images/background-pic.jpg"; //Background picture
    img.src = "images/spaceship-pic.png"; //Spaceship picture
    enemies.src = "images/enemies.png";
    ctx.drawImage(myImage, 20, 20);
    ctx.drawImage(img,this.x,this.y, 10, 10);
    ctx.drawImage(enemies, 20, 20);
    var cW = ctx.canvas.width, cH = ctx.canvas.height;
    var enemies = [ {"id":"enemy1","x":100,"y":-20,"w":50,"h":30},
                    {"id":"enemy2","x":225,"y":-20,"w":50,"h":30},
                    {"id":"enemy3","x":350,"y":-20,"w":50,"h":30},
                    {"id":"enemy4","x":100,"y":-70,"w":50,"h":30},
                    {"id":"enemy5","x":225,"y":-70,"w":50,"h":30},
                    {"id":"enemy6","x":350,"y":-70,"w":50,"h":30},
                    {"id":"enemy7","x":475,"y":-70,"w":50,"h":30},
                    {"id":"enemy8","x":600,"y":-70,"w":50,"h":30},
                    {"id":"enemy9","x":475,"y":-20,"w":50,"h":30},
                   {"id":"enemy10","x":600,"y":-20,"w":50,"h":30}

    ];
    function renderEnemies(){
        for(var i = 0; i < enemies.length; i++){
            ctx.fillStyle = "orange";
            ctx.fillRect(enemies[i].x, enemies[i].y+=.5, enemies[i].w, enemies[i].h);
        }
    }
    function Launcher(){
        this.y = 500, 
        this.x = cW*.5-25, 
        this.w = 100, 
        this.h = 100, 
        this.dir, 
        this.bg="red", 
        this.missiles = [];

        this.render = function(){
            if(this.dir == 'left'){
                this.x-=5;
            } else if(this.dir == 'right'){
                this.x+=5;
            }else if(this.dir == "upArrow"){
                this.y+=5;
            }else if(this.dir == "downArrow"){
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
                if(m.y <= 0){ // If a missile goes past the canvas boundaries, remove it
                    this.missiles.splice(i,1); // Splice that missile out of the missiles array
                }
            }
            if(enemies.length == 0){
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = '#FC0';
                ctx.font = 'italic bold 36px Arial, sans-serif';
                ctx.fillText('Good Job!', cW*.5-130, 50, 300);

            }
        }
        this.hitDetect = function(m,mi){
            for(var i = 0; i < enemies.length; i++){
                var e = enemies[i];
                if(m.x+m.w >= e.x && m.x <= e.x+e.w && m.y >= e.y && m.y <= e.y+e.h){
                    this.missiles.splice(this.missiles[mi],1); // Remove the missile
                    enemies.splice(i,1); // Remove the enemy that the missile hit
                    document.getElementById('status').innerHTML = "Destroyed "+ e.id+ " ";
                }
            }
        }
    }
    var launcher = new Launcher();
    function animate(){
        //ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies();
        //ctx.restore();
    }
    var animateInterval = setInterval(animate, 12);
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
        }
    }, false);
    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37)
        {
         launcher.dir = '';
        }
    }, false); 
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39)
        {
         launcher.dir = 'right';
        }
    }, false);
    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39)
        {
         launcher.dir = '';
        }
    }, false); 
    document.addEventListener('keydown', function(event){
         if(event.keyCode == 38)
         {
           launcher.dir = 'downArrow';
         }
    }, false);
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 38)
         {
           launcher.dir = '';
         }
    }, false);
    document.addEventListener('keydown', function(event){
         if(event.keyCode == 40)
         {
           launcher.dir = 'upArrow';
         }
    }, false);
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 40)
         {
           launcher.dir = '';
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