/*
 *  crazybioGame: CrazyBioComputing Game Engine
 *  Copyright (C) 2015-2018  Jean-Christophe Taveau.
 *
 *  This file is part of crazybioGame
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with crazybioGame.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */


'use strict';

/**
Hans
*/

// graph est le le parse du fichier storyboard.json dans ce code 
/** ATTENTION : ce code rajoute bien les div dans le html MAIS uniquement hors de la constante scene. De plus, 
la la fonction parse n'étant pas terminée, on ne peut pas voir si les div prennent les bons id. 
*/

const scene = (props) => {

  document.addEventListener("DOMContentLoaded", function(event) { 
    let scene = document.createElement('div');
    scene.id = graph[1].class; // id = "scene"

    let machine_download = document.createElement('div');
    machine_download.id = graph[0].class; // id = "machine.download"

    let machine_lockdigit = document.createElement('div');
    machine_lockdigit.id = graph[2].class // id = "machine.lockDigit[4]"

    let init = document.getElementById('game');

    document.body.insertBefore(scene,init);
    document.body.insertBefore(machine_download,init);
    document.body.insertBefore(machine_lockdigit,init);

  })
}

/**
 * Create a new scene
 *
 * @author GONCALVES FRASCO Charlotte
 */
const createScene = (props) => {
  //let element = document.createElement('div'); // <div id = "scene">
  //element.id = props.id;
console.log(props);
  let elementF = document.createElement('figure');
  elementF.id = props.id;
  let elementS = document.createElement('svg');
  elementS.textContent = 'class="map" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080" preserveAspectRatio="xMinYMin meet"';
  let elementI = document.createElement('image');
  elementI.textContent = `xlink:href="${props.display.graphics.path}"`;
  elementS.appendChild(elementI);

  //let children = props['children']

  for (let child of props.children){
    let elementG = document.createElement('g');
    elementG.textContent = 'class="hover_group" opacity="0"';

    let elementA = document.createElement('a');
    //a[i].id = props['children'['id[i]']];
    elementA.textContent = `id="${child.id}"`;

    let elementC = document.createElement('circle');
    elementC.textContent = `cx ="${child.click[1]}" cy = "${child.click[2]}" r= "${child.click[3]}" opacity="0.3" fill="#FFFFFF"`;

    elementA.appendChild(elementC);
    elementG.appendChild(elementA);
    elementS.appendChild(elementG);
  }

  elementF.appendChild(elementS);
  element.appendChild(elementF);

  return element;
};

