video= "";
status="";
objects=[];

//function preload()
//{
   // video= createVideo("video.mp4");

//}
function setup()
{
    canvas= createCanvas(300,350);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(300,350);
    video.hide();

}
function draw()
{
    
    image(video,0,0,300,350);
    if(status != "")
    {
        objectDetector.detect(video, gotResult)
        for(i=0; i< objects.length; i++)
        {
         document.getElementById("status").innerHTML="Status: Objects Detected";
         document.getElementById("no_of_objects").innerHTML="Number of objects detected"+ objects.length;
         fill("green");
         percent= floor(objects[i].confidence*100);
        text(objects[i].label+"" +percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("black");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
        }
    }
               
     
}
function gotResult(error, results)

{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
   objects= results;
}

function start()
{
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name= document.getElementById("object_name").value;

}
function modelLoaded()
{
    console.log("model is loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
    
}
