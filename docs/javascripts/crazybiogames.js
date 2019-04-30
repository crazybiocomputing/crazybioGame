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
  getHTML() {
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

      //Where the image must be searched and append: NOT WORKING RIGHT NOW
        document.onload = function(){
        let test = document.getElementById(`node_${this.id}`);
        console.log(test);
      };
      
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

  displayMedia(propsGraphics) {
    this.displayType = Node.MEDIA;
    
    // Append the media
    if (propsGraphics.element !== undefined) {
      // WARNING - DOES NOT WORK WITH JSON STORYBOARD!!!
      this.element.appendChild(propsGraphics.element);
    }
    else {
      // Check the media type and create the appropriate HTML5 element
      let src = propsGraphics.path || propsGraphics.image;
      let media;
      if ( src !== undefined) {
        media = document.createElement('img');
        media.src = src;
      }
      else if (propsGraphics.video !== undefined) {
        let media = document.createElement('video');
        media.src = propsGraphics.video;
      }
      else if (propsGraphics.audio !== undefined) {
        let media = document.createElement('audio');
        media.src = propsGraphics.audio;
      }
      else {
        alert("Could not find the media source: image, video or audio");
      }
      
      media.addEventListener('dragstart', () => false,false); 
      this.element.appendChild(media); 
    }

    
    // Add focus if any
    this.focus = (propsGraphics.focus !== undefined) ? propsGraphics.focus : ["R",0,0,this.width,this.height];
    // Add style if any
    return this.displayStyle(this.element,propsGraphics.style);
  }

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
    // this.element.style.height = `${this.height / CRAZYBIOGAME.height * 100}%`;

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
      else if (event === 'onchange') {
        this.element.addEventListener('change', doIt,false);
      }
    });

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
      .actionable(props.action);
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


class Machine extends Node {

  constructor (id,className,description) {
    super(id,className,description);
    // Specific of `machine`
    this.features = {};
  }
  
  /**
   * Static Constructor
   *
   */
  static create(props) {
    return new Machine(props.id,props.class,props.description,props.parent)
      .append('article')
      .display(props.display)
      .draggable(props.features.draggable)
      .actionable(props.action)
      .exit(props.features.exit);
  }

  /*
   * Features - Properties specific of the `machine`
   *
   * @author Jean-Christophe Taveau

  features(featuresProps) {
    // Various methods of machines
    let f = {exit: this.exit};
    Object.keys(featuresProps).forEach( (feat) => {
      f[feat].call(this,featuresProps[feat]);
    });
    return this;
  }
*/

  /**
   * exit - Properties specific of the `machine`
   *
   * @author Jean-Christophe Taveau
   */
  exit(value) {
    if (value === undefined) {
      return this;
    }
    console.log('exit code ' + value + ' ' );
    this.exitCode = (value.toString().includes('deferred')) ? CRAZYBIOGAME.deferred[value.slice(9)] : value;

    return this;
  }
  
  /**
   * Click and Drag Feature 
   *
   * @author Jean-Christophe Taveau
   */
  draggable(flag = false) {
    
    const dragstart = (event) => {
      // centers the tile at (pageX, pageY) coordinates
      const moveAt = (pageX, pageY) => {
        // console.log(orgX,orgY,pageX,pageY,dx,dy,' = ',pageX - orgX + dx,pageY - orgY + dy);
        dragged.style.left = pageX - orgX  + dx + 'px';
        dragged.style.top = pageY - orgY + dy + 'px';
      }

      const drag_over = (event) => {
        moveAt(event.pageX, event.pageY);
        event.preventDefault();
        return false;
      }
      
      const drag_end = (event) => {
        event.target.parentNode.style.zIndex = 1;
        document.querySelector('main').removeEventListener('mousemove', drag_over,false);
        dragged.removeEventListener('mouseup', drag_end,false);
      }
      
      // Main of `dragstart`
      let dragged = event.target.parentNode;
      
      let orgX = event.pageX;
      let orgY = event.pageY;
      // TODO Must be improved - All the parents up to `game`
      let dx = dragged.getBoundingClientRect().left - document.getElementById('node_0').getBoundingClientRect().left;
      let dy = dragged.getBoundingClientRect().top - document.getElementById('node_0').getBoundingClientRect().top;
      dragged.style.zIndex = 1000;

      moveAt(event.pageX, event.pageY);

      // Move the tile on mousemove
      document.querySelector('main').addEventListener('mousemove', drag_over);

      // Drop the tile, remove unneeded handlers
      document.querySelector('main').addEventListener('mouseup', drag_end);
    };

    // M A I N
    if (!flag) {
      return this;
    }
    
    this.element.draggable = false;
    this.element.className += ' movable';
    this.element.addEventListener('mousedown', dragstart,false); 
    this.element.addEventListener('dragstart', (e) => {e.preventDefault();return false},false); 
    this.element.addEventListener('dragover', (e) => {return false},false); 
    this.element.addEventListener('drop', (e) => false,false); 

    return this;
  }
} // End of class Machine


/**
 * Create a new generic machine
 * @author Hans SCHRIEKE
 *
 */
const createMachine = (props) => {
  let machine = Machine.create(props);
    
  return machine;
};


const svg2img = (svgString,format,width,height,container) => {

  console.log(svgString);
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  let DOMURL = window.URL || window.webkitURL;
  let img = new Image();
  let blob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
  let url = DOMURL.createObjectURL(blob);
  img.onload = function() {
      ctx.drawImage(img, 0, 0);
      var png = canvas.toDataURL(`image/${format}`);
      container.innerHTML = `
        <p>
          Click on the icon below to download the file and process 
          it with your favorite scientific software...<br>
          <center> 
            <a class="button" href="${png}" download="${CRAZYBIOGAME.gamepath}_image.${format}")/>
              <i class="fas fa-download fa-3x"></i>
            </a>
          </center>
        </p>`;
      DOMURL.revokeObjectURL(png);
  };
  img.src = url;
}


/**
 * Create a new `download` machine
 *
 * @author Hans SCHRIEKE 
 * @author Charlotte GONCALVES FRASCO
 *
 */
