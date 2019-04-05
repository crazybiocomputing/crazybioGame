/*
Author : Marina BOUDIN
Description partie 1 : Ajouter du contenue audio et vidéo.
Descritpion partie 2 : Fonction test pour le preprocess , pour l'import au début de touts les médias, de crazybiogame. */

// Partie 1

'use strict';

const displayMedias = (medias) => {
  let display = "block";
  for (let i=0;i<medias["img"].length;i++){
    let src = medias["img"][i];
    let media;
    if (src !==undefined){
      media= document.createElement('img');
      media.src =src;
      media.style.display=display;
      let div = document.getElementById("ma_div");
      div.appendChild(media);
    }
  }
  for (let i=0;i<medias["vid"].length;i++){
    let src = medias["vid"][i];
    let media;
    if (src !==undefined){
      let media= document.createElement("VIDEO");
      media.src=src;
      media.setAttribute("controls","controls");
      media.style.display=display;
      let div = document.getElementById("ma_div");
      div.appendChild(media);
    }
  }
  for (let i=0;i<medias["aud"].length;i++){
    let src = medias["aud"][i];
    let media;
    if (src !==undefined){
      let media =document.createElement("AUDIO");
      media.src=src;
      media.style.display=display;
      media.setAttribute("controls","controls");
      let div =document.getElementById("ma_div");
      div.appendChild(media);
    }
  }
}

//Partie 2

/*media.src=objectURL;
media.style.display=display;
let div = document.getElementById("ma_div");
div.appendChild(media);

media.src=objectURL;
media.setAttribute("controls","controls");
media.style.display=display;
let div = document.getElementById("ma_div");
div.appendChild(media);

media.src=objectURL;
media.setAttribute("controls","controls");
media.style.display=display;
let div = document.getElementById("ma_div");
div.appendChild(media);*/

const load_medias = (storyboard) => {
  let display="block";
  let medias={"img":[],"vid":[],"aud":[]};
  for(let i=0; i<storyboard.length;i++){
    let dprops = storyboard[i].display.graphics || storyboard[i].display.media;
    if (dprops!==undefined){
      fetch(dprops.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias["img"].push(objectURL);
      });
      }
    else if (storyboard[i].display.video !== undefined){
      fetch(storyboard[i].display.video.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias["vid"].push(objectURL);
      });
    }
    else if (storyboard[i].display.audio !== undefined){
      fetch(storyboard[i].display.audio.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias["aud"].push(objectURL);
      })
    }
    else {
      alert("Could not find the media source: image, video or audio.");
    }
  }
  return medias;
}

var request = new XMLHttpRequest();
request.open('GET',"storyboard.json",true);
request.onload=function(){
  var storyboard=JSON.parse(request.response);
  let medias = load_medias(storyboard);
  console.log(medias);
  displayMedias(medias);
}
request.send(null);

/*var storyboard =[{"id": 1,"class": "scene","description": "A poster...","display": {"width": 690,"height": 480,"audio": {"path": "Audio.mp3"}},"children":[2,4,20,21]},{"id": 2,"class": "machine.lockText","description": "A lock symbol","display": {"position": [530,90],"width": 60,"height": 60,"video": {"path": "Video.mp4"},"target" : {"data": ["C", 30,30, 30]}},"features": {"exit": "allright"}},{"id": 20,"class": "machine.tile","description": "Some text","display": {"width": 335,"height": 195,"position": [1, 0],"graphics": {"path": "assets/congratulations_0.jpg"}}}];
console.log(storyboard);
process(storyboard);*/
