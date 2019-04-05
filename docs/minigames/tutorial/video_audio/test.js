/*
Author : Marina BOUDIN
Description partie 1 : Ajouter du contenue audio et vidéo.
Descritpion partie 2 : Fonction test pour le preprocess , pour l'import au début de touts les médias, de crazybiogame. */

// Partie 1

'use strict';

const display = (type,obj) => {
  let display = "block";
  if (type=="img"){
    let src = obj;
    let media;
    if (src !==undefined){
      media= document.createElement('img');
      media.src =src;
      media.style.display=display;
      let div = document.getElementById("ma_div");
      div.appendChild(media);
    }
    }
    else if (obj.display.video !== undefined){
      let media= document.createElement("VIDEO");
      media.src=obj.display.video.path;
      media.setAttribute("controls","controls");
      media.style.display=display;
      let div = document.getElementById("ma_div");
      div.appendChild(media);
      }
    else if (obj.display.audio !== undefined){
      let media =document.createElement("AUDIO");
      media.src=obj.display.audio.path;
      media.style.display=display;
      media.setAttribute("controls","controls");
      let div =document.getElementById("ma_div");
      div.appendChild(media);
    }
    else {
      alert("Could not find the media source: image, video or audio.");
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
  var medias = {"img":[],"vid":[],"aud":[]};
  let my = storyboard.map((obj) => {
    let dprops = obj.display.graphics || obj.display.media;
    if (dprops!==undefined){
      fetch(dprops.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias["img"].push(objectURL);
        console.log(medias);
      });
      }
    else if (obj.display.video !== undefined){
      fetch(obj.display.video.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias["vid"].push(objectURL);
      });
    }
    else if (obj.display.audio !== undefined){
      fetch(obj.display.audio.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias["aud"].push(objectURL);
      });
    }
    else {
      alert("Could not find the media source: image, video or audio.");
    }
    console.log(medias);
  })
}

var request = new XMLHttpRequest();
request.open('GET',"storyboard.json",true);
request.onload=function(){
  var storyboard=JSON.parse(request.response);
  console.log(storyboard);
  console.log(typeof(storyboard));
  load_medias(storyboard);
}
request.send(null);

/*var storyboard =[{"id": 1,"class": "scene","description": "A poster...","display": {"width": 690,"height": 480,"audio": {"path": "Audio.mp3"}},"children":[2,4,20,21]},{"id": 2,"class": "machine.lockText","description": "A lock symbol","display": {"position": [530,90],"width": 60,"height": 60,"video": {"path": "Video.mp4"},"target" : {"data": ["C", 30,30, 30]}},"features": {"exit": "allright"}},{"id": 20,"class": "machine.tile","description": "Some text","display": {"width": 335,"height": 195,"position": [1, 0],"graphics": {"path": "assets/congratulations_0.jpg"}}}];
console.log(storyboard);
process(storyboard);*/