const createMachineDownload = (props) => {

  let machine = Machine.create(props);
  
  let element = machine.element;
  element.className = "machine download";
  
  let actionProps = {}
  actionProps.onclick = {};
  actionProps.onclick['popup'] = {
    header: 'Download...',
    body: [''],
    footer: 'Download '
  };
  
  // create the 'form'
  let container = document.createElement('div');
  container.id = 'lock-container';

  
  if (props.features.download.includes('deferred')) {
    let [result,format] = /:svg2(\w+):/.exec(props.features.download);
    console.log(result,result.index,result.length,format);
    let index = props.features.download.indexOf(result) + result.length;
    let svg = props.features.download.slice(index);
    let w = parseInt(/width=\s*\s*\"(\d+)/g.exec(svg)[1]);
    let h = parseInt(/height\s*=\s*\"(\d+)/.exec(svg)[1]);
    svg2img(svg,format,w,h,container);
  }
  else {
    let paragraph = document.createElement('p');
    paragraph.innerHTML = 
      `Click on the icon below to download the file and process 
      it with your favorite scientific software...<br>
      <center> <a class="button" href="${props.features.download}" download="${props.features.download}">
      <i class="fas fa-download fa-3x"></i></a></center>`;
    // Add all the elements
    container.appendChild(paragraph);
  }

  actionProps.onclick.popup.contentDOM = container;
  machine.actionable(actionProps);

  return machine;
};


/**
 * Create a Tile machine
 *
 * @author Jean-Christophe Taveau
 *
 */
const createMachineTile = (props) => {
  if (props.features === undefined) {
    props.features = {draggable: true};
  }
  let machine = Machine.create(props);
  machine.element.className = "machine tile";
  return machine;
};


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

class Form extends Machine {
  constructor (id,className,description) {
    super(id,className,description);
  }
  
  static create(props) {
    let form =  new Form(props.id,props.class,props.description,props.parent)
    form.append('article')
      .display(props.display)
      .form(props.features)
      .action(props.action)
      .draggable(props.features.draggable)
      .exit(props.features.exit);

    return form;
  }
  
  /**
   * Create the 'form' of this machine.
   *
   * @author Jean-Christophe Taveau
   **/
  form(featuresProps) {
    // Set CSS style
    const setStyle = (element,props = {}) => {
      for (let key in props) {
        element.style[key] = props[key];
      }
    }
    
    // Get fields answers
    const getAnswers = (text) => {
      // #1: Extract the values between delimiters '@...@'
      let matches = text.match(/@(.+?)@/g);
      // #2: Store the answer(s)
      return matches.map( a_match => {
        let v = a_match.slice(1,-1).split(/[=:]/);
        console.log(v);
        // v[0] num(erical) or txt
        // v[1] value or deferred
        return (v[1] === 'deferred') ? CRAZYBIOGAME.deferred[v[2]] : v[1];
      });
      
    }
    
    // Step #0: Store some properties
    this.features.exit = featuresProps.exit || '';
    
    // Step #1: Create the HTML5 element(s) from features.form
    let sections = ['header','body','footer'];
    
    let form = this.element;
    form.className += ' form';
    setStyle(form,featuresProps.style.form);
    
    sections.forEach( (s) => {
      if (featuresProps.form[s] !== undefined) {
        let child = document.createElement(s);
        setStyle(child,featuresProps.style[s]);
        child.innerHTML = featuresProps.form[s].join('');
        // TODO Must be improved...
        if (s === 'body') {
          this.answers = getAnswers(child.innerHTML);
          child.innerHTML = child.innerHTML.replace(/@(.+?)@/g,'<input type="text" placeholder="0" size="4"></input>');
          console.log('regexp');
          let regex = /(\[\[(__(.+?)__)\]\])/g;
          let result = child.innerHTML;
          while ( (result = regex.exec(result)) ) {
              console.log(result);
              console.log(result.index);
          }
          regex = /\[\[(__(.+?)__)\]\]/g;

          // The same for buttons
          // TODO
          // <div class="buttongroup" style="float:right">
          // <button type="submit">OK</button>
          // <button type=\"reset\">Reset</button>
          // </div>
        }
        form.appendChild(child);
      }
    });

    // Step #2: Extract the buttons from the form
    // TODO
    const findDeep = (el,name) => {
      console.log(el);
      let found;
      if (el.className === name) {
        found = el;
      }
      else if (el.children !== undefined) {
        for (let child of Array.from(el.children)) {
          found = findDeep(child,name);
        }
      }
      return found;
    }
    
    let buttons = findDeep(this.element,'buttongroup');

    // Step #3: Add the actions 
    console.log(buttons);
    Array.from(buttons.children).forEach( button => {
      // Block draggable if any
      button.addEventListener('mousedown', ev => ev.stopPropagation(),false );
      button.dataset.parent = `node_${this.id}`;
      // Add event when click button(s)
      if (button.type === 'submit') {
        button.addEventListener('click', ev => {
          ev.stopPropagation();
          let values = Array.from(document.querySelectorAll(`#${ev.target.dataset.parent} input`)).map( (input) => input.value);
          console.log(values);
          console.log(this.answers);
          if (this.answers.every ( (answer,i) => answer === parseFloat(values[i]) ) === true) {
            triggerAction('onsuccess',this);
          }
        },true);
      }
    });
    console.log(buttons);
        
    return this;
  }
}

/**
 * Create a new `form` machine using a `GapFill` mode
 *
 * @author P. Wintringer
 * @author Jean-Christophe Taveau
 **/
const createForm = (props) => {
  let form = Form.create(props);
  return form;
  
  /*
    let element = document.createElement('div');
  element.id = props.id;
  element.className = "formgapfill";
  
  createPopUp(props,"gapfill");
  let modal = document.getElementById("gapfill");
  let closeB = document.getElementsByClassName('close'+"gapfill")[0];
  button.onclick = function() {
    modal.style.display = "block";
  }
  closeB.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
  let myForm = document.createElement('form');
  myForm.method = "post";
  myForm.onsubmit = return validateForm();
  let field = document.createElement('input');
  field.setAttribute('type',"text");
  let buttonS = document.createElement('input');
  buttonS.setAttribute('type',"submit");
  
function validateForm() {
    let var x = document.forms["myForm"].value;
    if (x == "") {
        alert("All fields must be input.");
        return false;
    }
 }*/

  //function download(url){
  //  window.location.href = url;
  //}
  //document.getElementById("machine").addEventListener("click",download(img.src));

};


/**
 * Create a new `form` machine using a `Drag and Drop` mode
 *
 * @author P.Wintringer
 */
const createFormDragDrop = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "formDnd";
  
  createPopUp(props,"fdnd");
  let modal = document.getElementById("fdnd");
  let closeB = document.getElementsByClassName('close'+"fdnd")[0];
  button.onclick = function() {
    modal.style.display = "block";
  }
  closeB.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
  
  /*let tile = document.getElementByClassName('sprite'); // sprite as tiles
  let dropfield = document.createElement('div'); // tiles can only be dropped in fields
  dropfield.setAttribute('class','field');
  tile.setAttribute('draggable', true);
  tile.addEventListener('dragstart',drag_start);
  tile.addEventListener('dragend',drag_end);
  let const fields = document.getElementByClassName('field');
  for (let const fieldelem of fields){
    field.addEventListener('dragover',drag_over);
    field.addEventListener('drop',drop);
  }
  
  function drag_start(){
    this.className += " held";
    setTimeout(()=>this.className="invisible", 0);
  }
  
  function drag_end() {
    this.className -= " held";
    //this.className = 'sprite'; //if line above doesn't work
  }
  
  function drop(){
    this.className = "field"
    this.append(tile);
  }
  
  function drag_over(event) {
    event.preventDefault();
    return false;
  } */
  
  return element;
};


/**
 * Create a new `form` machine using a `Drop-down` mode
 *
 * @author P. Wintringer
 */
const createFormDropDown = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "formDropdown";
  
  createPopUp(props,"dropdown");
  let modal = document.getElementById("dropdown");
  let closeB = document.getElementsByClassName('close'+"dropdown")[0];
  button.onclick = function() {
    modal.style.display = "block";
  }
  closeB.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
  
  /*let dropdown = element.createElement('button'); //creation of the drop down menu
  dropdown.id = ddm;
  dropdown.className = dropbtn;
  dropdown.onClick = unroll();
  
  let content = element.createElement('div');
  content.className = ddmcontent;
  //add line to fetch content of ddm
  content.display = block; //hidden unless clicked
  
  function unroll(){
    document.getElementById("ddm").classList.toggle("show");
  }
  
  window.onclick = function(event) { //
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("ddmcontent");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/

  return element;
};


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

class Lock extends Machine {

  constructor (id,className,description) {
    super(id,className,description);
  }
  
  static create(props) {
    return new Lock(props.id,props.class,props.description,props.parent)
      .append('article')
      .display(props.display)
      .draggable(props.features.draggable)
      .exit(props.features.exit);
  }
}


/**
 * Lock displayed as a Text Field
 *
 * @author Charlotte GONCALVES FRASCO
 * @author Hans SCHRIEKE
 * @author Jean-Christophe Taveau
 */
const createLockText = (props) => {

  let lock = Lock.create(props);
  lock.element.className = "machine locktext";

  // TODO - New syntax of form
  let actionProps = {}
  actionProps.onclick = {};
  actionProps.onclick['popup'] = {
    header: 'Unlock the game...',
    body: [`Type the code... to unlock the game<br>@${this.exitCode}@__ok__ <br>` ],
    footer: 'Lock&nbsp;'
  };
  
  // create the popup content + events
  let container = document.createElement('div');
  container.id = 'lock-container';
  let paragraph = document.createElement('p'); paragraph.appendChild(document.createTextNode('Type the code... to unlock the game'));
  let input = document.createElement('input');
  input.id = 'lock-input';
  input.type = 'text';
  input.placeholder = 'Type the code';

  let submitbutton = document.createElement('button');
  submitbutton.id = 'button';
  submitbutton.textContent = "OK";
  submitbutton.type = "submit";

  submitbutton.onclick = () => {
    let val = document.getElementById('lock-input').value;
    console.log(val,lock.exitCode);
    nextGame(val,lock);
  }
  
  // Add all the elements
  container.appendChild(paragraph);
  container.appendChild(input);
  container.appendChild(submitbutton);
  actionProps.onclick.popup.contentDOM = container;
  lock.actionable(actionProps);
  
  return lock;
};

/**
 * Lock displayed as a Numerical Field
 * @author 
 */
const createLockNumerical = (props) => {
// TODO Add numerical checking onchange event
  return createLockText(props);
};


/**
 * Lock displayed as a n-Digit Lock
 */
const createLockDigit = (nDigits) => (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockDigit";

  // TODO

  return element;
};

/**
 * Lock displayed as a keypad
 */
const createLockKeypad = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockKeypad";

  // TODO

  return element;
};

