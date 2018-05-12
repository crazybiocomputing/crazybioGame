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
 * Create a new generic machine
 * @author Hans SCHRIEKE
 *
 */

const createMachine = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "machine";

  return element;
};

/**
 * Create a new `download` machine
 * @author Hans SCHRIEKE and Charlotte GONCALVES FRASCO
 *
 */

const createMachineDownload = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "machDownload";

  createPopUp(props,"ddl");
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

  return element;

};


/**
 * Create a new `form` machine using a `GapFill` mode
 *
 * @author P. Wintringer
 *
const createForm = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "formgapfill";
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
 }

  //function download(url){
  //  window.location.href = url;
  //}
  //document.getElementById("machine").addEventListener("click",download(img.src));

  return element;
};

*/

/**
 * Create a new `form` machine using a `Drag and Drop` mode
 *
 * @author P.Wintringer
 *
const createFormDragDrop = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "formDnd";
  
  let tile = document.getElementByClassName('sprite'); // sprite as tiles
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
  } 
  
  return element;
};

*/

/**
 * Create a new `form` machine using a `Drop-down` mode
 *
 * @author TODO
 */
const createFormDropDown = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "formDropdown";

  return element;
};
