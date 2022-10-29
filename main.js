"use strick";

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
    console.log(cases);
    maxlenth = cases.length;

    displayLog.innerHTML = "";
    for(let i =0; i<maxlenth; i++){
        let locations = cases[i].fields.location;

        if (!locations){
            locations = "Not get information."
        }

        displayLog.innerHTML += ("<p>" + (i+1) + " . " + locations + "</p>") ;
    }

});




