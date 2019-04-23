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
 * Ancestor of all the other classes
 * @class Node
 *
 * @author Jean-Christophe Taveau
 */
class Node {
  /**
   * @constructor
   * @param {number} id - Node ID
   * @param {string} className - Object type
   * @param {string} description - Description
   */
  constructor(id,className,description) {
    this.id = id;
    this.className = className;
    this.description = description;
    this.element; // HTML5
    this.displayType = Node.NONE;
  }

  static get NONE() {
    return 0;
  }

  static get GRAPHICS() {
    return 1;
  }

  static get MEDIA() {
    return 1;
  }

  static get TEXT() {
    return 2;
  }

  static get TARGET()  {
    return 3;
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
   * @returns {object} HTML Element
   * @author Jean-Christophe Taveau
   */
  getHTML(){
    return this.element;

  }


  /**
   * Create display features
   */
  display(displayProps) {

    // M A I N
    if (displayProps === undefined) {
      alert(`The object #${this.id} must have a 'display' property`);
      return this;
    }
    this.width = displayProps.width || 0;
    this.height = displayProps.height || 0;
    this.topleft = displayProps.position || [0,0];

    this.element.style.left = `${this.topleft[0] / CRAZYBIOGAME.width * 100}%`;
    this.element.style.top = `${this.topleft[1] / CRAZYBIOGAME.height * 100}%`;
    this.element.style.width = `${this.width / CRAZYBIOGAME.width * 100}%`;
    this.element.style.height = (displayProps.target === undefined) ? 'auto' : `${this.height / CRAZYBIOGAME.height * 100}%`;

    // Media: Image, video, audio?, etc.
    let dprops = displayProps.graphics || displayProps.media;
    if (dprops !== undefined ) {
      console.log(this.id);
      //Where the image must be searched and append
      let the_media = document.getElementById(this.id);
      console.log(the_media);
      console.log(this.height);
      this.element.appendChild(the_media);
      console.log(this.element.children[0].style);
      if (displayProps.media.style !== undefined){
        this.element.style.display = "none";
      }
    }


    // Text
    else if (displayProps.text !== undefined) {
      this.displayText(displayProps.text);
    }
    // Shape - Target to event(s)
    else if (displayProps.target !== undefined) {
      this.displayType = Node.TARGET;
      this.target = (displayProps.target.data === undefined) ? ["R",0,0,this.width,this.height] : displayProps.target.data;
      this.displayStyle(this.element,displayProps.target.style);
    }
    console.log(this.width,this.height,this.element.style.width,this.element.style.height,this.topleft,CRAZYBIOGAME.width,CRAZYBIOGAME.height);

    return this;
  }

  // displayMedia(propsGraphics) {
  //   this.displayType = Node.MEDIA;
  //
  //   // Append the media
  //   if (propsGraphics.element !== undefined) {
  //     // WARNING - DOES NOT WORK WITH JSON STORYBOARD!!!
  //     this.element.appendChild(propsGraphics.element);
  //   }
  //   else {
  //     // Check the media type and create the appropriate HTML5 element
  //     let src = propsGraphics.path || propsGraphics.image;
  //     let media;
  //     if ( src !== undefined) {
  //       media = document.createElement('img');
  //       media.src = src;
  //     }
  //     else if (propsGraphics.video !== undefined) {
  //       let media = document.createElement('video');
  //       media.src = propsGraphics.video;
  //     }
  //     else if (propsGraphics.audio !== undefined) {
  //       let media = document.createElement('audio');
  //       media.src = propsGraphics.audio;
  //     }
  //     else {
  //       alert("Could not find the media source: image, video or audio");
  //     }
  //
  //     media.addEventListener('dragstart', () => false,false);
  //     this.element.appendChild(media);
  //   }
  //
  //
  //   // Add focus if any
  //   this.focus = (propsGraphics.focus !== undefined) ? propsGraphics.focus : ["R",0,0,this.width,this.height];
  //   // Add style if any
  //   return this.displayStyle(this.element,propsGraphics.style);
  // }

  static getTargetElement(parent) {
    let found;
    if (parent.classList.contains('target')) {
      return parent;
    }
    for (let child of parent.children) {
      found = Node.getTargetElement(child);
    }
    return found;
  }

  displayText(propsText) {
    this.displayType = Node.TEXT;
    this.element.style.width = 'auto';
    this.element.style.height = 'auto';
    this.element.innerHTML = propsText.content.join('');
    // TODO Must be improved
    let foundTarget = Node.getTargetElement(this.element);
    if (foundTarget !== undefined) {
      foundTarget.dataset.objectid = this.id;
    }
    return this.displayStyle(this.element,propsText.style);
  };

  displayStyle(element,props = {}) {
    let reserved = ['a', 'span'];
    let reservedCrazy = ['form','header','body','footer'];
    for (let key in props) {
      if (reserved.includes(key)) {
        Array.from(this.element.children)
          .filter( el => el.tagName === key.toUpperCase() )
          .forEach( child => this.displayStyle(child,props[key]) );
      }
      else if (reservedCrazy.includes(key)) {
        // let child = document.querySelector(`${} ${key}`);
        this.displayStyle(child,props[key]);
      }
      else {
        element.style[key] = props[key];
      }

    }
    return this;
  }


  /**
   * Create event features
   *
   * @author Jean-Christophe Taveau
   */
  actionable(actionProps, func) {

    const doIt = (ev) => {
      console.log(`Click with ${ev.button} on object ${ev.target.dataset.objectid} and update display of ???`);
      let node = CRAZYBIOGAME.graph.nodeList.filter ( node => node.id === parseInt(ev.target.dataset.objectid) )[0];
      // Trigger Action depending of Event in common.js
      if (node===undefined){ // In the case of a video to catch the end of it
        let node_id=this.id;
        node = CRAZYBIOGAME.graph.nodeList.filter(node => node.id===node_id)[0];
        console.log(node);
      }
      triggerAction(ev,node);
    }

    let indexSVG = this.element.children.length;

    if (actionProps === undefined) {
      return this;
    }

    // Add the event to the parent scene
    // TODO
    this.actions = actionProps;
    this.geometry = {type: 'R', data: []};
    this.geometry = (this.displayType === Node.GRAPHICS) ? {type: this.focus[0], data: this.focus.slice(1)} : this.geometry;
    this.geometry = (this.displayType === Node.TARGET) ? {type: this.target[0], data: this.target.slice(1)}: this.geometry;
    if (this.geometry.data.length === 0) {
      switch (this.geometry.type) {
      case 'R' :
        this.geometry.data[0] = this.topleft[0];
        this.geometry.data[1] = this.topleft[1];
        this.geometry.data[2] = this.width;
        this.geometry.data[3] = this.height;
      }
    }
    // Update height
    this.element.style.height = `${this.height / CRAZYBIOGAME.height * 100}%`;

    // Add event
    Object.keys(actionProps).forEach( (event) => {
      if (actionProps[event].new_nodes !== undefined) {
        this.childNodes = [];
      }
      if (event === 'onclick') {
        if (this.displayType !== Node.TEXT) {
          this.element.appendChild(createSensitiveLayer(this.id, this.width, this.height, this.geometry));
        }
        // TODO Tricky <svg> => <g> => <a>
        let action = func || doIt;
        Node.getTargetElement(this.element).addEventListener('click', doIt,false);
      }
      else if (event === "onended"){
        this.element.children[0].addEventListener('ended',doIt,false);
      }
      else if (event === 'onchange') {
        this.element.addEventListener('change', doIt,false);
      }
    }
  );

    return this;
  }

  /*
   * Create specific features
   *
   * @author Jean-Christophe Taveau

  features(featuresProps) {
    // TODO
    this.features = featuresProps;
    return this;
  }
   */


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
   * @returns {boolean} true or false
   *
   * @author Jean-Christophe Taveau
   */
  hasChildren() {
    let flag = false;
    flag = (this.childrenID === undefined) ? flag : true;
    if (this.actions !== undefined) {
      // TODO Object.keys(this.actions).some( (event) => this.actions[event].new_nodes !== undefined );
      flag = Object.keys(this.actions).reduce( (flag,event) => (this.actions[event].new_nodes !== undefined) ? true : flag,false);
    }
    return flag;
  }

  /**
   * Check if this object has children Nodes
   *
   * @returns {boolean} true or false
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
