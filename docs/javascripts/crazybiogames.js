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
    this.displayType = Node.NONE;
  }
  
  static get NONE() {
    return 0;
  }
  
  static get GRAPHICS() {
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
    this.element.id = `node_${this.id}`;
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
      
    // M A I N
    if (displayProps === undefined) {
      alert(`The object #${this.id} must have a 'display' property`);
      return this;
    }
    
    this.width = displayProps.width || 0;
    this.height = displayProps.height || 0;
    this.topleft = displayProps.position || [0,0];
      
    // Media: Image, video, audio?, etc.
    if (displayProps.graphics !== undefined) {
      this.displayGraphics(displayProps.graphics);
    }
    // Text
    else if (displayProps.text !== undefined) {
      this.displayText(displayProps.text);
    }
    // Target to event(s)
    else if (displayProps.target !== undefined) {
      this.displayType = Node.TARGET;
      this.target = (displayProps.target.data === undefined) ? ["R",0,0,this.width,this.height] : displayProps.target.data;
    }
    console.log(this.width,this.height,this.topleft,CRAZYBIOGAME.width,CRAZYBIOGAME.height);
    
    this.element.style.left = `${this.topleft[0] / CRAZYBIOGAME.width * 100}%`;
    this.element.style.top = `${this.topleft[1] / CRAZYBIOGAME.height * 100}%`;
    this.element.style.width = `${this.width / CRAZYBIOGAME.width * 100}%`;
    this.element.style.height = (displayProps.target === undefined) ? 'auto' : `${this.height / CRAZYBIOGAME.height * 100}%`;

    return this;
  }

  displayGraphics(propsGraphics) {
    this.displayType = Node.GRAPHICS;
    
    // Append the media
    if (propsGraphics.element !== undefined) {
      // WARNING - DOES NOT WORK WITH JSON STORYBOARD!!!
      this.element.appendChild(propsGraphics.element);
    }
    else {
      // TODO
      // Check extension and create the appropriate HTML5 element
      let img = document.createElement('img');
      img.src = propsGraphics.path;
      img.addEventListener('dragstart', () => false,false); 
      this.element.appendChild(img); 
    }

    
    // Add focus if any
    this.focus = (propsGraphics.focus !== undefined) ? propsGraphics.focus : ["R",0,0,this.width,this.height];
    // Add style if any
    return this.displayStyle(propsGraphics.style);
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
    this.element.innerHTML = propsText.content.join('');
    // TODO Must be improved
    let foundTarget = Node.getTargetElement(this.element);
    if (foundTarget !== undefined) {
      foundTarget.dataset.objectid = this.id;
    }
    return this.displayStyle(propsText.style);
  };

  displayStyle(props = {}) {
    for (let key in props) {
      this.element.style[key] = props[key];
    }
    return this;
  }
  
  
  /**
   * Create event features
   * 
   * @author Jean-Christophe Taveau
   */
  action(actionProps, func) {
  
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
      else if (event === 'onchange') {
        console.log('on change...');
        this.element.addEventListener('change', doIt,false);
      }
    });

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
  }
  
  /**
   * Static Constructor
   *
   */
  static create(props) {
    return new Machine(props.id,props.class,props.description,props.parent)
      .append('article')
      .display(props.display)
      .features(props.features);
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
      let dx = dragged.getBoundingClientRect().left - document.getElementById('game').getBoundingClientRect().left;
      let dy = dragged.getBoundingClientRect().top - document.getElementById('game').getBoundingClientRect().top;
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
  // machine.action(props.action);
  return machine;
};

/**
 * Create a new `display` machine
 * @author P. Wintringer
 *


const createMachineDisplay = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "machDisplay";

  createPopUp(props,"dp");
  let modal = document.getElementById("dp");
  let button = document.getElementById(`svg_${props.id}`);
  let closeB = document.getElementsByClassName('close'+"dp")[0];

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

  return element;

};
 */
 
 
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
  let paragraph = document.createElement('p'); 
  paragraph.innerHTML = 
    `Click on the icon below to download the file and process 
    it with your favorite scientific software...<br>
    <center> <a class="button" href="${props.features.download}" download="${props.features.download}">
    <i class="fas fa-download fa-3x"></i></a></center>`;
  
  // Add all the elements
  container.appendChild(paragraph);
  actionProps.onclick.popup.contentDOM = container;
  machine.action(actionProps);

  return machine;
};


