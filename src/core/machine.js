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
  draggable() {
    
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

    this.element.draggable = false;
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

/**
 * Create a new `display` machine
 * @author P. Wintringer
 *
 */

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
  actionProps.if = 'click',
  actionProps.then = {};
  actionProps.then['popup'] = {
    header: 'Download...',
    content: [''],
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

  /*
  let dwnldButton = document.createElement('a');
     dwnldButton.className = 'download-button';
  dwnldButton.href = 'javascript:void(0)';
    dwnldButton.innerHTML = '';
    modalFooter.appendChild(dwnldButton);
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
    console.log(val);
    if (val === lock.features.exit) {
      displayPopup( {
        title: 'Congratulations!!',
        content: [`<p>Click on this <a class="exit" href="${CRAZYBIOGAME.next_game}">button</a>to go to the next game...</p>`],
        footer:  'You Win!!'
      });
    }
    else {
      alert("Wrong code. Try again");
    }
  }
  */
  
  // Add all the elements
  container.appendChild(paragraph);
  actionProps.then.popup.contentDOM = container;
  machine.action(actionProps);
/*
  let modal = document.getElementById("ddl");
  let button = document.getElementById(`svg_${props.id}`);
  let closeB = document.getElementsByClassName('close'+"ddl")[0];

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

  let dldButton = document.getElementsByClassName('download-button')[0];
  dldButton.href = (`${props.features.file}`);
*/
  return machine;
};


/**
 * Create a new `form` machine using a `GapFill` mode
 *
 * @author P. Wintringer
 */
const createForm = (props) => {
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
  
  /*let myForm = document.createElement('form');
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

  return element;
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


/**
 * Create a Tile machine
 *
 * @author Jean-Christophe Taveau
 *
 */
const createMachineTile = (props) => {
  let machine = Machine.create(props).draggable();
  machine.element.className = "machine tile";
  return machine;
};


