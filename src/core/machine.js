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
  
  static create(props) {
    return new Machine(props.id,props.class,props.description,props.parent)
      .append('div')
      .display(props.display)
      .features(props.features);
  }
}


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
 * Create a new `download` machine
 * @author Hans SCHRIEKE and Charlotte GONCALVES FRASCO
 *
 */
const createMachineDownload = (props) => {
  let machine = Machine.create(props);

  let element = machine.element;
  element.className = "machine download";
  
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
    if (event.target === modal) {
        modal.style.display = "none";
    }
  } 
  
  let dldButton = document.getElementsByClassName('download-button')[0];
  dldButton.href = (`${props.features.file}`);
  
  return machine;
  
};


/**
 * Create a new `form` machine using a `GapFill` mode
 *
 * @author TODO
 */
const createForm = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "form";
  
  function download(url){
    window.location.href = url;
  }

  // document.getElementById("machine").addEventListener("click",download(img.src));

  return element;
};

/**
 * Create a new `form` machine using a `Drag and Drop` mode
 *
 * @author TODO
 */
const createFormDragDrop = (props) => {
  let element = document.createElement('div');

  return element;
};

/**
 * Create a new `form` machine using a `Drop-down` mode
 *
 * @author TODO
 */
const createFormDropDown = (props) => {
  let element = document.createElement('div');

  return element;
};


/**
 * Create a Tile machine
 * @author Jean-Christophe Taveau
 *
 */
const createMachineTile = (props) => {
    
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

  let machine = Machine.create(props);
  machine.element.className = "machine tile";
  machine.element.draggable = false;
  machine.element.addEventListener('mousedown', dragstart,false); 
  machine.element.addEventListener('dragstart', (e) => {e.preventDefault();return false},false); 
  machine.element.addEventListener('dragover', (e) => {return false},false); 
  machine.element.addEventListener('drop', (e) => false,false); 

  return machine;
};


