img='';
status='';
objects=[];

function preload(){  
    song = loadSound("alert.mp3");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    status=true;
}

function gotresult(error,result){
    if (error){
        console.log(error);
    }else{
        console.log(result);
        objects=result;
    }
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotresult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
                if(objects[i].label == "person")
                {
                    document.getElementById("number_of_objects").innerHTML = "Person Found";
                    console.log("Stop!!!!!!!");
                    song.stop();
                }
                else
                {
                    document.getElementById("number_of_objects").innerHTML = "Person Not Found";
                    console.log("Play!!!!!!!!!"); 
                    song.play();
                }
            }
        if(objects.length == 0)
        {
          document.getElementById("number_of_objects").innerHTML = "PERSON Not Found";
          console.log("Play!!!!!"); 
          song.play();
        }
    }
}