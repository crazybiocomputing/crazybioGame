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
 * Lock displayed as a Text Field
 */
const createLockText = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockText";
  
  // TODO
  
  return element;
};

/**
 * Lock displayed as a Numerical Field
  * @author SCHRIEKE Hans
 */
const createLockNumerical = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockNumerical";
  
  createPopUp(props,"lockNum");
  let modal = document.getElementById('lockNum');
  let button = document.getElementById(`svg_${props.id}`);
  let closeB = document.getElementsByClassName('close'+"lockNum")[0];

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

  let lockNum = document.getElementsByClassName('lockNum-button')[0];
  //lockNum.href = (`${props.features.file}`);

  return element;
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
 * @author P. Wintringer
 */
const createLockKeypad = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockKeypad";
  //let evt = document.createEvent("MouseEvents");
  //evt.initMouseEvent("click");
  let form = document.createElement('form');
  let table = document.createElement('table');
  let button1 = ;
  let button2 = ;
  let button3 = ;
  let button4 = ;
  let button5 = ;
  let button6 = ;
  let button7 = ;
  let button8 = ;
  let button9 = ;
  let buttonC = ;
  let button0 = ;
  let buttonV = ;
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



