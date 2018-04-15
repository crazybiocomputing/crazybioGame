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
 *
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
 *
 *
 */

const createMachineDownload = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "machDownload";
  
  /*
  function download(url){
  window.location.href = url;
  }
  */

  createPopUp(props);
  let modal = document.getElementById('modal');
  let button = document.getElementById(`svg_${props.id}`);  
  let closeB = document.getElementsByClassName('close')[0];
  
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
  
  let dldButton = document.getElementsByClassName('download-button');
  let dldImage = document.createElement('a');
  dldImage.href = (`${props.features.file}`);
  dldImage.download = 'imageName';
  
  
  return element;
  
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
 * Create a new `lock` machine using a `Numpad` mode
 *
 * @author TODO
 */
const createLockNumpad = (props) => {
  let element = document.createElement('div');

  return element;
};

/**
 * Create a new `lock` machine using a `??` mode
 *
 * @author TODO
 */
const createLock = (props) => {
  let element = document.createElement('div');

  return element;
};
