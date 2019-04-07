/*
Author : Marina BOUDIN
Description partie 1 : Ajouter du contenue audio et vidéo.
Descritpion partie 2 : Fonction test pour le preprocess , pour l'import au début de touts les médias, de crazybiogame. */

// Partie 1

'use strict';

const displayMedias = (medias) => {
  let display = "block";
  for (let i=0;i<medias.length;i++){ // Pour chaque médias préchargés
    if (medias[i][1]=="img"){ // Si c'est une image
      medias[i][0].then(function(defs){
        let src = defs; // Ma valeur de objectURL est le defs
        let media;
        if (src !==undefined){ // Je crée l'objet html
          media= document.createElement('img');
          media.src =src;
          media.style.display=display;
          let div = document.getElementById("ma_div");
          div.appendChild(media);
        }
      }); // Je récupère la valeur de mon objectURL
      // Ici un peu particulier la valeur est stockée dans PromiseValue de ma promises
      // On ne peut pas y accèder directement je dois passer par un .then
    }
    else if (medias[i][1]=="vid"){ // Si c'est une vidéo pareil
      medias[i][0].then(function(defs){
        let src = defs;
        let media;
        if (src !==undefined){
          let media= document.createElement("VIDEO");
          media.src=src;
          media.setAttribute("controls","controls"); // Permet de contrôler la lecture de la vidéo
          media.style.display=display;
          let div = document.getElementById("ma_div");
          div.appendChild(media);
        }
      });
    }
    else if (medias[i][1]=="aud"){ // Si c'est un audio pareil
      medias[i][0].then(function(defs){
        let src = defs;
        let media;
        if (src !==undefined){
          let media =document.createElement("AUDIO");
          media.src=src;
          media.style.display=display;
          media.setAttribute("controls","controls"); // Contrôler la lecture de l'audio
          let div =document.getElementById("ma_div");
          div.appendChild(media);
        }
      });
    }
    else{
      alert("Couldn't display the media !");
    }
  }
}

//Partie 2

const load_medias = (storyboard) => {
  let display="block";
  var medias=[]; // Liste qui va contenir tous les promises
  let my_promise;
  for(let i=0; i<storyboard.length;i++){ // Pour chaque objet
    let dprops = storyboard[i].display.graphics || storyboard[i].display.media;
    if (dprops!==undefined){ // Si c'est une image alors
      my_promise = fetch(dprops.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        return objectURL;
      }); // Je vais chercher l'image via son chemin et stocke la promise de retour dans my_promise
      // Cette variable contient aussi la valeur de objectURL
      // Je l'ajoute dans la liste ainsi que son type
      medias.push([my_promise,"img"]);
    }
    else if (storyboard[i].display.video !== undefined){ // Si c'est une vidéo alors pareil
      my_promise=fetch(storyboard[i].display.video.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        return objectURL;
      });
      medias.push([my_promise,"vid"]);
    }
    else if (storyboard[i].display.audio !== undefined){ // Si c'est un ausio alors pareil
      my_promise=fetch(storyboard[i].display.audio.path)
      .then(function(response){
        return response.blob();
      })
      .then(function(myBlob){
        var objectURL =URL.createObjectURL(myBlob);
        return objectURL;
      });
      medias.push([my_promise,"aud"]);
    }
    else {
      alert("Could not find the media source: image, video or audio.");
    }
  }
  return medias; // Je retourne la liste des medias chargés
}

// Ouverture du storyboard json

var request = new XMLHttpRequest();
request.open('GET',"storyboard.json",true);
request.send();
request.onload=function(){
  var storyboard=JSON.parse(request.response);
  // On charge d'abord tous les médias
  var medias = load_medias(storyboard);
  console.log(medias);
  // Affichage seulement dans un second temps des medias
  displayMedias(medias);
}
