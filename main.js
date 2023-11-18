song="";
leftwristX=0;
leftwristY=0;
rightwristY=0;
rightwristX=0;
scoreLeftwrist=0;
scoreRightwrist=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);

  fill("#fc2c03");
  stroke("#0303fc");

  if(scoreLeftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    number_leftwrist=Number(leftwristY);
    remove_decimals=floor(number_leftwrist);
    volume=remove_decimals/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="volume- "+volume;
  }

  if(scoreRightwrist>0.2){
    circle(rightwristX,rightwristY,20);
    if(rightwristY>0 && rightwristY<=100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML="Speed=0.5x";
    }
    else if(rightwristY>100 && rightwristY<=200){
        song.rate(1);
        document.getElementById("speed").innerHTML="Speed=1x";
    }
    else if(rightwristY>200 && rightwristY<=300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML="Speed=1.5x";
    }
    else if(rightwristY>300 && rightwristY<=400){
        song.rate(2);
        document.getElementById("speed").innerHTML="Speed=2x";
    }
    else if(rightwristY>400 && rightwristY<=500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML="Speed=2.5x";
    }
  }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("posenet is loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;

        console.log("left wrist x= "+leftwristX+" ,left wrist y= "+leftwristY);

        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;

        console.log("right wrist x= "+rightwristX+" ,right wrist y= "+rightwristY);

        scoreRightwrist=results[0].pose.keypoints[10].score;
        scoreLeftwrist=results[0].pose.keypoints[9].score;
    }
}