/**
 * Lock displayed as a numpad
 * @author P. Wintringer
 *
const createLockNumpad = (props) => {
  let form = document.createElement('form');
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockNumpad";
  //let evt = document.createEvent("MouseEvents");
  //evt.initMouseEvent("click");
  let text = document.getElementById("textfield");
  let table = document.createElement('table');
  let button1 = document.createElement('input')
  button1.setAttribute('type','button');
  button1.setAttribute('value',1);
  button1.onClick = AddValueToTextField(value);
  table.appendChild(button1);
  let button2 = document.createElement('input');
  button2.setAttribute('type','button');
  button2.setAttribute('value',2);
  button2.onClick = AddValueToTextField(value);
  table.appendChild(button2);
  let button3 = document.createElement('input');
  button3.setAttribute('type','button');
  button3.setAttribute('value',3);
  button3.onClick = AddValueToTextField(value);
  table.appendChild(button3);
  let button4 = document.createElement('input');
  button4.setAttribute('type','button');
  button4.setAttribute('value',4);
  button4.onClick = AddValueToTextField(value);
  table.appendChild(button4);
  let button5 = document.createElement('input');
  button5.setAttribute('type','button');
  button5.setAttribute('value',5);
  button5.onClick = AddValueToTextField(value);
  table.appendChild(button5);
  let button6 = document.createElement('input');
  button6.setAttribute('type','button');
  button6.setAttribute('value',6);
  button6.onClick = AddValueToTextField(value);
  table.appendChild(button6);
  let button7 = document.createElement('input');
  button7.setAttribute('type','button');
  button7.setAttribute('value',7);
  button7.onClick = AddValueToTextField(value);
  table.appendChild(button7);
  let button8 = document.createElement('input');
  button8.setAttribute('type','button');
  button8.setAttribute('value',8);
  button8.onClick = AddValueToTextField(value);
  table.appendChild(button8);
  let button9 = document.createElement('input');
  button9.setAttribute('type','button');
  button9.setAttribute('value',9);
  button9.onClick = AddValueToTextField(value);
  table.appendChild(button9);
  let buttonC = document.createElement('input');
  buttonC.setAttribute('type','button');
  buttonC.setAttribute('value','C');
  buttonC.onClick = SupprValueInTextField();
  table.appendChild(buttonC);
  let button0 = document.createElement('input');
  button0.setAttribute('type','button');
  button0.setAttribute('value', 0);
  button0.onClick = AddValueToTextField(value);
  table.appendChild(button0);
  let buttonV = document.createElement('input');
  buttonV.setAttribute('value','V');
  buttonV.type = "submit";
  table.appendChild(buttonV);

  function AddValueToTextField(val)
    {document.getElementByID(text).value += val;}

  function SupprValueInTextField()
    {document.getElementByID(text).value -= 1;}

  return element;
};
*/
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


const createDeferred = (props) => {
  let obj = CRAZYBIOGAME.deferred[props.id];
  console.log(CRAZYBIOGAME.deferred);
  console.log(obj);
  // Update properties...
  obj.element.style.left = `${obj.topleft[0] / CRAZYBIOGAME.width * 100}%`;
  obj.element.style.top = `${obj.topleft[1] / CRAZYBIOGAME.height * 100}%`;
  obj.element.style.width = `${obj.width / CRAZYBIOGAME.width * 100}%`;
  obj.element.style.height = (obj.target === undefined) ? 'auto' : `${obj.height / CRAZYBIOGAME.height * 100}%`;

  return obj;
}
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
class Scene extends Composite {
  
  constructor(id,className,description) {
    super(id,className,description);
  };
  
  static create(props) {
    return new Scene(props.id,props.class,props.description)
      .append('section')
      .appendClose()
      .display(props.display)
      .children(props.children); // Pre-calculated in `preprocess` of game.js
      // .forEachChild(this.appendChild);
  }
  
  appendClose() {
    if (this.className === 'scene') {
      return this;
    }
    
    // Only for scene.closeup
    let self = this;
    
    let closeButton = document.createElement('a')
    closeButton.href="#close";
    closeButton.title="Back";
    closeButton.className ="close";
    closeButton.textContent='↶';
    closeButton.addEventListener('click', (e) => {
      self.element.style.display = 'none';
      e.stopPropagation();
    }, false);
    this.element.appendChild(closeButton);
    return this;
  }
  /**
   * ???
   * @obsolete
   *
   */
  appendChild(node) {
    console.log(node);
    let func = creators[child.class];
    if (func !== undefined) {
      this.element.appendChild(func(node));
    }
  }
  
