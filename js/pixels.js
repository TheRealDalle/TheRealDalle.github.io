var canvas = document.getElementById("pixelCanvas");
var context = canvas.getContext("2d");
var pixelSizeInput = document.getElementById("pxsize");
var pixelColorInput = document.getElementById("pxColor")

drawCanvas();

function drawCanvas(){
    var color = hexToRgb(pixelColorInput.value);
    var pxsize = parseInt(pixelSizeInput.value);

    for (let w = 0; w < canvas.width/pxsize; w++){
        switch(w%3) {
            case 0:
            context.fillStyle = "rgb("+color.r+",0,0)"
            break;
            case 1:
                context.fillStyle = "rgb(0,"+color.g+",0)"
                break;
            case 2:
                context.fillStyle = "rgb(0,0,"+color.b+")"
                break;
        } 
        context.fillRect(w*pxsize, 0, pxsize, canvas.height);
    }
}



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
  


pixelSizeInput.addEventListener('input', drawCanvas);
pixelColorInput.addEventListener('input', drawCanvas);
