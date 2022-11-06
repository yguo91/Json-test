"use strick"

//unpack the search key
const urlParamas = new URLSearchParams(window.location.search);
const searchValue = urlParamas.get("key");

//display the key on screen for testing
document.getElementById("statment").innerHTML = searchValue;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//retrive the data from json file
const LocalJson = "./road-ahead-current-road-closures.json";

// loadJSON method to open the JSON file.
function loadJSON(path, success, error) {
  let rawDataFile = new XMLHttpRequest();
  rawDataFile.open('GET', path, true);
  rawDataFile.onreadystatechange = function(){
    if (rawDataFile.readyState === 4) {
      if (rawDataFile.status === 200) {
        success(JSON.parse(rawDataFile.responseText));
      }
      else {
        error(rawDataFile.status);
      }
    }
  };    
  rawDataFile.send();
}
const jSNpath = "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=road-ahead-current-road-closures&q=&format=json";
  
  loadJSON(jSNpath, getData,'jsonStatus');  
  
  function getData(Data)
  {  
    // Output only the details on the first post
    console.log(Data.records);   
  }
 
  // here is what I was writing, which is wrong. 
  // The mistake is using jQuery $.getJSON() to get 
  // the JSON file, which will not directly give me 
  // the data in JSON, but give back a  jqXHR Object. 
  // I was always stuck on extracting data from this object. 
  // If you guys see some way to do this, please tell me anytime.
// const jsonRC = $.getJSON(jSNpath);
// console.log(jsonRC);

// const jsObj = JSON.parse(jsonRC.responseText);

// const jsObj = $.parseJson(jsonRC);
// console.log(jsObj);

// function getJson(file){
//    return JSON.parseJson(file);
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
//initial road status
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
        //incase for empty reading
        if (!projectLocation){
            projectLocation = "Cannot match";
        }

        //console.log(projectLocation); //for test usage

        if(projectLocation.toString().includes(searchValue)){
            //get case info
            let projectName = cases[i].fields.project;
            let projectDate = cases[i].fields.comp_date;            
            document.getElementById("roadSta").src = "./pics/road_close.jpg";
            //create multi records for multi matches
            status += "<h2>Road is//will be closed.</h2><h3>Project Name:</h3>" 
                + projectName + "<h3>Project Date:</h3>" + projectDate;    
        }
    }//end for loop
    //setup for empty search matches
    if (!status){ 
        status = "<h2>Have a good trip, the road is okay.</h2>"
    }
    //refresh the page, if refresh in the loop, only the final one will show on.
    document.getElementById("statment").innerHTML = status;

});

async function pointMap(){
    window.open("./index.html?key=" + searchValue);
}