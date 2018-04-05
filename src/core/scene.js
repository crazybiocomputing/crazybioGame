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
    elementC.setAttributeNS(null,'cx',cx);
    elementC.setAttributeNS(null,'cy',cy);
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
    let elementC = document.createElementNS(NS,'path');
    elementC.setAttributeNS(null,'d',path);
    return elementC;
  }

  console.log(props);

  let element = document.createElement('figure');
  element.id = props.id;
  const NS = 'http://www.w3.org/2000/svg';
  let elementS = document.createElementNS(NS,'svg');
  elementS.setAttributeNS(null, 'viewBox','0 0 1920 1080');
  elementS.setAttributeNS(null, 'class', 'map');
  let elementI = document.createElementNS(NS,'image');
  elementI.setAttributeNS(null,'width',800);
  elementI.setAttributeNS(null,'height',432);

  elementI.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', props.display.graphics.path);
  elementS.appendChild(elementI);


  for (let child of props.children){
    let elementG = document.createElementNS(NS,'g');
    elementG.setAttributeNS(null, 'class', 'hover_group');
    elementG.setAttributeNS(null, 'opacity', '0');

    let elementA = document.createElementNS(NS,'a');
    elementA.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'javascript:void(0)');

    elementA.setAttributeNS(null, 'id', child.id);
    let elementC;
    if (child.click[0] == 'C'){
      elementC = createCircle(child.click[1],child.click[2],child.click[3]);
    }

    else if (child.click[0] == 'R'){
      elementC = createRectangle(child.click[1],child.click[2],child.click[3],child.click[4]);
    }

    else if (child.click[0] == 'P'){
      elementC = createPolygon(child.click[1]);
    }

    elementA.appendChild(elementC);
    elementG.appendChild(elementA);
    elementS.appendChild(elementG);
  }

  element.appendChild(elementS);
  console.log(element);

  return element;
};