  /**
   * Create a SVG Layer for grabbing the event(s)
   * @obsolete
   * @author Charlotte GONCALVES FRASCO
   */
  addSensitiveLayer() {
  
    const createCircle = (cx,cy,radius) => {
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
      shape.setAttributeNS(null,'width',w);
      shape.setAttributeNS(null,'height',h);
      shape.setAttributeNS(null,'opacity', '0.9');
      shape.setAttributeNS(null, 'fill', '#F0F0F0');
      return shape;
    }

    const createPolygon = (path) => {
      let shape = document.createElementNS(NS,'polygon');
      shape.setAttributeNS(null,'points',path);
      return shape;
    }
    
    const geometries = {'C': createCircle, 'R': createRectangle, 'P': createPolygon};
    
    // M a i n
    const NS = 'http://www.w3.org/2000/svg';
    
    let div = document.createElement('div');
    div.id = this.id;
    div.className = 'touch_layer';
    div.style.width = `${this.width}px`;
    div.height = `${this.height}px`;
    this.element.appendChild(div);
    
    let elementS = document.createElementNS(NS,'svg');
    // TODO BUG
    elementS.setAttributeNS(null, 'viewBox',`0 0 ${this.width} ${this.height}`);
    elementS.setAttributeNS(null, 'class', 'map');
    elementS.setAttributeNS(null,'width','100%');
    elementS.setAttributeNS(null,'height','100%');
    elementS.setAttributeNS(null,'preserveAspectRatio','xMinYMin meet');


    // Define clickable areas if any
    for (let child of this.childNodes){
      let elementG = document.createElementNS(NS,'g');
      elementG.setAttributeNS(null, 'class', 'hover_group');
      elementG.setAttributeNS(null, 'opacity', '0');
      elementG.setAttributeNS(null, 'id', `area_${child.id}`);

      let elementA = document.createElementNS(NS,'a');
      elementA.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'javascript:void(0)');
      elementA.setAttributeNS(null, 'id',`svg_${child.id}`);
      elementA.setAttributeNS(null, 'class', 'btn');

      let shape;
      console.log(child);
      if (child.geometry !== undefined) {
        shape = geometries[child.geometry.type](...child.geometry.data);
        elementA.appendChild(shape);
      }

      elementG.appendChild(elementA);
      elementS.appendChild(elementG);
    }

    div.appendChild(elementS);

  }
}


/**
 * Create a new scene
 *
 * @author Charlotte GONCALVES FRASCO
 */
const createScene = (props) => {

  let _scene = Scene.create(props);

  _scene.childNodes = [];

  console.log(_scene);
  
  return _scene;
};
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
 * Create a new `switch` object allowing the management of object in different states
 *
 * @author Jean-Christophe Taveau
 */
class Switch extends Composite {
  
  constructor(id,className,description) {
    super(id,className,description);
  };
  
  static create(props) {
    return new Switch(props.id,props.class,props.description)
      .append('div')
      .display(props.display)
      .children(props.children); 
  }

  display(displayProps) {
    // Get information from node to display...
    // TODO
    return this;
  }
}


/**
 * Create a new switch
 *
 * @author Jean-Christophe Taveau
 */
const createSwitch = (props) => {

  let _switch = Switch.create(props);

  _switch.childNodes = [];
  
  return _switch;
};
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
 * @class Graph
 */
class Graph {

  /**
   * @constructor
   */
  constructor() {
    this.root;
    this.nodeList = [];
  }

  /**
   * 
   */
  traverseFrom(a_node)   {
    let children;
    let ancestor;
    console.log(a_node);
    if (a_node.hasChildren()) {
      // ???
      if (a_node.className.includes('scene') ) {
        children = a_node.childrenID;
        ancestor = this.root;
      }
      if (a_node.childrenID !== undefined) {
        children = a_node.childrenID;
        ancestor = a_node;
      }
      else {
        console.log('Check if new_nodes in ' + a_node.id);
        Object.keys(a_node.actions).forEach( on_event => {
          if (a_node.actions[on_event].new_nodes !== undefined) {
            children = a_node.actions[on_event].new_nodes;
            ancestor = a_node.ancestor;
            console.log(`actions.then... id ${a_node.id} ${a_node.ancestor.id}`);
          }
        });
      }
    }
    else {
      return;
    }
    console.log(children);
    for (let id of children) {
      console.log(`id ${id} <-- ${ancestor.id}`);
      let nodeChild = this.nodeList.filter( (node) => node.id === id)[0];
      console.log("TEST1");
      console.log(nodeChild);
      ancestor.childNodes.push(nodeChild);
      nodeChild.ancestor = ancestor;
      this.traverseFrom(nodeChild);
    }
  }


  traverse(a_node,func) {
    if (a_node.hasChildNodes()) {
      for (let nodeChild of a_node.childNodes) {
        console.log(nodeChild);
        func(nodeChild);
        this.traverse(nodeChild,func);
      }
    }
  }
}
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
 * Create a Game Node
 * @class Game
 *
 * @author Jean-Christophe Taveau
 */
class Game extends Composite {
  
  constructor(id,className,description) {
    super(id,className,description);
    this.element = document.getElementById('node_0');
  };
  
  
  static create(props) {
    let _game = new Game(props.id,props.class,props.description)
    .append()
    .children(props.children);
    _game.childNodes = [];
    return _game;
  }
  
  append(){

    let main = document.getElementById("node_0");
    
    //Inventory
    let inventory = document.createElement('aside');
    inventory.appendChild(document.createElement('ul'));
    main.appendChild(inventory);
    
    //Popup
    let popup = document.createElement('div');
    popup.className = "modal";
    popup.id = 'popup';
    main.appendChild(popup);



    return this;

      

  }


} // End of class Game


  
/**
 * Create a new game
 *
 * @author Jean-Christophe Taveau
 */
const createGame = (props) => {

  return Game.create(props);

};






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
 * Factory of action(s)
 *
 * @author Jean-Christophe Taveau
 */
const updateNodes = (eventType,node) => { 
  if (node.actions[eventType].new_nodes !== undefined) {
    console.log('show nodes');
    showNodes(node.actions[eventType].new_nodes);
  }
  if (node.actions[eventType].del_nodes !== undefined) {
    hideNodes(node.actions[eventType].del_nodes);
  }
  if (node.actions[eventType].new_items !== undefined) {
      console.log('show items');
    showItems(node.actions[eventType].new_items);
  }
  if (node.actions[eventType].popup !== undefined) {
    displayPopup(node.actions[eventType].popup);
  }
}

/**
 * Factory of action(s)
 *
 * @author Jean-Christophe Taveau
 */
const triggerAction = (event,node) => {
  console.log(event);
  Object.keys(node.actions).forEach( (event) => {
    switch(event) {
    case 'onclick': 
      if (CRAZYBIOGAME.useItem) {
        updateNodes('onuse',node);
      }
      else {
        updateNodes('onclick',node);
      }
      break;
    case 'onsuccess': 
      updateNodes('onsuccess',node);
      break;
    }
  });
}

/**
 * Display/Show objects in the scene
 *
 * @param {array} nodelist - List of Objects
 * @author Jean-Christophe Taveau
 */
const showItems = (nodelist) => {
  nodelist.forEach( id => {
    let node = CRAZYBIOGAME.graph.nodeList.filter( (n) => n.id === id)[0];
    console.log(`show node #${id} ${node.element.className}`);
    document.getElementById(`item_${id}`).style.display = 'block';
    if (node.actions !== undefined && node.actions.ondisplay !== undefined) {
      updateNodes('ondisplay',node);
    }
  });
}

/**
 * Display/Show objects in the scene
 *
 * @param {array} nodelist - List of Objects
 * @author Jean-Christophe Taveau
 */
const showNodes = (nodelist) => {
  nodelist.forEach( id => {
    let node = CRAZYBIOGAME.graph.nodeList.filter( (n) => n.id === id)[0];
    console.log(`show node #${id} ${node.element.className}`);
    node.element.style.display = 'block';
    if (node.actions !== undefined && node.actions.ondisplay !== undefined) {
      updateNodes('ondisplay',node);
    }
  });
}


