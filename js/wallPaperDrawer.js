var wallpaper = document.getElementById("wallPaperCanvas");
var clearWallpaperButton = document.getElementById("clearWallpaper");
var sectionElement = document.getElementById("numSections");
var colorSelector = document.getElementById("wallPaperColor");
var backgroundColor = document.getElementById("wallPaperBackground");
var strokeThickness = document.getElementById("wallPaperThickness");



var wallpaperContext = wallpaper.getContext("2d");
wallpaperContext.fillStyle = wallPaperBackground.value;
wallpaperContext.fillRect(0, 0, c.width, c.height);

var posX = 0;
var posY = 0;
var isDrawing = false;
wallpaperContext.lineWidth = 5;


function clickFunction(e) {


    var coordHolder = getMousePos(wallpaper, e);
    wallpaperContext.fillStyle = "#FF0000";
    wallpaperContext.fillRect(coordHolder.x - 5, coordHolder.y - 5, 10, 10);
    posX = coordHolder.x;
    posY = coordHolder.y
}

function clearWallpaper() {
    console.log("Rensar...");
    wallpaperContext.clearRect(0, 0, wallpaper.width, wallpaper.height);
    wallpaperContext.fillStyle = wallPaperBackground.value;
    wallpaperContext.fillRect(0, 0, wallpaper.width, wallpaper.height);
}

function setMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();

    posX = evt.clientX - rect.left;
    posY = evt.clientY - rect.top;

}

function draw(wppr, e) {
    setMousePos(wppr, e);

    var sectionWidth = wppr.width / sectionElement.value;
    var sectionX = posX % sectionWidth;

    //Loops over all sections
    for (var i = 0; i < sectionElement.value; i++) {
        //Draws a circle in each section
        var localX = sectionX + (i * sectionWidth);
        wallpaperContext.beginPath();
        wallpaperContext.arc(localX, posY, strokeThickness.value, 0, 2 * Math.PI, false);
        wallpaperContext.fillStyle = colorSelector.value;
        wallpaperContext.fill();
        wallpaperContext.lineWidth = 5;
        wallpaperContext.strokeStyle = colorSelector.value;
        wallpaperContext.stroke();
    }


}

//c.addEventListener('click', clickFunction);


// Mouse Down Event
wallpaper.addEventListener('mousedown', function (event) {
    setMousePos(this, event);
    isDrawing = true;
    draw(this, event);

    // Start Drawing

});

// Mouse Move Event
wallpaper.addEventListener('mousemove', function (event) {

    if (isDrawing) {
        draw(this, event);
    }
});

// Mouse Up Event
wallpaper.addEventListener('mouseup', function (event) {
    setMousePos(this, event);
    isDrawing = false;
});



clearWallpaperButton.addEventListener('mousedown', clearWallpaper);



