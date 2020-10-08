var tilesCanvas = document.getElementById("tilesCanvas");
var tilesCtx = tilesCanvas.getContext("2d");
var resetButton = document.getElementById("resetCanvas");

var height = 10;
var width = 15;
var tileGrid = [];


class Tile{
    constructor(x,y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}


clearTiles();
populateCanvas(width,height);


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function populateCanvas(widthTiles, heightTiles){
    for(var i = 0; i<heightTiles; i++){
        var tileRow = [];
        for(var j = 0; j<widthTiles; j++){
            var tempColor = 'rgba(255, 255, 255, 1)';

            var tile = new Tile((tilesCanvas.width/widthTiles)*j, (tilesCanvas.height/heightTiles)*i, (tilesCanvas.width/widthTiles), (tilesCanvas.height/heightTiles), tempColor);


            tilesCtx.fillStyle = tempColor
            tilesCtx.fillRect(tile.x, tile.y, tile.width, tile.height);

            tileRow[j] = tile;
        }
        tileGrid[i] = tileRow;
    }
}

function getTile(x,y){
    return{
        x: Math.floor((x/tilesCanvas.width)*width),
        y: Math.floor((y/tilesCanvas.height)*height)
    };
}


function clearTiles(){
    tilesCtx.clearRect(0, 0, c.width, c.height);
    tilesCtx.fillStyle = "white";
    tilesCtx.fillRect(0, 0, c.width, c.height);
}

function getMousePosTiles(canvas, evt) {
    var rect = tilesCanvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function hoverFunction(e){
    var temp = getMousePosTiles(c,e);
    var tilepos = getTile(temp.x,temp.y);

    var r = document.getElementById("myRed").value;
    var b = document.getElementById("myBlue").value;
    var g = document.getElementById("myGreen").value;
    var a = document.getElementById("myAlpha").value;

    var tile = tileGrid[tilepos.y][tilepos.x];
    tilesCtx.fillStyle = 'rgba('+r+', '+g+','+b+','+a+')';
    tilesCtx.fillRect(tile.x, tile.y, tile.width, tile.height);
    //console.log("X column: " + tilepos.x);
    //console.log("Y thingi: " + tilepos.y);
}

function resetFunction(){
    tileGrid = [];
    height = document.getElementById("newHeight").value;
    width = document.getElementById("newWidth").value;
    clearTiles();
    populateCanvas(width,height);
}

tilesCanvas.addEventListener('mousemove', hoverFunction);
resetButton.addEventListener('mousedown', resetFunction);
