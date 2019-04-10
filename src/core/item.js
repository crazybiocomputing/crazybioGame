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
 * @extends Composite
 *
 */
class Item extends Composite {
  /**
   * @constructor
   */
  constructor (id,className,description) {
    super(id,className,description);
  }

  static create(props) {
    props.features.id = props.id;
    props.features.title = props.description;

    let item = new Item(props.id,props.class,props.description)
      .append('div')
      .children([1000 + props.id])
      .inventoriable(props.features);

    item.childNodes = [];
    console.log('SPRITE ',document.getElementById('node_1011'));
    return item;
  }

  
  /**
   * Manage thumbnail and events for item
   * @author Jean-Christophe Taveau
   */
  inventoriable(featuresProps) {
    // Add image in `inventory`
    this.elementItem = document.createElement('li');
    this.elementItem.id = `item_${featuresProps.id}`;
    this.elementItem.style.display = 'none';
    this.elementItem.className = 'item';
    let link = document.createElement('a');
    link.href = 'javascript:void(0)';
    link.title = featuresProps.title;
    let media = document.createElement('img');
    media.src = featuresProps.image;
    link.appendChild(media);
    this.elementItem.appendChild(link);
    document.querySelector('aside ul').appendChild(this.elementItem);

    // Add event
    // link = this.element.children[0];
    link.addEventListener('click', (ev) => {
      if (link.className.includes('checked')) {
        link.className = 'item';
        document.querySelectorAll('section').forEach( el => el.style.cursor = 'auto');
        document.querySelectorAll('.sprite a').forEach( el => el.style.cursor = `pointer`);
        CRAZYBIOGAME.useItem = false;
      }
      else {
        link.className = ' item checked';
        document.querySelectorAll('section').forEach( el => el.style.cursor = `url(${featuresProps.thumbnail}),grab`);
        document.querySelectorAll('.sprite a').forEach( el => el.style.cursor = `url(${featuresProps.thumbnail}),pointer`);
        CRAZYBIOGAME.useItem = true;
      }
    });
    return this;
    
  }
  
} // End of class Item



class ItemCombo extends Composite {

  /**
   * @constructor
   */
  constructor (id,className,description) {
    super(id,className,description);
  }

  static create(props) {

    props.class = 'item';
    let _item = Item.create(props);

    props.class = 'sprite';
    props.id +=1000;
    let _sprite = Sprite.create(props);


    let itemCombo = new ItemCombo(_item.id,'itemcombo',props.description);
    itemCombo.children = [_item.id,_sprite.id];
    _item.setParent(itemCombo);
    _sprite.setParent(itemCombo);
    itemCombo.childNodes = [_sprite,_item];
    itemCombo.element = _sprite.element;

    return itemCombo;
  }

} // End of class ItemCombo



const createItem = (props) => {
  return Item.create(props);

};
