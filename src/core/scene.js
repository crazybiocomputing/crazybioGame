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

  const createCircle = (area) => {
    let cx = area[1];
    let cy = area[2];
    let radius = area[3];
    let shape = document.createElementNS(NS,'circle');
    shape.setAttributeNS(null,'cx',cx+radius);
    shape.setAttributeNS(null,'cy',cy+radius);
    shape.setAttributeNS(null,'r',radius);
    shape.setAttributeNS(null,'opacity', '0.3');
    shape.setAttributeNS(null, 'fill', '#FFFFFF');
    return shape;
  }

  const createRectangle = (x,y,w,h) => {
    let shape = document.createElementNS(NS,'rect');
    shape.setAttributeNS(null,'x',x);
    shape.setAttributeNS(null,'y',y);
    shape.setAttributeNS(null,'w',w);
    shape.setAttributeNS(null,'h',h);
    shape.setAttributeNS(null,'opacity', '0.3');
    shape.setAttributeNS(null, 'fill', '#FFFFFF');
    return shape;
  }

  const createPolygon = (path) => {
    let shape = document.createElementNS(NS,'polygon');
    shape.setAttributeNS(null,'points',path);
    return shape;
  }

  const geometries = {'C': createCircle, 'R': createRectangle, 'P': createPolygon};

  const NS = 'http://www.w3.org/2000/svg';

  console.log(props);

  let element = document.createElement('figure');
  element.id = props.id;
  element.className = 'scene';

  let elementS = document.createElementNS(NS,'svg');
  // TODO BUG
  elementS.setAttributeNS(null, 'viewBox',`0 0 ${props.display.graphics.width} ${props.display.graphics.height}`);
  elementS.setAttributeNS(null, 'class', 'map');
  elementS.setAttributeNS(null,'width','100%');
  elementS.setAttributeNS(null,'height','100%');
  elementS.setAttributeNS(null,'preserveAspectRatio','xMinYMin meet');

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
    elementA.setAttributeNS(null, 'id',`svg_${child.id}`);
    elementA.className = 'btn';

    let shape;
    console.log(child);
    shape = geometries[child.display.click[0].toUpperCase()](child.display.click);

    elementA.appendChild(shape);
    elementG.appendChild(elementA);
    elementS.appendChild(elementG);
  }

  element.appendChild(elementS);
  console.log(element);

  return element;
};
