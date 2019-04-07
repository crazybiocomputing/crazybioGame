/*
Author : Marina BOUDIN
Description partie 1 : Ajouter du contenue audio et vidéo.
Descritpion partie 2 : Fonction test pour le preprocess , pour l'import au début de touts les médias, de crazybiogame. */

// Partie 1

'use strict';

const displayMedias = (medias) => {
  let display = "block";
  for (let i=0;i<medias.length;i++){
    if (medias[i][1]=="img"){
      medias[i][0].then(function(defs){
        let src = defs;
        console.log("image");
        let media;
        if (src !==undefined){
          media= document.createElement('img');
          media.src =src;
          media.style.display=display;
          let div = document.getElementById("ma_div");
          div.appendChild(media);
        }
      });
    }
    else if (medias[i][1]=="vid"){
      medias[i][0].then(function(defs){
        let src = defs;
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
      });
    }
    else if (medias[i][1]=="aud"){
      medias[i][0].then(function(defs){
        let src = defs;
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
      });
      /**/
    }
    else{
      alert("Couldn't find the media !");
    }
  }
}

//Partie 2

const load_medias = (storyboard) => {
  let display="block";
  var medias=[];
  let my_promise;
  // Trouver un moyen de stocké les objectURL quelquepart pour les ajouté ensuite déjà essayé avec un objet mais les fetch ne s'attendent pas et du coup j'arrive pas à récupérer la valeur
  for(let i=0; i<storyboard.length;i++){
    let dprops = storyboard[i].display.graphics || storyboard[i].display.media;
    if (dprops!==undefined){
      my_promise = fetch(dprops.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        return objectURL;
        // Récupérer ici objectURL
      });
      medias.push([my_promise,"img"]);
    }
    else if (storyboard[i].display.video !== undefined){
      my_promise=fetch(storyboard[i].display.video.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        return objectURL;
        // Récupérer ici objectURL
      });
      medias.push([my_promise,"vid"]);
    }
    else if (storyboard[i].display.audio !== undefined){
      my_promise=fetch(storyboard[i].display.audio.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        return objectURL;
        // Récupérer ici objectURL
      });
      medias.push([my_promise,"aud"]);
    }
    else {
      alert("Could not find the media source: image, video or audio.");
    }
  }
  return medias;
}

var request = new XMLHttpRequest();
request.open('GET',"storyboard.json",true);
request.send();
request.onload=function(){
  var storyboard=JSON.parse(request.response);
  var medias = load_medias(storyboard);
  console.log(medias);
  // Capturer les objectURL puis les afficher avec displayMedias
  displayMedias(medias);
}
