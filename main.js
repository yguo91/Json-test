"use strick";

//set up the map
var map = L.map('map').setView([49.251445, -123.001236], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.bcit.ca"><img src="./pics/bcit_logo.jpg"></a>'
        }).addTo(map);

const jSNpath = "./road-ahead-current-road-closures.json";

var cases;
const displayLog = document.getElementById("text1");
var maxlenth;

//setup function to access json
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//access data from json file:
readTextFile(jSNpath, function(text){
    cases = JSON.parse(text);

    //for debug
    //console.log(cases);
    maxlenth = cases.length;

    displayLog.innerHTML = "";
    for(let i =0; i<maxlenth; i++){
        let projectName = cases[i].fields.project;
        let projectDate = cases[i].fields.comp_date;
        //get coordinates
        let coordinates = cases[i].fields.geom.coordinates;

        let colength = coordinates.length;
        let coStr = " ";
        coStr += (colength + " "); 
        console.log(coStr);

        let logStr = " ";

        for(let j = 0; j<colength; j++){
            logStr += (coordinates[j] + " ") //for debug
            let x = coordinates[j][1];
            let y = coordinates[j][0];
            
            let t = y[0];
            if(!(t == null)){
                x = coordinates[j][0][1];
                y = coordinates[j][0][0];
            }
            
            //console.log(x);            
           
            var marker = L.marker([x,y]).addTo(map);

            //add notes on marks
            if (!projectName){
                projectName = "Not get information."
            }
            marker.bindPopup("<b>Project Name:</b></br>" + projectName + "</br><b>Date: </b>" + projectDate);

        }
        //console.log(logStr);

        //displayLog.innerHTML += ("<p>" + (i+1) + " . " + locations + "</p>") ;
    }

});





