var backgroundColor = 'rgb(28, 28, 28)';
var c = document.getElementById("randomWalkCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, c.width, c.height);


var posX = 0;
var posY = 0;
var running = false;
var currentHue = 180;

function clickFunction(e) {
    if(!running){
        running = true;
        
        clearRandomWalkCanvas();    
        
        var coordHolder = getMousePos(c,e);
        ctx.fillStyle = "red";
        ctx.fillRect(coordHolder.x-5, coordHolder.y-5, 10, 10);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.lineTo(coordHolder.x, coordHolder.y);
        ctx.stroke();
        posX = coordHolder.x;
        posY = coordHolder.y

        console.log("PosX: " + posX);
        console.log("PosY: " + posY);


        var steps = 0;
        
        var randomWalkAnimation = setInterval(function(){
            takeStep();
        }, 10);

        var takeStep = function(){
            ctx.beginPath();
            ctx.lineTo(posX, posY);
            var angle = randomAngle();
            var tempX = posX + Math.cos(angle)*10;
            var tempY = posY + Math.sin(angle)*10;
        
            ctx.lineTo(tempX, tempY);

            changespeed = 10
            ctx.strokeStyle = nextRanbowColor();//'rgb('+(steps*changespeed)%255+', '+(125+(steps*changespeed))%255+', '+(225+(steps*changespeed))%255+')';
            ctx.closePath();
            ctx.stroke();
            steps++;
        
            if(tempX < 0 || tempX > c.width || tempY < 0 || tempY > c.height){
                clearInterval(randomWalkAnimation);
                running = false;
                alert("It took " + steps + " steps to get to the edge! That is " + steps * 10 + " pixels, or " + Math.round(10*((steps*10)/c.width))/10 + " times the width of the canvas! \n\nAssuming the same screen as I am using, that is " + Math.round((steps*10)/c.width * 0.18 * 100)/100 + " meters!");
            }

            posX = tempX;
            posY = tempY;
        }
    }else{
        alert("Already in progress!");
    }
}



function nextRanbowColor(){
    currentHue = (currentHue+0.2)%360;
    return 'hsl('+currentHue+',100%,50%)';
}

function clearRandomWalkCanvas(){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'rgb(28, 28, 28)';
    ctx.fillRect(0, 0, c.width, c.height);
    currentHue = 240;
}



function randomAngle(){
    return (Math.random() * 2*Math.PI);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }


c.addEventListener('click', clickFunction);
