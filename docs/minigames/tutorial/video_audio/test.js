/*
Author : Marina BOUDIN
Description partie 1 : Ajouter du contenue audio et vidéo.
Descritpion partie 2 : Fonction test pour le preprocess , pour l'import au début de touts les médias, de crazybiogame. */

// Partie 1

'use strict';

const displayMedias = (medias) => {
  let display = "block";
  console.log(medias);
  for (let i=0;i<medias.length;i++){
    if (medias[i][0]=="img"){
      let src = medias[i][1];
      console.log("image");
      let media;
      if (src !==undefined){
        media= document.createElement('img');
        media.src =src;
        media.style.display=display;
        let div = document.getElementById("ma_div");
        div.appendChild(media);
      }
    }
    else if (medias[i][0]=="vid"){
      let src = medias[i][1];
      console.log("image");
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
    else if (medias[i][0]=="aud"){
      let src = medias[i][1];
      console.log("image");
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
    else{
      alert("Couldn't find the media !");
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
  var medias=new Array(0);
  for(let i=0; i<storyboard.length;i++){
    let dprops = storyboard[i].display.graphics || storyboard[i].display.media;
    if (dprops!==undefined){
      fetch(dprops.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias.push(["img",objectURL]);
      });
      }
    else if (storyboard[i].display.video !== undefined){
      fetch(storyboard[i].display.video.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias.push(["vid",objectURL]);
      });
    }
    else if (storyboard[i].display.audio !== undefined){
      fetch(storyboard[i].display.audio.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        medias.push(["aud",objectURL]);
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
  var medias = load_medias(storyboard);
  console.log(medias);
  displayMedias(medias);
}
request.send(null);

/*var storyboard =[{"id": 1,"class": "scene","description": "A poster...","display": {"width": 690,"height": 480,"audio": {"path": "Audio.mp3"}},"children":[2,4,20,21]},{"id": 2,"class": "machine.lockText","description": "A lock symbol","display": {"position": [530,90],"width": 60,"height": 60,"video": {"path": "Video.mp4"},"target" : {"data": ["C", 30,30, 30]}},"features": {"exit": "allright"}},{"id": 20,"class": "machine.tile","description": "Some text","display": {"width": 335,"height": 195,"position": [1, 0],"graphics": {"path": "assets/congratulations_0.jpg"}}}];
console.log(storyboard);
process(storyboard);*/
