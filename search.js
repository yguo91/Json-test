"use strick"

//unpack the search key
const urlParamas = new URLSearchParams(window.location.search);
const searchValue = urlParamas.get("key");

//display the key on screen for testing
document.getElementById("statment").innerHTML = searchValue;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//retrive the data from json file
const LocalJson = "./road-ahead-current-road-closures.json";
// const jSNpath = "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=road-ahead-current-road-closures&q=&format=json";

// const jsonRC = $.getJSON(jSNpath);

// const jsStr = JSON.parse(jsonRC.responseJSON);

// console.log(jsonRC);
//console.log(jsStr);

// function getJson(file){
//    return JSON.parse(file);
// }
// const jsonText = getJson(LocalJson);
// console.log(jsonText);
//load all of location infor into the String array

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
} //end the function
let roadSatus = "";

//access data from json file:
readTextFile(LocalJson, function(text){
    const cases = JSON.parse(text);

    const maxlenth = cases.length;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//use <String>.includes() to evaluate if the rearch key was found
    let status = "";
    document.getElementById("roadSta").src = "./pics/good_to_go.jpg";   

    for(let i=0; i<maxlenth; i++){
        let projectLocation = cases[i].fields.location;
        if (!projectLocation){
            projectLocation = "Cannot match";
        }

        console.log(projectLocation);

        if(projectLocation.toString().includes(searchValue)){
            let projectName = cases[i].fields.project;
            let projectDate = cases[i].fields.comp_date;            
            document.getElementById("roadSta").src = "./pics/road_close.jpg";
            status += "<h2>Road is//will be closed.</h2><h3>Project Name:</h3>" + projectName + "<h3>Project Date:</h3>" + projectDate;    
        }
    }//end for loop
    if (!status){ 
        status = "<h2>Have a good trip, the road is okay.</h2>"
    }
    document.getElementById("statment").innerHTML = status;

});


//display the result