/**
 * Hide objects in the scene
 *
 * @param {array} nodelist - List of Objects
 * @author Jean-Christophe Taveau
 */
const hideNodes = (nodelist) => {
  nodelist.forEach( id => {
    let node = CRAZYBIOGAME.graph.nodeList.filter( (n) => n.id === id)[0];
    node.element.style.display = 'none';
  })
}

/**
 * Create a popup
 *
 * @author Charlotte GONCALVES FRASCO
 * @author Hans SCHRIEKE
 * @author Penelope WINTRINGER
 * @author Jean-Christophe Taveau
 */
const displayPopup = (props) => {

  let modal = document.getElementById('popup');
  modal.style.display = 'block';
  
  // modal-content
  let modalContent = document.querySelector('.modal-content') || document.createElement('div');
  modalContent.className = 'modal-content';
  
  let closeButton = document.createElement('a')
  closeButton.href="#close";
  closeButton.title="Close";
  closeButton.className ="close";
  closeButton.textContent='×';
  closeButton.addEventListener('click', (e) => {
    modal.style.display = 'none';
    e.stopPropagation();
  }, false);
  modalContent.appendChild(closeButton);

  // modal-header ** MANDATORY **
  let modalHeader = document.querySelector('.modal-header') || document.createElement('div');
  modalHeader.className = 'modal-header';
  modalHeader.textContent = props.header;
  modalContent.appendChild(modalHeader);


  // modal-body
  let modalBody = document.querySelector('.modal-body') || document.createElement('div');
  modalBody.className = 'modal-body';
  while (modalBody.lastChild) {
    modalBody.removeChild(modalBody.lastChild);
  }
  if (props.contentDOM === undefined) {
    modalBody.innerHTML = (props.body !== undefined) ? props.body.join('') : '';
  }
  else {
    modalBody.appendChild(props.contentDOM);
  }
  modalContent.appendChild(modalBody);


  // modal-footer
  let modalFooter = document.querySelector('.modal-footer') || document.createElement('div');
  modalFooter.className = 'modal-footer';
  modalFooter.innerHTML = props.footer || '';
  modalContent.appendChild(modalFooter);



  modal.appendChild(modalContent);
  
  
/*
  // TODO For each button, add it :
  // Example:
  // <span class="grab"><i class="far fa-hand-paper fa-2x"></i></span>

  if (props.class === "machine.download"){
    let dwnldButton = document.createElement('a');
    dwnldButton.className = 'download-button';
    dwnldButton.href = 'javascript:void(0)';
    dwnldButton.innerHTML = '<i class="fas fa-download fa-2x"></i>';
    modalFooter.appendChild(dwnldButton);
  }
  
  else if (props.class === "machine.display"){
    let img = document.createElement('img');
    img.className = 'image';
    img.src = props.features.popup.graphics.path;
    modalBody.appendChild(img);
  }
  
  else if (props.class === "machine.form"){
    //to debug

    let myForm = document.createElement('form');
    myForm.onsubmit = validateForm();
    myForm.method = "post";
    let field = document.getElementsById("f1");
    field.type = "text";
    let field2 = document.getElementsById("f2");
    field2.type = "text";
    let buttonS = document.createElement('button');
    buttonS.textContent = 'OK';
    buttonS.type = "submit";

    myForm.appendChild(field);
    myForm.appendChild(field2);
    myForm.appendChild(buttonS);

    let holder = "...";
    let answer = `${props.exit}`;
    field.placeholder = holder;
    field2.placeholder = holder;

    function validateForm() {
      let x = document.forms["myForm"]["field"].value;
      let y =  document.forms["myForm"]["field2"].value;
      if (x == "" || y == "") {
          alert("All fields must be filled out.");
          return false;
      }
      if (x === answer && y === answer){
        alert(`${props.message}`);
      }
      else {
        alert("Try again");
      }
    }

    modalBody.appendChild(myForm);

  }
  
  else if (props.class === "machine.formDragDrop"){
    //prototype in machine.JS to c/p and modify
  }
  
  else if (props.class === "machine.formDropDown"){
    //prototype in machine.JS to c/p and modify
  }


  else if (props.class === "machine.lockNumerical"){
    let imglockNum = document.createElement('img');
    imglockNum.className = 'lock-image';
    imglockNum.src =  props.features.file;
    modalBody.appendChild(imglockNum);
    let lockNum = document.createElement('a');
    lockNum.className = 'lockNum-button';
    lockNum.href = 'javascript:void(0)';
    lockNum.innerHTML = '<i class="fas fa-unlock-alt"></i>';
    modalFooter.appendChild(lockNum);

  }

  else if (props.class === "machine.lockText"){
    // create the input
    let form = document.createElement('form');
    let submit = document.createElement('submit');
    let div = document.createElement('div');
    let input = document.createElement('input');
    input.id = 'lock-input';
    input.type = 'text';

    div.appendChild(input);
    div.appendChild(submit);
    form.appendChild(div);

    // setup the holder
    let holder = "";
    let answer = `${props.exit}`;
    if (!isNaN(answer) === true){
      holder = 'Input numbers';
    }
    else {
      holder = 'Input letters';
    }
    input.placeholder = holder;

    let submitbutton = document.createElement('button');
    submitbutton.id = 'button';
    submitbutton.textContent = "OK";
    submitbutton.type = "submit";

    submitbutton.onclick = function(){
      let val = document.getElementById('lock-input').value;
      if (val === `${props.exit}`){
        alert(`${props.message}`);
      }
      else {
        alert("Try again");
      }
    }

    modalBody.appendChild(form);
    submit.appendChild(submitbutton);

    let lockText = document.createElement('a');
    lockText.className = 'lockText-button';
    lockText.href = 'javascript:void(0)';
    modalFooter.appendChild(lockText);


}



  let link = document.createElement('a');
  link.className = 'close'+ name;
  link.href = 'javascript:void(0)';
  link.innerHTML = '<i class="far fa-window-close fa-2x"></i>';
  modalFooter.appendChild(link);



 let root = document.getElementById('game');
 root.appendChild(modal);
 */
}
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
 * Common code for the engine
 *
 *
 */
 
/* Global Variable */
let CRAZYBIOGAME = {
  name: 'A crazyBioComputing Game',
  level: 0,
  game: 0,
  gamepath: '',
  topic: 'none',
  next_game: -1,
  useItem: false,
  deferred: {}
};

