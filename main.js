objects = [];
status = "";

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detection object(s)";
    objName =  document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotresult(error,result){
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        objects = result;
    }
}

function draw() {
    image(video,0,0,380,380);
    if (status != "") {
        objectDetector.detect(video,gotresult);
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object(s) Detected";

            fill("#FF0000");
            precent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + precent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == objName){
                video.stop();
                objectDetector.detect(gotresult);
                document.getElementById("objectStatus").innerHTML = objName + " Found";
                synth = window.SpeechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objName + " Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objectStatus").innerHTML = objName + " Not Found";
            }
        }  
    }
    

}