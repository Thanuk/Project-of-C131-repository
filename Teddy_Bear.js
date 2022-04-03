status = "";
img = "";
object = [];

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Object is detecting";
}

function modelLoaded(){
    console.log("COCOSSD is loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function preload(){
    img = loadImage("IMG-0161.jpg");
}

function logout(){
    window.loaction = "index.html";
} 

function draw(){
    image(img, 0, 0, 640, 420);

    if(status != ""){
        for(i = 0; i < object.length; i++){
            document.getElementById("Status").innerHTML = "Status : Object detected";
            percent = floor(object[i].confidence * 100);
            fill("yellow");
            text(object[i].label + "" + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x - 15, object[i].y - 15, object[i].width, object[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        object = results;
    }
}