const categories = {
  "scene": {
    type: "scene", 
    code: 1
  },
  "item": {
    type: "item", 
    code: 2
  },
  "machine": {
    type: "machine", 
    code: 4
  },
  "machine.download": {
    type: "machine.download", 
    code: 8
  },
  "machine.lockKeypad": {
    type: "machine.lockKeypad", 
    code: 16
  },
  "machine.lockDigit[1]": {
    type: "machine.lockDigit[1]", 
    code: 32
  },
  "machine.lockDigit[2]": {
    type: "machine.lockDigit[2]", 
    code: 33
  },
  "machine.lockDigit[3]": {type: "machine.lockDigit[3]", code: 34},
  "machine.lockDigit[4]": {type: "machine.lockDigit[4]", code: 35},
  "machine.lockDigit[5]": {type: "machine.lockDigit[5]", code: 36},
  "machine.lockDigit[6]": {type: "machine.lockDigit[6]", code: 37},
  "machine.lockDigit[7]": {type: "machine.lockDigit[7]", code: 38},
  "machine.lockDigit[8]": {type: "machine.lockDigit[8]", code: 39},
  "machine.lockDigit[9]": {type: "machine.lockDigit[9]", code: 40},
  "machine.lockText": {
    type: "machine.lockText", 
    code: 64
  },
  "machine.lockNumerical": {
    type: "machine.lockNumerical", 
    code: 128
  },
  "machine.form": {
    type: "machine.form", 
    code: 256
  },
  "machine.formDragDrop": {type: "machine.formDragDrop", code: 257},
  "machine.formDropDown": {type: "machine.formDropDown", code: 258},
  "target": {type: "target", code: 512},
  "sprite": {type: "sprite", code: 1024}
};

const NS = 'http://www.w3.org/2000/svg';
    
/**
 * Create a SVG Layer for grabbing the event(s)
 * 
 * @author Charlotte GONCALVES FRASCO
 */
const createBasicSVG = (id,w,h) => {
  // M a i n

    let svg = document.createElementNS(NS,'svg');
    // TODO BUG
    svg.setAttributeNS(null, 'viewBox',`0 0 ${w} ${h}`);
    svg.setAttributeNS(null, 'class', 'map');
    svg.setAttributeNS(null,'preserveAspectRatio','xMinYMin meet');
    
    return svg;
}

const appendImage = (image_path,id, svg) => {
  let image = document.createElementNS(NS,'image');
  image.setAttributeNS(null,'width','100%');
  image.setAttributeNS(null,'height','100%');
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', image_path);
  svg.appendChild(image);
  return svg;
};

const appendSensitive = (id, geom) => {

  const createCircle = (cx,cy,radius) => {
    let shape = document.createElementNS(NS,'circle');
    shape.setAttributeNS(null,'cx',radius);
    shape.setAttributeNS(null,'cy',radius);
    shape.setAttributeNS(null,'r',radius);
    shape.setAttributeNS(null,'opacity', '0.9');
    shape.setAttributeNS(null, 'fill', '#F0F0F0');
    return shape;
  }

  const createRectangle = (x,y,w,h) => {
    let shape = document.createElementNS(NS,'rect');
    shape.setAttributeNS(null,'x',0);
    shape.setAttributeNS(null,'y',0);
    shape.setAttributeNS(null,'width',w);
    shape.setAttributeNS(null,'height',h);
    shape.setAttributeNS(null,'opacity', '0.9');
    shape.setAttributeNS(null, 'fill', '#F0F0F0');
    return shape;
  }

  const createPolygon = (path) => {
    let shape = document.createElementNS(NS,'path');
    shape.setAttributeNS(null,'d',path);
    return shape;
  }
  
  const geometries = {'C': createCircle, 'R': createRectangle, 'P': createPolygon};
  
  // Define clickable areas if any
  let group = document.createElementNS(NS,'g');
  group.setAttributeNS(null, 'class', 'hover_group');
  group.setAttributeNS(null, 'opacity', '0');
  group.setAttributeNS(null, 'id', `area_${id}`);

  let link = document.createElementNS(NS,'a');
  link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'javascript:void(0)');
  link.setAttributeNS(null, 'id',`link_${id}`);
  link.setAttributeNS(null, 'class', 'target');
  
  let shape = geometries[geom.type](...geom.data);
  shape.dataset.objectid = id;
  link.appendChild(shape);

  group.appendChild(link);
  return group;
};


const createSensitiveLayer = (id,w,h,geom) => {
  const createCircle = (cx,cy,radius) => {
    let shape = document.createElementNS(NS,'circle');
    shape.setAttributeNS(null,'cx',cx);
    shape.setAttributeNS(null,'cy',cy);
    shape.setAttributeNS(null,'r',radius);
    shape.setAttributeNS(null,'opacity', '0.9');
    shape.setAttributeNS(null, 'fill', '#F0F0F0');
    return shape;
  }

  const createRectangle = (x,y,w,h) => {
    let shape = document.createElementNS(NS,'rect');
    shape.setAttributeNS(null,'x',0);
    shape.setAttributeNS(null,'y',0);
    shape.setAttributeNS(null,'width',w);
    shape.setAttributeNS(null,'height',h);
    shape.setAttributeNS(null,'opacity', '0.9');
    shape.setAttributeNS(null, 'fill', '#F0F0F0');
    return shape;
  }

  const createPolygon = (path) => {
    let shape = document.createElementNS(NS,'path');
    shape.setAttributeNS(null,'d',path);
    return shape;
  }
  
  const geometries = {'C': createCircle, 'R': createRectangle, 'P': createPolygon};
  
  // M a i n
  const NS = 'http://www.w3.org/2000/svg';
  
  let svg = document.createElementNS(NS,'svg');
  svg.setAttributeNS(null, 'viewBox',`0 0 ${w} ${h}`);
  svg.setAttributeNS(null, 'class', 'map');
  svg.setAttributeNS(null,'preserveAspectRatio','xMinYMin meet');

  // Define clickable areas if any
  svg.appendChild(appendSensitive(id,geom));
  
  return svg;
}


const createHeader = () => {
  let url = new URL(window.location.href);
  let id = url.searchParams.get("id");
  let level = url.searchParams.get("level");
  let topic = url.searchParams.get("topic");
  let game = url.searchParams.get("game");
  let gamepath = url.searchParams.get("path");
  let next_id = url.searchParams.get("next");
  // Add Title
  let title = document.createElement('title');
  title.textContent = `Game #${game} - Level #${level}`;
  document.head.prepend(title);
  // Add banner
  document.querySelector('#banner').innerHTML = `
    <ul>
    <li><a href="../index.html">[ H o m e ]</a></li>
    <li><a href="history.html">&mdash; c&nbsp;&nbsp;r&nbsp;&nbsp;a&nbsp;&nbsp;z&nbsp;&nbsp;y&nbsp;&nbsp;b&nbsp;&nbsp;i&nbsp;&nbsp;o
&nbsp;&nbsp;c&nbsp;&nbsp;o&nbsp;&nbsp;m&nbsp;&nbsp;p&nbsp;&nbsp;u&nbsp;&nbsp;t&nbsp;&nbsp;i&nbsp;&nbsp;n&nbsp;&nbsp;g  &mdash;</a></li>
    <li><a href="#">[ L e v e l # ${level} &mdash; g a m e # ${game} ]</a></li>
    </ul>`;
    
  // Some storage...
  CRAZYBIOGAME.level = parseInt(level);
  CRAZYBIOGAME.game = parseInt(game);
  CRAZYBIOGAME.gamepath = gamepath.toLowerCase();
  CRAZYBIOGAME.topic = topic.toLowerCase();
  let mgr = new GameManager();
  mgr.calcNextURL('../levels.json',level,game);
}

CRAZYBIOGAME.init = () => {
  createHeader();
}

const nextGameById = (val,node_id) => {
  let node = CRAZYBIOGAME.graph.nodeList.filter( (node) => node.id === node_id)[0];
  nextGame(val,node);
}


