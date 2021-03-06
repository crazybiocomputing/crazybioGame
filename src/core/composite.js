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
 * @author Jean-Christophe Taveau
 */
class Composite extends Node {

  constructor(id,className,description) {
    super(id,className,description);
  };
  
  static create(props) {
    return new Composite(props.id,props.class,props.description)
      .append('article')
      .display(props.display)
      .children(props.childNodes) // Pre-calculated in `preprocess` of game.js
      .forEachChild(this.appendChild);
  }

  appendChild(child) {
    console.log('appendChild ',child);
    if (func !== undefined) {
/*      if (child.class === 'item') {
        CRAZYBIOGAME.graph.inventory.appenChild(child);
      }
      else {
*/
        this.element.appendChild(child);
        if (child.class === 'composite' || child.class === 'scene' || child.class === 'scene.closeup') {
          child.forEachChild(child.appendChild);
        }
      //}
    }
  }
  
  traverse(func) {
    this.childNodes.forEach ( (child) => func(this,child));
  }
}


const createComposite = (props) => {
  let composite = Composite.create(props);
  return composite.element;
};

/**
 * Create a new target
 *
 *

 
const createTarget = (node) => {
  let element = document.createElement('div');
  element.id = node.id;
  element.className = 'target';
  // TODO
  if (node.display !== "undefined") {
    if (node.display.path !== "undefined") {
      let img = document.createElement('img');
      img.src = node.display.graphics.path;
      console.log(node.display.graphics.position);
      element.appendChild(img);
    }
    element.style.display = (node.display.visibility) ? "inline-block" : "none";
    // TODO need parent dimension
    let parentWidth = node.display.parentWidth;
    let parentHeight = node.display.parentHeight;
    element.style.left = `${node.display.graphics.position[0]/parentWidth * 100 || 0}%`;
    element.style.top = `${node.display.graphics.position[1]/parentHeight * 100 || 0}%`;
    element.style.maxWidth = `${node.display.graphics.width/parentWidth * 100 || 0}%`;
  }

  
  // TODO
  
  return element;
};
 */
