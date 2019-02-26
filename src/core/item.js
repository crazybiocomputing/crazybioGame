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
 * @class Item
 * @extends Machine
 *
 */
class Item extends Machine {
  /**
   * @constructor
   */
  constructor (id,className,description) {
    super(id,className,description);
  }

  static create(props) {
    props.display.id = props.id;
    props.display.title = props.description;
    
    let item = new Item(props.id,props.class,props.description,props.parent)
      .display(props.display)
      .inventoriable(props.features);

    return item;
  }

  /**
   * Create HTML code for display
   *
   */
  display(displayProps) {
    if (displayProps === undefined) {
      return this;
    }
    // Add image in `inventory`
    this.element = document.createElement('li');
    this.element.id = `item_${displayProps.id}`;
    this.element.style.display = 'none';
    this.element.className = 'item';
    let link = document.createElement('a');
    link.href = 'javascript:void(0)';
    link.title = displayProps.title;
    let media = document.createElement('img');
    media.src = displayProps.graphics.path;
    link.appendChild(media);
    this.element.appendChild(link);
    document.querySelector('aside ul').appendChild(this.element);
    return this;
    
  }
  
  /**
   * Manage thumbnail and events for item
   * @author Jean-Christophe Taveau
   */
  inventoriable(featuresProps) {
    // Add event
    let link = this.element.children[0];
    link.addEventListener('click', (ev) => {
      if (link.className.includes('checked')) {
        link.className = 'item';
        document.querySelector('section').style.cursor = 'auto';
        document.querySelectorAll('.sprite a').forEach( el => el.style.cursor = `pointer`);
        CRAZYBIOGAME.useItem = false;
      }
      else {
        link.className = ' item checked';
        document.querySelector('section').style.cursor = `url(${featuresProps.thumbnail}),grab`;
        document.querySelectorAll('.sprite a').forEach( el => el.style.cursor = `url(${featuresProps.thumbnail}),pointer`);
        CRAZYBIOGAME.useItem = true;
      }
    });
    return this;
    
  }
  
}

const createItem = (props) => {
  let item = Item.create(props);
  
  return item;
};