const nextGame = (val,node) => {
  console.log(val,node.exitCode);
  if (val === node.exitCode.toString()) {
    // Update crazybiolevels localstorage
    let crazybiolevels = 2**(CRAZYBIOGAME.game - 1);
    let str = '';
    if (localStorage.getItem('crazybiolevels_' + CRAZYBIOGAME.topic)) {
      let i = (CRAZYBIOGAME.level - 1 ) * 2;
      let storage = localStorage.getItem('crazybiolevels_'+ CRAZYBIOGAME.topic);
      crazybiolevels += (i < storage.length) ? parseInt(storage.slice(i,i+2),16) : 0;

      console.log(crazybiolevels,CRAZYBIOGAME.level,CRAZYBIOGAME.game);

      str = storage.padEnd(2 * CRAZYBIOGAME.level,'0');
      let arr = str.split('');
      arr[2*(CRAZYBIOGAME.level - 1)] = crazybiolevels.toString(16).padStart(2,'0')[0];
      arr[2*(CRAZYBIOGAME.level - 1) + 1] = crazybiolevels.toString(16).padStart(2,'0')[1];
      str = arr.join('');
    }
    else {
      str = crazybiolevels.toString(16).padStart(2 * CRAZYBIOGAME.level,'0');
    }
    console.log('updated value',str);
    localStorage.setItem('crazybiolevels_' + CRAZYBIOGAME.topic,str);


    let html = (CRAZYBIOGAME.next_game !== '9999') ?
      `<p>Click on this <a class="exit" href="../${CRAZYBIOGAME.next_game}">button</a>to go to the next game...</p>` :
      `<p>End of this level !!! Return to <a class="exit" href="../index.html#level${CRAZYBIOGAME.level+1}">Home</a>...</p>`;
    displayPopup( {
      header: 'Congratulations !!!',
      body: [html],
      footer:  'You Win !!&nbsp;&nbsp;'
    });
  }
  else {
    alert("Wrong code. Try again");
  }
}


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


const creators = {
  "composite": createComposite,
  "deferred": createDeferred,
  "game": createGame,
  "item": createItem,
  "machine": createMachine,
  "machine.download": createMachineDownload,
  "machine.form": createForm,
  "machine.formDragDrop": createFormDragDrop,
  "machine.formDropDown": createFormDropDown,
  "machine.tile": createMachineTile,
  "machine.lockKeypad": createLockKeypad,
  "machine.lockDigit[1]": createLockDigit(1),
  "machine.lockDigit[2]": createLockDigit(2),
  "machine.lockDigit[3]": createLockDigit(3),
  "machine.lockDigit[4]": createLockDigit(4),
  "machine.lockDigit[5]": createLockDigit(5),
  "machine.lockDigit[6]": createLockDigit(6),
  "machine.lockDigit[7]": createLockDigit(7),
  "machine.lockDigit[8]": createLockDigit(8),
  "machine.lockDigit[9]": createLockDigit(9),
  "machine.lockText": createLockText,
  "machine.lockNumerical":  createLockNumerical,
  "scene": createScene,
  "scene.closeup": createScene,
  "sprite": createSprite,
  "switch": createSwitch
};


/**
 * Create a game graph and corresponding HTML5 elements
 * @class GameBuildergit pu
 *
 * @author Jean-Christophe Taveau
 */

class GameBuilder {

  constructor() {
    this.graph = new Graph();
  }

  static create(json) {

    let _builder = new GameBuilder();

    // Step #1: Create a root node `Game`
    // Check node ID=0
    let id0 = json.filter( (obj) => obj.id === 0);
    console.log(id0);
    let props = {id:0,class:'game'};
    if (id0.length === 0) {
      props.description = 'Game root';
    }
    else {
      props.description = id0[0].description || 'Game Root';
      props.misc = id0[0];
    }

    // Step #2: Get children of game (aka scene, scene.closeup,etc.)
    let scenes = json.filter( (obj) => obj.class.includes('scene'));
    props.children = scenes.map( (s) => s.id);
    props.display = {
      width: scenes[0].display.width,
      height: scenes[0].display.height,
    }
    console.log(json);
    _builder.parse([props,...json]);

    return _builder;
  }

  /**
   * Parse storyboard and create various HTML5 Elements
   *
   * @author: Jean-Christophe Taveau
   */
  parse(storyboard) {

    const hasItems = () => {
      return storyboard.some( (obj) => obj.class === 'item');
    }

    // Process storyboard
    const process = (storyboard) => {
      this.graph.nodeList = storyboard.map( (obj, index, arr) => {
        console.log(obj);
        let func = creators[obj.class];
        if (func !== undefined) {
          return func(obj);
        }
        return {};
      });
      console.log('nodeList');
      console.log(this.graph.nodeList);

      this.graph.root = this.graph.nodeList.filter( (node) => node.className === 'game' && node.id === 0)[0];
      this.graph.traverseFrom(this.graph.root);

      return this.graph;
    };

    const appendHTML = (node) => {
      console.log('appendHTML');
      console.log(node);
/*      if (node.className === 'item') {
        document.querySelector('aside ul').appendChild(node.getHTML());
      }
      else {
*/
        node.ancestor.getHTML().appendChild(node.getHTML());
//      }

    }

    /**** M  a  i  n ****/
    console.log('Parse/Build game');
    console.log(storyboard);
    // Step #0- Get Width and Height of game and create `div` game.
    let root_obj = storyboard.filter ( obj => obj.class === 'game')[0];
    CRAZYBIOGAME.width = root_obj.display.width;
    CRAZYBIOGAME.height = root_obj.display.height;
    console.log(root_obj);

    // Create HTML5 div for game
    let top = document.getElementById('main');
    let root = document.createElement('div');
    root.id = 'node_0';
    root.className = 'game';
    top.appendChild(root);

    // Step #1- Preprocess
    if (hasItems()) {
      let inventory = document.createElement('aside');
      inventory.appendChild(document.createElement('ul'));
      root.appendChild(inventory);
      console.log('create inventory');
      // Complete the `new_nodes` property if any
      // Collect all the ids and the items ids
      let sprites = storyboard.filter(obj => obj.id !== 0 && obj.class !== 'item');
      let items = storyboard.filter( obj => obj.class === 'item');
      items.forEach( item => {
          let modifier = item.id;
          // An item is a composite of a sprite and a invertoriable object
          // Create Sprite as child of Item
          storyboard.push({
            id : 1000 + item.id,
            class : 'sprite',
            description: item.description,
            display: item.display,
            action: item.action
          });

        for (let sprite of sprites) {
          // Update item props
          let new_nodeid = sprite.id + modifier;
          let new_nodes = sprites.filter( obj => obj.id === new_nodeid);
          if (new_nodes.length !== 0) {
            console.log(`The item ${modifier} interacts with the object ${sprite.id} ${sprite.class}\n`);
            console.log(new_nodes);
            // When a item is used, trigger the `onuse` action(s)
            sprite.action.onuse = {
              new_nodes: new_nodes.map( node => node.id),
              modifier: modifier
            }
          }
        }
      });
      console.log(sprites);
      console.log(items);
    }
    console.log(storyboard);

    // Step #2 - Create the graph and nodes
    CRAZYBIOGAME.graph = process(storyboard);

    // Step #3 - Post-process - create Accessory Elements (popup, etc.)
    let popup = document.createElement('div');
    popup.className = "modal";
    popup.id = 'popup';
    root.appendChild(popup);
    // TODO HACK
    let subSprites = document.querySelectorAll('div.item .sprite');
    console.log('INVENT. ',subSprites);

    // Step #4 - Finalize HTML5 and/or SVG Elements of this graph
    let scene_root = CRAZYBIOGAME.graph.root;
    root.style.maxWidth = `${CRAZYBIOGAME.width}px`;
    CRAZYBIOGAME.graph.traverse(scene_root,appendHTML);

  }

