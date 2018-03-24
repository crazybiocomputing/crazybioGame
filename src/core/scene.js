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
const scene = (props) => {
  let element = document.createElement('div'); //<div id = "game"> ??
  element.id = props.id;

  let elementF = document.createElement('figure');
  elementF.id = props['id'];
  let elementS = document.createElement('svg');
  elementS.textContent = 'class="map" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080" preserveAspectRatio="xMinYMin meet"';
  let elementI = document.createElement('image');
  elementI.textContent = 'xlink:href=' + props['display'['graphics'['path']]];
  elementS.appendChild(elementI);

  let children = props['children']

  for (let i=1; i< children.length; i++){
    let elementG = document.createElement('g');
    elementG.textContent = 'class="hover_group" opacity="0"';

    let elementA = createElement('a');
    //a[i].id = props['children'['id[i]']];
    elementA.textContent = 'id="' + props['children'['id[i]']];

    let elementC = createElement('circle');
    elementC.textContent = 'cx =\"' + props['children'['click'][1]] + '\" cy =\"' + props['children'['click'][2]] + '\" r=\"' + props['children'['click'][3]] + '\" 'opacity="0.3" fill="#FFFFFF"'';

    elementA.appendChild(elementC);
    elementG.appendChild(elementA);
    elementS.appendChild(elementG);
  }

  elementF.appendChild(elementS);
  element.appendChild(elementF);

  return element;
};