/**
 * Create a Tile machine
 *
 * @author Jean-Christophe Taveau
 *
 */
const createMachineTile = (props) => {
  let machine = Machine.create(props).draggable(true);
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
      .features(props.features)
      .draggable(props.features.draggable);

    return form;
  }
  
  /**
   * Create the 'features' of this machine.form
   *
   * @author Jean-Christophe Taveau
   **/
  features(featuresProps) {
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
    
    
    // Step #1: Create the HTML5 element(s)
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
        }
        form.appendChild(child);
      }
    });

    // Step #2: Extract the buttons from the form
    let buttons = Array.from(this.element.children).reduce( (accu,child) => {
      if (child.children !== undefined) {
        return [...accu,...Array.from(child.children).filter( sub => sub.tagName === 'BUTTON')];
      }
      return accu;
    },[]);

    // Step #3: Add the actions 
    buttons.forEach( button => {
      // Block draggable if any
      button.addEventListener('mousedown', ev => ev.stopPropagation(),false );
      button.dataset.parent = `node_${this.id}`;
      // Add event when click button(s)
      if (button.type === 'submit') {
        button.addEventListener('click', ev => {
          ev.stopPropagation();
          let values = Array.from(document.querySelectorAll(`#${ev.target.dataset.parent} input`)).map( (input)=> input.value);
          console.log(values);
          console.log(this.answers);
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
      .features(props.features);
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

  let actionProps = {}
  actionProps.onclick = {};
  actionProps.onclick['popup'] = {
    header: 'Unlock the game...',
    content: [''],
    footer: 'Lock'
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
    console.log(val,lock.features.exit);
    nextGame(val,lock);
  }
  
  // Add all the elements
  container.appendChild(paragraph);
  container.appendChild(input);
  container.appendChild(submitbutton);
  actionProps.onclick.popup.contentDOM = container;
  lock.action(actionProps);
  
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
 *
 *
 */
class Item extends Machine {

  constructor (id,className,description) {
    super(id,className,description);
  }

  static create(props) {
    props.display.id = props.id;
    props.display.title = props.description;
    
    let item = new Item(props.id,props.class,props.description,props.parent)
      .display(props.display)
      .features(props.features);

    return item;
  }

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
  
  features(featuresProps) {
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
      if (child.class === 'item') {
        CRAZYBIOGAME.graph.inventory.appenChild(child);
      }
      else {
        this.element.appendChild(child);
        if (child.class === 'composite' || child.class === 'scene' || child.class === 'scene.closeup') {
          child.forEachChild(child.appendChild);
        }
      }
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
      .action(props.action);
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

const createDeferred = (props) => {
  let obj = CRAZYBIOGAME.deferred[props.id];
  // Update properties...
  obj.element.style.left = `${obj.topleft[0] / CRAZYBIOGAME.width * 100}%`;
  obj.element.style.top = `${obj.topleft[1] / CRAZYBIOGAME.height * 100}%`;
  obj.element.style.width = `${obj.width / CRAZYBIOGAME.width * 100}%`;
  obj.element.style.height = (obj.display.target === undefined) ? 'auto' : `${obj.height / CRAZYBIOGAME.height * 100}%`;
  console.log(obj);
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
      .display(props.display)
      .children(props.children); // Pre-calculated in `preprocess` of game.js
      // .forEachChild(this.appendChild);
  }
  
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

class Graph {
  constructor() {
    this.root;
    this.nodeList = [];
  }


  traverseFrom(a_node) {
    let children;
    let ancestor;
    if (a_node.hasChildren()) {
      // ???
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

    for (let id of children) {
      console.log(`id ${id} ${ancestor.id}`);
      let nodeChild = this.nodeList.filter( (node) => node.id === id)[0];
      ancestor.childNodes.push(nodeChild);
      nodeChild.ancestor = ancestor;
      this.traverseFrom(nodeChild);
    }
  }


  traverse(a_node,func) {
    if (a_node.hasChildNodes()) {
      for (let nodeChild of a_node.childNodes) {
        func(nodeChild);
        this.traverse(nodeChild);
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


const creators = {
  "composite": createComposite,
  "deferred": createDeferred,
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
  "sprite": createSprite

};

/**
 * Create a new game from a JSON storyboard
 *
 * @author: Jean-Christophe Taveau
 */
const newGame = (filename) => {
  /*
   * Parse storyboard and create various HTML5 Elements
   */
  const parseGraph = (storyboard) => {
  
    const hasItems = () => {
      return storyboard.some( (obj) => obj.class === 'item');
    }
    
    // Process storyboard
    const process = (storyboard) => {
      let graph = new Graph();
      graph.nodeList = storyboard.map( (obj, index, arr) => {
        console.log(obj);
        let func = creators[obj.class];
        if (func !== undefined) {
          return func(obj);
        }
        return {};
      });
      console.log('nodeList');
      console.log(graph.nodeList);

      graph.root = graph.nodeList.filter( (node) => node.className === 'scene' && node.id === 1)[0];
      graph.traverseFrom(graph.root);
      
      return graph;
    };

    const appendHTML = (node) => {
      if (node.className === 'item') {
        document.querySelector('aside ul').appendChild(node.getHTML());
      }
      else {
        node.ancestor.getHTML().appendChild(node.getHTML());
      }

    }
    
    /**** M  a  i  n ****/

    // Step #0- Get Width and Height of game
    let root_obj = storyboard.filter ( obj => obj.id === 1 && obj.class === 'scene')[0];
    let root = document.getElementById('game');
    CRAZYBIOGAME.width = root_obj.display.width;
    CRAZYBIOGAME.height = root_obj.display.height;
     
    // Step #1- Preprocess
    if (hasItems()) {
      let inventory = document.createElement('aside');
      inventory.appendChild(document.createElement('ul'));
      root.prepend(inventory);
      console.log('create inventory');
      // Complete the `new_nodes` property if any
      // Collect all the ids and the items ids
      let sprites = storyboard.filter(obj => obj.id !== 0 && obj.class !== 'item');
      let modifiers = storyboard.filter( obj => obj.class === 'item').map( item => item.id);
      modifiers.forEach( modifier => {
        for (let sprite of sprites) {
          let new_nodeid = sprite.id + modifier;
          let new_nodes = sprites.filter( obj => obj.id === new_nodeid);
          if (new_nodes.length !== 0) {
            console.log(sprite);
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
      console.log(modifiers);
    }
    console.log(storyboard);
    
    // Step #2 - Create the graph and nodes
    CRAZYBIOGAME.graph = process(storyboard);

    // Step #3 - Post-process - create Accessory Elements (popup, etc.)
    root.appendChild(CRAZYBIOGAME.graph.root.getHTML());
    let popup = document.createElement('div');
    popup.className = "modal";
    popup.id = 'popup';
    root.appendChild(popup);

    // Step #4 - Finalize HTML5 and/or SVG Elements of this graph
    let scene_root = CRAZYBIOGAME.graph.root;
    root.style.maxWidth = `${CRAZYBIOGAME.width}px`;
    CRAZYBIOGAME.graph.traverse(scene_root,appendHTML);
  };
  
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
    .then( (data) => parseGraph(data) );
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
 * Factory of action(s)
 *
 * @author Jean-Christophe Taveau
 */
const updateNodes = (eventType,node) => { 
  if (node.actions[eventType].new_nodes !== undefined) {
    showNodes(node.actions[eventType].new_nodes);
  }
  if (node.actions[eventType].del_nodes !== undefined) {
    hideNodes(node.actions[eventType].del_nodes);
  }
  if (node.actions[eventType].new_items !== undefined) {
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
    let shape = document.createElementNS(NS,'polygon');
    shape.setAttributeNS(null,'points',path);
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
    let shape = document.createElementNS(NS,'polygon');
    shape.setAttributeNS(null,'points',path);
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
  console.log(val,node.features.exit);
  if (val === node.features.exit.toString()) {
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
          console.log(crazybiolevels,level.level,index,solvedgame,(crazybiolevels & (crazybiolevels & (15 << 4*(level.level-1)))).toString(2),(15 << 4*(level.level-1)).toString(2));
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