  /**
   * Preload assets
   *
   * @author
   */
  preprocess(json) {
    // Step #1 : Get Assets
    const getTypes = (keys) => {
        const types = {
          image: "img",
          audio: "audio",
          svg: "svg",
          video: "video"
        }
      let filtered = keys.filter(( keyword) => Object.keys(types).includes(keyword));
      return types[filtered[0]];
    }
    let assets = [];
    for(let i=0;i<json.length;i++) {
      let node = json[i];
      let media = node.display.media;
      if ( media !== undefined) {
        let asset = {
          id: node.id,
          path: media.image ||  media.svg || media.video || media.audio || "none",
          type: getTypes(Object.keys(media)) || "none"
        }
        assets.push(asset);
      }
    }
    console.log(assets);
    // Step #2 : Load Assets
    let div_media=document.createElement("div");
    div_media.id="media";
    div_media.style.display="none";
    document.body.appendChild(div_media);
    for (let k=0;k<assets.length;k++){
      let media=assets[k];
      if (media.type==="svg"){
        fetch(media.path)
        .then(function(response){
          return response.text()
        })
        .then(function(svg){
          div_media.insertAdjacentHTML("afterbegin",svg);
        })
      }
      else{
        fetch(media.path)
        .then(function(response){
          return response.blob();
        })
        .then(function(myBlob){
          var objectURL = URL.createObjectURL(myBlob);
          let media_html=document.createElement(media.type);
          media_html.src=objectURL;
          media_html.id=`node_${media.id}`;
          media_html.dataset.src=media.path;
          media_html.onload=function(){
            Object.size=function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;};
            let taille=Object.size(assets)+2;
            let div_media=document.getElementById("media");
            div_media.appendChild(this);
            console.log(`ajouté ${media.id}`);
            let t_div = div_media.childNodes;
            console.log(t_div.length);
            if(t_div.length==taille){
              console.log("tout chargé");
              this.process();
            }
          };
        });
      }
    }
    return [this,0];
  }

  /**
   * Build Scene Graph and DOM
   *
   * @author
   */
  process(json) {
    console.log("coucou");
    let media = document.getElementById("media");
    media.style.display="block";
    let img = document.getElementById("node_1");
    console.log(img);
    //Fonction pour append le HTML
    const appendHTML = (node) => {
      console.log('appendHTML');
      console.log(node);
/*      if (node.className === 'item') {
        document.querySelector('aside ul').appendChild(node.getHTML());
      }
      else {
*/
        node.ancestor.getHTML().appendChild(node.getHTML());
//      }

    }

    //Create Root
    let top = document.getElementById('main');
    top.id = 'node_0';
    top.className = 'game';
    let props = {id:0,class:'game',description:'Game Root',children:[1]};
    json.push(props);

    //Create the NodeList = List with all the nodes
    this.graph.nodeList = json.map( (obj, index, arr) => {
      console.log(obj);
      let func = creators[obj.class];
      if (func !== undefined) {
        return func(obj);
      }
      return {};
    });
    console.log('nodeList');
    console.log(this.graph.nodeList);


    //Create the Graph
    this.graph.root = Game.create(json.filter( (node) => node.id === 0)[0]);
    console.log(this.graph.root);
    this.graph.traverseFrom(this.graph.root,json);
    console.log(this.graph);

    //Create the HTML
    let scene_root = this.graph.root;
    this.graph.traverse(scene_root,appendHTML);

    return this;
  }

  /**
   * ???
   *
   * @author
   */
  postprocess(json) {

  }

} // End of class GameBuilder


/*
 * common.js??
 */

const newGame = (filename) => {

  /*
   * Get JSON with fetch(..)
   */
  const getJSON = (url) => {
    return fetch(url, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      mode: 'cors',
      cache: 'default'
      }
    )
    .then ( response => response.json() )
    .catch ( error => {
      alert(`Something went wrong - ${error}`)
    })
  };

  // Main

  return getJSON(filename)
    .then( (data) => {
      // GameBuilder.create(data)
      let _gb = new GameBuilder();
      console.log(data);
      _gb.preprocess(data);
      return _gb;
    } );

};
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

class GameManager {
  constructor(topic) {
    this.levels;
    this.topic = topic;
  }
  
  build(url) {
    fetch(url, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      mode: 'cors',
      cache: 'default' 
      }
    )
    .then ( response => response.json() )
    .then( (data) => {
      this.levels = data;
      // Build the page web with links
      console.log(this.levels);
      // Get the previous solved game
      let crazybiolevels = (localStorage.getItem('crazybiolevels_' + this.topic)) ? localStorage.getItem('crazybiolevels_' + this.topic) : '00';
      console.log(crazybiolevels);
      let section = document.getElementById('levels');
      this.levels.slice(1).forEach ( (level) => {
        let title=document.createElement('h2');
        title.innerHTML = `<span>${this.topic.charAt(0).toUpperCase() + this.topic.slice(1)} #${level.level} &mdash; ${level.title} ${level.history}</span>`;
        let container = document.createElement('div');
        container.appendChild(title);
        let table = document.createElement('ul');
        container.appendChild(table);
        section.appendChild(container);
        level.games.forEach( (game,index) => {
          let i = (level.level - 1 ) * 2;
          let solvedgame = parseInt(crazybiolevels.slice(i,i + 2),16) & 2**index;
          /* HACK
          console.log(
            crazybiolevels,
            level.level,
            index,
            solvedgame,
            (crazybiolevels & (crazybiolevels & (15 << 4*(level.level-1)))).toString(2),
            (15 << 4*(level.level-1)).toString(2)
          );
          */
          let item = document.createElement('li');
          let link = document.createElement('a');
          link.href = `${game.path}/index.html?id=${game.id}&topic=${this.topic}&level=${level.level}&game=${index+1}&path=${game.path}`;
          let img = document.createElement('img');
          img.src= (solvedgame !== 0) ? `${game.path}/thumbnail.png` : "../assets/thumbnail_unknown.png";
          link.appendChild(img);
          item.appendChild(link);
          table.appendChild(item);
        });
      })
    })
    .catch ( error => {
      alert(`Something went wrong - ${error}`) 
    });
  }
  
  calcNextURL(bdd,level_id,game) {
    console.log(level_id,game);
    fetch(bdd, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      mode: 'cors',
      cache: 'default' 
      }
    )
    .then ( response => response.json() )
    .then( (data) => {
      // Extract topic at first position (level #0)
      let topic = data[0].topic;
      console.log('data ' + JSON.stringify(data));
      // Build the URL
      let level = data.filter( (lvl) => lvl.level === parseInt(level_id))[0];
      let game_index = game - 1;
      console.log(game_index);
      let next_url= '9999';         // Last game of level
      if (game_index !== level.games.length - 1) {
        let next_game = level.games[game_index + 1];
        next_url = `${next_game.path}/index.html?id=${next_game.id}&topic=${topic}&level=${level_id}&game=${game_index+2}`;
      }
      CRAZYBIOGAME.next_game = next_url;
      console.log(next_url);
    })
    .catch ( error => {
      alert(`Something went wrong - ${error}`) 
    });
  }
}



