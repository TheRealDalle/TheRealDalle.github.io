var mymap = L.map('mapid').setView([57.684164, 11.897773], 12);
console.log("Hejsasdasd");
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGhlcmVhbGRhbGxlIiwiYSI6ImNraXJ6cGxkYjB1bXIycnJ4MXI0cm5mOHQifQ.vaHH5zHTvMAF3E0nOICMFw'
}).addTo(mymap);




var Mercury = new Planet("Mercury", 0.387, 'red', null, 0.0000163, 'js/icons/mercury.png');
var Venus = new Planet("Venus", 0.723, 'orange', null, 0.0000404, 'js/icons/venus.png');
var Earth = new Planet("Earth", 1, 'green', null, 0.0000425, 'js/icons/earth.png');
var Mars = new Planet("Mars", 1.523, 'red', null, 0.000022, 'js/icons/mars.png');
var Jupiter = new Planet("Jupiter", 5.204, 'brown', null, 0.000467, 'js/icons/jupiter.png');
var Saturn = new Planet("Saturn", 9.582, 'orange', null, 0.000389, 'js/icons/saturn.png');
var Uranus = new Planet("Uranus", 19.229, 'DodgerBlue', null, 0.000169, 'js/icons/uranus.png');
var Neptune = new Planet("Neptune", 30.10, 'DarkBlue', null, 0.000164, 'js/icons/neptune.png');
var Pluto = new Planet("Pluto", 40, 'white', null, 0.0000079, 'js/icons/pluto.png');
var Oort_cloud = new Planet("Oort cloud", 2000, 'white', null, 0.000000000000000001, null);

var Proxima = new Planet("Proxima Centauri", 275725.207, 'yellow', null, 0.00143, null);

//var Planets = [Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto];

var metersPerPixel = 0;
var sunSize_AU = 0.0093;
var sunRadie_km = 696340;

var km_per_AU = 149597870;


var sunSize_m = 1; //Suns size in meters

var scaleFactor = sunSize_m/sunSize_AU;
var diameterScaleFactor = ((sunSize_m/1000)/(sunRadie_km))*2; //Gives diameter

var sunMarker = null;

console.log("ScaleFactor = " + scaleFactor);
console.log("Radie Scalefactor = " + diameterScaleFactor);





function addPlanet(body, position){
    
    //Cull previous drawings
    if(body.marker != null) {
        mymap.removeLayer(body.marker);
   }

   body.marker = L.circle(position.latlng, {
            color: body.color,
            //fillColor: '#f03',
            fillOpacity: 0.0,
            bubblingMouseEvents: false,
            //dashArray: '20, 20', dashOffset: '20',
            radius: body.distance*scaleFactor //In meters, by spec
    });
    body.marker.addTo(mymap);
    body.marker.on('mouseover', function (e) { 
        console.log(body.name);
        //body.marker.bindPopup(body.name).openPopup();
        var popup = L.popup()
                .setLatLng(e.latlng)
                .setContent(body.name + " at " + (body.distance*scaleFactor).toFixed(2) + " meters from the sun <br>"+
                            body.name + " is " + ((body.radie*scaleFactor*2)*100*10).toFixed(3) + " mm across <br>" + 
                            "<img src=\"" + body.image + "\" width=\"50\" height = \"50\">")
                .openOn(mymap);
    });


    //"Fake" circle to deny mouse event to the inside real 
    var fakeCircle = L.circle(position.latlng, {
        //color: 'green',
        //fillColor: '#f03',
        opacity : 0.0,
        fillOpacity: 0.0,
        bubblingMouseEvents: false,
        //dashArray: '20, 20', dashOffset: '20',
        radius: (body.distance*scaleFactor*0.96)-0.5 //In meters, by spec. Slightly smaller than real circle
        }).addTo(mymap);
}




function clickFunction(e){
    //Re-do scale Calculations, if input has changed
    sunSize_m = document.getElementById("sunSizeInput").value;
    scaleFactor = sunSize_m/sunSize_AU;
    diameterScaleFactor = ((sunSize_m/1000)/(sunRadie_km))*2; //Gives diameter


    addPlanet(Proxima, e);

    addPlanet(Oort_cloud, e);

    addPlanet(Pluto, e);

    addPlanet(Neptune, e);

    addPlanet(Uranus, e);

    addPlanet(Saturn, e);

    addPlanet(Jupiter, e);

    addPlanet(Mars, e);

    addPlanet(Earth, e);

    addPlanet(Venus, e);

    addPlanet(Mercury, e);


    var sun = L.icon({
        iconUrl: 'js/icons/sun.png',
        iconSize: [15, 15]
        //popupAnchor: [0, -15]
    });
    console.log("Here comes the sun");
    console.log(sun);

    if(sunMarker != null){
        mymap.removeLayer(sunMarker);
    }
    sunMarker = L.marker(e.latlng, {icon : sun}).addTo(mymap);
    console.log(sunMarker);






    
}





mymap.addEventListener('click', clickFunction);
