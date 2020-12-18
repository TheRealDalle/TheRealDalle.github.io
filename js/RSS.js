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



var Sun = new Planet("The Sun", 0, 'red', null, 0.00465, 'js/icons/the_sun.png', "The center of our solar system.<br>");

var Mercury = new Planet("Mercury", 0.387, 'red', null, 0.0000163, 'js/icons/mercury.png');
var Venus = new Planet("Venus", 0.723, 'orange', null, 0.0000404, 'js/icons/venus.png', "Venus is also called Earth's evil twin, since they are so similar in size, but Venus is incredible inhospitable.<br>");
var Earth = new Planet("Earth", 1, 'green', null, 0.0000425, 'js/icons/earth.png', "Earth, our only home<br>");
var Mars = new Planet("Mars", 1.523, 'red', null, 0.000022, 'js/icons/mars.png');
var Jupiter = new Planet("Jupiter", 5.204, 'brown', null, 0.000467, 'js/icons/jupiter.png');
var Saturn = new Planet("Saturn", 9.582, 'orange', null, 0.000389, 'js/icons/saturn.png');
var Uranus = new Planet("Uranus", 19.229, 'DodgerBlue', null, 0.000169, 'js/icons/uranus.png');
var Neptune = new Planet("Neptune", 30.10, 'DarkBlue', null, 0.000164, 'js/icons/neptune.png');
var Pluto = new Planet("Pluto", 40, 'white', null, 0.0000079, 'js/icons/pluto.png', "For me, Pluto will always be a planet!<br>");
var Oort_cloud = new Planet("Oort cloud", 2000, 'white', null, 0.000000000000000001, null, "A thin cloud of stones, ice, and other debris in the outer edges of the solar system. We don't know quite what lies here yet.<br>");

var Proxima = new Planet("Proxima Centauri", 275725.207, 'yellow', null, 0.00143, 'js/icons/proxima.png', "Procima Centauri is the closest star, after the sun.<br>");

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
    addPopup(body);


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

function addPopup(body){
    console.log("Sending " + body.name);
    var disttxt = distanceText(body);
    var diamtxt = diameterText(body);

    var imagetxt = imageText(body);



    body.marker.on('mouseover', function (e) { 
        console.log(body.name);
        //body.marker.bindPopup(body.name).openPopup();
        var popup = L.popup()
                .setLatLng(e.latlng)
                .setContent(
                            "<b>" + body.name + "</b><br><br>" +
                            body.txt +
                            disttxt + 
                            diamtxt +
                            imagetxt)
                .openOn(mymap);
    });
}

