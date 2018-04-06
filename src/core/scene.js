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
 * Create a new scene
 *
 * @author GONCALVES FRASCO Charlotte
 */
const createScene = (props) => {

  const createCircle = (cx,cy,radius) => {
    let elementC = document.createElementNS(NS,'circle');
    elementC.setAttributeNS(null,'cx',cx+radius);
    elementC.setAttributeNS(null,'cy',cy+radius);
    elementC.setAttributeNS(null,'r',radius);
    elementC.setAttributeNS(null,'opacity', '0.3');
    elementC.setAttributeNS(null, 'fill', '#FFFFFF');
    return elementC;
  }

  const createRectangle = (x,y,w,h) => {
    let elementC = document.createElementNS(NS,'rect');
    elementC.setAttributeNS(null,'x',x);
    elementC.setAttributeNS(null,'y',y);
    elementC.setAttributeNS(null,'w',w);
    elementC.setAttributeNS(null,'h',h);
    elementC.setAttributeNS(null,'opacity', '0.3');
    elementC.setAttributeNS(null, 'fill', '#FFFFFF');
    return elementC;
  }

  const createPolygon = (path) => {
    let elementC = document.createElementNS(NS,'polygon');
    elementC.setAttributeNS(null,'points',path);
    return elementC;
  }

  console.log(props);

  let element = document.createElement('figure');
  element.id = props.id;
  element.className = 'scene';
  /* Add background image
  let img = document.createElement('img');
  img.src = props.display.graphics.path;
  element.appendChild(img);
  */
 
  const NS = 'http://www.w3.org/2000/svg';
  let elementS = document.createElementNS(NS,'svg');
  // TODO BUG
  elementS.setAttributeNS(null, 'viewBox',`0 0 ${props.display.graphics.width} ${props.display.graphics.height}`);
  elementS.setAttributeNS(null, 'class', 'map');

  elementS.setAttributeNS(null,'width','100%');
  elementS.setAttributeNS(null,'height','100%');
  elementS.setAttributeNS(null,'preserveAspectRatio','xMinYMin meet');
  // elementS.textContent = 'class="map" version="1.1" xmlns= xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1Ratio="xMinYMin meet"';
  let elementI = document.createElementNS(NS,'image');
  elementI.setAttributeNS(null,'width','100%');
  elementI.setAttributeNS(null,'height','100%');
  

  elementI.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', props.display.graphics.path);
  elementS.appendChild(elementI);


  // Define clickable areas if any
  for (let child of props.childNodes){
    let elementG = document.createElementNS(NS,'g');
    elementG.setAttributeNS(null, 'class', 'hover_group');
    elementG.setAttributeNS(null, 'opacity', '0');
    elementG.setAttributeNS(null, 'id', 'circle');


    let elementA = document.createElementNS(NS,'a');
    elementA.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'javascript:void(0)');

    elementA.setAttributeNS(null, 'id', child.id);
    let elementC;
    console.log(child);
    
    if (child.display.click[0] === 'C'){
      elementC = createCircle(child.display.click[1],child.display.click[2],child.display.click[3]);
    }

    else if (child.features.click[0] === 'R'){
      elementC = createRectangle(child.features.click[1],child.features.click[2],child.features.click[3],child.features.click[4]);
    }

    else if (child.features.click[0] === 'P'){
      elementC = createPolygon(child.display.click[1,path.slice(1,path.length)]);
    }

    elementA.appendChild(elementC);
    elementG.appendChild(elementA);
    elementS.appendChild(elementG);
  }

  element.appendChild(elementS);
  console.log(element);

  return element;
};
