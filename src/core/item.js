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
 * Create a new item
 *
 *
 */
class Item extends Node {

  constructor (id,className,description) {
    super(id,className,description);
  }

  static create(props) {
    return new Item(props.id,props.class,props.description,props.parent)
      .append('li')
      .display(props.display)
      .action(props.action);
  }
  
  display(displayProps) {
    if (displayProps === undefined) {
      return this;
    }
    
    this.width = displayProps.width || 0;
    this.height = displayProps.height || 0;
    this.topleft = displayProps.position || [0,0];
      
    // Image
    if (displayProps.graphics !== undefined) {
      // Append the media
      // TODO
      // Check extension and create the appropriate HTML5 element
      let img = document.createElement('img');
      img.src = displayProps.graphics.path;
      img.addEventListener('dragstart', () => false,false); 
      this.element.appendChild(img);
      
      if (displayProps.graphics.style !== undefined) {
        for (let key in displayProps.graphics.style) {
          this.element.style[key] = displayProps.graphics.style[key];
        }
      }
    }

    console.log(this.width,this.height,this.topleft,CRAZYBIOGAME.width,CRAZYBIOGAME.height);
    
    this.element.style.left = `${this.topleft[0] / CRAZYBIOGAME.width * 100}%`;
    this.element.style.top = `${this.topleft[1] / CRAZYBIOGAME.height * 100}%`;
    this.element.style.width = `${this.width / CRAZYBIOGAME.width * 100}%`;
    this.element.style.height = 'auto';

    return this;

  }
  
}

const createItem = (props) => {
  let item = Item.create(props);
  
  return item;
};
