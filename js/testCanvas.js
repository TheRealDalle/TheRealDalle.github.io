var c = document.getElementById("testCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, c.width, c.height);

var posX = 0;
var posY = 0;
var running = false;



function clickFunction(e) {
    if(!running){
        running = true;
        
        clearCanvas();    
        
        var coordHolder = getMousePos(c,e);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(coordHolder.x-5, coordHolder.y-5, 10, 10);
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
            var angle = randomAngle();
            var tempX = posX + Math.cos(angle)*10;
            var tempY = posY + Math.sin(angle)*10;
        
            ctx.lineTo(tempX, tempY);
            ctx.stroke();
            steps++;
        
            if(tempX < 0 || tempX > c.width || tempY < 0 || tempY > c.height){
                clearInterval(randomWalkAnimation);
                running = false;
                alert("It took " + steps + " steps to get to the edge! That is " + steps * 10 + " pixels, or " + (steps*10)/c.width + " times the width of the canvas! \n\nAssuming the same screen as I am using, that is " + + (steps*10)/c.width * 0.18 + " meters!");
            }
            posX = tempX;
            posY = tempY;
        }
    }else{
        alert("Already in progress!");
    }
}

function clearCanvas(){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);
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