function imageText(body){
    var bodySize_mm = ((body.radie*scaleFactor*2)*100*10);

    if(bodySize_mm < 0.6){
        return saltCMP(body, bodySize_mm);
    } else if (bodySize_mm < 6){
        return pepperCMP(body, bodySize_mm);
    } else if (bodySize_mm < 25){
        return diceCMP(body, bodySize_mm);
    } else if (bodySize_mm < 60){
        return pingpongCMP(body, bodySize_mm);
    } else if (bodySize_mm < 120){
        return orangeCMP(body, bodySize_mm);
    } else if (bodySize_mm < 350){
        return footballCMP(body, bodySize_mm);
    }else{
        return beachballCMP(body, bodySize_mm);
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Image functions for popups
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function saltCMP(body, bodySize_mm){
    var cmpSize_mm = 0.3;
    var resize = bodySize_mm/cmpSize_mm;
    return "and comparable in size to that of a grain of salt <br> <img src=\"js/icons/salt.png\" width=\"100\" height = \"100\"> <img src=\"" + body.image + "\" width=\"" + (resize * 100) + "\" height = \""+ (resize * 100) +"\"> ";
}

function pepperCMP(body, bodySize_mm){
    var cmpSize_mm = 4;
    var resize = bodySize_mm/cmpSize_mm;
    return "and comparable in size to that of a peppercorn <br> <img src=\"js/icons/pepper.png\" width=\"100\" height = \"100\"> <img src=\"" + body.image + "\" width=\"" + (resize * 100) + "\" height = \""+ (resize * 100) +"\"> ";
}

function diceCMP(body, bodySize_mm){
    var cmpSize_mm = 15;
    var resize = bodySize_mm/cmpSize_mm;
    return "and comparable in size to that of a dice <br> <img src=\"js/icons/dice.png\" width=\"100\" height = \"100\"> <img src=\"" + body.image + "\" width=\"" + (resize * 100) + "\" height = \""+ (resize * 100) +"\"> ";
}

function pingpongCMP(body, bodySize_mm){
    var cmpSize_mm = 40;
    var resize = bodySize_mm/cmpSize_mm;
    return "and comparable in size to that of a ping pong ball <br> <img src=\"js/icons/ping_pong.png\" width=\"100\" height = \"100\"> <img src=\"" + body.image + "\" width=\"" + (resize * 100) + "\" height = \""+ (resize * 100) +"\"> ";
}

function orangeCMP(body, bodySize_mm){
    var cmpSize_mm = 80;
    var resize = bodySize_mm/cmpSize_mm;
    return "and comparable in size to that of an orange <br> <img src=\"js/icons/orange.png\" width=\"100\" height = \"100\"> <img src=\"" + body.image + "\" width=\"" + (resize * 100) + "\" height = \""+ (resize * 100) +"\"> ";
}

function footballCMP(body, bodySize_mm){
    var cmpSize_mm = 220;
    var resize = bodySize_mm/cmpSize_mm;
    return "and comparable in size to that of a football <br> <img src=\"js/icons/foorball.png\" width=\"100\" height = \"100\"> <img src=\"" + body.image + "\" width=\"" + (resize * 100) + "\" height = \""+ (resize * 100) +"\"> ";
}

function beachballCMP(body, bodySize_mm){
    var cmpSize_mm = 600;
    var resize = bodySize_mm/cmpSize_mm;
    return "and comparable in size to that of a beach ball <br> <img src=\"js/icons/beach_ball.png\" width=\"100\" height = \"100\"> <img src=\"" + body.image + "\" width=\"" + (resize * 100) + "\" height = \""+ (resize * 100) +"\"> ";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//End of image functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function diameterText(body){
    if(((body.radie*scaleFactor*2)*100*10) > 10){
        return body.name + " is " + ((body.radie*scaleFactor*2)*100).toFixed(1) + " cm across, <br>";
    }
    if(((body.radie*scaleFactor*2)*100) > 100){
        return body.name + " is " + ((body.radie*scaleFactor*2)).toFixed(2) + " meters across, <br>";
    }
    return body.name + " is " + ((body.radie*scaleFactor*2)*100*10).toFixed(3) + " mm across, <br>";
}

function distanceText(body){
    if(body.distance*scaleFactor*100 < 100){
        return body.name + " at " + (body.distance*scaleFactor*100).toFixed(2) + " cm from the sun <br>";
    }
    if(body.distance*scaleFactor < 1000){
        return body.name + " at " + (body.distance*scaleFactor).toFixed(2) + " meters from the sun <br>";
    }
    
    return body.name + " at " + ((body.distance*scaleFactor)/1000).toFixed(2) + " km from the sun <br>";
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
        iconSize: [35, 35]
        //popupAnchor: [0, -15]
    });
    console.log("Here comes the sun");
    console.log(sun);

    if(sunMarker != null){
        mymap.removeLayer(sunMarker);
    }
    sunMarker = L.marker(e.latlng, {icon : sun}).addTo(mymap);
    var diamtxt = diameterText(Sun);
    var imagetxt = imageText(Sun);



    sunMarker.on('mouseover', function (e) { 
        //console.log(body.name);
        //body.marker.bindPopup(body.name).openPopup();
        var popup = L.popup()
                .setLatLng(e.latlng)
                .setContent(
                            "<b>The Sun</b><br><br>" +
                            Sun.txt +
                            diamtxt +
                            imagetxt)
                .openOn(mymap);
    });

}

mymap.addEventListener('click', clickFunction);
