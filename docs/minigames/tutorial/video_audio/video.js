/*
Author : Marina Boudin, Domitille Coq--Etchegaray
Goal : Tv who plays a video with a code, then show a lock and ask the right code.
*/
'use strict';

function restart(){
  let restart=document.getElementById("restart");
  restart.style.display="none";
  let lock= document.getElementById("lock");
  lock.style.display="none";
  play_pause();
}

function load_lock(){
  let video = document.getElementById("video");
  video.style.display="none";
  let play=document.getElementById("tv_video");
  play.style.display="none";
  let lock= document.getElementById("lock");
  lock.style.display="block";
  let restart=document.getElementById("restart");
  restart.style.display="block";
}

function play_pause(){
  let play=document.getElementById("tv_on");
  play.style.display="none";
  let tv_video=document.getElementById("tv_video");
  tv_video.style.display="block"
  let video=document.getElementById("video");
  video.style.display="block";
  if (video.paused){
    video.play();
    video.addEventListener("ended",load_lock);
  }
  else{
    video.pause();
  }
}

fetch("assets/restart.png")
.then(function(response){
  return response.blob();
})
.then(function(myBlob){
  var objectURL =URL.createObjectURL(myBlob);
  let media = document.createElement("img");
  media.src=objectURL;
  media.style.display="none";
  media.id="restart";
  media.style.width="30px";
  media.style.position="relative";
  media.addEventListener("click",restart);
  let div=document.getElementById("ma_div");
  div.appendChild(media);
});
fetch("assets/tv_lock.png")
.then(function(response){
  return response.blob();
})
.then(function(myBlob){
  var objectURL =URL.createObjectURL(myBlob);
  let media = document.createElement("img");
  media.src=objectURL;
  media.style.display="none";
  media.id="lock";
  let div=document.getElementById("ma_div");
  div.appendChild(media);
});
fetch("assets/tv_video.png")
.then(function(response){
  return response.blob();
})
.then(function(myBlob){
  var objectURL =URL.createObjectURL(myBlob);
  let media = document.createElement("img");
  media.src=objectURL;
  media.style="display:none;position:absolute";
  media.id="tv_video";
  let div=document.getElementById("ma_div");
  div.appendChild(media);
});
fetch("assets/movie.mp4")
.then(function(response){
  return response.blob();
})
.then(function(myBlob){
  var objectURL =URL.createObjectURL(myBlob);
  let media= document.createElement("VIDEO");
  media.src=objectURL;
  media.id="video";
  media.style="width:371px;height:209px;position:absolute;margin-top:69px;margin-left:112px";
  media.style.display="none";
  let div = document.getElementById("ma_div");
  div.appendChild(media);
});
fetch("assets/tv_on.png")
.then(function(response){
  return response.blob();
})
.then(function(myBlob){
  var objectURL =URL.createObjectURL(myBlob);
  let media = document.createElement("img");
  media.src=objectURL;
  media.style="display:block";
  media.id="tv_on";
  media.addEventListener("click",play_pause)
  let div=document.getElementById("ma_div");
  div.appendChild(media);
})
