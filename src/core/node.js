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
 * Class Node - Ancestor of all the other classes
 *
 * @author Jean-Christophe Taveau
 */
class Node {
  /**
   * @constructor
   */
  constructor(id,className,description) {
    this.id = id;
    this.className = className;
    this.description = description;
    this.element; // HTML5
  }
  
  /**
   * Create a new node
   */
  static create(id,className,description) {
    return new Node(id,className,description);
  }

  /**
   * Set parent node
   *
   * @param {number} parent - Parent Node ID
   *
   * @author Jean-Christophe Taveau
   */
  setParent(parent) {
    this.parent = parent;
  }
  
  /**
   * Create HTML5 element
   */
  append(htmlTag) {
    // Append the media
    this.element = document.createElement(htmlTag);
    this.element.id = this.id;
    this.element.className = this.className;
    
    return this;
  }
  
  /**
   * Get HTML Element
   * 
   * @return {object} HTML Element
   * @author Jean-Christophe Taveau
   */
  getHTML() {
    return this.element;
  }
  /**
   * Create display features
   */
  display(displayProps) {
    if (displayProps === undefined) {
      return this;
    }
    
    this.width = displayProps.width || 0;
    this.height = displayProps.height || 0;
    
    if (displayProps.graphics !== undefined) {
      this.width = displayProps.graphics.width || this.width;
      this.height = displayProps.graphics.height || this.height;
      this.topleft = displayProps.graphics.position || [0,0];
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
    
    // TODO HACK
    if (displayProps.shape !== undefined) {
      this.width = displayProps.shape.width || this.width;
      this.height = displayProps.shape.height || this.height;
      this.topleft = displayProps.shape.position || this.topleft;
    }
    
    // this.topleft = displayProps.graphics.position || displayProps.shape.position || [0,0];
    this.element.style.left = `${this.topleft[0] / CRAZYBIOGAME.width * 100}%`;
    this.element.style.top = `${this.topleft[1] / CRAZYBIOGAME.height * 100}%`;
    this.element.style.width = `${this.width / CRAZYBIOGAME.width * 100}%`;
    this.element.style.height = (displayProps.shape === undefined) ? 'auto' : `${this.height / CRAZYBIOGAME.height * 100}%`;
    // this.element.style.height = `100%`;


    if (displayProps.shape !== undefined) {
      this.shape = displayProps.shape.data;
    }

    return this;
  }

  /**
   * Create event/target features
   * 
   * @author Jean-Christophe Taveau
   */
  target(targetProps, func) {
  
    const doIt = (ev) => {
      console.log(`Click with ${ev.button} on object ${ev.target.dataset.objectid} and update display of ???`);
      let node = CRAZYBIOGAME.graph.nodeList.filter ( node => node.id === parseInt(ev.target.dataset.objectid) )[0];
      // Trigger Action depending of Event in common.js
      triggerAction(ev,node);
    }
    
    let indexSVG = this.element.children.length;
    
    if (targetProps === undefined) {
      return this;
    }
    
    // Add the event to the parent scene  
    // TODO
    this.target = targetProps;
    if (targetProps.if !== undefined) {
      this.geometry = (this.shape === undefined ) ? {type: 'R', data: []} : {type: this.shape[0], data: this.shape.slice(1)};
      if (this.geometry.data.length === 0) {
        switch (this.geometry.type) {
        case 'R' : 
          this.geometry.data[0] = this.topleft[0];
          this.geometry.data[1] = this.topleft[1];
          this.geometry.data[2] = this.width;
          this.geometry.data[3] = this.height;
        }
      }
    }
    this.element.appendChild(createSensitiveLayer(this.id, this.width, this.height, this.geometry));
    if (targetProps.then.new_nodes !== undefined) {
      this.childNodes = [];
    }
    
    // Add event
    if (targetProps.if === 'click') {
      console.log(this.element);
      // TODO Tricky <svg> => <g> => <a>
      let action = func || doIt;
      this.element.children[indexSVG].children[0].children[0].addEventListener('click', doIt,false);
    }
    return this;
  }

  /**
   * Create specific features
   * 
   * @author Jean-Christophe Taveau
   */
  features(featuresProps) {
    // TODO
    this.features = featuresProps;
    return this;
  }

  /**
   * Add children to composite/scene object
   *
   * @param {array} childrenProps - Array of object(s)
   * 
   * @author Jean-Christophe Taveau
   */
  children(childrenProps) {
    this.childrenID = childrenProps;
    // TODO
    return this;
  }

  /**
   * Check if this object has children IDs
   *
   * @return {boolean} true or false
   * 
   * @author Jean-Christophe Taveau
   */
  hasChildren() {
     
    return (this.childrenID === undefined && 
      (this.target === undefined || this.target.then === undefined || this.target.then.new_nodes === undefined)) ? false : true;
  }

  /**
   * Check if this object has children Nodes
   *
   * @return {boolean} true or false
   * 
   * @author Jean-Christophe Taveau
   */
  hasChildNodes() {
    return (this.childNodes !== undefined);
  }
  /**
   * Create composite features
   * @obsolete
   *
   * @author Jean-Christophe Taveau
   */
  forEachChild(func) {
    this.childNodes.forEach( (child) => func(child));
    // TODO
    return this;
  }

}
