var canvas = document.getElementById("normalDistrCanvas");
var context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.font = "15px Arial";

function onclick(){
    clearCanvas();

    var normalDistr = dropBalls();
    console.log(normalDistr);

    var workArea = canvas.width - 100; //100 pixel buffer on either side
    var spacePerBar = workArea/normalDistr.length; //Width of each bar
    
    
    var maxValue = normalDistr.reduce(function(a, b) {
        return Math.max(a, b);
    });

    context.textAlign = "center";

    var heightScale = 200/maxValue; //200 is the desired height of the maximum bar

    normalDistr.forEach(function (item, index){
        context.fillStyle = "blue";
        context.fillRect(50 + index*spacePerBar, 250 - item * heightScale, spacePerBar-3, item * heightScale);
        context.fillStyle = "black";
        context.fillText(item,50 + index*spacePerBar + (spacePerBar/2), 265);

    })



}

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
}


function dropBalls(){
    var balls = parseInt(prompt("How many balls?"),10);
    var levels = parseInt(prompt("How many levels?"),10);

    var result = Array.from({length: levels+1}, (v, i) => 0);
    console.log(result);

    for(var i = 0; i < balls; i++){
        var index = 0;
        if(i%1000 == 0){ 
            console.log("Ball nr " + i);
        }

        for(var j = 0; j < levels; j++){
            if(Math.random() >= 0.5){
                index++; //Move in the result array if the coin flip is TRUE
            }
        }
        result[index] = result[index] + 1;
    }
    return result;

}




canvas.addEventListener('click', onclick);
