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
 * Create a new `sprite` node
 *
 * @author Jean-Christophe Taveau
 */
class Sprite extends Node {
 
  constructor (id,className,description) {
    super(id,className,description);
  }
  
  static create(props) {
    return new Sprite(props.id,props.class,props.description,props.parent)
      .append('figure')
      .display(props.display)
      .target(props.target)
      .features(props.features);
  }
}
 
const createSprite = (props) => {
  let sprite = Sprite.create(props);
  return sprite;
}


/*const createSprite = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = 'sprite';
  element.style.display = (props.display !== "undefined" && props.display.visibility) ? "inline-block" : "none";
  // TODO
  let img = document.createElement('img');
  img.src = props.display.graphics.path;
  img.src = props.display.graphics.path;
  element.style.left = `${props.display.graphics.position[0] || 0}px`;
  element.style.top = `${props.display.graphics.position[1] || 0}px`;
  element.appendChild(img);
  
  
  return element;
};*/


/**
 * Create a new generic sprite
 *
 * @author Jean-Christophe Taveau, GONCALVES FRASCO Charlotte, SCHRIEKE Hans

const createSprite = (props) => {
  let position = document.createElement('div');
  position.className = "position";
  position.style = "position:relative;top=-480px;left:-344px";
  let element = document.createElement('div');
  //element.draggable ="true";
  element.id = props.id;
  element.className = 'sprite';
  element.style.display = (props.display !== "undefined" && props.display.visibility) ? "inline-block" : "none";
  //element.style = "height: 1px; width: 1px; top: 35px; left: 755px; background-color: rgb(255, 0, 0); color: rgb(255, 255, 255); z-index: 509"
  // TODO
  let img = document.createElement('img');
  img.src = props.display.graphics.path;
  img.src = props.display.graphics.path;
  element.style.left = `${props.display.graphics.position[0] || 0}px`;
  element.style.top = `${props.display.graphics.position[1] || 0}px`;
  //element.ondragstart="event.dataTransfer.setData('image/plain', 'Ce texte peut être glissé')";
  element.appendChild(img);
  position.appendChild(element);
  let pos = document.createElement('div');
  pos.style = "position:relative;top=-480px;left:-344px";
  let sprite = document.getElementsByClassName('position');
  sprite.addEventListener("drag",function(event){
  },true);

  return element;
};
*/


